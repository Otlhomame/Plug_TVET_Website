'use client';

/**
 * <PageTransition /> - fade between routes
 * ---------------------------------------------------------------------------
 * Mounted by `src/app/template.jsx`, which Next.js re-renders on every
 * navigation. That makes it the correct place for exit/enter transitions in the
 * App Router (a layout would persist across routes and never re-animate).
 */

import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      // `mode="wait"` is unnecessary here because template.jsx remounts, but
      // keeping the wrapper minimal avoids layout thrash during transitions.
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}