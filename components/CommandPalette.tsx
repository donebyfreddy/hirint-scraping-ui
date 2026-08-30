"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Globe,
  Activity,
  ShieldAlert,
  Briefcase,
  FileCode2,
  ArrowRight,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import {
  portals,
  activeScrapeJobs,
  findingsList,
  sampleJobOffers,
} from "@/data/mock-data";

export function CommandPalette() {
  const {
    commandOpen,
    setCommandOpen,
    setSelectedPortal,
    setSelectedJob,
    setSelectedFinding,
    setSelectedOffer,
    setSelectedCensusPortalId,
  } = useScraping();

  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [commandOpen]);

  if (!commandOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchedPortals = portals.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchedJobs = activeScrapeJobs.filter(
    (j) => !q || j.id.toLowerCase().includes(q) || j.portalName.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedFindings = findingsList.filter(
    (f) => !q || f.title.toLowerCase().includes(q) || f.portalName.toLowerCase().includes(q) || f.problemField.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchedOffers = sampleJobOffers.filter(
    (o) => !q || o.title.toLowerCase().includes(q) || o.company.toLowerCase().includes(q) || o.sourceJobId.toLowerCase().includes(q)
  ).slice(0, 3);

  const quickNav = [
    { title: "Panel Global", path: "/", icon: Layers },
    { title: "Fuentes de Empleo", path: "/scraping", icon: Globe },
    { title: "Censo & Cobertura", path: "/coverage", icon: FileCode2 },
    { title: "Jobs & Workers", path: "/jobs", icon: Activity },
    { title: "Calidad de Datos & Anomalías", path: "/data-quality", icon: ShieldAlert },
    { title: "Rendimiento & Proxies", path: "/performance", icon: Activity },
    { title: "Ofertas Activas", path: "/offers", icon: Briefcase },
    { title: "Exportaciones", path: "/exportaciones", icon: ArrowRight },
  ].filter((n) => !q || n.title.toLowerCase().includes(q));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        onClick={() => setCommandOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Palette Container */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 bg-surface-raised">
          <Search size={18} className="text-primary flex-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar fuentes, IDs de ofertas, jobs en curso, anomalías o vistas... (Esc para cerrar)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-faint focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setCommandOpen(false)}
            className="rounded p-1 text-faint hover:bg-surface hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[440px] overflow-y-auto p-3 space-y-4 text-[13px]">
          {/* Quick Nav Section */}
          {quickNav.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-faint">
                Vistas de la Suite
              </div>
              <div className="grid grid-cols-2 gap-1">
                {quickNav.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.path}
                      onClick={() => {
                        setCommandOpen(false);
                        router.push(n.path);
                      }}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-foreground transition-colors hover:bg-surface-raised hover:text-primary"
                    >
                      <Icon size={15} className="text-muted" />
                      <span className="font-medium">{n.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Portals Section */}
          {matchedPortals.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-faint">
                Fuentes / Portales
              </div>
              <div className="space-y-1">
                {matchedPortals.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setCommandOpen(false);
                      setSelectedPortal(p);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-surface-raised"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[16px]">{p.countryFlag}</span>
                      <div>
                        <span className="font-bold">{p.name}</span>
                        <span className="ml-2 text-[11.5px] text-muted">({p.country} · {p.region})</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11.5px] text-primary">{p.offers.toLocaleString()} ofertas</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {matchedJobs.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-faint">
                Jobs & Workers
              </div>
              <div className="space-y-1">
                {matchedJobs.map((j) => (
                  <div
                    key={j.id}
                    onClick={() => {
                      setCommandOpen(false);
                      setSelectedJob(j);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-surface-raised"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-foreground">{j.id}</span>
                      <span className="text-muted">· {j.portalName}</span>
                    </div>
                    <span className="rounded bg-info/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-info">
                      {j.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings Section */}
          {matchedFindings.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-faint">
                Anomalías & Incidencias
              </div>
              <div className="space-y-1">
                {matchedFindings.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      setCommandOpen(false);
                      setSelectedFinding(f);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-surface-raised"
                  >
                    <div className="min-w-0 flex-1 truncate">
                      <span className="font-semibold text-foreground">{f.title}</span>
                      <span className="ml-2 text-[11.5px] text-muted">({f.portalName})</span>
                    </div>
                    <span className="rounded bg-danger/10 px-2 py-0.5 text-[10.5px] font-bold text-danger">
                      {f.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Offers Section */}
          {matchedOffers.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-faint">
                Ofertas & source_job_id
              </div>
              <div className="space-y-1">
                {matchedOffers.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => {
                      setCommandOpen(false);
                      setSelectedOffer(o);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-surface-raised"
                  >
                    <div className="min-w-0 flex-1 truncate">
                      <span className="font-semibold text-foreground">{o.title}</span>
                      <span className="ml-2 font-mono text-[11px] text-primary">{o.sourceJobId}</span>
                    </div>
                    <span className="text-[11.5px] text-muted">{o.company}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border bg-surface-raised px-4 py-2 text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold border border-border">↑</kbd>{" "}
              <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold border border-border">↓</kbd> navegar
            </span>
            <span>
              <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold border border-border">↵</kbd> abrir
            </span>
          </div>
          <span>
            <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold border border-border">Esc</kbd> cerrar
          </span>
        </div>
      </div>
    </div>
  );
}
