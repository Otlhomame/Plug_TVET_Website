/**
 * THE PLUG TVET - shared Framer Motion variants & easing curves
 * ---------------------------------------------------------------------------
 * Every scroll-driven entrance animation on the site draws from these presets
 * so the motion language stays consistent (the watchfire.io feel: short, eased,
 * slightly upward, never bouncy).
 *
 * NOTE: files importing these must be client components ("use client").
 */

/** Cubic-bezier easings used across the site. */
export const easings = {
  /** Decisive, premium deceleration - the default for entrances. */
  premium: [0.22, 1, 0.36, 1],
  /** Standard material easing for hover/exit states. */
  smooth: [0.4, 0, 0.2, 1],
};

/** Fade + rise. The workhorse entrance used by <Reveal />. */
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easings.premium },
  },
};

/** Pure fade, for large surfaces where movement would be distracting. */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: easings.premium } },
};

/** Scale-in, used for bento tiles and stat cards. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easings.premium },
  },
};

/** Slide in from the left (timelines, list markers). */
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easings.premium } },
};

/** Slide in from the right (stat rails, side panels). */
export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easings.premium } },
};

/**
 * Builds a stagger container variant.
 * @param {number} stagger seconds between children
 * @param {number} delay   initial delay before the first child
 */
export function staggerContainer(stagger = 0.08, delay = 0.05) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Standard viewport config so animations trigger once, slightly early. */
export const viewportOnce = { once: true, amount: 0.18 };

/** Page-level transition used by app/template.jsx. */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easings.premium },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: easings.smooth } },
};

/** Interactive hover presets (imported into motion.button / motion.a). */
export const hoverLift = {
  whileHover: { y: -4, scale: 1.02 },
  whileTap: { scale: 0.985 },
  transition: { duration: 0.3, ease: easings.premium },
};

/** Stronger scale used by report download buttons. */
export const hoverScale = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.28, ease: easings.premium },
};