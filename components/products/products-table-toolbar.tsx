"use client";

import { Table } from "@tanstack/react-table";
import { Product } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronDown, EyeOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductsTableToolbarProps {
  table: Table<Product>;
  categories: string[];
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  onBulkDelete: (selectedIds: number[], resetSelection: () => void) => void;
}

export function ProductsTableToolbar({
  table,
  categories,
  categoryFilter,
  onCategoryFilterChange,
  onBulkDelete,
}: ProductsTableToolbarProps) {
  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="px-2 py-1 text-sm border rounded-md bg-background"
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selectedRowsCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              const selectedRows = table.getFilteredSelectedRowModel().rows;
              const selectedIds = selectedRows.map((r) => r.original.id);
              const reset = () => table.resetRowSelection();

              onBulkDelete(selectedIds, reset);
            }}
            className="font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">Delete </span>
            {selectedRowsCount}{" "}
            <span className="hidden xs:inline">Selected</span>
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <EyeOff className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Columns</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="overflow-y-auto max-h-60">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
