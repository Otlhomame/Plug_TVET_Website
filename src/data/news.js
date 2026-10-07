/**
 * THE PLUG TVET - TVET News (rapid-read blog)
 * ---------------------------------------------------------------------------
 * Every post is a 4-5 minute read written as an executive summary of an issue
 * that matters to Botswana's skills economy. Each post MUST surface the global
 * "Deeper Analysis" anchor component that routes long-form readers to Substack.
 *
 * SHAPE
 *   slug        -> route: /news/<slug>
 *   subSlug     -> the matching Substack post path (substack.com/p/<subSlug>)
 *   readMinutes -> drives the "4-5 min read" badges
 *   cover       -> CSS gradient key (see COVER_GRADIENTS), used as the fallback
 *   coverImage  -> optional photo path in /public (rendered over the gradient)
 *   coverAlt    -> alt text / caption for the cover photo
 *   body        -> array of blocks: { type: 'p' | 'h2' | 'ul' | 'quote', ... }
 *
 * TO ADD A POST: copy any object below, change the slug, then push. The static
 * export regenerates the page and the sitemap automatically.
 */

/** Cover gradient presets used by the news cards (pure CSS, no images). */
export const COVER_GRADIENTS = {
  cyan: 'from-cyan-500/30 via-slate-900 to-slate-950',
  teal: 'from-teal-500/30 via-slate-900 to-slate-950',
  mix: 'from-cyan-400/25 via-teal-500/20 to-slate-950',
  deep: 'from-slate-700/40 via-slate-900 to-slate-950',
};

export const newsPosts = [
  {
    id: 'n-01',
    slug: 'temco-p2-billion-hospital-tvet-skills',
    subSlug: 'temcos-p2-billion-prescription',
    title: 'TEMCO’s P2 billion hospital: the TVET skills that will build it',
    category: 'Skills Demand',
    cover: 'cyan',
    coverImage: '/images/news/temco-specialised-general-hospital.jpg',
    coverAlt:
      'An indicative design concept of TEMCO Specialised General Hospital.',
    date: '2026-09-24',
    displayDate: '24 September 2026',
    readMinutes: 4,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'A P2 billion, 130-bed specialist hospital is rising at the airport SEZ - and its 22-month build will lean hard on Botswana’s trades.',
    takeaways: [
      'TEMCO creates over 470 construction roles across a 22-month build.',
      'Half are general labour, 35% trades and 15% professional or supervisory.',
      'Skills transfer will be graded with BQA against international standards.',
    ],
    body: [
      {
        type: 'p',
        text: 'Botswana’s healthcare map is shifting. Backed by a P2 billion investment from a US private equity firm, TEMCO Specialised General Hospital will anchor a 130-bed, 18,000-square-metre campus inside the Sir Seretse Khama International Airport Special Economic Zone. It promises over 740 jobs at full operation - but first it must be built.',
      },
      { type: 'h2', text: 'Who builds a hospital like this?' },
      {
        type: 'p',
        text: 'Project Lead Sailas Temwa told THE PLUG TVET the 22-month build runs through six to seven phases. Peak employment reaches roughly 445 workers, with more than 470 positions created in total. About 50% are general labourers, 35% skilled trades and 15% professional or supervisory staff.',
      },
      { type: 'h2', text: 'Where TVET skills fit' },
      {
        type: 'ul',
        items: [
          'Wet trades and structure: concrete, formwork, steel fixing, bricklaying and waterproofing lead the early phases.',
          'Building services: mechanical, electrical, plumbing, HVAC, medical-gas and radiation-shielded fit-out follow next.',
          'Specialist scopes: Swiss and Chinese engineering partners cover the most technically sensitive packages.',
        ],
      },
      {
        type: 'p',
        text: 'Most roles go to Batswana, with foreign recruitment confined to specialties where knowledge transfer is the point. Workers are graded on performance, so even novices get a clear pathway to site-banked experience.',
      },
      {
        type: 'quote',
        text: 'We will work with accreditation authorities like BQA to grade the impact of skills transferred to the local workforce.',
      },
      {
        type: 'p',
        text: 'Employment is fixed-term and tied to a package, not to TEMCO directly. Read the full conversation - including the labour allocation matrix - on Substack.',
      },
    ],
  }
];

/* ---------------------------------------------------------------------------
   Derived collections - used by the blog grid, sitemap and post pages.
--------------------------------------------------------------------------- */

/** Posts sorted newest first. */
export const sortedPosts = [...newsPosts].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

/** Distinct categories for the blog filter rail. */
export const newsCategories = [
  'All',
  ...Array.from(new Set(newsPosts.map((post) => post.category))),
];

/** Find a single post by its route slug. */
export function getPostBySlug(slug) {
  return newsPosts.find((post) => post.slug === slug);
}

/** Slug of the post at `index` using circular wrapping (used for "read next"). */
export function getAdjacentPost(currentSlug) {
  const index = sortedPosts.findIndex((post) => post.slug === currentSlug);
  const next = sortedPosts[(index + 1) % sortedPosts.length];
  return next?.slug === currentSlug ? null : next;
}