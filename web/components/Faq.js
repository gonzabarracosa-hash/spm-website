'use client';

import { useRef, useState } from 'react';
import { useI18n } from './LanguageProvider';
import { useReveal } from '../lib/useReveal';

const ITEMS = [1, 2, 3, 4];

function QaItem({ n, reveal }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const answerRef = useRef(null);

  const toggle = () => {
    setOpen((v) => {
      const next = !v;
      const el = answerRef.current;
      if (el) el.style.maxHeight = next ? el.scrollHeight + 'px' : '0px';
      return next;
    });
  };

  return (
    <div className={'qa ' + reveal.className + (open ? ' open' : '')} ref={reveal.ref}>
      <button className="qa-q" onClick={toggle}>
        <span>{t('faq.q' + n)}</span> <span className="ic"></span>
      </button>
      <div className="qa-a" ref={answerRef}>
        <p>{t('faq.a' + n)}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const { t } = useI18n();
  const head = useReveal(0);
  const r1 = useReveal(1);
  const r2 = useReveal(2);
  const r3 = useReveal(3);
  const r4 = useReveal(4);
  const reveals = [r1, r2, r3, r4];

  return (
    <section className="section" id="faq" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className={'sec-head ' + head.className} ref={head.ref} style={{ margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">{t('faq.eyebrow')}</span>
          <h2>{t('faq.h2')}</h2>
        </div>
        <div className="faq">
          {ITEMS.map((n, idx) => (
            <QaItem n={n} reveal={reveals[idx]} key={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
