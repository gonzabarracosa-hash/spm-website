'use client';

import { useEffect, useRef, useState } from 'react';
import { AGENDA_BOOKING_URL, CONTACT_EMAIL, WHATSAPP_URL } from '../lib/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/* Same Formspree form as the main contact form unless a dedicated one is
   set — a hidden "source" field on the form tells them apart in your inbox. */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_AGENDA_ENDPOINT || 'https://formspree.io/f/xgaeonel';

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

/* Adapted from a pasted React/shadcn 3D-wall-calendar component's pointer/wheel
   tilt logic — this site is plain CSS/JS (no Tailwind/shadcn), so the tilt
   idea is reimplemented natively: the card leans gently toward the cursor
   instead of needing a click-drag (which would fight with clicking form
   fields), and eases back flat on mouse leave. */
function useMouseTilt(ref, maxTilt = 7) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(1200px) rotateY(' + (px * maxTilt).toFixed(2) + 'deg) rotateX(' + (-py * maxTilt).toFixed(2) + 'deg)';
    };
    const onLeave = () => {
      el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, maxTilt]);
}

export default function Agenda() {
  const tz = useTimezone();
  const cardRef = useRef(null);
  const formRef = useRef(null);
  useMouseTilt(cardRef);

  const [errors, setErrors] = useState({ name: false, email: false });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [disabled, setDisabled] = useState(false);

  const clearError = (field) => setErrors((e) => (e[field] ? { ...e, [field]: false } : e));

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.querySelector('#a-name');
    const email = form.querySelector('#a-email');
    let ok = true;
    const next = { name: false, email: false };
    if (!name.value.trim()) {
      next.name = true;
      ok = false;
    }
    if (!EMAIL_RE.test(email.value.trim())) {
      next.email = true;
      ok = false;
    }
    setErrors(next);
    if (!ok) return;

    setDisabled(true);
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error('submit failed');
      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setDisabled(false);
    }
  };

  return (
    <section className="section" style={{ paddingTop: 72 }}>
      <div className="wrap">
        <div className="sec-head" style={{ margin: '0 auto', textAlign: 'center', maxWidth: 640 }}>
          <span className="eyebrow">Book a call</span>
          <h1
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(30px,3.6vw,44px)',
              color: 'var(--navy)',
              marginTop: 14,
              letterSpacing: '-0.02em',
            }}
          >
            Schedule a discovery call
          </h1>
          <p>
            A few quick questions first, then you'll get the link to a real-time calendar for a 30-minute Google Meet —
            shown in your own timezone automatically.
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

        <div style={{ marginTop: 48, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', perspective: 1200 }}>
          <div
            ref={cardRef}
            style={{
              border: '1px solid var(--line)',
              borderRadius: 8,
              background: 'var(--paper)',
              boxShadow: '0 24px 60px -30px rgba(10,29,55,.28)',
              transition: 'transform .15s ease',
              transformStyle: 'preserve-3d',
            }}
          >
            {status === 'ok' ? (
              <div style={{ padding: '56px 40px', textAlign: 'center' }}>
                <svg
                  className="form-ok-check"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ color: 'var(--green)', display: 'block', margin: '0 auto', width: 40, height: 40 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M7 12.5l3 3 7-7" />
                </svg>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--orange)', marginTop: 16 }}>
                  Thanks
                </div>
                <p style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: 16, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
                  Here's your booking calendar — pick any open slot and you'll get a Google Meet link instantly.
                </p>
                <a href={AGENDA_BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary" style={{ marginTop: 24, justifyContent: 'center' }}>
                  <span>Open booking calendar</span> <span className="arw">→</span>
                </a>
              </div>
            ) : (
              <form className="contact" id="agendaForm" noValidate ref={formRef} onSubmit={onSubmit}>
                <input type="hidden" name="source" value="agenda page" />
                <div className="field row2">
                  <div className={'field' + (errors.name ? ' err' : '')} style={{ gap: 7 }}>
                    <label htmlFor="a-name">Name</label>
                    <input id="a-name" name="name" type="text" placeholder="Your name" required disabled={disabled} onInput={() => clearError('name')} />
                    <span className="errmsg">Please enter your name.</span>
                  </div>
                  <div className="field" style={{ gap: 7 }}>
                    <label htmlFor="a-company">Company</label>
                    <input id="a-company" name="company" type="text" placeholder="Company" disabled={disabled} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="a-website">Company website</label>
                  <input id="a-website" name="website" type="url" placeholder="https://yourcompany.com" disabled={disabled} />
                </div>
                <div className={'field' + (errors.email ? ' err' : '')}>
                  <label htmlFor="a-email">Work email</label>
                  <input id="a-email" name="email" type="email" placeholder="you@company.com" required disabled={disabled} onInput={() => clearError('email')} />
                  <span className="errmsg">Enter a valid email address.</span>
                </div>
                <div className="field">
                  <label htmlFor="a-goal">What do you want to achieve with our software?</label>
                  <textarea id="a-goal" name="goal" placeholder="e.g. one central place to track every drawing revision" disabled={disabled}></textarea>
                </div>
                <div className="field">
                  <label htmlFor="a-attendees">Who will join the call?</label>
                  <input id="a-attendees" name="attendees" type="text" placeholder="Names & roles, e.g. Jane Doe, Engineering Manager" disabled={disabled} />
                </div>
                <div className="field">
                  <label htmlFor="a-resources">Resources for implementation & training</label>
                  <select id="a-resources" name="resources" disabled={disabled}>
                    <option>Dedicated in-house engineer / IT</option>
                    <option>Shared or part-time resource</option>
                    <option>None yet — we'd need full support</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="a-implementer">Who will implement & maintain it internally?</label>
                  <input id="a-implementer" name="implementer" type="text" placeholder="e.g. our lead design engineer" disabled={disabled} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={disabled}>
                  <span>Continue to booking</span> <span className="arw">→</span>
                </button>
                {status === 'error' && (
                  <div className="form-ok show" style={{ color: '#e0443e' }}>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}
              </form>
            )}
          </div>
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
