'use client';

import { useI18n } from './LanguageProvider';
import { useReveal } from '../lib/useReveal';
import WorkflowWidget from './WorkflowWidget';

const STEPS = [1, 2, 3, 4, 5];

export default function Process() {
  const { t } = useI18n();
  const head = useReveal(0);
  const s1 = useReveal(1);
  const s2 = useReveal(2);
  const s3 = useReveal(3);
  const s4 = useReveal(4);
  const s5 = useReveal(5);
  const widget = useReveal(0);
  const stepReveals = [s1, s2, s3, s4, s5];

  return (
    <section className="section band" id="process">
      <div className="wrap">
        <div className={'sec-head ' + head.className} ref={head.ref}>
          <span className="eyebrow">{t('process.eyebrow')}</span>
          <h2>{t('process.h2')}</h2>
          <p>{t('process.p')}</p>
        </div>
        <div className="flow">
          {STEPS.map((n, idx) => (
            <div className={'step ' + stepReveals[idx].className} ref={stepReveals[idx].ref} key={n}>
              <div className="s">{'0' + n}</div>
              <h4>{t('step' + n + '.h4')}</h4>
              <p>{t('step' + n + '.p')}</p>
            </div>
          ))}
        </div>
        <WorkflowWidget revealRef={widget.ref} revealClassName={widget.className} />
      </div>
    </section>
  );
}
