"use client";

import React, { useState } from "react";
import {
  Play,
  FlaskConical,
  RefreshCw,
  Layers,
  FileCode2,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { PortalStatusBadge, CatalogueStatusBadge } from "@/components/StatusBadge";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import {
  fullFieldCoverageByPortal,
  schemaFieldCatalog,
  activeScrapeJobs,
  findingsList,
  type Portal,
} from "@/data/mock-data";

interface PortalDetailDrawerProps {
  portal: Portal | null;
  onClose: () => void;
}

export function PortalDetailDrawer({ portal, onClose }: PortalDetailDrawerProps) {
  const { showToast, setSelectedJob, setSelectedCensusPortalId } = useScraping();
  const [tab, setTab] = useState<"overview" | "coverage" | "fields" | "launcher" | "categories" | "jobs">("overview");

  // Scrape launcher states
  const [testCount, setTestCount] = useState(10);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ found: number; ms: number } | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [syncCategories, setSyncCategories] = useState(true);
  const [useProxy, setUseProxy] = useState(portal?.usesProxy ?? true);

  if (!portal) return null;

  const coverageData = fullFieldCoverageByPortal[portal.id] || {};
  const recentJobs = activeScrapeJobs.filter((j) => j.portalId === portal.id);
  const portalFindings = findingsList.filter((f) => f.portalId === portal.id);

  const runTestScrape = () => {
    setIsTesting(true);
    setTestResult(null);
    window.setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        found: Math.max(1, testCount - Math.round(Math.random() * 2)),
        ms: 1200 + Math.round(Math.random() * 2100),
      });
      showToast(`Prueba de ${testCount} ofertas en ${portal.name} finalizada con éxito`, "success");
    }, 1400);
  };

  const handleStartScrape = () => {
    setIsStarting(true);
    window.setTimeout(() => {
      setIsStarting(false);
      showToast(`Scraper lanzado para ${portal.name} · Worker asignado`, "success");
      onClose();
    }, 1200);
  };

  const handleSyncTaxonomy = () => {
    showToast(`Sincronizando ${portal.totalCategories} categorías nativas de ${portal.name}…`, "info");
    window.setTimeout(() => {
      showToast(`✅ Taxonomía de ${portal.name} 100% sincronizada (0 discrepancias)`, "success");
    }, 1500);
  };

  return (
    <DetailDrawer
      open={Boolean(portal)}
      onClose={onClose}
      title={`${portal.countryFlag} ${portal.name}`}
      subtitle={`${portal.country} · ${portal.region} · ${portal.scrapingStrategy}`}
      badge={<PortalStatusBadge status={portal.status} />}
      width={680}
    >
      {/* Subnav tabs */}
      <div className="mb-5 flex border-b border-border text-[13px] font-semibold">
        {[
          { id: "overview", label: "Resumen Operativo" },
          { id: "coverage", label: "Censo & IDs" },
          { id: "fields", label: "Campos & Calidad" },
          { id: "launcher", label: "Lanzador & Config" },
          { id: "categories", label: `Taxonomía (${portal.activeCategories})` },
          { id: "jobs", label: `Jobs (${recentJobs.length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`border-b-2 px-3.5 py-2.5 transition-colors ${
              tab === t.id
                ? "border-primary font-bold text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === "overview" && (
        <div className="flex flex-col gap-5">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Ofertas en BD</span>
              <div className="mt-1 font-mono text-[22px] font-bold text-foreground">{fmtNumber(portal.offers)}</div>
              <span className="text-[11px] text-faint">Catálogo acumulado</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Declaradas Fuente</span>
              <div className="mt-1 font-mono text-[22px] font-bold text-foreground">
                {portal.sourceLiveTotal > 0 ? fmtNumber(portal.sourceLiveTotal) : "Desconocido"}
              </div>
              <span className="text-[11px] text-faint">Censo live de origen</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Cobertura Real</span>
              <div className="mt-1 font-mono text-[22px] font-bold text-primary">{fmtPct(portal.coverage)}</div>
              <span className="text-[11px] text-faint">Reconciliación de IDs</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Velocidad Actual</span>
              <div className="mt-1 font-mono text-[22px] font-bold text-foreground">
                {portal.throughput > 0 ? `${portal.throughput}/min` : "0/min"}
              </div>
              <span className="text-[11px] text-faint">Mediana: {portal.medianThroughput}/min</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Tiempo por Oferta</span>
              <div className="mt-1 font-mono text-[22px] font-bold text-foreground">{portal.avgTimePerOfferMs} ms</div>
              <span className="text-[11px] text-faint">Latencia parsing</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">source_job_id</span>
              <div className="mt-1 font-mono text-[22px] font-bold text-success">
                {fmtPct(portal.sourceJobIdHealth)}
              </div>
              <span className="text-[11px] text-faint">Integridad de ID nativo</span>
            </div>
          </div>

          {/* Catalogue Completeness Card */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[13.5px] font-bold text-foreground">Estado de Completitud de Catálogo</h3>
              <CatalogueStatusBadge status={portal.catalogueStatus} />
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              {portal.catalogueNote || "Catálogo sincronizado según política estándar."}
            </p>
          </div>

          {/* Proxy & Egress Configuration */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-[13.5px] font-bold text-foreground">Egress & Configuración de Red</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-[12.5px]">
              <div>
                <span className="text-faint">Proveedor de salida:</span>
                <div className="font-semibold text-foreground">{portal.proxyProvider}</div>
              </div>
              <div>
                <span className="text-faint">País de salida (Exit Country):</span>
                <div className="font-semibold text-foreground">{portal.proxyExitCountry}</div>
              </div>
              <div>
                <span className="text-faint">IP de salida / Host:</span>
                <div className="font-mono text-foreground">{portal.proxyMaskedIp}</div>
              </div>
              <div>
                <span className="text-faint">Puerto asignado:</span>
                <div className="font-mono text-foreground">{portal.proxyPort}</div>
              </div>
            </div>
          </div>

          {/* Open Findings (if any) */}
          {portalFindings.length > 0 && (
            <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
              <div className="flex items-center gap-2 text-warning">
                <ShieldAlert size={16} />
                <span className="text-[13px] font-bold">Incidencias de Calidad Detectadas ({portalFindings.length})</span>
              </div>
              {portalFindings.map((f) => (
                <div key={f.id} className="mt-2 text-[12.5px]">
                  <div className="font-semibold text-foreground">{f.title}</div>
                  <div className="text-muted">{f.evidence}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Coverage & Native ID Census */}
      {tab === "coverage" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Reconciliación Determinista de IDs</h3>
                <p className="text-[12px] text-muted">
                  Comparación del inventario del portal frente al catálogo activo en base de datos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCensusPortalId(portal.id)}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground hover:bg-primary/90"
              >
                <FileCode2 size={14} />
                Inspeccionar IDs Exactos
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold text-muted uppercase">Portal Ahora</span>
                <div className="font-mono text-[18px] font-bold text-foreground">
                  {portal.sourceLiveTotal > 0 ? fmtNumber(portal.sourceLiveTotal) : "N/D"}
                </div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold text-muted uppercase">Coincidencias</span>
                <div className="font-mono text-[18px] font-bold text-success">
                  {fmtNumber(Math.round(portal.offers * (portal.coverage / 100)))}
                </div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold text-muted uppercase">Faltantes en Hirint</span>
                <div className="font-mono text-[18px] font-bold text-warning">
                  {portal.sourceLiveTotal > portal.offers ? fmtNumber(portal.sourceLiveTotal - portal.offers) : "0"}
                </div>
              </div>
              <div className="rounded-lg bg-surface-raised p-3">
                <span className="text-[10.5px] font-semibold text-muted uppercase">Cobertura</span>
                <div className="font-mono text-[18px] font-bold text-primary">{fmtPct(portal.coverage)}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="text-[13px] font-bold text-foreground">Metodología de Censo</h4>
            <p className="mt-1 text-[12.5px] text-muted">
              {portal.catalogueStatus === "FULL_CATALOG_VERIFIED"
                ? "El censo se obtiene enumerando de forma determinista todos los identificadores nativos del portal mediante paginación completa. Se detectan altas, bajas y cambios de estado con trazabilidad temporal."
                : "El censo se basa en estimación de facetas o catálogos masivos. Las cifras de bajas no son deterministas al 100% debido a límites de paginación de la fuente (Result Cap)."}
            </p>
          </div>
        </div>
      )}

      {/* Tab: Fields Quality */}
      {tab === "fields" && (
        <div className="flex flex-col gap-3">
          <div className="text-[12px] text-muted">
            Cobertura por campo para <span className="font-bold text-foreground">{portal.name}</span> sobre las{" "}
            {fmtNumber(portal.offers)} ofertas activas:
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
                <tr>
                  <th className="px-3.5 py-2.5">Campo</th>
                  <th className="px-3.5 py-2.5">Grupo</th>
                  <th className="px-3.5 py-2.5">Importancia</th>
                  <th className="px-3.5 py-2.5 text-right">Cobertura</th>
                  <th className="px-3.5 py-2.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schemaFieldCatalog.map((field) => {
                  const pct = coverageData[field.id] ?? field.globalCoverage;
                  const isLow = pct < 70 && field.importance === "CRITICAL";
                  return (
                    <tr key={field.id} className="hover:bg-surface-raised/60">
                      <td className="px-3.5 py-2 font-mono font-semibold text-foreground">{field.id}</td>
                      <td className="px-3.5 py-2 text-muted">{field.group}</td>
                      <td className="px-3.5 py-2">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            field.importance === "CRITICAL"
                              ? "bg-danger/15 text-danger"
                              : field.importance === "IMPORTANT"
                                ? "bg-warning/15 text-warning"
                                : "bg-surface-raised text-faint"
                          }`}
                        >
                          {field.importance}
                        </span>
                      </td>
                      <td className="px-3.5 py-2 text-right font-mono font-bold">
                        <span className={isLow ? "text-danger" : pct >= 90 ? "text-success" : "text-foreground"}>
                          {pct.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3.5 py-2">
                        {isLow ? (
                          <span className="font-semibold text-danger">⚠️ Anomalía</span>
                        ) : pct >= 90 ? (
                          <span className="font-semibold text-success">✓ Nominal</span>
                        ) : (
                          <span className="text-muted">Aceptable</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Launcher & Configuration */}
      {tab === "launcher" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-[14px] font-bold text-foreground">Parámetros de Ejecución</h3>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[10.5px] font-semibold uppercase tracking-wider text-muted">
                  País
                </label>
                <div className="rounded-lg border border-border-strong bg-surface-raised px-3 py-2 text-[13px] font-bold text-foreground">
                  {portal.countryFlag} {portal.country}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10.5px] font-semibold uppercase tracking-wider text-muted">
                  Estrategia de Scraping
                </label>
                <div className="rounded-lg border border-border-strong bg-surface-raised px-3 py-2 text-[13px] font-mono text-foreground">
                  {portal.scrapingStrategy}
                </div>
              </div>
            </div>

            {/* Toggle options */}
            <div className="mt-4 flex flex-col gap-2">
              <label className="flex items-center justify-between rounded-lg border border-border bg-surface-raised p-3 text-[13px] cursor-pointer">
                <div>
                  <div className="font-bold text-foreground">Sincronizar taxonomía antes de rastrear</div>
                  <div className="text-[11.5px] text-muted">
                    Valida las {portal.totalCategories} categorías nativas antes de iniciar el lote
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={syncCategories}
                  onChange={(e) => setSyncCategories(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </label>

              <label className="flex items-center justify-between rounded-lg border border-border bg-surface-raised p-3 text-[13px] cursor-pointer">
                <div>
                  <div className="font-bold text-foreground">Usar Proxy Residencial Webshare</div>
                  <div className="text-[11.5px] text-muted">
                    Salida dedicada {portal.proxyExitCountry} ({portal.proxyMaskedIp})
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={useProxy}
                  onChange={(e) => setUseProxy(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary"
                />
              </label>
            </div>

            {/* Test block */}
            <div className="mt-4 border-t border-border pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Modo Prueba (Dry-Run)</span>
              <div className="mt-2 flex items-center gap-2">
                {[5, 10, 25, 50].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setTestCount(n)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-[12px] font-bold transition-colors ${
                      testCount === n
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-surface-raised text-muted hover:text-foreground"
                    }`}
                  >
                    {n} ofertas
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={runTestScrape}
                disabled={isTesting}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface py-2 text-[13px] font-bold text-foreground hover:bg-surface-raised disabled:opacity-60"
              >
                <FlaskConical size={15} />
                {isTesting ? "Probando scraper..." : `Probar muestra de ${testCount} ofertas`}
              </button>

              {testResult && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-success/15 px-3 py-2 text-[12.5px] font-semibold text-success">
                  <CheckCircle2 size={16} />
                  <span>
                    Prueba completada: {testResult.found} ofertas parseadas en {(testResult.ms / 1000).toFixed(1)} s
                  </span>
                </div>
              )}
            </div>

            {/* Launch CTA */}
            <button
              type="button"
              onClick={handleStartScrape}
              disabled={isStarting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[14px] font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
            >
              <Play size={16} />
              {isStarting ? "Iniciando worker..." : `Lanzar Scraping Completo (${portal.name})`}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Categories */}
      {tab === "categories" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div>
              <h3 className="text-[14px] font-bold text-foreground">Taxonomía y Categorías Nativas</h3>
              <p className="text-[12px] text-muted">
                {portal.activeCategories} de {portal.totalCategories} categorías nativas activas · Último sync:{" "}
                {portal.categoriesLastSync}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSyncTaxonomy}
              className="flex items-center gap-1.5 rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-[12px] font-bold text-foreground hover:bg-surface-raised"
            >
              <RefreshCw size={13} /> Sincronizar Ahora
            </button>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="text-[12.5px] font-bold text-foreground uppercase tracking-wider text-faint mb-3">
              Mapeo de Categorías
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-[12.5px]">
              {[
                "Tecnología e Informática",
                "Comercial y Ventas",
                "Logística y Almacén",
                "Administración y Finanzas",
                "Sanidad y Farmacia",
                "Ingeniería Industrial",
                "Hostelería y Turismo",
                "Atención al Cliente",
              ].map((c) => (
                <div key={c} className="flex items-center justify-between rounded-lg bg-surface-raised px-3 py-2">
                  <span className="font-semibold text-foreground">{c}</span>
                  <span className="font-mono text-[11px] text-success">✓ 100% sync</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Jobs */}
      {tab === "jobs" && (
        <div className="flex flex-col gap-3">
          {recentJobs.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center text-muted">
              No hay ejecuciones recientes para este portal.
            </div>
          ) : (
            recentJobs.map((j) => (
              <div
                key={j.id}
                onClick={() => setSelectedJob(j)}
                className="cursor-pointer rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary/40 hover:bg-surface-raised"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[13px] font-bold text-foreground">{j.id}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10.5px] font-bold ${
                        j.status === "RUNNING"
                          ? "bg-info/15 text-info"
                          : j.status === "COMPLETED"
                            ? "bg-success/15 text-success"
                            : j.status === "WARNINGS"
                              ? "bg-warning/15 text-warning"
                              : "bg-danger/15 text-danger"
                      }`}
                    >
                      {j.status}
                    </span>
                  </div>
                  <ArrowUpRight size={15} className="text-muted" />
                </div>

                <div className="mt-2 grid grid-cols-4 gap-2 font-mono text-[11.5px] text-muted">
                  <div>Procesadas: <span className="font-bold text-foreground">{fmtNumber(j.processed)}</span></div>
                  <div>Nuevas: <span className="font-bold text-success">{fmtNumber(j.insertedNew)}</span></div>
                  <div>Actualizadas: <span className="font-bold text-info">{fmtNumber(j.updatedExisting)}</span></div>
                  <div>Velocidad: <span className="font-bold text-foreground">{j.currentSpeedOffersPerMin}/min</span></div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </DetailDrawer>
  );
}
