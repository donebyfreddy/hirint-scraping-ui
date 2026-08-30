"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

export function TabNav({
  tabs,
  active,
  onChange,
  variant = "suite",
}: {
  tabs: TabItem[];
  active: string;
  onChange: (value: string) => void;
  variant?: "suite" | "classic";
}) {
  if (variant === "classic") {
    return (
      <div className="flex gap-5 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={cn(
              "relative -mb-px flex items-center gap-1.5 border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
              active === t.value
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="rounded-full bg-surface-raised px-1.5 py-0.5 text-[10px] font-bold text-faint">{t.count}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-wrap gap-1.5 rounded-[12px] border border-border bg-surface-raised p-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={cn(
            "flex items-center gap-1.5 rounded-[9px] px-3.5 py-2 text-[13px] font-bold transition-colors",
            active === t.value ? "bg-surface text-primary shadow-subtle" : "text-muted hover:text-foreground"
          )}
        >
          {t.label}
          {t.count !== undefined && <span className="text-[11px] font-bold text-faint">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function ChipTabs({
  chips,
  active,
  onChange,
}: {
  chips: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            "rounded-pill border px-3 py-1.5 text-[12.5px] font-semibold transition-colors",
            active === c
              ? "border-primary-ring bg-primary-soft text-primary"
              : "border-border bg-surface text-foreground hover:border-primary-ring hover:bg-primary-soft hover:text-primary"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
