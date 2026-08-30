"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Play,
  RotateCw,
  FileCode2,
  CheckCircle2,
  ExternalLink,
  Info,
  Clock,
} from "lucide-react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { SeverityBadge, RepairabilityBadge } from "@/components/StatusBadge";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber, fmtPct } from "@/lib/utils";
import { sampleJobOffers, type FindingDetail } from "@/data/mock-data";

interface FindingDetailDrawerProps {
  finding: FindingDetail | null;
  onClose: () => void;
}

export function FindingDetailDrawer({ finding, onClose }: FindingDetailDrawerProps) {
  const { startReanalysis, setSelectedOffer } = useScraping();
  const [activeTab, setActiveTab] = useState<"overview" | "affected" | "remediation">("overview");

  if (!finding) return null;

  const affectedOffers = sampleJobOffers.filter((o) => finding.affectedOfferIds?.includes(o.id));

  return (
    <DetailDrawer
      open={Boolean(finding)}
      onClose={onClose}
      title={finding.title}
      subtitle={`Fuente: ${finding.portalName} · Campo afectado: ${finding.problemField} · Detectado: ${finding.detectedAt}`}
      badge={<SeverityBadge severity={finding.severity} />}
      width={680}
    >
      {/* Sub Tabs */}
      <div className="mb-4 flex border-b border-border text-[13px] font-semibold">
        {[
          { id: "overview", label: "Evidencia & Causa" },
          { id: "affected", label: `Ofertas Afectadas (${fmtNumber(finding.affectedCount)})` },
          { id: "remediation", label: "Plan de Reparación" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`border-b-2 px-3.5 py-2.5 transition-colors ${
              activeTab === t.id
                ? "border-primary font-bold text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Métrica Actual</span>
              <div className="mt-1 font-mono text-[20px] font-bold text-danger">{finding.currentMetric}</div>
              <span className="text-[11px] text-faint">Valor observado</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Umbral Esperado</span>
              <div className="mt-1 font-mono text-[20px] font-bold text-success">{finding.expectedThreshold}</div>
              <span className="text-[11px] text-faint">Límite de control</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-raised p-3.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-muted">Afectadas</span>
              <div className="mt-1 font-mono text-[20px] font-bold text-foreground">
                {fmtNumber(finding.affectedCount)}
              </div>
              <span className="text-[11px] text-faint">{finding.affectedPercent}% del lote</span>
            </div>
          </div>

          {/* Repairability Status */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-foreground">Estrategia de Reparación</span>
              <RepairabilityBadge type={finding.repairability} />
            </div>
            <p className="mt-2 text-[12.5px] text-muted">{finding.repairExplanation}</p>
          </div>

          {/* Detailed Evidence */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="text-[13px] font-bold text-foreground flex items-center gap-1.5">
              <FileCode2 size={15} className="text-primary" /> Evidencia Técnica & Logs de Detección
            </h4>
            <div className="mt-2 rounded-lg bg-surface-raised p-3 font-mono text-[12px] leading-relaxed text-foreground border border-border">
              {finding.evidence}
            </div>
          </div>

          {/* Generic Action Trigger */}
          <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[13.5px] font-bold text-primary">Acción de Reparación Recomendada</h4>
                <p className="text-[12px] text-muted">
                  Ejecuta un worker determinista para reanalizar o rescrapear los registros afectados sin duplicar IDs.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startReanalysis(finding)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[13.5px] font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-transform active:scale-[0.99]"
            >
              <RotateCw size={15} />
              Reanalizar / Rescrapear Registros Afectados ({fmtNumber(finding.affectedCount)})
            </button>
          </div>
        </div>
      )}

      {/* Affected Records Tab */}
      {activeTab === "affected" && (
        <div className="flex flex-col gap-3">
          <div className="text-[12px] text-muted">
            Muestra representativa de ofertas impactadas en <span className="font-bold text-foreground">{finding.portalName}</span>:
          </div>

          <div className="flex flex-col gap-2">
            {affectedOffers.map((off) => (
              <div
                key={off.id}
                onClick={() => {
                  onClose();
                  setSelectedOffer(off);
                }}
                className="cursor-pointer rounded-xl border border-border bg-surface p-3.5 transition-all hover:border-primary/40 hover:bg-surface-raised"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-foreground text-[13px]">{off.title}</div>
                  <span className="font-mono text-[11px] text-muted">{off.sourceJobId}</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[11.5px] text-muted">
                  <span>{off.company}</span>
                  <span>·</span>
                  <span>{off.city || "Sin ciudad"}</span>
                  <span>·</span>
                  <span className="text-danger font-semibold">Campo {finding.problemField}: null</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remediation Tab */}
      {activeTab === "remediation" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="text-[13px] font-bold text-foreground">Procedimiento de Resolución</h4>
            <ol className="mt-2 list-decimal space-y-2 pl-4 text-[12.5px] text-muted">
              <li>
                <strong className="text-foreground">Inspección de snapshot:</strong> Comprobar si el selector CSS o JSON path en el parser de {finding.portalName} cambió recientemente.
              </li>
              <li>
                <strong className="text-foreground">Prueba dry-run:</strong> Ejecutar una prueba con 10 ofertas usando el nuevo selector.
              </li>
              <li>
                <strong className="text-foreground">Reanálisis masivo:</strong> Pulsar el botón de Reanálisis para actualizar las {fmtNumber(finding.affectedCount)} ofertas históricas sin descargar el HTML nuevamente (si está en caché).
              </li>
              <li>
                <strong className="text-foreground">Verificación de Censo:</strong> Validar que la cobertura del campo suba por encima del {finding.expectedThreshold}.
              </li>
            </ol>
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
