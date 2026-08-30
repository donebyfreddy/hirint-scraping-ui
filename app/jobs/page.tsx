"use client";

import React, { useState } from "react";
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Search,
  Clock,
  Zap,
  Globe,
  Terminal,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber } from "@/lib/utils";
import { activeScrapeJobs, type DetailedScrapeJob } from "@/data/mock-data";

export default function JobsPage() {
  const { setSelectedJob, openPortalById, showToast } = useScraping();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredJobs = activeScrapeJobs.filter((job) => {
    if (statusFilter !== "ALL" && job.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        job.id.toLowerCase().includes(q) ||
        job.portalName.toLowerCase().includes(q) ||
        job.portalId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const runningCount = activeScrapeJobs.filter((j) => j.status === "RUNNING").length;
  const completedCount = activeScrapeJobs.filter((j) => j.status === "COMPLETED").length;
  const warningsCount = activeScrapeJobs.filter((j) => j.status === "WARNINGS").length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Jobs & Workers de Scraping
            </h1>
            <span className="rounded-md bg-info/10 px-2 py-0.5 font-mono text-[11px] font-bold text-info">
              {runningCount} en ejecución
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Monitoreo en vivo de tareas de extracción, balanceo de workers, logs estructurados y gestión de latencias.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Lanzando lote de extracción programado...", "info")}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99]"
          >
            <Play size={14} /> Lanzar Nuevo Job
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Workers Activos</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-info">{runningCount}</div>
          <span className="text-[11.5px] text-faint">Capacidad: 12 workers max</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Lotes Completados Hoy</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">{completedCount}</div>
          <span className="text-[11.5px] text-faint">100% registros persistidos</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Avisos / Degradados</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-warning">{warningsCount}</div>
          <span className="text-[11.5px] text-faint">Sin fallos fatales</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Velocidad Agregada</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-foreground">1.840 /min</div>
          <span className="text-[11.5px] text-faint">Rendimiento en tiempo real</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar por ID de job, portal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-[11.5px] font-medium">
          {[
            { id: "ALL", label: `Todos (${activeScrapeJobs.length})` },
            { id: "RUNNING", label: `En Ejecución (${runningCount})` },
            { id: "COMPLETED", label: `Completados (${completedCount})` },
            { id: "WARNINGS", label: `Con Avisos (${warningsCount})` },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                statusFilter === f.id
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-surface-raised text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Cards / Table */}
      <div className="flex flex-col gap-3">
        {filteredJobs.map((job) => {
          const pct = Math.min(100, Math.round((job.processed / Math.max(1, job.totalTarget)) * 100));
          return (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="group cursor-pointer rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-raised hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: Job identity */}
                <div className="flex items-center gap-3">
                  <span className="text-[22px]">{job.countryFlag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-[14.5px]">{job.portalName}</span>
                      <span className="font-mono text-[11px] text-muted">({job.id})</span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10.5px] font-bold ${
                          job.status === "RUNNING"
                            ? "bg-info/15 text-info"
                            : job.status === "COMPLETED"
                              ? "bg-success/15 text-success"
                              : "bg-warning/15 text-warning"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-muted">
                      Estrategia: <span className="font-mono font-semibold text-foreground">{job.scrapingStrategy}</span> · Fase:{" "}
                      <span className="font-semibold text-foreground">{job.currentPhase}</span> · Salida:{" "}
                      <span className="font-mono">{job.proxy.actualExitCountry} ({job.proxy.hostIp})</span>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics */}
                <div className="flex items-center gap-4 text-[12.5px]">
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-muted">Velocidad</span>
                    <div className="font-mono font-bold text-foreground">
                      {job.currentSpeedOffersPerMin > 0 ? `${job.currentSpeedOffersPerMin}/min` : "Finalizado"}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-muted">Tiempo Restante</span>
                    <div className="font-mono font-bold text-foreground">{job.estimatedRemainingTime || "0 min"}</div>
                  </div>
                  <ArrowUpRight size={18} className="text-muted group-hover:text-primary transition-colors" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11.5px] text-muted mb-1">
                  <span>
                    Procesadas: <strong className="font-mono text-foreground">{fmtNumber(job.processed)}</strong> de{" "}
                    <span className="font-mono">{fmtNumber(job.totalTarget)}</span>
                  </span>
                  <span className="font-mono font-bold text-primary">{pct}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-raised border border-border/50">
                  <div
                    className={`h-full transition-all duration-300 ${
                      job.status === "COMPLETED" ? "bg-success" : "bg-primary"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Breakdown Counters */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[11.5px] border-t border-border/40 pt-2.5">
                <span className="text-success font-semibold">+{fmtNumber(job.insertedNew)} nuevas</span>
                <span className="text-info font-semibold">{fmtNumber(job.updatedExisting)} actualizadas</span>
                <span className="text-muted font-semibold">{fmtNumber(job.unchanged)} sin cambios</span>
                {job.failedOffers > 0 && (
                  <span className="text-danger font-semibold">{job.failedOffers} descartadas</span>
                )}
                <span className="ml-auto text-[11px] text-faint font-mono">Tiempo transcurrido: {job.elapsedTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
