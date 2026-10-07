/**
 * INDUSTRY INSIGHTS - /insights
 * ===========================================================================
 * The dedicated report repository.
 *
 *   - Hero + publishing metrics
 *   - Featured shelf (flagged `featured` in src/data/reports.js)
 *   - <InsightsRepository /> : the five industrial dimensions + the
 *     layout-filtered, searchable grid of downloadable PDFs
 *   - Substack conversion panel
 *
 * PDFs live in `/public/reports/<slug>.pdf` and are linked with the
 * basePath-aware `asset()` helper so they resolve on GitHub Pages.
 * ===========================================================================
 */

import Link from 'next/link';

import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ReportCard from '@/components/ReportCard';
import InsightsRepository from '@/components/InsightsRepository';
import SubstackCTA from '@/components/SubstackCTA';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';

import { siteConfig } from '@/data/site';
import {
  dimensionById,
  dimensionsWithCounts,
  featuredReports,
  publishedReports,
  reportMetrics,
} from '@/data/reports';

/**
 * Plural-safe report copy. The repository is content-driven, so this reads
 * correctly whether one brief is published or twenty.
 */
const reportNoun = reportMetrics.total === 1 ? 'report' : 'reports';
const reportCount = `${reportMetrics.total} ${reportNoun}`;

export const metadata = {
  title: 'Industry Insights & Reports',
  description:
    'Download free PDF insight reports across five industrial dimensions: policy analysis and financial impact, approved projects and infrastructure, skills capacity and labour-market data, institutional case studies, and ESG and global industry trends.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Industry Insights & Reports | THE PLUG TVET',
    description: `A free, filterable repository of Botswana TVET research - ${reportCount} across five industrial dimensions.`,
    url: '/insights',
  },
};

/** Publication counts shown as a metric strip under the page header. */
const metrics = [
  { label: `Downloadable ${reportNoun}`, value: `${reportMetrics.total}`, icon: 'fileText' },
  { label: 'Pages of analysis', value: `${reportMetrics.pages}+`, icon: 'book' },
  { label: 'Industrial dimensions', value: `${reportMetrics.dimensions}`, icon: 'layers' },
  { label: 'Most recent issue', value: reportMetrics.latest, icon: 'calendar' },
];

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industry insights"
        title="Download the evidence,"
        accent="free"
        description="Our repository is organised around five industrial dimensions and published as PDFs that are safe to cite, share and print. No paywall, no sign-up, no watered-down version."
        crumbLabel="Industry Insights"
      >
        <a
          href={siteConfig.substack.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <BrandIcon name="substack" className="h-4 w-4" />
          Deeper analysis on Substack
        </a>
        <Link href="#insight-grid" className="btn-ghost">
          Jump to the repository
          <Icon name="arrowDown" className="h-4 w-4" />
        </Link>
      </PageHeader>

      {/* ---- Publication metrics ----------------------------------------- */}
      <section
        className="border-b border-slate-700/50 bg-slate-950/40 py-10"
        aria-label="Repository metrics"
      >
        <div className="container-plug grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.06} variant="fadeUp">
              <div className="glass glass-hover flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                  <Icon name={metric.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-semibold tracking-tightest text-offwhite">
                    {metric.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    {metric.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Featured shelf ----------------------------------------------
          Only worth rendering once the library is big enough to need a
          shortlist: with a single report the repository grid below already
          shows it, and the shelf would repeat the same card twice on one page.
      --------------------------------------------------------------------- */}
      {featuredReports.length > 1 && (
        <section className="section-y" aria-labelledby="featured-reports-heading">
          <div className="container-plug">
            <SectionHeading
              id="featured-reports-heading"
              eyebrow="Start here"
              title="Reports that answer"
              accent="the biggest questions"
              description="If you are new to Botswana’s skills economy, begin with these: where the money flows, which trades the pipeline needs, and how to measure the return."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredReports.map((report, index) => (
                <Reveal key={report.id} delay={index * 0.08} variant="scaleIn" className="h-full">
                  <ReportCard report={report} dimension={dimensionById[report.dimensionId]} featured />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Repository (dimensions + filterable grid) -------------------- */}
      <section
        className="section-y border-t border-slate-700/50 bg-slate-950/40"
        aria-labelledby="repository-heading"
      >
        <div className="container-plug">
          <SectionHeading
            id="repository-heading"
            eyebrow="Report repository"
            title="Five industrial dimensions,"
            accent="one filterable library"
            description="Filter by dimension or search by tag, audience or title. Every file is a local PDF served straight from /public/reports - no third-party gateways and no tracking."
          />

          <div className="mt-12">
            <InsightsRepository reports={publishedReports} dimensions={dimensionsWithCounts} />
          </div>
        </div>
      </section>

      {/* ---- Long-form invitation --------------------------------------- */}
      <section className="pb-20 sm:pb-24" aria-labelledby="insights-substack-heading">
        <div className="container-plug">
          <SubstackCTA
            eyebrow="Deeper Analysis"
            title="The numbers behind the numbers"
            description="Substack carries the methodology, the caveats and the full data tables behind every report in this repository - published as they are produced."
          />
        </div>
      </section>
    </>
  );
}