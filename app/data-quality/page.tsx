"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader, HeaderButton } from "@/components/PageHeader";
import { TabNav } from "@/components/TabNav";
import { DetailDrawer } from "@/components/DetailDrawer";
import { StatusBadge, SeverityChip } from "@/components/StatusBadge";
import { CoverageBar } from "@/components/CoverageBar";
import { ResumenTab } from "@/components/dq/ResumenTab";
import { CoverageTab } from "@/components/dq/CoverageTab";
import { DailyControlTab } from "@/components/dq/DailyControlTab";
import { InsertedTab } from "@/components/dq/InsertedTab";
import { AnomaliesTab } from "@/components/dq/AnomaliesTab";
import { SchemaTab } from "@/components/dq/SchemaTab";
import { PerformanceTab } from "@/components/dq/PerformanceTab";
import { dataQualityKpis, fieldCoverageByPortal, type Finding, type Portal } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

const TABS = [
  { value: "resumen", label: "Resumen" },
  { value: "coverage", label: "Cobertura de portales" },
  { value: "daily", label: "Control diario" },
  { value: "inserted", label: "Datos insertados" },
  { value: "anomalies", label: "Anomalías" },
  { value: "schema", label: "Esquema de datos" },
  { value: "performance", label: "Rendimiento" },
];

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

export default function DataQualityPage() {
  const [tab, setTab] = useState("resumen");
  const [finding, setFinding] = useState<Finding | null>(null);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [reanalyzing, setReanalyzing] = useState(false);
  const [reanalyzed, setReanalyzed] = useState(false);

  function reanalyze() {
    setReanalyzing(true);
    setReanalyzed(false);
    window.setTimeout(() => {
      setReanalyzing(false);
      setReanalyzed(true);
    }, 1600);
  }

  return (
    <div>
      <PageHeader
        title="Calidad de datos"
        subtitle="Auditoría determinista del dataset — qué portal degrada la calidad y por qué"
        actions={
          <>
            <StatusBadge tone="neutral">Calculado {dataQualityKpis.calculatedAt}</StatusBadge>
            <HeaderButton variant="primary">Analizar ahora</HeaderButton>
          </>
        }
      />

      <div className="mb-5">
        <TabNav tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "resumen" && (
        <ResumenTab
          onOpenFinding={(f) => setFinding(f)}
          onOpenPortal={(p) => setPortal(p)}
        />
      )}
      {tab === "coverage" && <CoverageTab />}
      {tab === "daily" && <DailyControlTab />}
      {tab === "inserted" && <InsertedTab />}
      {tab === "anomalies" && <AnomaliesTab />}
      {tab === "schema" && <SchemaTab />}
      {tab === "performance" && <PerformanceTab />}

      <DetailDrawer
        open={!!finding}
        onClose={() => {
          setFinding(null);
          setReanalyzed(false);
        }}
        title={finding?.title ?? ""}
        subtitle={finding?.portal}
        width={520}
      >
        {finding && (
          <div className="flex flex-col gap-4">
            <SeverityChip severity={finding.severity} />
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-faint">Métrica afectada</div>
              <div className="text-[13.5px] font-bold text-foreground">{finding.metric}</div>
            </div>
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-faint">Ofertas afectadas</div>
              <div className="font-mono text-[22px] font-extrabold tabular-nums text-foreground">{fmtNumber(finding.affectedOffers)}</div>
            </div>
            <div>
              <div className="mb-1 text-[10.5px] font-bold uppercase tracking-widest text-faint">Explicación</div>
              <p className="text-[13px] leading-relaxed text-muted">{finding.explanation}</p>
            </div>
            {finding.repairable ? (
              <button
                type="button"
                onClick={reanalyze}
                disabled={reanalyzing}
                className="flex items-center justify-center gap-2 rounded-control bg-primary py-2.5 text-[13.5px] font-bold text-primary-foreground disabled:opacity-70"
              >
                <Sparkles size={15} />
                {reanalyzing ? "Reanalizando…" : "Reanalizar"}
              </button>
            ) : (
              <div className="rounded-control bg-surface-raised px-3.5 py-3 text-[12.5px] font-semibold text-faint">
                No reparable automáticamente: el dato no existe de forma fiable en la fuente.
              </div>
            )}
            {reanalyzed && (
              <div className="rounded-control px-3.5 py-3 text-[12.5px] font-bold" style={{ background: "var(--success-soft)", color: "var(--success)" }}>
                Reanálisis completado (simulado) — el hallazgo se recalculará en el próximo control diario.
              </div>
            )}
          </div>
        )}
      </DetailDrawer>

      <DetailDrawer
        open={!!portal}
        onClose={() => setPortal(null)}
        title={portal?.name ?? ""}
        subtitle={portal ? `${fmtNumber(portal.offers)} ofertas · ${portal.country}` : undefined}
        width={480}
      >
        {portal && (
          <div className="flex flex-col gap-3.5">
            {FIELD_LABELS.map(({ key, label }) => (
              <CoverageBar key={key} label={label} pct={fieldCoverageByPortal[portal.id]?.[key] ?? 0} />
            ))}
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
