import { useState, useCallback } from "react";
import { Product, ProductInput } from "../types";
import { updateProduct } from "@/lib/api/products";
import { toast } from "sonner";

export function useProductEdit(
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const startEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }, []);

  const saveEdit = useCallback(
    async (updatedData: ProductInput) => {
      if (!editingProduct) return;

      try {
        setIsUpdating(true);
        const updated = await updateProduct(editingProduct.id, updatedData);

        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );

        if (typeof window !== "undefined") {
          try {
            const extraRaw = window.sessionStorage.getItem("extraProducts") ?? "[]";
            const extraProducts = JSON.parse(extraRaw) as Product[];
            const updatedExtras = extraProducts.map((p) =>
              p.id === updated.id ? updated : p
            );
            window.sessionStorage.setItem("extraProducts", JSON.stringify(updatedExtras));
          } catch {
          }
        }

        toast.success("Product updated");
        setIsDialogOpen(false);
        setEditingProduct(null);
      } catch (error) {
        toast.error("Failed to update product");
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [editingProduct, setProducts]
  );

  return {
    editingProduct,
    isDialogOpen,
    isUpdating,
    startEdit,
    saveEdit,
    setIsDialogOpen,
  };
}
