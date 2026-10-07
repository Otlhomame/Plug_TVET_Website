'use client';

/**
 * <ServicesBento /> - 4-column interactive bento grid
 * ---------------------------------------------------------------------------
 * Each of the four core offerings is a glass tile that carries the same depth
 * of information: one-line promise, summary, delivery checklist, outcome and
 * audience. All four tiles are expanded by default, so the section reads as one
 * connected system immediately - and the full content is present in the static
 * export even before (or without) hydration. Tiles stay *interactive*: clicking
 * a tile collapses it again, using Framer Motion height animation.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Icon from '@/components/Icon';
import { services } from '@/data/services';
import { easings, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

/** Accent treatments shared by the open/closed states. */
const accents = {
  cyan: {
    icon: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    bar: 'from-cyan-400 to-cyan-200',
    open: 'border-cyan-400/50 shadow-glow-cyan',
    active: 'text-cyan-200',
  },
  teal: {
    icon: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
    bar: 'from-teal-400 to-teal-200',
    open: 'border-teal-400/50 shadow-glow-teal',
    active: 'text-teal-200',
  },
};

export default function ServicesBento() {
  // Every offering starts expanded: all four panels then show an identical
  // level of detail (summary, checklist, outcome) with no interaction needed,
  // and the content is never withheld from the rendered HTML.
  const [openIds, setOpenIds] = useState(() => services.map((service) => service.id));

  /** Toggle a single panel; the others keep their current state. */
  const togglePanel = (id) => {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <motion.div
      variants={staggerContainer(0.08, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
    >
      {services.map((service) => {
        const accent = accents[service.accent] || accents.cyan;
        const isOpen = openIds.includes(service.id);

        return (
          <motion.article
            key={service.id}
            id={service.id}
            variants={scaleIn}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: easings.premium }}
            className={[
              'glass anchor-offset relative flex flex-col overflow-hidden p-6 transition-colors duration-300',
              isOpen ? accent.open : 'hover:border-slate-500/60',
            ].join(' ')}
          >
            {/* Accent rail */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-6 top-0 h-[3px] rounded-full bg-gradient-to-r ${accent.bar} transition-opacity duration-500 ${
                isOpen ? 'opacity-100' : 'opacity-50'
              }`}
            />

            {/* ---- Trigger ------------------------------------------------- */}
            <button
              type="button"
              onClick={() => togglePanel(service.id)}
              aria-expanded={isOpen}
              aria-controls={`service-panel-${service.id}`}
              className="flex flex-1 flex-col items-start text-left"
            >
              <span className="flex w-full items-start justify-between gap-4">
                <span
                  className={[
                    'grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-500',
                    accent.icon,
                    isOpen ? 'scale-105' : '',
                  ].join(' ')}
                >
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>

                <span
                  className={[
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-600/50 text-slate-300 transition-all duration-300',
                    isOpen ? 'rotate-45 border-cyan-400/50 text-cyan-200' : '',
                  ].join(' ')}
                >
                  <Icon name="close" className="h-3.5 w-3.5 rotate-45" strokeWidth={2} />
                </span>
              </span>

              <span className="mt-6 block text-base font-semibold tracking-tight text-offwhite">
                {service.title}
              </span>

              <span
                className={[
                  'mt-2 block text-sm font-medium',
                  isOpen ? accent.active : 'text-slate-300',
                ].join(' ')}
              >
                {service.short}
              </span>
            </button>

            {/* ---- Collapsed teaser / expanded detail ---------------------- */}
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="open"
                  id={`service-panel-${service.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: easings.premium }}
                  className="overflow-hidden"
                >
                  <div className="pt-5">
                    <p className="text-[13px] leading-relaxed text-slate-300">{service.summary}</p>

                    <ul className="mt-5 space-y-3 border-t border-slate-700/60 pt-5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-[13px] text-slate-200">
                          <Icon
                            name="check"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300"
                            strokeWidth={2.2}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 rounded-2xl border border-slate-600/40 bg-slate-950/50 px-4 py-3 text-[12px] leading-relaxed text-slate-200">
                      <span className="font-semibold text-cyan-200">Outcome: </span>
                      {service.outcome}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-5"
                >
                  <p className="text-[13px] leading-relaxed text-slate-400">{service.summary}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---- Audience footer ---------------------------------------- */}
            <p className="mt-auto border-t border-slate-700/60 pt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
              {service.forWho}
            </p>
          </motion.article>
        );
      })}
    </motion.div>
  );
}