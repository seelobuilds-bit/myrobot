import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "./Icon";
import type { Machine } from "@/data/aventurier";

// Both leaflets make the same point: Artist 1 and Ranger One run on the same
// hot-swappable V25 battery. Each page uses this to point at the other machine.
export default function BatteryPlatform({ other }: { other: Machine }) {
  return (
    <section className="bg-panel px-24 py-80 lg:px-80 lg:py-100">
      <Reveal className="grid grid-cols-1 overflow-hidden border border-line bg-navy lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="p-24 lg:p-56">
          <p className="t-eyebrow flex items-center gap-10 text-av-teal">
            <Icon name="battery" className="h-20 w-20" />
            Shared battery platform
          </p>
          <h2 className="t-h3 mt-16 lg:mt-24">One Battery. Two Machines.</h2>
          <p className="t-body mt-16 text-muted lg:mt-24 lg:w-520">
            Artist 1 and Ranger One share the same hot-swappable V25 battery (25.2 V, 13 Ah). Keep spares charged
            and swap them between machines, so your team spends the shift cleaning instead of waiting on a charger.
          </p>
          <Link href={`/${other.slug}`} className="btn mt-28 h-50 w-full px-28 md:w-auto lg:mt-40">
            Explore {other.name}
          </Link>
        </div>
        <Link
          href={`/${other.slug}`}
          aria-label={`${other.name}: ${other.category}`}
          className="av-glow group relative flex h-280 items-center justify-center border-t border-line lg:h-auto lg:border-l lg:border-t-0"
        >
          <Image
            src={other.image.src}
            alt=""
            width={other.image.width}
            height={other.image.height}
            sizes="(min-width: 1001px) 20vw, 40vw"
            className="h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span className="t-eyebrow absolute bottom-16 left-16 text-white/80">{other.name}</span>
        </Link>
      </Reveal>
    </section>
  );
}
