import { pricingTiers } from "@/lib/content";

const tierFeatures: Record<string, string[]> = {
  single: ["1 курс на выбор", "Доступ 3 месяца", "Материалы в записи, в своём темпе"],
  double: [
    "Курсы «Сепарация I» и «Травма насилия»",
    "Доступ 6 месяцев",
    "Экономия $21 по сравнению с покупкой по отдельности",
  ],
  bundle: [
    "Все 3 курса — полный путь по трём опорам",
    "Доступ 9 месяцев",
    "Экономия $39 по сравнению с покупкой по отдельности",
  ],
};

export default function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-accent">Тарифы</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Чем больше курсов, тем выгоднее и дольше доступ
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-3xl border p-7 ${
                tier.highlighted
                  ? "border-accent bg-surface shadow-[0_8px_30px_rgba(181,80,45,0.12)] lg:-translate-y-2"
                  : "border-border bg-surface"
              }`}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Рекомендуем
                </span>
              )}

              <h3 className="font-serif text-xl text-foreground">{tier.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl text-foreground">${tier.price}</span>
                {tier.originalPrice && (
                  <span className="text-sm text-muted line-through">${tier.originalPrice}</span>
                )}
              </div>
              {tier.savings && (
                <p className="mt-1 text-sm text-accent">Экономия ${tier.savings}</p>
              )}

              <ul className="mt-6 flex-1 space-y-3 text-sm text-foreground">
                {tierFeatures[tier.id].map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form"
                className={`mt-7 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-accent text-accent-foreground hover:bg-accent-hover"
                    : "border border-border text-foreground hover:bg-surface-alt"
                }`}
              >
                {tier.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
