// Direction B — "Precision Light" · SPM brand palette
// Cloud White ground, Oxford Blue ink, Signal Orange accent. Trust-forward.
// Montserrat headings · Inter body · IBM Plex Mono technical labels.
function PrecisionDirection() {
  return (
    <div className="prz">
      <style>{`
        .prz {
          --navy:#0A1D37;
          --ink-2:#3a4654;
          --grey:#6B6F76;
          --grey-2:#9aa3ad;
          --cloud:#F5F7FA;
          --paper:#ffffff;
          --line:#e2e6ec;
          --line-2:#eef1f5;
          --orange:#FF6A00;
          --green:#32C36A;
          width:1440px;
          background:var(--cloud);
          color:var(--navy);
          font-family:'Inter',sans-serif;
        }
        .prz * { box-sizing:border-box; }
        .prz h1,.prz h2,.prz h3,.prz h4 { font-family:'Montserrat',sans-serif; }
        .prz-ey { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--orange); }
        .prz-ey.grey { color:var(--grey-2); }

        /* NAV */
        .prz-nav { display:flex; align-items:center; justify-content:space-between; padding:22px 56px; background:var(--paper); border-bottom:1px solid var(--line); }
        .prz-nav img.logo { height:30px; display:block; }
        .prz-navlinks { display:flex; align-items:center; gap:32px; }
        .prz-navlinks a { color:var(--ink-2); text-decoration:none; font-size:15px; font-weight:500; }
        .prz-navlinks a:hover { color:var(--navy); }
        .prz-cta { background:var(--navy); color:#fff; border:none; font-family:'Montserrat',sans-serif; font-weight:700; font-size:14px; padding:12px 22px; cursor:pointer; }

        /* HERO */
        .prz-hero { background:var(--paper); padding:80px 56px 0; display:grid; grid-template-columns:1.04fr 0.96fr; gap:56px; align-items:center; border-bottom:1px solid var(--line); }
        .prz-h1 { font-weight:800; font-size:62px; line-height:1.02; letter-spacing:-0.03em; margin:20px 0 0; text-wrap:balance; }
        .prz-h1 mark { background:none; color:var(--orange); }
        .prz-sub { color:var(--ink-2); font-size:18px; line-height:1.6; max-width:460px; margin:24px 0 0; }
        .prz-actions { display:flex; gap:14px; margin:34px 0 0; }
        .prz-bp { background:var(--orange); color:#fff; border:none; font-family:'Montserrat',sans-serif; font-weight:700; font-size:15px; padding:15px 26px; cursor:pointer; }
        .prz-bg { background:transparent; color:var(--navy); border:1px solid var(--navy); font-family:'Montserrat',sans-serif; font-weight:600; font-size:15px; padding:15px 24px; cursor:pointer; }
        .prz-herofig { position:relative; }
        .prz-herofig img { width:100%; display:block; }
        .prz-herofig .cap { position:absolute; bottom:-2px; left:0; font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--grey-2); letter-spacing:.06em; }
        .prz-herostats { grid-column:1 / -1; display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid var(--line); margin-top:48px; }
        .prz-hs { padding:28px 0; border-right:1px solid var(--line); }
        .prz-hs:last-child { border-right:none; }
        .prz-hs b { display:block; font-family:'Montserrat',sans-serif; font-weight:800; font-size:26px; letter-spacing:-0.01em; }
        .prz-hs span { font-size:13px; color:var(--grey); }

        /* TRUST */
        .prz-trust { padding:24px 56px; display:flex; gap:36px; align-items:center; }
        .prz-trust .lbl { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--grey-2); white-space:nowrap; }
        .prz-trust b { font-family:'Montserrat',sans-serif; font-weight:600; font-size:16px; color:var(--grey); }
        .prz-trust .row { display:flex; flex-direction:row; gap:36px; }

        /* SERVICES */
        .prz-sec { padding:84px 56px; }
        .prz-h2 { font-weight:800; font-size:40px; letter-spacing:-0.02em; margin:10px 0 0; max-width:640px; text-wrap:balance; }
        .prz-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:48px; }
        .prz-card { background:var(--paper); border:1px solid var(--line); padding:34px 30px; display:flex; flex-direction:column; min-height:330px; }
        .prz-card .no { font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--orange); letter-spacing:.08em; }
        .prz-card h3 { font-weight:700; font-size:23px; margin:44px 0 12px; }
        .prz-card p { color:var(--ink-2); font-size:15px; line-height:1.6; margin:0; }
        .prz-card ul { list-style:none; padding:0; margin:18px 0 0; }
        .prz-card li { font-family:'IBM Plex Mono',monospace; font-size:12.5px; color:var(--ink-2); padding:8px 0; border-top:1px solid var(--line-2); }
        .prz-card .price { margin-top:auto; padding-top:18px; font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--navy); }
        .prz-card .price small { color:var(--grey); }

        /* PROCESS band */
        .prz-band { background:var(--navy); color:#eef2f6; padding:72px 56px; }
        .prz-band .prz-ey { color:var(--orange); }
        .prz-band h2 { font-weight:800; font-size:38px; letter-spacing:-0.02em; margin:10px 0 40px; color:#fff; }
        .prz-flow { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.12); }
        .prz-step { background:var(--navy); padding:28px 24px; }
        .prz-step .s { font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--orange); }
        .prz-step h4 { font-weight:700; font-size:18px; margin:12px 0 8px; color:#fff; }
        .prz-step p { font-size:13.5px; color:#aab6c4; line-height:1.55; margin:0; }

        /* CTA */
        .prz-cta-sec { background:var(--paper); padding:80px 56px; display:grid; grid-template-columns:1fr auto; align-items:center; gap:40px; border-top:1px solid var(--line); }
        .prz-cta-sec h2 { font-weight:800; font-size:42px; letter-spacing:-0.02em; margin:8px 0 0; max-width:560px; text-wrap:balance; }
      `}</style>

      <div className="prz-nav">
        <img className="logo" src="assets/brand/spm-wordmark-color.png" alt="SPM Design Solutions" />
        <nav className="prz-navlinks">
          <a href="#">Services</a>
          <a href="#">Work</a>
          <a href="#">Courses</a>
          <a href="#">About</a>
          <button className="prz-cta">Book a call</button>
        </nav>
      </div>

      <div className="prz-hero">
        <div>
          <div className="prz-ey">Automation · AI · Mechanical design</div>
          <h1 className="prz-h1">Engineer the <mark>busywork</mark> out of your design office.</h1>
          <p className="prz-sub">SPM builds iLogic automation and AI workflows that cut 40–70% of repetitive CAD work — pressure vessels, tanks and piping, to ASME, EN 13480 and PED.</p>
          <div className="prz-actions">
            <button className="prz-bp">Book a discovery call</button>
            <button className="prz-bg">See the work</button>
          </div>
        </div>
        <div className="prz-herofig">
          <img src="assets/brand/spm-mark-technical.png" alt="SPM technical illustration — annotated pressure vessel" />
        </div>
        <div className="prz-herostats">
          <div className="prz-hs"><b>40–70%</b><span>time saved</span></div>
          <div className="prz-hs"><b>ASME · PED</b><span>standards-aware</span></div>
          <div className="prz-hs"><b>BE · DE · NL</b><span>EU based</span></div>
          <div className="prz-hs"><b>15+ yrs</b><span>plant design</span></div>
        </div>
      </div>

      <div className="prz-trust">
        <span className="lbl">Built on</span>
        <div className="row">
          <b>Autodesk Inventor</b><b>AutoCAD</b><b>SolidWorks</b><b>Solid Edge</b><b>Python</b>
        </div>
      </div>

      <div className="prz-sec">
        <div className="prz-ey grey">What we build</div>
        <h2 className="prz-h2">Three ways we remove the repetition</h2>
        <div className="prz-cards">
          <div className="prz-card">
            <div className="no">01 / Automation</div>
            <h3>CAD Automation</h3>
            <p>Custom iLogic, macros and scripts that erase manual repetition in Inventor.</p>
            <ul>
              <li>Auto flange &amp; nozzle insertion</li>
              <li>Excel ↔ CAD data sync</li>
              <li>Numbering &amp; revision control</li>
            </ul>
            <div className="price">€1,500–€8,000 <small>/ project</small></div>
          </div>
          <div className="prz-card">
            <div className="no">02 / Intelligence</div>
            <h3>AI for Design</h3>
            <p>Assistants trained on your standards that check, classify and document.</p>
            <ul>
              <li>ASME / EN 13480 design checks</li>
              <li>Isometric &amp; P&amp;ID reading</li>
              <li>Auto technical reports</li>
            </ul>
            <div className="price">€3,000–€20,000 <small>+ retainer</small></div>
          </div>
          <div className="prz-card">
            <div className="no">03 / Enablement</div>
            <h3>Training &amp; Courses</h3>
            <p>Inventor and iLogic, taught for real plant and piping work.</p>
            <ul>
              <li>iLogic automation from zero</li>
              <li>Live workshops &amp; 1:1 mentoring</li>
              <li>Async on-demand courses</li>
            </ul>
            <div className="price">€197–€2,500 <small>/ seat</small></div>
          </div>
        </div>
      </div>

      <div className="prz-band">
        <div className="prz-ey">How a project runs</div>
        <h2>From painful workflow to shipped automation</h2>
        <div className="prz-flow">
          <div className="prz-step"><div className="s">01</div><h4>Map</h4><p>We watch one real workflow and quantify the hours lost.</p></div>
          <div className="prz-step"><div className="s">02</div><h4>Pilot</h4><p>A fixed-scope automation proven on your own drawings.</p></div>
          <div className="prz-step"><div className="s">03</div><h4>Deploy</h4><p>Rolled out with templates and team documentation.</p></div>
          <div className="prz-step"><div className="s">04</div><h4>Scale</h4><p>Adjacent tasks automated; AI layered on where it pays.</p></div>
        </div>
      </div>

      <div className="prz-cta-sec">
        <div>
          <div className="prz-ey">Start a pilot</div>
          <h2>Let's automate one painful workflow first.</h2>
        </div>
        <button className="prz-bp">Book a discovery call</button>
      </div>
    </div>
  );
}
window.PrecisionDirection = PrecisionDirection;
