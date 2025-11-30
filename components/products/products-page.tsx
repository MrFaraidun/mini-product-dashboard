"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Product } from "@/lib/api/products";
import { getProducts } from "@/lib/api/products";
import { ProductsTable } from "./products-table";
import { ProductsToolbar } from "./products-toolbar";
import { EditProductDialog } from "./edit-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";
import { Toaster } from "sonner";

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
      .then((data) => setProducts(data))
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
      <Toaster richColors closeButton />

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
          setProducts((prev) => prev.filter((p) => !deletedIds.includes(p.id)));
          resetSelection();
        }}
        totalProductsCount={products.length}
      />
    </div>
  );
}
