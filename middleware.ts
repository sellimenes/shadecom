import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('session')
    const userData = JSON.parse(cookie?.value || '{}');

    console.log(userData)
    if(userData?.user?.RoleID != 1) {
        console.log(request.nextUrl.clone().origin)
        return NextResponse.rewrite(request.nextUrl.clone().origin)
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}