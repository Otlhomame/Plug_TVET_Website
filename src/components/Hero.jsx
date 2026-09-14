'use client';

/**
 * <Hero /> - premium watchfire-style hero
 * ---------------------------------------------------------------------------
 * Layout: split grid on desktop, stacked on mobile.
 *   LEFT  - positioning statement, dual CTA (insights + Substack), traction chips
 *   RIGHT - a floating "insight console" glass card listing the five research
 *           dimensions, echoing watchfire's data-forward look.
 * Motion: staggered entrance, floating node accents, aurora backdrop.
 */

import Link from 'next/link';
import { motion } from 'framer-motion';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import { siteConfig } from '@/data/site';
import { reportDimensions } from '@/data/reports';
import { stats } from '@/data/stats';
import { easings, hoverScale } from '@/lib/motion';

/** Traction chips shown beneath the CTAs (first three headline metrics). */
const heroStats = stats.slice(0, 3);

/** Reusable entrance variant for the staggered left column. */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easings.premium } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      {/* ---- Aurora backdrop ------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-[0.35]" />
        <div className="absolute -left-32 -top-40 h-[32rem] w-[32rem] animate-aurora rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-24 top-10 h-[28rem] w-[28rem] animate-aurora rounded-full bg-teal-500/10 blur-3xl [animation-delay:-8s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      <div className="container-plug grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ---- LEFT: positioning --------------------------------------- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          className="lg:col-span-7"
        >
          <motion.p
            variants={rise}
            className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            Botswana’s TVET information hub
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-7 text-[2.6rem] font-semibold leading-[1.03] tracking-tightest text-offwhite sm:text-6xl lg:text-[4.25rem]"
          >
            THE PLUG TVET:
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">Connecting Botswana</span> to TVET opportunities.
          </motion.h1>

          <motion.p variants={rise} className="lede mt-7 max-w-2xl text-slate-200/90">
            Admissions decoded, funding windows tracked, skills demand measured and project
            pipelines mapped - for students, graduates, parents, educators, policymakers and the
            employers who need them. Short reads here, deep analysis on Substack, and every report
            free to download.
          </motion.p>

          {/* ---- CTAs --------------------------------------------------- */}
          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
            <motion.div {...hoverScale}>
              <Link href="/insights" className="btn-primary px-7 py-3.5 text-base">
                Explore Industry Insights
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.a
              href={siteConfig.substack.url}
              target="_blank"
              rel="noopener noreferrer"
              {...hoverScale}
              className="btn-ghost px-7 py-3.5 text-base"
            >
              <BrandIcon name="substack" className="h-4 w-4 text-orange-300" />
              Join the Substack
            </motion.a>

            <Link href="/services" className="btn-quiet px-4 py-3.5">
              See how we help
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* ---- Traction chips ---------------------------------------- */}
          <motion.dl
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 0.7, delay: 0.12, ease: easings.premium },
              },
            }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-slate-700/60 pt-7"
          >
            {heroStats.map((stat) => (
              <div key={stat.id} className="flex flex-col">
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  {stat.label}
                </dt>
                <dd className="text-gradient mt-1 text-2xl font-semibold tracking-tightest">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---- RIGHT: insight console ----------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easings.premium }}
          className="relative lg:col-span-5"
        >
          {/* Floating accent nodes */}
          <span
            aria-hidden="true"
            className="absolute -left-4 top-10 hidden h-3 w-3 animate-float rounded-full bg-cyan-400 shadow-glow-cyan lg:block"
          />
          <span
            aria-hidden="true"
            className="absolute -right-3 bottom-16 hidden h-2.5 w-2.5 animate-float rounded-full bg-teal-400 [animation-delay:-3s] lg:block"
          />

          <div className="glass-strong relative overflow-hidden p-6 sm:p-7">
            {/* Console header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-600/40 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                  <Icon name="layers" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-offwhite">
                    Insight console
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    5 industrial dimensions
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" />
                Updated
              </span>
            </div>

            {/* Dimension rows */}
            <ul className="mt-5 space-y-3">
              {reportDimensions.map((dimension, index) => {
                return (
                  <motion.li
                    key={dimension.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.35 + index * 0.08,
                      ease: easings.premium,
                    }}
                  >
                    <Link
                      href={`/insights#${dimension.id}`}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-600/30 bg-slate-950/40 px-4 py-3 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/60"
                    >
                      <span
                        className={[
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl border',
                          dimension.accent === 'teal'
                            ? 'border-teal-400/40 bg-teal-400/10 text-teal-300'
                            : 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
                        ].join(' ')}
                      >
                        <Icon name={dimension.icon} className="h-4 w-4" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-offwhite">
                          {dimension.short}
                        </span>
                        <span className="block truncate text-[11px] text-slate-400">
                          {dimension.question}
                        </span>
                      </span>

                      <Icon
                        name="chevronRight"
                        className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Console footer */}
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-600/40 pt-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Free PDF downloads
              </p>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 transition-colors hover:text-cyan-100"
              >
                Open repository
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Reflected sheen beneath the panel */}
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-8 w-[85%] rounded-b-[2rem] bg-gradient-to-b from-cyan-400/10 to-transparent blur-md"
          />
        </motion.div>
      </div>
    </section>
  );
}