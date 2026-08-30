"use client";

import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { PageHeader, HeaderButton } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable, type Column } from "@/components/DataTable";
import { exportDatasets, exportHistory, exportPresets, type ExportRecord } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

const FORMATS = ["CSV", "JSON", "XLSX", "Google Sheets"];

const STATUS_TONE: Record<ExportRecord["status"], "success" | "warning" | "info" | "danger"> = {
  ready: "success",
  expired: "warning",
  running: "info",
  failed: "danger",
};
const STATUS_LABEL: Record<ExportRecord["status"], string> = {
  ready: "Listo",
  expired: "Caducado",
  running: "En curso",
  failed: "Fallido",
};

export default function ExportacionesPage() {
  const [dataset, setDataset] = useState(exportDatasets[0].id);
  const [format, setFormat] = useState("CSV");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }

  const columns: Column<ExportRecord>[] = [
    {
      key: "name",
      header: "Exportación",
      render: (r) => (
        <span className="font-bold text-foreground">
          {r.name} {r.note && <span className="font-normal text-faint">— {r.note}</span>}
        </span>
      ),
    },
    { key: "date", header: "Fecha", render: (r) => r.date },
    { key: "format", header: "Formato", render: (r) => r.format },
    { key: "matches", header: "Coincidencias", className: "font-mono tabular-nums", render: (r) => fmtNumber(r.matches) },
    { key: "duration", header: "Duración", className: "font-mono tabular-nums", render: (r) => r.duration },
    { key: "status", header: "Estado", render: (r) => <StatusBadge tone={STATUS_TONE[r.status]} variant="classic">{STATUS_LABEL[r.status]}</StatusBadge> },
    {
      key: "action",
      header: "",
      render: (r) => (
        <button
          type="button"
          onClick={() => showToast(r.status === "ready" ? `Descargando "${r.name}"… (simulado)` : "Reintentando exportación… (simulado)")}
          className="font-bold text-primary hover:underline"
        >
          {r.status === "ready" ? "Descargar" : "Reintentar"}
        </button>
      ),
    },
  ];

  return (
    <div className="relative">
      <PageHeader
        title="Exportaciones"
        subtitle="Exporta ofertas por plataforma, país, categoría y formato"
        variant="classic"
        actions={
          <>
            <HeaderButton icon={<RefreshCw size={15} />}>Actualizar</HeaderButton>
            <HeaderButton variant="primary" icon={<Download size={15} />} onClick={() => showToast("Exportación lanzada en segundo plano (simulado)")}>
              Exportar ofertas
            </HeaderButton>
          </>
        }
      />

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Dataset</h2>
      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {exportDatasets.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setDataset(d.id)}
            className={`rounded-xl p-3.5 text-left ring-1 transition-colors ${
              dataset === d.id ? "bg-primary-soft ring-primary/50" : "bg-surface ring-border hover:ring-border-strong"
            }`}
          >
            <div className="text-xl">{d.icon}</div>
            <div className="mt-2 text-[13.5px] font-bold text-foreground">{d.title}</div>
            <div className="mt-1 text-[11.5px] leading-snug text-muted">{d.description}</div>
          </button>
        ))}
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Configuración</h2>
          <div className="mb-3">
            <label className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-widest text-muted">Formato</label>
            <div className="flex flex-wrap gap-1.5">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`rounded-lg border px-3 py-1.5 text-[12.5px] font-bold ${
                    format === f ? "border-primary bg-primary-soft text-primary" : "border-border-strong bg-surface text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Plataforma" options={["Todas", "InfoJobs", "Computrabajo", "Manpower"]} />
            <SelectField label="País · 21 disp." options={["Todos", "España", "México", "Francia"]} />
            <SelectField label="Categoría · 182 disp." options={["Todas"]} />
            <SelectField label="Modalidad" options={["Todas", "Remoto", "Híbrido", "Presencial"]} />
          </div>
        </div>

        <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Presets · filtros guardados</h2>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {exportPresets.map((p) => (
              <span key={p} className="rounded-full border border-border bg-surface-raised px-2.5 py-1 text-[11.5px] font-semibold text-muted">
                {p}
              </span>
            ))}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-[13px] font-bold text-foreground">Resumen de exportación</h3>
            <StatusBadge tone="success" variant="classic">
              Listo
            </StatusBadge>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-[12.5px]">
            <div>
              <dt className="text-faint">Dataset</dt>
              <dd className="font-bold text-foreground">{exportDatasets.find((d) => d.id === dataset)?.title}</dd>
            </div>
            <div>
              <dt className="text-faint">Formato</dt>
              <dd className="font-bold text-foreground">{format}</dd>
            </div>
            <div>
              <dt className="text-faint">Registros estimados</dt>
              <dd className="font-bold text-foreground">No calculado</dd>
            </div>
            <div>
              <dt className="text-faint">Destino</dt>
              <dd className="font-bold text-foreground">Archivo</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => showToast("Calculando registros… (simulado)")}
            className="mt-3 rounded-lg border border-border-strong px-3 py-1.5 text-xs font-bold text-foreground hover:bg-surface-raised"
          >
            Calcular registros
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
        <div className="mb-3 flex items-center gap-2.5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Mis exportaciones</h2>
            <span className="text-[11.5px] text-faint">Se ejecutan en el servidor · puedes cerrar y volver</span>
          </div>
          <button type="button" className="ml-auto rounded-lg border border-border-strong px-3 py-1.5 text-xs font-bold text-foreground hover:bg-surface-raised">
            Actualizar
          </button>
        </div>
        <DataTable columns={columns} rows={exportHistory} variant="classic" />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-control bg-foreground px-4 py-2.5 text-[13px] font-semibold text-background shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-widest text-muted">{label}</label>
      <select className="h-9 w-full rounded-lg border border-border-strong bg-surface px-2.5 text-[13px] text-foreground">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
