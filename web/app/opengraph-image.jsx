import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0A1D37',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', fontSize: 56, fontWeight: 800, color: '#F5F7FA', letterSpacing: -1 }}>SPM</div>
          <div style={{ display: 'flex', width: 0, height: 0, borderLeft: '18px solid transparent', borderBottom: '30px solid #FF6A00' }} />
        </div>
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#9aa3ad', marginTop: 4 }}>DESIGN SOLUTIONS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 46, fontWeight: 800, color: '#fff', marginTop: 48, maxWidth: 920, lineHeight: 1.15 }}>
          <span>Engineer the</span>
          <span style={{ color: '#FF6A00', padding: '0 16px' }}>busywork</span>
          <span>out of your company.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#aeb9c7', marginTop: 28, maxWidth: 820 }}>
          CAD automation, AI workflows and custom productivity software for engineering teams.
        </div>
      </div>
    ),
    { ...size }
  );
}
