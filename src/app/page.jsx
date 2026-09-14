/**
 * HOME - /
 * ===========================================================================
 * The flagship page, in the order a first-time visitor needs it:
 *
 *   1. Hero               - positioning + dual CTA (insights / Substack)
 *   2. SocialTicker       - live traction marquee (62K+ Facebook, 6K+ TikTok)
 *   3. StatsBento         - dynamic bento grid of social + editorial traction
 *   4. PillarGrid         - the three pillars: Inform, Guide, Connect
 *   5. Services preview   - the four core offerings, routed to /services
 *   6. Featured reports   - downloadable evidence from /insights
 *   7. Latest news        - 4-5 minute rapid reads from /news
 *   8. SubstackCTA        - the long-form conversion panel
 *   9. Contact band       - direct routes to the consultancy
 *
 * Fully static: every section is either a server component or a client island
 * already used elsewhere on the site.
 * ===========================================================================
 */

import Link from 'next/link';

import Hero from '@/components/Hero';
import SocialTicker from '@/components/SocialTicker';
import StatsBento from '@/components/StatsBento';
import PillarGrid from '@/components/PillarGrid';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ReportCard from '@/components/ReportCard';
import NewsCard from '@/components/NewsCard';
import SubstackCTA from '@/components/SubstackCTA';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';

import { siteConfig } from '@/data/site';
import { services } from '@/data/services';
import { dimensionById, featuredReports } from '@/data/reports';
import { sortedPosts } from '@/data/news';

