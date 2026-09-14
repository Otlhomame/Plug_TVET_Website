/**
 * ABOUT - /about
 * ===========================================================================
 * Mission ("Empowering Skills. Building Futures."), the local ecosystem
 * problem we exist to solve, the milestones so far, the strategic goals for
 * Botswana's national growth, and the operating principles behind all of it.
 * ===========================================================================
 */

import Link from 'next/link';

import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import SubstackCTA from '@/components/SubstackCTA';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';

import { siteConfig } from '@/data/site';
import { ecosystemChallenges, milestones, strategicGoals } from '@/data/stats';

export const metadata = {
  title: 'About Us',
  description:
    'THE PLUG TVET is Botswana’s TVET information hub and boutique consultancy. Read our mission - Empowering Skills. Building Futures. - plus our ecosystem impact and strategic goals for national growth.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About THE PLUG TVET | Empowering Skills. Building Futures.',
    description:
      'Why THE PLUG TVET exists: closing Botswana’s TVET information gap, making skills demand visible, and connecting learners to industry.',
    url: '/about',
  },
};

/** How we operate - the principles that keep the brand trustworthy. */
const principles = [
  {
    icon: 'shield',
    title: 'Accuracy before speed',
    detail:
      'We verify against the institution or the gazette before we publish. When we are unsure, we say so plainly rather than guessing.',
  },
  {
    icon: 'unlock',
    title: 'Information is never the product',
    detail:
      'Public guidance stays free. Revenue comes from consultancy mandates and research, never from charging learners for access.',
  },
  {
    icon: 'target',
    title: 'Answer the actual question',
    detail:
      'Learners do not need policy language. They need to know what to do, by when, and with which documents.',
  },
  {
    icon: 'globe',
    title: 'Local data, global standards',
    detail:
      'Botswana-specific evidence, presented to the standard international investors, funders and regulators expect.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About THE PLUG TVET"
        title="Empowering Skills."
        accent="Building Futures."
        description="We are a Botswana-born TVET information hub and boutique consultancy. Our work is simple to describe and hard to overstate: get the right information to the right learner, and get real evidence to the people who fund, regulate and hire."
        crumbLabel="About"
      >
        <Link href="/services" className="btn-primary">
          Explore our services
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
        <a
          href={siteConfig.substack.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <BrandIcon name="substack" className="h-4 w-4 text-orange-300" />
          Read our analysis
        </a>
      </PageHeader>

      {/* ---- The story ---------------------------------------------------- */}
      <section className="section-y" aria-labelledby="story-heading">
        <div className="container-plug grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              id="story-heading"
              eyebrow="Who we are"
              title="Built in Francistown,"
              accent="on a simple observation."
              description="Thousands of qualified young Batswana were missing opportunities that already existed - for want of a clear, timely, trustworthy answer."
            />

            <Reveal delay={0.1}>
              <div className="article-body mt-8">
                <p>
                  THE PLUG TVET began as a social channel answering the questions that arrive at
                  every intake: what does this programme actually require, which bursary closes
                  first, is this qualification recognised, and what happens after the certificate.
                  Those answers were public but scattered - across gazettes, institutional notices,
                  levy circulars and hearsay.
                </p>
                <p>
                  Today that channel is a national community of more than{' '}
                  <strong>62,000 Facebook followers</strong> and{' '}
                  <strong>6,000 TikTok followers</strong>, supported by a free insight library of
                  downloadable reports and a Substack publication for readers who need the long
                  version. The audience is not only students: parents forward our posts, educators
                  use them in class, and employers and policymakers cite the data.
                </p>
                <p>
                  As a boutique consultancy we now work directly with institutions, industry and
                  development partners - auditing skills supply, testing curriculum relevance,
                  designing placement pathways and reporting outcomes to ESG standards. The public
                  work keeps us honest; the consultancy work keeps the evidence sharp.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Facts panel --------------------------------------------- */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="glass-strong p-7 lg:sticky lg:top-28">
              <p className="eyebrow">
                <Icon name="sparkles" className="h-3.5 w-3.5" />
                At a glance
              </p>

              <dl className="mt-6 space-y-5">
                {[
                  { label: 'Founded', value: `${siteConfig.founded} · Francistown` },
                  { label: 'Community', value: '62K+ across Facebook & TikTok' },
                  { label: 'Focus', value: 'TVET information & boutique consultancy' },
                  {
                    label: 'Research dimensions',
                    value: 'Policy · Projects · Skills · Institutions · ESG',
                  },
                  { label: 'Reach', value: 'All regions of Botswana' },
                  { label: 'Access model', value: 'Free public insight, paid mandates' },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm text-slate-100">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="hairline my-7" />

              <p className="text-sm leading-relaxed text-slate-300">
                “Empowering Skills. Building Futures.” is not brochure copy. It is the test every
                publication and every mandate has to pass.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- The ecosystem gap we close ---------------------------------- */}
      <section
        className="section-y border-y border-slate-700/50 bg-slate-950/40"
        aria-labelledby="ecosystem-heading"
      >
        <div className="container-plug">
          <SectionHeading
            id="ecosystem-heading"
            eyebrow="The ecosystem gap"
            title="Botswana does not have a skills shortage"
            accent="so much as an information shortage."
            description="Three failures create most of the lost opportunity we see in the TVET ecosystem. Each one is fixable with better publishing, better data and better connections."
            align="center"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {ecosystemChallenges.map((challenge, index) => (
              <Reveal key={challenge.problem} delay={index * 0.08} variant="scaleIn">
                <article className="glass glass-hover flex h-full flex-col p-7">
                  <span className="text-4xl font-semibold tracking-tightest text-slate-500/60">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tighter text-offwhite">
                    {challenge.problem}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                    {challenge.detail}
                  </p>

                  <p className="mt-6 inline-flex items-center gap-2 border-t border-slate-700/60 pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.2} />
                    Our response: publish, map, connect
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Milestones timeline ----------------------------------------- */}
      <section className="section-y" aria-labelledby="milestones-heading">
        <div className="container-plug">
          <SectionHeading
            id="milestones-heading"
            eyebrow="Milestones"
            title="From a shared post"
            accent="to a national platform"
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.year} delay={index * 0.08} variant="slideInLeft" as="li">
                <div className="glass glass-hover relative flex h-full flex-col p-6">
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-10 hidden h-px w-6 bg-gradient-to-r from-cyan-400/60 to-transparent xl:block"
                  />

                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-tight text-cyan-200">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    {milestone.year}
                  </span>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-offwhite">
                    {milestone.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{milestone.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      {/* ---- Strategic goals -------------------------------------------- */}
      <section
        className="section-y border-y border-slate-700/50 bg-slate-950/40"
        aria-labelledby="goals-heading"
      >
        <div className="container-plug">
          <SectionHeading
            id="goals-heading"
            eyebrow="Strategic goals"
            title="What we are building"
            accent="for Botswana’s growth"
            description="Four goals, each measurable, each aimed at the same outcome: more skilled people working in the roles the country actually needs filled."
            align="center"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {strategicGoals.map((goal, index) => (
              <Reveal key={goal.id} delay={index * 0.07} variant="scaleIn">
                <article className="glass glass-hover flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-teal-400/40 bg-teal-400/10 text-teal-300">
                      <Icon name="target" className="h-5 w-5" />
                    </span>
                    <span className="chip">{goal.horizon}</span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tighter text-offwhite">
                    {goal.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                    {goal.detail}
                  </p>

                  <p className="mt-6 inline-flex items-center gap-2 border-t border-slate-700/60 pt-5 text-xs font-medium text-cyan-200">
                    <Icon name="trendUp" className="h-4 w-4" />
                    {goal.metric}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* ---- Operating principles --------------------------------------- */}
      <section className="section-y" aria-labelledby="principles-heading">
        <div className="container-plug">
          <SectionHeading
            id="principles-heading"
            eyebrow="How we work"
            title="Four principles that"
            accent="keep us worth trusting"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.07} variant="scaleIn">
                <article className="glass glass-hover flex h-full flex-col p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                    <Icon name={principle.icon} className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-offwhite">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{principle.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Long-form invitation + closing CTA -------------------------- */}
      <section className="pb-20 sm:pb-24" aria-labelledby="about-closing-heading">
        <div className="container-plug">
          <SubstackCTA
            eyebrow="Go deeper"
            title="Follow the work, week by week"
            description="Every issue expands one of our five research dimensions - the evidence, the trade-offs, and what it means for Botswana. Free to read, free to share."
          />

          <div className="glass-strong mt-10 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
            <div>
              <h2
                id="about-closing-heading"
                className="text-xl font-semibold tracking-tighter text-offwhite sm:text-2xl"
              >
                Ready to work together?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Whether you are a learner mapping a pathway, an institution reviewing relevance, or
                an employer building a pipeline - start with a conversation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary shrink-0">
                Contact us
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/insights" className="btn-ghost shrink-0">
                Browse reports
                <Icon name="download" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}