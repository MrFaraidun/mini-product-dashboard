"use client";

import { useAuth } from "@/components/auth/auth-context";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LoginRedirect() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user is not logged in and they're not on the login page, redirect to login
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    }
    // If user is logged in and they're on the login page, redirect to dashboard
    else if (isLoggedIn && pathname === "/login") {
      router.push("/dashboard");
    }
  }, [isLoggedIn, pathname, router]);

  return null;
}
