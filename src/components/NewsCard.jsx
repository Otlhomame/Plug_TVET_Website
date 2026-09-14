/**
 * <NewsCard /> - TVET News grid tile
 * ---------------------------------------------------------------------------
 * Compact 4-5 minute read card: gradient cover, category chip, read-time badge,
 * the key takeaways, and TWO routes out - the on-site summary and the Substack
 * deep dive, so the "Deeper Analysis" path is present in the grid as well as in
 * every article.
 *
 * Server component by design: the only animation is a CSS transition, which
 * keeps the news index light even with many posts.
 */

import Link from 'next/link';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import { siteConfig } from '@/data/site';
import { COVER_GRADIENTS } from '@/data/news';

export default function NewsCard({ post, featured = false }) {
  const gradient = COVER_GRADIENTS[post.cover] || COVER_GRADIENTS.cyan;

  return (
    <article
      className={[
        'glass glass-hover group relative flex flex-col overflow-hidden',
        featured ? 'lg:flex-row' : '',
      ].join(' ')}
    >
      {/* ---- Cover (pure CSS gradient, no image payload) ---------------- */}
      <div
        className={[
          'relative shrink-0 overflow-hidden bg-gradient-to-br',
          gradient,
          featured ? 'h-44 lg:h-auto lg:w-2/5' : 'h-40',
        ].join(' ')}
      >
        {/* Grid texture + node motif */}
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-40" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="chip-cyan">{post.category}</span>
            <span className="chip border-slate-500/50 bg-slate-950/70">
              <Icon name="clock" className="h-3 w-3" />
              {post.readMinutes} min read
            </span>
          </div>

          <Icon
            name="broadcast"
            className="h-7 w-7 self-end text-cyan-200/80 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* ---- Body ------------------------------------------------------- */}
      <div className="flex flex-1 flex-col p-6">
        <p className="inline-flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
          <Icon name="calendar" className="h-3.5 w-3.5" />
          {post.displayDate}
          <span aria-hidden="true" className="text-slate-600">
            ·
          </span>
          {post.author}
        </p>

        <h3
          className={[
            'mt-4 font-semibold tracking-tighter text-offwhite',
            featured ? 'text-2xl' : 'text-xl',
          ].join(' ')}
        >
          <Link
            href={`/news/${post.slug}`}
            className="transition-colors duration-300 hover:text-cyan-200"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">{post.excerpt}</p>

        {/* Key takeaways */}
        {post.takeaways?.length > 0 && (
          <ul className="mt-5 space-y-2.5 border-t border-slate-700/60 pt-5">
            {post.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-3 text-[13px] text-slate-200">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {takeaway}
              </li>
            ))}
          </ul>
        )}

        {/* Dual routing: on-site summary + Substack deep dive */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-700/60 pt-6">
          <Link href={`/news/${post.slug}`} className="btn-primary !px-5 !py-2.5">
            Read the summary
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>

          <a
            href={siteConfig.substack.postUrl(post.subSlug)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-quiet text-xs uppercase tracking-[0.14em]"
          >
            <BrandIcon name="substack" className="h-3.5 w-3.5 text-orange-300" />
            Deeper analysis
          </a>
        </div>
      </div>
    </article>
  );
}