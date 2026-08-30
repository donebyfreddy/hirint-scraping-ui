"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Zap, Flag } from "lucide-react";
import { PageHeader, HeaderButton } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { dashboardKpis, portals, recentOffers, type RecentOffer } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

export default function DashboardPage() {
  const [portalFilter, setPortalFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const countries = useMemo(() => Array.from(new Set(recentOffers.map((o) => o.country))), []);

  const filtered = recentOffers.filter((o) => {
    if (portalFilter !== "all" && o.portal !== portalFilter) return false;
    if (countryFilter !== "all" && o.country !== countryFilter) return false;
    return true;
  });

  const columns: Column<RecentOffer>[] = [
    { key: "title", header: "Puesto", render: (r) => <span className="font-bold text-foreground">{r.title}</span> },
    { key: "company", header: "Empresa", render: (r) => r.company },
    {
      key: "portal",
      header: "Portal",
      render: (r) => (
        <span className="inline-flex items-center gap-1.5 font-bold">
          <span
            className="grid h-5 w-5 place-items-center rounded-[5px] text-[9px] font-extrabold text-white"
            style={{ background: r.portalColor }}
          >
            {r.portalCode}
          </span>
          {r.portal}
        </span>
      ),
    },
    { key: "country", header: "País", render: (r) => `${r.countryFlag} ${r.country}` },
    { key: "location", header: "Ubicación", render: (r) => r.location },
    { key: "salary", header: "Salario", render: (r) => <span className="font-mono">{r.salary}</span> },
    { key: "published", header: "Publicada", render: (r) => r.published },
    { key: "ingested", header: "Ingesta", render: (r) => r.ingested },
    {
      key: "status",
      header: "Estado",
      render: (r) =>
        r.status === "complete" ? (
          <StatusBadge tone="success">Completa</StatusBadge>
        ) : (
          <StatusBadge tone="warning">Revisión</StatusBadge>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Visión general del sistema de scraping"
        actions={
          <>
            <HeaderButton icon={<RefreshCw size={15} />}>Actualizar</HeaderButton>
            <HeaderButton variant="primary" icon={<Zap size={15} />}>
              Iniciar scraping
            </HeaderButton>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
        <MetricCard label="Total scrapeado" value={fmtNumber(dashboardKpis.totalScraped)} sub={`${dashboardKpis.activePortals} portales activos`} />
        <MetricCard label="Media diaria" value={fmtNumber(dashboardKpis.dailyAvg)} sub="ofertas / día" />
        <MetricCard label="Empresas" value={fmtNumber(dashboardKpis.companiesDetected)} sub="detectadas" />
        <MetricCard label="Países" value={String(dashboardKpis.countriesCovered)} sub="cubiertos" />
        <MetricCard label="Última oferta" value={dashboardKpis.lastOfferTime} sub={dashboardKpis.lastOfferDate} />
      </div>

      <a
        href="/scraping"
        className="mb-4 flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-[18px] shadow-subtle transition hover:border-border-strong"
      >
        <div className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[11px]" style={{ background: "var(--primary-soft)" }}>
          <Zap size={20} style={{ color: "var(--primary)" }} />
        </div>
        <div className="min-w-[200px] flex-1">
          <div className="text-[14px] font-extrabold text-foreground">Iniciar nuevo scraping</div>
          <div className="text-[12.5px] text-muted">Extrae ofertas de trabajo de los {portals.length} portales ETT configurados</div>
        </div>
        <span className="inline-flex h-[38px] items-center rounded-control bg-primary px-[15px] text-[13px] font-bold text-primary-foreground shadow-[0_4px_12px_var(--primary-ring)]">
          Ir a Scraping
        </span>
      </a>

      <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <div>
            <h2 className="text-[15px] font-extrabold text-foreground">Últimas ofertas</h2>
            <span className="text-[12px] font-semibold text-faint">
              Mostrando {filtered.length} de {fmtNumber(61910)} · página 1 de 2.477
            </span>
          </div>
          <button type="button" className="ml-auto rounded-control border border-border-strong bg-surface px-3 py-1.5 text-xs font-bold text-foreground hover:bg-surface-raised">
            Ver todos los jobs
          </button>
        </div>

        <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
          <select
            value={portalFilter}
            onChange={(e) => setPortalFilter(e.target.value)}
            className="h-9 rounded-[9px] border border-border-strong bg-surface px-3 text-[12.5px] font-semibold text-foreground"
          >
            <option value="all">Portal: todos</option>
            {Array.from(new Set(recentOffers.map((o) => o.portal))).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="h-9 rounded-[9px] border border-border-strong bg-surface px-3 text-[12.5px] font-semibold text-foreground"
          >
            <option value="all">País: todos</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button type="button" className="flex items-center gap-1 rounded-control border border-border-strong bg-surface px-3 py-1.5 text-xs font-bold text-foreground hover:bg-surface-raised">
            <Flag size={13} /> Columnas (9)
          </button>
        </div>

        <DataTable columns={columns} rows={filtered} variant="suite" />
      </div>
    </div>
  );
}
