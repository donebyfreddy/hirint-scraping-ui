"use client";

import { useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";
import type { Portal } from "@/data/mock-data";
import { fmtNumber, fmtPct } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

const STATUS_LABEL: Record<Portal["status"], string> = {
  healthy: "Al día",
  warning: "Con avisos",
  critical: "Bloqueado",
};
const STATUS_TONE: Record<Portal["status"], "success" | "warning" | "danger"> = {
  healthy: "success",
  warning: "warning",
  critical: "danger",
};

/** Classic-density portal/platform card (gradient icon avatar), Suite color tokens. */
export function PortalCard({
  portal,
  selected,
  onSelect,
}: {
  portal: Portal;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const [proxyOn, setProxyOn] = useState(portal.usesProxy);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full flex-col gap-3 rounded-xl border p-4 text-left ring-1 transition-colors ${
        selected ? "border-primary ring-primary/40 bg-primary-soft/40" : "border-border ring-border bg-surface hover:border-border-strong"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="grid h-9 w-9 flex-none place-items-center rounded-lg text-[11px] font-extrabold text-white"
          style={{ background: `linear-gradient(145deg, ${portal.color}, ${portal.color}cc)` }}
        >
          {portal.shortCode}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13.5px] font-bold text-foreground">{portal.name}</div>
          <div className="text-[11px] text-faint">
            {portal.countryFlag} {portal.country}
          </div>
        </div>
        <StatusBadge tone={STATUS_TONE[portal.status]} variant="classic">
          {STATUS_LABEL[portal.status]}
        </StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <div className="rounded-lg bg-surface-raised px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-widest text-faint">Ofertas</div>
          <div className="font-mono font-bold tabular-nums text-foreground">{fmtNumber(portal.offers)}</div>
        </div>
        <div className="rounded-lg bg-surface-raised px-2.5 py-2">
          <div className="text-[10px] uppercase tracking-widest text-faint">Cobertura</div>
          <div className="font-mono font-bold tabular-nums text-foreground">{fmtPct(portal.coverage, 0)}</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-faint">
        <span>Última ejecución {portal.lastRun}</span>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            setProxyOn((v) => !v);
          }}
          className="inline-flex items-center gap-1 font-semibold text-muted"
        >
          {proxyOn ? <ToggleRight size={16} className="text-primary" /> : <ToggleLeft size={16} />}
          Proxy
        </span>
      </div>
    </button>
  );
}
