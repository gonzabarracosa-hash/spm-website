// Scene components for the IDW drawing generator explainer video — SPM brand system.
const HEAD = '"Montserrat", system-ui, sans-serif';
const BODY = '"Inter", system-ui, sans-serif';
const SUCCESS = '#3FBF7A';
const LIGHT_THEME = { bg: '#F4F8FB', panel: '#FFFFFF', panelBorder: '#E1E6EA', chrome: '#EEF2F5', text: '#0A1C3A', textMuted: '#7A8490' };
const DARK_THEME = { bg: '#0A1C3A', panel: '#122641', panelBorder: '#25395A', chrome: '#0F2038', text: '#F4F8FB', textMuted: '#93A0B4' };
const REF_DRAWING = './uploads/pasted-1786546460444-0.png';
const ThemeContext = React.createContext({ ...LIGHT_THEME, accent: '#FE6100' });

function inout(localTime, start, len, ease) {
  ease = ease || Easing.easeOutCubic;
  return ease(clamp((localTime - start) / len, 0, 1));
}

function SoftwareWindow({ theme, title, children, w, h }) {
  w = w || 1280; h = h || 760;
  return (
    <div style={{ width: w, height: h, background: theme.panel, border: `1px solid ${theme.panelBorder}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 30px 80px rgba(10,28,58,0.18)' }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', background: theme.chrome, borderBottom: `1px solid ${theme.panelBorder}` }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ marginLeft: 12, fontFamily: BODY, fontSize: 15, color: theme.textMuted }}>{title}</div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: h - 56 }}>{children}</div>
    </div>
  );
}

function Highlight({ x, y, w, h, op, color, label }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, border: `2.5px solid ${color}`, borderRadius: 5, opacity: op, boxShadow: `0 0 0 4px ${color}22`, pointerEvents: 'none' }}>
      {label ? <div style={{ position: 'absolute', top: -28, left: 0, fontFamily: BODY, fontSize: 13, fontWeight: 700, color, whiteSpace: 'nowrap' }}>{label}</div> : null}
    </div>
  );
}

function Hook({ localTime }) {
  const th = React.useContext(ThemeContext);
  const items = ['Duplicate the reference drawing file by file', 'Swap the referenced model for each panel', 'Retype the title block, note and parts count', 'Rebuild the A/B panel-list table for every tank'];
  const headOp = inout(localTime, 0.3, 0.6);
  const subOp = inout(localTime, 0.9, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 160px' }}>
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 16}px)` }}>
        <div style={{ fontFamily: HEAD, fontSize: 58, fontWeight: 800, color: th.text, lineHeight: 1.15, maxWidth: 1250 }}>Building fabrication drawings one panel at a time is slow.</div>
      </div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 12}px)`, marginTop: 22 }}>
        <div style={{ fontSize: 26, color: th.textMuted, fontFamily: BODY }}>Every panel needs its own .idw, title block, note, and tank table.</div>
      </div>
      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((label, i) => {
          const start = 1.5 + i * 0.32;
          const op = inout(localTime, start, 0.45);
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

function Solution({ localTime }) {
  const th = React.useContext(ThemeContext);
  const op = inout(localTime, 0.25, 0.6);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ opacity: op, transform: `scale(${0.94 + 0.06 * op})`, padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${th.accent}`, background: `${th.accent}14`, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>iLogic rule + Excel</div>
      <div style={{ opacity: op, fontFamily: HEAD, fontSize: 52, fontWeight: 800, color: th.text, textAlign: 'center', maxWidth: 1250 }}>One reference drawing generates the whole batch.</div>
    </div>
  );
}

function Reference({ localTime }) {
  const th = React.useContext(ThemeContext);
  const winOp = inout(localTime, 0.15, 0.5);
  const capOp = inout(localTime, 0.6, 0.4);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
      <div style={{ opacity: capOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Step 1 — open the reference drawing</div>
      <div style={{ opacity: winOp, transform: `scale(${0.96 + 0.04 * winOp})` }}>
        <SoftwareWindow theme={th} title="Panel 220.idw — Inventor" w={1180} h={700}>
          <img src={REF_DRAWING} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
        </SoftwareWindow>
      </div>
      <div style={{ opacity: capOp, fontFamily: BODY, fontSize: 20, color: th.textMuted }}>Correct views for this geometry — every generated panel reuses them.</div>
    </div>
  );
}

function Prompt({ localTime }) {
  const th = React.useContext(ThemeContext);
  const winOp = inout(localTime, 0.15, 0.5);
  const full = '223, 224';
  const chars = Math.floor(clamp((localTime - 1.0) / 1.0, 0, 1) * full.length);
  const typed = full.slice(0, chars);
  const caretOn = Math.floor(localTime / 0.45) % 2 === 0 && chars < full.length;
  const active = chars >= full.length;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ opacity: winOp, transform: `scale(${0.94 + 0.06 * winOp})`, width: 560, background: th.panel, border: `1px solid ${th.panelBorder}`, borderRadius: 12, boxShadow: '0 20px 50px rgba(10,28,58,0.18)', padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ fontFamily: HEAD, fontSize: 22, fontWeight: 700, color: th.text }}>Which panels?</div>
        <div style={{ padding: '14px 16px', border: `1.5px solid ${th.accent}`, borderRadius: 8, fontFamily: BODY, fontSize: 22, color: th.text, background: th.chrome, minHeight: 28 }}>
          {typed}<span style={{ opacity: caretOn ? 1 : 0, color: th.accent }}>|</span>
        </div>
        <div style={{ fontFamily: BODY, fontSize: 15, color: th.textMuted }}>Comma-separated panel numbers</div>
        <div style={{ alignSelf: 'flex-end', padding: '10px 24px', borderRadius: 8, fontFamily: BODY, fontSize: 16, fontWeight: 600, color: active ? '#fff' : th.text, background: active ? th.accent : th.chrome, border: `1px solid ${th.panelBorder}` }}>OK</div>
      </div>
    </div>
  );
}

