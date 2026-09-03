'use client';

import { useEffect, useRef, useState } from 'react';
import { AGENDA_BOOKING_URL, CONTACT_EMAIL, WHATSAPP_URL } from '../lib/site';
import { useI18n } from './LanguageProvider';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/* Same Formspree form as the main contact form unless a dedicated one is
   set — a hidden "source" field on the form tells them apart in your inbox. */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_AGENDA_ENDPOINT || 'https://formspree.io/f/xgaeonel';

const STEPS = [
  { key: 'name', type: 'text', required: true, labelKey: 'form.name', phKey: 'form.name_ph', errKey: 'form.name_err' },
  { key: 'company', type: 'text', required: false, labelKey: 'form.company', phKey: 'form.company_ph' },
  { key: 'website', type: 'url', required: false, labelKey: 'form.website', phKey: 'form.website_ph' },
  { key: 'companySize', type: 'select', required: false, labelKey: 'form.company_size', optionKeys: ['form.company_size1', 'form.company_size2', 'form.company_size3', 'form.company_size4'] },
  { key: 'email', type: 'email', required: true, labelKey: 'form.email', phKey: null, errKey: 'form.email_err' },
  { key: 'goal', type: 'textarea', required: false, labelKey: 'form.goal', phKey: 'form.goal_ph' },
  { key: 'attendees', type: 'text', required: false, labelKey: 'form.attendees', phKey: 'form.attendees_ph' },
  { key: 'resources', type: 'select', required: false, labelKey: 'form.resources', optionKeys: ['form.resources1', 'form.resources2', 'form.resources3', 'form.resources4'] },
  { key: 'implementer', type: 'text', required: false, labelKey: 'form.implementer', phKey: 'form.implementer_ph' },
  { key: 'timeline', type: 'select', required: false, labelKey: 'form.timeline', optionKeys: ['form.timeline1', 'form.timeline2', 'form.timeline3', 'form.timeline4'] },
];
const TOTAL = STEPS.length;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      setReduced(false);
    }
  }, []);
  return reduced;
}

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
function useMouseTilt(ref, maxTilt = 5) {
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

const emptyValues = STEPS.reduce((acc, s) => ({ ...acc, [s.key]: '' }), {});

export default function Agenda() {
  const { t } = useI18n();
  const tz = useTimezone();
  const reducedMotion = usePrefersReducedMotion();
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  useMouseTilt(cardRef);

  const [values, setValues] = useState(emptyValues);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [disabled, setDisabled] = useState(false);

  const current = STEPS[step];
  const isLast = step === TOTAL - 1;

  useEffect(() => {
    if (status !== 'idle') return;
    const el = inputRef.current;
    if (el) el.focus();
  }, [step, status]);

  const setValue = (key, v) => {
    setValues((vals) => ({ ...vals, [key]: v }));
    if (error) setError(false);
  };

  const validateStep = () => {
    if (!current.required) return true;
    const v = values[current.key].trim();
    if (current.type === 'email') return EMAIL_RE.test(v);
    return v.length > 0;
  };

  const goNext = () => {
    if (!validateStep()) {
      setError(true);
      return;
    }
    setError(false);
    setDir(1);
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  };

  const goBack = () => {
    setError(false);
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && current.type !== 'textarea') {
      e.preventDefault();
      if (isLast) submit();
      else goNext();
    }
  };

  const submit = async () => {
    if (!validateStep()) {
      setError(true);
      return;
    }
    setDisabled(true);
    setStatus('sending');
    try {
      const fd = new FormData();
      STEPS.forEach((s) => fd.append(s.key, values[s.key]));
      fd.append('source', 'agenda page');
      fd.append('timezone', tz);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });
      if (!res.ok) throw new Error('submit failed');
      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setDisabled(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLast) submit();
    else goNext();
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
              overflow: 'hidden',
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
              <>
                <div style={{ height: 3, background: 'var(--line)' }}>
                  <div
                    style={{
                      height: '100%',
                      width: ((step + 1) / TOTAL) * 100 + '%',
                      background: 'var(--orange)',
                      transition: 'width .35s ease',
                    }}
                  />
                </div>
                <form className="contact" onSubmit={onSubmit} noValidate style={{ padding: '40px 40px 32px' }}>
                  <div
                    className="mono"
                    style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--grey)', marginBottom: 18 }}
                  >
                    {t('agenda.progress').replace('{n}', step + 1).replace('{total}', TOTAL)}
                  </div>
                  <div
                    key={step}
                    style={
                      reducedMotion
                        ? undefined
                        : { animation: (dir > 0 ? 'agendaSlideInRight' : 'agendaSlideInLeft') + ' .32s ease' }
                    }
                  >
                    <div className={'field' + (error ? ' err' : '')} style={{ gap: 7 }}>
                      <label htmlFor="agenda-field">{t(current.labelKey)}</label>
                      {current.type === 'textarea' ? (
                        <textarea
                          id="agenda-field"
                          ref={inputRef}
                          value={values[current.key]}
                          onChange={(e) => setValue(current.key, e.target.value)}
                          placeholder={current.phKey ? t(current.phKey) : ''}
                          disabled={disabled}
                        />
                      ) : current.type === 'select' ? (
                        <select
                          id="agenda-field"
                          ref={inputRef}
                          value={values[current.key]}
                          onChange={(e) => setValue(current.key, e.target.value)}
                          disabled={disabled}
                        >
                          <option value="" disabled>
                            {t('form.select')}
                          </option>
                          {current.optionKeys.map((k) => (
                            <option key={k} value={t(k)}>
                              {t(k)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id="agenda-field"
                          ref={inputRef}
                          type={current.type}
                          value={values[current.key]}
                          onChange={(e) => setValue(current.key, e.target.value)}
                          placeholder={current.phKey ? t(current.phKey) : 'you@company.com'}
                          onKeyDown={onKeyDown}
                          disabled={disabled}
                        />
                      )}
                      {error && <span className="errmsg" style={{ display: 'block' }}>{t(current.errKey || 'form.name_err')}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={step === 0 || disabled}
                      className="btn"
                      style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
                    >
                      ← {t('agenda.back')}
                    </button>
                    {isLast ? (
                      <button type="submit" className="btn btn-primary" disabled={disabled}>
                        <span>{t('agenda.continue')}</span> <span className="arw">→</span>
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary" disabled={disabled}>
                        <span>{t('agenda.next')}</span> <span className="arw">→</span>
                      </button>
                    )}
                  </div>
                  {status === 'error' && (
                    <div className="form-ok show" style={{ color: '#e0443e', marginTop: 16 }}>
                      {t('agenda.err')}
                    </div>
                  )}
                </form>
              </>
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
