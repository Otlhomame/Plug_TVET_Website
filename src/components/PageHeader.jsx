/**
 * <PageHeader /> - inner page masthead
 * ---------------------------------------------------------------------------
 * Shared hero treatment for every page that is not the homepage: breadcrumb,
 * eyebrow, oversized title with gradient accent, lede and optional action slot.
 * Keeps the vertical rhythm identical across About, Services, Insights, News
 * and Contact.
 */

import Link from 'next/link';

import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';

/**
 * @param {object} props
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.accent]      gradient trailing words
 * @param {string} [props.description]
 * @param {string} props.path          current path, for the breadcrumb
 * @param {string} [props.crumbLabel]  label for the current page
 * @param {React.ReactNode} [props.children] action row rendered under the lede
 */
export default function PageHeader({
  eyebrow,
  title,
  accent = '',
  description,
  path,
  crumbLabel,
  children,
}) {
  return (
    <header className="relative overflow-hidden border-b border-slate-700/50 pb-16 pt-14 sm:pb-20 sm:pt-20">
      {/* Ambient brand glow + grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute -left-24 -top-32 h-96 w-96 animate-aurora rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-20 top-0 h-80 w-80 animate-aurora rounded-full bg-teal-500/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <div className="container-plug">
        {/* ---- Breadcrumb ------------------------------------------------- */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-cyan-300">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevronRight" className="h-3 w-3" />
            </li>
            <li className="text-cyan-200">{crumbLabel || title}</li>
          </ol>
        </nav>

        <div className="mt-8 max-w-4xl">
          <Reveal variant="fadeIn">
            <p className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tightest text-offwhite sm:text-5xl lg:text-6xl">
              {title}
              {accent ? (
                <>
                  {' '}
                  <span className="text-gradient">{accent}</span>
                </>
              ) : null}
            </h1>
          </Reveal>

          {description && (
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-3xl">{description}</p>
            </Reveal>
          )}

          {children && (
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}