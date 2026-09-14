/**
 * THE PLUG TVET - central site configuration & brand constants
 * ---------------------------------------------------------------------------
 * Everything that is edited often (contact details, social links, Substack,
 * navigation) lives here so there is exactly ONE place to update.
 */

/**
 * Resolve the public asset path for GitHub Pages project sites.
 * Files placed in `/public` are served from `${basePath}/<file>`.
 * @param {string} path - e.g. "/reports/tvet-policy-analysis-2026.pdf"
 * @returns {string} fully qualified public path (basePath-aware)
 */
export function asset(path = '') {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Absolute canonical origin used for SEO metadata, sitemap and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  `https://theplugtvet.github.io/${process.env.NEXT_PUBLIC_REPO_NAME || 'Plug_TVET_Website'}`;

export const siteConfig = {
  name: 'THE PLUG TVET',
  legalName: 'THE PLUG TVET',
  tagline: 'Connecting Botswana to TVET Opportunities',
  shortDescription:
    'Botswana’s Technical and Vocational Education and Training information hub and boutique consultancy.',
  description:
    'THE PLUG TVET is Botswana’s TVET information hub and boutique consultancy - decoding admissions, funding, skills demand and industrial opportunity for students, graduates, parents, educators, policymakers and employers.',
  mission: 'Empowering Skills. Building Futures.',
  founded: '2023',
  locale: 'en_BW',
  url: siteUrl,
  // The Substack publication. Long-form readers are routed here from every page.
  substack: {
    name: 'THE PLUG TVET on Substack',
    url: 'https://theplugtvet.substack.com',
    // Individual deep links are built as `${substack.url}/p/<slug>`.
    postUrl: (slug) => `https://theplugtvet.substack.com/p/${slug}`,
    blurb:
      'Weekly long-form deep dives on Botswana’s skills economy - policy decoded, projects tracked, and labour-market data unpacked.',
  },
  contact: {
    email: 'theplugtvet@gmail.com',
    phoneDisplay: '+267 75476059',
    phoneHref: '+26775476059',
    whatsapp: 'https://wa.me/26775476059',
    addressLine: 'Blue Jacket Street',
    city: 'Francistown',
    country: 'Botswana',
    fullAddress: 'Blue Jacket Street, Francistown, Botswana',
    hours: 'Mon - Fri · 08:00 - 17:00 (CAT)',
  },
  socials: {
    facebook: 'https://www.facebook.com/theplugtvet',
    tiktok: 'https://www.tiktok.com/@theplugtvet',
    instagram: 'https://www.instagram.com/theplugtvet',
    linkedin: 'https://www.linkedin.com/company/theplugtvet',
    youtube: 'https://www.youtube.com/@theplugtvet',
  },
};

/** Primary navigation, in the order it appears in the header/footer. */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industry Insights', href: '/insights' },
  { label: 'TVET News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

/** Query types offered by the contact form (mirrors the audience segments). */
export const queryTypes = [
  {
    value: 'student',
    label: 'Student / Graduate',
    hint: 'Course selection, applications, funding, bursaries, attachments.',
  },
  {
    value: 'employer',
    label: 'Employer / Industry',
    hint: 'Talent pipelines, internships, levy-funded training, research.',
  },
  {
    value: 'stakeholder',
    label: 'Stakeholder / Policymaker / Investor',
    hint: 'Policy input, institutional partnerships, reports, media requests.',
  },
];