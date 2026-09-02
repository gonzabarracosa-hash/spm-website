'use client';

import { useEffect, useRef, useState } from 'react';
import { AGENDA_BOOKING_URL, CONTACT_EMAIL, WHATSAPP_URL } from '../lib/site';
import { useI18n } from './LanguageProvider';

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
  const { t } = useI18n();
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
          <span className="eyebrow">{t('cta.book')}</span>
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
            {t('agenda.h1')}
          </h1>
          <p>{t('agenda.sub')}</p>
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
              {t('agenda.tz')} {tz}
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
                  {t('agenda.thanks')}
                </div>
                <p style={{ marginTop: 10, color: 'var(--ink-2)', fontSize: 16, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
                  {t('agenda.thanks_p')}
                </p>
                <a href={AGENDA_BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary" style={{ marginTop: 24, justifyContent: 'center' }}>
                  <span>{t('agenda.open_cal')}</span> <span className="arw">→</span>
                </a>
              </div>
            ) : (
              <form className="contact" id="agendaForm" noValidate ref={formRef} onSubmit={onSubmit}>
                <input type="hidden" name="source" value="agenda page" />
                <div className="field row2">
                  <div className={'field' + (errors.name ? ' err' : '')} style={{ gap: 7 }}>
                    <label htmlFor="a-name">{t('form.name')}</label>
                    <input id="a-name" name="name" type="text" placeholder={t('form.name_ph')} required disabled={disabled} onInput={() => clearError('name')} />
                    <span className="errmsg">{t('form.name_err')}</span>
                  </div>
                  <div className="field" style={{ gap: 7 }}>
                    <label htmlFor="a-company">{t('form.company')}</label>
                    <input id="a-company" name="company" type="text" placeholder={t('form.company_ph')} disabled={disabled} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="a-website">{t('form.website')}</label>
                  <input id="a-website" name="website" type="url" placeholder={t('form.website_ph')} disabled={disabled} />
                </div>
                <div className={'field' + (errors.email ? ' err' : '')}>
                  <label htmlFor="a-email">{t('form.email')}</label>
                  <input id="a-email" name="email" type="email" placeholder="you@company.com" required disabled={disabled} onInput={() => clearError('email')} />
                  <span className="errmsg">{t('form.email_err')}</span>
                </div>
                <div className="field">
                  <label htmlFor="a-goal">{t('form.goal')}</label>
                  <textarea id="a-goal" name="goal" placeholder={t('form.goal_ph')} disabled={disabled}></textarea>
                </div>
                <div className="field">
                  <label htmlFor="a-attendees">{t('form.attendees')}</label>
                  <input id="a-attendees" name="attendees" type="text" placeholder={t('form.attendees_ph')} disabled={disabled} />
                </div>
                <div className="field">
                  <label htmlFor="a-resources">{t('form.resources')}</label>
                  <select id="a-resources" name="resources" disabled={disabled}>
                    <option>{t('form.resources1')}</option>
                    <option>{t('form.resources2')}</option>
                    <option>{t('form.resources3')}</option>
                    <option>{t('form.resources4')}</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="a-implementer">{t('form.implementer')}</label>
                  <input id="a-implementer" name="implementer" type="text" placeholder={t('form.implementer_ph')} disabled={disabled} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={disabled}>
                  <span>{t('agenda.continue')}</span> <span className="arw">→</span>
                </button>
                {status === 'error' && (
                  <div className="form-ok show" style={{ color: '#e0443e' }}>
                    {t('agenda.err')}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="mono" style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--grey-2)' }}>
          {t('agenda.prefer')}{' '}
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
