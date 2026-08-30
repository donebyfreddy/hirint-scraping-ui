import { MetricCard } from "@/components/MetricCard";
import { CoverageBar } from "@/components/CoverageBar";
import { FindingCard } from "@/components/FindingCard";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { dataQualityKpis, globalCoverage, findings, portals, fieldCoverageByPortal, type Finding, type Portal } from "@/data/mock-data";
import { fmtNumber, fmtPct } from "@/lib/utils";

export function ResumenTab({ onOpenFinding, onOpenPortal }: { onOpenFinding: (f: Finding) => void; onOpenPortal: (p: Portal) => void }) {
  const columns: Column<Portal>[] = [
    { key: "name", header: "Portal", render: (p) => <span className="font-bold text-foreground">{p.name}</span> },
    {
      key: "status",
      header: "Estado",
      render: (p) => (
        <StatusBadge tone={p.status === "healthy" ? "success" : p.status === "warning" ? "warning" : "danger"}>
          {p.status === "healthy" ? "Al día" : p.status === "warning" ? "Con avisos" : "Bloqueado"}
        </StatusBadge>
      ),
    },
    { key: "offers", header: "Ofertas", className: "font-mono tabular-nums", render: (p) => fmtNumber(p.offers) },
    { key: "description", header: "Descripción", className: "font-mono tabular-nums", render: (p) => fmtPct(fieldCoverageByPortal[p.id]?.description ?? 0, 0) },
    { key: "location", header: "Ubicación", className: "font-mono tabular-nums", render: (p) => fmtPct(fieldCoverageByPortal[p.id]?.location ?? 0, 0) },
    { key: "company", header: "Empresa", className: "font-mono tabular-nums", render: (p) => fmtPct(fieldCoverageByPortal[p.id]?.company ?? 0, 0) },
    { key: "publishedAt", header: "Fecha pub.", className: "font-mono tabular-nums", render: (p) => fmtPct(fieldCoverageByPortal[p.id]?.publishedAt ?? 0, 0) },
    { key: "lastRun", header: "Última oferta", render: (p) => p.lastRun },
  ];

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <MetricCard label="Ofertas analizadas" value={fmtNumber(dataQualityKpis.offersAnalyzed)} sub={`en ${dataQualityKpis.totalSources} portales`} />
        <MetricCard label="Ofertas únicas" value={fmtNumber(dataQualityKpis.offersAnalyzed)} sub={`${fmtPct(dataQualityKpis.duplicatePct)} duplicadas`} accent="var(--success)" />
        <MetricCard
          label="Hallazgos abiertos"
          value={String(dataQualityKpis.openFindings)}
          sub={`${dataQualityKpis.criticalFindings} críticos · ${dataQualityKpis.mediumFindings} medios`}
          accent="var(--info)"
        />
        <MetricCard label="Fuentes sin datos" value={String(dataQualityKpis.sourcesWithoutData)} sub={`al día · de ${dataQualityKpis.totalSources} fuentes`} accent="var(--success)" />
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
          <div className="mb-4">
            <h2 className="text-[15px] font-extrabold text-foreground">Cobertura global por campo</h2>
            <span className="text-[12px] font-semibold text-faint">Filas con el campo relleno ÷ {fmtNumber(dataQualityKpis.offersAnalyzed)}</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {globalCoverage.map((c) => (
              <CoverageBar key={c.field} label={c.field} pct={c.pct} detail={c.detail} />
            ))}
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
          <div className="mb-4 flex items-center gap-2.5">
            <div>
              <h2 className="text-[15px] font-extrabold text-foreground">Hallazgos</h2>
              <span className="text-[12px] font-semibold text-faint">Umbrales deterministas — sin IA</span>
            </div>
            <span className="ml-auto">
              <StatusBadge tone="info">{findings.length} abiertos</StatusBadge>
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {findings.map((f) => (
              <FindingCard key={f.id} finding={f} onClick={() => onOpenFinding(f)} />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
        <div className="mb-4 flex items-center gap-2.5">
          <div>
            <h2 className="text-[15px] font-extrabold text-foreground">Calidad por portal</h2>
            <span className="text-[12px] font-semibold text-faint">Cobertura y frescura de cada fuente · {portals.length} portales</span>
          </div>
          <button type="button" className="ml-auto rounded-control border border-border-strong bg-surface px-3 py-1.5 text-xs font-bold text-foreground hover:bg-surface-raised">
            Recalcular campos
          </button>
        </div>
        <DataTable columns={columns} rows={portals} onRowClick={onOpenPortal} />
        <p className="mt-3 text-[11.5px] font-semibold text-faint">
          Sin filas redundantes sobre {fmtNumber(dataQualityKpis.offersAnalyzed)} analizadas. Toda fila borrada se respalda antes en{" "}
          <span className="font-mono">job_offers_deleted_backup</span> — reversible.
        </p>
      </div>
    </div>
  );
}
