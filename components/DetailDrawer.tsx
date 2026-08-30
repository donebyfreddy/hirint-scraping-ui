"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function DetailDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 480,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: number;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative flex h-full flex-col overflow-y-auto border-l border-border bg-surface shadow-2xl animate-fade"
        style={{ width: Math.min(width, 560) }}
      >
        <div className="sticky top-0 z-10 flex items-start gap-3 border-b border-border bg-surface px-5 py-4">
          <div className="min-w-0">
            <h3 className="text-[15px] font-extrabold text-foreground">{title}</h3>
            {subtitle && <p className="mt-0.5 text-[12px] font-semibold text-faint">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="ml-auto grid h-8 w-8 flex-none place-items-center rounded-control text-muted hover:bg-surface-raised hover:text-foreground"
          >
            <X size={17} />
          </button>
        </div>
        <div className="flex-1 px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
