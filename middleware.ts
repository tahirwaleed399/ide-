import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Get the session and user data
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  // Define paths
  const publicPaths = ['/', '/about', '/contact']; // Add your public paths here
  const origin = req.nextUrl.origin;
  const loginPath = `${origin}/login`;
  const signupPath = `${origin}/signup`;
  const dashboardPath = `${origin}/dashboard`;

  // Get the current path
  const path = req.nextUrl.pathname;

  // Check if the current path is a public path
  const isPublicPath = publicPaths.includes(path);

  // Redirect logic
  if (user && (path === '/login' || path === '/signup') && !isPublicPath) {
    return NextResponse.redirect(dashboardPath);
  } else if (!user && path !== '/login' && path !== '/signup' && !isPublicPath) {
    return NextResponse.redirect(loginPath);
  }

  // Allow the request to proceed for public paths and other cases
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};