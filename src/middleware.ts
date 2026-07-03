import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Pass the request to our Supabase helper
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run this middleware on every page EXCEPT:
     * - _next/static (static files like CSS/JS)
     * - _next/image (image optimization)
     * - images and icons (.svg, .png, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
