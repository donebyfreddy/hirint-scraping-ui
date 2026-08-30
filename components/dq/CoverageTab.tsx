"use client";

import { useState } from "react";
import { CoverageBar } from "@/components/CoverageBar";
import { StatusBadge } from "@/components/StatusBadge";
import { portals, fieldCoverageByPortal, jobAndTalentCensus, censusTabs, type Portal } from "@/data/mock-data";
import { fmtNumber, fmtPct } from "@/lib/utils";

const FIELD_LABELS: Array<{ key: keyof (typeof fieldCoverageByPortal)["infojobs"]; label: string }> = [
  { key: "sourceJobId", label: "source_job_id" },
  { key: "description", label: "description" },
  { key: "location", label: "location" },
  { key: "company", label: "company" },
  { key: "publishedAt", label: "published_at" },
  { key: "language", label: "language" },
  { key: "workMode", label: "work_mode" },
  { key: "salary", label: "salary" },
  { key: "url", label: "url" },
];

export function CoverageTab() {
  const [portalId, setPortalId] = useState("infojobs");
  const [censusTab, setCensusTab] = useState("match");
  const portal = portals.find((p) => p.id === portalId)!;
  const coverage = fieldCoverageByPortal[portalId];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {portals.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPortalId(p.id)}
            className={`rounded-pill border px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
              portalId === p.id ? "border-primary-ring bg-primary-soft text-primary" : "border-border bg-surface text-foreground hover:border-primary-ring"
            }`}
          >
            {p.countryFlag} {p.name}
          </button>
        ))}
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
          <div className="mb-4 flex items-center gap-2.5">
            <div>
              <h2 className="text-[15px] font-extrabold text-foreground">{portal.name} · Cobertura de campos</h2>
              <span className="text-[12px] font-semibold text-faint">{fmtNumber(portal.offers)} ofertas capturadas</span>
            </div>
            <span className="ml-auto">
              <StatusBadge tone={portal.status === "healthy" ? "success" : portal.status === "warning" ? "warning" : "danger"}>
                {portal.status === "healthy" ? "Al día" : portal.status === "warning" ? "Con avisos" : "Bloqueado"}
              </StatusBadge>
            </span>
          </div>
          <div className="flex flex-col gap-3.5">
            {FIELD_LABELS.map(({ key, label }) => (
              <CoverageBar key={key} label={label} pct={coverage[key]} />
            ))}
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
          <div className="mb-4">
            <h2 className="text-[15px] font-extrabold text-foreground">Censo de portal</h2>
            <span className="text-[12px] font-semibold text-faint">Job&amp;Talent · España — comparación catálogo vivo vs. base de datos</span>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {jobAndTalentCensus.map((row) => (
              <div key={row.label} className="rounded-[10px] border border-border bg-surface-raised px-3 py-2.5">
                <div className="text-[10px] font-bold uppercase tracking-[.05em] text-faint">{row.label}</div>
                <div className="mt-1 font-mono text-[16px] font-extrabold tabular-nums" style={{ color: `var(--${row.tone === "neutral" ? "foreground" : row.tone === "info" ? "info" : row.tone})` }}>
                  {row.label === "Cobertura" ? fmtPct(row.value) : fmtNumber(row.value)}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-3 flex flex-wrap gap-1.5 border-b border-border pb-3">
            {censusTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setCensusTab(t.id)}
                className={`rounded-[8px] px-2.5 py-1.5 text-[12px] font-bold transition-colors ${
                  censusTab === t.id ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-raised"
                }`}
              >
                {t.label} <span className="text-faint">({t.count})</span>
              </button>
            ))}
          </div>
          <p className="text-[12px] font-semibold text-muted">
            {censusTab === "match" && "136 ofertas activas tanto en el portal como en Hirint. Sin acción necesaria."}
            {censusTab === "missing" && "20 ofertas visibles en el portal que aún no están en Hirint — candidatas para el próximo run."}
            {censusTab === "gone" && "50 ofertas que Hirint tiene guardadas pero ya no están publicadas en el portal — se conservan como histórico, no se eliminan."}
            {censusTab === "new" && "14 ofertas nuevas detectadas desde el último censo."}
            {censusTab === "churned" && "8 bajas confirmadas — el portal las retiró y el censo lo verificó por ID, no solo por conteo."}
            {censusTab === "duplicates" && "Sin duplicados detectados en este censo."}
            {censusTab === "no-id" && "2 ofertas sin identificador nativo extraíble; se excluyen de la reconciliación por ID."}
          </p>
        </div>
      </div>
    </div>
  );
}
