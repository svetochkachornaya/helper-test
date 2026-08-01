import { brand } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {brand.name}
        </p>
        <nav aria-label="Дополнительные ссылки" className="flex gap-6">
          <a href="#pillars" className="hover:text-foreground">
            Подход
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Тарифы
          </a>
          <a href="#faq" className="hover:text-foreground">
            Вопросы
          </a>
        </nav>
      </div>
    </footer>
  );
}
