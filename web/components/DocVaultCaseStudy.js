export default function DocVaultCaseStudy() {
  return (
    <main id="top">
      {/* ===== Case study hero ===== */}
      <section className="cs-hero">
        <div className="wrap">
          <div className="cs-crumb">
            <a href="/#work">Work</a> <span>/</span> <span>DocVault</span>
          </div>
          <span className="eyebrow">Client case · confidential</span>
          <h1>Your drawings stop living in a Windows folder.</h1>
          <p className="hero-sub">
            An industrial engineering client came to SPM with the classic problem: hundreds of drawings spread across shared
            folders and email threads, no one sure which revision was actually current. We built DocVault — a revision-aware
            document system that detects the current revision on its own — and delivered it in a single working session.
          </p>
          <div className="hero-actions">
            <a href="/#contact" className="btn btn-primary">
              <span>Get this for your team</span> <span className="arw">→</span>
            </a>
            <a href="#build" className="btn btn-ghost">
              See how it works
            </a>
          </div>
          <div className="cs-meta">
            <div>
              <div className="k mono">Client</div>
              <div className="v">Engineering &amp; Fabrication (confidential)</div>
            </div>
            <div>
              <div className="k mono">Delivered in</div>
              <div className="v">1 working session</div>
            </div>
            <div>
              <div className="k mono">Stack</div>
              <div className="v">React · Node · SQLite</div>
            </div>
            <div>
              <div className="k mono">Category</div>
              <div className="v">CAD Automation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Demo ===== */}
      <section className="cs-demo">
        <div className="wrap">
          <div className="demo">
            <video
              src="/assets/SPM_DocVault_1x1.mp4"
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
            ></video>
          </div>
        </div>
      </section>

      {/* ===== Quote / problem ===== */}
      <section className="cs-quote">
        <div className="wrap">
          <blockquote>
            The email says <span className="strike">&ldquo;Rev2&rdquo;</span>. The folder says{' '}
            <span className="strike">&ldquo;Rev2_final_v3&rdquo;</span>.<span className="o"> Nobody knew which one was current.</span>
          </blockquote>
          <div className="cite">— how the client described their drawing repository before DocVault</div>
        </div>
      </section>

      {/* ===== Capabilities (reuses .svc-grid / .svc) ===== */}
      <section className="section" id="build">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">What we delivered</span>
            <h2>Five things it does on its own — no plugins, no templates to fill in.</h2>
            <p>Every capability below is running in the delivered build, not a mockup of a plan.</p>
          </div>

          <div className="svc-grid" style={{ marginTop: 52 }}>
            <article className="svc cs-svc">
              <span className="no">01 / Parsing engine</span>
              <h3>Revisions detected from the real filename</h3>
              <p>
                When a PDF and its DWG share a name, they&apos;re grouped as the same revision — not two different ones. Sheet
                numbers (<span className="mono">sht;001</span>, <span className="mono">sht;002</span>…) become separate
                documents instead of fake revisions.
              </p>
              <div className="mock" style={{ marginTop: 18 }}>
                <div className="mh">
                  <span>2401AB_Roof_platform_r1_0519</span>
                </div>
                <div className="mb">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className="revchip old">Rev0</span>
                    <span className="revchip cur">Rev1 ✓ current</span>
                  </div>
                  <div className="filepair">
                    <span className="fbadge pdf">PDF</span>
                    <span className="fname">...r1_0519.pdf</span>
                    <span style={{ color: 'var(--grey-2)' }}>=</span>
                    <span className="fbadge dwg">DWG</span>
                    <span className="fname">...r1_0519.dwg</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="svc cs-svc">
              <span className="no">02 / Document register</span>
              <h3>A real register, not a folder of 400 files</h3>
              <p>
                Name, real revision date, current rev. and a direct link always pointing at what&apos;s current. Nothing is
                ever deleted; every prior revision stays on record.
              </p>
              <div className="mock" style={{ marginTop: 18 }}>
                <div className="mh">
                  <span>D45-D2401A register</span>
                </div>
                <div className="mb">
                  <table className="mini-tbl">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Date</th>
                        <th>Rev.</th>
                        <th>PDF</th>
                        <th>DWG</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>GA-2401</td>
                        <td className="mono">19/05/25</td>
                        <td>
                          <span className="revchip cur">Rev2</span>
                        </td>
                        <td>
                          <span className="plink">View</span>
                        </td>
                        <td>
                          <span className="plink">View</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Nozzle Orientation</td>
                        <td className="mono">02/06/25</td>
                        <td>
                          <span className="revchip cur">Rev1</span>
                        </td>
                        <td>
                          <span className="plink">View</span>
                        </td>
                        <td>—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            <article className="svc cs-svc">
              <span className="no">03 / Own viewer</span>
              <h3>PDF renders in-app, full screen on demand</h3>
              <p>
                Drawings render inside the app instead of depending on the browser&apos;s own PDF handling — no
                &quot;download instead of view&quot; surprises. One click expands to full screen with zoom.
              </p>
              <div className="viewer" style={{ marginTop: 18 }}>
                <div className="tb">
                  <span className="fl mono" style={{ margin: 0 }}>
                    GA-2401_r2.pdf
                  </span>
                  <div className="z">
                    <span className="zb">−</span>
                    <span>150%</span>
                    <span className="zb">+</span>
                  </div>
                </div>
                <div className="cv">
                  <svg viewBox="0 0 200 140" fill="none" stroke="#0A1D37" strokeWidth="0.6">
                    <rect x="8" y="8" width="184" height="124" />
                    <circle cx="100" cy="70" r="42" />
                    <line x1="100" y1="18" x2="100" y2="122" />
                    <line x1="48" y1="70" x2="152" y2="70" />
                    <circle cx="100" cy="70" r="3" fill="#FF6A00" stroke="none" />
                  </svg>
                </div>
              </div>
            </article>

            <article className="svc cs-svc">
              <span className="no">04 / Search</span>
              <h3>Search the way you&apos;d say it, not file it</h3>
              <p>
                A lightweight intent engine bridges Spanish/English technical vocabulary (tanque↔tank, bomba↔pump) and
                understands phrases like &quot;latest drawing of&quot; or &quot;recently added&quot; without manual filters.
              </p>
              <div className="mock" style={{ marginTop: 18 }}>
                <div className="mb">
                  <div className="search-mk">
                    <span style={{ opacity: 0.5 }}>⌕</span>
                    <span className="q">último plano del tanque sulfur</span>
                  </div>
                  <div className="interp">
                    interpreted as: <b>&quot;tanque tank sulfur&quot;</b> · latest revision
                  </div>
                  <div className="sresult">
                    <div>
                      <div className="rn">GA-2401 · General Arrangement</div>
                      <div className="rs">A9519 / D45-D2401A</div>
                    </div>
                    <span className="revchip cur">Rev2 ✓</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="svc cs-svc">
              <span className="no">05 / Structure</span>
              <h3>The hierarchy the client&apos;s team already used</h3>
              <p>
                Documents live under Project → Equipment, mirroring the tag numbering already used on the shop floor — not a
                new taxonomy the team had to learn.
              </p>
              <div className="mock" style={{ marginTop: 18 }}>
                <div className="mb tree">
                  <div className="p">A9519 SAMSUNG FADHILI IV</div>
                  <div className="e active">
                    D45-D2401A · Sulfur Storage Tank <span className="cnt">6</span>
                  </div>
                  <div className="e">
                    D45-D2402 · Condensate Tank <span className="cnt">3</span>
                  </div>
                  <div className="e">
                    D45-P2101 · Pump <span className="cnt">2</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="svc cs-svc" style={{ background: 'var(--navy)', borderColor: 'var(--navy)' }}>
              <span className="no" style={{ color: 'var(--orange)' }}>
                Why it matters
              </span>
              <h3 style={{ color: '#fff' }}>This is the kind of thing we deliver for clients</h3>
              <p style={{ color: '#aeb9c7' }}>
                DocVault shipped for one engineering client, but the same automation approach applies to drawing numbering,
                BOM sync, revision control and AI design checks inside your own CAD environment.
              </p>
              <a href="/#services" className="btn btn-ghost on-dark" style={{ marginTop: 'auto' }}>
                See the services →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Stat strip ===== */}
      <section className="cs-stat">
        <div className="wrap">
          <div className="num">1</div>
          <div className="lbl">Working session</div>
          <p className="sub">
            From spec to running system, with no backlog and no slide deck in between. That&apos;s how SPM works: straight to
            what runs.
          </p>
          <div className="cs-facts">
            <span>React + TypeScript</span>
            <span>Node + Express + Prisma</span>
            <span>pdf.js — no browser plugins</span>
            <span>SQLite → scales to PostgreSQL</span>
          </div>
        </div>
      </section>

      {/* ===== Closing CTA ===== */}
      <section className="cs-cta">
        <div className="wrap">
          <span className="eyebrow">Start a pilot</span>
          <h2>Still searching for drawings by filename?</h2>
          <p>
            This is what SPM does: custom systems that automate the repetitive parts of engineering — CAD, documentation,
            revision workflows. If your drawing process is a mess of folders and emails, let&apos;s talk about what yours
            would look like.
          </p>
          <div className="actions">
            <a href="/#contact" className="btn btn-primary">
              <span>Talk to SPM</span> <span className="arw">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
