"use client";

import { useProducts } from "@/features/products";
import {
  useProductFilters,
  useProductSort,
  useProductPagination,
  useProductSelection,
  useProductEdit,
  useProductDelete,
} from "@/features/products";
import { ProductsTable } from "./products-table";
import { ProductsToolbar } from "./products-toolbar";
import { ProductsTableToolbar } from "./products-table-toolbar";
import { EditProductDialog } from "./edit-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";

export default function ProductsPage() {
  const { products, setProducts, loading } = useProducts();
  const { filteredProducts, updateFilter, clearFilters } = useProductFilters(products);
  const { sortedProducts, handleSort, sortConfig } = useProductSort(filteredProducts);
  const { paginatedProducts, currentPage, totalPages, nextPage, previousPage } =
    useProductPagination(sortedProducts, 10);

  const { selectedIds, selectedCount, toggleSelection, selectAll } = useProductSelection();

  const {
    editingProduct,
    isDialogOpen: isEditDialogOpen,
    isUpdating,
    startEdit,
    saveEdit,
    setIsDialogOpen: setEditDialogOpen,
  } = useProductEdit(products, setProducts);

  const {
    productToDelete,
    productsToDelete,
    isDialogOpen: isDeleteDialogOpen,
    isDeleting,
    isBulkDelete,
    startDelete,
    startBulkDelete,
    confirmDelete,
    setIsDialogOpen: setDeleteDialogOpen,
  } = useProductDelete(products, setProducts);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-4">
      <ProductsToolbar productsCount={products.length} />

      <ProductsTableToolbar
        onSearchChange={(query) => updateFilter("searchQuery", query)}
        categories={categories}
        onCategoryChange={(cat) => updateFilter("category", cat)}
        onClearFilters={clearFilters}
        onBulkDelete={() => selectedIds.length > 0 && startBulkDelete(selectedIds)}
        selectedCount={selectedCount}
      />

      <ProductsTable
        products={paginatedProducts}
        loading={loading}
        onEdit={startEdit}
        onDelete={startDelete}
        onSort={handleSort}
        sortConfig={sortConfig}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelection}
        onSelectAll={selectAll}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} ({sortedProducts.length} total)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={previousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-accent"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-accent"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <EditProductDialog
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
        product={editingProduct}
        onProductUpdate={saveEdit}
        loading={isUpdating}
      />

      <DeleteProductDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productId={productToDelete}
        isBulkDelete={isBulkDelete}
        selectedProductIds={productsToDelete}
        selectedRowsCount={productsToDelete.length}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
