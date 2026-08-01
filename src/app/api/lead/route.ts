import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,17}$/;

interface LeadPayload {
  name?: unknown;
  contact?: unknown;
  tariff?: unknown;
  consent?: unknown;
  utm?: unknown;
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const errors: Record<string, string> = {};

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!name) errors.name = "Укажите имя";

  const contact = typeof payload.contact === "string" ? payload.contact.trim() : "";
  if (!contact || !(EMAIL_RE.test(contact) || PHONE_RE.test(contact))) {
    errors.contact = "Укажите email или телефон";
  }

  if (payload.consent !== true) {
    errors.consent = "Нужно согласие на обработку данных";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const tariff = typeof payload.tariff === "string" ? payload.tariff : "unspecified";

  console.info("[lead]", {
    name,
    contact,
    tariff,
    utm: payload.utm ?? null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
