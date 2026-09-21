"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

// The contact page's own "request a demo" form. Fixed px sizing matches the
// original Wix Forms widget; it posts to the same /api/contact handler.
export default function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.workEmail,
          company: data.companyName,
          message: data.message,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "block h-[40px] w-full border border-ink/60 bg-transparent px-[12px] text-[16px] leading-[1.5] text-ink outline-none transition-colors hover:border-ink focus:border-ink";
  const label = "mb-[8px] block text-[14px] leading-[1.4] text-ink";

  return (
    <form id="Contact Form" onSubmit={onSubmit} className="scroll-mt-140">
      <p className="text-[1.75rem] font-normal leading-[1.5] text-muted">Get in touch</p>
      <p className="mt-[12px] text-[16px] leading-[1.5] text-muted">
        Please fill out the form below to request a professional demonstration of our robotic solutions.
      </p>

      <div className="mt-[22px] grid grid-cols-1 gap-x-[38px] gap-y-[25px] lg:grid-cols-2">
        <div>
          <label htmlFor="demo-firstName" className={label}>
            First Name<span aria-hidden="true">*</span>
          </label>
          <input id="demo-firstName" name="firstName" type="text" autoComplete="given-name" required className={input} />
        </div>
        <div>
          <label htmlFor="demo-lastName" className={label}>
            Last Name<span aria-hidden="true">*</span>
          </label>
          <input id="demo-lastName" name="lastName" type="text" autoComplete="family-name" required className={input} />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="demo-workEmail" className={label}>
            Work Email<span aria-hidden="true">*</span>
          </label>
          <input id="demo-workEmail" name="workEmail" type="email" autoComplete="email" required className={input} />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="demo-companyName" className={label}>
            Company Name<span aria-hidden="true">*</span>
          </label>
          <input id="demo-companyName" name="companyName" type="text" autoComplete="organization" required className={input} />
        </div>
        <div className="lg:col-span-2">
          <label htmlFor="demo-message" className={label}>
            Message<span aria-hidden="true">*</span>
          </label>
          <textarea
            id="demo-message"
            name="message"
            required
            placeholder="Tell us about your specific needs or use case..."
            className={`${input} h-[74px] resize-y py-[8px] placeholder:text-muted`}
          />
        </div>
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-[8px] h-[41px] w-full bg-white text-[16px] leading-[1.2] text-navy transition-opacity hover:opacity-80 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Request Demo"}
          </button>
          <div role="status">
            {(status === "sent" || status === "error") && (
              <p className="mt-[12px] text-center text-[14px] text-ink">
                {status === "sent"
                  ? "Thanks for submitting!"
                  : "Something went wrong. Please try again or email info@myrobot.ie."}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
