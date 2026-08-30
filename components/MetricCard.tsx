import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  sub,
  variant = "suite",
  accent,
  delta,
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: "suite" | "classic";
  accent?: string; // css color for stripe/value tint
  delta?: { value: string; direction: "up" | "down" };
}) {
  if (variant === "classic") {
    return (
      <div className="rounded-xl bg-surface p-3.5 ring-1 ring-border">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted">{label}</div>
        <div className="mt-1.5 font-mono text-xl font-bold tabular-nums text-foreground" style={accent ? { color: accent } : undefined}>
          {value}
        </div>
        {sub && <div className="mt-1 text-[11px] text-faint">{sub}</div>}
      </div>
    );
  }

  return (
    <div className="relative min-w-0 overflow-hidden rounded-card border border-border bg-surface p-4 shadow-subtle">
      {accent && <div className="absolute inset-y-0 left-0 w-[3px]" style={{ background: accent }} />}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[.05em] text-muted">{label}</span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-[6px] px-1.5 py-0.5 text-[11px] font-bold",
              delta.direction === "up" ? "text-success" : "text-danger"
            )}
            style={{ background: delta.direction === "up" ? "var(--success-soft)" : "var(--danger-soft)" }}
          >
            {delta.direction === "up" ? "▲" : "▼"} {delta.value}
          </span>
        )}
      </div>
      <div
        className="mt-2 overflow-hidden text-ellipsis font-mono text-[29px] font-extrabold leading-none tracking-tight tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      {sub && <div className="mt-1.5 text-[11.5px] font-semibold text-faint">{sub}</div>}
    </div>
  );
}
