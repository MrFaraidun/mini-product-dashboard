"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct } from "@/lib/api/products";
import { Product, ProductInput } from "@/features/products";
import { ProductForm } from "@/components/product-form";

import { toast } from "sonner";
import { DashboardLayout } from "@/app/dashboard-layout";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProductInput) => {
    try {
      setLoading(true);

      const createdProduct = await createProduct(data);

      if (typeof window !== "undefined") {
        try {
          const existing =
            window.sessionStorage.getItem("extraProducts") ?? "[]";
          const parsed = JSON.parse(existing) as Product[];

          const maxId = parsed.length > 0 
            ? Math.max(...parsed.map(p => p.id))
            : 20;
          const newId = Math.max(21, maxId + 1);

          const localProduct: Product = {
            ...createdProduct,
            id: newId,
          };

          const updated = [...parsed, localProduct];
          window.sessionStorage.setItem(
            "extraProducts",
            JSON.stringify(updated)
          );
        } catch {
        }
      }

      toast.success("Product created");

      router.push("/products");
    } catch (error) {
      toast.error("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-2xl space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-center">
            Add Product
          </h2>

          <ProductForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
