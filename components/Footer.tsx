import { shop, nav } from '@/lib/content';

export default function Footer() {
  const { hours, address, phoneDisplay, phoneHref, whatsapp, maps, social } = shop;

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div>
            <h2 className="d-lead">
              Come in.
              <br />
              We are open until nine.
            </h2>
            <p className="footer__call">
              <a className="btn" href={whatsapp} target="_blank" rel="noopener">
                <span className="btn__dot" />
                Message us on WhatsApp
              </a>
            </p>
          </div>

          <div>
            <p className="footer__label">Find us</p>
            <ul className="footer__list">
              <li>
                Ruko Golf Island Blok E 109&ndash;111
                <br />
                {address.line2.replace('Jl. ', '')}, Jakarta Utara
              </li>
              <li>
                <a className="link" href={maps} target="_blank" rel="noopener">
                  Open in Google Maps
                </a>
              </li>
              <li>
                <a className="link" href={phoneHref}>
                  {phoneDisplay}
                </a>
              </li>
            </ul>

            <p className="footer__label" style={{ marginTop: 'var(--s-6)' }}>
              Social
            </p>
            <ul className="footer__list">
              {social.map((s) => (
                <li key={s.name}>
                  <a className="social" href={s.href} target="_blank" rel="noopener">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" loading="lazy" decoding="async" />
                    <span className="link">{s.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer__label">This page</p>
            <ul className="footer__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a className="link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} Nuat Time</span>
          <span>
            Open every day, {hours.open} &ndash; {hours.close}
          </span>
        </div>
      </div>
    </footer>
  );
}
