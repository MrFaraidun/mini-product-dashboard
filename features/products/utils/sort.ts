import { Product, SortConfig } from "../types";

export function sortProducts(
  products: Product[],
  sortConfig: SortConfig | null
): Product[] {
  if (!sortConfig) return products;

  const sorted = [...products].sort((a, b) => {
    const aVal = a[sortConfig.field];
    const bVal = b[sortConfig.field];

    if (typeof aVal === "string" && typeof bVal === "string") {
      const comparison = aVal.localeCompare(bVal);
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return sorted;
}
