"use client";

import React, { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  onRowClick,
  searchable = false,
  searchPlaceholder = "Buscar registros...",
  searchFilter,
  emptyMessage = "No se encontraron registros.",
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(col.key);
      setSortAsc(true);
    }
  };

  // Filter rows
  let filteredRows = rows;
  if (searchable && searchQuery.trim() && searchFilter) {
    filteredRows = rows.filter((r) => searchFilter(r, searchQuery.trim()));
  }

  // Sort rows
  if (sortKey) {
    const col = columns.find((c) => c.key === sortKey);
    if (col && col.sortValue) {
      filteredRows = [...filteredRows].sort((a, b) => {
        const valA = col.sortValue!(a);
        const valB = col.sortValue!(b);
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {searchable && (
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-border bg-surface-raised py-1.5 pl-8 pr-3 text-[12.5px] text-foreground placeholder:text-faint focus:border-primary focus:outline-none"
            />
          </div>
          <span className="text-[12px] font-mono text-muted">
            {filteredRows.length} de {rows.length} registros
          </span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {columns.map((c) => (
                  <th
                    key={c.key}
                    onClick={() => handleSort(c)}
                    className={cn(
                      "whitespace-nowrap px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-wider text-faint",
                      c.sortable && "cursor-pointer select-none hover:text-foreground",
                      c.headerClassName
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{c.header}</span>
                      {c.sortable && (
                        <span className="text-muted">
                          {sortKey === c.key ? (
                            sortAsc ? <ArrowUp size={12} className="text-primary" /> : <ArrowDown size={12} className="text-primary" />
                          ) : (
                            <ArrowUpDown size={11} className="opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "transition-colors hover:bg-surface-raised/70",
                      onRowClick && "cursor-pointer"
                    )}
                  >
                    {columns.map((c) => (
                      <td key={c.key} className={cn("px-3.5 py-2.5 align-middle", c.className)}>
                        {c.render(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
