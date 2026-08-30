import { insertedLast7Days, portals } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

export function InsertedTab() {
  const max = Math.max(...insertedLast7Days.map((r) => r.inserted + r.updated));

  return (
    <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
      <div className="mb-5">
        <h2 className="text-[15px] font-extrabold text-foreground">Datos insertados · últimos 7 días</h2>
        <span className="text-[12px] font-semibold text-faint">Filas nuevas vs. actualizadas por portal</span>
      </div>
      <div className="flex flex-col gap-3">
        {insertedLast7Days.map((row) => {
          const portal = portals.find((p) => p.id === row.portalId)!;
          const insertedPct = (row.inserted / max) * 100;
          const updatedPct = (row.updated / max) * 100;
          return (
            <div key={row.portalId} className="flex items-center gap-3.5">
              <div className="w-32 flex-none truncate text-[12.5px] font-bold text-foreground">{portal.name}</div>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-raised">
                <div className="flex h-full">
                  <div className="h-full rounded-l-full" style={{ width: `${insertedPct}%`, background: "var(--success)" }} />
                  <div className="h-full rounded-r-full" style={{ width: `${updatedPct}%`, background: "var(--info)" }} />
                </div>
              </div>
              <div className="w-40 flex-none text-right font-mono text-[11.5px] tabular-nums text-faint">
                <span style={{ color: "var(--success)" }}>{fmtNumber(row.inserted)} nuevas</span> ·{" "}
                <span style={{ color: "var(--info)" }}>{fmtNumber(row.updated)} act.</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
