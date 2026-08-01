"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { pricingTiers } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export default function LeadForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [tariff, setTariff] = useState(pricingTiers[2]?.id ?? pricingTiers[0].id);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const utmRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }
    utmRef.current = utm;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Укажите имя";
    if (!contact.trim()) errors.contact = "Укажите email или телефон";
    if (!consent) errors.consent = "Нужно согласие на обработку данных";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, tariff, consent, utm: utmRef.current }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (data?.errors) setFieldErrors(data.errors);
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setContact("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center"
      >
        <p className="font-serif text-2xl text-foreground">Заявка отправлена</p>
        <p className="mt-2 text-muted">
          Мы получили вашу заявку и свяжемся с вами по указанному контакту.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="lead-name" className="block text-sm font-medium text-foreground">
          Имя
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "lead-name-error" : undefined}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
        />
        {fieldErrors.name && (
          <p id="lead-name-error" className="mt-1.5 text-sm text-error">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-contact" className="block text-sm font-medium text-foreground">
          Email или телефон
        </label>
        <input
          id="lead-contact"
          name="contact"
          type="text"
          autoComplete="email"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          aria-invalid={Boolean(fieldErrors.contact)}
          aria-describedby={fieldErrors.contact ? "lead-contact-error" : undefined}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
        />
        {fieldErrors.contact && (
          <p id="lead-contact-error" className="mt-1.5 text-sm text-error">
            {fieldErrors.contact}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-tariff" className="block text-sm font-medium text-foreground">
          Интересует
        </label>
        <select
          id="lead-tariff"
          name="tariff"
          value={tariff}
          onChange={(event) => setTariff(event.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-accent"
        >
          {pricingTiers.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.title} — ${tier.price}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="lead-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={fieldErrors.consent ? "lead-consent-error" : undefined}
          className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-[var(--accent)]"
        />
        <label htmlFor="lead-consent" className="text-sm text-muted">
          Я согласен(на) на обработку персональных данных
        </label>
      </div>
      {fieldErrors.consent && (
        <p id="lead-consent-error" className="text-sm text-error">
          {fieldErrors.consent}
        </p>
      )}

      {status === "error" && Object.keys(fieldErrors).length === 0 && (
        <p role="alert" className="text-sm text-error">
          Не получилось отправить заявку. Попробуйте ещё раз.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Отправляем…" : "Оставить заявку"}
      </button>
    </form>
  );
}
