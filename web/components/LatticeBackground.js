'use client';

import { useEffect, useRef } from 'react';

/* Interactive triangulation-lattice background, drawn behind the hero content.
   Reacts to the cursor with a subtle orange highlight near the pointer. */
export default function LatticeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas && canvas.closest('.hero');
    if (!canvas || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let W = 0,
      H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000 };
    let pts = [];
    const maxDist = 120,
      maxDistSq = maxDist * maxDist;
    const strokeRGB = '10,29,55',
      accentRGB = '255,106,0';
    let raf;

    function initPoints(w, h) {
      pts = [];
      const count = Math.min(Math.max(Math.floor((w * h) / 16000), 30), 70);
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 1 + Math.random(),
        });
      }
    }
    function resize() {
      const r = section.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPoints(W, H);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.tx = -1000;
      mouse.ty = -1000;
    };
    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave, { passive: true });

    let last = performance.now();
    function render(now) {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;
      ctx.clearRect(0, 0, W, H);
      const n = pts.length;
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        p.pulse += dt * p.pulseSpeed;
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > W) {
          p.x = W;
          p.vx *= -1;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > H) {
          p.y = H;
          p.vy *= -1;
        }
        const dx = mouse.x - p.x,
          dy = mouse.y - p.y,
          dsq = dx * dx + dy * dy;
        if (dsq < 32400 && dsq > 0) {
          const d = Math.sqrt(dsq),
            f = (1 - d / 180) * 22;
          p.x -= (dx / d) * f * dt * 6;
          p.y -= (dy / d) * f * dt * 6;
        }
      }
      const cell = maxDist,
        cols = Math.max(1, Math.ceil(W / cell)),
        rows = Math.max(1, Math.ceil(H / cell));
      const grid = [];
      for (let c = 0; c < cols; c++) {
        grid.push([]);
        for (let r2 = 0; r2 < rows; r2++) grid[c].push([]);
      }
      for (let i = 0; i < n; i++) {
        const cc = Math.min(cols - 1, Math.max(0, Math.floor(pts[i].x / cell)));
        const rr = Math.min(rows - 1, Math.max(0, Math.floor(pts[i].y / cell)));
        grid[cc][rr].push(i);
      }
      for (let c = 0; c < cols; c++) {
        for (let r2 = 0; r2 < rows; r2++) {
          const cellPts = grid[c][r2],
            neigh = [];
          for (let nc = Math.max(0, c - 1); nc <= Math.min(cols - 1, c + 1); nc++)
            for (let nr = Math.max(0, r2 - 1); nr <= Math.min(rows - 1, r2 + 1); nr++)
              for (let k = 0; k < grid[nc][nr].length; k++) neigh.push(grid[nc][nr][k]);
          for (let ii = 0; ii < cellPts.length; ii++) {
            const i1 = cellPts[ii],
              p1 = pts[i1];
            for (let jj = 0; jj < neigh.length; jj++) {
              const i2 = neigh[jj];
              if (i1 >= i2) continue;
              const p2 = pts[i2];
              const dx12 = p1.x - p2.x,
                dy12 = p1.y - p2.y;
              if (dx12 * dx12 + dy12 * dy12 > maxDistSq) continue;
              const midx = (p1.x + p2.x) / 2,
                midy = (p1.y + p2.y) / 2;
              const mdx = mouse.x - midx,
                mdy = mouse.y - midy,
                mdsq = mdx * mdx + mdy * mdy;
              const near = mdsq < 36100;
              const a = near ? (1 - Math.sqrt(mdsq) / 190) * 0.5 : 0.06;
              ctx.strokeStyle = near ? 'rgba(' + accentRGB + ',' + a.toFixed(2) + ')' : 'rgba(' + strokeRGB + ',' + a.toFixed(2) + ')';
              ctx.lineWidth = near ? 1 : 0.5;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      for (let i = 0; i < n; i++) {
        const pn = pts[i];
        const mdx2 = mouse.x - pn.x,
          mdy2 = mouse.y - pn.y;
        const isNear = mdx2 * mdx2 + mdy2 * mdy2 < 32400;
        const rad = 1.4 + Math.sin(pn.pulse) * 0.6;
        ctx.fillStyle = isNear ? 'rgba(' + accentRGB + ',0.85)' : 'rgba(' + strokeRGB + ',0.28)';
        ctx.beginPath();
        ctx.arc(pn.x, pn.y, isNear ? 2.6 : rad, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas className="lattice-bg" ref={canvasRef} aria-hidden="true"></canvas>;
}
