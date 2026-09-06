import Image from 'next/image';
import { shop, room } from '@/lib/content';

export function Offer() {
  const instagram = shop.social[0].href;

  return (
    <section className="section offer" id="offer" aria-labelledby="offer-title">
      <div className="shell">
        <div className="offer__grid">
          <div className="offer__art">
            <Image
              src="/assets/opt/promotion.webp"
              alt="Nuat Time promotional treatment"
              width={438}
              height={814}
              sizes="(max-width: 900px) 90vw, 42vw"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="d-section reveal" id="offer-title">
              <span>This month at Nuat Time</span>
            </h2>
            <div className="prose" style={{ marginTop: 'var(--s-5)' }}>
              <p>
                We run a standing offer on reflexology for regulars and first-timers alike. The
                current one is posted on Instagram, along with what is available this week.
              </p>
            </div>
            <p style={{ marginTop: 'var(--s-6)' }}>
              <a className="btn" href={instagram} target="_blank" rel="noopener">
                <span className="btn__dot" />
                See this month&rsquo;s offer
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* The one interaction on the page that answers a click rather than a scroll.
   Radio inputs keep it keyboard-operable with no JavaScript at all. */
export function Room() {
  return (
    <section className="section" aria-labelledby="room-title">
      <div className="shell shell--wide">
        <div className="head">
          <h2 className="d-section reveal" id="room-title">
            <span>The room</span>
          </h2>
          <p className="head__note">Pick a panel to look around.</p>
        </div>

        <div className="room">
          {room.map((panel, i) => (
            <RoomPanel key={panel.title} index={i} {...panel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoomPanel({
  index,
  title,
  note,
}: {
  index: number;
  title: string;
  note: string;
  img: string;
}) {
  const id = `room-${index + 1}`;
  return (
    <>
      <input className="room__input" type="radio" name="room" id={id} defaultChecked={index === 0} />
      <label className="room__panel" data-img={String(index + 1)} htmlFor={id}>
        <span className="room__caption">
          <span className="room__title">{title}</span>
          <span className="room__note">{note}</span>
        </span>
      </label>
    </>
  );
}
