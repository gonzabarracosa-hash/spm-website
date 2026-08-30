// Scene components for the iLogic explainer video — SPM brand system
// (Montserrat + Inter, Oxford Blue / Signal Orange / Cloud White / Concrete Gray / Logic Green).
const HEAD = '"Montserrat", system-ui, sans-serif';
const BODY = '"Inter", system-ui, sans-serif';
const SUCCESS = '#3FBF7A'; // Logic Green

const LIGHT_THEME = { bg: '#F4F8FB', panel: '#FFFFFF', panelBorder: '#E1E6EA', chrome: '#EEF2F5', text: '#0A1C3A', textMuted: '#7A8490' };
const DARK_THEME = { bg: '#0A1C3A', panel: '#122641', panelBorder: '#25395A', chrome: '#0F2038', text: '#F4F8FB', textMuted: '#93A0B4' };
const DEMO_VIDEO_ID = '1j3zNVQuKJ68wUhaXBMPrOnSM7399bmdr';

const ThemeContext = React.createContext({ ...LIGHT_THEME, accent: '#FE6100' });

function inout(localTime, start, len, ease) {
  ease = ease || Easing.easeOutCubic;
  return ease(clamp((localTime - start) / len, 0, 1));
}

// ── shared visual pieces ────────────────────────────────────────────────
function SoftwareWindow({ theme, title, children }) {
  return (
    <div style={{ width: 1280, height: 760, background: theme.panel, border: `1px solid ${theme.panelBorder}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 30px 80px rgba(10,28,58,0.18)' }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', background: theme.chrome, borderBottom: `1px solid ${theme.panelBorder}` }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.panelBorder }} />
        <div style={{ marginLeft: 12, fontFamily: BODY, fontSize: 15, color: theme.textMuted }}>{title}</div>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 704 }}>{children}</div>
    </div>
  );
}

function PanelGrid({ theme, label, accent, cols, rows, cell }) {
  cols = cols || 6; rows = rows || 4; cell = cell || 38;
  const cellsArr = Array.from({ length: cols * rows });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 7 }}>
        {cellsArr.map((_, i) => <div key={i} style={{ width: cell, height: cell, borderRadius: 4, background: theme.chrome, border: `1px solid ${theme.panelBorder}` }} />)}
      </div>
      <div style={{ fontFamily: BODY, fontSize: 18, fontWeight: 500, color: accent || theme.textMuted }}>{label}</div>
    </div>
  );
}

// ── scenes ───────────────────────────────────────────────────────────────
function Hook({ localTime }) {
  const th = React.useContext(ThemeContext);
  const items = ['Copy the assembly folder and every part', 'Rename every .ipt file', 'Update the Part Number for each part', 'Reconnect every reference in the assembly'];
  const headOp = inout(localTime, 0.3, 0.6);
  const subOp = inout(localTime, 0.9, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 160px', fontFamily: BODY }}>
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 16}px)` }}>
        <div style={{ fontFamily: HEAD, fontSize: 64, fontWeight: 800, color: th.text, lineHeight: 1.15, maxWidth: 1150 }}>Cloning an assembly by hand takes hours.</div>
      </div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 12}px)`, marginTop: 22 }}>
        <div style={{ fontSize: 26, color: th.textMuted, fontWeight: 400 }}>Copy, rename, and reconnect everything, part by part.</div>
      </div>
      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((label, i) => {
          const start = 1.5 + i * 0.32;
          const op = inout(localTime, start, 0.45);
          return (
            <div key={i} style={{ opacity: op, transform: `translateX(${(1 - op) * -14}px)`, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: th.textMuted, flexShrink: 0 }} />
              <div style={{ fontSize: 24, color: th.textMuted, fontWeight: 400 }}>{label}</div>
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
      <div style={{ opacity: op, transform: `scale(${0.94 + 0.06 * op})`, padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${th.accent}`, background: `${th.accent}14`, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>iLogic rule</div>
      <div style={{ opacity: op, fontFamily: HEAD, fontSize: 56, fontWeight: 800, color: th.text, textAlign: 'center', maxWidth: 1200 }}>One rule does it all.</div>
    </div>
  );
}

