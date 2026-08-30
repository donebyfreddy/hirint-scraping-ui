"use client";

import React, { useState } from "react";
import {
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  X,
  ChevronDown,
  ChevronUp,
  Terminal,
  Activity,
} from "lucide-react";
import { useScraping } from "@/components/ScrapingContext";
import { fmtNumber } from "@/lib/utils";

export function RepairProgressBanner() {
  const { activeRepair, cancelRepair } = useScraping();
  const [expanded, setExpanded] = useState(false);

  if (!activeRepair) return null;

  const isRunning = activeRepair.status === "RUNNING";
  const isDone = activeRepair.status === "COMPLETED";

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[420px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl transition-all">
      {/* Header / Summary */}
      <div className="flex items-center justify-between bg-surface-raised px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {isRunning ? (
            <RotateCw size={16} className="flex-none animate-spin text-primary" />
          ) : (
            <CheckCircle2 size={16} className="flex-none text-success" />
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-bold text-foreground">
              {activeRepair.title}
            </div>
            <div className="truncate text-[11px] text-muted">
              {activeRepair.portalName} · {activeRepair.progress}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="rounded p-1 text-muted hover:bg-surface hover:text-foreground"
            aria-label="Expandir logs"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          <button
            type="button"
            onClick={cancelRepair}
            className="rounded p-1 text-muted hover:bg-surface hover:text-foreground"
            aria-label="Cerrar banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-surface-raised">
        <div
          className={`h-full transition-all duration-300 ${
            isDone ? "bg-success" : "bg-primary"
          }`}
          style={{ width: `${activeRepair.progress}%` }}
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2 bg-surface p-3 text-center text-[11.5px]">
        <div>
          <span className="text-muted">Procesadas:</span>
          <div className="font-mono font-bold text-foreground">
            {fmtNumber(activeRepair.processed)} / {fmtNumber(activeRepair.totalTarget)}
          </div>
        </div>
        <div>
          <span className="text-muted">Recuperadas:</span>
          <div className="font-mono font-bold text-success">
            +{fmtNumber(activeRepair.recovered)}
          </div>
        </div>
        <div>
          <span className="text-muted">Estado:</span>
          <div className={`font-bold ${isDone ? "text-success" : "text-primary"}`}>
            {isRunning ? "En progreso" : "Completado"}
          </div>
        </div>
      </div>

      {/* Expanded Live Logs */}
      {expanded && (
        <div className="max-h-48 overflow-y-auto border-t border-border bg-[#0d1117] p-3 font-mono text-[11px] text-[#c9d1d9]">
          {activeRepair.logs.map((log, i) => (
            <div key={i} className="py-0.5 text-[#7ee787]">
              &gt; {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
