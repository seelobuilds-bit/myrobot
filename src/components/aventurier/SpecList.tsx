import Reveal from "@/components/Reveal";

type SpecListProps = {
  intro: string;
  specs: [string, string][];
  brochure: string;
};

export default function SpecList({ intro, specs, brochure }: SpecListProps) {
  return (
    <section className="bg-navy px-24 py-80 lg:px-80 lg:py-120">
      <div className="grid grid-cols-1 gap-40 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-96">
        <Reveal>
          <h2 className="t-h2">Specifications</h2>
          <p className="t-body mt-16 text-muted lg:mt-24">{intro}</p>
          <a
            href={brochure}
            target="_blank"
            rel="noreferrer"
            className="t-small mt-24 inline-flex items-center gap-8 text-white underline underline-offset-[0.3em] hover:text-av-teal lg:mt-32"
          >
            Full leaflet (PDF)
          </a>
        </Reveal>
        <dl>
          {specs.map(([label, value]) => (
            <Reveal
              key={label}
              className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-16 border-b border-line py-14 first:border-t lg:grid-cols-2 lg:gap-32 lg:py-18"
            >
              <dt className="t-body text-ink">{label}</dt>
              <dd className="t-body text-right text-muted lg:text-left">{value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
