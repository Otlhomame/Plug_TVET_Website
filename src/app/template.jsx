'use client';

/**
 * app/template.jsx - per-route wrapper
 * ---------------------------------------------------------------------------
 * Next.js re-renders a `template` on every navigation (unlike a layout, which
 * persists). That makes it the correct hook for page transition fades in the
 * App Router: each route change swaps the whole subtree and re-runs the
 * animation defined inside <PageTransition />.
 */

import PageTransition from '@/components/PageTransition';

export default function Template({ children }) {
  return <PageTransition>{children}</PageTransition>;
}