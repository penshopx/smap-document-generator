import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that don't require authentication
const publicPaths = ["/auth/login", "/auth/register", "/auth/forgot-password"]

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Refresh session if expired
  await supabase.auth.getSession()

  // Get the current path
  const path = request.nextUrl.pathname

  // Check if the path is public
  const isPublicPath = publicPaths.some((publicPath) => path.startsWith(publicPath))

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the path requires authentication and there's no session, redirect to login
  if (!isPublicPath && !session) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is logged in and trying to access a public path, redirect to dashboard
  if (isPublicPath && session) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Protect all routes except public ones
    "/((?!_next/static|_next/image|favicon.ico|api/public).*)",
  ],
}
