import { courses } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
        <div>
          <p className="text-sm font-medium tracking-wide text-accent">
            3 курса · запись · доступ от 3 до 9 месяцев
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-[1.08] font-medium tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Три последовательных курса, которые возвращают опору на себя
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Право быть собой. Безопасность в мире. Ценность независимо от
            результата. Это не три курса о разном — это три уровня взросления
            личности, которые логично проходить один за другим.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#courses"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Найти свой уровень
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-surface-alt"
            >
              Смотреть тарифы
            </a>
          </div>

          <p className="mt-6 text-sm text-muted">
            Курс «Сепарация I» начинается с диагностического практикума — 5
            вопросов, которые помогают понять, где именно вы застряли.
          </p>
        </div>

        <div aria-hidden="true" className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <ol className="flex flex-col gap-3">
            {[...courses].reverse().map((course) => (
              <li
                key={course.id}
                className="rounded-2xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-alt font-serif text-sm text-foreground">
                    {course.level}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-sm text-muted">{course.pillar}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
