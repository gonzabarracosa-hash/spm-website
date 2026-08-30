'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from './LanguageProvider';
import LatticeBackground from './LatticeBackground';

export default function Hero() {
  const { t } = useI18n();
  const videoRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const hv = videoRef.current;
    const stage = stageRef.current;
    if (!hv) return;
    hv.muted = true;
    hv.loop = false;
    let played = false;
    const tryPlay = () => {
      if (played) return;
      const p = hv.play();
      if (p && p.then) p.then(() => (played = true)).catch(() => {});
    };
    if (hv.readyState >= 2) tryPlay();
    hv.addEventListener('loadeddata', tryPlay, { once: true });
    hv.addEventListener('canplay', tryPlay, { once: true });
    const onEnded = () => {
      try {
        hv.pause();
      } catch (e) {}
      if (stage) stage.classList.add('ended');
    };
    hv.addEventListener('ended', onEnded);
    try {
      hv.load();
    } catch (e) {}

    const retry = () => {
      const p = hv.play();
      if (p && p.catch) p.catch(() => {});
    };
    window.addEventListener('pointerdown', retry, { once: true, passive: true });
    window.addEventListener('scroll', retry, { once: true, passive: true });

    return () => {
      hv.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section className="hero">
      <LatticeBackground />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('hero.h1') }} />
            <p className="hero-sub">{t('hero.sub')}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                <span>{t('hero.cta1')}</span> <span className="arw">→</span>
              </a>
              <a href="#work" className="btn btn-ghost">
                {t('hero.cta2')}
              </a>
            </div>
          </div>
          <figure className="hero-fig">
            <div className="logo-stage" ref={stageRef}>
              <video
                className="logo-video"
                ref={videoRef}
                src="/assets/brand/logo-anim.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                aria-label="SPM logo animation"
              ></video>
              <img className="logo-still" src="/assets/brand/spm-mark-technical.png" alt="SPM technical illustration" />
            </div>
          </figure>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <b>40–70%</b>
            <span>{t('hero.stat1')}</span>
          </div>
          <div className="hstat">
            <b>ASME · PED</b>
            <span>{t('hero.stat2')}</span>
          </div>
          <div className="hstat">
            <b>BE · DE · NL</b>
            <span>{t('hero.stat3')}</span>
          </div>
          <div className="hstat">
            <b>15+ yrs</b>
            <span>{t('hero.stat4')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
