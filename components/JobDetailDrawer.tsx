"use client";

import React, { useState } from "react";
import {
  Clock,
  Zap,
  Globe,
  Terminal,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber } from "@/lib/utils";
import type { DetailedScrapeJob } from "@/data/mock-data";

interface JobDetailDrawerProps {
  job: DetailedScrapeJob | null;
  onClose: () => void;
}

export function JobDetailDrawer({ job, onClose }: JobDetailDrawerProps) {
  const { showToast, openPortalById } = useScraping();
  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "egress">("overview");
  const [logFilter, setLogFilter] = useState<string>("ALL");
  const [logSearch, setLogSearch] = useState<string>("");

  if (!job) return null;

  const pct = Math.min(100, Math.round((job.processed / Math.max(1, job.totalTarget)) * 100));

  const filteredLogs = (job.structuredLogs || []).filter((log) => {
    if (logFilter !== "ALL" && log.level !== logFilter) return false;
    if (logSearch && !log.message.toLowerCase().includes(logSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <DetailDrawer
      open={Boolean(job)}
      onClose={onClose}
      title={`${job.portalFlag} ${job.portalName} · ${job.id}`}
      subtitle={`Iniciado: ${job.startedAt} · Worker: ${job.workerId} · Fase: ${job.currentPhase}`}
      badge={
        <span
          className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
            job.status === "RUNNING"
              ? "bg-info/15 text-info"
              : job.status === "COMPLETED"
                ? "bg-success/15 text-success"
                : job.status === "WARNINGS"
                  ? "bg-warning/15 text-warning"
                  : "bg-danger/15 text-danger"
          }`}
        >
          {job.status}
        </span>
      }
      width={700}
      actions={
        <button
          type="button"
          onClick={() => {
            onClose();
            openPortalById(job.portalId);
          }}
          className="rounded-lg border border-border-strong bg-surface px-2.5 py-1 text-[11.5px] font-bold text-foreground hover:bg-surface-raised"
        >
          Ver Fuente →
        </button>
      }
    >
      {/* Tabs */}
      <div className="mb-4 flex border-b border-border text-[13px] font-semibold">
        {[
          { id: "overview", label: "Ejecución & Métricas" },
          { id: "logs", label: `Logs Estructurados (${job.structuredLogs?.length || 0})` },
          { id: "egress", label: "Proxy & Salida de Red" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`border-b-2 px-3.5 py-2.5 transition-colors ${
              activeTab === t.id
                ? "border-primary font-bold text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-4">
          {/* Progress Bar & ETA */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold text-foreground">Progreso del Scraping</span>
              <span className="font-mono font-bold text-primary">{pct}% ({fmtNumber(job.processed)} / {fmtNumber(job.totalTarget)})</span>
            </div>

            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-surface-raised">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[12px] text-muted">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-faint" />
                <span>Tiempo restante estimado: <strong className="text-foreground">{job.etaRemaining}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-faint" />
                <span>Velocidad: <strong className="text-foreground">{job.currentSpeedOffersPerMin} ofertas/min</strong></span>
              </div>
            </div>
          </div>

          {/* Records outcome breakdown */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-faint mb-3">
              Desglose de Resultados de Ingesta
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-success">Insertadas Nuevas</span>
                <div className="mt-1 font-mono text-[20px] font-bold text-success">+{fmtNumber(job.insertedNew)}</div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-info">Actualizadas</span>
                <div className="mt-1 font-mono text-[20px] font-bold text-info">{fmtNumber(job.updatedExisting)}</div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted">Sin Cambios</span>
                <div className="mt-1 font-mono text-[20px] font-bold text-muted">{fmtNumber(job.unchanged)}</div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-danger">Errores / Descarte</span>
                <div className="mt-1 font-mono text-[20px] font-bold text-danger">{fmtNumber(job.failedErrors)}</div>
              </div>
            </div>
          </div>

          {/* Performance & latency */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Latencia Promedio</span>
              <div className="mt-1 font-mono text-[20px] font-bold text-foreground">{job.avgLatencyMs} ms</div>
              <span className="text-[11px] text-faint">Por petición HTTP</span>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Peticiones Fallidas</span>
              <div className="mt-1 font-mono text-[20px] font-bold text-foreground">{job.failedRequestsCount}</div>
              <span className="text-[11px] text-faint">{job.retriedRequestsCount} reintentos automáticos</span>
            </div>
          </div>

          {/* Control Actions */}
          <div className="flex gap-2">
            {job.status === "RUNNING" ? (
              <button
                type="button"
                onClick={() => showToast("Pausando ejecución del worker…", "warning")}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface py-2.5 text-[13px] font-bold text-foreground hover:bg-surface-raised"
              >
                <Pause size={15} /> Pausar Job
              </button>
            ) : (
              <button
                type="button"
                onClick={() => showToast("Reanudando job desde checkpoint…", "info")}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-[13px] font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Play size={15} /> Reanudar Job
              </button>
            )}
            <button
              type="button"
              onClick={() => showToast("Reiniciando scraper desde página 1…", "info")}
              className="flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-[13px] font-bold text-foreground hover:bg-surface-raised"
            >
              <RotateCcw size={15} /> Reiniciar Lote
            </button>
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === "logs" && (
        <div className="flex flex-col gap-3">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {["ALL", "INFO", "WARN", "ERROR", "DEBUG"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLogFilter(lvl)}
                  className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-bold transition-colors ${
                    logFilter === lvl
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface-raised text-muted hover:text-foreground"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" />
              <input
                type="text"
                placeholder="Filtrar mensajes..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="rounded-md border border-border bg-surface-raised py-1 pl-8 pr-3 text-[12px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Log terminal */}
          <div className="max-h-[420px] overflow-y-auto rounded-xl border border-border bg-[#0d1117] p-3 font-mono text-[11.5px] leading-relaxed text-[#c9d1d9]">
            {filteredLogs.length === 0 ? (
              <div className="py-8 text-center text-faint">No hay entradas de log que coincidan con el filtro.</div>
            ) : (
              filteredLogs.map((l, idx) => (
                <div key={idx} className="flex items-start gap-2 py-0.5 hover:bg-white/5">
                  <span className="flex-none text-[#6e7681]">{l.timestamp}</span>
                  <span
                    className={`flex-none font-bold ${
                      l.level === "ERROR"
                        ? "text-[#ff7b72]"
                        : l.level === "WARN"
                          ? "text-[#d29922]"
                          : l.level === "DEBUG"
                            ? "text-[#a5d6ff]"
                            : "text-[#7ee787]"
                    }`}
                  >
                    [{l.level}]
                  </span>
                  <span className="flex-none text-[#a5d6ff]">&lt;{l.category}&gt;</span>
                  <span className="break-all text-[#e6edf3]">{l.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Egress Tab */}
      {activeTab === "egress" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-primary font-bold text-[14px]">
              <Globe size={16} /> Salida de Red Webshare Egress
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-[12.5px]">
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold uppercase text-muted">País Solicitado</span>
                <div className="font-bold text-foreground">{job.egressProxy.requestedExitCountry}</div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold uppercase text-muted">País Real de Salida</span>
                <div className="font-bold text-success">{job.egressProxy.actualExitCountry} ✓ Match</div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold uppercase text-muted">IP de Salida</span>
                <div className="font-mono font-bold text-foreground">{job.egressProxy.maskedIp}</div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold uppercase text-muted">Pool Asignado</span>
                <div className="font-semibold text-foreground">{job.egressProxy.pool}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-success font-semibold text-[13px]">
              <ShieldCheck size={16} /> Sin bloqueos detectados en los últimos 500 requests
            </div>
            <p className="mt-1 text-[12px] text-muted">
              El WAF de origen responde en tiempos nominales (&lt; 280ms) con código HTTP 200.
            </p>
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
