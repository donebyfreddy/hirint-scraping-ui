"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral" | "accent";
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  onClick?: () => void;
  clickableHint?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  sub,
  accent,
  tone,
  icon,
  trend,
  onClick,
  clickableHint,
  className,
}: MetricCardProps) {
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-surface p-4 transition-all duration-150",
        isClickable
          ? "cursor-pointer hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-raised/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40"
          : "",
        className
      )}
    >
      {/* Top row: Label & Icon / Drilldown indicator */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11.5px] font-semibold uppercase tracking-wider text-muted group-hover:text-foreground">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {icon && <span className="text-muted group-hover:text-primary">{icon}</span>}
          {isClickable && (
            <ArrowUpRight
              size={14}
              className="text-faint opacity-40 transition-opacity group-hover:text-primary group-hover:opacity-100"
            />
          )}
        </div>
      </div>

      {/* Main value */}
      <div className="my-2 flex items-baseline gap-2">
        <span
          className="font-mono text-[24px] font-bold tracking-tight tabular-nums text-foreground sm:text-[26px]"
          style={accent ? { color: accent } : tone ? { color: `var(--${tone})` } : undefined}
        >
          {value}
        </span>

        {trend && (
          <span
            className={cn(
              "font-mono text-[11.5px] font-semibold tabular-nums",
              trend.isPositive ? "text-success" : "text-danger"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      {/* Bottom Subtext / Helper */}
      {(sub || clickableHint) && (
        <div className="flex items-center justify-between text-[11.5px] leading-tight">
          {sub && <span className="text-muted">{sub}</span>}
          {clickableHint && isClickable && (
            <span className="ml-auto font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              {clickableHint} →
            </span>
          )}
        </div>
      )}
    </div>
  );
}
