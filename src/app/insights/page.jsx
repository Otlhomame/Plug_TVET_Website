/**
 * INDUSTRY INSIGHTS - /insights
 * ===========================================================================
 * The dedicated report repository.
 *
 *   - Hero + publishing metrics
 *   - Featured shelf (flagged `featured` in src/data/reports.js)
 *   - <InsightsRepository /> : the five industrial dimensions + the
 *     layout-filtered, searchable grid of downloadable PDFs
 *   - A short publishing guide (how to add a report through Git)
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
  reportDimensions,
} from '@/data/reports';

export const metadata = {
  title: 'Industry Insights & Reports',
  description:
    'Download free PDF insight reports across five industrial dimensions: policy analysis and financial impact, approved projects and infrastructure, skills capacity and labour-market data, institutional case studies, and ESG and global industry trends.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Industry Insights & Reports | THE PLUG TVET',
    description: `A free, filterable repository of Botswana TVET research - ${reportMetrics.total} downloadable reports across five industrial dimensions.`,
    url: '/insights',
  },
};

/** Publication counts shown as a metric strip under the page header. */
const metrics = [
  { label: 'Downloadable reports', value: `${reportMetrics.total}`, icon: 'fileText' },
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

      {/* ---- Featured shelf ---------------------------------------------- */}
      <section className="section-y" aria-labelledby="featured-reports-heading">
        <div className="container-plug">
          <SectionHeading
            id="featured-reports-heading"
            eyebrow="Start here"
            title="Three reports that answer"
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

      {/* ---- Publishing guide -------------------------------------------- */}
      <section className="section-y" aria-labelledby="publishing-heading">
        <div className="container-plug grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="publishing-heading"
              eyebrow="For our team & partners"
              title="Publishing a report takes"
              accent="three steps"
              description="The repository is content-driven. Anyone with repository access can publish a new brief without touching a layout file."
            />
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Drop the PDF into /public/reports/',
                  detail:
                    'Name the file to match the report slug, e.g. tvet-funding-flows-botswana-2026.pdf. Anything in /public is served from the site root.',
                },
                {
                  step: '02',
                  title: 'Add an entry to src/data/reports.js',
                  detail:
                    'One object per report: slug, dimensionId, title, summary, highlights, tags and audience. The grid, filters, counts and metadata all update from that single entry.',
                },
                {
                  step: '03',
                  title: 'Commit and push to main',
                  detail:
                    'GitHub Actions runs next build with output: export, then publishes the refreshed static site to GitHub Pages automatically.',
                },
              ].map((item, index) => (
                <Reveal key={item.step} delay={index * 0.07} variant="slideInLeft" as="li">
                  <div className="glass glass-hover flex gap-5 p-6">
                    <span className="text-gradient text-2xl font-semibold tracking-tightest">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-offwhite">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.1} className="mt-6">
              <div className="glass overflow-x-auto p-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Folder contract
                </p>
                <pre className="font-mono text-[12px] leading-relaxed text-cyan-200">
                  {`public/
├── reports/
│   ├── ${reportDimensions[0].slug}.pdf
│   ├── ${publishedReports[1]?.slug || 'report-slug'}.pdf
│   └── ...  (${publishedReports.length} reports published)
└── sitemap.xml, robots.txt`}
                </pre>
              </div>
            </Reveal>
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