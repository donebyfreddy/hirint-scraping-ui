"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  RotateCw,
  Search,
  Filter,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  TrendingUp,
  FileCode2,
  Sliders,
  Calendar,
} from "lucide-react";
import { SeverityBadge, RepairabilityBadge, StatusBadge } from "@/components/StatusBadge";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import {
  findingsList,
  schemaFieldCatalog,
  fullFieldCoverageByPortal,
  portals,
  type FindingDetail,
  type SchemaFieldDetail,
} from "@/data/mock-data";

export default function DataQualityPage() {
  const { setSelectedFinding, startReanalysis, showToast } = useScraping();
  const [activeTab, setActiveTab] = useState<"findings" | "schema" | "daily">("findings");
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const filteredFindings = findingsList.filter((f) => {
    if (severityFilter !== "ALL" && f.severity !== severityFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.portalName.toLowerCase().includes(q) ||
        f.problemField.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const criticalCount = findingsList.filter((f) => f.severity === "CRITICAL").length;
  const highCount = findingsList.filter((f) => f.severity === "HIGH").length;
  const mediumCount = findingsList.filter((f) => f.severity === "MEDIUM").length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Control de Calidad & Observabilidad de Datos
            </h1>
            <span className="rounded-md bg-warning/10 px-2 py-0.5 font-mono text-[11px] font-bold text-warning">
              {findingsList.length} incidencias activas
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Detección de anomalías de parseo, cobertura del esquema de 24 campos estándar y reanálisis determinista de ofertas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Ejecutando auditoría de calidad sobre las 18 fuentes...", "info")}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99]"
          >
            <RotateCw size={14} /> Ejecutar Auditoría Global
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-danger">Incidencias Críticas</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-danger">{criticalCount}</div>
          <span className="text-[11.5px] text-faint">Bloquean ingesta o campos clave</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-warning">Prioridad Alta</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-warning">{highCount}</div>
          <span className="text-[11.5px] text-faint">Caída de cobertura parcial</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Auto-Reparables</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">
            {findingsList.filter((f) => f.repairability === "RESCRAPE" || f.repairability === "AUTO").length}
          </div>
          <span className="text-[11.5px] text-faint">Reanálisis con 1 clic</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Salud Global del Esquema</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-primary">94.8%</div>
          <span className="text-[11.5px] text-faint">24 campos evaluados</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-[13px] font-semibold">
        {[
          { id: "findings", label: `Bandeja de Incidencias (${findingsList.length})` },
          { id: "schema", label: `Esquema Estándar (24 Campos)` },
          { id: "daily", label: "Control Diario (Hoy vs Ayer)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`border-b-2 px-4 py-2.5 transition-colors ${
              activeTab === t.id
                ? "border-primary font-bold text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Findings Inbox */}
      {activeTab === "findings" && (
        <div className="flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                type="text"
                placeholder="Buscar anomalía, portal, campo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-[11.5px] font-medium">
              {[
                { id: "ALL", label: `Todas (${findingsList.length})` },
                { id: "CRITICAL", label: `Críticas (${criticalCount})` },
                { id: "HIGH", label: `Altas (${highCount})` },
                { id: "MEDIUM", label: `Medias (${mediumCount})` },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSeverityFilter(s.id)}
                  className={`rounded-lg px-2.5 py-1 transition-colors ${
                    severityFilter === s.id
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-surface-raised text-muted hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Findings List */}
          <div className="flex flex-col gap-3">
            {filteredFindings.map((finding) => (
              <div
                key={finding.id}
                onClick={() => setSelectedFinding(finding)}
                className="group cursor-pointer rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:bg-surface-raised hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left: Title & portal */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <SeverityBadge severity={finding.severity} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-[14px] group-hover:text-primary transition-colors">
                          {finding.title}
                        </span>
                        <span className="font-semibold text-[12px] text-muted">({finding.portalName})</span>
                      </div>
                      <p className="mt-1 text-[12.5px] text-muted line-clamp-1">{finding.evidence}</p>
                    </div>
                  </div>

                  {/* Right: Metrics & Actions */}
                  <div className="flex items-center gap-4 text-[12.5px]">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-muted">Afectadas</span>
                      <div className="font-mono font-bold text-foreground">
                        {fmtNumber(finding.affectedCount)}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-muted">Métrica / Umbral</span>
                      <div className="font-mono font-bold text-danger">
                        {finding.currentMetricValue} <span className="text-muted text-[11px]">vs {finding.expectedThreshold}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startReanalysis(finding);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <RotateCw size={13} /> Reanalizar
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5 text-[11.5px] text-muted">
                  <div className="flex items-center gap-3">
                    <span>Campo: <strong className="font-mono text-foreground">{finding.problemField}</strong></span>
                    <span>·</span>
                    <span>Detectado: <strong>{finding.firstDetected}</strong></span>
                  </div>
                  <RepairabilityBadge type={finding.repairability} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Schema 24 Fields */}
      {activeTab === "schema" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface p-4 text-[13px] text-muted">
            El modelo unificado de Hirint define <strong className="text-foreground">24 campos normalizados</strong>. A
            continuación se muestra el promedio de cobertura global y su estado en el catálogo de ofertas activas:
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
                <tr>
                  <th className="px-4 py-3">Nombre del Campo</th>
                  <th className="px-4 py-3">Grupo Semántico</th>
                  <th className="px-4 py-3">Importancia</th>
                  <th className="px-4 py-3">Tipo de Dato</th>
                  <th className="px-4 py-3 text-right">Cobertura Global</th>
                  <th className="px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {schemaFieldCatalog.map((field) => (
                  <tr key={field.id} className="hover:bg-surface-raised/60">
                    <td className="px-4 py-2.5 font-mono font-bold text-foreground">{field.id}</td>
                    <td className="px-4 py-2.5 text-muted font-medium">{field.group}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded px-2 py-0.5 text-[10.5px] font-bold ${
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
                    <td className="px-4 py-2.5 font-mono text-[11.5px] text-faint">{field.type}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold">
                      <span
                        className={
                          field.globalCoverage >= 90
                            ? "text-success"
                            : field.globalCoverage >= 70
                              ? "text-foreground"
                              : "text-danger"
                        }
                      >
                        {field.globalCoverage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      {field.globalCoverage >= 90 ? (
                        <span className="text-success font-semibold text-[11.5px]">✓ Nominal</span>
                      ) : field.globalCoverage >= 70 ? (
                        <span className="text-warning font-semibold text-[11.5px]">⚠️ En Observación</span>
                      ) : (
                        <span className="text-danger font-semibold text-[11.5px]">❌ Requiere Parser</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Daily Control */}
      {activeTab === "daily" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Ofertas Nuevas Hoy</span>
              <div className="mt-1 font-mono text-[24px] font-bold text-success">+14.890</div>
              <span className="text-[11.5px] text-faint">Vs 12.450 ayer (+19.5%)</span>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Ofertas Actualizadas</span>
              <div className="mt-1 font-mono text-[24px] font-bold text-info">28.450</div>
              <span className="text-[11.5px] text-faint">Cambios de estado o salario</span>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Bajas Detectadas</span>
              <div className="mt-1 font-mono text-[24px] font-bold text-muted">3.210</div>
              <span className="text-[11.5px] text-faint">Marcadas como caducadas</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-[14px] font-bold text-foreground mb-2">Control Diario de Anomalías</h3>
            <p className="text-[12.5px] text-muted leading-relaxed">
              El motor de observabilidad compara la distribución de campos día a día. Si la proporción de valores nulos
              o vacíos en un campo crítico aumenta más de un 5% respecto a la media de 7 días, se genera automáticamente
              una incidencia en la bandeja de calidad y se notifica al canal de operaciones.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
