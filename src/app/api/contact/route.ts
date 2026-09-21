import { NextResponse } from "next/server";

const REQUIRED = ["firstName", "lastName", "company", "email", "message"] as const;

// The original site used Wix Forms for delivery. This handler validates the
// submission; wire it to an email provider or CRM by setting
// CONTACT_WEBHOOK_URL (the payload is forwarded there as JSON).
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data: Record<string, string> = {};
  for (const key of REQUIRED) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (!value) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 422 });
    }
    data[key] = value.slice(0, 5000);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.warn("[contact] CONTACT_WEBHOOK_URL is not set; submission was validated but not delivered.");
  }

  return NextResponse.json({ ok: true });
}
