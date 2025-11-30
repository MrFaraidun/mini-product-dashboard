"use client";

import { useAuth } from "@/components/auth/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthLayout({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}
