import ProductsPage from "@/components/products/products-page";
import { DashboardLayout } from "@/app/dashboard-layout";

export default function Page() {
  return (
    <DashboardLayout>
      <ProductsPage />
    </DashboardLayout>
  );
}
