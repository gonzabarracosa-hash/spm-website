'use client';

import { useI18n } from './LanguageProvider';
import { useReveal } from '../lib/useReveal';

function ServiceCard({ reveal, no, h3, p, items }) {
  const { t } = useI18n();
  return (
    <article className={'svc ' + reveal.className} ref={reveal.ref}>
      <span className="no">{t(no)}</span>
      <h3>{t(h3)}</h3>
      <p>{t(p)}</p>
      <ul>
        {items.map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Services() {
  const { t } = useI18n();
  const head = useReveal(0);
  const r1 = useReveal(1);
  const r2 = useReveal(2);
  const r3 = useReveal(3);

  return (
    <section
      className="section"
      id="services"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="wrap">
        <div className={'sec-head ' + head.className} ref={head.ref}>
          <span className="eyebrow">{t('services.eyebrow')}</span>
          <h2>{t('services.h2')}</h2>
          <p>{t('services.p')}</p>
        </div>
        <div className="svc-grid">
          <ServiceCard reveal={r1} no="svc1.no" h3="svc1.h3" p="svc1.p" items={['svc1.li1', 'svc1.li2', 'svc1.li3', 'svc1.li4']} />
          <ServiceCard reveal={r2} no="svc2.no" h3="svc2.h3" p="svc2.p" items={['svc2.li1', 'svc2.li2', 'svc2.li3', 'svc2.li4']} />
          <ServiceCard reveal={r3} no="svc3.no" h3="svc3.h3" p="svc3.p" items={['svc3.li1', 'svc3.li2', 'svc3.li3', 'svc3.li4']} />
        </div>
      </div>
    </section>
  );
}
