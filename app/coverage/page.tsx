"use client";

import React, { useState } from "react";
import {
  FileCheck,
  Search,
  Filter,
  ArrowUpRight,
  Info,
  ShieldCheck,
  FileCode2,
  Download,
  RotateCw,
} from "lucide-react";
import { CatalogueStatusBadge, StatusBadge } from "@/components/StatusBadge";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import { portals, type Portal } from "@/data/mock-data";

export default function CoverageCensusPage() {
  const { setSelectedCensusPortalId, setSelectedPortal, showToast } = useScraping();
  const [search, setSearch] = useState("");
  const [catalogueFilter, setCatalogueFilter] = useState<string>("ALL");

  const filteredPortals = portals.filter((p) => {
    if (catalogueFilter !== "ALL" && p.catalogueStatus !== catalogueFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q);
    }
    return true;
  });

  const totalDbOffers = portals.reduce((a, b) => a + b.offers, 0);
  const totalSourceLive = portals.reduce((a, b) => a + (b.sourceLiveTotal > 0 ? b.sourceLiveTotal : b.offers), 0);
  const avgCoverage = (totalDbOffers / totalSourceLive) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Censo & Cobertura de Identificadores
            </h1>
            <span className="rounded-md bg-success/10 px-2 py-0.5 font-mono text-[11px] font-bold text-success">
              Reconciliación Determinista
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Comparativa entre el inventario declarado por cada portal y el catálogo de ofertas activas persistidas en base de datos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Exportando informe de censo y discrepancias en CSV...", "success")}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-[12.5px] font-bold text-foreground hover:bg-surface-raised transition-colors"
          >
            <Download size={13} /> Exportar Reconciliación
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Ofertas en Base de Datos</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-foreground">{fmtNumber(totalDbOffers)}</div>
          <span className="text-[11.5px] text-faint">Catálogo acumulado activo</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Censo Declarado Fuentes</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-foreground">{fmtNumber(totalSourceLive)}</div>
          <span className="text-[11.5px] text-faint">Suma de inventario origen</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Cobertura Global Media</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-primary">{fmtPct(avgCoverage)}</div>
          <span className="text-[11.5px] text-faint">Reconciliación de source_job_id</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Fuentes Verificadas 100%</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">
            {portals.filter((p) => p.catalogueStatus === "FULL_CATALOG_VERIFIED").length} de {portals.length}
          </div>
          <span className="text-[11.5px] text-faint">Censo determinista sin caps</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar por portal o país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-[11.5px] font-medium">
          {[
            { id: "ALL", label: "Todas las fuentes" },
            { id: "FULL_CATALOG_VERIFIED", label: "Censo Completo" },
            { id: "PARTIAL_CATALOG", label: "Catálogo Parcial" },
            { id: "RESULT_CAP", label: "Límite Resultados (Cap)" },
            { id: "INCREMENTAL", label: "Incremental" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCatalogueFilter(f.id)}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                catalogueFilter === f.id
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-surface-raised text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
              <tr>
                <th className="px-4 py-3">Fuente / Portal</th>
                <th className="px-4 py-3">Tipo de Catálogo</th>
                <th className="px-4 py-3 text-right">Ofertas BD</th>
                <th className="px-4 py-3 text-right">Declaradas Fuente</th>
                <th className="px-4 py-3 text-right">Faltantes Estimadas</th>
                <th className="px-4 py-3 text-right">Cobertura</th>
                <th className="px-4 py-3 text-right">Salud ID Nativo</th>
                <th className="px-4 py-3 text-right">Inspección</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPortals.map((portal) => {
                const missing = portal.sourceLiveTotal > portal.offers ? portal.sourceLiveTotal - portal.offers : 0;
                return (
                  <tr
                    key={portal.id}
                    onClick={() => setSelectedPortal(portal)}
                    className="cursor-pointer transition-colors hover:bg-surface-raised/70"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[17px]">{portal.countryFlag}</span>
                        <div>
                          <div className="font-bold text-foreground hover:text-primary transition-colors">
                            {portal.name}
                          </div>
                          <div className="text-[11px] text-muted">{portal.country}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <CatalogueStatusBadge status={portal.catalogueStatus} note={portal.catalogueNote} />
                    </td>

                    <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                      {fmtNumber(portal.offers)}
                    </td>

                    <td className="px-4 py-3 text-right font-mono text-muted">
                      {portal.sourceLiveTotal > 0 ? fmtNumber(portal.sourceLiveTotal) : "Desconocido"}
                    </td>

                    <td className="px-4 py-3 text-right font-mono">
                      {missing > 0 ? (
                        <span className="font-bold text-warning">+{fmtNumber(missing)}</span>
                      ) : (
                        <span className="text-success font-semibold">0 (Al día)</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-right font-mono font-bold text-primary">
                      {fmtPct(portal.coverage)}
                    </td>

                    <td className="px-4 py-3 text-right font-mono">
                      <span className={portal.sourceJobIdHealth >= 98 ? "text-success font-bold" : "text-warning font-bold"}>
                        {fmtPct(portal.sourceJobIdHealth)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCensusPortalId(portal.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-[11.5px] font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <FileCode2 size={12} /> Ver IDs
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
