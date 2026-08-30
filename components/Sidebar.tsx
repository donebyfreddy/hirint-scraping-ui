"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  ListTree,
  Download,
  ShieldCheck,
  Building2,
  Shield,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/scraping", label: "Scraping", icon: Search },
  { href: "/jobs", label: "Jobs", icon: ListTree, count: "2 activos" },
  { href: "/exportaciones", label: "Exportaciones", icon: Download },
  { href: "/data-quality", label: "Calidad de datos", icon: ShieldCheck },
  { href: "/ats-scraper", label: "ATS Scraper", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[250px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-border bg-surface px-[15px] py-5">
      {/* Brand */}
      <div className="flex items-center gap-[11px] px-1.5 py-0.5">
        <div
          className="grid h-[34px] w-[34px] flex-none place-items-center rounded-control text-[15px] font-extrabold text-white"
          style={{
            background: "linear-gradient(145deg, var(--primary), #9b8cff)",
            boxShadow: "0 4px 12px var(--primary-ring)",
          }}
        >
          H
        </div>
        <div>
          <div className="text-[16px] font-extrabold tracking-tight text-foreground">Hirint</div>
          <div className="text-[11px] uppercase tracking-[.04em] text-faint">Scraping Suite</div>
        </div>
      </div>

      {/* Section tabs (Ofertas | Sentinel) — Sentinel is out of scope for this prototype */}
      <div className="flex gap-1.5 rounded-[12px] border border-border bg-surface-raised p-1">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-[9px] bg-surface px-2 py-2 text-[13px] font-bold text-primary shadow-subtle"
        >
          <LayoutDashboard size={15} />
          Ofertas
        </button>
        <button
          type="button"
          disabled
          title="Sentinel no forma parte de este prototipo"
          className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-[9px] px-2 py-2 text-[13px] font-bold text-faint opacity-50"
        >
          <Shield size={15} />
          Sentinel
        </button>
      </div>

      {/* Main nav */}
      <div>
        <div className="mb-1.5 px-2.5 text-[10px] font-bold uppercase tracking-[.09em] text-faint">Ofertas</div>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-[11px] rounded-control px-[11px] py-[9px] text-[13.5px] font-semibold transition-colors",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-surface-raised hover:text-foreground"
                )}
              >
                <Icon size={17} className="flex-none" />
                <span>{item.label}</span>
                {item.count && <span className="ml-auto text-[11px] font-bold text-faint">{item.count}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-3">
        <Link
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-[11px] rounded-control px-[11px] py-[9px] text-[13px] font-semibold text-muted hover:bg-surface-raised hover:text-foreground"
        >
          <ExternalLink size={16} className="flex-none" />
          Volver a Intranet
        </Link>
        <div className="flex items-center gap-2.5 rounded-[12px] border border-border bg-surface-raised p-2.5">
          <div
            className="grid h-8 w-8 flex-none place-items-center rounded-full text-[12px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #5b8def, #8b5cf6)" }}
          >
            FM
          </div>
          <div className="min-w-0">
            <div className="text-[12.5px] font-bold leading-tight text-foreground">Federico Mencuccini</div>
            <div className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-[10.5px] text-faint">
              federico.mencuccini@hirint.io
            </div>
          </div>
          <span className="ml-auto h-2 w-2 flex-none rounded-full" style={{ background: "var(--success)" }} />
        </div>
      </div>
    </aside>
  );
}
