"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/data/site";
import { AVENTURIER, FLEET, SPACES } from "./data";
import { Arrow, Check } from "./ui";

const SIZES = ["Under 1,000 m²", "1,000–5,000 m²", "5,000–20,000 m²", "Over 20,000 m²", "Not sure"];

const INTERESTS = [
  ...FLEET.map((r) => ({ key: r.slug, label: r.name })),
  ...AVENTURIER.map((m) => ({ key: m.slug, label: m.name })),
  { key: "unsure", label: "Not sure yet" },
];

function sizeFor(area?: number) {
  if (!area) return "";
  if (area < 1000) return SIZES[0];
  if (area < 5000) return SIZES[1];
  if (area < 20000) return SIZES[2];
  return SIZES[3];
}

type Status = "idle" | "sending" | "sent" | "error";

const STEPS = ["Your space", "Your interest", "Your details"];

/**
 * Three-step enquiry. It posts to the same /api/contact handler as the current
 * site's forms; the selections are folded into the message so nothing new is
 * needed on the server.
 */
export default function ContactFlow({ robot, space, area }: { robot?: string; space?: string; area?: number }) {
  const [step, setStep] = useState(0);
  const [spaceKey, setSpaceKey] = useState(SPACES.some((s) => s.key === space) ? space! : "");
  const [size, setSize] = useState(sizeFor(area));
  const [interests, setInterests] = useState<string[]>(() => {
    if (robot === "aventurier") return AVENTURIER.map((m) => m.slug);
    return INTERESTS.some((i) => i.key === robot) ? [robot!] : [];
  });
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");

  const toggle = (key: string) =>
    setInterests((list) =>
      list.includes(key)
        ? list.filter((k) => k !== key)
        : [...list.filter((k) => k !== "unsure" || key === "unsure"), key],
    );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Enter on an earlier step moves forward rather than sending half a form.
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const spaceLabel = SPACES.find((s) => s.key === spaceKey)?.label ?? (spaceKey || "Not specified");
    const interestLabels = interests.map((k) => INTERESTS.find((i) => i.key === k)?.label).filter(Boolean);
    const message = [
      `Space: ${spaceLabel}`,
      `Floor area: ${size || "Not specified"}`,
      `Interested in: ${interestLabels.length ? interestLabels.join(", ") : "Not specified"}`,
      data.phone ? `Phone: ${data.phone}` : "",
      "",
      data.message?.trim() || "Please get in touch to arrange a free site assessment.",
    ]
      .filter((line, i, all) => line !== "" || (i > 0 && all[i - 1] !== ""))
      .join("\n");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          email: data.email,
          message,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setName(data.firstName);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="pop-in flex min-h-[32rem] flex-col items-start justify-center rounded-[2rem] bg-surface p-8 sm:p-12"
        role="status"
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-signal text-white">
          <span className="ping absolute inset-0 rounded-full bg-signal" />
          <Check className="relative h-7 w-7" />
        </span>
        <p className="t-h2 mt-8">Thanks, {name}.</p>
        <p className="t-lead mt-4 max-w-md text-ink-soft">
          Your enquiry is in. We&apos;ll be in touch to arrange your free site assessment and demo.
        </p>
        <p className="mt-8 text-sm text-steel">
          In a hurry? Call{" "}
          <a href={CONTACT.phoneHref} className="text-ink underline underline-offset-4">
            {CONTACT.phone}
          </a>
        </p>
      </div>
    );
  }

  const chip = (on: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
      on ? "border-signal bg-signal text-white" : "border-rule bg-surface text-ink-soft hover:border-ink/40"
    }`;

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] bg-surface p-6 sm:p-10"
      aria-label="Book a free site assessment"
    >
      {/* Progress */}
      <ol className="grid grid-cols-3 gap-2">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              aria-current={i === step ? "step" : undefined}
              className="group block w-full text-left disabled:cursor-default"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-paper">
                <span
                  className={`block h-full rounded-full bg-signal transition-[width] duration-700 ease-[var(--ease-out-expo)] ${i <= step ? "w-full" : "w-0"}`}
                />
              </span>
              <span className={`t-mono mt-3 block ${i === step ? "text-ink" : "text-steel"}`}>
                0{i + 1} <span className="hidden sm:inline">· {label}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 min-h-[22rem]">
        {step === 0 && (
          <fieldset key="s0" className="pop-in">
            <legend className="t-h2 !text-[clamp(1.8rem,3vw,2.6rem)]">What kind of space?</legend>
            <div className="mt-6 flex flex-wrap gap-2">
              {SPACES.map((s) => (
                <label key={s.key} className={chip(spaceKey === s.key)}>
                  <input
                    type="radio"
                    name="space"
                    value={s.key}
                    checked={spaceKey === s.key}
                    onChange={() => setSpaceKey(s.key)}
                    className="sr-only"
                  />
                  {s.label}
                </label>
              ))}
              <label className={chip(spaceKey === "other")}>
                <input
                  type="radio"
                  name="space"
                  value="other"
                  checked={spaceKey === "other"}
                  onChange={() => setSpaceKey("other")}
                  className="sr-only"
                />
                Something else
              </label>
            </div>
            <p className="t-mono mt-10 text-steel">Roughly how much floor?</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <label key={s} className={chip(size === s)}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
                    className="sr-only"
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset key="s1" className="pop-in">
            <legend className="t-h2 !text-[clamp(1.8rem,3vw,2.6rem)]">What are you interested in?</legend>
            <p className="mt-3 text-ink-soft">Pick as many as you like.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <label key={i.key} className={chip(interests.includes(i.key))}>
                  <input
                    type="checkbox"
                    checked={interests.includes(i.key)}
                    onChange={() => toggle(i.key)}
                    className="sr-only"
                  />
                  {interests.includes(i.key) && <Check className="-ml-1 mr-1.5 inline h-4 w-4" />}
                  {i.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Kept mounted (hidden) so typed details survive going back a step */}
        <fieldset className={step === 2 ? "pop-in" : "hidden"}>
          <legend className="t-h2 !text-[clamp(1.8rem,3vw,2.6rem)]">Where should we send it?</legend>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { n: "firstName", l: "First name", ac: "given-name", req: true },
              { n: "lastName", l: "Last name", ac: "family-name", req: true },
              { n: "company", l: "Company", ac: "organization", req: true },
              { n: "email", l: "Work email", ac: "email", req: true, type: "email" },
              { n: "phone", l: "Phone (optional)", ac: "tel", req: false, type: "tel" },
            ].map((f) => (
              <div key={f.n} className={f.n === "phone" ? "sm:col-span-2" : ""}>
                <label htmlFor={`cf-${f.n}`} className="mb-2 block text-sm font-[540]">
                  {f.l}
                </label>
                <input
                  id={`cf-${f.n}`}
                  name={f.n}
                  type={f.type ?? "text"}
                  autoComplete={f.ac}
                  required={step === 2 && f.req}
                  className="field"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label htmlFor="cf-message" className="mb-2 block text-sm font-[540]">
                Anything else? (optional)
              </label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Opening hours, floor types, current cleaning set-up…"
                className="field"
              />
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-rule pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-line !px-5">
            Back
          </button>
        ) : (
          <span className="text-sm text-steel">Takes about a minute.</span>
        )}
        {step < 2 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)} className="btn btn-ink">
            Continue
            <Arrow />
          </button>
        ) : (
          <button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Book my free assessment"}
            <Arrow />
          </button>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-[#c4122f]">
          Something went wrong. Please try again or email {CONTACT.email}.
        </p>
      )}
    </form>
  );
}
