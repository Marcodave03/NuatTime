import Image from 'next/image';
import { treatments } from '@/lib/content';

export default function Treatments() {
  return (
    <section className="section" id="treatments" aria-labelledby="treatments-title">
      <div className="shell">
        <div className="split">
          <div>
            <div className="head">
              <h2 className="d-section reveal" id="treatments-title">
                <span>Treatments</span>
              </h2>
              <p className="head__note">
                Four ways to be worked on. Tell us where you hold tension and we will start there.
              </p>
            </div>

            <figure className="figure figure--portrait" style={{ maxWidth: 300 }}>
              <Image
                src="/assets/opt/lounge.webp"
                alt="The waiting lounge at Nuat Time"
                width={1400}
                height={2100}
                sizes="(max-width: 900px) 90vw, 300px"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="ledger">
            {treatments.map((t) => (
              <article className="treatment" key={t.name}>
                <h3 className="treatment__name">{t.name}</h3>
                <div>
                  {t.figure && (
                    <figure className="treatment__figure">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.figure} alt="" loading="lazy" decoding="async" />
                    </figure>
                  )}
                  <p className="treatment__body">
                    {t.body}
                    {t.aside && <span className="treatment__aside">{t.aside}</span>}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
