/**
 * 404 - /not-found
 * ===========================================================================
 * Served by Next.js for any unmatched route. Because the site is a static
 * export, GitHub Pages serves `out/404.html` for unknown paths - so this page
 * is genuinely reachable in production and must help the visitor recover.
 * ===========================================================================
 */

import Link from 'next/link';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import Logo from '@/components/Logo';
import { siteConfig } from '@/data/site';
import { navLinks } from '@/data/site';

export const metadata = {
  title: 'Page not found',
  description:
    'That page could not be found. Jump back to THE PLUG TVET homepage, browse TVET News, or download an industry insight report.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden py-20">
      {/* Ambient backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 animate-aurora rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="container-plug">
        <div className="glass-strong mx-auto max-w-3xl p-8 text-center sm:p-12">
          <div className="flex justify-center">
            <Logo linked={false} compact />
          </div>

          <p className="eyebrow mt-8 justify-center">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Error 404
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tightest text-offwhite sm:text-5xl">
            This page has been
            <span className="text-gradient"> unplugged</span>
          </h1>

          <p className="lede mx-auto mt-5 max-w-xl">
            The link is broken or the page has moved. Everything else is still live - admissions
            guidance, the insight repository and every rapid-read brief.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Back to homepage
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link href="/insights" className="btn-ghost">
              Industry insights
              <Icon name="download" className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.substack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet"
            >
              <BrandIcon name="substack" className="h-4 w-4 text-orange-300" />
              Substack
            </a>
          </div>

          <div className="hairline my-9" />

          <nav aria-label="Site map">
            <ul className="flex flex-wrap justify-center gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="chip transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-8 text-xs text-slate-400">
            Still stuck? Email{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-cyan-300 underline decoration-cyan-400/40 underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>{' '}
            and we will point you to the right place.
          </p>
        </div>
      </div>
    </section>
  );
}