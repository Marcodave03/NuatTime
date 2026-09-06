import Image from 'next/image';
import { shop } from '@/lib/content';

/* The entrance. Two door panels part as you scroll and the treatment room
   behind them is the reward. The scrubbing lives in <Motion />; everything
   here is static markup so it renders on the server. */
export default function Gate() {
  return (
    <section className="gate" id="gate" aria-label="Entrance">
      <div className="gate__stage">
        <div className="gate__interior">
          <Image
            src="/assets/opt/inside.webp"
            alt="The treatment room at Nuat Time"
            fill
            sizes="100vw"
            priority
            quality={82}
          />
        </div>

        <div className="gate__word">
          <h1 className="gate__name">{shop.name}</h1>
          <p className="gate__tagline">{shop.tagline}</p>
        </div>

        <div className="gate__panel gate__panel--l" aria-hidden="true">
          <Image src="/assets/opt/door1.webp" alt="" fill sizes="51vw" priority />
        </div>
        <div className="gate__panel gate__panel--r" aria-hidden="true">
          <Image src="/assets/opt/door2.webp" alt="" fill sizes="51vw" priority />
        </div>

        <div className="gate__cue" aria-hidden="true">
          <span className="gate__cue-rail" />
          <span>Scroll to come in</span>
        </div>
      </div>
    </section>
  );
}
