/* SPM Design Solutions — workflow-widget.js
   Vanilla-JS reskin of a draggable node/workflow demo (no React/Tailwind/
   framer-motion in this codebase) — drag nodes, add steps, live SVG
   connectors. Auto-inits any [data-wf] element found on the page. */
(function () {
  'use strict';

  var NODE_W = 190;
  var PAD = 40;

  var ICONS = {
    trigger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 12l10 10 10-10-10-10z"/><circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    log: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V6"/><path d="M9 19V10"/><path d="M14 19V4"/><path d="M19 19v-7"/></svg>'
  };

  var TEMPLATES = [
    { type: 'trigger', title: 'New Drawing Uploaded', desc: 'Watches the shared folder for new files.', icon: 'trigger', color: 'orange' },
    { type: 'action', title: 'Auto-Number & Tag', desc: 'Assigns drawing number and current revision.', icon: 'tag', color: 'green' },
    { type: 'condition', title: 'Passes ASME Check', desc: 'Validates the drawing against required standards.', icon: 'check', color: 'neutral' },
    { type: 'action', title: 'Notify Engineer', desc: 'Sends a summary to the reviewer on call.', icon: 'mail', color: 'green' },
    { type: 'action', title: 'Update Register', desc: 'Logs the revision in the document register.', icon: 'log', color: 'orange' }
  ];

  function initWidget(root) {
    var canvas = root.querySelector('[data-wf-canvas]');
    var inner = root.querySelector('[data-wf-inner]');
    var svg = root.querySelector('[data-wf-svg]');
    var addBtn = root.querySelector('[data-wf-add]');
    var nodeCountEl = root.querySelector('[data-wf-nodecount]');
    var connCountEl = root.querySelector('[data-wf-conncount]');
    if (!canvas || !inner || !svg) return;

    var nodes = [
      { id: 'n1', x: 20, y: 90, tpl: TEMPLATES[0] },
      { id: 'n2', x: 260, y: 90, tpl: TEMPLATES[1] },
      { id: 'n3', x: 500, y: 90, tpl: TEMPLATES[2] }
    ];
    var conns = [ { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' } ];
    var tplCursor = 3;
    var seq = 4;

    function elFor(id) { return inner.querySelector('[data-node-id="' + id + '"]'); }

    function renderNode(n) {
      var el = document.createElement('div');
      el.className = 'wf-node';
      el.setAttribute('data-node-id', n.id);
      el.style.left = n.x + 'px';
      el.style.top = n.y + 'px';
      el.innerHTML =
        '<div class="wf-card c-' + n.tpl.color + '">' +
          '<div class="wf-top">' +
            '<div class="wf-icn">' + ICONS[n.tpl.icon] + '</div>' +
            '<div class="wf-meta"><span class="wf-type">' + n.tpl.type + '</span>' +
            '<div class="wf-title">' + n.tpl.title + '</div></div>' +
          '</div>' +
          '<p class="wf-desc">' + n.tpl.desc + '</p>' +
          '<div class="wf-connected"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>Connected</div>' +
        '</div>';
      inner.appendChild(el);
      bindDrag(el, n);
      return el;
    }

    function bindDrag(el, n) {
      var card = el.querySelector('.wf-card');
      var startX, startY, startLeft, startTop, dragging = false;
      card.addEventListener('pointerdown', function (e) {
        dragging = true; el.classList.add('dragging');
        startX = e.clientX; startY = e.clientY;
        startLeft = n.x; startTop = n.y;
        card.setPointerCapture(e.pointerId);
      });
      card.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        n.x = Math.max(0, startLeft + (e.clientX - startX));
        n.y = Math.max(0, startTop + (e.clientY - startY));
        el.style.left = n.x + 'px'; el.style.top = n.y + 'px';
        fitCanvas(); drawConns();
      });
      function end(e) { if (!dragging) return; dragging = false; el.classList.remove('dragging'); try { card.releasePointerCapture(e.pointerId); } catch (err) {} }
      card.addEventListener('pointerup', end);
      card.addEventListener('pointercancel', end);
    }

    function fitCanvas() {
      var maxX = PAD, maxY = PAD;
      nodes.forEach(function (n) {
        var el = elFor(n.id); var h = el ? el.offsetHeight : 110;
        maxX = Math.max(maxX, n.x + NODE_W + PAD);
        maxY = Math.max(maxY, n.y + h + PAD);
      });
      inner.style.width = maxX + 'px'; inner.style.height = maxY + 'px';
      svg.setAttribute('width', maxX); svg.setAttribute('height', maxY);
    }

    function drawConns() {
      var frag = '';
      conns.forEach(function (c) {
        var a = elFor(c.from), b = elFor(c.to);
        if (!a || !b) return;
        var x1 = a.offsetLeft + a.offsetWidth, y1 = a.offsetTop + a.offsetHeight / 2;
        var x2 = b.offsetLeft, y2 = b.offsetTop + b.offsetHeight / 2;
        var cpx = x1 + (x2 - x1) / 2;
        frag += '<path d="M' + x1 + ',' + y1 + ' C' + cpx + ',' + y1 + ' ' + cpx + ',' + y2 + ' ' + x2 + ',' + y2 +
          '" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="2" stroke-dasharray="7,6" stroke-linecap="round"/>';
      });
      svg.innerHTML = frag;
    }

    function updateStats() {
      if (nodeCountEl) nodeCountEl.textContent = nodes.length + (nodes.length === 1 ? ' step' : ' steps');
      if (connCountEl) connCountEl.textContent = conns.length + (conns.length === 1 ? ' connection' : ' connections');
    }

    function addNode() {
      var tpl = TEMPLATES[tplCursor % TEMPLATES.length]; tplCursor++;
      var last = nodes[nodes.length - 1];
      var n = { id: 'n' + (seq++), x: last.x + 250, y: last.y, tpl: tpl };
      nodes.push(n);
      var el = renderNode(n);
      conns.push({ from: last.id, to: n.id });
      fitCanvas(); drawConns(); updateStats();
      canvas.scrollTo({ left: n.x + NODE_W - canvas.clientWidth + 100, behavior: 'smooth' });
      el.style.opacity = '0'; el.style.transform = 'scale(.9)'; el.style.transition = 'opacity .25s, transform .25s';
      requestAnimationFrame(function () { el.style.opacity = '1'; el.style.transform = 'scale(1)'; });
    }

    nodes.forEach(renderNode);
    fitCanvas(); drawConns(); updateStats();
    if (addBtn) addBtn.addEventListener('click', addNode);
    window.addEventListener('resize', function () { fitCanvas(); drawConns(); });
  }

  function init() { document.querySelectorAll('[data-wf]').forEach(initWidget); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
