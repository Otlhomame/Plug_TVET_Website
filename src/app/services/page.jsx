/**
 * SERVICES - /services
 * ===========================================================================
 * The core offerings page: the interactive 4-column bento grid, the boutique
 * consultancy mandates, the four-step engagement model, and the six audience
 * segments we serve (students through to global investors).
 * ===========================================================================
 */

import Link from 'next/link';

import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ServicesBento from '@/components/ServicesBento';
import SubstackCTA from '@/components/SubstackCTA';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';

import { siteConfig } from '@/data/site';
import { consultancyServices, engagementSteps } from '@/data/services';

export const metadata = {
  title: 'Services',
  description:
    'Courses and career guidance, applications and opportunities, skills and training information, and student and graduate stories - plus boutique consultancy for institutions, employers and investors in Botswana.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | THE PLUG TVET',
    description:
      'Four core offerings and a boutique consultancy spanning labour-market research, curriculum relevance, placement design and insight reporting.',
    url: '/services',
  },
};

/** Audience segments, mapping each group to the value we deliver. */
const audiences = [
  {
    icon: 'compass',
    title: 'Aspiring students',
    detail:
      'Programme selection, entry requirements, funding routes and realistic career outcomes - in language that does not require a policy degree.',
  },
  {
    icon: 'users',
    title: 'Parents & guardians',
    detail:
      'Confidence that the vocational route is a real career, with evidence on earnings, progression and employer demand.',
  },
  {
    icon: 'book',
    title: 'Educators & trainers',
    detail:
      'Current labour-market signals for curriculum design, plus case studies on what works inside TVET institutions.',
  },
  {
    icon: 'building',
    title: 'Employers & industry',
    detail:
      'Talent pipeline visibility, attachment and learnership design, and levy-funded training that actually converts.',
  },
  {
    icon: 'scale',
    title: 'Policymakers',
    detail:
      'Region-level skills data, funding-flow analysis and independent evidence for programme and budget decisions.',
  },
  {
    icon: 'globe',
    title: 'Global investors',
    detail:
      'ESG-aligned impact reporting on skills interventions, built to survive due diligence and audit.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Core offerings"
        title="Services built for"
        accent="Botswana’s skills economy"
        description="Four public offerings that keep information free and flowing, plus a boutique consultancy for the institutions, employers and partners who need deeper, bespoke work."
        crumbLabel="Services"
      >
        <Link href="/contact" className="btn-primary">
          Request a consultation
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
        <Link href="/insights" className="btn-ghost">
          See the evidence base
          <Icon name="download" className="h-4 w-4" />
        </Link>
      </PageHeader>

      {/* ---- Interactive bento grid -------------------------------------- */}
      <section className="section-y" aria-labelledby="offerings-heading">
        <div className="container-plug">
          <SectionHeading
            id="offerings-heading"
            eyebrow="What we deliver"
            title="Four offerings,"
            accent="one connected system"
            description="All four offerings are laid out below in full: what is delivered, the checklist behind it, and the outcome you can expect. Tap any tile to collapse it while you compare - every offering is available as free public guidance, and as a structured engagement."
          />

          <div className="mt-12">
            <ServicesBento />
          </div>

          <Reveal delay={0.1} className="mt-8">
            <p className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <Icon name="sparkles" className="h-3.5 w-3.5 text-cyan-400" />
              Looking for guidance for a specific programme or intake? Email
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-cyan-300 underline decoration-cyan-400/40 underline-offset-4 transition hover:decoration-cyan-300"
              >
                {siteConfig.contact.email}
              </a>
              with your subject passes and we will map your options.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Boutique consultancy --------------------------------------- */}
      <section
        className="section-y border-y border-slate-700/50 bg-slate-950/40"
        aria-labelledby="consultancy-heading"
      >
        <div className="container-plug">
          <SectionHeading
            id="consultancy-heading"
            eyebrow="Boutique consultancy"
            title="When you need more than"
            accent="public information"
            description="Retained mandates for institutions, industry, development partners and investors. Delivered in plain language, evidenced end to end, and formatted for the decision you actually have to make."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {consultancyServices.map((mandate, index) => (
              <Reveal key={mandate.title} delay={index * 0.06} variant="scaleIn">
                <article className="glass glass-hover flex h-full flex-col p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-teal-400/40 bg-teal-400/10 text-teal-300">
                    <Icon name="target" className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-offwhite">
                    {mandate.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{mandate.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Engagement model ------------------------------------------- */}
      <section className="section-y" aria-labelledby="engagement-heading">
        <div className="container-plug">
          <SectionHeading
            id="engagement-heading"
            eyebrow="How an engagement runs"
            title="Four steps from"
            accent="question to decision"
            align="center"
          />

          <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {engagementSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.08} variant="slideInLeft" as="li">
                <div className="glass glass-hover relative flex h-full flex-col p-6">
                  <span className="text-gradient text-4xl font-semibold tracking-tightest">
                    {step.step}
                  </span>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-offwhite">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1} className="mt-10">
            <div className="glass flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-offwhite">Typical turnaround:</span> discovery
                within 5 working days, findings delivered in 2-6 weeks depending on scope.
              </p>
              <Link href="/contact" className="btn-primary shrink-0 !py-2.5">
                Book a discovery call
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ---- Who we serve ----------------------------------------------- */}
      <section
        className="section-y border-y border-slate-700/50 bg-slate-950/40"
        aria-labelledby="audience-heading"
      >
        <div className="container-plug">
          <SectionHeading
            id="audience-heading"
            eyebrow="Who we serve"
            title="Six audiences,"
            accent="one shared goal"
            description="TVET only works when learners, families, educators, employers and policymakers are reading from the same page. We publish for all of them."
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={index * 0.06} variant="scaleIn">
                <article className="glass glass-hover flex h-full flex-col p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                    <Icon name={audience.icon} className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-base font-semibold tracking-tight text-offwhite">
                    {audience.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{audience.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Long-form invitation + closing CTA -------------------------- */}
      <section className="section-y" aria-labelledby="services-closing-heading">
        <div className="container-plug">
          <SubstackCTA
            eyebrow="Research you can reuse"
            title="Every method, published openly"
            description="Our Substack issues explain how each finding was produced - so the data can be checked, challenged and reused in your own work."
          />

          <div className="glass-strong mt-10 grid gap-6 p-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2
                id="services-closing-heading"
                className="text-xl font-semibold tracking-tighter text-offwhite sm:text-2xl"
              >
                Start with the question you cannot answer
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Send us the decision you need to make - a programme to validate, a pipeline to fill,
                a policy to cost, an investment to justify. We will tell you honestly whether we can
                help, and what the work would involve.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Enquire now
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <BrandIcon name="whatsapp" className="h-4 w-4 text-teal-300" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ul className="space-y-3 rounded-2xl border border-slate-600/40 bg-slate-950/50 p-5 text-sm text-slate-200">
                {[
                  'Independent - we do not sell training seats',
                  'Evidence-first - sources on every claim',
                  'Plain language - boards and learners both read it',
                  'Botswana-specific - local data, global reporting standards',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
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
        </div>
      </section>
    </>
  );
}