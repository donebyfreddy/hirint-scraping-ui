import type { Finding } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";
import { SeverityChip } from "@/components/StatusBadge";

const BAR_COLOR: Record<Finding["severity"], string> = {
  Crítico: "var(--danger)",
  Alto: "var(--warning)",
  Medio: "var(--info)",
  Info: "var(--faint)",
};

export function FindingCard({ finding, onClick }: { finding: Finding; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex w-full gap-3 overflow-hidden rounded-[12px] border border-border bg-surface p-4 text-left transition hover:border-border-strong"
    >
      <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: BAR_COLOR[finding.severity] }} />
      <div className="mt-0.5">
        <SeverityChip severity={finding.severity} />
      </div>
      <div className="min-w-0">
        <h4 className="text-[13.5px] font-extrabold text-foreground">{finding.title}</h4>
        <p className="mt-1 text-[12px] font-medium leading-relaxed text-muted">
          {finding.metric} · {fmtNumber(finding.affectedOffers)} ofertas afectadas
        </p>
        <span className="mt-1.5 inline-block text-[12px] font-bold text-primary">Ver detalle →</span>
      </div>
    </button>
  );
}
