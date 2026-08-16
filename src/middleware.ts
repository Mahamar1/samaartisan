import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known malicious user agent signatures and automated attack tools
const BLOCKED_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'nmap',
  'masscan',
  'wpscan',
  'havij',
  'acunetix',
  'dirbuster',
  'gobuster',
  'hydra',
  'metasploit',
  'burpsuite'
];

// Malicious query patterns
const MALICIOUS_QUERY_PATTERNS = [
  /(\b)(union|select|insert|update|delete|drop|alter|truncate|exec|declare)(\b)/i,
  /(--|#|\/\*)/,
  /(\.\.\/|\.\.\\)/,
  /(<script|<iframe|<object|<embed|<svg.*onload)/i,
  /(\b)etc\/passwd(\b)/i,
  /(\b)win\.ini(\b)/i
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // 1. Block known penetration testing / scanner tools
  if (BLOCKED_USER_AGENTS.some((tool) => userAgent.includes(tool))) {
    return new NextResponse('Access Denied: Malicious Scanner Detected', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // 2. Block malicious query string injections (SQLi, XSS, Path Traversal)
  if (search && MALICIOUS_QUERY_PATTERNS.some((pattern) => pattern.test(search))) {
    return new NextResponse('Access Denied: Malicious Query Pattern Detected', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  // 3. Prevent direct access to hidden / sensitive paths
  if (
    pathname.startsWith('/.env') ||
    pathname.startsWith('/.git') ||
    pathname.includes('..') ||
    pathname.startsWith('/wp-admin') ||
    pathname.startsWith('/phpmyadmin')
  ) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // 4. Create standard response and attach Enhanced Security Headers
  const response = NextResponse.next();

  // Cross-Origin and Framing Protections (Anti-Clickjacking)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Permissions Policy (Hardware restrictions)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=(self)'
  );

  // Strict Transport Security (HSTS - 2 years)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
