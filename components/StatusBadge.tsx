import { cn, toneVar, toneSoftVar, type Tone } from "@/lib/utils";

export function StatusBadge({
  tone,
  children,
  variant = "suite",
  dot = true,
}: {
  tone: Tone;
  children: React.ReactNode;
  variant?: "suite" | "classic";
  dot?: boolean;
}) {
  if (variant === "classic") {
    return (
      <span
        className="inline-flex h-5 w-fit shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
        style={{
          background: toneSoftVar[tone],
          color: toneVar[tone],
          borderColor: toneVar[tone] + "4d",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11.5px] font-bold"
      style={{ background: toneSoftVar[tone], color: toneVar[tone] }}
    >
      {dot && <span className="h-[7px] w-[7px] rounded-full" style={{ background: toneVar[tone] }} />}
      {children}
    </span>
  );
}

export function SeverityChip({ severity }: { severity: "Crítico" | "Alto" | "Medio" | "Info" }) {
  const map: Record<string, Tone> = { Crítico: "danger", Alto: "warning", Medio: "info", Info: "neutral" };
  const tone = map[severity];
  return (
    <span
      className="inline-flex items-center rounded-[6px] px-[9px] py-[3px] text-[10.5px] font-extrabold uppercase tracking-[.04em]"
      style={{ background: toneSoftVar[tone], color: toneVar[tone] }}
    >
      {severity}
    </span>
  );
}
