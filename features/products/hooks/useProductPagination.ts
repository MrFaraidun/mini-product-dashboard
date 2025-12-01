import { useState, useMemo } from "react";
import { Product } from "../types";
import { paginateProducts } from "../utils/pagination";

export function useProductPagination(products: Product[], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = useMemo(() => {
    return paginateProducts(products, { currentPage, itemsPerPage });
  }, [products, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const maxPage = pagination.totalPages;
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (pagination.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [products.length]);

  return {
    ...pagination,
    currentPage,
    goToPage,
    nextPage,
    previousPage,
    itemsPerPage,
  };
}
