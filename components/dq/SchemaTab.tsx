import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { schemaFields, type SchemaField } from "@/data/mock-data";
import { fmtPct } from "@/lib/utils";

export function SchemaTab() {
  const rows = schemaFields.map((f) => ({ ...f, id: f.name }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: "name", header: "Campo", render: (r) => <span className="font-mono font-bold text-foreground">{r.name}</span> },
    { key: "type", header: "Tipo", render: (r) => <span className="font-mono text-muted">{r.type}</span> },
    {
      key: "required",
      header: "Obligatorio",
      render: (r) => (r.required ? <StatusBadge tone="accent">Sí</StatusBadge> : <StatusBadge tone="neutral">No</StatusBadge>),
    },
    { key: "description", header: "Descripción", render: (r) => <span className="whitespace-normal text-muted">{r.description}</span> },
    {
      key: "coverage",
      header: "Cobertura global",
      className: "font-mono tabular-nums",
      render: (r) => (
        <span style={{ color: r.globalCoverage >= 90 ? "var(--success)" : r.globalCoverage >= 70 ? "var(--warning)" : "var(--danger)" }}>
          {fmtPct(r.globalCoverage)}
        </span>
      ),
    },
  ];

  return (
    <div className="rounded-card border border-border bg-surface p-[18px] shadow-subtle">
      <div className="mb-4">
        <h2 className="text-[15px] font-extrabold text-foreground">Esquema de datos</h2>
        <span className="text-[12px] font-semibold text-faint">Diccionario de campos normalizados en job_offers</span>
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
