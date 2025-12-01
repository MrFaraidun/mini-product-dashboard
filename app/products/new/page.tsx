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

      // Persist created product in sessionStorage so it appears in the products table
      // even though the Fake Store API doesn't return newly created items in /products.
      if (typeof window !== "undefined") {
        try {
          const existing =
            window.sessionStorage.getItem("extraProducts") ?? "[]";
          const parsed = JSON.parse(existing) as Product[];

          // Use a client-side unique id to avoid collisions with API ids
          const localProduct: Product = {
            ...createdProduct,
            id: Date.now(),
          };

          const updated = [...parsed, localProduct];
          window.sessionStorage.setItem(
            "extraProducts",
            JSON.stringify(updated)
          );
        } catch {
          // If anything goes wrong, fail silently – the API created the product,
          // but the local demo list just won't be extended.
        }
      }

      toast.success("Product created");

      router.push("/products");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          {/* Toaster is already rendered in the root layout, so we don't need it here */}

          <h2 className="text-xl font-semibold tracking-tight text-center">
            Add Product
          </h2>

          <ProductForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
