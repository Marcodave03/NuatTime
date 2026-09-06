import { shop, tenets } from '@/lib/content';

export function Welcome() {
  return (
    <section className="section welcome" id="welcome">
      <div className="shell">
        <div className="split">
          <div>
            <h2 className="d-hero reveal">
              <span>
                Rest is
                <br />a practice.
              </span>
            </h2>
          </div>

          <div>
            <p className="lede">
              Thai reflexology works the body&rsquo;s energy lines to settle the nervous system and
              bring you back to a slower pace.
            </p>

            <div className="prose" style={{ marginTop: 'var(--s-5)' }}>
              <p>
                We opened on {shop.openedOn} in Ruko Golf Island, Pantai Indah Kapuk, and have kept
                the same intent since: an unhurried room, trained hands, and treatments that leave
                you looser than you arrived.
              </p>
              <p>Walk in, or send us a message on WhatsApp and we will hold a bed for you.</p>
            </div>

            <p className="welcome__meta">
              <span>
                <b>Open every day</b> {shop.hours.open} &ndash; {shop.hours.close}
              </span>
              <span>
                <b>Since</b> December 2023
              </span>
              <span>
                <b>Where</b> Golf Island, PIK
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Tenets() {
  return (
    <section className="section section--tight" aria-labelledby="philosophy-title">
      <div className="shell">
        <div className="head">
          <h2 className="d-section reveal" id="philosophy-title">
            <span>What we practise</span>
          </h2>
        </div>

        <div className="tenets">
          {tenets.map((t) => (
            <article className="tenet" key={t.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="tenet__mark" src={t.mark} alt="" loading="lazy" decoding="async" />
              <h3 className="tenet__name">{t.name}</h3>
              <p className="tenet__note">{t.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
