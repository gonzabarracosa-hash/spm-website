'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from './LanguageProvider';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Contact-form submissions are wired to Formspree. Set
   NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT (e.g. https://formspree.io/f/xxxxxxx)
   once a form/endpoint exists — until then the form still validates and
   shows the same success state, it just doesn't send anywhere. */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT || '';

function useScrollTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = null;
    function apply() {
      raf = null;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      let t = (vh - r.top) / (vh * 0.95);
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const e = 1 - Math.pow(1 - t, 3);
      const rot = 18 * (1 - e);
      const scale = 0.94 + 0.06 * e;
      const lift = 40 * (1 - e);
      el.style.transform = 'translateY(' + lift.toFixed(1) + 'px) rotateX(' + rot.toFixed(2) + 'deg) scale(' + scale.toFixed(4) + ')';
      el.style.boxShadow =
        '0 ' + (10 + 60 * e).toFixed(0) + 'px ' + (30 + 70 * e).toFixed(0) + 'px -' + (20 + 20 * e).toFixed(0) + 'px rgba(10,29,55,' + (0.1 + 0.28 * e).toFixed(3) + ')';
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(apply);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    apply();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export default function Contact() {
  const { t } = useI18n();
  const tiltRef = useRef(null);
  const formRef = useRef(null);
  useScrollTilt(tiltRef);

  const [errors, setErrors] = useState({ name: false, email: false });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    let ok = true;
    const nextErrors = { name: false, email: false };
    if (!name.value.trim()) {
      nextErrors.name = true;
      ok = false;
    }
    if (!EMAIL_RE.test(email.value.trim())) {
      nextErrors.email = true;
      ok = false;
    }
    setErrors(nextErrors);
    if (!ok) return;

    setDisabled(true);
    setStatus('sending');

    if (!FORMSPREE_ENDPOINT) {
      setStatus('ok');
      return;
    }
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

  const clearError = (field) => setErrors((e) => (e[field] ? { ...e, [field]: false } : e));

  return (
    <section className="section cta-band" id="contact">
      <div className="wrap tilt-stage">
        <div className="tablet-frame tilt-card" ref={tiltRef}>
          <div className="cta-card">
            <div className="cta-left">
              <span className="eyebrow">{t('contact.eyebrow')}</span>
              <h2>{t('contact.h2')}</h2>
              <p>{t('contact.p')}</p>
              <ul className="cta-points">
                <li>{t('contact.pt1')}</li>
                <li>{t('contact.pt2')}</li>
                <li>{t('contact.pt3')}</li>
              </ul>
            </div>
            <form className="contact" id="contactForm" noValidate ref={formRef} onSubmit={onSubmit}>
              <div className="field row2">
                <div className={'field' + (errors.name ? ' err' : '')} style={{ gap: 7 }}>
                  <label htmlFor="name">{t('form.name')}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('form.name_ph')}
                    required
                    disabled={disabled}
                    onInput={() => clearError('name')}
                  />
                  <span className="errmsg">{t('form.name_err')}</span>
                </div>
                <div className="field" style={{ gap: 7 }}>
                  <label htmlFor="company">{t('form.company')}</label>
                  <input id="company" name="company" type="text" placeholder={t('form.company_ph')} disabled={disabled} />
                </div>
              </div>
              <div className={'field' + (errors.email ? ' err' : '')}>
                <label htmlFor="email">{t('form.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  disabled={disabled}
                  onInput={() => clearError('email')}
                />
                <span className="errmsg">{t('form.email_err')}</span>
              </div>
              <div className="field">
                <label htmlFor="topic">{t('form.topic')}</label>
                <select id="topic" name="topic" disabled={disabled}>
                  <option>{t('form.topic1')}</option>
                  <option>{t('form.topic2')}</option>
                  <option>{t('form.topic3')}</option>
                  <option>{t('form.topic4')}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="msg">{t('form.msg')}</label>
                <textarea id="msg" name="msg" placeholder={t('form.msg_ph')} disabled={disabled}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={disabled}>
                <span>{t('form.submit')}</span> <span className="arw">→</span>
              </button>
              {status === 'ok' && <div className="form-ok show">{t('form.ok')}</div>}
              {status === 'error' && (
                <div className="form-ok show" style={{ color: '#e0443e' }}>
                  {t('form.err')}
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="social-row">
          <span className="social-row-lbl">Follow SPM</span>
          <div className="social-row-icons">
            <a
              href="https://www.linkedin.com/search/results/all/?keywords=SPM%20Design%20Solutions&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A141713965&position=0"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5.5 5.5 0 0 1 16 8z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
