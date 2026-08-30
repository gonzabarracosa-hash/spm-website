// Direction C — "AI Terminal" · SPM brand palette
// Near-black Oxford Blue, terminal motif. Logic Green for live data,
// Signal Orange for primary CTA. Montserrat · Inter · IBM Plex Mono.
function TerminalDirection() {
  return (
    <div className="aiz">
      <style>{`
        .aiz {
          --navy:#0A1D37;
          --bg:#06101f;
          --panel:#0c1d33;
          --panel-2:#102540;
          --orange:#FF6A00;
          --green:#32C36A;
          --cloud:#F5F7FA;
          --ink:#e9eef5;
          --ink-2:#93a3b8;
          --ink-3:#5a6b80;
          --line:#19314f;
          width:1440px;
          background:var(--bg);
          color:var(--ink);
          font-family:'Inter',sans-serif;
        }
        .aiz * { box-sizing:border-box; }
        .aiz h1,.aiz h2,.aiz h3,.aiz h4 { font-family:'Montserrat',sans-serif; }
        .aiz-mono { font-family:'IBM Plex Mono',monospace; }
        .aiz-ey { font-family:'IBM Plex Mono',monospace; font-size:12px; letter-spacing:.1em; color:var(--green); display:inline-flex; align-items:center; }
        .aiz-dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--green); margin-right:9px; box-shadow:0 0 10px var(--green); }

        /* NAV */
        .aiz-nav { display:flex; align-items:center; justify-content:space-between; padding:20px 56px; border-bottom:1px solid var(--line); background:rgba(6,16,31,.85); }
        .aiz-nav img.logo { height:28px; display:block; }
        .aiz-navlinks { display:flex; align-items:center; gap:30px; }
        .aiz-navlinks a { font-family:'IBM Plex Mono',monospace; color:var(--ink-2); text-decoration:none; font-size:13px; }
        .aiz-navlinks a:hover { color:var(--ink); }
        .aiz-cta { background:var(--orange); color:#fff; border:none; font-family:'Montserrat',sans-serif; font-weight:700; font-size:13px; padding:11px 18px; cursor:pointer; }

        /* HERO */
        .aiz-hero { padding:76px 56px 56px; display:grid; grid-template-columns:1fr 0.96fr; gap:54px; align-items:center; position:relative; }
        .aiz-glow { position:absolute; top:-120px; left:28%; width:620px; height:440px; background:radial-gradient(ellipse at center, rgba(50,195,106,0.10), transparent 70%); pointer-events:none; }
        .aiz-h1 { font-weight:800; font-size:58px; line-height:1.04; letter-spacing:-0.03em; margin:20px 0 0; text-wrap:balance; position:relative; }
        .aiz-h1 em { font-style:normal; color:var(--orange); }
        .aiz-sub { color:var(--ink-2); font-size:18px; line-height:1.6; max-width:470px; margin:22px 0 0; }
        .aiz-actions { display:flex; gap:14px; margin-top:34px; align-items:center; }
        .aiz-bp { background:var(--orange); color:#fff; border:none; font-family:'Montserrat',sans-serif; font-weight:700; font-size:14px; padding:15px 24px; cursor:pointer; }
        .aiz-bg { background:transparent; color:var(--ink); border:1px solid var(--line); font-family:'IBM Plex Mono',monospace; font-size:14px; padding:15px 22px; cursor:pointer; }
        .aiz-meta { display:flex; gap:28px; margin-top:42px; font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--ink-3); }
        .aiz-meta b { color:var(--ink); font-weight:500; }

        /* terminal window */
        .aiz-term { background:var(--panel); border:1px solid var(--line); border-radius:10px; overflow:hidden; box-shadow:0 40px 90px -40px rgba(0,0,0,.9); }
        .aiz-termbar { display:flex; align-items:center; gap:8px; padding:12px 14px; border-bottom:1px solid var(--line); background:var(--panel-2); }
        .aiz-tb { width:11px; height:11px; border-radius:50%; background:#26405e; }
        .aiz-tb.g { background:var(--green); }
        .aiz-termtitle { font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--ink-3); margin-left:8px; }
        .aiz-termbody { padding:22px 22px 26px; font-family:'IBM Plex Mono',monospace; font-size:13px; line-height:1.95; }
        .aiz-p { color:var(--orange); }
        .aiz-l { color:var(--ink-2); }
        .aiz-c { color:var(--ink-3); }
        .aiz-ok { color:var(--green); }
        .aiz-w { color:#fff; }
        .aiz-bar { height:6px; background:var(--panel-2); border:1px solid var(--line); margin:10px 0; position:relative; overflow:hidden; border-radius:3px; }
        .aiz-bar i { position:absolute; inset:0; right:32%; background:var(--green); display:block; }
        .aiz-cursor { display:inline-block; width:8px; height:15px; background:var(--green); vertical-align:-2px; }

        /* TRUST */
        .aiz-trust { border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:22px 56px; display:flex; gap:38px; align-items:center; }
        .aiz-trust .lbl { font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); white-space:nowrap; }
        .aiz-trust b { font-family:'Montserrat',sans-serif; font-size:14px; color:var(--ink-2); font-weight:600; }
        .aiz-trust .row { display:flex; flex-direction:row; gap:34px; }

        /* SERVICES */
        .aiz-sec { padding:84px 56px; }
        .aiz-h2 { font-weight:800; font-size:40px; letter-spacing:-0.02em; margin:10px 0 0; }
        .aiz-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:46px; }
        .aiz-card { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:30px 26px; display:flex; flex-direction:column; min-height:330px; transition:border-color .2s; }
        .aiz-card:hover { border-color:var(--green); }
        .aiz-card .no { font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--green); }
        .aiz-card h3 { font-weight:700; font-size:22px; margin:46px 0 12px; }
        .aiz-card p { color:var(--ink-2); font-size:15px; line-height:1.6; margin:0; }
        .aiz-card ul { list-style:none; padding:0; margin:18px 0 0; }
        .aiz-card li { font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--ink-2); padding:7px 0; border-top:1px solid var(--line); display:flex; gap:9px; }
        .aiz-card li::before { content:'›'; color:var(--orange); }
        .aiz-card .price { margin-top:auto; padding-top:18px; font-family:'IBM Plex Mono',monospace; font-size:13px; color:var(--ink); }
        .aiz-card .price small { color:var(--ink-3); }

        /* METRIC */
        .aiz-band { padding:0 56px; display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .aiz-metric { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:34px 30px; }
        .aiz-metric b { display:block; font-family:'Montserrat',sans-serif; font-size:42px; font-weight:800; letter-spacing:-0.02em; color:var(--green); }
        .aiz-metric b.o { color:var(--orange); }
        .aiz-metric span { color:var(--ink-2); font-size:14px; }

        /* CTA */
        .aiz-cta-sec { padding:92px 56px; text-align:center; position:relative; }
        .aiz-cta-sec h2 { font-weight:800; font-size:46px; letter-spacing:-0.03em; margin:14px 0; }
        .aiz-cta-sec p { color:var(--ink-2); font-size:17px; max-width:520px; margin:0 auto 30px; }
      `}</style>

      <div className="aiz-nav">
        <img className="logo" src="assets/brand/spm-wordmark-white.png" alt="SPM Design Solutions" />
        <nav className="aiz-navlinks">
          <a href="#">_services</a>
          <a href="#">_work</a>
          <a href="#">_courses</a>
          <a href="#">_about</a>
          <button className="aiz-cta">Book a call</button>
        </nav>
      </div>

      <div className="aiz-hero">
        <div className="aiz-glow"></div>
        <div>
          <div className="aiz-ey"><span className="aiz-dot"></span>AI · automation for mechanical design</div>
          <h1 className="aiz-h1">Your design office, running <em>40–70%</em> faster.</h1>
          <p className="aiz-sub">SPM builds iLogic automations and AI assistants that take repetitive CAD work off your engineers — standards-aware for ASME, EN 13480 and PED.</p>
          <div className="aiz-actions">
            <button className="aiz-bp">Book a call</button>
            <button className="aiz-bg">view demos</button>
          </div>
          <div className="aiz-meta">
            <span>standards <b>ASME · PED</b></span>
            <span>based <b>Belgium · EU</b></span>
            <span>stack <b>Inventor · Python</b></span>
          </div>
        </div>

        <div className="aiz-term">
          <div className="aiz-termbar">
            <span className="aiz-tb"></span><span className="aiz-tb"></span><span className="aiz-tb g"></span>
            <span className="aiz-termtitle">spm-agent — flange-set.ilogic</span>
          </div>
          <div className="aiz-termbody">
            <div><span className="aiz-p">spm ›</span> <span className="aiz-w">run flange-insert --from sheet.xlsx</span></div>
            <div className="aiz-c"># reading 142 nozzle definitions...</div>
            <div className="aiz-l">parsing standards <span className="aiz-ok">ASME B16.5 ✓</span></div>
            <div className="aiz-l">placing flanges on model</div>
            <div className="aiz-bar"><i></i></div>
            <div className="aiz-l">drawings numbered <span className="aiz-ok">142/142 ✓</span></div>
            <div className="aiz-l">revision set <span className="aiz-ok">IFC → AFC ✓</span></div>
            <div><span className="aiz-ok">done</span> <span className="aiz-c">in 38s · est. manual: 6h 20m</span></div>
            <div><span className="aiz-p">spm ›</span> <span className="aiz-cursor"></span></div>
          </div>
        </div>
      </div>

      <div className="aiz-trust">
        <span className="lbl">Built on</span>
        <div className="row">
          <b>Autodesk Inventor</b><b>AutoCAD</b><b>SolidWorks</b><b>Solid Edge</b><b>Python</b>
        </div>
      </div>

      <div className="aiz-sec">
        <div className="aiz-ey">// what we build</div>
        <h2 className="aiz-h2">Three ways we remove the busywork</h2>
        <div className="aiz-cards">
          <div className="aiz-card">
            <div className="no">01 · automation</div>
            <h3>CAD Automation</h3>
            <p>Custom iLogic, macros and scripts that erase manual repetition in Inventor.</p>
            <ul>
              <li>auto flange &amp; nozzle insertion</li>
              <li>excel ↔ cad data sync</li>
              <li>numbering &amp; revision control</li>
            </ul>
            <div className="price">€1,500–€8,000 <small>/ project</small></div>
          </div>
          <div className="aiz-card">
            <div className="no">02 · intelligence</div>
            <h3>AI for Design</h3>
            <p>Assistants trained on your standards that check, classify and document.</p>
            <ul>
              <li>ASME / EN 13480 checks</li>
              <li>isometric &amp; P&amp;ID reading</li>
              <li>auto technical reports</li>
            </ul>
            <div className="price">€3,000–€20,000 <small>+ retainer</small></div>
          </div>
          <div className="aiz-card">
            <div className="no">03 · enablement</div>
            <h3>Training &amp; Courses</h3>
            <p>Inventor and iLogic, taught for real plant and piping work.</p>
            <ul>
              <li>iLogic automation from zero</li>
              <li>live workshops &amp; 1:1 mentoring</li>
              <li>async on-demand courses</li>
            </ul>
            <div className="price">€197–€2,500 <small>/ seat</small></div>
          </div>
        </div>
      </div>

      <div className="aiz-band">
        <div className="aiz-metric"><b className="o">40–70%</b><span>fewer hours on repetitive tasks</span></div>
        <div className="aiz-metric"><b>38s</b><span>vs. 6h+ manual on a flange set</span></div>
        <div className="aiz-metric"><b>€2.5B</b><span>EU CAD-automation market</span></div>
      </div>

      <div className="aiz-cta-sec">
        <div className="aiz-ey" style={{justifyContent:'center'}}>// start a pilot</div>
        <h2>Pick one painful workflow. We'll automate it.</h2>
        <p>A small, fixed-scope pilot proven on your own drawings — then scale across the office.</p>
        <button className="aiz-bp">Book a discovery call</button>
      </div>
    </div>
  );
}
window.TerminalDirection = TerminalDirection;
