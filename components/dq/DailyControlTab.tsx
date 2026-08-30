import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { dailyControl, portals } from "@/data/mock-data";

const STATUS_TONE = { ok: "success", warning: "warning", error: "danger" } as const;
const STATUS_LABEL = { ok: "OK", warning: "Con avisos", error: "Fallido" } as const;

export function DailyControlTab() {
  const rows = dailyControl.map((r) => ({ ...r, id: r.portalId }));

  const cols: Column<(typeof rows)[number]>[] = [
    {
      key: "portal",
      header: "Portal",
      render: (r) => <span className="font-bold text-foreground">{portals.find((p) => p.id === r.portalId)?.name}</span>,
    },
    { key: "scheduledAt", header: "Programado", render: (r) => r.scheduledAt },
    { key: "lastRunAt", header: "Última ejecución", render: (r) => r.lastRunAt },
    {
      key: "status",
      header: "Resultado",
      render: (r) => (
        <StatusBadge tone={STATUS_TONE[r.lastRunStatus]}>{STATUS_LABEL[r.lastRunStatus]}</StatusBadge>
      ),
    },
    { key: "duration", header: "Duración", className: "font-mono tabular-nums", render: (r) => `${(r.durationMs / 1000).toFixed(1)} s` },
    { key: "fixedFields", header: "Campos reparados", className: "font-mono tabular-nums", render: (r) => r.fixedFields },
  ];

  return (
    <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
      <div className="mb-4">
        <h2 className="text-[15px] font-extrabold text-foreground">Control diario</h2>
        <span className="text-[12px] font-semibold text-faint">
          Análisis automático 07:00 Europe/Madrid · una ejecución por fuente con bloqueo de solapamiento (advisory lock)
        </span>
      </div>
      <DataTable columns={cols} rows={rows} />
    </div>
  );
}
