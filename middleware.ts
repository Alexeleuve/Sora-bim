import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except Next.js internals, API routes, and static files.
  // A single negative-lookahead pattern is the most reliable approach —
  // avoids redundancy and edge cases with multiple patterns.
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
}
