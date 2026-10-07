/**
 * <Footer /> - global footer
 * ---------------------------------------------------------------------------
 * Server component: no interactivity beyond links, so it ships zero JS.
 * Contains the full navigation map, the five insight dimensions, the contact
 * block and the Substack invitation.
 */

import Link from 'next/link';

import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import { navLinks, siteConfig } from '@/data/site';
import { dimensionsWithCounts } from '@/data/reports';

/** Social channels rendered as icon buttons (label comes from the key). */
const socials = [
  { key: 'facebook', href: siteConfig.socials.facebook, label: 'Facebook' },
  { key: 'tiktok', href: siteConfig.socials.tiktok, label: 'TikTok' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-slate-700/50 bg-slate-950">
      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
      />

      <div className="container-plug grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        {/* ---- Brand + socials -------------------------------------------- */}
        <div className="lg:col-span-4">
          <Logo linked={false} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-300">
            {siteConfig.description}
          </p>

          <p className="mt-6 text-sm font-semibold tracking-tight text-cyan-300">
            {siteConfig.mission}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`THE PLUG TVET on ${social.label}`}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-600/50 bg-slate-900/60 text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-300"
              >
                <BrandIcon name={social.key} className="h-[1.15rem] w-[1.15rem]" />
              </a>
            ))}
          </div>
        </div>

        {/* ---- Explore ----------------------------------------------------- */}
        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
            Explore
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-300 transition-colors hover:text-cyan-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- Insight dimensions ----------------------------------------- */}
        <nav aria-label="Insight dimensions" className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
            Industry Insights
          </h2>
          <ul className="mt-5 space-y-3 text-sm">
            {dimensionsWithCounts.map((dimension) => (
              <li key={dimension.id}>
                <Link
                  href={`/insights#${dimension.id}`}
                  className="inline-flex items-start gap-2 text-slate-300 transition-colors hover:text-cyan-300"
                >
                  <Icon
                    name={dimension.icon}
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70"
                  />
                  <span>
                    {dimension.title}
                    <span className="ml-1.5 text-xs text-slate-400">({dimension.count})</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- Contact + Substack ----------------------------------------- */}
        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
            Contact
          </h2>

          <ul className="mt-5 space-y-4 text-sm text-slate-300">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-start gap-3 transition-colors hover:text-cyan-300"
              >
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="inline-flex items-start gap-3 transition-colors hover:text-cyan-300"
              >
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="inline-flex items-start gap-3">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" />
              <address className="not-italic">
                {siteConfig.contact.addressLine},<br />
                {siteConfig.contact.city}, {siteConfig.contact.country}
              </address>
            </li>
            <li className="inline-flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" />
              {siteConfig.contact.hours}
            </li>
          </ul>

          <a
            href={siteConfig.substack.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-6 w-full !justify-start"
          >
            <BrandIcon name="substack" className="h-4 w-4 text-cyan-300" />
            Read the deep dives
          </a>
        </div>
      </div>

      {/* ---- Bottom bar ---------------------------------------------------- */}
      <div className="border-t border-slate-700/50">
        <div className="container-plug flex flex-col gap-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Built in Francistown, Botswana for the whole country.</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <Link href="/contact" className="transition-colors hover:text-cyan-300">
              Work with us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}