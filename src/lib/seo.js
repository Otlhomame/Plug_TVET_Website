/**
 * THE PLUG TVET - SEO / structured data helpers
 * ---------------------------------------------------------------------------
 * JSON-LD builders consumed by `src/app/layout.jsx` (organisation) and the news
 * post pages (article + breadcrumbs). Output is plain serialisable objects so
 * they can be passed straight into a <script type="application/ld+json"> tag.
 */

import { siteConfig, siteUrl } from '@/data/site';

/** Organisation + website schema (emitted once, from the root layout). */
export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    alternateName: 'The Plug TVET Botswana',
    url: siteUrl,
    description: siteConfig.description,
    slogan: siteConfig.mission,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneDisplay,
    foundingDate: siteConfig.founded,
    areaServed: {
      '@type': 'Country',
      name: 'Botswana',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.addressLine,
      addressLocality: siteConfig.contact.city,
      addressCountry: 'BW',
    },
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.tiktok,
      siteConfig.socials.instagram,
      siteConfig.socials.linkedin,
      siteConfig.socials.youtube,
      siteConfig.substack.url,
    ],
    knowsAbout: [
      'Technical and Vocational Education and Training',
      'TVET admissions guidance',
      'Labour market intelligence',
      'Skills development policy',
      'Apprenticeships and learnerships',
    ],
  };
}

/** WebSite schema with the internal search action hint. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteUrl,
    inLanguage: 'en-BW',
    publisher: { '@type': 'Organization', name: siteConfig.name },
  };
}

/**
 * Breadcrumb schema for inner pages.
 * @param {{name: string, path: string}[]} items
 */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/**
 * Article schema for TVET News posts.
 * @param {object} post - a news post object from `@/data/news`
 */
export function articleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-BW',
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    articleSection: post.category,
    timeRequired: `PT${post.readMinutes}M`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/news/${post.slug}/`,
    },
    url: `${siteUrl}/news/${post.slug}/`,
    isAccessibleForFree: true,
    hasPart: {
      '@type': 'WebPage',
      name: 'Deeper Analysis on Substack',
      url: siteConfig.substack.postUrl(post.subSlug),
    },
  };
}

/** Report/publication schema for downloadable insight briefs. */
export function reportSchemaSchema(report, dimension) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: report.title,
    abstract: report.summary,
    datePublished: report.date,
    inLanguage: 'en-BW',
    genre: dimension?.title,
    publisher: { '@type': 'Organization', name: siteConfig.name },
    isAccessibleForFree: true,
  };
}