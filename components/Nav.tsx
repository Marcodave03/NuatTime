'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { nav } from '@/lib/content';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => setStuck(window.scrollY > 24);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#gate" aria-label="Nuat Time, home">
          <Image src="/assets/navlogo.svg" alt="Nuat Time" width={206} height={51} priority />
        </a>

        <button
          ref={burgerRef}
          className="nav__burger"
          type="button"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav__menu" id="nav-menu" aria-label="Primary">
          <ul className="nav__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a className="nav__link link" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
