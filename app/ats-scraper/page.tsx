"use client";

import React, { useState } from "react";
import {
  Building2,
  Search,
  Plus,
  Play,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code2,
  RotateCw,
  Clock,
  Sparkles,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber } from "@/lib/utils";

interface AtsCompany {
  id: string;
  name: string;
  atsType: "Workday" | "Greenhouse" | "Lever" | "SmartRecruiters" | "Personio" | "Ashby";
  careerUrl: string;
  activeJobsCount: number;
  lastScraped: string;
  status: "HEALTHY" | "WARNING" | "BLOCKED";
}

const sampleAtsCompanies: AtsCompany[] = [
  {
    id: "ats-1",
    name: "Glovo",
    atsType: "Greenhouse",
    careerUrl: "https://boards.greenhouse.io/glovo",
    activeJobsCount: 142,
    lastScraped: "hace 18 min",
    status: "HEALTHY",
  },
  {
    id: "ats-2",
    name: "Cabify",
    atsType: "Lever",
    careerUrl: "https://jobs.lever.co/cabify",
    activeJobsCount: 89,
    lastScraped: "hace 45 min",
    status: "HEALTHY",
  },
  {
    id: "ats-3",
    name: "Santander Tech",
    atsType: "Workday",
    careerUrl: "https://santander.wd3.myworkdayjobs.com/SantanderCareers",
    activeJobsCount: 420,
    lastScraped: "hace 2 horas",
    status: "HEALTHY",
  },
  {
    id: "ats-4",
    name: "Wallbox",
    atsType: "SmartRecruiters",
    careerUrl: "https://careers.smartrecruiters.com/Wallbox",
    activeJobsCount: 35,
    lastScraped: "hace 3 horas",
    status: "HEALTHY",
  },
  {
    id: "ats-5",
    name: "TravelPerk",
    atsType: "Ashby",
    careerUrl: "https://jobs.ashbyhq.com/travelperk",
    activeJobsCount: 68,
    lastScraped: "hace 1 hora",
    status: "HEALTHY",
  },
  {
    id: "ats-6",
    name: "Factorial HR",
    atsType: "Personio",
    careerUrl: "https://factorialhr.personio.de",
    activeJobsCount: 54,
    lastScraped: "hace 4 horas",
    status: "HEALTHY",
  },
];

export default function AtsScraperPage() {
  const { showToast } = useScraping();
  const [search, setSearch] = useState("");
  const [atsFilter, setAtsFilter] = useState<string>("ALL");
  const [isScrapingAll, setIsScrapingAll] = useState(false);

  const filtered = sampleAtsCompanies.filter((c) => {
    if (atsFilter !== "ALL" && c.atsType !== atsFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.atsType.toLowerCase().includes(q);
    }
    return true;
  });

  const totalJobs = filtered.reduce((acc, c) => acc + c.activeJobsCount, 0);

  const handleScrapeAll = () => {
    setIsScrapingAll(true);
    showToast("Iniciando workers de extracción para 42 ATS empresariales...", "info");
    window.setTimeout(() => {
      setIsScrapingAll(false);
      showToast("✅ Scraping de ATS completado: 808 ofertas sincronizadas", "success");
    }, 1800);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              ATS Direct Scraper
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              Empresas Directas & Páginas Career
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Extracción directa desde portales de empleo corporativos: Workday, Greenhouse, Lever, SmartRecruiters, Personio y Ashby.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Formulario para añadir nueva empresa ATS en desarrollo", "info")}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-[12.5px] font-bold text-foreground hover:bg-surface-raised transition-colors"
          >
            <Plus size={14} /> Añadir Empresa
          </button>
          <button
            type="button"
            onClick={handleScrapeAll}
            disabled={isScrapingAll}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99] disabled:opacity-60"
          >
            <Play size={14} />
            {isScrapingAll ? "Extrayendo ATS..." : "Lanzar Scraping ATS"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Empresas Monitorizadas</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-foreground">42</div>
          <span className="text-[11.5px] text-faint">6 sistemas ATS soportados</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Ofertas Directas Activas</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">{fmtNumber(totalJobs)}</div>
          <span className="text-[11.5px] text-faint">100% fuentes primarias</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Precisión Salarios</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-primary">82.4%</div>
          <span className="text-[11.5px] text-faint">Rangos oficiales de RRHH</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Estado de Conexión</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">Nominal</div>
          <span className="text-[11.5px] text-faint">APIs de ATS respondiendo</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar empresa, tipo de ATS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-[11.5px] font-medium">
          {[
            { id: "ALL", label: "Todos los ATS" },
            { id: "Greenhouse", label: "Greenhouse" },
            { id: "Lever", label: "Lever" },
            { id: "Workday", label: "Workday" },
            { id: "SmartRecruiters", label: "SmartRecruiters" },
            { id: "Personio", label: "Personio" },
            { id: "Ashby", label: "Ashby" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setAtsFilter(f.id)}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                atsFilter === f.id
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-surface-raised text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
              <tr>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Sistema ATS</th>
                <th className="px-4 py-3">URL Career Oficial</th>
                <th className="px-4 py-3 text-right">Ofertas Activas</th>
                <th className="px-4 py-3 text-right">Último Scrape</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((company) => (
                <tr key={company.id} className="hover:bg-surface-raised/60 transition-colors">
                  <td className="px-4 py-3 font-bold text-foreground flex items-center gap-2">
                    <Building2 size={16} className="text-primary" />
                    <span>{company.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] font-bold text-foreground">
                      {company.atsType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={company.careerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-primary transition-colors"
                    >
                      {company.careerUrl.replace("https://", "")} <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                    {company.activeJobsCount}
                  </td>
                  <td className="px-4 py-3 text-right text-muted">{company.lastScraped}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => showToast(`Scrapeando ATS de ${company.name}…`, "info")}
                      className="rounded bg-surface-raised px-2.5 py-1 text-[11px] font-semibold text-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Scrapear
                    </button>
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
