/**
 * TVET NEWS POST - /news/[slug]
 * ===========================================================================
 * Statically generated article page. `generateStaticParams` emits one HTML file
 * per post at build time, so the export stays fully static and each brief loads
 * instantly from GitHub Pages.
 *
 * STRUCTURE
 *   1. Breadcrumb + category / read-time rail
 *   2. Title + dek + byline
 *   3. Cover art (pure CSS gradient)
 *   4. "The X-minute brief" takeaways box
 *   5. Article body (rendered from structured blocks)
 *   6. Inline <DeeperAnalysis variant="bar" />   <- GLOBAL Substack anchor
 *   7. Full <DeeperAnalysis /> panel             <- GLOBAL Substack anchor
 *   8. Sidebar (TOC, Substack rail, community) + read-next grid
 *
 * SEO: per-post metadata, NewsArticle JSON-LD and BreadcrumbList JSON-LD.
 * ===========================================================================
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import PostBody, { extractHeadings } from '@/components/PostBody';
import DeeperAnalysis from '@/components/DeeperAnalysis';
import NewsCard from '@/components/NewsCard';
import Reveal from '@/components/Reveal';

import { asset, siteConfig } from '@/data/site';
import { COVER_GRADIENTS, getAdjacentPost, getPostBySlug, newsPosts } from '@/data/news';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';

/** Pre-render one page per post (required for `output: 'export'`). */
export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

/** Resolve the post from the route params. */
function resolvePost(params) {
  return getPostBySlug(params?.slug);
}

/** Per-post metadata (title, description, canonical, social card). */
export function generateMetadata({ params }) {
  const post = resolvePost(params);

  if (!post) {
    return { title: 'Brief not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/news/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function NewsPostPage({ params }) {
  const post = resolvePost(params);

  // Unknown slug -> render the 404 route.
  if (!post) notFound();

  const gradient = COVER_GRADIENTS[post.cover] || COVER_GRADIENTS.cyan;
  const headings = extractHeadings(post.body);
  const nextPost = getAdjacentPost(post.slug);

  // Related reads: same category first, then any other post.
  const related = newsPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 2);

  // "Read next" rail - empty (and therefore hidden) while this is the only brief.
  const readNext = [nextPost, ...related.filter((item) => item?.slug !== nextPost?.slug)]
    .filter(Boolean)
    .slice(0, 2);

  return (
    <>
      <article className="pb-20 pt-14 sm:pt-16">
        <div className="container-plug">
          {/* ---- 1. Breadcrumb ------------------------------------------ */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-cyan-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevronRight" className="h-3 w-3" />
              </li>
              <li>
                <Link href="/news" className="transition-colors hover:text-cyan-300">
                  TVET News
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevronRight" className="h-3 w-3" />
              </li>
              <li className="text-cyan-200">{post.category}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* ---- 2. Title, byline, body ------------------------------- */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip-cyan">{post.category}</span>
                <span className="chip">
                  <Icon name="clock" className="h-3 w-3" />
                  {post.readMinutes} min read
                </span>
                <span className="chip">
                  <Icon name="calendar" className="h-3 w-3" />
                  {post.displayDate}
                </span>
              </div>

              <h1 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-tightest text-offwhite sm:text-4xl lg:text-[3.1rem]">
                {post.title}
              </h1>

              <p className="lede mt-6">{post.excerpt}</p>

              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                    <Icon name="broadcast" className="h-3 w-3" />
                  </span>
                  {post.author}
                </span>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span>THE PLUG TVET · Francistown, Botswana</span>
              </p>

              {/* ---- 3. Cover art ----------------------------------------- */}
              <div
                className={`cover-art relative mt-9 h-44 overflow-hidden rounded-3xl border border-slate-600/40 bg-gradient-to-br sm:h-60 ${gradient}`}
              >
                {post.coverImage ? (
                  <>
                    <img
                      src={asset(post.coverImage)}
                      alt={post.coverAlt || post.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent"
                    />
                  </>
                ) : (
                  <>
                    <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-40" />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"
                    />
                  </>
                )}
                <span className="chip-cyan absolute bottom-5 left-6">
                  Rapid-read brief · {post.readMinutes} minutes
                </span>
              </div>

              {/* ---- 4. Takeaways -------------------------------------- */}
              {post.takeaways?.length > 0 && (
                <section aria-labelledby="takeaways-heading" className="glass mt-9 p-6 sm:p-7">
                  <h2
                    id="takeaways-heading"
                    className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200"
                  >
                    <Icon name="sparkles" className="h-4 w-4" />
                    The {post.readMinutes}-minute brief
                  </h2>

                  <ul className="mt-5 space-y-3">
                    {post.takeaways.map((takeaway) => (
                      <li key={takeaway} className="flex gap-3 text-sm text-slate-100">
                        <Icon
                          name="check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300"
                          strokeWidth={2.2}
                        />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* ---- 5. Article body ---------------------------------- */}
              <div className="mt-10">
                <PostBody blocks={post.body} />
              </div>
              {/* ---- 6. Inline global "Deeper Analysis" anchor ---------------- */}
              <div className="mt-12">
                <DeeperAnalysis variant="bar" subSlug={post.subSlug} postTitle={post.title} />
              </div>

              {/* ---- 7. Full global "Deeper Analysis" panel -------------- */}
              <div className="mt-10">
                <DeeperAnalysis subSlug={post.subSlug} postTitle={post.title} />
              </div>

              {/* ---- Footer navigation ---------------------------------- */}
              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-700/60 pt-8">
                <Link href="/news" className="btn-ghost">
                  <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
                  All TVET News
                </Link>
                <Link href="/insights" className="btn-quiet">
                  Download the related report
                  <Icon name="download" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* ---- Sidebar ---------------------------------------------------- */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {/* Table of contents */}
                {headings.length > 0 && (
                  <nav aria-label="On this page" className="glass p-6">
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      <Icon name="filter" className="h-3.5 w-3.5 text-cyan-400" />
                      On this page
                    </p>
                    <ul className="mt-4 space-y-3 text-sm">
                      {headings.map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="text-slate-300 transition-colors hover:text-cyan-300"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Substack rail card */}
                <div className="glass mt-5 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-orange-400/40 bg-orange-500/10 text-orange-300">
                    <BrandIcon name="substack" className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-sm font-semibold tracking-tight text-offwhite">
                    Deeper Analysis
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                    The full issue carries the data, sources and recommendations behind this brief.
                  </p>
                  <a
                    href={siteConfig.substack.postUrl(post.subSlug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-5 w-full !py-2.5"
                  >
                    Read on Substack
                    <Icon name="arrowUpRight" className="h-4 w-4" />
                  </a>
                </div>

                {/* Community rail card */}
                <div className="glass mt-5 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                    Community
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
                    Join 62,000+ followers getting every admission, funding and skills update first.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
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
                        <BrandIcon name={social.key} className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* ---- 8. Read next (hidden while this is the only brief) ---------- */}
          {readNext.length > 0 && (
            <section className="mt-20" aria-labelledby="read-next-heading">
              <h2
                id="read-next-heading"
                className="text-2xl font-semibold tracking-tighter text-offwhite"
              >
                Read next
              </h2>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {readNext.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.08} variant="scaleIn">
                    <NewsCard post={item} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* ---- Structured data (NewsArticle + BreadcrumbList) ------------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'TVET News', path: '/news' },
              { name: post.title, path: `/news/${post.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}