"use client";

import CollapsibleSidebar from "@/components/collapsible-sidebar";
import { MobileMenu } from "@/components/mobile-menu";
import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <CollapsibleSidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        <header className="border-b bg-background">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-2 md:hidden">
              <MobileMenu />
              <h2 className="text-base font-semibold">
                Mini Product Dashboard
              </h2>
            </div>
            <div className="hidden md:block">
              <div className="space-y-0.5">
                <h2 className="text-base font-semibold md:text-lg">
                  Mini Product Dashboard
                </h2>
                <p className="text-xs text-muted-foreground">
                  CRUD + Filters + Search powered by Fake Store API
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
