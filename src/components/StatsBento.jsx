'use client';

/**
 * <StatsBento /> - dynamic traction bento grid
 * ---------------------------------------------------------------------------
 * A watchfire-style asymmetric grid: the first tile doubles as a headline
 * panel (62K+ Facebook community) and the remaining tiles form a dense metrics
 * cluster. Tiles stagger in on scroll and lift on hover.
 */

import { motion } from 'framer-motion';

import Icon from '@/components/Icon';
import { stats } from '@/data/stats';
import { easings, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

/** Accent styling per tile (cyan lead vs teal support). */
const accents = {
  cyan: {
    ring: 'hover:border-cyan-400/50 hover:shadow-glow-cyan',
    icon: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    value: 'text-gradient',
    dot: 'bg-cyan-400',
  },
  teal: {
    ring: 'hover:border-teal-400/50 hover:shadow-glow-teal',
    icon: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
    value: 'text-teal-300',
    dot: 'bg-teal-400',
  },
};

export default function StatsBento() {
  return (
    <motion.div
      variants={staggerContainer(0.07, 0.06)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => {
        const accent = accents[stat.accent] || accents.cyan;
        // The first metric is the flagship tile: larger type + richer copy.
        const isLead = index === 0;

        return (
          <motion.article
            key={stat.id}
            variants={scaleIn}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: easings.premium }}
            className={[
              'glass glass-hover group relative overflow-hidden p-6',
              accent.ring,
              isLead ? 'sm:col-span-2 lg:col-span-2 lg:p-8' : '',
            ].join(' ')}
          >
            {/* Corner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 lg:opacity-60"
            />

            <div className="relative flex items-start justify-between gap-4">
              <span
                className={[
                  'grid h-11 w-11 shrink-0 place-items-center rounded-2xl border',
                  accent.icon,
                ].join(' ')}
              >
                <Icon name={stat.icon} className="h-5 w-5" />
              </span>

              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                <span className={['h-1.5 w-1.5 rounded-full', accent.dot].join(' ')} />
                Live
              </span>
            </div>

            <p
              className={[
                'relative mt-6 font-semibold tracking-tightest',
                accent.value,
                isLead ? 'text-5xl sm:text-6xl' : 'text-4xl',
              ].join(' ')}
            >
              {stat.value}
            </p>

            <h3 className="relative mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-offwhite">
              {stat.label}
            </h3>

            <p
              className={[
                'relative mt-3 text-sm leading-relaxed text-slate-300',
                isLead ? 'max-w-md' : '',
              ].join(' ')}
            >
              {stat.detail}
            </p>

            {/* Baseline scan-line detail */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.article>
        );
      })}
    </motion.div>
  );
}