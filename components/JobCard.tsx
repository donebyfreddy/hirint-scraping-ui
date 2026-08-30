"use client";

import { useState } from "react";
import { FileText, History as HistoryIcon, Play, Square } from "lucide-react";
import type { ScrapeJob } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { ProgressCard } from "@/components/ProgressCard";

const STATUS_TONE: Record<ScrapeJob["status"], "success" | "warning" | "info" | "danger" | "neutral"> = {
  running: "info",
  completed: "success",
  failed: "danger",
  queued: "neutral",
  warnings: "warning",
};
const STATUS_LABEL: Record<ScrapeJob["status"], string> = {
  running: "Ejecutando",
  completed: "Completado",
  failed: "Error",
  queued: "En cola",
  warnings: "Con avisos",
};

export function JobCard({ job, onOpenLogs }: { job: ScrapeJob; onOpenLogs: (job: ScrapeJob) => void }) {
  const [running, setRunning] = useState(job.status === "running");

  return (
    <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <div
          className="grid h-8 w-8 flex-none place-items-center rounded-lg text-[13px]"
          style={{ background: "var(--primary-soft)" }}
        >
          {job.countryFlag}
        </div>
        <h3 className="text-[15px] font-bold text-foreground">
          {job.platform} <span className="font-normal text-faint">· {job.country}</span>
        </h3>
        {job.autonomous && (
          <StatusBadge tone="accent" variant="classic">
            Autónomo
          </StatusBadge>
        )}
        <span className="ml-auto">
          <StatusBadge tone={STATUS_TONE[job.status]} variant="classic">
            {STATUS_LABEL[job.status]}
          </StatusBadge>
        </span>
      </div>

      {(job.status === "running" || job.status === "completed" || job.status === "warnings" || job.status === "failed") && (
        <div className="mb-3">
          <ProgressCard processed={job.processed} total={job.total} progress={job.progress} />
        </div>
      )}

      <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Meta label="Insertadas" value={fmtNumber(job.inserted)} tone="success" />
        <Meta label="Actualizadas" value={fmtNumber(job.updated)} tone="info" />
        <Meta label="Sin cambios" value={fmtNumber(job.unchanged)} />
        <Meta label="ETA" value={job.eta ?? "—"} />
      </div>

      {job.proxyProvider && (
        <div className="mb-3 rounded-lg bg-surface-raised px-3 py-2 font-mono text-[11px] text-muted">
          Proxy <span className="font-bold text-foreground">{job.proxyProvider}</span> · {job.maskedIp}:{job.port} · salida{" "}
          <span className="font-bold text-foreground">{job.exitCountry}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {job.status === "queued" ? (
          <button
            type="button"
            onClick={() => setRunning(true)}
            className="inline-flex h-7 items-center gap-1 rounded-lg bg-primary px-2.5 text-xs font-bold text-primary-foreground"
          >
            <Play size={13} /> Ejecutar ahora
          </button>
        ) : job.status === "running" ? (
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-lg border px-2.5 text-xs font-bold text-danger"
            style={{ borderColor: "var(--danger)" }}
          >
            <Square size={13} /> Detener
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onOpenLogs(job)}
          className="inline-flex h-7 items-center gap-1 rounded-lg border border-border-strong px-2.5 text-xs font-bold text-foreground hover:bg-surface-raised"
        >
          <FileText size={13} /> Ver logs
        </button>
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-lg border border-border-strong px-2.5 text-xs font-bold text-foreground hover:bg-surface-raised"
        >
          <HistoryIcon size={13} /> Historial
        </button>
      </div>
    </div>
  );
}

function Meta({ label, value, tone }: { label: string; value: string; tone?: "success" | "info" }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-faint">{label}</div>
      <div
        className="font-mono text-[13px] font-bold tabular-nums text-foreground"
        style={tone === "success" ? { color: "var(--success)" } : tone === "info" ? { color: "var(--info)" } : undefined}
      >
        {value}
      </div>
    </div>
  );
}
