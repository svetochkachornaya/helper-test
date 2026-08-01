import { courses, growthLevels } from "@/lib/content";

export default function PillarsLadder() {
  return (
    <section id="pillars" className="border-t border-border bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            {growthLevels.intro}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Если хотя бы одна опора разрушена, реализовывать себя трудно:
            человек либо не решается идти своим путём, либо боится мира, либо
            ломается при первых неудачах.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-6">
          {courses.map((course) => (
            <li
              key={course.id}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 font-serif text-sm text-accent">
                  {course.level}
                </span>
                <span className="text-sm font-medium text-muted">
                  Уровень {course.level}
                </span>
              </div>

              <p className="mt-4 font-serif text-xl text-foreground">
                «{course.pillar}»
              </p>
              <p className="mt-2 text-sm text-muted">{course.levelPromise}</p>

              <div className="mt-6 flex flex-1 flex-col justify-end gap-2 border-t border-border pt-4 text-sm">
                <p className="text-muted line-through decoration-border">
                  {course.shortBeforeAfter.before}
                </p>
                <p className="font-medium text-foreground">
                  → {course.shortBeforeAfter.after}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-foreground">
          {growthLevels.outro}
        </p>
      </div>
    </section>
  );
}
