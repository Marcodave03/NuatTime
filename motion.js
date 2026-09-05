/* ==========================================================================
   Nuat Time - behaviour
   Theme, navigation, section reveals, and the scroll-scrubbed door.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /* Theme                                                               */
  /* ------------------------------------------------------------------ */

  var toggle = document.getElementById('theme-toggle');

  function labelFor(theme) {
    return theme === 'dusk' ? 'Switch to daytime theme' : 'Switch to evening theme';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-label', labelFor(theme));

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dusk' ? '#2A1B12' : '#F3EFEC');

    try { localStorage.setItem('nuat-theme', theme); } catch (e) { /* private mode */ }
  }

  if (toggle) {
    toggle.setAttribute('aria-label', labelFor(root.getAttribute('data-theme')));
    toggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dusk' ? 'day' : 'dusk');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------ */

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');

  function closeMenu() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        burger.focus();
      }
    });
  }

  function syncNav() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);
  }
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Reveals - one restrained device, section headings only              */
  /* ------------------------------------------------------------------ */

  var reveals = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* Scrolling stays native.                                             */
  /*                                                                     */
  /* An inertial smooth-scroll library was tried here and removed: it    */
  /* made every section past the hero feel weighted and slow. The door   */
  /* below is driven by scroll position, so it scrubs perfectly well on  */
  /* the browser's own scrolling. Anchor jumps use scroll-behavior in    */
  /* the stylesheet.                                                     */
  /* ------------------------------------------------------------------ */

  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------ */
  /* The gate                                                            */
  /*                                                                     */
  /* One scrubbed timeline drives four custom properties. The doors part */
  /* first, the room settles out of its overscale, and the wordmark      */
  /* arrives only once there is a gap to read it through.                */
  /* ------------------------------------------------------------------ */

  var gate = document.getElementById('gate');

  function between(p, from, to) {
    if (p <= from) return 0;
    if (p >= to) return 1;
    return (p - from) / (to - from);
  }

  /* easeOutCubic - the doors should leave quickly, then settle */
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  if (gate && hasGsap && !reduced) {
    var stage = gate.querySelector('.gate__stage');

    ScrollTrigger.create({
      trigger: gate,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: function (self) {
        var p = self.progress;

        stage.style.setProperty('--gate', ease(between(p, 0, 0.72)).toFixed(4));
        stage.style.setProperty('--interior-scale', (1.18 - 0.18 * between(p, 0, 1)).toFixed(4));
        stage.style.setProperty('--cue-opacity', (1 - between(p, 0, 0.1)).toFixed(3));

        var word = between(p, 0.42, 0.78);
        stage.style.setProperty('--word-opacity', word.toFixed(3));
        stage.style.setProperty('--word-shift', (26 - 26 * ease(word)).toFixed(2) + 'px');
      }
    });
  } else if (gate) {
    /* No GSAP, or reduced motion: the doors are simply already open. */
    var openStage = gate.querySelector('.gate__stage');
    openStage.style.setProperty('--gate', '1');
    openStage.style.setProperty('--interior-scale', '1');
    openStage.style.setProperty('--word-opacity', '1');
    openStage.style.setProperty('--word-shift', '0px');
    openStage.style.setProperty('--cue-opacity', '0');
    gate.style.height = '100svh';
  }

  /* ------------------------------------------------------------------ */
  /* Footer year                                                         */
  /* ------------------------------------------------------------------ */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

})();
