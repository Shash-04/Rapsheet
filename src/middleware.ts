import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null
    },
    pages: {
      signIn: '/auth/signin'
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
}