import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from 'next-auth/middleware'


export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/signin' || path === '/signup' 
  
    if(isPublicPath && token) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    if(token && request.nextUrl.pathname.startsWith('/')) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
      }
  
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
}
export const config = {
    matcher: [
        "/signin",
        "/signup",
        "/forgot-password",
        "/reset-password",
        '/',
        '/dashboard/:path*',
    ],
}