"use client";

import { useState } from "react";
import { Play, FlaskConical, ToggleLeft, ToggleRight, RefreshCw, CheckCircle2 } from "lucide-react";
import { PageHeader, HeaderButton } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { PortalCard } from "@/components/PortalCard";
import { portals } from "@/data/mock-data";
import { fmtNumber } from "@/lib/utils";

const TEST_OPTIONS = [5, 10, 25, 50];

export default function ScrapingPage() {
  const [selectedId, setSelectedId] = useState(portals[0].id);
  const [syncCategories, setSyncCategories] = useState(true);
  const [proxyOn, setProxyOn] = useState(true);
  const [testCount, setTestCount] = useState(10);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<null | { found: number; ms: number }>(null);
  const [starting, setStarting] = useState(false);

  const selected = portals.find((p) => p.id === selectedId)!;
  const healthy = portals.filter((p) => p.status === "healthy").length;
  const warning = portals.filter((p) => p.status === "warning").length;
  const critical = portals.filter((p) => p.status === "critical").length;

  function runTest() {
    setTesting(true);
    setTestResult(null);
    window.setTimeout(() => {
      setTesting(false);
      setTestResult({ found: Math.max(1, testCount - Math.round(Math.random() * 2)), ms: 1200 + Math.round(Math.random() * 2400) });
    }, 1400);
  }

  function runStart() {
    setStarting(true);
    window.setTimeout(() => setStarting(false), 1600);
  }

  return (
    <div>
      <PageHeader
        title="Scraping"
        subtitle="Descubre ofertas de los portales ETT configurados"
        variant="classic"
        actions={<HeaderButton icon={<RefreshCw size={15} />}>Actualizar</HeaderButton>}
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard variant="classic" label="Portales" value={String(portals.length)} sub="configurados" />
        <MetricCard variant="classic" label="Al día" value={String(healthy)} accent="var(--success)" />
        <MetricCard variant="classic" label="Con avisos" value={String(warning)} accent="var(--warning)" />
        <MetricCard variant="classic" label="Bloqueados" value={String(critical)} accent="var(--danger)" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Portales ({portals.length})</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portals.map((p) => (
              <PortalCard key={p.id} portal={p} selected={p.id === selectedId} onSelect={() => setSelectedId(p.id)} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
            <h2 className="mb-3 text-sm font-semibold text-foreground">{selected.name} · Configuración</h2>

            <Field label="País">
              <select className="h-9 w-full rounded-lg border border-border-strong bg-surface px-2.5 text-[13px] text-foreground">
                <option>{selected.country}</option>
              </select>
            </Field>

            <Field label="Categoría · 34 disp.">
              <select className="h-9 w-full rounded-lg border border-border-strong bg-surface px-2.5 text-[13px] text-foreground">
                <option>Todas</option>
                <option>Tecnología</option>
                <option>Comercial</option>
                <option>Logística</option>
              </select>
            </Field>

            <ToggleRow
              label="Sincronizar categorías"
              hint="Valida la taxonomía nativa del portal antes de rastrear"
              on={syncCategories}
              onToggle={() => setSyncCategories((v) => !v)}
            />
            <ToggleRow
              label="Proxy Webshare"
              hint={proxyOn ? `Salida ${selected.region} · Proxy Webshare` : "Salida directa · sin proxy"}
              on={proxyOn}
              onToggle={() => setProxyOn((v) => !v)}
            />

            <div className="mt-4 border-t border-border pt-4">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted">Probar ofertas</div>
              <div className="mb-3 flex gap-1.5">
                {TEST_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setTestCount(n)}
                    className={`flex-1 rounded-lg py-1.5 text-[12.5px] font-bold ${
                      testCount === n ? "bg-primary text-primary-foreground" : "bg-surface-raised text-muted"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={runTest}
                disabled={testing}
                className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface py-2 text-[13px] font-bold text-foreground hover:bg-surface-raised disabled:opacity-60"
              >
                <FlaskConical size={15} />
                {testing ? "Probando…" : `Probar ${testCount} ofertas`}
              </button>

              {testResult && (
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-semibold" style={{ background: "var(--success-soft)", color: "var(--success)" }}>
                  <CheckCircle2 size={15} />
                  {testResult.found} ofertas encontradas en {(testResult.ms / 1000).toFixed(1)} s
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={runStart}
              disabled={starting}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-[13.5px] font-bold text-primary-foreground disabled:opacity-70"
            >
              <Play size={15} />
              {starting ? "Iniciando…" : "Iniciar scraping"}
            </button>
          </div>

          <div className="rounded-xl bg-surface p-4 ring-1 ring-border">
            <h2 className="mb-1 text-sm font-semibold text-foreground">Resumen</h2>
            <dl className="grid grid-cols-2 gap-3 text-[12.5px]">
              <div>
                <dt className="text-faint">Ofertas capturadas</dt>
                <dd className="font-mono font-bold text-foreground">{fmtNumber(selected.offers)}</dd>
              </div>
              <div>
                <dt className="text-faint">Media diaria</dt>
                <dd className="font-mono font-bold text-foreground">{selected.dailyAvg}/día</dd>
              </div>
              <div>
                <dt className="text-faint">Cobertura</dt>
                <dd className="font-mono font-bold text-foreground">{selected.coverage.toFixed(1)}%</dd>
              </div>
              <div>
                <dt className="text-faint">Categorías</dt>
                <dd className="font-bold text-foreground">{selected.categoriesSynced ? "Sincronizadas" : "Pendiente"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-widest text-muted">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({ label, hint, on, onToggle }: { label: string; hint: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="mb-3 flex w-full items-center gap-2.5 rounded-lg bg-surface-raised px-3 py-2.5 text-left"
    >
      {on ? <ToggleRight size={20} className="flex-none text-primary" /> : <ToggleLeft size={20} className="flex-none text-faint" />}
      <div className="min-w-0">
        <div className="text-[12.5px] font-bold text-foreground">{label}</div>
        <div className="truncate text-[11px] text-faint">{hint}</div>
      </div>
    </button>
  );
}
