"use client";

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
  selectedProductIds: number[];
  selectedRowsCount: number;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteProductDialog({
  open,
  onOpenChange,
  productId,
  isBulkDelete,
  selectedProductIds,
  selectedRowsCount,
  onConfirm,
  isDeleting = false,
}: DeleteProductDialogProps) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