/* Take a slice so the home page stays a summary, not an archive. */
const latestPosts = sortedPosts.slice(0, 3);
const featuredInsights = featuredReports.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ---- 1. Hero ------------------------------------------------------ */}
      <Hero />

      {/* ---- 2. Traction marquee ------------------------------------------ */}
      <SocialTicker />

      {/* ---- 3. Stats bento ---------------------------------------------- */}
      <section className="section-y" aria-labelledby="traction-heading">
        <div className="container-plug">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="traction-heading"
              eyebrow="Social traction"
              title="One network,"
              accent="62,000+ strong"
              description="THE PLUG TVET grew from a Francistown page answering admission questions into Botswana’s largest independent TVET information community - built on accuracy, speed and plain language."
            />

            <Reveal delay={0.15} className="shrink-0">
              <div className="glass flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                  <Icon name="trendUp" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-offwhite">
                    Audience-first, always free
                  </p>
                  <p className="text-xs text-slate-400">
                    No paywall on information that changes lives.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-12">
            <StatsBento />
          </div>
        </div>
      </section>

      {/* ---- 4. Pillars --------------------------------------------------- */}
      <section className="section-y border-y border-slate-700/50 bg-slate-950/40" aria-labelledby="pillars-heading">
        <div className="container-plug">
          <SectionHeading
            id="pillars-heading"
            eyebrow="Core pillars"
            title="Inform. Guide."
            accent="Connect."
            description="Three commitments that shape everything we publish, every report we release and every partnership we take on."
            align="center"
          />

          <div className="mt-14">
            <PillarGrid />
          </div>
        </div>
      </section>

      {/* ---- 5. Services preview ----------------------------------------- */}
      <section className="section-y" aria-labelledby="services-preview-heading">
        <div className="container-plug">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-preview-heading"
              eyebrow="Core offerings"
              title="What we actually"
              accent="do for you"
              description="Four services, delivered as a boutique consultancy and as free public information - depending on who needs it."
            />

            <Reveal delay={0.12} className="shrink-0">
              <Link href="/services" className="btn-ghost">
                Full service detail
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.07} variant="scaleIn">
                <article className="glass glass-hover group flex h-full flex-col p-6">
                  <span
                    className={[
                      'grid h-11 w-11 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-110',
                      service.accent === 'teal'
                        ? 'border-teal-400/40 bg-teal-400/10 text-teal-300'
                        : 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
                    ].join(' ')}
                  >
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-offwhite">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-cyan-200/90">{service.short}</p>

                  <p className="mt-4 flex-1 text-[13px] leading-relaxed text-slate-300">
                    {service.summary}
                  </p>

                  <p className="mt-5 border-t border-slate-700/60 pt-4 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    {service.forWho}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 6. Featured insight reports --------------------------------- */}
      <section
        className="section-y border-y border-slate-700/50 bg-slate-950/40"
        aria-labelledby="featured-insights-heading"
      >
        <div className="container-plug">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="featured-insights-heading"
              eyebrow="Industry insights"
              title="Download the evidence,"
              accent="free"
              description="Our report library is organised into five industrial dimensions and published as PDFs you can hand straight to a board, a classroom or a policymaker."
            />

            <Reveal delay={0.12} className="shrink-0">
              <Link href="/insights" className="btn-primary">
                Open the repository
                <Icon name="download" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredInsights.map((report, index) => (
              <Reveal key={report.id} delay={index * 0.08} variant="scaleIn" className="h-full">
                <ReportCard report={report} dimension={dimensionById[report.dimensionId]} featured />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <div className="glass flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-offwhite">Publishing a report?</span> Drop the
                PDF into{' '}
                <code className="rounded bg-slate-950/70 px-2 py-0.5 font-mono text-[11px] text-cyan-200">
                  /public/reports/
                </code>{' '}
                and it deploys automatically through GitHub Actions.
              </p>
              <Link href="/insights#insight-grid" className="btn-ghost shrink-0 !py-2.5">
                Browse all dimensions
                <Icon name="arrowDown" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ---- 7. Latest TVET News ----------------------------------------- */}
      <section className="section-y" aria-labelledby="latest-news-heading">
        <div className="container-plug">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="latest-news-heading"
              eyebrow="TVET News"
              title="The 4-5 minute"
              accent="brief"
              description="Every headline that matters to Botswana’s skills economy, summarised for the commute - with a direct route to the full analysis on Substack."
            />

            <Reveal delay={0.12} className="shrink-0">
              <Link href="/news" className="btn-ghost">
                All rapid reads
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {latestPosts.map((post, index) => (
              <Reveal
                key={post.id}
                delay={index * 0.08}
                variant="scaleIn"
                className={index === 0 ? 'lg:col-span-2 xl:col-span-1' : ''}
              >
                <NewsCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 8. Substack conversion panel -------------------------------- */}
      <section className="pb-20 sm:pb-24 lg:pb-28" aria-labelledby="home-substack-heading">
        <div className="container-plug">
          <SectionHeading
            id="home-substack-heading"
            eyebrow="Long-form channel"
            title="Short reads here."
            accent="Deep analysis on Substack."
            description="Four minutes gives you the decision. The full Substack issue gives you the evidence behind it - methodology, tables, sources and recommendations by audience."
            align="center"
          />

          <div className="mt-12">
            <SubstackCTA />
          </div>
        </div>
      </section>

      {/* ---- 9. Contact band --------------------------------------------- */}
      <section className="border-t border-slate-700/50 bg-slate-950/60 py-16" aria-labelledby="home-contact-heading">
        <div className="container-plug">
          <div className="glass-strong grid gap-8 p-8 lg:grid-cols-12 lg:items-center lg:p-10">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                <Icon name="network" className="h-3.5 w-3.5" />
                Work with THE PLUG TVET
              </p>
              <h2
                id="home-contact-heading"
                className="mt-4 text-2xl font-semibold tracking-tighter text-offwhite sm:text-3xl"
              >
                Students, employers, institutions and policymakers - there is a desk for you.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                Bring us a learner in need of a pathway, a curriculum in need of an industry check,
                or a skills question that needs real data. We answer in plain language.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-5">
              <Link href="/contact" className="btn-primary w-full">
                Start a conversation
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="btn-ghost w-full !justify-start"
              >
                <Icon name="mail" className="h-4 w-4 text-cyan-300" />
                {siteConfig.contact.email}
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="btn-ghost !justify-start !px-4"
                >
                  <Icon name="phone" className="h-4 w-4 text-cyan-300" />
                  Call
                </a>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !justify-start !px-4"
                >
                  <BrandIcon name="whatsapp" className="h-4 w-4 text-teal-300" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}