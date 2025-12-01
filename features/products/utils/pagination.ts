import { Product } from "../types";

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
}

export function paginateProducts(
  products: Product[],
  config: PaginationConfig
) {
  const { currentPage, itemsPerPage } = config;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return {
    paginatedProducts,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
