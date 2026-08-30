'use client';

import { useI18n } from './LanguageProvider';
import { useReveal } from '../lib/useReveal';

const CREDS = ['ASME VIII', 'EN 13480', 'PED', 'AD 2000', null, 'iLogic · Python', 'IFC / AFC / As-Built'];

export default function About() {
  const { t } = useI18n();
  const photo = useReveal(0);
  const copy = useReveal(1);

  return (
    <section className="section about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className={'founder-photo ' + photo.className} ref={photo.ref}>
            <img
              src="/assets/founder-photo.png"
              alt="SPM founder"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
            />
          </div>
          <div className={copy.className} ref={copy.ref}>
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h2>{t('about.h2')}</h2>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <div className="creds">
              {CREDS.map((c, i) =>
                c === null ? (
                  <span className="cred" key="epc">
                    {t('about.cred_epc')}
                  </span>
                ) : (
                  <span className="cred" key={c}>
                    {c}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
