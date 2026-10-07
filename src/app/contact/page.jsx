/**
 * CONTACT - /contact
 * ===========================================================================
 * Sleek functional contact UI: the validated enquiry form (name, email, query
 * type: Student / Employer / Stakeholder), the full contact block for the
 * Francistown office, response expectations, and a short FAQ.
 * ===========================================================================
 */

import Link from 'next/link';

import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import SubstackCTA from '@/components/SubstackCTA';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';

import { queryTypes, siteConfig } from '@/data/site';
import { reportMetrics } from '@/data/reports';

export const metadata = {
  title: 'Contact Us',
  description:
    'Contact THE PLUG TVET - theplugtvet@gmail.com, Blue Jacket Street, Francistown, Botswana, +267 75476059. Enquiries for students, employers, stakeholders and investors.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact THE PLUG TVET',
    description:
      'Reach the TVET information hub and boutique consultancy in Francistown, Botswana. Student guidance, employer pipelines and stakeholder enquiries.',
    url: '/contact',
  },
};

/** Contact detail cards rendered beside the form. */
const detailCards = [
  {
    icon: 'mail',
    label: 'Email',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    note: 'Best for detailed questions - attach documents if useful.',
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: siteConfig.contact.phoneDisplay,
    href: `tel:${siteConfig.contact.phoneHref}`,
    note: siteConfig.contact.hours,
  },
  {
    icon: 'mapPin',
    label: 'Office',
    value: `${siteConfig.contact.addressLine}, ${siteConfig.contact.city}`,
    href: null,
    note: `${siteConfig.contact.country} · visits by appointment`,
  },
];

/** Frequently asked questions - short answers that cut email volume. */
const faqs = [
  {
    question: 'Do you charge students for guidance?',
    answer:
      'No. Course and career guidance, application information and every downloadable report are free of charge. Revenue comes from consultancy mandates with institutions, employers and partners.',
  },
  {
    question: 'I am an employer - can you build a talent pipeline for us?',
    answer:
      'Yes. We map the trades you need against accredited training capacity, design the attachment or learnership structure, and help you access levy-funded training. Select “Employer / Industry” in the form.',
  },
  {
    question: 'Can you research a specific sector or region?',
    answer:
      'We take on boutique research mandates across all five of our industrial dimensions. Send the decision you need to make and we will scope the work, timeline and cost honestly.',
  },
  {
    question: 'How quickly will I hear back?',
    answer:
      'Within two working days. Admission-deadline enquiries are prioritised - note the deadline in your message and we will respond faster where we can.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Talk to the people who"
        accent="answer TVET questions"
        description="Whether you are a learner working to a deadline, an employer building a pipeline, or a stakeholder who needs evidence - this reaches a human being in Francistown, not a ticket queue."
        crumbLabel="Contact"
      >
        <a href={`mailto:${siteConfig.contact.email}`} className="btn-primary">
          <Icon name="mail" className="h-4 w-4" />
          {siteConfig.contact.email}
        </a>
        <a
          href={siteConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <BrandIcon name="whatsapp" className="h-4 w-4 text-teal-300" />
          WhatsApp {siteConfig.contact.phoneDisplay}
        </a>
      </PageHeader>

      {/* ---- Form + details ---------------------------------------------- */}
      <section className="section-y" aria-labelledby="contact-form-heading">
        <div className="container-plug grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---- Form ---------------------------------------------------- */}
          <div className="lg:col-span-7">
            <h2 id="contact-form-heading" className="sr-only">
              Send an enquiry to THE PLUG TVET
            </h2>

            <ContactForm />

            {/* Query-type explainer */}
            <Reveal delay={0.1} className="mt-6">
              <ul className="grid gap-3 sm:grid-cols-3">
                {queryTypes.map((type) => (
                  <li key={type.value} className="glass p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                      {type.label}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-300">{type.hint}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Details ------------------------------------------------- */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-5">
              {detailCards.map((card, index) => (
                <Reveal key={card.label} delay={index * 0.08} variant="slideInRight">
                  <div className="glass glass-hover flex items-start gap-4 p-6">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                      <Icon name={card.icon} className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {card.label}
                      </p>

                      {card.href ? (
                        <a
                          href={card.href}
                          className="mt-1 block break-words text-sm font-medium text-offwhite transition-colors hover:text-cyan-300"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <address className="mt-1 text-sm font-medium not-italic text-offwhite">
                          {card.value}
                        </address>
                      )}

                      <p className="mt-1 text-xs text-slate-400">{card.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Office hours + socials */}
              <Reveal delay={0.24} variant="slideInRight">
                <div className="glass p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Working hours
                  </p>
                  <p className="mt-2 text-sm text-slate-100">{siteConfig.contact.hours}</p>

                  <div className="hairline my-5" />

                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Follow the community
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { key: 'facebook', href: siteConfig.socials.facebook, label: 'Facebook' },
                      { key: 'tiktok', href: siteConfig.socials.tiktok, label: 'TikTok' },
                    ].map((social) => (
                      <a
                        key={social.key}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`THE PLUG TVET on ${social.label}`}
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-600/50 bg-slate-900/60 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300"
                      >
                        <BrandIcon name={social.key} className="h-[1.1rem] w-[1.1rem]" />
                      </a>
                    ))}
                  </div>

                  <div className="hairline my-5" />

                  <p className="text-xs leading-relaxed text-slate-400">
                    {siteConfig.contact.addressLine}, {siteConfig.contact.city},{' '}
                    {siteConfig.contact.country}. Our team works across the country; in-person
                    meetings are arranged in advance.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ + Substack --------------------------------------------- */}
      <section
        className="section-y border-t border-slate-700/50 bg-slate-950/40"
        aria-labelledby="faq-heading"
      >
        <div className="container-plug grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="faq-heading"
              eyebrow="Quick answers"
              title="Before you write,"
              accent="this may already help"
              description="Four questions we answer most often. Anything not covered here goes straight into the form."
            />

            <Reveal delay={0.15} className="mt-8">
              <div className="glass flex items-start gap-4 p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-teal-400/40 bg-teal-400/10 text-teal-300">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-offwhite">
                    Response promise
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                    Every enquiry receives a reply within two working days. If your deadline is
                    closer, say so in the subject line.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <dl className="space-y-4">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 0.07} variant="slideInRight">
                  <div className="glass p-6">
                    <dt className="flex items-start gap-3 text-base font-semibold tracking-tight text-offwhite">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-[11px] font-semibold text-cyan-300">
                        {index + 1}
                      </span>
                      {faq.question}
                    </dt>
                    <dd className="mt-3 pl-9 text-sm leading-relaxed text-slate-300">
                      {faq.answer}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---- Long-form invitation --------------------------------------- */}
      <section className="pt-20 sm:pt-24" aria-labelledby="contact-substack-heading">
        <div className="container-plug">
          <SubstackCTA
            eyebrow="Stay informed"
            title="Read before you ask"
            description="Most of the questions we receive are answered in full on Substack - funding mechanics, admission sequencing, skills demand and the data behind our recommendations."
          />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-300">
              Prefer to see the work first? The insight repository has{' '}
              <span className="font-semibold text-offwhite">
                {reportMetrics.total} free {reportMetrics.total === 1 ? 'report' : 'reports'}
              </span>{' '}
              across five dimensions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/insights" className="btn-ghost">
                Open the repository
                <Icon name="download" className="h-4 w-4" />
              </Link>
              <Link href="/news" className="btn-quiet">
                Read the latest briefs
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}