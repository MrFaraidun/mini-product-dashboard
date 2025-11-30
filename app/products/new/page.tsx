"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct, ProductInput } from "@/lib/api/products";
import { ProductForm } from "@/components/product-form";

import { toast, Toaster } from "sonner";
import { DashboardLayout } from "@/app/dashboard-layout";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProductInput) => {
    try {
      setLoading(true);

      await createProduct(data);

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
      <div className="space-y-4">
        <Toaster richColors closeButton />

        <h2 className="text-xl font-semibold tracking-tight">Add Product</h2>

        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </DashboardLayout>
  );
}
