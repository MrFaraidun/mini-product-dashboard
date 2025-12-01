import { useState, useMemo } from "react";
import { Product, SortConfig } from "../types";
import { sortProducts } from "../utils/sort";

export function useProductSort(products: Product[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortConfig);
  }, [products, sortConfig]);

  const handleSort = (field: SortConfig["field"]) => {
    setSortConfig((prev) => {
      if (prev?.field === field) {
        return {
          field,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { field, direction: "asc" };
    });
  };

  const clearSort = () => {
    setSortConfig(null);
  };

  return {
    sortConfig,
    sortedProducts,
    handleSort,
    clearSort,
  };
}
