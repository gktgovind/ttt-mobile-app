// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { nextUrl } = request;
  const url = nextUrl.clone(); // Clone the URL to ensure mutations are applied

  // Check if the request is using HTTP and not a local development environment
  if (url.protocol === 'http:' && process.env.NODE_ENV !== 'development') {
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }

  // Continue with the request as usual
  return NextResponse.next();
}
