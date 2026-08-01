const points = [
  {
    title: "Полностью в записи",
    description: "Без дат старта и живых созвонов — начинаете, когда готовы.",
  },
  {
    title: "В своём темпе",
    description: "Проходите занятия последовательно, возвращаетесь к нужным местам.",
  },
  {
    title: "Доступ на 3–9 месяцев",
    description: "Срок зависит от тарифа: чем больше курсов, тем дольше доступ.",
  },
];

export default function FormatBand() {
  return (
    <section className="border-t border-border bg-surface-alt py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ul className="grid gap-8 sm:grid-cols-3">
          {points.map((point) => (
            <li key={point.title}>
              <p className="font-serif text-lg text-foreground">{point.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
