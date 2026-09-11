(() => {
  'use strict';

  document.title = 'Gonzalo Barracosa — Design & Engineering';

  const debounce = (fn, ms) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  /* ============ HERO VIDEO ============ */

  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.volume = 0;
    heroVideo.defaultMuted = true;
    const tryPlay = () => heroVideo.play().catch(() => {});
    heroVideo.addEventListener('loadeddata', tryPlay);
    heroVideo.addEventListener('canplay', tryPlay);
    tryPlay();
  }

  /* ============ MOBILE MENU ============ */

  const menuOverlay = document.getElementById('menuOverlay');
  document.getElementById('openMenuBtn').addEventListener('click', () => menuOverlay.classList.add('open'));
  document.getElementById('closeMenuBtn').addEventListener('click', () => menuOverlay.classList.remove('open'));
  document.querySelectorAll('#mobileNav a').forEach((a) => {
    a.addEventListener('click', () => menuOverlay.classList.remove('open'));
  });

  /* ============ EXPERIENCE ============ */

  const expList = document.getElementById('expList');
  EXPERIENCE.forEach((job) => {
    const row = document.createElement('div');
    row.className = 'exp-row';
    row.innerHTML = `
      <div class="exp-dates">${job.dates}</div>
      <div>
        <div class="exp-title-row">
          <span class="exp-company">${job.company}</span>
          <span class="exp-role">${job.role}</span>
        </div>
        <div class="exp-location">${job.location}</div>
        <div class="exp-desc">${job.description}</div>
      </div>
    `;
    expList.appendChild(row);
  });

  /* ============ PROJECTS COVERFLOW ============ */

  const cardsWrap = document.getElementById('cardsWrap');
  const dotsWrap = document.getElementById('dots');
  const stage = document.getElementById('stage');
  const total = PROJECTS.length;
  let projectIndex = 0;
  let projectsPaused = false;
  let touchX = null;

  function buildCards() {
    cardsWrap.innerHTML = '';
    PROJECTS.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.index = String(i);
      card.innerHTML = `
        ${p.photo ? `<div class="card-photo" style="background-image:url('${p.photo}')"></div>` : `
        <div class="card-blueprint">
          <div class="card-blueprint-grid"></div>
          <div class="card-blueprint-dwg">${p.dwgNo}</div>
          <div class="card-blueprint-discipline">${p.discipline}</div>
        </div>`}
        <div class="card-vignette ${p.photo ? 'has-photo' : 'no-photo'}"></div>
        <div class="card-content">
          <span class="card-tag">${p.tag}</span>
          <div class="card-bottom">
            <h2 class="card-title">${p.title}</h2>
            <span class="card-subtitle">${p.subtitle}</span>
            <div class="card-divider"></div>
            <p class="card-desc">${p.desc}</p>
            <div class="card-specs">
              ${p.specs.map((s) => `<div class="card-spec-row"><span class="card-spec-key">${s.k}</span><span class="card-spec-val">${s.v}</span></div>`).join('')}
            </div>
            <button type="button" class="card-drawing-btn" data-open-drawing="${i}">
              <span>View Drawing</span>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      `;
      card.addEventListener('click', () => { if (i !== projectIndex) setProjectIndex(i); });
      cardsWrap.appendChild(card);
    });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    PROJECTS.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dot';
      btn.setAttribute('aria-label', 'Go to project');
      btn.addEventListener('click', () => setProjectIndex(i));
      dotsWrap.appendChild(btn);
    });
  }

  function updateCards() {
    const cards = cardsWrap.querySelectorAll('.card');
    if (!cards.length) return;
    const cardW = cards[0].getBoundingClientRect().width;
    const step1 = cardW * 0.86;
    const step2 = cardW * 1.54;
    cards.forEach((card, i) => {
      const off = (i - projectIndex + total) % total;
      let transform = 'translateX(0px) scale(0.4)';
      let opacity = 0, zIndex = 0, filter = 'brightness(0.4) blur(2px)';
      const isCenter = off === 0;
      if (off === 0) { transform = 'translateX(0px) scale(1) rotateY(0deg)'; opacity = 1; zIndex = 30; filter = 'brightness(1)'; }
      else if (off === 1) { transform = `translateX(${step1}px) scale(0.84) rotateY(-24deg)`; opacity = 0.6; zIndex = 20; filter = 'brightness(0.7)'; }
      else if (off === 2) { transform = `translateX(${step2}px) scale(0.68) rotateY(-38deg)`; opacity = 0.32; zIndex = 10; filter = 'brightness(0.5) blur(1px)'; }
      else if (off === total - 1) { transform = `translateX(-${step1}px) scale(0.84) rotateY(24deg)`; opacity = 0.6; zIndex = 20; filter = 'brightness(0.7)'; }
      else if (off === total - 2) { transform = `translateX(-${step2}px) scale(0.68) rotateY(38deg)`; opacity = 0.32; zIndex = 10; filter = 'brightness(0.5) blur(1px)'; }
      card.style.transform = transform;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(zIndex);
      card.style.filter = filter;
      card.classList.toggle('is-center', isCenter);
    });
    const dots = dotsWrap.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('is-active', i === projectIndex));
  }

  function setProjectIndex(i) {
    projectIndex = ((i % total) + total) % total;
    updateCards();
  }

  buildCards();
  buildDots();
  updateCards();

  document.getElementById('prevBtn').addEventListener('click', () => setProjectIndex(projectIndex - 1));
  document.getElementById('nextBtn').addEventListener('click', () => setProjectIndex(projectIndex + 1));

  stage.addEventListener('mouseenter', () => { projectsPaused = true; });
  stage.addEventListener('mouseleave', () => { projectsPaused = false; });
  stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; projectsPaused = true; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - (touchX || 0);
    if (Math.abs(diff) > 45) setProjectIndex(projectIndex + (diff < 0 ? 1 : -1));
    projectsPaused = false;
  });

  setInterval(() => { if (!projectsPaused) setProjectIndex(projectIndex + 1); }, 5500);

  cardsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-drawing]');
    if (!btn) return;
    e.stopPropagation();
    const i = Number(btn.dataset.openDrawing);
    openViewer(PROJECTS[i]);
  });

  /* ============ DRAWING VIEWER (PDF.js) ============ */

  const viewerOverlay = document.getElementById('viewerOverlay');
  const viewerTitleEl = document.getElementById('viewerTitle');
  const viewerCanvas = document.getElementById('viewerCanvas');
  const viewerStatusEl = document.getElementById('viewerStatus');
  const viewerPageLabelEl = document.getElementById('viewerPageLabel');
  const viewerOpenLink = document.getElementById('viewerOpenLink');

  const viewer = {
    pdf: null, page: 1, pageCount: 0,
    doc: null, url: null, renderTask: null,
    workerReady: false, renderToken: 0
  };

  function setViewerStatus(msg) {
    viewerStatusEl.textContent = msg;
    viewerStatusEl.classList.toggle('visible', !!msg);
  }

  function updateViewerPageLabel() {
    viewerPageLabelEl.textContent = viewer.pageCount ? `${viewer.page} / ${viewer.pageCount}` : '—';
  }

  function openViewer(project) {
    viewer.pdf = project.pdf;
    viewer.page = 1;
    viewer.pageCount = 0;
    viewerTitleEl.textContent = `${project.title} · ${project.subtitle}`;
    viewerOpenLink.href = project.pdf;
    viewerOverlay.classList.add('open');
    updateViewerPageLabel();
    setViewerStatus('Loading drawing…');
    setTimeout(renderPdfPage, 60);
  }

  function closeViewer() {
    viewerOverlay.classList.remove('open');
    viewer.pdf = null;
  }

  async function renderPdfPage() {
    const token = ++viewer.renderToken;
    const stale = () => token !== viewer.renderToken;
    const url = viewer.pdf;
    if (!url) return;
    const pageNum = viewer.page;
    const lib = window.pdfjsLib;
    if (!lib) { setViewerStatus('PDF engine still loading…'); return; }
    if (!viewer.workerReady) {
      lib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';
      viewer.workerReady = true;
    }
    try {
      setViewerStatus('Loading drawing…');
      if (viewer.url !== url) {
        const doc = await lib.getDocument(url).promise;
        if (stale()) return;
        viewer.doc = doc;
        viewer.url = url;
        viewer.pageCount = doc.numPages;
        updateViewerPageLabel();
      }
      if (stale() || viewer.pdf !== url) return;
      const page = await viewer.doc.getPage(pageNum);
      if (stale()) return;
      const wrapEl = viewerCanvas.parentElement;
      const wrapW = wrapEl.clientWidth - 32;
      const wrapH = wrapEl.clientHeight - 32;
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(wrapW / base.width, wrapH / base.height);
      const viewport = page.getViewport({ scale: scale * (window.devicePixelRatio || 1) });
      viewerCanvas.width = viewport.width;
      viewerCanvas.height = viewport.height;
      viewerCanvas.style.width = `${base.width * scale}px`;
      viewerCanvas.style.height = `${base.height * scale}px`;
      if (viewer.renderTask) { try { viewer.renderTask.cancel(); } catch (e) {} }
      viewer.renderTask = page.render({ canvasContext: viewerCanvas.getContext('2d'), viewport });
      await viewer.renderTask.promise;
      if (!stale()) setViewerStatus('');
    } catch (err) {
      const cancelled = err && (err.name === 'RenderingCancelledException' || /cancel/i.test(err.message || ''));
      if (!stale() && !cancelled) setViewerStatus('Could not render this drawing. Use “Open full size”.');
    }
  }

  document.getElementById('viewerPrevPage').addEventListener('click', () => {
    viewer.page = Math.max(1, viewer.page - 1);
    updateViewerPageLabel();
    renderPdfPage();
  });
  document.getElementById('viewerNextPage').addEventListener('click', () => {
    viewer.page = Math.min(viewer.pageCount || 1, viewer.page + 1);
    updateViewerPageLabel();
    renderPdfPage();
  });
  document.getElementById('viewerCloseBtn').addEventListener('click', closeViewer);

  /* ============ SKILLS ============ */

  const skillsSection = document.getElementById('skills');
  const skillsPreview = document.getElementById('skillsPreview');
  const skillsPreviewImg = document.getElementById('skillsPreviewImg');
  const technicalWrap = document.getElementById('skillsTechnical');
  const peopleWrap = document.getElementById('skillsPeople');

  let hoveredSkill = null;
  const mousePos = { x: 0, y: 0 };
  const smoothPos = { x: 0, y: 0 };

  function setHoveredSkill(skill, row) {
    document.querySelectorAll('.skill-row').forEach((r) => {
      r.classList.remove('is-active');
      r.querySelector('.skill-fill').style.width = '0%';
    });
    if (skill) {
      row.classList.add('is-active');
      row.querySelector('.skill-fill').style.width = `${skill.level}%`;
      hoveredSkill = skill;
      skillsPreviewImg.src = skill.img;
      skillsPreviewImg.alt = skill.name;
      skillsPreview.classList.add('visible');
    } else {
      hoveredSkill = null;
      skillsPreview.classList.remove('visible');
    }
  }

  function renderSkillRow(skill) {
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.innerHTML = `
      <div class="skill-left">
        <div class="skill-accent"></div>
        <span class="skill-name">${skill.name}</span>
      </div>
      <div class="skill-right">
        <div class="skill-track"><div class="skill-fill"></div></div>
        <span class="skill-pct">${skill.level}%</span>
      </div>
    `;
    row.addEventListener('mouseenter', () => setHoveredSkill(skill, row));
    row.addEventListener('mouseleave', () => setHoveredSkill(null, row));
    return row;
  }

  SKILLS.filter((s) => s.group === 'technical').forEach((s) => technicalWrap.appendChild(renderSkillRow(s)));
  SKILLS.filter((s) => s.group === 'people').forEach((s) => peopleWrap.appendChild(renderSkillRow(s)));

  skillsSection.addEventListener('mousemove', (e) => {
    const rect = skillsSection.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  });

  const lerp = (a, b, t) => a + (b - a) * t;
  (function previewLoop() {
    smoothPos.x = lerp(smoothPos.x, mousePos.x, 0.15);
    smoothPos.y = lerp(smoothPos.y, mousePos.y, 0.15);
    const scale = hoveredSkill ? 1 : 0.85;
    skillsPreview.style.transform = `translate3d(${smoothPos.x + 24}px, ${smoothPos.y - 75}px, 0) scale(${scale})`;
    requestAnimationFrame(previewLoop);
  })();

  /* ============ RESIZE ============ */

  window.addEventListener('resize', debounce(() => {
    updateCards();
    if (viewerOverlay.classList.contains('open')) renderPdfPage();
  }, 150));
})();
