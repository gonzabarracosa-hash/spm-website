'use client';

import { useI18n } from './LanguageProvider';

export default function Trust() {
  const { t } = useI18n();
  return (
    <section className="trust">
      <div className="wrap trust-in">
        <span className="lbl">{t('trust.builton')}</span>
        <div className="trust-logos">
          <b>Autodesk Inventor</b>
          <b>AutoCAD</b>
          <b>SolidWorks</b>
          <b>Solid Edge</b>
          <b>Python</b>
        </div>
      </div>
    </section>
  );
}
