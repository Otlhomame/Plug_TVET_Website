'use client';

/**
 * <ScrollProgress /> - brand scroll indicator + back-to-top control
 * ---------------------------------------------------------------------------
 * Two pieces of premium polish in one client component:
 *   1. A 2px gradient bar pinned under the header showing read progress.
 *   2. A floating "return to top" node that appears after 60vh of scrolling.
 *
 * Both are driven by Framer Motion's `useScroll` + `useSpring` so they move on
 * the compositor and never jank the page.
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Icon from '@/components/Icon';
import { easings } from '@/lib/motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Damped progress so the bar glides instead of snapping.
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ---- Reading progress bar ---------------------------------------- */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-sheen"
      />

      {/* ---- Back to top ------------------------------------------------- */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.28, ease: easings.premium }}
            className="fixed bottom-6 right-5 z-50 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/40 bg-slate-900/80 text-cyan-300 shadow-glow-cyan backdrop-blur-xl hover:text-cyan-100 sm:bottom-8 sm:right-8"
          >
            <Icon name="arrowDown" className="h-5 w-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}