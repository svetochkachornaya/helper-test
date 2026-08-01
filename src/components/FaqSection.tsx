import { faqItems } from "@/lib/content";
import Accordion from "./Accordion";

export default function FaqSection() {
  return (
    <section id="faq" className="border-t border-border bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-sm font-medium tracking-wide text-accent">Вопросы</p>
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Частые вопросы
        </h2>

        <div className="mt-10 rounded-2xl border border-border bg-surface px-6">
          <Accordion
            idPrefix="faq"
            items={faqItems.map((item) => ({
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
