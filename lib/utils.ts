export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** es-ES number formatting: 164192 -> "164.192" */
export function fmtNumber(n: number): string {
  return new Intl.NumberFormat("es-ES").format(n);
}

/** es-ES percentage formatting: 87.2 -> "87,2%" */
export function fmtPct(n: number, digits = 1): string {
  return `${n.toLocaleString("es-ES", { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
}

/** es-ES currency formatting: 45000 -> "45.000 €" */
export function fmtCurrency(amount: number, currency = "EUR"): string {
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency || "EUR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${fmtNumber(amount)} ${currency}`;
  }
}

export type Tone = "success" | "warning" | "info" | "danger" | "accent" | "neutral";

export const toneVar: Record<Tone, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--info)",
  danger: "var(--danger)",
  accent: "var(--primary)",
  neutral: "var(--muted)",
};

export const toneSoftVar: Record<Tone, string> = {
  success: "var(--success-soft)",
  warning: "var(--warning-soft)",
  info: "var(--info-soft)",
  danger: "var(--danger-soft)",
  accent: "var(--primary-soft)",
  neutral: "var(--surface-raised)",
};
