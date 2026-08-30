// Scene components for the panel-grouper explainer video — SPM brand system.
const HEAD = '"Montserrat", system-ui, sans-serif';
const BODY = '"Inter", system-ui, sans-serif';
const SUCCESS = '#3FBF7A';
const LIGHT_THEME = { bg: '#F4F8FB', panel: '#FFFFFF', panelBorder: '#E1E6EA', chrome: '#EEF2F5', text: '#0A1C3A', textMuted: '#7A8490' };
const DARK_THEME = { bg: '#0A1C3A', panel: '#122641', panelBorder: '#25395A', chrome: '#0F2038', text: '#F4F8FB', textMuted: '#93A0B4' };
const ThemeContext = React.createContext({ ...LIGHT_THEME, accent: '#FE6100' });

function inout(localTime, start, len, ease) {
  ease = ease || Easing.easeOutCubic;
  return ease(clamp((localTime - start) / len, 0, 1));
}

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

// Random-ish but seeded panel field so identical groups look identical, others don't.
const PANELS = [
  { id: 0, group: 0 }, { id: 1, group: 1 }, { id: 2, group: 0 }, { id: 3, group: 2 },
  { id: 4, group: 1 }, { id: 5, group: 0 }, { id: 6, group: 3 }, { id: 7, group: 2 },
  { id: 8, group: 1 }, { id: 9, group: 0 }, { id: 10, group: 4 }, { id: 11, group: 2 },
  { id: 12, group: 3 }, { id: 13, group: 1 }, { id: 14, group: 0 }, { id: 15, group: 4 },
];
const GROUP_COLORS = ['#FE6100', '#3FBF7A', '#0A1C3A', '#7A8490', '#B08900'];

function PanelField({ theme, grouped, localTime, revealStart }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 56px)', gap: 8 }}>
      {PANELS.map((p, i) => {
        const t = revealStart != null ? inout(localTime, revealStart + i * 0.06, 0.35) : 1;
        const color = grouped ? GROUP_COLORS[p.group] : theme.panelBorder;
        return (
          <div key={p.id} style={{ width: 56, height: 56, borderRadius: 5, background: grouped ? `${color}22` : theme.chrome, border: `2px solid ${color}`, opacity: t, transform: `scale(${0.85 + 0.15 * t})`, transition: 'background 0.3s, border-color 0.3s' }} />
        );
      })}
    </div>
  );
}

function Hook({ localTime }) {
  const th = React.useContext(ThemeContext);
  const items = ['Find which panels are geometrically identical', 'Split the shell into Roof / Envelope / Shell Nozzle', 'Order and number every drawing by hand', 'Rebuild the plan every time the model changes'];
  const headOp = inout(localTime, 0.3, 0.6);
  const subOp = inout(localTime, 0.9, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 160px' }}>
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 16}px)` }}>
        <div style={{ fontFamily: HEAD, fontSize: 58, fontWeight: 800, color: th.text, lineHeight: 1.15, maxWidth: 1250 }}>Planning drawings for hundreds of panels by eye is slow.</div>
      </div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 12}px)`, marginTop: 22 }}>
        <div style={{ fontSize: 26, color: th.textMuted, fontFamily: BODY }}>Many panels are geometrically identical — miss that, and you draw the same panel twice.</div>
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
      <div style={{ opacity: op, transform: `scale(${0.94 + 0.06 * op})`, padding: '8px 20px', borderRadius: 999, border: `1.5px solid ${th.accent}`, background: `${th.accent}14`, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>iLogic rule</div>
      <div style={{ opacity: op, fontFamily: HEAD, fontSize: 54, fontWeight: 800, color: th.text, textAlign: 'center', maxWidth: 1250 }}>One rule groups every panel and builds the drawing register.</div>
    </div>
  );
}

