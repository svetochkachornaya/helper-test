"use client";

import { useId, useState } from "react";
import { courses } from "@/lib/content";
import Accordion from "./Accordion";

export default function CoursesSection() {
  const [activeId, setActiveId] = useState(courses[0].id);
  const tabsId = useId();

  function handleTabKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + courses.length) % courses.length;
    setActiveId(courses[nextIndex].id);
    document.getElementById(`${tabsId}-tab-${nextIndex}`)?.focus();
  }

  return (
    <section id="courses" className="border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-accent">Программа</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Три курса — три уровня
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Курсы"
          className="mt-10 flex gap-2 overflow-x-auto pb-1"
        >
          {courses.map((course, index) => {
            const selected = course.id === activeId;
            return (
              <button
                key={course.id}
                id={`${tabsId}-tab-${index}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${tabsId}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(course.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                Уровень {course.level} · {course.title}
              </button>
            );
          })}
        </div>

        {courses.map((course, index) => {
          if (course.id !== activeId) return null;
          return (
            <div
              key={course.id}
              id={`${tabsId}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-tab-${index}`}
              className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14"
            >
              <div>
                <h3 className="font-serif text-2xl font-medium text-foreground">
                  {course.fullTitle}
                </h3>
                <p className="mt-2 text-muted">{course.dek}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-surface p-5">
                    <p className="text-sm font-medium text-muted">Если проблема не решена</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground">
                      {course.beforeAfter.before.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span aria-hidden="true" className="text-muted">
                            —
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
                    <p className="text-sm font-medium text-accent">Результат</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground">
                      {course.beforeAfter.after.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span aria-hidden="true" className="text-accent">
                            ✓
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-medium text-foreground">{course.method.question}</p>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                    {course.method.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-surface-alt p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-serif text-2xl text-foreground">${course.price}</p>
                    <p className="text-sm text-muted">Доступ {course.accessMonths} месяца</p>
                  </div>
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
                  >
                    Перейти к тарифам
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">{course.curriculum.heading}</p>
                {course.curriculum.note && (
                  <p className="mt-2 text-sm text-muted">{course.curriculum.note}</p>
                )}
                <div className="mt-4">
                  <Accordion
                    idPrefix={`curriculum-${course.id}`}
                    items={course.curriculum.items.map((item) => ({
                      title: item.title,
                      content: item.description ?? "",
                    }))}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
