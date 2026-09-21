import Link from "next/link";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { CONTACT } from "@/data/site";

type CtaSectionProps = {
  title?: string;
  text?: string;
  primaryLabel?: string;
  /** Render the enquiry form beneath the buttons (home, robotics, robot pages). */
  withForm?: boolean;
  formId?: string;
};

export default function CtaSection({
  title = "Ready to See It in Action?",
  text = "Book a free site assessment and demo anywhere in Ireland.",
  primaryLabel = "Book a Demo",
  withForm = true,
  formId = "enquiry",
}: CtaSectionProps) {
  return (
    <section className="border-t border-line bg-navy px-24 pb-105 pt-80 lg:px-0 lg:pb-84 lg:pt-80">
      <Reveal>
        <h2 className="t-h2 text-center">{title}</h2>
      </Reveal>
      <Reveal>
        <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-40 lg:w-640">{text}</p>
      </Reveal>

      <Reveal className="mt-40 flex flex-col items-center gap-12 lg:mt-48 lg:flex-row lg:justify-center lg:gap-24">
        <Link href="/contact" className="btn h-53 w-273">
          {primaryLabel}
        </Link>
        <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn h-53 w-273">
          Call Us: {CONTACT.phone}
        </a>
      </Reveal>

      {withForm && (
        <div className="mt-65 px-25 lg:mt-114 lg:px-108">
          <ContactForm id={formId} />
        </div>
      )}
    </section>
  );
}
