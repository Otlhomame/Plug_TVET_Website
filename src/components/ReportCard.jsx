'use client';

/**
 * <ReportCard /> - downloadable insight report tile
 * ---------------------------------------------------------------------------
 * Layout: dimension chip + date rail, title, summary, highlight bullets, then a
 * high-visibility download button with a Framer Motion hover scale (the
 * watchfire-style interaction requested in the brief).
 *
 * The PDF is served from the local absolute path `/public/reports/<slug>.pdf`
 * and resolved through `asset()` so GitHub Pages project-site basePaths work.
 */

import { motion } from 'framer-motion';

import Icon from '@/components/Icon';
import { asset } from '@/data/site';
import { reportFile } from '@/data/reports';
import { easings, hoverScale, scaleIn } from '@/lib/motion';

/** Per-dimension accent treatments (kept in sync with reportDimensions). */
const accents = {
  cyan: {
    chip: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
    icon: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    hover: 'hover:border-cyan-400/50 hover:shadow-glow-cyan',
    button: 'bg-brand-sheen text-slate-950',
  },
  teal: {
    chip: 'border-teal-400/40 bg-teal-400/10 text-teal-200',
    icon: 'border-teal-400/40 bg-teal-400/10 text-teal-300',
    hover: 'hover:border-teal-400/50 hover:shadow-glow-teal',
    button: 'bg-teal-400 text-slate-950',
  },
};

export default function ReportCard({ report, dimension, featured = false }) {
  const accent = accents[dimension?.accent] || accents.cyan;
  const href = asset(reportFile(report));
  const downloadName = `${report.slug}.pdf`;

  return (
    <motion.article
      layout
      variants={scaleIn}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: easings.premium }}
      className={[
        'glass glass-hover group relative flex flex-col overflow-hidden p-6',
        accent.hover,
        featured ? 'lg:p-7' : '',
      ].join(' ')}
    >
      {/* ---- Header rail -------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={['chip', accent.chip].join(' ')}>
          <Icon name={dimension?.icon || 'fileText'} className="h-3.5 w-3.5" />
          {dimension?.short || 'Report'}
        </span>

        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          <Icon name="calendar" className="h-3.5 w-3.5" />
          {report.displayDate}
        </span>
      </div>

      {/* ---- Title -------------------------------------------------------- */}
      <h3
        className={[
          'mt-5 font-semibold tracking-tighter text-offwhite',
          featured ? 'text-xl sm:text-2xl' : 'text-lg',
        ].join(' ')}
      >
        {report.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-300">{report.summary}</p>

      {/* ---- Highlights --------------------------------------------------- */}
      {report.highlights?.length > 0 && (
        <ul className="mt-5 space-y-2.5 border-t border-slate-700/60 pt-5">
          {report.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[13px] text-slate-200">
              <Icon
                name="check"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300"
                strokeWidth={2.2}
              />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {/* ---- Meta --------------------------------------------------------- */}
      <dl className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-slate-400">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Pages</dt>
          <Icon name="fileText" className="h-3.5 w-3.5" />
          <dd>{report.pages} pages</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">File size</dt>
          <Icon name="download" className="h-3.5 w-3.5" />
          <dd>{report.size} PDF</dd>
        </div>
      </dl>

      {/* ---- Audience ----------------------------------------------------- */}
      <p className="mt-4 text-xs text-slate-400">
        <span className="font-semibold uppercase tracking-[0.14em] text-slate-300">For: </span>
        {report.audience}
      </p>

      {/* ---- Actions ------------------------------------------------------ */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-700/60 pt-6">
        <motion.a
          href={href}
          download={downloadName}
          {...hoverScale}
          className={[
            'btn inline-flex px-5 py-3 shadow-glow-cyan',
            accent.button,
          ].join(' ')}
          aria-label={`Download ${report.title} as PDF`}
        >
          <Icon name="download" className="h-4 w-4" strokeWidth={2} />
          Download PDF
        </motion.a>

        <span className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
          Free · No sign-up
        </span>
      </div>

      {/* ---- Tags --------------------------------------------------------- */}
      <div className="mt-5 flex flex-wrap gap-2">
        {report.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-600/50 bg-slate-900/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}