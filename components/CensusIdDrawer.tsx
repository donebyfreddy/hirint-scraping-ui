"use client";

import React, { useState } from "react";
import {
  FileCheck,
  AlertCircle,
  Search,
  ExternalLink,
  Download,
  Filter,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { useScraping } from "@/components/ScrapingContext";
import { portals, sampleCensusItems, type CensusItem } from "@/data/mock-data";
import { fmtNumber, fmtPct } from "@/lib/utils";

interface CensusIdDrawerProps {
  portalId: string | null;
  onClose: () => void;
}

export function CensusIdDrawer({ portalId, onClose }: CensusIdDrawerProps) {
  const { showToast, setSelectedOffer } = useScraping();
  const [activeTab, setActiveTab] = useState<"ALL" | "MATCH" | "MISSING_IN_HIRINT" | "NO_LONGER_IN_PORTAL" | "DUPLICATE">("ALL");
  const [search, setSearch] = useState("");

  const portal = portals.find((p) => p.id === portalId);
  if (!portal) return null;

  // Filter sample census items for this portal or general items
  const items = sampleCensusItems.filter((item) => {
    if (activeTab !== "ALL" && item.status !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.sourceJobId.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    ALL: sampleCensusItems.length,
    MATCH: sampleCensusItems.filter((i) => i.status === "MATCH").length,
    MISSING_IN_HIRINT: sampleCensusItems.filter((i) => i.status === "MISSING_IN_HIRINT").length,
    NO_LONGER_IN_PORTAL: sampleCensusItems.filter((i) => i.status === "NO_LONGER_IN_PORTAL").length,
    DUPLICATE: sampleCensusItems.filter((i) => i.status === "DUPLICATE").length,
  };

  return (
    <DetailDrawer
      open={Boolean(portalId)}
      onClose={onClose}
      title={`Censo & Reconciliación de IDs: ${portal.name}`}
      subtitle={`Cobertura: ${fmtPct(portal.coverage)} · ${fmtNumber(portal.offers)} en BD vs ${portal.sourceLiveTotal > 0 ? fmtNumber(portal.sourceLiveTotal) : "N/D"} en fuente`}
      badge={<span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">Censo Nativo</span>}
      width={780}
      actions={
        <button
          type="button"
          onClick={() => showToast("Exportando lista de IDs en formato CSV…", "success")}
          className="flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-[11.5px] font-bold text-foreground hover:bg-surface-raised"
        >
          <Download size={13} /> Exportar CSV
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <span className="text-[10px] font-bold uppercase text-muted">Coincidentes</span>
            <div className="font-mono text-[18px] font-bold text-success">{counts.MATCH}</div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <span className="text-[10px] font-bold uppercase text-muted">Faltantes en Hirint</span>
            <div className="font-mono text-[18px] font-bold text-warning">{counts.MISSING_IN_HIRINT}</div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <span className="text-[10px] font-bold uppercase text-muted">Bajas en Origen</span>
            <div className="font-mono text-[18px] font-bold text-muted">{counts.NO_LONGER_IN_PORTAL}</div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <span className="text-[10px] font-bold uppercase text-muted">Duplicados</span>
            <div className="font-mono text-[18px] font-bold text-danger">{counts.DUPLICATE}</div>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto text-[12px] font-semibold">
            {[
              { id: "ALL", label: `Todos (${counts.ALL})` },
              { id: "MATCH", label: `En Ambos (${counts.MATCH})` },
              { id: "MISSING_IN_HIRINT", label: `Faltantes (${counts.MISSING_IN_HIRINT})` },
              { id: "NO_LONGER_IN_PORTAL", label: `Bajas (${counts.NO_LONGER_IN_PORTAL})` },
              { id: "DUPLICATE", label: `Duplicados (${counts.DUPLICATE})` },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`rounded-lg px-2.5 py-1 transition-colors ${
                  activeTab === t.id
                    ? "bg-primary text-primary-foreground font-bold"
                    : "border border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              placeholder="Buscar por ID nativo, título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-border bg-surface py-1 pl-8 pr-3 text-[12px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Native IDs Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-border bg-surface-raised text-[10px] font-bold uppercase tracking-wider text-faint">
              <tr>
                <th className="px-3.5 py-2.5">ID Nativo (source_job_id)</th>
                <th className="px-3.5 py-2.5">Puesto & Empresa</th>
                <th className="px-3.5 py-2.5">Estado en Portal</th>
                <th className="px-3.5 py-2.5">Estado en Hirint</th>
                <th className="px-3.5 py-2.5">Condición</th>
                <th className="px-3.5 py-2.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted">
                    No se encontraron registros de censo para este filtro.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-raised/50">
                    <td className="px-3.5 py-2.5 font-mono font-bold text-primary">{item.sourceJobId}</td>
                    <td className="px-3.5 py-2.5">
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-[11px] text-muted">{item.company}</div>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <span className="font-mono text-[11px] text-foreground">{item.portalStatus}</span>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <span className="font-mono text-[11px] text-foreground">{item.hirintStatus}</span>
                    </td>
                    <td className="px-3.5 py-2.5">
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                          item.status === "MATCH"
                            ? "bg-success/15 text-success"
                            : item.status === "MISSING_IN_HIRINT"
                              ? "bg-warning/15 text-warning"
                              : item.status === "NO_LONGER_IN_PORTAL"
                                ? "bg-surface-raised text-faint"
                                : "bg-danger/15 text-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-1 text-[11px] font-semibold text-muted hover:text-foreground"
                      >
                        <ExternalLink size={12} /> Ver
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DetailDrawer>
  );
}
