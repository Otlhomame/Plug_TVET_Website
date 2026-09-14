/**
 * TVET NEWS - /news
 * ===========================================================================
 * The rapid-read blog index. Every post here is a 4-5 minute executive summary
 * of an issue affecting Botswana's skills economy, and every post routes the
 * long-form reader to Substack through the global <DeeperAnalysis /> anchor.
 * ===========================================================================
 */

import Link from 'next/link';

import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import NewsExplorer from '@/components/NewsExplorer';
import SubstackCTA from '@/components/SubstackCTA';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';

import { siteConfig } from '@/data/site';
import { newsCategories, sortedPosts } from '@/data/news';

export const metadata = {
  title: 'TVET News',
  description:
    'Four to five minute TVET news briefs for Botswana - admissions windows, funding calls, skills demand, graduate pathways, green skills and industry trends. Short reads here, deep analysis on Substack.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'TVET News | THE PLUG TVET',
    description:
      'Rapid-read summaries of every TVET headline that matters in Botswana, each routed to a full Substack deep dive.',
    url: '/news',
  },
};

/** The editorial promise behind the 4-5 minute format. */
const formatPromise = [
  {
    icon: 'clock',
    title: 'Four minutes, not forty',
    detail:
      'Written for the commute, the lunch break or the queue outside an admissions office. The decision first, the detail second.',
  },
  {
    icon: 'target',
    title: 'Built on primary sources',
    detail:
      'Notices, gazettes, institutional publications and direct employer input - not recycled social media speculation.',
  },
  {
    icon: 'book',
    title: 'Always routed to the long version',
    detail:
      'Every brief carries a Deeper Analysis anchor. If you need the evidence, one click takes you to the full Substack issue.',
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="TVET News"
        title="The 4-5 minute"
        accent="TVET brief"
        description="Botswana’s skills economy moves quickly and quietly: a funding window opens, a qualification framework changes, a project is approved. We catch it, verify it, and explain what it means for you."
        crumbLabel="TVET News"
      >
        <a
          href={siteConfig.substack.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <BrandIcon name="substack" className="h-4 w-4" />
          Subscribe for the deep dives
        </a>
        <Link href="/insights" className="btn-ghost">
          Download the reports
          <Icon name="download" className="h-4 w-4" />
        </Link>
      </PageHeader>

      {/* ---- Editorial promise ------------------------------------------- */}
      <section
        className="border-b border-slate-700/50 bg-slate-950/40 py-10"
        aria-label="Our editorial format"
      >
        <div className="container-plug grid gap-5 md:grid-cols-3">
          {formatPromise.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07} variant="fadeUp">
              <div className="glass flex h-full gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-offwhite">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{item.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Blog grid ---------------------------------------------------- */}
      <section className="section-y" aria-labelledby="news-grid-heading">
        <div className="container-plug">
          <SectionHeading
            id="news-grid-heading"
            eyebrow="Latest briefs"
            title="Read the summary."
            accent="Then go as deep as you need."
            description="Filter by the topic you care about, or scroll the full archive. Every card links to both the on-site brief and the Substack deep dive."
          />

          <div className="mt-12">
            <NewsExplorer posts={sortedPosts} categories={newsCategories} />
          </div>
        </div>
      </section>

      {/* ---- Long-form invitation --------------------------------------- */}
      <section className="pb-20 sm:pb-24" aria-labelledby="news-substack-heading">
        <div className="container-plug">
          <SubstackCTA
            eyebrow="Deeper Analysis"
            title="Never miss the full analysis"
            description="Subscribe once and every long-form issue lands in your inbox - the policy references, the data tables and the recommendations that would never survive a four-minute edit."
          />
        </div>
      </section>
    </>
  );
}