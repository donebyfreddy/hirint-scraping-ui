import { portals } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

const SERIES_COLORS = ["var(--primary)", "var(--info)", "var(--success)", "var(--warning)", "var(--chart-pink)", "var(--chart-cyan)", "var(--chart-lime)", "var(--chart-teal)"];

export function PerformanceTab() {
  const ranked = [...portals].sort((a, b) => b.offers - a.offers);
  const max = ranked[0].offers;
  const total = ranked.reduce((s, p) => s + p.offers, 0);

  return (
    <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
      <div className="mb-4">
        <h2 className="text-[15px] font-extrabold text-foreground">Rendimiento de scraping</h2>
        <span className="text-[12px] font-semibold text-faint">{portals.length} fuentes activas · ordenadas por volumen</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {ranked.map((p, i) => {
          const color = SERIES_COLORS[i % SERIES_COLORS.length];
          const widthPct = (p.offers / max) * 100;
          const share = ((p.offers / total) * 100).toFixed(1).replace(".", ",");
          return (
            <div key={p.id} className="flex items-center gap-3.5 rounded-[12px] border border-border bg-surface-raised px-4 py-3">
              <span className="w-4 flex-none text-center text-[12px] font-extrabold text-faint">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2 text-[13.5px] font-bold text-foreground">
                  <span className="h-[9px] w-[9px] flex-none rounded-full" style={{ background: color }} />
                  {p.name}
                </div>
                <div className="h-1.5 overflow-hidden rounded-[4px] border border-border bg-surface">
                  <div className="h-full rounded-[4px]" style={{ width: `${widthPct}%`, background: color }} />
                </div>
              </div>
              <div className="flex-none text-right">
                <div className="font-mono text-[15px] font-extrabold tabular-nums text-foreground">{fmtNumber(p.offers)}</div>
                <div className="text-[10.5px] font-semibold text-faint">
                  {p.status === "critical" ? <span style={{ color: "var(--danger)" }}>Sin datos</span> : `${p.dailyAvg}/día · Healthy`}
                </div>
              </div>
              <span className="w-12 flex-none text-right font-mono text-[11px] font-bold tabular-nums text-muted">{share}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
