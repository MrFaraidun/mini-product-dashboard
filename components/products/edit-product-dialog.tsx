"use client";

import { Product, ProductInput } from "@/features/products";
import { ProductForm } from "@/components/product-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onProductUpdate: (data: ProductInput) => Promise<void>;
  loading?: boolean;
}

export function EditProductDialog({
  open,
  onOpenChange,
  product,
  onProductUpdate,
  loading = false,
}: EditProductDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product #{product.id}</DialogTitle>
          <DialogDescription>
            Update the product information below.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          initialProduct={product}
          onSubmit={onProductUpdate}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
