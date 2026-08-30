import { fmtNumber } from "@/lib/utils";

export function ProgressCard({ processed, total, progress }: { processed: number; total: number; progress: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[12px] font-semibold text-muted">
        <span>
          {fmtNumber(processed)} / {fmtNumber(total)} procesadas
        </span>
        <span className="font-mono font-bold tabular-nums text-foreground">{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-raised ring-1 ring-border">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}
