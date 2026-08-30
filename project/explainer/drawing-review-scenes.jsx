// Scene components for the automatic drawing-review explainer — SPM brand system.
const HEAD = '"Montserrat", system-ui, sans-serif';
const BODY = '"Inter", system-ui, sans-serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const SUCCESS = '#3FBF7A';
const WARN = '#FE6100';
const LIGHT_THEME = { bg: '#F4F8FB', panel: '#FFFFFF', panelBorder: '#E1E6EA', chrome: '#EEF2F5', text: '#0A1C3A', textMuted: '#7A8490' };
const DARK_THEME = { bg: '#0A1C3A', panel: '#122641', panelBorder: '#25395A', chrome: '#0F2038', text: '#F4F8FB', textMuted: '#93A0B4' };
const ISO_IMG = './drawing-p1.png';
const ThemeContext = React.createContext({ ...LIGHT_THEME, accent: WARN });

function inout(localTime, start, len, ease) {
  ease = ease || Easing.easeOutCubic;
  return ease(clamp((localTime - start) / len, 0, 1));
}

function SoftwareWindow({ theme, title, children, w, h }) {
  w = w || 1280; h = h || 760;
  return (
    <div style={{ width: w, height: h, background: theme.panel, border: `1px solid ${theme.panelBorder}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 30px 80px rgba(10,28,58,0.18)' }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', background: theme.chrome, borderBottom: `1px solid ${theme.panelBorder}`, flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ marginLeft: 14, fontFamily: MONO, fontSize: 22, color: theme.textMuted }}>{title}</div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: h - 64 }}>{children}</div>
    </div>
  );
}

// ── 1. Hook ──────────────────────────────────────────────────────────────
function Hook({ localTime }) {
  const th = React.useContext(ThemeContext);
  const items = ['Cross-check every dimension against the BOM', 'Confirm every BOM item is ballooned in a view', 'Catch empty title-block and mass fields', 'Compare each sheet against the rest of the batch'];
  const headOp = inout(localTime, 0.3, 0.6);
  const subOp = inout(localTime, 0.9, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 160px' }}>
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 16}px)` }}>
        <div style={{ fontFamily: HEAD, fontSize: 58, fontWeight: 800, color: th.text, lineHeight: 1.15, maxWidth: 1280 }}>Checking 70 fabrication drawings by eye is where errors slip through.</div>
      </div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 12}px)`, marginTop: 22 }}>
        <div style={{ fontSize: 26, color: th.textMuted, fontFamily: BODY }}>Every sheet, every dimension, every balloon — before release to fabrication.</div>
      </div>
      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((label, i) => {
          const op = inout(localTime, 1.5 + i * 0.32, 0.45);
          return (
            <div key={i} style={{ opacity: op, transform: `translateX(${(1 - op) * -14}px)`, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: th.textMuted, flexShrink: 0 }} />
              <div style={{ fontSize: 24, color: th.textMuted, fontFamily: BODY }}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 2. Solution ──────────────────────────────────────────────────────────
function Solution({ localTime }) {
  const th = React.useContext(ThemeContext);
  const op = inout(localTime, 0.25, 0.6);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ opacity: op, transform: `scale(${0.94 + 0.06 * op})`, padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${th.accent}`, background: `${th.accent}14`, fontFamily: BODY, fontSize: 24, fontWeight: 700, color: th.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Automated drawing review</div>
      <div style={{ opacity: op, fontFamily: HEAD, fontSize: 54, fontWeight: 800, color: th.text, textAlign: 'center', maxWidth: 1250 }}>The whole batch, reviewed sheet by sheet.</div>
    </div>
  );
}

