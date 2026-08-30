"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Building,
  ExternalLink,
  Code2,
  RotateCw,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { DetailDrawer } from "@/components/DetailDrawer";
import { useScraping } from "@/components/ScrapingContext";
import { fmtCurrency } from "@/lib/utils";
import type { JobOfferRecord } from "@/data/mock-data";

interface OfferDetailDrawerProps {
  offer: JobOfferRecord | null;
  onClose: () => void;
}

export function OfferDetailDrawer({ offer, onClose }: OfferDetailDrawerProps) {
  const { showToast, openPortalById } = useScraping();
  const [viewJson, setViewJson] = useState(false);
  const [isRescraping, setIsRescraping] = useState(false);

  if (!offer) return null;

  const handleRescrapeSingle = () => {
    setIsRescraping(true);
    showToast(`Rescrapeando oferta ${offer.sourceJobId} desde ${offer.portalName}…`, "info");
    window.setTimeout(() => {
      setIsRescraping(false);
      showToast(`✅ Oferta ${offer.sourceJobId} actualizada con snapshot en vivo`, "success");
    }, 1200);
  };

  return (
    <DetailDrawer
      open={Boolean(offer)}
      onClose={onClose}
      title={offer.title}
      subtitle={`${offer.company} · ${offer.city || "Sin ciudad"}, ${offer.country} · Fuente: ${offer.portalName}`}
      badge={
        <span
          className={`rounded px-2 py-0.5 font-mono text-[10.5px] font-bold ${
            offer.status === "ACTIVE"
              ? "bg-success/15 text-success"
              : offer.status === "EXPIRED"
                ? "bg-muted/15 text-muted"
                : "bg-danger/15 text-danger"
          }`}
        >
          {offer.status}
        </span>
      }
      width={700}
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewJson(!viewJson)}
            className="flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-[11.5px] font-bold text-foreground hover:bg-surface-raised"
          >
            <Code2 size={13} /> {viewJson ? "Ver Ficha" : "Ver JSON"}
          </button>
          <a
            href={offer.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 text-[11.5px] font-bold text-primary hover:text-primary/80"
          >
            <ExternalLink size={13} /> Fuente Original
          </a>
        </div>
      }
    >
      {viewJson ? (
        <div className="rounded-xl border border-border bg-[#0d1117] p-4 font-mono text-[12px] text-[#e6edf3]">
          <pre className="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(offer, null, 2)}</pre>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Identity & Source Banner */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="grid grid-cols-2 gap-3 text-[12.5px] sm:grid-cols-4">
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted">ID Nativo Fuente</span>
                <div className="font-mono font-bold text-primary">{offer.sourceJobId}</div>
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted">Portal</span>
                <div className="font-semibold text-foreground">{offer.portalName}</div>
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted">País & Región</span>
                <div className="font-semibold text-foreground">{offer.country} · {offer.region || "N/A"}</div>
              </div>
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted">Modalidad</span>
                <div className="font-semibold text-foreground">{offer.workplaceType || "No declarada"}</div>
              </div>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Compensation & Contract */}
            <div className="rounded-xl border border-border bg-surface p-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-faint mb-3 flex items-center gap-1.5">
                <DollarSign size={14} className="text-primary" /> Compensación & Contrato
              </h4>
              <div className="space-y-2 text-[12.5px]">
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="text-muted">Salario mínimo:</span>
                  <span className="font-mono font-semibold text-foreground">
                    {offer.salaryMin ? fmtCurrency(offer.salaryMin, offer.salaryCurrency) : "No informado"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="text-muted">Salario máximo:</span>
                  <span className="font-mono font-semibold text-foreground">
                    {offer.salaryMax ? fmtCurrency(offer.salaryMax, offer.salaryCurrency) : "No informado"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="text-muted">Periodo salarial:</span>
                  <span className="font-semibold text-foreground">{offer.salaryPeriod || "Anual"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tipo de contrato:</span>
                  <span className="font-semibold text-foreground">{offer.contractType || "Indefinido"}</span>
                </div>
              </div>
            </div>

            {/* Timestamps & Lifecycle */}
            <div className="rounded-xl border border-border bg-surface p-4">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-faint mb-3 flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" /> Ciclo de Vida & Fechas
              </h4>
              <div className="space-y-2 text-[12.5px]">
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="text-muted">Publicada en origen:</span>
                  <span className="font-mono font-semibold text-foreground">{offer.publishedAt}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="text-muted">Ingestada en Hirint:</span>
                  <span className="font-mono font-semibold text-foreground">{offer.ingestedAt}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="text-muted">Última verificación:</span>
                  <span className="font-mono font-semibold text-foreground">{offer.lastSeenAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Categoría mapeada:</span>
                  <span className="font-semibold text-foreground">{offer.category || "General"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-faint mb-2">
              Descripción Completa del Puesto
            </h4>
            <div className="max-h-60 overflow-y-auto whitespace-pre-wrap rounded-lg bg-surface-raised p-3 text-[12.5px] leading-relaxed text-foreground border border-border">
              {offer.description || "Sin descripción disponible."}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRescrapeSingle}
              disabled={isRescraping}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-[13px] font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              <RotateCw size={14} />
              {isRescraping ? "Rescrapeando..." : "Rescrapear Oferta Individual"}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                openPortalById(offer.portalId);
              }}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-[13px] font-bold text-foreground hover:bg-surface-raised"
            >
              Ver Portal Completo
            </button>
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
