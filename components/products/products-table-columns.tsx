import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/lib/api/products";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductsTableColumnsProps {
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export function ProductsTableColumns({
  onEdit,
  onDelete,
}: ProductsTableColumnsProps): ColumnDef<Product>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    // ✅ Image column using Next.js <Image />
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string;

        const src =
          imageUrl && imageUrl !== ""
            ? imageUrl
            : "https://via.placeholder.com/48?text=No+Image";

        return (
          <div className="flex items-center justify-center">
            <Image
              src={src}
              alt={row.original.title || "Product image"}
              width={48}
              height={48}
              className="object-cover w-12 h-12 border rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/48?text=No+Image";
              }}
            />
          </div>
        );
      },
      enableSorting: false,
    },

    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },

    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="max-w-xs font-medium truncate">
          {row.getValue("title")}
        </div>
      ),
    },

    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("category")}</Badge>
      ),
    },

    {
      accessorKey: "price",
      header: ({ column }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        return <div className="font-medium text-right">{formatted}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product)}
              className="w-8 h-8 p-0"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => product.id && onDelete(product.id)}
              className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
