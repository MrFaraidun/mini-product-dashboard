"use client";

import { useState } from "react";
import { deleteProduct, getProducts } from "@/lib/api/products";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number | null;
  isBulkDelete: boolean;
  onProductsDelete: (deletedIds: number[]) => void;
  selectedProductIds: number[];
  // Alternatively, you could pass the table instance for bulk operations
  selectedRowsCount?: number;
  totalProductsCount?: number;
}

export function DeleteProductDialog({
  open,
  onOpenChange,
  productId,
  isBulkDelete,

  onProductsDelete,
  selectedProductIds = [],
  selectedRowsCount = 0,
  totalProductsCount = 0,
}: DeleteProductDialogProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      if (isBulkDelete && selectedProductIds.length > 0) {
        // Perform bulk delete with actual selected product IDs
        const deletePromises = selectedProductIds.map((id) =>
          deleteProduct(id)
        );
        await Promise.all(deletePromises);

        onProductsDelete(selectedProductIds);
        toast.success(`${selectedProductIds.length} product(s) deleted`);
      } else if (productId !== null) {
        await deleteProduct(productId);
        onProductsDelete([productId]);
        toast.success(`Product #${productId} deleted`);
      }

      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete product(s).");
    } finally {
      setDeleting(false);
    }
  };

  const getDialogContent = () => {
    if (isBulkDelete) {
      return {
        title: `Delete ${selectedRowsCount} Selected Product(s)?`,
        description: `Are you sure you want to delete ${selectedRowsCount} selected product(s)? This action cannot be undone.`,
      };
    } else {
      return {
        title: `Delete Product #${productId}?`,
        description:
          "Are you sure you want to delete this product? This action cannot be undone.",
      };
    }
  };

  const { title, description } = getDialogContent();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open && !deleting) {
          onOpenChange(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
