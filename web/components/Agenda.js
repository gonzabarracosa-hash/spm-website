'use client';

import { useEffect, useState } from 'react';
import { AGENDA_BOOKING_URL, CONTACT_EMAIL, WHATSAPP_URL } from '../lib/site';

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
            30 minutes over Google Meet to map your workflow and see if there's a quick win. Your Google Calendar
            appointment page shows slots in your own timezone automatically.
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
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            border: '1px solid var(--line)',
            borderRadius: 8,
            padding: '56px 40px',
            textAlign: 'center',
            background: 'var(--paper)',
            boxShadow: '0 24px 60px -30px rgba(10,29,55,.28)',
          }}
        >
          <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--orange)' }}>
            Live availability
          </div>
          <p style={{ marginTop: 14, color: 'var(--ink-2)', fontSize: 16, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
            Opens your real-time calendar in a new tab — pick any open slot and you'll get a Google Meet link instantly.
          </p>
          <a
            href={AGENDA_BOOKING_URL}
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
            style={{ marginTop: 24, justifyContent: 'center' }}
          >
            <span>Open booking calendar</span> <span className="arw">→</span>
          </a>
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
