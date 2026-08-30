"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Activity,
  ShieldAlert,
  ArrowUpRight,
  Play,
  RotateCw,
  Clock,
  Zap,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  Sliders,
  Radio,
  FileCode2,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge, PortalStatusBadge, SeverityBadge, CatalogueStatusBadge, RepairabilityBadge } from "@/components/StatusBadge";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import {
  portals,
  activeScrapeJobs,
  findingsList,
  globalOverviewStats,
  type Portal,
  type DetailedScrapeJob,
  type FindingDetail,
} from "@/data/mock-data";

export default function GlobalOverviewPage() {
  const {
    setSelectedPortal,
    setSelectedJob,
    setSelectedFinding,
    setSelectedCensusPortalId,
    startReanalysis,
    showToast,
  } = useScraping();

  const [portalFilter, setPortalFilter] = useState<string>("ALL");

  const runningJobs = activeScrapeJobs.filter((j) => j.status === "RUNNING");
  const priorityFindings = findingsList.slice(0, 4);

  const filteredPortals = portals.filter((p) => {
    if (portalFilter === "RUNNING") return p.status === "running";
    if (portalFilter === "ATTENTION") return p.status === "warning" || p.status === "blocked" || p.status === "failed";
    if (portalFilter === "HEALTHY") return p.status === "healthy";
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Operational Overview Hero Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[26px]">
              Panel Operativo de Scraping
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              18 Portales Activos
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Monitoreo en tiempo real de ingesta, censo de identificadores nativos, rendimiento de red y calidad de datos.
          </p>
        </div>

        {/* Global Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Lanzando lote de actualización incremental para todas las fuentes...", "info")}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99]"
          >
            <Play size={14} />
            Lanzar Scraping Global
          </button>
          <Link
            href="/data-quality"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-[12.5px] font-bold text-foreground hover:bg-surface-raised transition-colors"
          >
            <ShieldAlert size={14} className="text-warning" />
            Control Diario
          </Link>
        </div>
      </div>

      {/* 2. Key Operational Metrics Grid (All Clickable for Drilldowns) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <MetricCard
          label="Ofertas en Base de Datos"
          value={fmtNumber(globalOverviewStats.totalOffersInDb)}
          sub="+14.890 hoy"
          accent="var(--foreground)"
          trend={{ value: "+1.2%", isPositive: true }}
          clickableHint="Ver ofertas"
          onClick={() => {
            window.location.href = "/offers";
          }}
        />

        <MetricCard
          label="Trabajos en Ejecución"
          value={globalOverviewStats.activeWorkersCount}
          sub={`${globalOverviewStats.currentThroughputPerMin} ofertas/min`}
          tone="info"
          clickableHint="Ver workers"
          onClick={() => {
            if (runningJobs.length > 0) setSelectedJob(runningJobs[0]);
            else window.location.href = "/jobs";
          }}
        />

        <MetricCard
          label="Cobertura Media de Censo"
          value={fmtPct(globalOverviewStats.averageCoveragePct)}
          sub="Reconciliación de IDs"
          tone="success"
          clickableHint="Ver censo"
          onClick={() => {
            window.location.href = "/coverage";
          }}
        />

        <MetricCard
          label="Incidencias Calidad"
          value={globalOverviewStats.criticalIncidentsCount}
          sub="Requieren acción"
          tone="danger"
          clickableHint="Ver incidencias"
          onClick={() => {
            if (priorityFindings.length > 0) setSelectedFinding(priorityFindings[0]);
            else window.location.href = "/data-quality";
          }}
        />

        <MetricCard
          label="Latencia Media HTTP"
          value={`${globalOverviewStats.avgHttpLatencyMs} ms`}
          sub="Egress Webshare"
          tone="neutral"
          clickableHint="Ver proxies"
          onClick={() => {
            window.location.href = "/performance";
          }}
        />

        <MetricCard
          label="Tasa Éxito Scraping"
          value={fmtPct(globalOverviewStats.scrapingSuccessRatePct)}
          sub="0 bloqueos WAF críticos"
          tone="accent"
          clickableHint="Ver estado"
          onClick={() => {
            window.location.href = "/scraping";
          }}
        />
      </div>

      {/* 3. Live Active Scrape Jobs Ticker */}
      {runningJobs.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-info" />
              </span>
              <h2 className="text-[14px] font-bold text-foreground">
                Workers en Ejecución Activa ({runningJobs.length})
              </h2>
            </div>
            <Link
              href="/jobs"
              className="flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
            >
              Ver todos los jobs ({activeScrapeJobs.length}) <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            {runningJobs.map((job) => {
              const pct = Math.min(100, Math.round((job.processed / Math.max(1, job.totalTarget)) * 100));
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="group cursor-pointer rounded-xl border border-border bg-surface-raised p-3.5 transition-all hover:border-primary/50 hover:bg-surface focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px]">{job.portalFlag}</span>
                      <span className="font-bold text-foreground text-[13.5px]">{job.portalName}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-primary">{pct}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted">
                    <span>
                      <strong className="text-foreground">{fmtNumber(job.processed)}</strong> / {fmtNumber(job.totalTarget)}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-foreground">
                      <Zap size={11} className="text-primary" /> {job.currentSpeedOffersPerMin}/min
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10.5px] text-faint">
                    <span>ETA: {job.etaRemaining}</span>
                    <span className="group-hover:text-primary font-medium">Abrir worker →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Two Columns: Priority Quality Findings & Source Quick Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Priority Findings & Actionable Remediation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-warning" />
              <h2 className="text-[14px] font-bold text-foreground">
                Anomalías & Incidencias Detectadas
              </h2>
            </div>
            <Link
              href="/data-quality"
              className="text-[12px] font-semibold text-primary hover:underline"
            >
              Ver todas ({findingsList.length}) →
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {priorityFindings.map((finding) => (
              <div
                key={finding.id}
                onClick={() => setSelectedFinding(finding)}
                className="group cursor-pointer rounded-xl border border-border bg-surface p-3.5 transition-all hover:border-warning/50 hover:bg-surface-raised"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[13px] text-foreground group-hover:text-primary">
                        {finding.portalName}
                      </span>
                      <SeverityBadge severity={finding.severity} />
                    </div>
                    <p className="mt-1 line-clamp-1 text-[12px] font-medium text-foreground">
                      {finding.title}
                    </p>
                  </div>
                  <ArrowUpRight size={15} className="text-faint group-hover:text-primary flex-none" />
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2 text-[11.5px]">
                  <span className="text-muted">
                    Afectadas: <strong className="font-mono text-foreground">{fmtNumber(finding.affectedCount)}</strong> ({finding.affectedPercent}%)
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startReanalysis(finding);
                    }}
                    className="flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground text-[11px] transition-colors"
                  >
                    <RotateCw size={11} /> Reanalizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: High-Density Sources Overview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-primary" />
              <h2 className="text-[14px] font-bold text-foreground">
                Inventario de Fuentes & Estado
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-[11.5px] font-semibold">
              {[
                { id: "ALL", label: "Todas (18)" },
                { id: "RUNNING", label: "En Curso" },
                { id: "ATTENTION", label: "Con Avisos" },
                { id: "HEALTHY", label: "Nominales" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPortalFilter(f.id)}
                  className={`rounded-lg px-2.5 py-1 transition-colors ${
                    portalFilter === f.id
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-muted hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sources Table */}
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
                <tr>
                  <th className="px-3.5 py-2.5">Fuente</th>
                  <th className="px-3.5 py-2.5">Estado</th>
                  <th className="px-3.5 py-2.5 text-right">Ofertas en BD</th>
                  <th className="px-3.5 py-2.5 text-right">Cobertura</th>
                  <th className="px-3.5 py-2.5 text-right">Velocidad</th>
                  <th className="px-3.5 py-2.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPortals.slice(0, 8).map((portal) => (
                  <tr
                    key={portal.id}
                    onClick={() => setSelectedPortal(portal)}
                    className="cursor-pointer hover:bg-surface-raised/60 transition-colors"
                  >
                    <td className="px-3.5 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px]">{portal.countryFlag}</span>
                        <div>
                          <div className="font-bold text-foreground">{portal.name}</div>
                          <div className="text-[10.5px] text-muted">{portal.country} · {portal.scrapingStrategy}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <PortalStatusBadge status={portal.status} />
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono font-bold text-foreground">
                      {fmtNumber(portal.offers)}
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono font-semibold text-primary">
                      {fmtPct(portal.coverage)}
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono text-muted">
                      {portal.throughput > 0 ? `${portal.throughput}/min` : "—"}
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCensusPortalId(portal.id);
                        }}
                        className="rounded bg-surface-raised px-2 py-1 text-[11px] font-semibold text-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Censo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <Link
              href="/scraping"
              className="flex items-center gap-1 text-[12.5px] font-bold text-primary hover:underline"
            >
              Explorar las 18 fuentes y configuraciones →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
