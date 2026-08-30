/* SPM Design Solutions — site.js
   Header shadow on scroll · mobile menu · scroll reveal · FAQ accordion
   · contact + newsletter validation · demo play toggle */
(function () {
  'use strict';

  // ---- Header shadow on scroll ----
  var hdr = document.getElementById('hdr');
  var onScroll = function () {
    if (window.scrollY > 8) hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobileNav');
  var closeMenu = function () {
    burger.classList.remove('x');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', function () {
    var open = mobileNav.classList.toggle('open');
    burger.classList.toggle('x', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // ---- Scroll reveal ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el, i) {
      // small stagger within sibling groups
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.qa-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var qa = btn.parentElement;
      var ans = qa.querySelector('.qa-a');
      var isOpen = qa.classList.toggle('open');
      ans.style.maxHeight = isOpen ? ans.scrollHeight + 'px' : '0px';
    });
  });

  // ---- Demo play (placeholder) ----
  // Scoped per .demo block (not just the first one on the page) so pages
  // with more than one case/demo — e.g. the Work section listing several
  // client cases — get a working button on each, not just the first.
  document.querySelectorAll('.demo .play').forEach(function (play) {
    play.addEventListener('click', function () {
      var demo = play.closest('.demo');
      var cap = demo ? demo.querySelector('.cap') : null;
      if (cap) cap.textContent = '▶ Demo coming soon — drop your screen capture here';
      play.style.transform = 'scale(1)';
      play.style.opacity = '.6';
    });
  });

  // ---- Contact form validation ----
  var form = document.getElementById('contactForm');
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var setErr = function (input, on) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('err', on);
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var ok = true;
      if (!name.value.trim()) { setErr(name, true); ok = false; } else setErr(name, false);
      if (!emailRe.test(email.value.trim())) { setErr(email, true); ok = false; } else setErr(email, false);
      if (!ok) return;
      form.querySelectorAll('input,textarea,select,button').forEach(function (el) { el.disabled = true; });
      document.getElementById('formOk').classList.add('show');
    });
    // clear error as the user types
    ['#name', '#email'].forEach(function (sel) {
      var el = form.querySelector(sel);
      el.addEventListener('input', function () { setErr(el, false); });
    });
  }

  // ---- Logo video(s): play once, muted, then crossfade to clean logo image ----
  (function () {
    var vids = document.querySelectorAll('.logo-video');
    if (!vids.length) return;
    vids.forEach(function (hv) {
      hv.muted = true; hv.loop = false; hv.setAttribute('playsinline', '');
      var stage = hv.closest('.logo-stage');
      var played = false;
      var tryPlay = function () {
        if (played) return;
        var p = hv.play();
        if (p && p.then) p.then(function () { played = true; }).catch(function () {});
      };
      if (hv.readyState >= 2) tryPlay();
      hv.addEventListener('loadeddata', tryPlay, { once: true });
      hv.addEventListener('canplay', tryPlay, { once: true });
      // When it finishes, reveal the crisp watermark-free logo image and stop.
      hv.addEventListener('ended', function () {
        try { hv.pause(); } catch (e) {}
        if (stage) stage.classList.add('ended');
      });
      try { hv.load(); } catch (e) {}
    });
    // Strict autoplay policies: retry on first user interaction.
    var retry = function () { vids.forEach(function (hv) { var p = hv.play(); if (p && p.catch) p.catch(function () {}); }); };
    window.addEventListener('pointerdown', retry, { once: true, passive: true });
    window.addEventListener('scroll', retry, { once: true, passive: true });
  })();

  // ---- Scroll-driven 3D tilt (contact card) ----
  (function () {
    var els = document.querySelectorAll('[data-scroll-tilt]');
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var raf = null;
    function apply() {
      raf = null;
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        // 0 when the card's top first reaches the bottom of the viewport,
        // 1 once it has risen to ~55% of viewport height (flat by then).
        var t = (vh - r.top) / (vh * 0.95);
        t = t < 0 ? 0 : (t > 1 ? 1 : t);
        var e = 1 - Math.pow(1 - t, 3);
        var rot = 18 * (1 - e);
        var scale = 0.94 + 0.06 * e;
        var lift = 40 * (1 - e);
        el.style.transform = 'translateY(' + lift.toFixed(1) + 'px) rotateX(' + rot.toFixed(2) + 'deg) scale(' + scale.toFixed(4) + ')';
        el.style.boxShadow = '0 ' + (10 + 60 * e).toFixed(0) + 'px ' + (30 + 70 * e).toFixed(0) + 'px -' + (20 + 20 * e).toFixed(0) + 'px rgba(10,29,55,' + (0.10 + 0.28 * e).toFixed(3) + ')';
      });
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(apply); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    apply();
  })();

  // ---- Newsletter ----
  var news = document.getElementById('newsForm');
  if (news) {
    news.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = news.querySelector('input');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.style.borderColor = '#e0443e';
        return;
      }
      news.style.display = 'none';
      document.getElementById('newsOk').style.display = 'block';
    });
  }
})();
