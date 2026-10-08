'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from './LanguageProvider';
import { useReveal } from '../lib/useReveal';

const DEMOS = [
  { src: '/explainer/Video%20Explicativo%20iLogic.dc.html', title: 'SPM iLogic automation explainer' },
  { src: '/explainer/Video%20Explicativo%20ACOTARC.dc.html', title: 'SPM ACOTARC automation explainer' },
  { src: '/explainer/Video%20Explicativo%20Agrupador%20de%20Paneles.dc.html', title: 'SPM panel-grouping automation explainer' },
  { src: '/explainer/Video%20Explicativo%20Generador%20de%20Planos%20IDW.dc.html', title: 'SPM IDW drawing generator explainer' },
  { src: '/explainer/Video%20Explicativo%20Revision%20de%20Planos.dc.html', title: 'SPM drawing review explainer' },
];

function DemoLightbox({ item, onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted || !item) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(10,29,55,.78)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: item.type === 'video' ? 560 : 880,
          aspectRatio: item.type === 'video' ? '1/1' : '16/9',
          background: '#000',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 40px 90px -20px rgba(0,0,0,.6)',
        }}
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <iframe src={item.src} title={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 28,
          right: 28,
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,.3)',
          background: 'rgba(255,255,255,.08)',
          color: '#fff',
          fontSize: 20,
          lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>,
    document.body
  );
}

export default function Work() {
  const [lightbox, setLightbox] = useState(null);
  const { t } = useI18n();
  const head = useReveal(0);
  const d1 = useReveal(1);
  const d2 = useReveal(2);
  const d3 = useReveal(3);
  const d4 = useReveal(4);
  const d5 = useReveal(5);
  const demoReveals = [d1, d2, d3, d4, d5];
  const proofList = useReveal(0);
  const caseHead = useReveal(0);
  const caseVideo = useReveal(1);
  const caseProof = useReveal(2);
  const caseLink = useReveal(0);

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className={'sec-head ' + head.className} ref={head.ref}>
          <span className="eyebrow">{t('work.eyebrow')}</span>
          <h2>{t('work.h2')}</h2>
          <p>{t('work.p')}</p>
        </div>
        <div className="work-demos">
          {DEMOS.map((d, idx) => (
            <div className={'demo ' + demoReveals[idx].className} ref={demoReveals[idx].ref} key={d.src}>
              <iframe src={d.src} title={d.title} loading="lazy"></iframe>
              <button
                type="button"
                onClick={() => setLightbox({ type: 'iframe', src: d.src, title: d.title })}
                aria-label={'Expand: ' + d.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="play" />
              </button>
            </div>
          ))}
        </div>
        <div className={'proof-list ' + proofList.className} ref={proofList.ref} style={{ marginTop: 36 }}>
          <div className="proof-item">
            <b>40–70%</b>
            <span>{t('proof1')}</span>
          </div>
          <div className="proof-item green">
            <b>38s</b>
            <span>{t('proof2')}</span>
          </div>
          <div className="proof-item">
            <b>€2.5B</b>
            <span>{t('proof3')}</span>
          </div>
        </div>

        {/* Case 2: DocVault (confidential client engagement) */}
        <div className={'sec-head ' + caseHead.className} ref={caseHead.ref} style={{ marginTop: 88 }}>
          <span className="eyebrow grey">Client case · confidential</span>
          <h2>A drawing office that could never tell which revision was current.</h2>
          <p>
            An industrial engineering client came to us with hundreds of drawings spread across shared folders and email threads —
            the classic &quot;Rev2_final_v3&quot; problem. We built DocVault: a revision-aware document system, delivered in a single
            working session.
          </p>
        </div>
        <div className="proof-grid">
          <div className={'demo ' + caseVideo.className} ref={caseVideo.ref}>
            <video
              src="/assets/SPM_DocVault_1x1.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
            ></video>
            <button
              type="button"
              onClick={() => setLightbox({ type: 'video', src: '/assets/SPM_DocVault_1x1.mp4', title: 'SPM DocVault demo' })}
              aria-label="Expand: SPM DocVault demo"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span className="play" />
            </button>
          </div>
          <div className={'proof-list ' + caseProof.className} ref={caseProof.ref}>
            <div className="proof-item">
              <b>1</b>
              <span>working session from spec to running system, no backlog in between</span>
            </div>
            <div className="proof-item green">
              <b>0</b>
              <span>drawings lost — every prior revision kept, current one always flagged</span>
            </div>
            <div className="proof-item">
              <b>PDF+DWG</b>
              <span>companion files auto-grouped under the same revision, no manual tagging</span>
            </div>
          </div>
        </div>
        <div className={caseLink.className} ref={caseLink.ref} style={{ marginTop: 28 }}>
          <a href="/work/docvault-case-study" className="btn btn-ghost">
            Read the full case study →
          </a>
        </div>
      </div>
      <DemoLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
