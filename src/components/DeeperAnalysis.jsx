'use client';

/**
 * <DeeperAnalysis /> - GLOBAL Substack anchor
 * ---------------------------------------------------------------------------
 * IMPORTANT: this component is global on purpose. Every TVET News post renders
 * it (see `src/app/news/[slug]/page.jsx`), and it is also surfaced on the news
 * index and inside article bodies so a reader who wants the full picture is
 * always one click from the Substack deep dive.
 *
 * It resolves a per-post Substack URL from the post's `subSlug`, falling back to
 * the publication root when no specific post exists yet.
 */

import { motion } from 'framer-motion';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import { siteConfig } from '@/data/site';
import { easings, hoverScale } from '@/lib/motion';

/**
 * @param {object}  props
 * @param {string}  props.subSlug  Substack post path segment (optional)
 * @param {string}  props.postTitle title of the on-site summary
 * @param {'panel'|'bar'} props.variant
 * @param {string}  props.className
 */
export default function DeeperAnalysis({
  subSlug,
  postTitle,
  variant = 'panel',
  className = '',
}) {
  const href = subSlug ? siteConfig.substack.postUrl(subSlug) : siteConfig.substack.url;

  /* ---- Slim bar variant (used inline within articles) -------------------- */
  if (variant === 'bar') {
    return (
      <aside
        className={[
          'flex flex-col gap-4 rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between',
          className,
        ].join(' ')}
      >
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            <Icon name="book" className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-offwhite">Deeper Analysis</p>
            <p className="text-xs text-slate-300">
              The full breakdown is on Substack - sources, tables and caveats included.
            </p>
          </div>
        </div>

        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...hoverScale}
          className="btn-primary shrink-0 !px-5 !py-2.5"
        >
          Continue on Substack
          <Icon name="arrowUpRight" className="h-4 w-4" />
        </motion.a>
      </aside>
    );
  }

  /* ---- Full panel variant (default) ------------------------------------- */
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: easings.premium }}
      className={[
        'glass-strong relative overflow-hidden p-7 sm:p-9',
        className,
      ].join(' ')}
    >
      {/* Accent edges */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] bg-brand-sheen"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="relative grid gap-7 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <p className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Deeper Analysis
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tighter text-offwhite sm:text-3xl">
            This is the summary. The full analysis lives on Substack.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            {postTitle
              ? `We covered “${postTitle}” in four minutes here. The Substack issue carries the long version: `
              : 'The Substack issue carries the long version: '}
            the underlying data, the policy references, the counter-arguments and the
            recommendations that would not survive a rapid-read edit.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...hoverScale}
              className="btn-primary"
            >
              <BrandIcon name="substack" className="h-4 w-4" />
              Read the deep dive
            </motion.a>

            <a
              href={siteConfig.substack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-5 !py-2.5"
            >
              All issues
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ---- Why go deeper -------------------------------------------- */}
        <div className="lg:col-span-4">
          <ul className="space-y-3 rounded-2xl border border-slate-600/40 bg-slate-950/50 p-5">
            {[
              'Primary sources and full references',
              'Data tables you can reuse in a board pack',
              'Regional and sector-level breakdowns',
              'Practical recommendations per audience',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-200">
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                  strokeWidth={2.2}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.aside>
  );
}