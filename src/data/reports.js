/**
 * THE PLUG TVET - Industry Insights repository
 * ---------------------------------------------------------------------------
 * The `/insights` page is a filterable download repository organised around
 * five industrial dimensions. Every report maps to a local PDF at:
 *
 *      /public/reports/<slug>.pdf   ->   downloaded from  /reports/<slug>.pdf
 *
 * TO PUBLISH A NEW REPORT:
 *   1. Drop the PDF into `public/reports/` (filename must equal the slug).
 *   2. Add an object to the `reports` array below.
 *   3. Commit + push. GitHub Actions rebuilds and deploys automatically.
 *
 * If you prefer a different filename, set `file` explicitly on the report.
 *
 * CURRENT STATE
 *   The library publishes ONE brief today - the TEMCO P2 billion hospital
 *   project insight (see `reports` below). Adding objects is the only change
 *   needed to bring back the featured shelf and the dimension counts.
 */

/** The five industrial dimensions used for layout filtering. */
export const reportDimensions = [
  {
    id: 'policy',
    slug: 'policy-analysis-financial-impact',
    title: 'Policy Analysis & Financial Impact',
    short: 'Policy & Finance',
    icon: 'scale',
    accent: 'cyan',
    description:
      'Regulation, funding instruments and the money flows behind them. We trace how national TVET policy translates into budgets, bursaries, levy-funded programmes and measurable student outcomes.',
    scope: [
      'TVET legislation, statutory instruments and accreditation frameworks',
      'State funding, levy income and bursary allocation modelling',
      'Cost-per-graduate and return-on-investment analysis',
      'Public-private funding partnerships and development finance',
    ],
    question: 'Who pays, how much, and what does the country get back?',
  },
  {
    id: 'projects',
    slug: 'approved-projects-infrastructure-pipeline',
    title: 'Approved Projects & Infrastructure Pipeline',
    short: 'Projects & Infrastructure',
    icon: 'crane',
    accent: 'teal',
    description:
      'Approved and funded projects across Botswana, mapped to the trade skills each phase will demand - from civil works and electricals to processing, logistics and maintenance.',
    scope: [
      'Approved capital projects by sector, region and stage',
      'Skills demand curve for each project phase',
      'Procurement, participation and localisation requirements',
      'Infrastructure maintenance and technical services pipelines',
    ],
    question: 'Which projects are real, and which trades will they absorb?',
  },
  {
    id: 'skills',
    slug: 'skill-capacity-labour-market-data',
    title: 'Skill Capacity Research & Labour Market Data',
    short: 'Skills & Labour Market',
    icon: 'chart',
    accent: 'cyan',
    description:
      'The evidence base on scarce and critical skills: enrolment throughput, training capacity, graduation volumes and the absorption gap between output and employer demand.',
    scope: [
      'Scarce and critical skills inventories by sector',
      'Training provider capacity and enrolment throughput',
      'Graduate absorption, wage bands and job tenure data',
      'Regional imbalances in access to accredited training',
    ],
    question: 'Where is capacity thin and demand loud?',
  },
  {
    id: 'institutions',
    slug: 'institutional-case-studies',
    title: 'Institutional Case Studies',
    short: 'Institutional Case Studies',
    icon: 'building',
    accent: 'teal',
    description:
      'What actually works inside TVET institutions: governance, industry partnerships, workshop utilisation, retention and the interventions that reliably move completion rates.',
    scope: [
      'Accreditation and quality assurance journeys',
      'Industry partnership and advisory board models',
      'Workshop, equipment and trainer utilisation audits',
      'Learner retention, completion and dropout interventions',
    ],
    question: 'Which institutional practices deserve to be copied?',
  },
  {
    id: 'esg',
    slug: 'esg-global-industry-trends',
    title: 'ESG & Global Industry Trends',
    short: 'ESG & Global Trends',
    icon: 'globe',
    accent: 'cyan',
    description:
      'Global skills transitions with direct Botswana relevance: the energy shift, automation and digital trades, green certification and the ESG reporting standards investors now require.',
    scope: [
      'Green skills, renewables and energy transition job growth',
      'Automation, control and digital trades readiness',
      'ESG and just-transition reporting requirements',
      'Comparative skill strategies across peer economies',
    ],
    question: 'What global shift arrives in Botswana next?',
  },
];

/** Convenience lookup: dimension id -> dimension object. */
export const dimensionById = reportDimensions.reduce((acc, dimension) => {
  acc[dimension.id] = dimension;
  return acc;
}, {});

/**
 * The report library - the single source of truth for /insights.
 * `file` is a public path resolved through the `asset()` helper so downloads
 * work on GitHub Pages project sites (which need a /<repo> prefix).
 */
export const reports = [
  // ------- Approved Projects & Infrastructure Pipeline ---------------------
  {
    id: 'r-projects-01',
    slug: 'temco-p2-billion-hospital-project',
    dimensionId: 'projects',
    title:
      'The Short-term Impact Of TEMCO’s P2 Billion Hospital Project On The TVET Ecosystem',
    date: '2026-09-24',
    displayDate: 'September 2026',
    pages: 6,
    size: '160 KB',
    featured: true,
    summary:
      'The TEMCO P2 billion specialised general hospital maps the trades, phases and localisation rules behind Botswana’s biggest private healthcare build - and the TVET skills it will absorb.',
    highlights: [
      'Labour allocation mapped to each construction phase',
      'Contractor and supplier eligibility baseline',
      'In-country value share and local sourcing channels',
    ],
    tags: ['Projects', 'Infrastructure', 'Construction', 'Healthcare'],
    audience: 'Graduates · Contractors · Suppliers · Skilled Tradesmen',
  },
];

/* ---------------------------------------------------------------------------
   Derived collections - used by the insights repository and the home page.
--------------------------------------------------------------------------- */

/** All reports, newest first. */
export const publishedReports = [...reports].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

/** Reports flagged `featured: true` (used for the hero shelf on /insights). */
export const featuredReports = publishedReports.filter((report) => report.featured);

/** Filter a dimension's reports, newest first. */
export function reportsByDimension(dimensionId) {
  return publishedReports.filter((report) => report.dimensionId === dimensionId);
}

/** Dimensions annotated with their report counts (drives the filter badges). */
export const dimensionsWithCounts = reportDimensions.map((dimension) => ({
  ...dimension,
  count: reports.filter((report) => report.dimensionId === dimension.id).length,
}));

/** Resolve the public PDF path for a report (basePath-aware via asset()). */
export function reportFile(report) {
  return report.file || `/reports/${report.slug}.pdf`;
}

/** Aggregate reporting metrics shown on the /insights hero. */
export const reportMetrics = {
  total: reports.length,
  pages: reports.reduce((sum, report) => sum + (report.pages || 0), 0),
  dimensions: reportDimensions.length,
  latest: publishedReports[0]?.displayDate || '',
};