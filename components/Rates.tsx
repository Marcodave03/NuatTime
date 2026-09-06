import { rates, rateExtra, formatPrice, type Tier } from '@/lib/content';

/* One duration and its price, joined by a leader dot rule - the oldest device
   in price-list typography. It carries the eye from name to number without
   needing a box, a rule, or a shadow. */
function TierRow({ minutes, price }: Tier) {
  return (
    <div className="tier">
      <span className="tier__dur">{minutes} min</span>
      <span className="tier__lead" aria-hidden="true" />
      <span className="tier__price">
        <small>Rp</small>
        {formatPrice(price)}
      </span>
    </div>
  );
}

export default function Rates() {
  return (
    <section className="section" id="rates" aria-labelledby="rates-title">
      <div className="shell">
        <div className="head">
          <h2 className="d-section reveal" id="rates-title">
            <span>Rates</span>
          </h2>
          <p className="head__note">
            Priced by the hour. No membership, and no package to sign up for.
          </p>
        </div>

        <div className="menu">
          {rates.map((rate) => (
            <article className="menu__item" key={rate.name}>
              <h3 className="menu__name">{rate.name}</h3>
              <p className="menu__desc">{rate.desc}</p>
              {rate.tiers.map((tier) => (
                <TierRow key={tier.minutes} {...tier} />
              ))}
            </article>
          ))}
        </div>

        <div className="menu__extra">
          <h3 className="menu__name">{rateExtra.name}</h3>
          <p className="menu__desc">{rateExtra.desc}</p>
          <TierRow {...rateExtra.tier} />
        </div>

        <p className="menu__foot">
          All treatments are by the session. Walk in, or message us to hold a bed.
        </p>
      </div>
    </section>
  );
}
