'use client';

/**
 * <InsightsRepository /> - the layout-filtered download repository
 * ---------------------------------------------------------------------------
 * Rendered on /insights with:
 *   reports    - every published report (src/data/reports.js -> publishedReports)
 *   dimensions - the five industrial dimensions annotated with report counts
 *
 * Structure
 *   1. Dimension selector : five glass tiles; choosing one filters the grid
 *   2. Repository         : search rail + filter rail + animated result grid
 *
 * All filtering happens in the browser so the exported site stays 100% static -
 * no API calls, no database, and nothing that breaks on GitHub Pages.
 */

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Icon from '@/components/Icon';
import ReportCard from '@/components/ReportCard';
import { easings, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

/** Shared geometry for the horizontal filter rail (identical to NewsExplorer). */
const railBase =
  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300';

/** Per-dimension accent treatments, kept in sync with <ReportCard />. */
const accents = {
  cyan: {
    tile: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    chip: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
    active: 'border-cyan-400/60 shadow-glow-cyan',
  },
  teal: {
    tile: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
    chip: 'border-teal-400/40 bg-teal-400/10 text-teal-200',
    active: 'border-teal-400/60 shadow-glow-teal',
  },
};

export default function InsightsRepository({ reports = [], dimensions = [] }) {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');

  /** Lookup: dimension id -> dimension object (including its report count). */
  const dimensionMap = useMemo(
    () =>
      dimensions.reduce((acc, dimension) => {
        acc[dimension.id] = dimension;
        return acc;
      }, {}),
    [dimensions]
  );

  const activeDimension = active === 'all' ? null : dimensionMap[active];

  /** Filter by dimension first, then by free text across title, summary and tags. */
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesDimension = active === 'all' || report.dimensionId === active;
      if (!matchesDimension) return false;
      if (!needle) return true;

      const dimension = dimensionMap[report.dimensionId];
      const haystack = [
        report.title,
        report.summary,
        report.audience,
        dimension?.title,
        dimension?.short,
        ...(report.tags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [active, query, reports, dimensionMap]);

  /** Smooth-scroll the reader down to the filtered grid after a filter change. */
  function scrollToGrid() {
    if (typeof document === 'undefined') return;
    document.getElementById('insight-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Choose a dimension; clicking the active tile again clears the filter. */
  function selectDimension(id) {
    setActive((current) => (current === id ? 'all' : id));
    scrollToGrid();
  }

  return (
    <div>
      {/* ---- 1. Dimension selector --------------------------------------- */}
      <motion.ul
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid list-none gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {dimensions.map((dimension) => {
          const accent = accents[dimension.accent] || accents.cyan;
          const isActive = active === dimension.id;
          const label = `${dimension.count} ${dimension.count === 1 ? 'report' : 'reports'}`;

          return (
            <motion.li key={dimension.id} variants={scaleIn} className="h-full list-none">
              <button
                type="button"
                onClick={() => selectDimension(dimension.id)}
                aria-pressed={isActive}
                aria-label={`${isActive ? 'Clear the filter for' : 'Show the reports in'} ${dimension.title}`}
                className={[
                  'glass glass-hover group flex h-full w-full flex-col p-6 text-left',
                  isActive ? accent.active : '',
                ].join(' ')}
              >
                <span className="flex items-start justify-between gap-4">
                  <span
                    className={[
                      'grid h-11 w-11 shrink-0 place-items-center rounded-2xl border',
                      accent.tile,
                    ].join(' ')}
                  >
                    <Icon name={dimension.icon} className="h-5 w-5" />
                  </span>
                  <span className={['chip', accent.chip].join(' ')}>
                    <Icon name="fileText" className="h-3.5 w-3.5" />
                    {label}
                  </span>
                </span>

                <span className="mt-5 block text-lg font-semibold tracking-tighter text-offwhite">
                  {dimension.title}
                </span>

                <span className="mt-2 block text-sm leading-relaxed text-slate-300">
                  {dimension.description}
                </span>

                <span className="mt-5 block border-l-2 border-cyan-400/50 pl-4 text-sm italic text-slate-200">
                  &ldquo;{dimension.question}&rdquo;
                </span>

                <span className="mt-auto flex items-center gap-2 pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  {isActive ? 'Filtering this dimension' : `Show ${label}`}
                  <Icon
                    name="arrowDown"
                    className={[
                      'h-3.5 w-3.5 transition-transform duration-300',
                      isActive ? 'rotate-180' : 'group-hover:translate-y-0.5',
                    ].join(' ')}
                  />
                </span>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* ---- 2. Repository --------------------------------------------- */}
      <div id="insight-grid" className="anchor-offset mt-16 scroll-mt-28">
        <div className="glass flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">
              <Icon name="download" className="h-3.5 w-3.5" />
              Download repository
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tighter text-offwhite sm:text-2xl">
              {activeDimension ? activeDimension.title : 'All insight reports'}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {filtered.length} {filtered.length === 1 ? 'report' : 'reports'} available for free
              download as PDF.
            </p>
          </div>

          {/* Free-text search */}
          <div className="relative w-full lg:w-80">
            <label htmlFor="report-search" className="sr-only">
              Search reports
            </label>
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              id="report-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles, tags, audiences..."
              className="w-full rounded-2xl border border-slate-600/50 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-offwhite placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
        </div>

        {/* ---- Filter rail (horizontally scrollable on mobile) ----------- */}
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActive('all')}
            aria-pressed={active === 'all'}
            className={[
              railBase,
              active === 'all'
                ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100 shadow-glow-cyan'
                : 'border-slate-600/50 bg-slate-900/50 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200',
            ].join(' ')}
          >
            <Icon name="layers" className="h-3.5 w-3.5" />
            All
            <span className="text-[10px] text-slate-400">{reports.length}</span>
          </button>

          {dimensions.map((dimension) => {
            const isActive = active === dimension.id;
            return (
              <button
                key={dimension.id}
                type="button"
                onClick={() => setActive(dimension.id)}
                aria-pressed={isActive}
                className={[
                  railBase,
                  isActive
                    ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100 shadow-glow-cyan'
                    : 'border-slate-600/50 bg-slate-900/50 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200',
                ].join(' ')}
              >
                <Icon name={dimension.icon} className="h-3.5 w-3.5" />
                {dimension.short}
                <span className="text-[10px] text-slate-400">{dimension.count}</span>
              </button>
            );
          })}
        </div>

        {/* ---- Result grid ----------------------------------------------- */}
        <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((report) => (
              <motion.div
                key={report.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.36, ease: easings.premium }}
              >
                <ReportCard
                  report={report}
                  dimension={dimensionMap[report.dimensionId]}
                  featured={report.featured}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ---- Empty state ---------------------------------------------- */}
        {filtered.length === 0 && (
          <div className="glass mt-8 flex flex-col items-center gap-4 p-12 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-slate-600/50 bg-slate-900/60 text-slate-300">
              <Icon name="search" className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-offwhite">
              No reports match that search
            </h3>
            <p className="max-w-md text-sm text-slate-300">
              Try a broader term, or clear the filters to see all {reports.length} downloadable{' '}
              {reports.length === 1 ? 'report' : 'reports'} across the five industrial
              dimensions.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive('all');
                setQuery('');
              }}
              className="btn-primary mt-2"
            >
              Reset filters
              <Icon name="check" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
