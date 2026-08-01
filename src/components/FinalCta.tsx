import LeadForm from "./LeadForm";

export default function FinalCta() {
  return (
    <section id="lead-form" className="border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Оставьте заявку — расскажем, с какого уровня начать
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Ответим на вопросы про программу и тарифы и поможем выбрать курс,
            который отвечает на ваш запрос прямо сейчас.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
