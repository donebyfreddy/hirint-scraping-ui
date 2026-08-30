"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe,
  Activity,
  Layers,
  ShieldAlert,
  Search,
  RefreshCw,
  Sliders,
  FileCode2,
  Briefcase,
  Download,
  Terminal,
  Building2,
  Radio,
  CheckCircle2,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { cn } from "@/lib/utils";
import { activeScrapeJobs, findingsList, globalOverviewStats } from "@/data/mock-data";

export function TopNav() {
  const pathname = usePathname();
  const { setCommandOpen, triggerRefresh, isRefreshing, lastRefreshTime } = useScraping();

  const runningJobsCount = activeScrapeJobs.filter((j) => j.status === "RUNNING").length;
  const criticalFindingsCount = findingsList.filter((f) => f.severity === "CRITICAL" || f.severity === "HIGH").length;

  const navItems = [
    { href: "/", label: "Resumen Global", icon: Layers, count: null },
    { href: "/scraping", label: "Fuentes / Portales", icon: Globe, count: 18 },
    { href: "/coverage", label: "Censo & Cobertura", icon: FileCode2, count: null },
    { href: "/jobs", label: "Jobs & Workers", icon: Activity, count: runningJobsCount > 0 ? `${runningJobsCount} activos` : null, highlight: runningJobsCount > 0 },
    { href: "/offers", label: "Ofertas Ingestadas", icon: Briefcase, count: null },
    { href: "/data-quality", label: "Calidad de Datos", icon: ShieldAlert, count: criticalFindingsCount > 0 ? criticalFindingsCount : null, alert: criticalFindingsCount > 0 },
    { href: "/performance", label: "Rendimiento & Proxies", icon: Sliders, count: null },
    { href: "/ats-scraper", label: "ATS Scraper", icon: Building2, count: null },
    { href: "/sentinel", label: "Sentinel", icon: Radio, count: null },
    { href: "/exportaciones", label: "Exportaciones", icon: Download, count: null },
  ];

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-border bg-surface/95 backdrop-blur-md">
      {/* Top Utility Bar */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand & Live System Status */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-mono text-[14px] font-black text-primary-foreground shadow-sm shadow-primary/30 group-hover:scale-105 transition-transform">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-extrabold tracking-tight text-foreground leading-none">
                HIRINT <span className="text-primary font-medium">SCRAPING SUITE</span>
              </span>
              <span className="text-[10px] font-mono text-faint leading-tight mt-0.5">
                v3.8.4-prod · Operational AI Scraping Engine
              </span>
            </div>
          </Link>

          {/* System Pulse */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span>Sistema Operativo (15/18 fuentes nominales)</span>
          </div>
        </div>

        {/* Action Controls & Search Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Quick Switcher Command Button */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-[12px] text-muted hover:border-primary/40 hover:text-foreground transition-all shadow-xs"
          >
            <Search size={14} className="text-faint" />
            <span className="hidden md:inline">Buscar fuente, job, oferta...</span>
            <span className="md:hidden">Buscar...</span>
            <kbd className="hidden sm:inline rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-faint border border-border">
              ⌘K
            </kbd>
          </button>

          {/* Realtime Refresh Trigger */}
          <button
            type="button"
            onClick={triggerRefresh}
            disabled={isRefreshing}
            title="Sincronizar estado"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[12px] font-semibold text-muted hover:bg-surface-raised hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={cn("text-faint", isRefreshing && "animate-spin text-primary")} />
            <span className="hidden lg:inline text-[11px] font-mono">{lastRefreshTime}</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="flex items-center gap-1 overflow-x-auto px-4 sm:px-6 no-scrollbar border-t border-border/40 text-[13px] font-medium">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 transition-all",
                isActive
                  ? "border-primary font-bold text-primary"
                  : "border-transparent text-muted hover:border-border hover:text-foreground"
              )}
            >
              <Icon
                size={15}
                className={cn(
                  "transition-colors",
                  isActive ? "text-primary" : "text-faint group-hover:text-muted"
                )}
              />
              <span>{item.label}</span>

              {item.count && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 font-mono text-[10px] font-bold leading-none",
                    item.alert
                      ? "bg-danger/20 text-danger"
                      : item.highlight
                        ? "bg-info/20 text-info"
                        : "bg-surface-raised text-faint"
                  )}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
