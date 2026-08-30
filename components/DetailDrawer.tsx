"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  width?: number | string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function DetailDrawer({
  open,
  onClose,
  title,
  subtitle,
  badge,
  width = 560,
  actions,
  children,
}: DetailDrawerProps) {
  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200"
      />

      {/* Drawer Body */}
      <aside
        style={{ width: typeof width === "number" ? `${width}px` : width }}
        className={cn(
          "relative z-10 flex h-full max-w-full flex-col border-l border-border bg-surface shadow-2xl transition-transform duration-200 animate-in slide-in-from-right"
        )}
      >
        {/* Header */}
        <div className="flex flex-none items-start justify-between gap-4 border-b border-border bg-surface px-6 py-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <h2 className="truncate text-[16px] font-bold text-foreground">{title}</h2>
              {badge}
            </div>
            {subtitle && <p className="mt-0.5 truncate text-[12px] text-muted">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            {actions}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
              aria-label="Cerrar panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </aside>
    </div>
  );
}
