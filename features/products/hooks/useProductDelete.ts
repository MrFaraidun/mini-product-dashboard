import { useState, useCallback } from "react";
import { Product } from "../types";
import { deleteProduct } from "@/lib/api/products";
import { toast } from "sonner";

export function useProductDelete(
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) {
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productsToDelete, setProductsToDelete] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const startDelete = useCallback((productId: number) => {
    setProductToDelete(productId);
    setProductsToDelete([]);
    setIsBulkDelete(false);
    setIsDialogOpen(true);
  }, []);

  const startBulkDelete = useCallback((productIds: number[]) => {
    setProductsToDelete(productIds);
    setProductToDelete(null);
    setIsBulkDelete(true);
    setIsDialogOpen(true);
  }, []);

  const cancelDelete = useCallback(() => {
    setProductToDelete(null);
    setProductsToDelete([]);
    setIsDialogOpen(false);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      setIsDeleting(true);

      if (isBulkDelete && productsToDelete.length > 0) {
        await Promise.all(productsToDelete.map((id) => deleteProduct(id)));

        setProducts((prev) =>
          prev.filter((p) => !productsToDelete.includes(p.id))
        );

        if (typeof window !== "undefined") {
          try {
            const extraRaw =
              window.sessionStorage.getItem("extraProducts") ?? "[]";
            const extraProducts = JSON.parse(extraRaw) as Product[];
            const updatedExtras = extraProducts.filter(
              (p) => !productsToDelete.includes(p.id)
            );
            window.sessionStorage.setItem(
              "extraProducts",
              JSON.stringify(updatedExtras)
            );
          } catch {
          }
        }

        toast.success(`${productsToDelete.length} product(s) deleted`);
      } else if (productToDelete !== null) {
        await deleteProduct(productToDelete);

        setProducts((prev) => prev.filter((p) => p.id !== productToDelete));

        if (typeof window !== "undefined") {
          try {
            const extraRaw =
              window.sessionStorage.getItem("extraProducts") ?? "[]";
            const extraProducts = JSON.parse(extraRaw) as Product[];
            const updatedExtras = extraProducts.filter(
              (p) => p.id !== productToDelete
            );
            window.sessionStorage.setItem(
              "extraProducts",
              JSON.stringify(updatedExtras)
            );
          } catch {
          }
        }

        toast.success("Product deleted successfully");
      }

      setIsDialogOpen(false);
      setProductToDelete(null);
      setProductsToDelete([]);
    } catch (error) {
      toast.error("Failed to delete product(s)");
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [isBulkDelete, productToDelete, productsToDelete, setProducts]);

  return {
    productToDelete,
    productsToDelete,
    isDialogOpen,
    isDeleting,
    isBulkDelete,
    startDelete,
    startBulkDelete,
    cancelDelete,
    confirmDelete,
    setIsDialogOpen,
  };
}
