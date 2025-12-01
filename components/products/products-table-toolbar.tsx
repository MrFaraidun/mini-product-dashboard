"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";

interface ProductsTableToolbarProps {
  onSearchChange: (query: string) => void;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

export function ProductsTableToolbar({
  onSearchChange,
  categories,
  onCategoryChange,
  onClearFilters,
  onBulkDelete,
  selectedCount,
}: ProductsTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Input
          placeholder="Search products..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Category:</span>
          <select
            onChange={(e) => onCategoryChange(e.target.value)}
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

        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full sm:w-auto"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            className="font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">Delete </span>
            {selectedCount}{" "}
            <span className="hidden xs:inline">Selected</span>
          </Button>
        )}
      </div>
    </div>
  );
}
