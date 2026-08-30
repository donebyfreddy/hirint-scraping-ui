import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  variant = "suite",
  onRowClick,
}: {
  columns: Column<T>[];
  rows: T[];
  variant?: "suite" | "classic";
  onRowClick?: (row: T) => void;
}) {
  if (variant === "classic") {
    return (
      <div className="relative w-full overflow-x-auto rounded-xl ring-1 ring-border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b [&_tr]:border-border">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="h-10 whitespace-nowrap px-3 text-left align-middle text-xs font-medium text-muted-foreground"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-border transition-colors hover:bg-surface-raised",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-3 py-2.5 align-middle text-[13px]", c.className)}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[12px] border border-border">
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="whitespace-nowrap border-b border-border bg-surface-raised px-[13px] py-[11px] text-left text-[10.5px] font-bold uppercase tracking-[.05em] text-faint"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className={cn("[&:not(:last-child)]:border-b border-border hover:bg-surface-raised", onRowClick && "cursor-pointer")}
            >
              {columns.map((c) => (
                <td key={c.key} className={cn("whitespace-nowrap px-[13px] py-[11px] align-middle", c.className)}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
