"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Product } from "@/lib/api/products";
import { getProducts } from "@/lib/api/products";
import { ProductsTable } from "./products-table";
import { ProductsToolbar } from "./products-toolbar";
import { EditProductDialog } from "./edit-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [resetSelection, setResetSelection] = useState<() => void>(() => {});
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    getProducts()
      .then((data) => {
        if (typeof window !== "undefined") {
          try {
            const extraRaw =
              window.sessionStorage.getItem("extraProducts") ?? "[]";
            const extraProducts = JSON.parse(extraRaw) as Product[];
            setProducts([...extraProducts, ...data]);
            return;
          } catch {
            // Fall back to API data only if parsing fails
          }
        }
        setProducts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = React.useCallback((product: Product) => {
    setEditingProduct(product);
    setEditDialogOpen(true);
  }, []);

  const handleDeleteClick = React.useCallback((productId: number) => {
    setProductToDelete(productId);
    setIsBulkDelete(false);
    setDeleteDialogOpen(true);
  }, []);

  const handleBulkDeleteClick = (ids: number[], reset: () => void) => {
    setIsBulkDelete(true);
    setProductToDelete(null);

    setSelectedProductIds(ids);
    setSelectedRowsCount(ids.length);
    setResetSelection(() => reset);

    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <ProductsToolbar productsCount={products.length} />

      <ProductsTable
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onBulkDelete={handleBulkDeleteClick}
      />

      <EditProductDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        product={editingProduct}
        onProductUpdate={(updatedProduct) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
          );
        }}
      />
      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productId={productToDelete}
        isBulkDelete={isBulkDelete}
        selectedProductIds={selectedProductIds}
        selectedRowsCount={selectedRowsCount}
        onProductsDelete={(deletedIds) => {
          setProducts((prev) => {
            const updated = prev.filter((p) => !deletedIds.includes(p.id));

            // Keep sessionStorage in sync for locally-created products
            if (typeof window !== "undefined") {
              try {
                const extraRaw =
                  window.sessionStorage.getItem("extraProducts") ?? "[]";
                const extraProducts = JSON.parse(extraRaw) as Product[];
                const updatedExtras = extraProducts.filter(
                  (p) => !deletedIds.includes(p.id)
                );
                window.sessionStorage.setItem(
                  "extraProducts",
                  JSON.stringify(updatedExtras)
                );
              } catch {
                // Ignore storage errors – UI state is already updated
              }
            }

            return updated;
          });
          // Only reset table selection when this was a bulk delete action
          if (isBulkDelete) {
            resetSelection();
          }
        }}
        totalProductsCount={products.length}
      />
    </div>
  );
}
