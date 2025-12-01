import { Product } from "@/features/products";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-md p-3 mx-auto border rounded-lg shadow-sm bg-background">
      <div className="flex gap-3">
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              typeof product.image === "string" && product.image.length > 0
                ? product.image
                : "https://via.placeholder.com/50?text=No+Image"
            }
            alt={product.title}
            width={50}
            height={50}
            className="object-cover border rounded-md"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/50?text=No+Image";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{product.title}</h3>
          <p className="mt-1 text-xs truncate text-muted-foreground">
            {product.category}
          </p>
          <p className="mt-1 text-sm font-semibold">
            ${parseFloat(product.price.toString()).toFixed(2)}
          </p>

          {(onEdit || onDelete) && (
            <div className="flex gap-1 mt-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="flex-1 px-2 text-xs h-7"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Edit</span>
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                  className="flex-1 px-2 text-xs h-7"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  <span className="hidden xs:inline">Delete</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
