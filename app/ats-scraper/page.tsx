"use client";

import { useState } from "react";
import { RefreshCw, Settings2 } from "lucide-react";
import { PageHeader, HeaderButton } from "@/components/PageHeader";
import { TabNav } from "@/components/TabNav";
import { MetricCard } from "@/components/MetricCard";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { DetailDrawer } from "@/components/DetailDrawer";
import { atsProviders, atsResults, atsDailyTrend, type AtsResult } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

const STATUS_TONE: Record<AtsResult["status"], "success" | "warning" | "info"> = {
  new: "info",
  existing: "success",
  "needs-review": "warning",
};
const STATUS_LABEL: Record<AtsResult["status"], string> = {
  new: "Nuevo",
  existing: "Existente",
  "needs-review": "Revisar",
};

export default function AtsScraperPage() {
  const [tab, setTab] = useState("dashboard");
  const [result, setResult] = useState<AtsResult | null>(null);

  const uniqueCompanies = new Set(atsResults.map((r) => r.company)).size;
  const totalFindings = atsProviders.reduce((s, p) => s + p.count, 0);

  const columns: Column<AtsResult>[] = [
    { key: "company", header: "Empresa", render: (r) => <span className="font-bold text-foreground">{r.company}</span> },
    { key: "domain", header: "Dominio", render: (r) => <span className="font-mono text-muted">{r.domain}</span> },
    { key: "provider", header: "Provider", render: (r) => r.provider },
    { key: "careersUrl", header: "Careers URL", render: (r) => <span className="font-mono text-muted">{r.careersUrl}</span> },
    { key: "discoveredAt", header: "Descubierto", render: (r) => r.discoveredAt },
    { key: "status", header: "Estado", render: (r) => <StatusBadge tone={STATUS_TONE[r.status]} variant="classic">{STATUS_LABEL[r.status]}</StatusBadge> },
  ];

  const maxTrend = Math.max(...atsDailyTrend);

  return (
    <div>
      <PageHeader
        title="ATS Scraper"
        subtitle="Qué se ha encontrado, qué es nuevo y cómo evoluciona por ejecución"
        variant="classic"
        actions={
          <>
            <HeaderButton icon={<RefreshCw size={15} />}>Actualizar</HeaderButton>
            <HeaderButton variant="primary" icon={<Settings2 size={15} />} onClick={() => setTab("config")}>
              Configuración y ejecución
            </HeaderButton>
          </>
        }
      />

      <div className="mb-4">
        <TabNav
          tabs={[
            { value: "dashboard", label: "Dashboard de resultados" },
            { value: "config", label: "Configuración" },
          ]}
          active={tab}
          onChange={setTab}
          variant="classic"
        />
      </div>

      {tab === "dashboard" ? (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MetricCard variant="classic" label="Total hallazgos" value={fmtNumber(totalFindings)} />
            <MetricCard variant="classic" label="Empresas únicas" value={String(uniqueCompanies)} />
            <MetricCard variant="classic" label="URLs de empleo" value={fmtNumber(totalFindings)} sub="100% del total" />
            <MetricCard variant="classic" label="Providers detectados" value="7/7" accent="var(--success)" />
            <MetricCard variant="classic" label="Necesitan revisión" value={String(atsResults.filter((r) => r.status === "needs-review").length)} accent="var(--warning)" />
            <MetricCard variant="classic" label="Nuevos (última ejec.)" value={String(atsResults.filter((r) => r.status === "new").length)} accent="var(--info)" />
          </div>

          <div className="mb-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
              <h2 className="mb-4 text-sm font-semibold text-foreground">Hallazgos por provider</h2>
              <div className="flex flex-col gap-2">
                {atsProviders.map((p) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: p.color }} />
                    <span className="w-24 flex-none text-[12.5px] font-semibold text-foreground">{p.name}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-raised">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                    <span className="w-10 flex-none text-right font-mono text-[11.5px] tabular-nums text-faint">{p.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
              <h2 className="mb-4 text-sm font-semibold text-foreground">Evolución diaria · últimos 30 días</h2>
              <svg viewBox={`0 0 ${atsDailyTrend.length * 12} 60`} className="h-32 w-full" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  points={atsDailyTrend.map((v, i) => `${i * 12},${60 - (v / maxTrend) * 55}`).join(" ")}
                />
              </svg>
              <div className="mt-2 flex items-center gap-1.5">
                <StatusBadge tone="accent" variant="classic">
                  Hallazgos por día
                </StatusBadge>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Resultados recientes</h2>
            <DataTable columns={columns} rows={atsResults} variant="classic" onRowClick={setResult} />
          </div>
        </>
      ) : (
        <div className="max-w-xl rounded-xl bg-surface p-4 ring-1 ring-border">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Configuración y ejecución</h2>
          <ConfigField label="Providers a rastrear" value="Teamtailor, Beetween, Talentclue, Bizneo, Viterbit, Velora HR, Workday" />
          <ConfigField label="Frecuencia" value="Diario · 07:00" />
          <ConfigField label="Fuente de dominios" value="Empresas detectadas en Scraping + lista manual" />
          <button type="button" className="mt-2 w-full rounded-lg bg-primary py-2.5 text-[13.5px] font-bold text-primary-foreground">
            Ejecutar ATS Discovery ahora
          </button>
        </div>
      )}

      <DetailDrawer open={!!result} onClose={() => setResult(null)} title={result?.company ?? ""} subtitle={result?.domain} width={460}>
        {result && (
          <div className="flex flex-col gap-3.5 text-[13px]">
            <Row label="Provider ATS" value={result.provider} />
            <Row label="Careers URL" value={result.careersUrl} mono />
            <Row label="Descubierto" value={result.discoveredAt} />
            <Row label="Estado" value={STATUS_LABEL[result.status]} />
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}

function ConfigField({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-widest text-muted">{label}</label>
      <div className="rounded-lg bg-surface-raised px-3 py-2 text-[13px] text-foreground">{value}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10.5px] font-bold uppercase tracking-widest text-faint">{label}</div>
      <div className={mono ? "font-mono text-foreground" : "font-bold text-foreground"}>{value}</div>
    </div>
  );
}
