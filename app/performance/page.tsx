"use client";

import React, { useState } from "react";
import {
  Activity,
  Globe,
  Zap,
  Clock,
  ShieldCheck,
  RotateCw,
  Search,
  Server,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import { portals, globalOverviewStats } from "@/data/mock-data";

export default function PerformancePage() {
  const { setSelectedPortal, showToast } = useScraping();
  const [search, setSearch] = useState("");

  const filteredPortals = portals.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.proxyExitCountry.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Rendimiento & Observabilidad de Red (Egress)
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              Webshare Residential Pools
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Métricas de throughput por minuto, latencia HTTP, asignación de proxies residenciales dedicados por país y balanceo de carga.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Comprobando salud de los 18 pools de proxies Webshare...", "info")}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99]"
          >
            <RotateCw size={14} /> Test de Salud de Proxies
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Throughput Agregado</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-foreground">1.840 /min</div>
          <span className="text-[11.5px] text-faint">Mediana: 1.450 /min</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Latencia Media HTTP</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">342 ms</div>
          <span className="text-[11.5px] text-faint">P95: 780 ms</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Disponibilidad de Proxies</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-primary">99.8%</div>
          <span className="text-[11.5px] text-faint">0 bloques 403 activos</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Tiempo Medio Parseo</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-foreground">145 ms</div>
          <span className="text-[11.5px] text-faint">Por oferta completa</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar por portal, país de salida, IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>
        <span className="text-[12px] font-mono text-muted">{filteredPortals.length} fuentes activas</span>
      </div>

      {/* Network & Egress Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
              <tr>
                <th className="px-4 py-3">Fuente</th>
                <th className="px-4 py-3">Estrategia</th>
                <th className="px-4 py-3">Proveedor Proxy</th>
                <th className="px-4 py-3">País de Salida (Egress)</th>
                <th className="px-4 py-3 font-mono">IP / Host Enmascarado</th>
                <th className="px-4 py-3 text-right">Throughput</th>
                <th className="px-4 py-3 text-right">Latencia</th>
                <th className="px-4 py-3 text-right">Estado Red</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPortals.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedPortal(p)}
                  className="cursor-pointer transition-colors hover:bg-surface-raised/70"
                >
                  <td className="px-4 py-3 font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <span>{p.countryFlag}</span>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11.5px] text-muted">{p.scrapingStrategy}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{p.proxyProvider}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground">{p.proxyExitCountry}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11.5px] text-muted">
                    {p.proxyMaskedIp}:{p.proxyPort}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                    {p.throughput > 0 ? `${p.throughput}/min` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-muted">{p.avgTimePerOfferMs} ms</td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-success">
                      <ShieldCheck size={14} /> Nominal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
