import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const { nextUrl } = req

  const isAuthPage = nextUrl.pathname.startsWith("/auth/login") || nextUrl.pathname.startsWith("/auth/register")

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/profile", nextUrl))
  }

  // Allow public access to all other pages
  return NextResponse.next()
})

// Ensure middleware runs on the relevant routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
