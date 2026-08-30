"use client";

import React, { useState } from "react";
import {
  Globe,
  Play,
  FlaskConical,
  RefreshCw,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  FileCode2,
} from "lucide-react";
import { PortalStatusBadge, CatalogueStatusBadge } from "@/components/StatusBadge";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import { portals, type Portal, type CountryCode } from "@/data/mock-data";

export default function SourcesScrapingPage() {
  const { setSelectedPortal, setSelectedCensusPortalId, showToast } = useScraping();

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const countries = [
    { code: "ALL", label: "Todos los países" },
    { code: "ES", label: "🇪🇸 España" },
    { code: "MX", label: "🇲🇽 México" },
    { code: "CO", label: "🇨🇴 Colombia" },
    { code: "AR", label: "🇦🇷 Argentina" },
    { code: "CL", label: "🇨🇱 Chile" },
    { code: "PE", label: "🇵🇪 Perú" },
  ];

  const filteredPortals = portals.filter((p) => {
    if (selectedCountry !== "ALL" && p.countryCode !== selectedCountry) return false;
    if (selectedStatus !== "ALL" && p.status !== selectedStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.scrapingStrategy.toLowerCase().includes(q) ||
        p.proxyProvider.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalOffers = filteredPortals.reduce((acc, p) => acc + p.offers, 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Fuentes & Portales de Empleo
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {filteredPortals.length} fuentes
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Configuración, estrategias de extracción (REST/Playwright/Scrapy), censo de IDs y gestión de proxies Webshare.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Sincronizando taxonomía de todas las fuentes...", "info")}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-[12.5px] font-bold text-foreground hover:bg-surface-raised transition-colors"
          >
            <RefreshCw size={13} /> Sincronizar Taxonomías
          </button>
          <button
            type="button"
            onClick={() => showToast("Lanzando lote de scraping para las fuentes filtradas...", "info")}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99]"
          >
            <Play size={14} /> Lanzar Lote ({filteredPortals.length})
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar por nombre, país, estrategia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>

        {/* Country Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-[12px] font-medium">
          {countries.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setSelectedCountry(c.code)}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                selectedCountry === c.code
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-surface-raised text-muted hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown / View toggle */}
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-border bg-surface-raised px-2.5 py-1.5 text-[12px] font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="ALL">Todos los estados</option>
            <option value="healthy">Al día (Healthy)</option>
            <option value="running">En ejecución (Running)</option>
            <option value="warning">Con avisos (Warning)</option>
            <option value="blocked">Bloqueados (Blocked)</option>
          </select>

          <div className="hidden sm:flex rounded-lg border border-border bg-surface-raised p-0.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded px-2 py-1 transition-colors ${
                viewMode === "table" ? "bg-surface text-foreground shadow-2xs" : "text-muted"
              }`}
            >
              Tabla
            </button>
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`rounded px-2 py-1 transition-colors ${
                viewMode === "cards" ? "bg-surface text-foreground shadow-2xs" : "text-muted"
              }`}
            >
              Tarjetas
            </button>
          </div>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="flex items-center justify-between text-[12px] text-muted">
        <span>
          Mostrando <strong className="text-foreground">{filteredPortals.length}</strong> fuentes con un total de{" "}
          <strong className="font-mono text-foreground">{fmtNumber(totalOffers)}</strong> ofertas activas
        </span>
      </div>

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
                <tr>
                  <th className="px-4 py-3">Fuente / Portal</th>
                  <th className="px-4 py-3">Estado Operativo</th>
                  <th className="px-4 py-3">Completitud Catálogo</th>
                  <th className="px-4 py-3 text-right">Ofertas BD</th>
                  <th className="px-4 py-3 text-right">Censo Fuente</th>
                  <th className="px-4 py-3 text-right">Cobertura</th>
                  <th className="px-4 py-3 text-right">Velocidad</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPortals.map((portal) => (
                  <tr
                    key={portal.id}
                    onClick={() => setSelectedPortal(portal)}
                    className="cursor-pointer transition-colors hover:bg-surface-raised/70"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[18px]">{portal.countryFlag}</span>
                        <div>
                          <div className="font-bold text-foreground hover:text-primary transition-colors">
                            {portal.name}
                          </div>
                          <div className="text-[11px] text-muted">
                            {portal.country} · <span className="font-mono">{portal.scrapingStrategy}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <PortalStatusBadge status={portal.status} />
                    </td>

                    <td className="px-4 py-3">
                      <CatalogueStatusBadge status={portal.catalogueStatus} />
                    </td>

                    <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                      {fmtNumber(portal.offers)}
                    </td>

                    <td className="px-4 py-3 text-right font-mono text-muted">
                      {portal.sourceLiveTotal > 0 ? fmtNumber(portal.sourceLiveTotal) : "N/D"}
                    </td>

                    <td className="px-4 py-3 text-right font-mono font-bold text-primary">
                      {fmtPct(portal.coverage)}
                    </td>

                    <td className="px-4 py-3 text-right font-mono text-foreground">
                      {portal.throughput > 0 ? `${portal.throughput}/min` : "—"}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedCensusPortalId(portal.id)}
                          title="Inspeccionar censo de IDs nativos"
                          className="rounded-lg bg-surface-raised p-1.5 text-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <FileCode2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPortal(portal)}
                          title="Lanzador y parámetros"
                          className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-[11.5px] font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Play size={12} /> Config
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card Grid View */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPortals.map((portal) => (
            <div
              key={portal.id}
              onClick={() => setSelectedPortal(portal)}
              className="cursor-pointer rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary/40 hover:bg-surface-raised hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-[20px]">{portal.countryFlag}</span>
                  <div>
                    <h3 className="font-bold text-foreground text-[14px]">{portal.name}</h3>
                    <span className="text-[11px] text-muted">{portal.country} · {portal.region}</span>
                  </div>
                </div>
                <PortalStatusBadge status={portal.status} />
              </div>

              <div className="mt-3">
                <CatalogueStatusBadge status={portal.catalogueStatus} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted">Ofertas</span>
                  <div className="font-mono text-[16px] font-bold text-foreground">{fmtNumber(portal.offers)}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted">Cobertura</span>
                  <div className="font-mono text-[16px] font-bold text-primary">{fmtPct(portal.coverage)}</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted">Velocidad</span>
                  <div className="font-mono text-[16px] font-bold text-foreground">{portal.throughput}/m</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11.5px] text-muted border-t border-border/40 pt-2.5">
                <span className="font-mono text-[10.5px]">Egress: {portal.proxyExitCountry}</span>
                <span className="font-bold text-primary flex items-center gap-1">
                  Abrir ficha <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
