import { useState, useEffect } from "react";
import { getProducts as fetchProducts } from "@/lib/api/products";
import type { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();

      if (typeof window !== "undefined") {
        try {
          const extraRaw = window.sessionStorage.getItem("extraProducts") ?? "[]";
          const extraProducts = JSON.parse(extraRaw) as Product[];
          setProducts([...extraProducts, ...data]);
          return;
        } catch {
        }
      }

      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    setProducts,
    loading,
    error,
    refetch: loadProducts,
  };
}
