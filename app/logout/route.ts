import { NextResponse } from "next/server";

export async function GET() {
  // Redirect to login page
  const response = NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    )
  );

  // Note: Since we're using localStorage for auth, we can't clear it from the server
  // The actual logout logic is handled in the frontend component

  return response;
}
