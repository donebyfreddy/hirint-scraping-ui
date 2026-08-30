import { fmtPct } from "@/lib/utils";

function toneFor(pct: number): string {
  if (pct >= 90) return "var(--success)";
  if (pct >= 70) return "var(--warning)";
  return "var(--danger)";
}

export function CoverageBar({ label, pct, detail }: { label: string; pct: number; detail?: string }) {
  const color = toneFor(pct);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-bold text-foreground">{label}</span>
        <span className="text-[14px] font-extrabold" style={{ color }}>
          {fmtPct(pct)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-[6px] border border-border bg-surface-raised">
        <div className="h-full rounded-[6px]" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
      </div>
      {detail && <div className="mt-1.5 text-[11px] font-semibold text-faint">{detail}</div>}
    </div>
  );
}
