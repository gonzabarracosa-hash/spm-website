'use client';

import { useEffect, useState } from 'react';
import { useI18n } from './LanguageProvider';

const LANG_BUTTONS = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'nl', label: 'NL' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
];

function LangButtons() {
  const { lang, setLang } = useI18n();
  return (
    <>
      {LANG_BUTTONS.map((b, i) => (
        <span key={b.code} style={{ display: 'contents' }}>
          {i > 0 && <span className="sep">·</span>}
          <button
            type="button"
            data-lang={b.code}
            className={lang === b.code ? 'on' : ''}
            aria-pressed={lang === b.code}
            onClick={() => setLang(b.code)}
          >
            {b.label}
          </button>
        </span>
      ))}
    </>
  );
}

export default function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={'hdr' + (scrolled ? ' scrolled' : '')} id="hdr">
      <div className="wrap hdr-in">
        <a className="hdr-logo" href="#top" aria-label="SPM Design Solutions">
          <img src="/assets/brand/spm-wordmark-color.png" alt="SPM Design Solutions" />
        </a>
        <nav className="nav">
          <a href="#services">{t('nav.services')}</a>
          <a href="#work">{t('nav.work')}</a>
          <a href="#about">{t('nav.about')}</a>
          <a href="#faq">{t('nav.faq')}</a>
        </nav>
        <div className="hdr-cta">
          <div className="lang-switch" id="langSwitch" role="group" aria-label="Language">
            <LangButtons />
          </div>
          <a href="#contact" className="btn btn-primary">
            <span>{t('cta.book')}</span> <span className="arw">→</span>
          </a>
          <button
            id="burger"
            className={'burger' + (menuOpen ? ' x' : '')}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={'mobile-nav' + (menuOpen ? ' open' : '')} id="mobileNav">
        <a href="#services" onClick={closeMenu}>{t('nav.services')}</a>
        <a href="#work" onClick={closeMenu}>{t('nav.work')}</a>
        <a href="#about" onClick={closeMenu}>{t('nav.about')}</a>
        <a href="#faq" onClick={closeMenu}>{t('nav.faq')}</a>
        <a href="#contact" className="btn btn-primary" onClick={closeMenu}>
          <span>{t('cta.book')}</span> →
        </a>
        <div className="mobile-lang" role="group" aria-label="Language">
          <span className="ml-lbl">Lang</span>
          <LangButtons />
        </div>
      </div>
    </header>
  );
}
