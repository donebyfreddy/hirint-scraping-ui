"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Suite = polished KPI-dashboard header (Dashboard, Calidad de datos).
 *  Classic = the denser, older header used by Scraping/Jobs/Exportaciones/ATS —
 *  same structure as the real app's Classic views, just painted with Suite tokens. */
export type PageVariant = "suite" | "classic";

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    if (stored === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      setDark(false);
    }
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
    setDark(!dark);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar tema"
      className="grid h-[38px] w-[38px] flex-none place-items-center rounded-control border border-border-strong bg-surface text-foreground"
    >
      {dark ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
  variant = "suite",
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  variant?: PageVariant;
}) {
  return (
    <div className="mb-[22px] flex flex-wrap items-start gap-5">
      <div>
        <h1
          className={cn(
            "tracking-tight text-foreground",
            variant === "suite" ? "text-[23px] font-extrabold" : "text-2xl font-bold"
          )}
        >
          {title}
        </h1>
        {subtitle && <p className="mt-[3px] text-[13.5px] text-muted">{subtitle}</p>}
      </div>
      <div className="ml-auto flex flex-wrap items-center gap-2.5">
        {actions}
        <ThemeToggle />
      </div>
    </div>
  );
}

export function HeaderButton({
  children,
  variant = "ghost",
  onClick,
  icon,
}: {
  children: React.ReactNode;
  variant?: "ghost" | "primary" | "danger";
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-[38px] items-center gap-[7px] whitespace-nowrap rounded-control border px-[15px] text-[13px] font-bold transition",
        variant === "primary" &&
          "border-transparent bg-primary text-primary-foreground shadow-[0_4px_12px_var(--primary-ring)] hover:brightness-[1.06]",
        variant === "danger" &&
          "border-transparent bg-danger text-white shadow-[0_4px_12px_var(--danger-soft)] hover:brightness-[1.06]",
        variant === "ghost" && "border-border-strong bg-surface text-foreground hover:bg-surface-raised"
      )}
    >
      {icon}
      {children}
    </button>
  );
}
