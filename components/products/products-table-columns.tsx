import { ColumnDef } from "@tanstack/react-table";
import { Product, SortConfig } from "@/features/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ArrowUp, ArrowDown, Edit, Trash2 } from "lucide-react";

interface ProductsTableColumnsProps {
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onSort?: (field: SortConfig["field"]) => void;
  sortConfig?: SortConfig | null;
  selectedIds?: number[];
  onToggleSelection?: (id: number) => void;
  onSelectAll?: (ids: number[]) => void;
}

export function ProductsTableColumns({
  onEdit,
  onDelete,
  onSort,
  sortConfig,
  selectedIds = [],
  onToggleSelection,
  onSelectAll,
}: ProductsTableColumnsProps): ColumnDef<Product>[] {
  const SortButton = ({ field }: { field: SortConfig["field"] }) => {
    if (!onSort) {
      return <span className="capitalize">{String(field)}</span>;
    }

    const isActive = sortConfig?.field === field;
    const direction = isActive ? sortConfig.direction : undefined;

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSort(field)}
        className="h-8 capitalize"
      >
        {String(field)}
        {direction === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : direction === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    );
  };

  return [
    {
      id: "select",
      header: ({ table }) => {
        const allIds = table.getRowModel().rows.map((row) => row.original.id);
        const allSelected = allIds.every((id) => selectedIds.includes(id));
        const someSelected =
          selectedIds.length > 0 && !allSelected && onSelectAll;

        return (
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              if (onSelectAll) {
                onSelectAll(checked ? allIds : []);
              }
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        const isSelected = selectedIds.includes(row.original.id);
        return (
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => {
              if (onToggleSelection) {
                onToggleSelection(row.original.id);
              }
            }}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string | null | undefined;

        const src =
          typeof imageUrl === "string" && imageUrl.length > 0
            ? imageUrl
            : "https://via.placeholder.com/48?text=No+Image";

        return (
          <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={row.original.title || "Product image"}
              width={48}
              height={48}
              className="object-cover w-12 h-12 border rounded-md"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://via.placeholder.com/48?text=No+Image";
              }}
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: () => <SortButton field="id" />,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: () => <SortButton field="title" />,
      cell: ({ row }) => (
        <div className="max-w-xs font-medium truncate">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <SortButton field="category" />,
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue("category")}</Badge>
      ),
    },
    {
      accessorKey: "price",
      header: () => (
        <div className="text-right">
          <SortButton field="price" />
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
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      enableSorting: false,
    },
  ];
}
