// Direction A — "Blueprint Dark" · SPM brand palette
// Oxford Blue ground, Signal Orange accent, technical drawing motifs.
// Montserrat headings · Inter body · IBM Plex Mono technical labels.
function BlueprintDirection() {
  return (
    <div className="bpz">
      <style>{`
        .bpz {
          --navy:#0A1D37;
          --navy-2:#071528;
          --navy-3:#0e2647;
          --orange:#FF6A00;
          --cloud:#F5F7FA;
          --grey:#6B6F76;
          --green:#32C36A;
          --ink:#eaf0f7;
          --ink-dim:#9fb0c4;
          --line:rgba(255,255,255,0.10);
          --line-soft:rgba(255,255,255,0.05);
          width:1440px;
          background:var(--navy);
          color:var(--ink);
          font-family:'Inter',sans-serif;
          position:relative;
          overflow:hidden;
        }
        .bpz * { box-sizing:border-box; }
        .bpz-grid { position:absolute; inset:0; pointer-events:none;
          background-image:linear-gradient(var(--line-soft) 1px,transparent 1px),linear-gradient(90deg,var(--line-soft) 1px,transparent 1px);
          background-size:48px 48px; }
        .bpz-grid.maj { background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px); background-size:240px 240px; }
        .bpz-ey { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--orange); }
        .bpz-rel { position:relative; z-index:2; }
        .bpz h1,.bpz h2,.bpz h3,.bpz h4 { font-family:'Montserrat',sans-serif; }

        /* NAV */
        .bpz-nav { display:flex; align-items:center; justify-content:space-between; padding:24px 56px; border-bottom:1px solid var(--line); }
        .bpz-nav img.logo { height:30px; display:block; }
        .bpz-navlinks { display:flex; gap:34px; align-items:center; }
        .bpz-navlinks a { color:var(--ink-dim); text-decoration:none; font-size:14px; font-family:'IBM Plex Mono',monospace; }
        .bpz-navlinks a:hover { color:var(--ink); }
        .bpz-cta { font-family:'Montserrat',sans-serif; font-weight:700; font-size:13px; letter-spacing:.02em; color:#fff; background:var(--orange); padding:11px 20px; border:none; cursor:pointer; }

        /* HERO */
        .bpz-hero { padding:80px 56px 64px; display:grid; grid-template-columns:1.05fr 0.95fr; gap:56px; align-items:center; }
        .bpz-h1 { font-weight:800; font-size:60px; line-height:1.03; letter-spacing:-0.02em; margin:18px 0 0; text-wrap:balance; }
        .bpz-h1 em { font-style:normal; color:var(--orange); }
        .bpz-sub { color:var(--ink-dim); font-size:18px; line-height:1.6; max-width:480px; margin:24px 0 0; }
        .bpz-actions { display:flex; gap:16px; margin-top:36px; align-items:center; }
        .bpz-btn-primary { font-family:'Montserrat',sans-serif; font-weight:700; font-size:14px; color:#fff; background:var(--orange); padding:15px 26px; border:none; cursor:pointer; }
        .bpz-btn-ghost { font-family:'Montserrat',sans-serif; font-weight:600; font-size:14px; color:var(--ink); background:transparent; padding:15px 24px; border:1px solid var(--line); cursor:pointer; }
        .bpz-stats { display:flex; gap:40px; margin-top:52px; }
        .bpz-stat b { display:block; font-family:'Montserrat',sans-serif; font-weight:800; font-size:30px; color:var(--ink); }
        .bpz-stat span { font-size:12px; color:var(--ink-dim); font-family:'IBM Plex Mono',monospace; letter-spacing:.06em; text-transform:uppercase; }

        /* hero drawing sheet (holds the real technical mark on a light sheet) */
        .bpz-sheet { background:var(--cloud); border:1px solid var(--line); position:relative; padding:24px; }
        .bpz-sheet::before { content:''; position:absolute; inset:10px; border:1px solid rgba(10,29,55,.12); pointer-events:none; }
        .bpz-sheet img { width:100%; display:block; }
        .bpz-corner { position:absolute; width:12px; height:12px; border:1.5px solid var(--orange); }
        .bpz-tag { position:absolute; bottom:18px; left:22px; font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--grey); letter-spacing:.1em; }
        .bpz-rev { position:absolute; bottom:18px; right:22px; font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--orange); letter-spacing:.06em; }

        /* TRUST */
        .bpz-trust { border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:22px 56px; display:flex; align-items:center; gap:40px; }
        .bpz-trust span.lbl { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-dim); white-space:nowrap; }
        .bpz-trust-logos { display:flex; gap:40px; flex:1; }
        .bpz-trust-logos b { font-family:'Montserrat',sans-serif; font-size:15px; color:var(--ink-dim); font-weight:600; }

        /* SERVICES */
        .bpz-sec { padding:80px 56px; }
        .bpz-h2 { font-weight:800; font-size:38px; letter-spacing:-0.01em; margin:10px 0 0; }
        .bpz-cards { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid var(--line); }
        .bpz-card { padding:36px 32px; border-right:1px solid var(--line); min-height:300px; display:flex; flex-direction:column; }
        .bpz-card:last-child { border-right:none; }
        .bpz-cardno { font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--orange); letter-spacing:.1em; }
        .bpz-card h3 { font-weight:700; font-size:22px; margin:22px 0 12px; }
        .bpz-card p { color:var(--ink-dim); font-size:15px; line-height:1.6; margin:0; }
        .bpz-card ul { list-style:none; padding:0; margin:20px 0 0; }
        .bpz-card li { font-family:'IBM Plex Mono',monospace; font-size:12.5px; color:var(--ink-dim); padding:7px 0; border-top:1px solid var(--line-soft); display:flex; gap:10px; }
        .bpz-card li::before { content:'+'; color:var(--orange); }
        .bpz-price { margin-top:auto; padding-top:22px; font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--ink); }
        .bpz-price small { color:var(--ink-dim); }

        /* METRIC band */
        .bpz-band { background:var(--navy-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:56px; display:grid; grid-template-columns:repeat(3,1fr); gap:48px; }
        .bpz-band .bpz-stat b { font-size:44px; color:var(--orange); }

        /* CTA */
        .bpz-cta-sec { padding:90px 56px; text-align:center; }
        .bpz-cta-sec h2 { font-weight:800; font-size:44px; letter-spacing:-0.02em; margin:10px 0 14px; }
        .bpz-cta-sec p { color:var(--ink-dim); font-size:17px; margin:0 auto 32px; max-width:520px; }
      `}</style>

      <div className="bpz-grid"></div>
      <div className="bpz-grid maj"></div>

      <div className="bpz-nav bpz-rel">
        <img className="logo" src="assets/brand/spm-wordmark-white.png" alt="SPM Design Solutions" />
        <nav className="bpz-navlinks">
          <a href="#">Services</a>
          <a href="#">Work</a>
          <a href="#">Courses</a>
          <a href="#">About</a>
          <button className="bpz-cta">Book a call</button>
        </nav>
      </div>

      <div className="bpz-hero bpz-rel">
        <div>
          <div className="bpz-ey">// Automation · AI · Mechanical design</div>
          <h1 className="bpz-h1">Cut <em>40–70%</em> of repetitive CAD work.</h1>
          <p className="bpz-sub">iLogic, macros and AI workflows engineered around how your shop and design office actually run — pressure vessels, tanks and piping, to ASME, EN 13480 and PED.</p>
          <div className="bpz-actions">
            <button className="bpz-btn-primary">Book a discovery call</button>
            <button className="bpz-btn-ghost">See the demos</button>
          </div>
          <div className="bpz-stats">
            <div className="bpz-stat"><b>40–70%</b><span>time saved</span></div>
            <div className="bpz-stat"><b>ASME · PED</b><span>standards-aware</span></div>
            <div className="bpz-stat"><b>BE · DE · NL</b><span>EU based</span></div>
          </div>
        </div>

        <div className="bpz-sheet">
          <div className="bpz-corner" style={{top:4,left:4,borderRight:'none',borderBottom:'none'}}></div>
          <div className="bpz-corner" style={{top:4,right:4,borderLeft:'none',borderBottom:'none'}}></div>
          <div className="bpz-corner" style={{bottom:4,left:4,borderRight:'none',borderTop:'none'}}></div>
          <div className="bpz-corner" style={{bottom:4,right:4,borderLeft:'none',borderTop:'none'}}></div>
          <img src="assets/brand/spm-mark-technical.png" alt="SPM technical illustration" />
          <div className="bpz-tag">SHEET 01 · FLANGE-SET</div>
          <div className="bpz-rev">REV ▲ AFC</div>
        </div>
      </div>

      <div className="bpz-trust bpz-rel">
        <span className="lbl">Built on</span>
        <div className="bpz-trust-logos">
          <b>Autodesk Inventor</b><b>AutoCAD</b><b>SolidWorks</b><b>Solid Edge</b><b>Python</b>
        </div>
      </div>

      <div className="bpz-sec bpz-rel">
        <div className="bpz-ey">// What we build</div>
        <h2 className="bpz-h2">Three ways we remove the busywork</h2>
        <div className="bpz-cards" style={{marginTop:'40px'}}>
          <div className="bpz-card">
            <div className="bpz-cardno">01</div>
            <h3>CAD Automation</h3>
            <p>Custom iLogic, macros and scripts that erase manual repetition in Inventor.</p>
            <ul>
              <li>Auto flange &amp; nozzle insertion</li>
              <li>Excel ↔ CAD data sync</li>
              <li>Drawing numbering &amp; revisions</li>
            </ul>
            <div className="bpz-price">€1,500–€8,000 <small>/ project</small></div>
          </div>
          <div className="bpz-card">
            <div className="bpz-cardno">02</div>
            <h3>AI for Design</h3>
            <p>Assistants trained on your standards that check, classify and document.</p>
            <ul>
              <li>ASME / EN 13480 design checks</li>
              <li>Isometric &amp; P&amp;ID reading (OCR)</li>
              <li>Auto technical reports</li>
            </ul>
            <div className="bpz-price">€3,000–€20,000 <small>+ retainer</small></div>
          </div>
          <div className="bpz-card">
            <div className="bpz-cardno">03</div>
            <h3>Training &amp; Courses</h3>
            <p>Inventor and iLogic, taught for real plant and piping work — not generic CAD.</p>
            <ul>
              <li>iLogic automation from zero</li>
              <li>Live workshops &amp; 1:1 mentoring</li>
              <li>Async on-demand courses</li>
            </ul>
            <div className="bpz-price">€197–€2,500 <small>/ seat</small></div>
          </div>
        </div>
      </div>

      <div className="bpz-band bpz-rel">
        <div className="bpz-stat"><b>40–70%</b><span>fewer hours on repetitive design tasks</span></div>
        <div className="bpz-stat"><b>€2.5B</b><span>EU CAD-automation services market</span></div>
        <div className="bpz-stat"><b>IFC→AFC→As-Built</b><span>real shop revision flow, automated</span></div>
      </div>

      <div className="bpz-cta-sec bpz-rel">
        <div className="bpz-ey">// Start a pilot</div>
        <h2>Let's automate one painful workflow first.</h2>
        <p>A small, fixed-scope pilot to prove the time savings on your own drawings — then scale.</p>
        <button className="bpz-btn-primary">Book a discovery call</button>
      </div>
    </div>
  );
}
window.BlueprintDirection = BlueprintDirection;
