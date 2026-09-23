import Reveal from "@/components/Reveal";
import type { Stat } from "@/data/aventurier";

// The slate figures strip from the second page of each leaflet.
export default function StatBand({ stats, label }: { stats: Stat[]; label: string }) {
  return (
    <section aria-label={label} className="bg-av-slate">
      <ul className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <li key={stat.label} className="bg-av-slate last:col-span-2 lg:last:col-span-1">
            <Reveal
              variant="fade"
              delay={i * 60}
              className="flex h-full flex-col items-center justify-center px-16 py-28 text-center lg:px-24 lg:py-48"
            >
              <p className="text-[1.75rem] font-bold leading-none text-white lg:text-[2.5rem]">{stat.value}</p>
              <p className="t-small mt-10 text-white/70 lg:mt-14">{stat.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
