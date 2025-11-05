import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para proteção de rotas
 * Roda no Edge Runtime para máxima performance
 */
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // Rotas públicas (não requerem autenticação)
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Rotas de API públicas
  const isPublicApi = pathname.startsWith('/api/auth');

  // Se não tem sessão e está tentando acessar rota protegida
  if (!session && !isPublicRoute && !isPublicApi) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se tem sessão e está tentando acessar login/register, redireciona para dashboard
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

