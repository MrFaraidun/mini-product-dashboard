import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductsToolbarProps {
  productsCount: number;
}

export function ProductsToolbar({}: ProductsToolbarProps) {
  return (
    <div className="flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Products</h2>
        <p className="text-sm text-muted-foreground">
          Manage your product inventory
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href="/products/new">Add Product</Link>
        </Button>
      </div>
    </div>
  );
}
