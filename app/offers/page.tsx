"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Code2,
  Download,
  RotateCw,
  Building,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber } from "@/lib/utils";
import { sampleJobOffers, type JobOfferRecord, portals } from "@/data/mock-data";

export default function OffersPage() {
  const { setSelectedOffer, openPortalById, showToast } = useScraping();

  const [search, setSearch] = useState("");
  const [selectedPortal, setSelectedPortal] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>("ALL");

  const filteredOffers = sampleJobOffers.filter((offer) => {
    if (selectedPortal !== "ALL" && offer.portalId !== selectedPortal) return false;
    if (selectedStatus !== "ALL" && offer.status !== selectedStatus) return false;
    if (selectedWorkMode !== "ALL" && offer.workMode !== selectedWorkMode) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        offer.title.toLowerCase().includes(q) ||
        offer.company.toLowerCase().includes(q) ||
        offer.sourceJobId.toLowerCase().includes(q) ||
        offer.location.toLowerCase().includes(q)
      );
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
              Ofertas de Empleo Ingestadas
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              {sampleJobOffers.length} registros en memoria
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Inspección granular de fichas de empleo, trazabilidad de identificadores nativos (`source_job_id`) y rescrapeo individual.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => showToast("Exportando ofertas filtradas en formato JSONL...", "success")}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-[12.5px] font-bold text-foreground hover:bg-surface-raised transition-colors"
          >
            <Download size={13} /> Exportar JSONL
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-3 shadow-2xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Buscar por título, empresa, ID nativo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Portal select */}
          <select
            value={selectedPortal}
            onChange={(e) => setSelectedPortal(e.target.value)}
            className="rounded-lg border border-border bg-surface-raised px-2.5 py-1.5 text-[12px] font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="ALL">Todos los portales</option>
            {portals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.countryFlag} {p.name}
              </option>
            ))}
          </select>

          {/* Status select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-border bg-surface-raised px-2.5 py-1.5 text-[12px] font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="ALL">Todos los estados</option>
            <option value="COMPLETE">Completas (COMPLETE)</option>
            <option value="REVIEW">En Revisión (REVIEW)</option>
            <option value="DEFECTIVE">Defectuosas (DEFECTIVE)</option>
          </select>

          {/* WorkMode select */}
          <select
            value={selectedWorkMode}
            onChange={(e) => setSelectedWorkMode(e.target.value)}
            className="rounded-lg border border-border bg-surface-raised px-2.5 py-1.5 text-[12px] font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="ALL">Toda modalidad</option>
            <option value="Remoto">100% Remoto</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Presencial">Presencial</option>
          </select>
        </div>
      </div>

      {/* Offers Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
              <tr>
                <th className="px-4 py-3">Puesto & Empresa</th>
                <th className="px-4 py-3">ID Nativo (source_job_id)</th>
                <th className="px-4 py-3">Portal / Origen</th>
                <th className="px-4 py-3">Ubicación & Modalidad</th>
                <th className="px-4 py-3">Salario Declarado</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOffers.map((offer) => (
                <tr
                  key={offer.id}
                  onClick={() => setSelectedOffer(offer)}
                  className="cursor-pointer transition-colors hover:bg-surface-raised/70"
                >
                  <td className="px-4 py-3">
                    <div className="font-bold text-foreground hover:text-primary transition-colors">
                      {offer.title}
                    </div>
                    <div className="text-[11px] text-muted flex items-center gap-1.5">
                      <Building size={11} className="text-faint" />
                      <span>{offer.company}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 font-mono font-bold text-primary text-[12px]">
                    {offer.sourceJobId}
                  </td>

                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground">{offer.portalName}</span>
                    <div className="text-[10.5px] text-muted">{offer.country}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-foreground">{offer.location}</div>
                    <div className="text-[10.5px] text-muted font-medium">{offer.workMode}</div>
                  </td>

                  <td className="px-4 py-3 font-mono">
                    <span className="text-foreground font-semibold">{offer.salary}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                        offer.status === "COMPLETE"
                          ? "bg-success/15 text-success"
                          : offer.status === "REVIEW"
                            ? "bg-warning/15 text-warning"
                            : "bg-danger/15 text-danger"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOffer(offer);
                      }}
                      className="rounded bg-surface-raised px-2.5 py-1 text-[11px] font-semibold text-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Ficha
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