function GroupMatch({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.15, 0.4);
  const rowOp1 = inout(localTime, 0.6, 0.4);
  const rowOp2 = inout(localTime, 1.1, 0.4);
  const arrowOp = inout(localTime, 1.7, 0.4);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Looked up in the Excel drawing register</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <div style={{ opacity: rowOp1, display: 'flex', flexDirection: 'column', gap: 10, width: 260, padding: 24, borderRadius: 12, background: th.panel, border: `1px solid ${th.panelBorder}` }}>
          <div style={{ fontFamily: BODY, fontSize: 14, color: th.textMuted, textTransform: 'uppercase' }}>Panel 223, 224</div>
          <div style={{ fontFamily: HEAD, fontSize: 24, fontWeight: 800, color: th.text }}>Group #12</div>
        </div>
        <div style={{ opacity: arrowOp, fontFamily: BODY, fontSize: 30, color: th.accent, fontWeight: 700 }}>→</div>
        <div style={{ opacity: rowOp2, display: 'flex', flexDirection: 'column', gap: 10, width: 260, padding: 24, borderRadius: 12, background: th.panel, border: `1.5px solid ${th.accent}`, boxShadow: `0 0 0 5px ${th.accent}18` }}>
          <div style={{ fontFamily: BODY, fontSize: 14, color: th.textMuted, textTransform: 'uppercase' }}>Same group, first panel</div>
          <div style={{ fontFamily: HEAD, fontSize: 24, fontWeight: 800, color: th.accent }}>Panel 220</div>
        </div>
      </div>
    </div>
  );
}

function TitleBlock({ localTime }) {
  const th = React.useContext(ThemeContext);
  const winOp = inout(localTime, 0.15, 0.5);
  const hlDwg = inout(localTime, 0.9, 0.4) * (1 - inout(localTime, 2.6, 0.4));
  const hlOms = inout(localTime, 1.4, 0.4) * (1 - inout(localTime, 2.6, 0.4));
  const hlParts = inout(localTime, 1.9, 0.4) * (1 - inout(localTime, 2.6, 0.4));
  const hlTable = inout(localTime, 2.4, 0.4);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
      <div style={{ opacity: winOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Updated automatically, in the background</div>
      <div style={{ opacity: winOp, transform: `scale(${0.96 + 0.04 * winOp})`, position: 'relative' }}>
        <SoftwareWindow theme={th} title="223-224.idw — Inventor" w={1180} h={700}>
          <img src={REF_DRAWING} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#fff' }} />
          <Highlight x={45} y={572} w={230} h={20} op={hlOms} color={th.accent} label="Omschrijving → Panel 223/224" />
          <Highlight x={888} y={630} w={244} h={38} op={hlDwg} color={th.accent} label="DWG. NO. → new number" />
          <Highlight x={45} y={478} w={220} h={20} op={hlParts} color={th.accent} label="Parts List Nx Required" />
          <Highlight x={912} y={545} w={264} h={26} op={hlTable} color={th.accent} label="Panel list table — A / B" />
        </SoftwareWindow>
      </div>
    </div>
  );
}

function Result({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.15, 0.4);
  const rows = [
    { label: 'Copied 223-224.idw from reference', done: 0.5 },
    { label: 'Model reference → Panel 220', done: 1.1 },
    { label: 'Title block: Tek + Oms', done: 1.7 },
    { label: 'Parts List 2x Required', done: 2.3 },
    { label: 'Panel list table (A / B)', done: 2.9 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Generation report</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {rows.map((r, i) => {
          const op = inout(localTime, Math.max(0, r.done - 0.3), 0.35);
          const done = localTime > r.done;
          return (
            <div key={i} style={{ opacity: op, transform: `translateX(${(1 - op) * -12}px)`, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: done ? SUCCESS : th.panelBorder, fontSize: 22, fontWeight: 700 }}>✓</span>
              <span style={{ fontFamily: BODY, fontSize: 24, color: done ? th.text : th.textMuted }}>{r.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Benefits({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.2, 0.4);
  const items = ['No mismatched views between panels', 'Title block and tank table always consistent', 'A full batch generated in minutes'];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>The result</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {items.map((label, i) => {
          const start = 0.9 + i * 0.4;
          const op = inout(localTime, start, 0.4);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${(1 - op) * 10}px)`, display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ color: SUCCESS, fontSize: 26, fontWeight: 700 }}>✓</span>
              <span style={{ fontSize: 32, color: th.text, fontFamily: BODY, fontWeight: 600 }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Outro({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.2, 0.6);
  const subOp = inout(localTime, 0.9, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center', padding: '0 200px' }}>
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 14}px)`, fontFamily: HEAD, fontSize: 52, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>Generate fabrication drawings in batches with iLogic.</div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 10}px)`, fontFamily: BODY, fontSize: 20, fontWeight: 700, color: th.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>One reference. Every panel.</div>
    </div>
  );
}

const ACCENT_OPTIONS = ['#FE6100', '#3FBF7A', '#0A1C3A'];

function IdwGeneratorExplainer() {
  const tw = useTweaks(window.TWEAK_DEFAULTS);
  const t = tw[0], setTweak = tw[1];
  const base = t.theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const theme = Object.assign({}, base, { accent: t.accentColor || '#FE6100' });
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <SceneStage width={1920} height={1080} bg={theme.bg} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
          {{ Hook, Solution, Reference, Prompt, GroupMatch, TitleBlock, Result, Benefits, Outro }}
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

Object.assign(window, { IdwGeneratorExplainer });
