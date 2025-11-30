"use client";

import { useState } from "react";
import { Product, ProductInput, updateProduct } from "@/lib/api/products";
import { ProductForm } from "@/components/product-form";
import { toast } from "sonner";
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
  onProductUpdate: (updatedProduct: Product) => void;
}

export function EditProductDialog({
  open,
  onOpenChange,
  product,
  onProductUpdate,
}: EditProductDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: ProductInput) => {
    if (!product) return;

    try {
      setSaving(true);
      const updatedProduct = await updateProduct(product.id, data);

      onProductUpdate(updatedProduct);
      toast.success(`Product #${product.id} updated`);
      onOpenChange(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit Product {product?.id && `#${product.id}`}
          </DialogTitle>
          <DialogDescription>
            Update the product information below.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          initialProduct={product}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </DialogContent>
    </Dialog>
  );
}
