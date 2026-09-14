'use client';

/**
 * <Reveal /> - scroll-driven entrance wrapper
 * ---------------------------------------------------------------------------
 * Wraps any block and animates it into view once it enters the viewport.
 * Uses `whileInView` so the animation is scroll-triggered and never replays,
 * which keeps long pages feeling calm rather than busy.
 *
 * EXAMPLE
 *   <Reveal variant="fadeUp" delay={0.1}>
 *     <SectionHeading ... />
 *   </Reveal>
 */

import { motion } from 'framer-motion';
import { fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight, viewportOnce } from '@/lib/motion';

/** Available entrance variants. */
const variants = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
};

export default function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  className = '',
  amount = 0.18,
  as = 'div',
  ...rest
}) {
  const base = variants[variant] || fadeUp;

  // Apply the per-instance delay (if provided) without mutating the shared preset.
  const chosen = delay
    ? {
        hidden: base.hidden,
        show: {
          ...base.show,
          transition: { ...base.show.transition, delay, ...(duration ? { duration } : {}) },
        },
      }
    : base;

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={chosen}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}