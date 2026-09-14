'use client';

/**
 * <SubstackCTA /> - long-form conversion panel
 * ---------------------------------------------------------------------------
 * THE PLUG TVET publishes short 4-5 minute reads on-site and routes readers who
 * want the full analysis to Substack. This component is that hand-off - used on
 * the home page, about, services, insights and at the foot of every news post.
 *
 * VARIANTS
 *   'panel'  -> full-width glass panel with headline + benefit list (default)
 *   'inline' -> compact bar for use inside articles and sidebars
 */

import { motion } from 'framer-motion';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import { siteConfig } from '@/data/site';
import { easings, hoverScale } from '@/lib/motion';

export default function SubstackCTA({
  variant = 'panel',
  eyebrow = 'Deeper Analysis',
  title = 'Read the full breakdown on Substack',
  description = siteConfig.substack.blurb,
  className = '',
}) {
  const benefits = [
    'Weekly long-form issues, free to read',
    'Full data tables, sources and methodology notes',
    'Early access to every downloadable report',
  ];

  /* ---- Compact inline bar ------------------------------------------------ */
  if (variant === 'inline') {
    return (
      <a
        href={siteConfig.substack.url}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'group inline-flex w-full items-center justify-between gap-4 rounded-2xl border border-orange-400/30 bg-orange-500/5 px-5 py-4 transition-all duration-300 hover:border-orange-400/60 hover:bg-orange-500/10',
          className,
        ].join(' ')}
      >
        <span className="flex items-center gap-3">
          <BrandIcon name="substack" className="h-5 w-5 text-orange-300" />
          <span className="text-sm font-semibold tracking-tight text-offwhite">{title}</span>
        </span>
        <Icon
          name="arrowUpRight"
          className="h-4 w-4 text-orange-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    );
  }

  /* ---- Full panel -------------------------------------------------------- */
  return (
    <section aria-labelledby="substack-cta-title" className={['relative', className].join(' ')}>
      <div className="glass-strong relative overflow-hidden p-8 sm:p-10 lg:p-12">
        {/* Decorative brand wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <BrandIcon name="substack" className="h-3.5 w-3.5 text-orange-300" />
              {eyebrow}
            </p>

            <h2
              id="substack-cta-title"
              className="mt-5 text-3xl font-semibold tracking-tighter text-offwhite sm:text-4xl"
            >
              {title}
            </h2>

            <p className="lede mt-4 max-w-xl">{description}</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href={siteConfig.substack.url}
                target="_blank"
                rel="noopener noreferrer"
                {...hoverScale}
                className="btn-primary"
              >
                <BrandIcon name="substack" className="h-4 w-4" />
                Subscribe on Substack
              </motion.a>

              <a href="/news" className="btn-ghost">
                Browse the 4-5 min reads
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ---- Editorial preview card ------------------------------------ */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: easings.premium }}
              className="glass overflow-hidden p-6"
            >
              <div className="cover-art -mx-6 -mt-6 mb-6 h-28">
                <span className="chip-cyan absolute bottom-4 left-6">Weekly issue</span>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                What subscribers get
              </p>

              <h3 className="mt-3 text-lg font-semibold tracking-tight text-offwhite">
                Policy decoded. Projects mapped. Skills measured.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                The same five research dimensions you find here - expanded into full analysis, with
                the tables, sources and caveats that will not fit into a four-minute read.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-700/60 pt-5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <Icon name="mail" className="h-3.5 w-3.5 text-cyan-400" />
                  Free subscription
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="clock" className="h-3.5 w-3.5 text-cyan-400" />
                  Every week
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}