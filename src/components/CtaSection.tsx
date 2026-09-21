import Link from "next/link";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { CONTACT } from "@/data/site";

type CtaSectionProps = {
  title?: string;
  /** Pass null to omit the sub-line (the contact page has none). */
  text?: string | null;
  primaryLabel?: string;
  /** Solid white primary button, as on the contact page. */
  primarySolid?: boolean;
  /** Render the enquiry form beneath the buttons (home, robotics, robot pages). */
  withForm?: boolean;
  formId?: string;
  tone?: "navy" | "panel";
};

export default function CtaSection({
  title = "Ready to See It in Action?",
  text = "Book a free site assessment and demo anywhere in Ireland.",
  primaryLabel = "Book a Demo",
  primarySolid = false,
  withForm = true,
  formId = "enquiry",
  tone = "navy",
}: CtaSectionProps) {
  return (
    <section
      className={`border-t border-line px-24 pb-105 pt-80 lg:px-0 lg:pb-84 lg:pt-80 ${
        tone === "panel" ? "border-b bg-panel" : "bg-navy"
      }`}
    >
      <Reveal>
        <h2 className="t-h2 text-center">{title}</h2>
      </Reveal>
      {text && (
        <Reveal>
          <p className="t-lead mx-auto mt-12 text-center text-muted lg:mt-40 lg:w-640">{text}</p>
        </Reveal>
      )}

      <Reveal
        variant="fade"
        delay={200}
        className={`flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-24 ${
          text ? "mt-40 lg:mt-48" : "mt-32 lg:mt-41"
        }`}
      >
        <Link href="/contact" className={`btn h-53 w-273 ${primarySolid ? "btn-solid lg:h-52 lg:w-180" : ""}`}>
          {primaryLabel}
        </Link>
        <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="btn h-53 w-273">
          Call Us: {CONTACT.phone}
        </a>
      </Reveal>

      {withForm && (
        <div className={`mt-65 px-25 lg:px-108 ${text ? "lg:mt-114" : "lg:mt-79"}`}>
          <ContactForm id={formId} />
        </div>
      )}
    </section>
  );
}
