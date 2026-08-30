"use client";

import React, { useState } from "react";
import {
  Radio,
  ShieldCheck,
  AlertTriangle,
  RotateCw,
  Search,
  CheckCircle2,
  ExternalLink,
  Lock,
  Globe,
  Zap,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { sentinelProbesList, type SentinelProbe } from "@/data/mock-data";

export default function SentinelPage() {
  const { showToast } = useScraping();
  const [search, setSearch] = useState("");
  const [isProbing, setIsProbing] = useState(false);

  const filtered = sentinelProbesList.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      return p.portalName.toLowerCase().includes(q) || p.wafProvider.toLowerCase().includes(q);
    }
    return true;
  });

  const healthyCount = sentinelProbesList.filter((p) => p.status === "HEALTHY").length;
  const blockedCount = sentinelProbesList.filter((p) => p.status === "BLOCKED").length;
  const warningCount = sentinelProbesList.filter((p) => p.status === "WARNING").length;

  const handleRunProbes = () => {
    setIsProbing(true);
    showToast("Lanzando sondas centinela en paralelo desde 6 regiones...", "info");
    window.setTimeout(() => {
      setIsProbing(false);
      showToast("✅ Sondas Sentinel completadas: 18 fuentes verificadas", "success");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Sentinel — Monitorización Externa Anti-Bot
            </h1>
            <span className="rounded-md bg-success/10 px-2 py-0.5 font-mono text-[11px] font-bold text-success">
              18 Sondas Activas
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Detección temprana de bloqueos WAF (Cloudflare / Datadome / Akamai), cambios de selectores HTML y rotación preventiva de proxies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunProbes}
            disabled={isProbing}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[12.5px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99] disabled:opacity-60"
          >
            <Radio size={14} className={isProbing ? "animate-pulse" : ""} />
            {isProbing ? "Probando sondas..." : "Disparar Sondas Sentinel"}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Sondas Nominales</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-success">{healthyCount}</div>
          <span className="text-[11.5px] text-faint">Sin resistencia de WAF</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Avisos de Selector</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-warning">{warningCount}</div>
          <span className="text-[11.5px] text-faint">Cambios menores de markup</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Bloqueos Detectados</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-danger">{blockedCount}</div>
          <span className="text-[11.5px] text-faint">Requiere bypass residential</span>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Frecuencia de Sonda</span>
          <div className="mt-1 font-mono text-[24px] font-bold text-primary">Cada 5 min</div>
          <span className="text-[11.5px] text-faint">24/7 background worker</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar por portal, proveedor WAF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Probes Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
              <tr>
                <th className="px-4 py-3">Portal Objetivo</th>
                <th className="px-4 py-3">Protección WAF</th>
                <th className="px-4 py-3">Desafío / Captcha</th>
                <th className="px-4 py-3">Salud de Selectores</th>
                <th className="px-4 py-3 text-right">Latencia Sonda</th>
                <th className="px-4 py-3 text-right">Última Comprobación</th>
                <th className="px-4 py-3 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((probe) => (
                <tr key={probe.id} className="hover:bg-surface-raised/60 transition-colors">
                  <td className="px-4 py-3 font-bold text-foreground">{probe.portalName}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[11px] font-semibold text-foreground">
                      {probe.wafProvider}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {probe.captchaDetected ? (
                      <span className="font-semibold text-danger">⚠️ {probe.challengeType}</span>
                    ) : (
                      <span className="text-success font-medium">Ninguno</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {probe.selectorChanged ? (
                      <span className="font-semibold text-warning">⚠️ Selector modificado</span>
                    ) : (
                      <span className="text-success font-medium">✓ 100% estables</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                    {probe.responseLatencyMs} ms
                  </td>
                  <td className="px-4 py-3 text-right text-muted">{probe.lastChecked}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10.5px] font-bold ${
                        probe.status === "HEALTHY"
                          ? "bg-success/15 text-success"
                          : probe.status === "WARNING"
                            ? "bg-warning/15 text-warning"
                            : "bg-danger/15 text-danger"
                      }`}
                    >
                      {probe.status}
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
