'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Scrolling stays native. An inertial smooth-scroll library was tried and
   removed: it made every section past the hero feel weighted and slow. The
   door is driven by scroll position, so it scrubs fine on native scrolling. */

const clampBetween = (p: number, from: number, to: number) => {
  if (p <= from) return 0;
  if (p >= to) return 1;
  return (p - from) / (to - from);
};

/* easeOutCubic - the doors should leave quickly, then settle */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stage = document.querySelector<HTMLElement>('.gate__stage');
    const gate = document.getElementById('gate');

    /* --- section reveals ------------------------------------------------ */
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    let io: IntersectionObserver | undefined;

    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io?.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
      );
      reveals.forEach((el) => io?.observe(el));
    }

    /* --- the gate ------------------------------------------------------- */
    let trigger: ScrollTrigger | undefined;

    if (gate && stage && !reduced) {
      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: gate,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          stage.style.setProperty('--gate', ease(clampBetween(p, 0, 0.72)).toFixed(4));
          stage.style.setProperty('--interior-scale', (1.18 - 0.18 * clampBetween(p, 0, 1)).toFixed(4));
          stage.style.setProperty('--cue-opacity', (1 - clampBetween(p, 0, 0.1)).toFixed(3));

          const word = clampBetween(p, 0.42, 0.78);
          stage.style.setProperty('--word-opacity', word.toFixed(3));
          stage.style.setProperty('--word-shift', `${(26 - 26 * ease(word)).toFixed(2)}px`);
        },
      });
    } else if (stage && gate) {
      /* Reduced motion: the doors are simply already open. */
      stage.style.setProperty('--gate', '1');
      stage.style.setProperty('--interior-scale', '1');
      stage.style.setProperty('--word-opacity', '1');
      stage.style.setProperty('--word-shift', '0px');
      stage.style.setProperty('--cue-opacity', '0');
      gate.style.height = '100svh';
    }

    /* --- where the page opens -------------------------------------------
       Scroll restoration is manual (set in layout.tsx), so nothing places
       the page but us: the closed door for a plain visit, the named section
       for a deep link. Done on load, once images have settled, so the
       target is measured at its final height. */
    const placePage = () => {
      const hash = window.location.hash;
      const target = hash.length > 1 ? document.querySelector(hash) : null;

      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);

      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') placePage();
    else window.addEventListener('load', placePage);

    return () => {
      io?.disconnect();
      trigger?.kill();
      window.removeEventListener('load', placePage);
    };
  }, []);

  return null;
}
