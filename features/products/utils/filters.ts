import { Product, FilterConfig } from "../types";

export function filterProducts(
  products: Product[],
  filters: FilterConfig
): Product[] {
  let filtered = [...products];

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    if (min !== undefined) {
      filtered = filtered.filter((p) => p.price >= min);
    }
    if (max !== undefined) {
      filtered = filtered.filter((p) => p.price <= max);
    }
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  return filtered;
}
