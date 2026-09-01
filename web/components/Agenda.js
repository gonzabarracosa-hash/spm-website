'use client';

import { useEffect, useState } from 'react';
import { AGENDA_EMBED_URL, CONTACT_EMAIL, WHATSAPP_URL } from '../lib/site';

function useTimezone() {
  const [tz, setTz] = useState('');
  useEffect(() => {
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (e) {
      setTz('');
    }
  }, []);
  return tz;
}

export default function Agenda() {
  const tz = useTimezone();

  return (
    <section className="section" style={{ paddingTop: 72 }}>
      <div className="wrap">
        <div className="sec-head" style={{ margin: '0 auto', textAlign: 'center', maxWidth: 640 }}>
          <span className="eyebrow">Book a call</span>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 'clamp(30px,3.6vw,44px)', color: 'var(--navy)', marginTop: 14, letterSpacing: '-0.02em' }}>
            Schedule a discovery call
          </h1>
          <p>
            30 minutes over Google Meet to map your workflow and see if there's a quick win. Pick whatever slot works for
            you — times below are shown in your own timezone.
          </p>
          {tz && (
            <div
              className="mono"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 20,
                padding: '8px 14px',
                border: '1px solid var(--line)',
                borderRadius: 999,
                fontSize: 12,
                color: 'var(--grey)',
                background: 'var(--paper)',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              Detected timezone: {tz}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 48,
            maxWidth: 860,
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '1px solid var(--line)',
            borderRadius: 8,
            overflow: 'hidden',
            background: 'var(--paper)',
            boxShadow: '0 24px 60px -30px rgba(10,29,55,.28)',
          }}
        >
          {AGENDA_EMBED_URL ? (
            <iframe
              src={AGENDA_EMBED_URL}
              title="Book a call with SPM Design Solutions"
              style={{ width: '100%', height: 720, border: 'none', display: 'block' }}
            />
          ) : (
            <div style={{ padding: '64px 40px', textAlign: 'center' }}>
              <div
                className="mono"
                style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--grey-2)' }}
              >
                Calendar sync in progress
              </div>
              <p style={{ marginTop: 14, color: 'var(--ink-2)', fontSize: 16, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
                The live booking calendar isn't connected yet. In the meantime, reach out directly and we'll find a time
                that works.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
                <a href={'mailto:' + CONTACT_EMAIL} className="btn btn-primary">
                  <span>Email us</span> <span className="arw">→</span>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn-ghost">
                  WhatsApp us
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="mono" style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--grey-2)' }}>
          Prefer email or WhatsApp?{' '}
          <a href={'mailto:' + CONTACT_EMAIL} style={{ color: 'var(--navy)' }}>
            {CONTACT_EMAIL}
          </a>{' '}
          ·{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{ color: 'var(--navy)' }}>
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
