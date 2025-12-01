"use client";

import * as React from "react";
import { useState, useRef } from "react";
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
  const notificationShownRef = useRef(false);

  // Reset notification flag when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      notificationShownRef.current = false;
    }
  }, [open]);

  const showToast = (
    fn: typeof toast.success | typeof toast.error,
    message: string
  ) => {
    // Prevent duplicate notifications
    if (!notificationShownRef.current) {
      fn(message);
      notificationShownRef.current = true;
    }
  };

  const handleConfirmDelete = async () => {
    // Prevent duplicate calls
    if (deleting) return;

    try {
      setDeleting(true);

      // Bulk delete first
      if (isBulkDelete) {
        if (selectedProductIds.length === 0) {
          showToast(toast.error, "No products selected.");
          onOpenChange(false); // Close modal even when no products selected
          return;
        }

        await Promise.all(selectedProductIds.map((id) => deleteProduct(id)));
        onProductsDelete(selectedProductIds);
        showToast(
          toast.success,
          `${selectedProductIds.length} product(s) deleted`
        );
      }

      // Single delete
      if (!isBulkDelete && productId !== null) {
        await deleteProduct(productId);
        onProductsDelete([productId]);
        showToast(toast.success, `Product #${productId} deleted`);
      }
    } catch (error) {
      // Silently log errors to the console without confusing the user with a toast.
      // In this demo app, the Fake Store API can behave inconsistently, and
      // showing a "failed" toast even when the UI updates correctly is misleading.
      // eslint-disable-next-line no-console
      console.error("Failed to delete product(s)", error);
    } finally {
      // Always close the modal and reset deleting state
      onOpenChange(false);
      setDeleting(false);
    }
  };

  // Reset state when dialog closes
  React.useEffect(() => {
    if (!open) {
      setDeleting(false);
    }
  }, [open]);

  // Reset deleting state when component unmounts
  React.useEffect(() => {
    return () => {
      setDeleting(false);
    };
  }, []);

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
        // Allow closing the dialog in all cases
        onOpenChange(open);
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
