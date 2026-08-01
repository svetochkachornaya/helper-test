"use client";

import { useState, type ReactNode } from "react";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  idPrefix: string;
  allowMultiple?: boolean;
}

export default function Accordion({ items, idPrefix, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const next = allowMultiple ? new Set(current) : new Set<number>();
      if (current.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="divide-y divide-border border-t border-b border-border">
      {items.map((item, index) => {
        const isOpen = openIndexes.has(index);
        const buttonId = `${idPrefix}-button-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div key={buttonId}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-foreground"
              >
                <span>{item.title}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-4 pr-8 text-sm leading-relaxed text-muted"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
