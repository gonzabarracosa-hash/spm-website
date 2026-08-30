'use client';

import { useEffect, useRef } from 'react';

const NODE_W = 190;
const PAD = 40;

const ICONS = {
  trigger:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  tag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 12l10 10 10-10-10-10z"/><circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  log:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V6"/><path d="M9 19V10"/><path d="M14 19V4"/><path d="M19 19v-7"/></svg>',
};

const TEMPLATES = [
  { type: 'trigger', title: 'New Drawing Uploaded', desc: 'Watches the shared folder for new files.', icon: 'trigger', color: 'orange' },
  { type: 'action', title: 'Auto-Number & Tag', desc: 'Assigns drawing number and current revision.', icon: 'tag', color: 'green' },
  { type: 'condition', title: 'Passes ASME Check', desc: 'Validates the drawing against required standards.', icon: 'check', color: 'neutral' },
  { type: 'action', title: 'Notify Engineer', desc: 'Sends a summary to the reviewer on call.', icon: 'mail', color: 'green' },
  { type: 'action', title: 'Update Register', desc: 'Logs the revision in the document register.', icon: 'log', color: 'orange' },
];

/* Vanilla-JS reskin of a draggable node/workflow demo (drag nodes, add
   steps, live SVG connectors), ported into an imperative React effect so
   the interaction logic stays identical to the original prototype. */