// ── 3. What it cross-checks ──────────────────────────────────────────────
function Checks({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.15, 0.4);
  const cards = [
    { t: 'Parts List', d: 'Radius, length, material and quantity per item' },
    { t: 'Views', d: 'Dimensions and balloons against every BOM row' },
    { t: 'Title block', d: 'Drawing number, panel list, total mass' },
    { t: 'The batch', d: 'Each sheet against comparable panels' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 24, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>What it cross-checks</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 460px)', gap: 30 }}>
        {cards.map((c, i) => {
          const op = inout(localTime, 0.6 + i * 0.3, 0.4);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${(1 - op) * 12}px)`, padding: 34, borderRadius: 14, background: th.panel, border: `1px solid ${th.panelBorder}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: HEAD, fontSize: 30, fontWeight: 800, color: th.text }}>{c.t}</div>
              <div style={{ fontFamily: BODY, fontSize: 24, color: th.textMuted, lineHeight: 1.4, textWrap: 'pretty' }}>{c.d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 4. Reading the sheet ────────────────────────────────────────────────
function Scan({ localTime }) {
  const th = React.useContext(ThemeContext);
  const winOp = inout(localTime, 0.15, 0.5);
  const bomRows = [
    { pos: '100-057', desc: 'TE-PROFILE', radius: '' },
    { pos: '120-021', desc: 'TE-PROFILE BEND Rinside', radius: '12856', flag: true },
    { pos: '211', desc: 'END PIECE PLATE TYPE 1', radius: '' },
    { pos: '267', desc: 'JIC FITTING SAE514', radius: '' },
    { pos: '530', desc: 'WELDED STRAP WITH SLOTTED HOLES', radius: '12883', flag: true },
  ];
  const sweep = clamp((localTime - 0.7) / 2.4, 0, 1);
  const labelOp = inout(localTime, 0.4, 0.4);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
      <div style={{ opacity: labelOp, fontFamily: BODY, fontSize: 24, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Reading the sheet</div>
      <div style={{ opacity: winOp, transform: `scale(${0.96 + 0.04 * winOp})` }}>
        <SoftwareWindow theme={th} title="A9519-14105-D45-A-2401AB-0065 · Rev 0 · Panel 1" w={1560} h={720}>
          <div style={{ display: 'flex', height: '100%', background: '#fff' }}>
            <div style={{ flex: '0 0 620px', position: 'relative', borderRight: '1px solid #E1E6EA', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '18px 26px 0', fontFamily: BODY, fontSize: 24, fontWeight: 700, color: '#7A8490', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Isometric view</div>
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 22px 22px' }}>
                <img src={ISO_IMG} style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                <div style={{ position: 'absolute', left: 18, right: 18, top: `${8 + sweep * 84}%`, height: 3, background: WARN, boxShadow: `0 0 20px 4px ${WARN}66` }} />
              </div>
            </div>
            <div style={{ flex: 1, padding: '18px 30px 0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: BODY, fontSize: 24, fontWeight: 700, color: '#7A8490', letterSpacing: '0.08em', marginBottom: 12, textTransform: 'uppercase' }}>Parts list</div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 130px', padding: '0 0 12px', borderBottom: '2px solid #E1E6EA', fontFamily: BODY, fontSize: 24, fontWeight: 700, color: '#7A8490' }}>
                <div>Pos No.</div><div>Description</div><div style={{ textAlign: 'right' }}>Radius</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {bomRows.map((r, i) => {
                  const op = inout(localTime, 0.7 + i * 0.42, 0.3);
                  const lit = r.flag && localTime > 0.7 + i * 0.42 + 0.3;
                  return (
                    <div key={i} style={{ opacity: op, display: 'grid', gridTemplateColumns: '150px 1fr 130px', padding: '20px 0', borderBottom: '1px solid #EEF2F5', alignItems: 'center', background: lit ? `${WARN}12` : 'transparent' }}>
                      <div style={{ fontFamily: MONO, fontSize: 25, color: '#0A1C3A', fontWeight: 600 }}>{r.pos}</div>
                      <div style={{ fontFamily: BODY, fontSize: 24, color: '#0A1C3A', lineHeight: 1.25, paddingRight: 12 }}>{r.desc}</div>
                      <div style={{ fontFamily: MONO, fontSize: 25, textAlign: 'right', color: lit ? WARN : '#7A8490', fontWeight: lit ? 700 : 400 }}>{r.radius || '—'}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 44, padding: '24px 0 26px', borderTop: '2px solid #E1E6EA' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontFamily: BODY, fontSize: 24, fontWeight: 700, color: '#7A8490', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total mass</div>
                  <div style={{ fontFamily: MONO, fontSize: 26, color: '#0A1C3A' }}>69.545 kg</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontFamily: BODY, fontSize: 24, fontWeight: 700, color: '#7A8490', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Panel list</div>
                  <div style={{ fontFamily: MONO, fontSize: 26, color: '#0A1C3A' }}>D45-D-2401A-0001 / B-0001</div>
                </div>
              </div>
            </div>
          </div>
        </SoftwareWindow>
      </div>
    </div>
  );
}

// ── 5. The finding (appended report page) ───────────────────────────────
function Finding({ localTime }) {
  const th = React.useContext(ThemeContext);
  const cardOp = inout(localTime, 0.2, 0.5);
  const rows = [
    { k: 'Ubicación', v: 'Vista "Section A-A", cotas de radio (dos instancias, ambas etiquetadas "R12883").' },
    { k: 'Valor actual', v: 'Las dos cotas de radio en el plano muestran R12883.' },
    { k: 'Valor esperado', v: 'El BOM indica Radius = 12856 para el ítem 120-021 (TE-PROFILE BEND Rinside).' },
    { k: 'Motivo', v: 'El radio del perfil estructural 120-021 no está representado en la vista; sólo aparece el radio de la correa (530), repetido dos veces.' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 170px' }}>
      <div style={{ opacity: cardOp, transform: `scale(${0.97 + 0.03 * cardOp})`, width: '100%', background: '#fff', border: '1px solid #E1E6EA', borderRadius: 6, padding: '48px 56px', display: 'flex', flexDirection: 'column', gap: 26, boxShadow: '0 24px 60px rgba(10,28,58,0.14)' }}>
        <div style={{ fontFamily: BODY, fontSize: 25, color: '#7A8490', lineHeight: 1.5, borderBottom: '1px solid #E1E6EA', paddingBottom: 22 }}>
          Revisión de fabricación · Plano A9519-14105-D45-A-2401AB-0065 · Panel 1 · Rev 0
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ padding: '10px 20px', borderRadius: 6, background: WARN, fontFamily: BODY, fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>CORRECCIONES REQUERIDAS</div>
          <div style={{ fontFamily: BODY, fontSize: 24, color: '#7A8490' }}>1 issue found</div>
        </div>
        <div style={{ fontFamily: HEAD, fontSize: 28, fontWeight: 800, color: '#0A1C3A', letterSpacing: '0.02em' }}>HALLAZGO 1</div>
        {rows.map((r, i) => {
          const op = inout(localTime, 0.9 + i * 0.42, 0.4);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${(1 - op) * 8}px)`, display: 'grid', gridTemplateColumns: '230px 1fr', gap: 24, alignItems: 'baseline' }}>
              <div style={{ fontFamily: BODY, fontSize: 24, fontWeight: 700, color: '#7A8490' }}>{r.k}</div>
              <div style={{ fontFamily: BODY, fontSize: 27, color: '#0A1C3A', lineHeight: 1.45, textWrap: 'pretty' }}>{r.v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 6. Report appended to each sheet ─────────────────────────────────────
function Report({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.15, 0.4);
  const sheets = [
    { dwg: '0065', panel: 'Panel 1', issues: 1 },
    { dwg: '0084', panel: 'Panel 69/70/71/73…', issues: 1 },
    { dwg: '0085', panel: 'Panel 72/76', issues: 1 },
    { dwg: '0086', panel: 'Panel 77', issues: 3 },
    { dwg: '0087', panel: 'Panel 78', issues: 1 },
    { dwg: '0088', panel: 'Panel 83', issues: 2 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 24, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>One report page appended per sheet</div>
      <div style={{ width: 1380, background: th.panel, border: `1px solid ${th.panelBorder}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 50px rgba(10,28,58,0.10)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 260px', padding: '22px 36px', background: th.chrome, borderBottom: `1px solid ${th.panelBorder}`, fontFamily: BODY, fontSize: 22, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <div>Drawing</div><div>Panel</div><div>Status</div>
        </div>
        {sheets.map((s, i) => {
          const op = inout(localTime, 0.5 + i * 0.32, 0.35);
          return (
            <div key={i} style={{ opacity: op, transform: `translateX(${(1 - op) * -10}px)`, display: 'grid', gridTemplateColumns: '240px 1fr 260px', padding: '24px 36px', borderBottom: `1px solid ${th.panelBorder}`, fontFamily: BODY, fontSize: 26, alignItems: 'center' }}>
              <div style={{ fontFamily: MONO, fontSize: 26, color: th.text, fontWeight: 600 }}>{s.dwg}</div>
              <div style={{ color: th.textMuted }}>{s.panel}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: WARN }} />
                <span style={{ color: th.text, fontWeight: 500 }}>{s.issues} issue{s.issues > 1 ? 's' : ''}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 7. Benefits ──────────────────────────────────────────────────────────
function Benefits({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.2, 0.4);
  const items = ['Every finding traced to a BOM row or a comparable sheet', 'Missing balloons and empty mass fields caught before release', 'A whole batch reviewed in one pass'];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34, padding: '0 200px' }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 24, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>The result</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {items.map((label, i) => {
          const op = inout(localTime, 0.9 + i * 0.4, 0.4);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${(1 - op) * 10}px)`, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
              <span style={{ color: SUCCESS, fontSize: 26, fontWeight: 700, lineHeight: 1.3 }}>✓</span>
              <span style={{ fontSize: 30, color: th.text, fontFamily: BODY, fontWeight: 600, lineHeight: 1.3 }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 8. Outro ─────────────────────────────────────────────────────────────
function Outro({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.2, 0.6);
  const subOp = inout(localTime, 0.9, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center', padding: '0 200px' }}>
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 14}px)`, fontFamily: HEAD, fontSize: 54, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>Review drawings automatically, before fabrication.</div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 10}px)`, fontFamily: BODY, fontSize: 28, fontWeight: 700, color: th.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Every sheet. Every finding. Traceable.</div>
    </div>
  );
}

const ACCENT_OPTIONS = ['#FE6100', '#3FBF7A', '#0A1C3A'];

function DrawingReviewExplainer() {
  const tw = useTweaks(window.TWEAK_DEFAULTS);
  const t = tw[0], setTweak = tw[1];
  const base = t.theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const theme = Object.assign({}, base, { accent: t.accentColor || WARN });
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <SceneStage width={1920} height={1080} bg={theme.bg} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
          {{ Hook, Solution, Checks, Scan, Finding, Report, Benefits, Outro }}
        </SceneStage>
        <TweaksPanel>
          <TweakSection label="Motion" />
          <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
          <TweakSection label="Style" />
          <TweakColor label="Accent" value={t.accentColor} options={ACCENT_OPTIONS} onChange={(v) => setTweak('accentColor', v)} />
          <TweakRadio label="Theme" value={t.theme} options={['light', 'dark']} onChange={(v) => setTweak('theme', v)} />
        </TweaksPanel>
      </div>
    </ThemeContext.Provider>
  );
}

Object.assign(window, { DrawingReviewExplainer });
