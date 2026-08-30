import { SeverityChip } from "@/components/StatusBadge";
import { anomalies } from "@/data/mock-data";

const BAR_COLOR: Record<string, string> = {
  Crítico: "var(--danger)",
  Alto: "var(--warning)",
  Medio: "var(--info)",
  Info: "var(--faint)",
};

export function AnomaliesTab() {
  return (
    <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
      <div className="mb-4">
        <h2 className="text-[15px] font-extrabold text-foreground">Anomalías</h2>
        <span className="text-[12px] font-semibold text-faint">Desviaciones de volumen o patrón detectadas frente al histórico del portal</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {anomalies.map((a) => (
          <div key={a.id} className="relative flex gap-3 overflow-hidden rounded-[12px] border border-border bg-surface p-4">
            <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: BAR_COLOR[a.severity] }} />
            <div className="mt-0.5">
              <SeverityChip severity={a.severity} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13.5px] font-extrabold text-foreground">
                {a.portal} — {a.title}
              </h4>
              <p className="mt-1 text-[12px] font-medium text-muted">Detectada {a.detectedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