export default function WorkflowWidget({ revealRef, revealClassName }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const canvas = root.querySelector('[data-wf-canvas]');
    const inner = root.querySelector('[data-wf-inner]');
    const svg = root.querySelector('[data-wf-svg]');
    const addBtn = root.querySelector('[data-wf-add]');
    const nodeCountEl = root.querySelector('[data-wf-nodecount]');
    const connCountEl = root.querySelector('[data-wf-conncount]');
    if (!canvas || !inner || !svg) return;

    let nodes = [
      { id: 'n1', x: 20, y: 90, tpl: TEMPLATES[0] },
      { id: 'n2', x: 260, y: 90, tpl: TEMPLATES[1] },
      { id: 'n3', x: 500, y: 90, tpl: TEMPLATES[2] },
    ];
    let conns = [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
    ];
    let tplCursor = 3;
    let seq = 4;
    const cleanups = [];

    function elFor(id) {
      return inner.querySelector('[data-node-id="' + id + '"]');
    }

    function bindDrag(el, n) {
      const card = el.querySelector('.wf-card');
      let startX, startY, startLeft, startTop, dragging = false;
      const onDown = (e) => {
        dragging = true;
        el.classList.add('dragging');
        startX = e.clientX;
        startY = e.clientY;
        startLeft = n.x;
        startTop = n.y;
        card.setPointerCapture(e.pointerId);
      };
      const onMove = (e) => {
        if (!dragging) return;
        n.x = Math.max(0, startLeft + (e.clientX - startX));
        n.y = Math.max(0, startTop + (e.clientY - startY));
        el.style.left = n.x + 'px';
        el.style.top = n.y + 'px';
        fitCanvas();
        drawConns();
      };
      const end = (e) => {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('dragging');
        try {
          card.releasePointerCapture(e.pointerId);
        } catch (err) {}
      };
      card.addEventListener('pointerdown', onDown);
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerup', end);
      card.addEventListener('pointercancel', end);
      cleanups.push(() => {
        card.removeEventListener('pointerdown', onDown);
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerup', end);
        card.removeEventListener('pointercancel', end);
      });
    }

    function renderNode(n) {
      const el = document.createElement('div');
      el.className = 'wf-node';
      el.setAttribute('data-node-id', n.id);
      el.style.left = n.x + 'px';
      el.style.top = n.y + 'px';
      el.innerHTML =
        '<div class="wf-card c-' +
        n.tpl.color +
        '">' +
        '<div class="wf-top">' +
        '<div class="wf-icn">' +
        ICONS[n.tpl.icon] +
        '</div>' +
        '<div class="wf-meta"><span class="wf-type">' +
        n.tpl.type +
        '</span>' +
        '<div class="wf-title">' +
        n.tpl.title +
        '</div></div>' +
        '</div>' +
        '<p class="wf-desc">' +
        n.tpl.desc +
        '</p>' +
        '<div class="wf-connected"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>Connected</div>' +
        '</div>';
      inner.appendChild(el);
      bindDrag(el, n);
      return el;
    }

    function fitCanvas() {
      let maxX = PAD,
        maxY = PAD;
      nodes.forEach((n) => {
        const el = elFor(n.id);
        const h = el ? el.offsetHeight : 110;
        maxX = Math.max(maxX, n.x + NODE_W + PAD);
        maxY = Math.max(maxY, n.y + h + PAD);
      });
      inner.style.width = maxX + 'px';
      inner.style.height = maxY + 'px';
      svg.setAttribute('width', maxX);
      svg.setAttribute('height', maxY);
    }

    function drawConns() {
      let frag = '';
      conns.forEach((c) => {
        const a = elFor(c.from),
          b = elFor(c.to);
        if (!a || !b) return;
        const x1 = a.offsetLeft + a.offsetWidth,
          y1 = a.offsetTop + a.offsetHeight / 2;
        const x2 = b.offsetLeft,
          y2 = b.offsetTop + b.offsetHeight / 2;
        const cpx = x1 + (x2 - x1) / 2;
        frag +=
          '<path d="M' +
          x1 +
          ',' +
          y1 +
          ' C' +
          cpx +
          ',' +
          y1 +
          ' ' +
          cpx +
          ',' +
          y2 +
          ' ' +
          x2 +
          ',' +
          y2 +
          '" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2" stroke-dasharray="7,6" stroke-linecap="round"/>';
      });
      svg.innerHTML = frag;
    }

    function updateStats() {
      if (nodeCountEl) nodeCountEl.textContent = nodes.length + (nodes.length === 1 ? ' step' : ' steps');
      if (connCountEl) connCountEl.textContent = conns.length + (conns.length === 1 ? ' connection' : ' connections');
    }

    function addNode() {
      const tpl = TEMPLATES[tplCursor % TEMPLATES.length];
      tplCursor++;
      const last = nodes[nodes.length - 1];
      const n = { id: 'n' + seq++, x: last.x + 250, y: last.y, tpl };
      nodes.push(n);
      const el = renderNode(n);
      conns.push({ from: last.id, to: n.id });
      fitCanvas();
      drawConns();
      updateStats();
      canvas.scrollTo({ left: n.x + NODE_W - canvas.clientWidth + 100, behavior: 'smooth' });
      el.style.opacity = '0';
      el.style.transform = 'scale(.9)';
      el.style.transition = 'opacity .25s, transform .25s';
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
      });
    }

    nodes.forEach(renderNode);
    fitCanvas();
    drawConns();
    updateStats();
    if (addBtn) addBtn.addEventListener('click', addNode);
    const onResize = () => {
      fitCanvas();
      drawConns();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (addBtn) addBtn.removeEventListener('click', addNode);
      window.removeEventListener('resize', onResize);
      cleanups.forEach((fn) => fn());
      inner.innerHTML = '';
      svg.innerHTML = '';
    };
  }, []);

  return (
    <div
      className={'wf-widget' + (revealClassName ? ' ' + revealClassName : '')}
      data-wf
      ref={(el) => {
        rootRef.current = el;
        if (revealRef) revealRef.current = el;
      }}
    >
      <div className="wf-head">
        <div className="wf-badges">
          <span className="wf-badge">Active</span>
          <span className="wf-label">Automation flow</span>
        </div>
        <button type="button" className="wf-addbtn" data-wf-add>
          + Add step
        </button>
      </div>
      <div className="wf-canvas" data-wf-canvas>
        <div className="wf-inner" data-wf-inner>
          <svg className="wf-svg" data-wf-svg></svg>
        </div>
      </div>
      <div className="wf-foot">
        <div className="wf-stats">
          <span className="wf-stat-item">
            <span className="wf-dot" style={{ background: 'var(--green)' }}></span>
            <span data-wf-nodecount>3 steps</span>
          </span>
          <span className="wf-stat-item">
            <span className="wf-dot" style={{ background: 'var(--orange)' }}></span>
            <span data-wf-conncount>2 connections</span>
          </span>
        </div>
        <span className="wf-hint">Drag steps to reposition</span>
      </div>
    </div>
  );
}
