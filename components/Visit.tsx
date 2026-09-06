import Image from 'next/image';
import { shop, reviewsRowA, reviewsRowB } from '@/lib/content';

export function Visit() {
  const { address, hours, phoneDisplay, whatsapp, maps } = shop;

  return (
    <section className="section visit" id="visit" aria-labelledby="visit-title">
      <div className="shell">
        <div className="visit__grid">
          <div>
            <div className="head">
              <h2 className="d-section reveal" id="visit-title">
                <span>Visit</span>
              </h2>
            </div>
            <address className="address" style={{ fontStyle: 'normal' }}>
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.line3}
            </address>
          </div>

          <div>
            <ul className="hours">
              <li>
                <span>Monday to Sunday</span>{' '}
                <b>
                  {hours.open} &ndash; {hours.close}
                </b>
              </li>
              <li>
                <span>Last booking</span> <b>{hours.lastBooking}</b>
              </li>
              <li>
                <span>WhatsApp</span> <b>{phoneDisplay}</b>
              </li>
            </ul>

            <p
              style={{
                marginTop: 'var(--s-6)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--s-4)',
              }}
            >
              <a className="btn" href={whatsapp} target="_blank" rel="noopener">
                <span className="btn__dot" />
                Book on WhatsApp
              </a>
              <a className="btn btn--ghost" href={maps} target="_blank" rel="noopener">
                Open in Google Maps
              </a>
            </p>
          </div>

          <figure className="figure figure--portrait">
            <Image
              src="/assets/opt/storefront.webp"
              alt="The Nuat Time shopfront on Golf Island at dusk"
              width={1600}
              height={2400}
              sizes="(max-width: 900px) 90vw, 30vw"
              loading="lazy"
            />
            <figcaption className="figure__caption">Look for the carved doors on Blok E.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="section section--tight" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="head">
          <h2 className="d-section reveal" id="reviews-title">
            <span>What guests say</span>
          </h2>
        </div>
      </div>

      <div className="marquee">
        <MarqueeRow items={reviewsRowA} variant="a" />
        <MarqueeRow items={reviewsRowB} variant="b" />
      </div>
    </section>
  );
}

/* The strip is duplicated so the loop can translate exactly -50% and land
   back where it started. The copy is hidden from assistive tech. */
function MarqueeRow({ items, variant }: { items: string[]; variant: 'a' | 'b' }) {
  return (
    <div className={`marquee__row marquee__row--${variant}`}>
      <div className="marquee__track">
        {items.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="Guest review" loading="lazy" decoding="async" />
        ))}
        {items.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${src}-dup`} src={src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        ))}
      </div>
    </div>
  );
}
