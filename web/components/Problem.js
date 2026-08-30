'use client';

import { useI18n } from './LanguageProvider';
import { useReveal } from '../lib/useReveal';

export default function Problem() {
  const { t } = useI18n();
  const head = useReveal(0);
  const pain1 = useReveal(1);
  const pain2 = useReveal(2);
  const pain3 = useReveal(3);
  const pain4 = useReveal(4);
  const pains = [pain1, pain2, pain3, pain4];

  return (
    <section className="section" id="problem">
      <div className="wrap">
        <div className={'sec-head ' + head.className} ref={head.ref}>
          <span className="eyebrow grey">{t('problem.eyebrow')}</span>
          <h2>{t('problem.h2')}</h2>
          <p>{t('problem.p')}</p>
        </div>
        <div className="pains">
          {pains.map((reveal, idx) => {
            const i = idx + 1;
            return (
              <div className={'pain ' + reveal.className} ref={reveal.ref} key={i}>
                <div className="x">{'0' + i}</div>
                <p dangerouslySetInnerHTML={{ __html: t('pain' + i) }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
