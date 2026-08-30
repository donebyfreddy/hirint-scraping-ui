"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type {
  PortalStatus,
  CatalogueCompleteness,
  FindingSeverity,
  RepairabilityType,
} from "@/data/mock-data";

export type StatusTone = "success" | "warning" | "info" | "danger" | "neutral" | "accent";

interface StatusBadgeProps {
  tone?: StatusTone;
  children: React.ReactNode;
  variant?: "default" | "dot" | "pill" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const TONE_CLASSES: Record<StatusTone, { bg: string; text: string; border: string; dot: string }> = {
  success: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/25",
    dot: "bg-success",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/25",
    dot: "bg-warning",
  },
  info: {
    bg: "bg-info/10",
    text: "text-info",
    border: "border-info/25",
    dot: "bg-info",
  },
  danger: {
    bg: "bg-danger/10",
    text: "text-danger",
    border: "border-danger/25",
    dot: "bg-danger",
  },
  accent: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/25",
    dot: "bg-primary",
  },
  neutral: {
    bg: "bg-surface-raised",
    text: "text-muted",
    border: "border-border-strong",
    dot: "bg-faint",
  },
};

export function StatusBadge({
  tone = "neutral",
  children,
  variant = "default",
  size = "md",
  className,
  onClick,
}: StatusBadgeProps) {
  const styles = TONE_CLASSES[tone];
  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-1.5 py-0.5 leading-none"
      : size === "lg"
        ? "text-[13px] px-3 py-1 font-bold"
        : "text-[11.5px] px-2 py-0.5 font-semibold";

  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border tracking-tight transition-colors",
        styles.bg,
        styles.text,
        styles.border,
        sizeClasses,
        onClick && "cursor-pointer hover:brightness-110",
        className
      )}
    >
      {(variant === "dot" || tone === "success" || tone === "danger" || tone === "warning") && (
        <span className={cn("h-1.5 w-1.5 flex-none rounded-full", styles.dot)} />
      )}
      <span>{children}</span>
    </span>
  );
}

// Dedicated helper badge for Portal Statuses
export function PortalStatusBadge({ status }: { status: PortalStatus }) {
  switch (status) {
    case "healthy":
      return <StatusBadge tone="success">Al día · Healthy</StatusBadge>;
    case "running":
      return <StatusBadge tone="info">Ejecutándose</StatusBadge>;
    case "warning":
      return <StatusBadge tone="warning">Con avisos</StatusBadge>;
    case "partial":
      return <StatusBadge tone="warning">Catálogo parcial</StatusBadge>;
    case "blocked":
      return <StatusBadge tone="danger">Bloqueado (403/WAF)</StatusBadge>;
    case "failed":
      return <StatusBadge tone="danger">Fallido</StatusBadge>;
    case "disabled":
      return <StatusBadge tone="neutral">Desactivado</StatusBadge>;
    default:
      return <StatusBadge tone="neutral">{status}</StatusBadge>;
  }
}

// Dedicated helper badge for Catalogue Completeness
export function CatalogueStatusBadge({ status, note }: { status: CatalogueCompleteness; note?: string }) {
  switch (status) {
    case "FULL_CATALOG_VERIFIED":
      return (
        <StatusBadge tone="success" size="sm" title={note}>
          Censo Completo Verificado
        </StatusBadge>
      );
    case "PARTIAL_CATALOG":
      return (
        <StatusBadge tone="warning" size="sm" title={note}>
          Catálogo Parcial
        </StatusBadge>
      );
    case "RESULT_CAP":
      return (
        <StatusBadge tone="warning" size="sm" title={note}>
          Límite Resultados (Cap)
        </StatusBadge>
      );
    case "INCREMENTAL":
      return (
        <StatusBadge tone="info" size="sm" title={note}>
          Incremental Diario
        </StatusBadge>
      );
    case "BLOCKED":
      return (
        <StatusBadge tone="danger" size="sm" title={note}>
          Bloqueo WAF
        </StatusBadge>
      );
    case "TOTAL_UNKNOWN":
      return (
        <StatusBadge tone="neutral" size="sm" title={note}>
          Total No Verificable
        </StatusBadge>
      );
    default:
      return (
        <StatusBadge tone="neutral" size="sm">
          No Verificado
        </StatusBadge>
      );
  }
}

// Dedicated badge for Finding Severity
export function SeverityBadge({ severity }: { severity: FindingSeverity }) {
  switch (severity) {
    case "CRITICAL":
      return <StatusBadge tone="danger">Crítico</StatusBadge>;
    case "HIGH":
      return <StatusBadge tone="warning">Alto</StatusBadge>;
    case "MEDIUM":
      return <StatusBadge tone="warning">Medio</StatusBadge>;
    case "INFO":
      return <StatusBadge tone="info">Informativo</StatusBadge>;
    default:
      return <StatusBadge tone="neutral">{severity}</StatusBadge>;
  }
}

// Dedicated badge for Repairability
export function RepairabilityBadge({ type }: { type: RepairabilityType }) {
  switch (type) {
    case "RESCRAPE":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-primary/15 px-2 py-0.5 font-mono text-[10.5px] font-bold text-primary">
          ⚡ Rescrape / Reanálisis
        </span>
      );
    case "AUTO":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-success/15 px-2 py-0.5 font-mono text-[10.5px] font-bold text-success">
          ✨ Auto-Reparable
        </span>
      );
    case "MANUAL":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-warning/15 px-2 py-0.5 font-mono text-[10.5px] font-bold text-warning">
          🛠️ Ajuste Manual Config
        </span>
      );
    case "NOT_REPAIRABLE":
      return (
        <span className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-0.5 font-mono text-[10.5px] font-bold text-faint">
          🚫 Ausente en Fuente
        </span>
      );
    default:
      return null;
  }
}

// Backward-compatible alias for existing imports
export const SeverityChip = ({ severity }: { severity: string }) => {
  if (severity === "Crítico" || severity === "CRITICAL") return <StatusBadge tone="danger">Crítico</StatusBadge>;
  if (severity === "Alto" || severity === "HIGH") return <StatusBadge tone="warning">Alto</StatusBadge>;
  if (severity === "Medio" || severity === "MEDIUM") return <StatusBadge tone="warning">Medio</StatusBadge>;
  return <StatusBadge tone="info">Informativo</StatusBadge>;
};
