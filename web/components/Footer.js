'use client';

import { useState } from 'react';
import { useI18n } from './LanguageProvider';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../lib/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Set NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT once a Formspree form
   exists for the newsletter signup. Until then it still validates and
   shows the same "subscribed" state, it just doesn't send anywhere. */
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT || '';

export default function Footer() {
  const { t } = useI18n();
  const [subscribed, setSubscribed] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input');
    if (!EMAIL_RE.test(input.value.trim())) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    if (FORMSPREE_ENDPOINT) {
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
      } catch (err) {}
    }
    setSubscribed(true);
  };

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-logo">
            <img src="/assets/brand/spm-lockup-stacked-white.png" alt="SPM Design Solutions" />
            <p>{t('footer.tagline')}</p>
            <div className="mono" style={{ marginTop: 16, fontSize: 13, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href={'mailto:' + CONTACT_EMAIL} style={{ color: '#c7d0da' }}>
                {CONTACT_EMAIL}
              </a>
              <a href={'tel:' + CONTACT_PHONE} style={{ color: '#c7d0da' }}>
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="ftr-col">
            <h5>{t('footer.services')}</h5>
            <a href="/#services">{t('footer.s1')}</a>
            <a href="/#services">{t('footer.s2')}</a>
            <a href="/#services">{t('footer.s3')}</a>
            <a href="/#work">{t('footer.s4')}</a>
          </div>
          <div className="ftr-col">
            <h5>{t('footer.company')}</h5>
            <a href="/#process">{t('footer.c2')}</a>
            <a href="/#faq">{t('footer.c3')}</a>
            <a href="/#contact">{t('footer.c4')}</a>
          </div>
          <div className="ftr-col">
            <h5>{t('footer.news')}</h5>
            <p style={{ fontSize: 14, color: '#8a97a8' }}>{t('footer.news_p')}</p>
            {!subscribed ? (
              <form className="news" onSubmit={onSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  aria-label="Email"
                  required
                  style={invalid ? { borderColor: '#e0443e' } : undefined}
                  onInput={() => setInvalid(false)}
                />
                <button type="submit">{t('footer.news_join')}</button>
              </form>
            ) : (
              <div style={{ display: 'block', color: 'var(--green)', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, marginTop: 8 }}>
                {t('footer.news_ok')}
              </div>
            )}
          </div>
        </div>
        <div className="ftr-bot">
          <span>© 2026 SPM Design Solutions</span>
          <span className="mono">Belgium · EU · ASME · EN 13480 · PED</span>
        </div>
      </div>
    </footer>
  );
}
