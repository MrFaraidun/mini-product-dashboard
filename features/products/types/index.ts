export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductInput = Omit<Product, "id">;

export type SortField = keyof Product;
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  category?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
  searchQuery?: string;
}
