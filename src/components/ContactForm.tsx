"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "firstName", label: "First Name", type: "text", autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last Name", type: "text", autoComplete: "family-name", half: true },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", half: false },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email", half: false },
] as const;

export default function ContactForm({ id }: { id?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} className="mx-auto w-full max-w-[1182px] scroll-mt-140">
      <div className="grid grid-cols-1 gap-x-[24px] gap-y-[24px] lg:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.half ? "" : "lg:col-span-2"}>
            <label htmlFor={`${id ?? "contact"}-${field.name}`} className="field-label">
              {field.label}
              <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${id ?? "contact"}-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              className="field-input"
            />
          </div>
        ))}

        <div className="lg:col-span-2">
          <label htmlFor={`${id ?? "contact"}-message`} className="field-label">
            Message<span aria-hidden="true">*</span>
          </label>
          <textarea id={`${id ?? "contact"}-message`} name="message" required className="field-input" />
        </div>

        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[41px] w-full bg-white text-[16px] leading-[1.2] text-navy transition-opacity hover:opacity-80 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
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
