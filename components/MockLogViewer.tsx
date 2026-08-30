import type { JobLogLine } from "@/data/mock-data";

export function MockLogViewer({
  title,
  lines,
  height = 320,
  live = false,
}: {
  title: string;
  lines: JobLogLine[];
  height?: number;
  live?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[12px] p-4"
      style={{ background: "var(--term-bg)", height }}
    >
      <div className="mb-3 flex items-center gap-[7px]">
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: "#f0605c" }} />
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: "#f5bd4f" }} />
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: "#3fd18a" }} />
        <span className="ml-2 text-[11px] font-semibold text-[#8b8b9e]">{title}</span>
      </div>
      <div className="flex flex-col gap-[2px] font-mono text-[11.6px] leading-[1.75]" style={{ color: "var(--term-text)" }}>
        {lines.map((l, i) => (
          <div key={i} className="flex gap-2">
            <span className="flex-none text-[#6b6b82]">›</span>
            <span>
              {l.tag && <span className="mr-1 flex-none text-primary">{l.tag}</span>}
              <span
                className={
                  l.kind === "ok"
                    ? "text-[#3fd18a]"
                    : l.kind === "error"
                      ? "text-[#f2606c]"
                      : l.kind === "muted"
                        ? "text-[#8b8b9e]"
                        : undefined
                }
              >
                {l.text}
              </span>
            </span>
          </div>
        ))}
        {live && (
          <div className="flex gap-2">
            <span className="flex-none text-[#6b6b82]">›</span>
            <span className="text-[#8b8b9e]">
              esperando siguiente línea<span className="cursor-blink" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
