'use client';

/**
 * <Navbar /> - sticky glassmorphic header
 * ---------------------------------------------------------------------------
 * - Fluid dark glass bar that densifies on scroll.
 * - Active route indicator driven by `usePathname()`.
 * - Full-height mobile sheet with staggered link entrance (Framer Motion).
 * - Global Substack CTA always visible, on every breakpoint.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import Logo from '@/components/Logo';
import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import { navLinks, siteConfig } from '@/data/site';
import { easings } from '@/lib/motion';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Densify the bar once the user leaves the top of the page. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll while the mobile sheet is open. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Close the sheet whenever the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /** True when `href` is the current route (or a parent of it). */
  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-500 ease-premium',
        scrolled
          ? 'border-b border-slate-600/40 bg-slate-950/80 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="container-plug flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
        {/* ---- Brand ------------------------------------------------------ */}
        <Logo />

        {/* ---- Desktop navigation ----------------------------------------- */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={[
                  'relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300',
                  active ? 'text-cyan-200' : 'text-slate-200/85 hover:text-offwhite',
                ].join(' ')}
              >
                {link.label}
                {active && (
                  /* Shared layoutId = the underline glides between links. */
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand-sheen"
                    transition={{ duration: 0.35, ease: easings.premium }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ---- Actions ---------------------------------------------------- */}
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.substack.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <BrandIcon name="substack" className="h-4 w-4" />
            Join the Substack
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-500/50 bg-slate-900/60 text-offwhite backdrop-blur transition hover:border-cyan-400/60 hover:text-cyan-200 lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ---- Mobile sheet ------------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: easings.premium }}
            className="overflow-hidden border-t border-slate-600/40 bg-slate-950/95 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="container-plug flex flex-col gap-1 py-5"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.35, ease: easings.premium },
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    className={[
                      'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium tracking-tight transition-colors',
                      isActive(link.href)
                        ? 'bg-cyan-400/10 text-cyan-200'
                        : 'text-slate-200 hover:bg-slate-800/60 hover:text-offwhite',
                    ].join(' ')}
                  >
                    {link.label}
                    <Icon name="chevronRight" className="h-4 w-4 opacity-60" />
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={siteConfig.substack.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.35, ease: easings.premium },
                  },
                }}
                className="btn-primary mt-3 w-full"
              >
                <BrandIcon name="substack" className="h-4 w-4" />
                Join the Substack
              </motion.a>

              {/* Contact shortcut inside the sheet (mobile convenience). */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.4, ease: easings.premium } },
                }}
                className="mt-4 flex flex-col gap-2 border-t border-slate-700/60 pt-4 text-sm text-slate-300"
              >
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-cyan-200"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="inline-flex items-center gap-2 hover:text-cyan-200"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}