import { useState, useMemo } from "react";
import { Product, FilterConfig } from "../types";
import { filterProducts } from "../utils/filters";

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterConfig>({});

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  const updateFilter = <K extends keyof FilterConfig>(
    key: K,
    value: FilterConfig[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    filters,
    filteredProducts,
    updateFilter,
    clearFilters,
  };
}