function Fingerprint({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.15, 0.4);
  const rowsOp = inout(localTime, 0.5, 0.4);
  const rows = ['Volume', 'Surface area', 'Radius of gyration k₁', 'Radius of gyration k₂', 'Radius of gyration k₃'];
  const matchOp = inout(localTime, 2.6, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>How it detects "identical"</div>
      <div style={{ display: 'flex', gap: 70, alignItems: 'center' }}>
        <div style={{ opacity: rowsOp, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 320 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: th.accent, flexShrink: 0 }} />
              <div style={{ fontSize: 24, fontFamily: BODY, color: th.text, fontWeight: 500 }}>{r}</div>
            </div>
          ))}
        </div>
        <div style={{ opacity: matchOp, transform: `scale(${0.9 + 0.1 * matchOp})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 8, border: `2px solid ${th.accent}`, background: `${th.accent}18` }} />
            <div style={{ width: 64, height: 64, borderRadius: 8, border: `2px solid ${th.accent}`, background: `${th.accent}18`, transform: 'rotate(28deg)' }} />
          </div>
          <div style={{ fontFamily: BODY, fontSize: 16, color: th.accent, fontWeight: 700 }}>Same shape → same group</div>
        </div>
      </div>
    </div>
  );
}

function Grouping({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.1, 0.4);
  const groupedT = clamp((localTime - 1.0) / 0.1, 0, 1);
  const grouped = groupedT > 0.5;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>{grouped ? '5 unique groups found' : 'Ungrouped panels'}</div>
      <PanelField theme={th} grouped={grouped} localTime={localTime} revealStart={0.2} />
    </div>
  );
}

function Zones({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.15, 0.4);
  const zones = [
    { name: 'Roof', color: '#3FBF7A', desc: 'TE-182 to TE-311' },
    { name: 'Envelope', color: th.text, desc: 'everything else' },
    { name: 'Shell Nozzle', color: '#FE6100', desc: 'nozzle folder keyword' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44 }}>
      <div style={{ opacity: headOp, fontFamily: BODY, fontSize: 18, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Classified by zone</div>
      <div style={{ display: 'flex', gap: 40 }}>
        {zones.map((z, i) => {
          const start = 0.6 + i * 0.35;
          const op = inout(localTime, start, 0.4);
          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${(1 - op) * 12}px)`, width: 300, padding: 28, borderRadius: 14, background: th.panel, border: `1.5px solid ${z.color}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: z.color }} />
              <div style={{ fontFamily: HEAD, fontSize: 26, fontWeight: 800, color: th.text }}>{z.name}</div>
              <div style={{ fontFamily: BODY, fontSize: 16, color: th.textMuted }}>{z.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Spreadsheet({ localTime }) {
  const th = React.useContext(ThemeContext);
  const winOp = inout(localTime, 0.15, 0.5);
  const rows = [
    { dwg: '0001', panels: 'Panel 190, Panel 204', zone: 'Roof', color: '#3FBF7A' },
    { dwg: '0002', panels: 'Panel 187', zone: 'Roof', color: '#3FBF7A' },
    { dwg: '0037', panels: 'Panel 042, Panel 055, Panel 061', zone: 'Envelope', color: th.textMuted },
    { dwg: '0038', panels: 'Panel 048', zone: 'Envelope', color: th.textMuted },
    { dwg: '0091', panels: 'Panel N-03', zone: 'Shell Nozzle', color: '#FE6100' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: winOp, transform: `scale(${0.96 + 0.04 * winOp})` }}>
        <SoftwareWindow theme={th} title="Assembly_PLANOS.xlsx — Planos sheet">
          <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: 0, padding: '14px 20px', borderBottom: `2px solid ${th.panelBorder}`, fontFamily: BODY, fontSize: 16, fontWeight: 700, color: th.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <div>Drawing</div><div>Panels</div><div>Zone</div>
            </div>
            {rows.map((r, i) => {
              const op = inout(localTime, 0.6 + i * 0.35, 0.4);
              return (
                <div key={i} style={{ opacity: op, transform: `translateX(${(1 - op) * -10}px)`, display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: 0, padding: '16px 20px', borderBottom: `1px solid ${th.panelBorder}`, fontFamily: BODY, fontSize: 17, alignItems: 'center' }}>
                  <div style={{ color: th.text, fontWeight: 600 }}>{r.dwg}</div>
                  <div style={{ color: th.text }}>{r.panels}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: r.color }} />
                    <span style={{ color: th.textMuted }}>{r.zone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </SoftwareWindow>
      </div>
    </div>
  );
}

function Benefits({ localTime }) {
  const th = React.useContext(ThemeContext);
  const headOp = inout(localTime, 0.2, 0.4);
  const items = ['No panel drawn twice', 'Numbered and traceable, every time', 'Seconds instead of hours of manual planning'];
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
      <div style={{ opacity: headOp, transform: `translateY(${(1 - headOp) * 14}px)`, fontFamily: HEAD, fontSize: 54, fontWeight: 800, color: th.text, lineHeight: 1.2 }}>Group panels and plan drawings automatically with iLogic.</div>
      <div style={{ opacity: subOp, transform: `translateY(${(1 - subOp) * 10}px)`, fontFamily: BODY, fontSize: 20, fontWeight: 700, color: th.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>One rule. One numbered register.</div>
    </div>
  );
}

const ACCENT_OPTIONS = ['#FE6100', '#3FBF7A', '#0A1C3A'];

function PanelGrouperExplainer() {
  const tw = useTweaks(window.TWEAK_DEFAULTS);
  const t = tw[0], setTweak = tw[1];
  const base = t.theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const theme = Object.assign({}, base, { accent: t.accentColor || '#FE6100' });
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <SceneStage width={1920} height={1080} bg={theme.bg} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
          {{ Hook, Solution, Fingerprint, Grouping, Zones, Spreadsheet, Benefits, Outro }}
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

Object.assign(window, { PanelGrouperExplainer });