function Demo({ localTime }) {
  const th = React.useContext(ThemeContext);
  const winOp = inout(localTime, 0.15, 0.5);
  const captions = [
    { start: 0.6, end: 3.6, text: 'Open the base assembly you want to clone.' },
    { start: 3.7, end: 7.6, text: 'Run the iLogic rule — it detects the current panel number.' },
    { start: 7.7, end: 11.2, text: 'Enter the new panel number.' },
    { start: 11.3, end: 13.6, text: 'It copies, renames, and reconnects everything automatically.' },
  ];
  const active = captions.find((c) => localTime >= c.start && localTime <= c.end);
  const capOp = active ? inout(localTime, active.start, 0.3) * (1 - inout(localTime, active.end - 0.3, 0.3)) : 0;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) scale(${0.96 + 0.04 * winOp})`, opacity: winOp }}>
        <SoftwareWindow theme={th} title="Inventor — screen recording">
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
            <iframe
              src={`https://drive.google.com/file/d/${DEMO_VIDEO_ID}/preview`}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="autoplay"
              title="iLogic panel cloning demo"
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 28px', background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', opacity: capOp, pointerEvents: 'none' }}>
              <div style={{ fontFamily: BODY, fontSize: 22, color: '#fff', fontWeight: 500 }}>{active ? active.text : ''}</div>
            </div>
          </div>
        </SoftwareWindow>
      </div>
    </div>
  );
}

function Result({ localTime }) {
  const th = React.useContext(ThemeContext);
  const leftOp = inout(localTime, 0.2, 0.5);
  const rightOp = inout(localTime, 0.45, 0.5);
  const statusOp = inout(localTime, 1.3, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
      <div style={{ display: 'flex', gap: 60 }}>
        <div style={{ opacity: leftOp, transform: `scale(${0.94 + 0.06 * leftOp})`, padding: 32, borderRadius: 14, background: th.panel, border: `1px solid ${th.panelBorder}` }}>
          <PanelGrid theme={th} label="Assembly_014.iam" cols={5} rows={3} />
        </div>
        <div style={{ opacity: rightOp, transform: `scale(${0.94 + 0.06 * rightOp})`, padding: 32, borderRadius: 14, background: th.panel, border: `1.5px solid ${th.accent}`, boxShadow: `0 0 0 6px ${th.accent}18` }}>
          <PanelGrid theme={th} label="Assembly_015.iam" accent={th.accent} cols={5} rows={3} />
        </div>
      </div>
      <div style={{ opacity: statusOp, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: SUCCESS, fontSize: 24, fontWeight: 700 }}>✓</span>
        <div style={{ fontFamily: BODY, fontSize: 24, fontWeight: 500, color: th.text }}>Saved. Ready to edit.</div>
      </div>
    </div>
  );
}

function Benefits({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.2, 0.4);
  const items = ['No manual folder copying', 'Zero broken references', 'Done in seconds'];
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
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 14}px)`, fontFamily: HEAD, fontSize: 56, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>Automate your assemblies with iLogic.</div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 10}px)`, fontFamily: BODY, fontSize: 20, fontWeight: 700, color: th.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>One click. Zero errors.</div>
    </div>
  );
}

// ── root component ───────────────────────────────────────────────────────
const ACCENT_OPTIONS = ['#FE6100', '#3FBF7A', '#0A1C3A'];

function IlogicExplainer() {
  const tw = useTweaks(window.TWEAK_DEFAULTS);
  const t = tw[0], setTweak = tw[1];
  const base = t.theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const theme = Object.assign({}, base, { accent: t.accentColor || '#FE6100' });
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <SceneStage width={1920} height={1080} bg={theme.bg} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
          {{ Hook, Solution, Demo, Result, Benefits, Outro }}
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

Object.assign(window, { IlogicExplainer });
