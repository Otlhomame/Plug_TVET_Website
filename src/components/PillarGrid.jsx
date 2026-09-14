'use client';

/**
 * <PillarGrid /> - the three core pillars: Inform, Guide, Connect
 * ---------------------------------------------------------------------------
 * Three high-impact glass cards. Each carries an accent rail, a bulleted proof
 * list and a hover-revealed "deep dive" affordance.
 */

import { motion } from 'framer-motion';

import Icon from '@/components/Icon';
import { pillars } from '@/data/stats';
import { easings, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

/** Per-pillar accent treatments. */
const accents = {
  cyan: {
    rail: 'from-cyan-400 to-cyan-200',
    icon: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    bullet: 'bg-cyan-400',
    hover: 'hover:border-cyan-400/50 hover:shadow-glow-cyan',
  },
  teal: {
    rail: 'from-teal-400 to-teal-200',
    icon: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
    bullet: 'bg-teal-400',
    hover: 'hover:border-teal-400/50 hover:shadow-glow-teal',
  },
};

export default function PillarGrid() {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {pillars.map((pillar, index) => {
        const accent = accents[pillar.accent] || accents.cyan;

        return (
          <motion.article
            key={pillar.id}
            id={pillar.id}
            variants={scaleIn}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: easings.premium }}
            className={[
              'glass glass-hover anchor-offset group relative flex flex-col overflow-hidden p-7',
              accent.hover,
              // Offset the middle card on large screens for a designed rhythm.
              index === 1 ? 'lg:translate-y-6' : '',
            ].join(' ')}
          >
            {/* Accent rail */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-7 top-0 h-[3px] rounded-full bg-gradient-to-r ${accent.rail} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="flex items-center justify-between gap-4">
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl border ${accent.icon}`}
              >
                <Icon name={pillar.icon} className="h-6 w-6" />
              </span>
              <span className="chip">{pillar.kicker}</span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tighter text-offwhite">
              {pillar.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.summary}</p>

            <ul className="mt-6 space-y-3 border-t border-slate-700/60 pt-6">
              {pillar.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-slate-200">
                  <span
                    className={`mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full ${accent.bullet}`}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </motion.div>
  );
}