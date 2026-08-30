"use client";

import { useState } from "react";
import { RefreshCw, Square, Trash2 } from "lucide-react";
import { PageHeader, HeaderButton } from "@/components/PageHeader";
import { TabNav } from "@/components/TabNav";
import { StatusBadge } from "@/components/StatusBadge";
import { JobCard } from "@/components/JobCard";
import { DetailDrawer } from "@/components/DetailDrawer";
import { MockLogViewer } from "@/components/MockLogViewer";
import { jobs, jobsSummary, autonomousJobs, type ScrapeJob } from "@/data/mock-data";

const TABS = [
  { value: "active", label: "Activos", count: jobs.filter((j) => j.status === "running" || j.status === "queued").length },
  { value: "completed", label: "Completados", count: jobs.filter((j) => j.status === "completed" || j.status === "failed" || j.status === "warnings").length },
  { value: "autonomous", label: "Autónomos", count: autonomousJobs.length },
];

export default function JobsPage() {
  const [tab, setTab] = useState("active");
  const [logsJob, setLogsJob] = useState<ScrapeJob | null>(null);

  const visible =
    tab === "active"
      ? jobs.filter((j) => j.status === "running" || j.status === "queued")
      : tab === "completed"
        ? jobs.filter((j) => j.status === "completed" || j.status === "failed" || j.status === "warnings")
        : [];

  return (
    <div>
      <PageHeader
        title="Jobs"
        subtitle="Scraping y enrichment autónomos y manuales"
        variant="classic"
        actions={
          <>
            <HeaderButton icon={<Trash2 size={15} />}>Eliminar todos</HeaderButton>
            <HeaderButton variant="danger" icon={<Square size={15} />}>
              Detener todos ({jobsSummary.running})
            </HeaderButton>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusBadge tone="success" variant="classic">
          Worker activo
        </StatusBadge>
        <StatusBadge tone="info" variant="classic">
          {jobsSummary.running} ejecutándose
        </StatusBadge>
        <StatusBadge tone="neutral" variant="classic">
          {jobsSummary.queued} en cola
        </StatusBadge>
        <StatusBadge tone="danger" variant="classic">
          {jobsSummary.failed24h} fallidos (24h)
        </StatusBadge>
        <StatusBadge tone="neutral" variant="classic">
          🌐 {jobsSummary.browsersActive}/{jobsSummary.browsersTotal} navegadores
        </StatusBadge>
        <StatusBadge tone="neutral" variant="classic">
          Última ejecución {jobsSummary.lastRun}
        </StatusBadge>
      </div>

      <div className="mb-4">
        <TabNav tabs={TABS} active={tab} onChange={setTab} variant="classic" />
      </div>

      {tab === "autonomous" ? (
        <div className="flex flex-col gap-3">
          {autonomousJobs.map((j) => (
            <div key={j.id} className="rounded-xl bg-surface p-4 ring-1 ring-border">
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <h3 className="text-[15px] font-bold text-foreground">{j.name}</h3>
                <StatusBadge tone="accent" variant="classic">
                  Autónomo
                </StatusBadge>
                <span className="ml-auto">
                  <StatusBadge
                    tone={j.status === "running" ? "info" : j.status === "warnings" ? "warning" : j.status === "disabled" ? "neutral" : "success"}
                    variant="classic"
                  >
                    {j.status === "running" ? "Ejecutándose" : j.status === "warnings" ? "Con avisos" : j.status === "disabled" ? "Desactivado" : "Inactivo"}
                  </StatusBadge>
                </span>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Meta label="Frecuencia" value={j.frequency} />
                <Meta label="Próxima ejecución" value={j.nextRun ?? "Sin programar"} />
                <Meta label="Última ejecución" value={j.lastRun} />
                <Meta label="Reintentos" value={j.retries} />
              </div>
              <div className="mb-3 border-t border-border pt-3 text-[12px] font-semibold text-muted">
                Fuentes ({j.sources.length}): {j.sources.slice(0, 4).join(", ")}
                {j.sources.length > 4 && <span className="text-primary"> +{j.sources.length - 4} más</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="h-7 rounded-lg bg-primary px-2.5 text-xs font-bold text-primary-foreground">
                  Ejecutar ahora
                </button>
                <button type="button" className="h-7 rounded-lg border border-border-strong px-2.5 text-xs font-bold text-foreground hover:bg-surface-raised">
                  {j.enabled ? "Desactivar" : "Activar"}
                </button>
                <button type="button" className="h-7 rounded-lg border border-border-strong px-2.5 text-xs font-bold text-foreground hover:bg-surface-raised">
                  Historial
                </button>
                <button type="button" className="h-7 rounded-lg border border-border-strong px-2.5 text-xs font-bold text-foreground hover:bg-surface-raised">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl bg-surface p-10 text-center ring-1 ring-border">
          <p className="text-sm font-semibold text-muted">No hay jobs en esta vista.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((job) => (
            <JobCard key={job.id} job={job} onOpenLogs={setLogsJob} />
          ))}
        </div>
      )}

      <DetailDrawer
        open={!!logsJob}
        onClose={() => setLogsJob(null)}
        title={logsJob ? `${logsJob.platform} · ${logsJob.country}` : ""}
        subtitle={logsJob ? `Iniciado ${logsJob.startedAt}` : undefined}
        width={560}
      >
        {logsJob && (
          <MockLogViewer
            title={`${logsJob.platform.toLowerCase()} · scraping`}
            lines={logsJob.logs}
            height={440}
            live={logsJob.status === "running"}
          />
        )}
      </DetailDrawer>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-faint">{label}</div>
      <div className="text-[13px] font-bold text-foreground">{value}</div>
    </div>
  );
}
