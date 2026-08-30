"use client";

import React, { useState } from "react";
import {
  Download,
  FileText,
  FileCode2,
  Database,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Filter,
  Plus,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber } from "@/lib/utils";
import { exportJobsList, portals, type ExportJobRecord } from "@/data/mock-data";

export default function ExportacionesPage() {
  const { showToast } = useScraping();
  const [selectedFormat, setSelectedFormat] = useState<"CSV" | "JSONL" | "PARQUET">("CSV");
  const [selectedPortal, setSelectedPortal] = useState<string>("ALL");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateExport = () => {
    setIsGenerating(true);
    showToast(`Generando exportación ${selectedFormat} para ${selectedPortal === "ALL" ? "todas las fuentes" : selectedPortal}...`, "info");
    window.setTimeout(() => {
      setIsGenerating(false);
      showToast(`✅ Exportación ${selectedFormat} generada con éxito · Descarga iniciada`, "success");
    }, 1600);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-extrabold tracking-tight text-foreground sm:text-[24px]">
              Exportaciones & Entrega de Datos
            </h1>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
              CSV · JSONL · Parquet
            </span>
          </div>
          <p className="mt-1 text-[13px] text-muted">
            Generador de volcados de base de datos con filtrado por fuente, esquema normalizado y descargas históricas.
          </p>
        </div>
      </div>

      {/* Generator Configuration Card */}
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
        <h2 className="text-[15px] font-bold text-foreground mb-4">Configurar Nueva Exportación</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Format selector */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Formato de Salida
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["CSV", "JSONL", "PARQUET"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`rounded-xl border py-2.5 font-mono text-[12.5px] font-bold transition-all ${
                    selectedFormat === fmt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface-raised text-muted hover:text-foreground"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Portal scope */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Alcance de Fuentes
            </label>
            <select
              value={selectedPortal}
              onChange={(e) => setSelectedPortal(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-raised px-3 py-2.5 text-[13px] font-medium text-foreground focus:border-primary focus:outline-none"
            >
              <option value="ALL">Todas las fuentes (1.289.450 ofertas)</option>
              {portals.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.countryFlag} {p.name} ({fmtNumber(p.offers)} ofertas)
                </option>
              ))}
            </select>
          </div>

          {/* Date range */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Ventana Temporal
            </label>
            <select className="w-full rounded-xl border border-border bg-surface-raised px-3 py-2.5 text-[13px] font-medium text-foreground focus:border-primary focus:outline-none">
              <option>Catálogo Completo Activo</option>
              <option>Últimas 24 horas (Incremental)</option>
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleGenerateExport}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-transform active:scale-[0.99] disabled:opacity-60"
          >
            <Download size={15} />
            {isGenerating ? "Generando fichero..." : `Generar y Descargar ${selectedFormat}`}
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[14px] font-bold text-foreground">Historial de Exportaciones Generadas</h3>

        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead className="border-b border-border bg-surface-raised text-[10.5px] font-bold uppercase tracking-wider text-faint">
                <tr>
                  <th className="px-4 py-3">Nombre del Archivo</th>
                  <th className="px-4 py-3">Formato</th>
                  <th className="px-4 py-3">Fuentes Incluidas</th>
                  <th className="px-4 py-3 text-right">Registros</th>
                  <th className="px-4 py-3 text-right">Tamaño</th>
                  <th className="px-4 py-3">Fecha de Creación</th>
                  <th className="px-4 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {exportJobsList.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-foreground flex items-center gap-2">
                      <FileText size={15} className="text-primary" />
                      <span>{job.fileName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[10.5px] font-bold text-foreground">
                        {job.format}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{job.portalScope}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-foreground">
                      {fmtNumber(job.recordsCount)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted">{job.fileSizeBytes}</td>
                    <td className="px-4 py-3 text-muted">{job.createdAt}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => showToast(`Iniciando descarga de ${job.fileName}…`, "success")}
                        className="inline-flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 text-[11.5px] font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Download size={12} /> Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
