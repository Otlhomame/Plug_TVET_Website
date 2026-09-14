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
 * The report library.
 * `file` is a public path resolved through the `asset()` helper so downloads
 * work on GitHub Pages project sites (which need a /<repo> prefix).
 */
export const reports = [
  // ---------------- Policy Analysis & Financial Impact ---------------------
  {
    id: 'r-policy-01',
    slug: 'tvet-funding-flows-botswana-2026',
    dimensionId: 'policy',
    title: 'TVET Funding Flows in Botswana: Where the Money Goes in 2026',
    date: '2026-06-18',
    displayDate: 'June 2026',
    pages: 28,
    size: '1.9 MB',
    featured: true,
    summary:
      'A line-by-line trace of public and levy-funded money entering Botswana’s TVET system - allocation, disbursement timing, and the gap between budgeted and actually absorbed funds.',
    highlights: [
      'Budget-to-disbursement timelines by funding instrument',
      'Absorption bottlenecks that delay trainee intake',
      'Practical guidance for institutions preparing funding submissions',
    ],
    tags: ['Funding', 'Policy', 'Finance'],
    audience: 'Policymakers · Institutions · Investors',
  },
  {
    id: 'r-policy-02',
    slug: 'national-tvet-policy-decoded-brief',
    dimensionId: 'policy',
    title: 'The National TVET Policy, Decoded for Applicants and Providers',
    date: '2026-05-02',
    displayDate: 'May 2026',
    pages: 18,
    size: '1.2 MB',
    featured: false,
    summary:
      'Plain-language translation of the legislation and statutory frameworks governing admissions, accreditation and assessment - written for the people who must comply with them.',
    highlights: [
      'Which clauses affect entry requirements and recognition',
      'Accreditation and assessment obligations in one checklist',
      'Common compliance mistakes made by new providers',
    ],
    tags: ['Legislation', 'Accreditation', 'Compliance'],
    audience: 'Applicants · Providers · Educators',
  },
  {
    id: 'r-policy-03',
    slug: 'bursary-utilisation-and-absorption-audit',
    dimensionId: 'policy',
    title: 'Bursary Utilisation and Graduate Absorption Audit',
    date: '2026-03-27',
    displayDate: 'March 2026',
    pages: 22,
    size: '1.6 MB',
    featured: true,
    summary:
      'Follows sponsorship money from award to employment: how many funded trainees complete, how many are absorbed, and what predicts the difference between the two.',
    highlights: [
      'Completion and absorption rates by qualification level',
      'The programme types with the strongest employment link',
      'Recommendations for sponsors assessing trainee risk',
    ],
    tags: ['Bursaries', 'Absorption', 'Audit'],
    audience: 'Sponsors · Policymakers · Students',
  },
  {
    id: 'r-policy-04',
    slug: 'cost-per-graduate-return-on-investment',
    dimensionId: 'policy',
    title: 'Cost per Graduate: Measuring the Return on Training Investment',
    date: '2026-01-30',
    displayDate: 'January 2026',
    pages: 26,
    size: '1.7 MB',
    featured: false,
    summary:
      'A framework for costing vocational training honestly - tuition, workshop time, consumables, trainer ratios - plus a model for estimating the national return once graduates enter work.',
    highlights: [
      'Cost per graduate benchmarked across delivery models',
      'Time-to-return models for artisan versus technician routes',
      'How to present training ROI to a board or funding partner',
    ],
    tags: ['Costing', 'ROI', 'Benchmarking'],
    audience: 'Executives · Investors · Finance teams',
  },
  {
    id: 'r-policy-05',
    slug: 'levy-funded-training-programmes-review',
    dimensionId: 'policy',
    title: 'Levy-Funded Training Programmes: A Practical Review',
    date: '2025-11-14',
    displayDate: 'November 2025',
    pages: 20,
    size: '1.4 MB',
    featured: false,
    summary:
      'How employer levy contributions convert into real training seats, which sectors claim most actively, and where the scheme leaves money on the table.',
    highlights: [
      'Claim patterns by industry sector and firm size',
      'Rejection and delay causes for reimbursement claims',
      'A preparer’s checklist for a defensible training claim',
    ],
    tags: ['Levy', 'Employers', 'Reimbursement'],
    audience: 'Employers · HR · Providers',
  },
  // ------------- Approved Projects & Infrastructure Pipeline ---------------
  {
    id: 'r-project-01',
    slug: 'approved-capital-projects-skills-map',
    dimensionId: 'projects',
    title: 'Approved Capital Projects and the Skills They Will Absorb',
    date: '2026-06-09',
    displayDate: 'June 2026',
    pages: 32,
    size: '2.3 MB',
    featured: true,
    summary:
      'A consolidated view of approved and funded projects, annotated with the trades each one requires across construction, commissioning and operational phases.',
    highlights: [
      'Trade demand mapping for every project phase',
      'Regional distribution of expected job creation',
      'Lead times between approval and first trainee requirement',
    ],
    tags: ['Projects', 'Pipeline', 'Trade demand'],
    audience: 'Investors · Employers · Students',
  },
  {
    id: 'r-project-02',
    slug: 'infrastructure-pipeline-phase-trade-demand',
    dimensionId: 'projects',
    title: 'Infrastructure Pipeline: Phase-by-Phase Trade Demand Forecast',
    date: '2026-04-16',
    displayDate: 'April 2026',
    pages: 30,
    size: '2.1 MB',
    featured: false,
    summary:
      'Forecasts demand for welders, electricians, millwrights, plant operators and technicians as each infrastructure phase moves from earthworks to handover.',
    highlights: [
      'Headcount curves per trade per phase',
      'Certification levels projects actually request',
      'Where demand will spike beyond local training capacity',
    ],
    tags: ['Forecasting', 'Infrastructure', 'Labour'],
    audience: 'Employers · Educators · Policymakers',
  },
  {
    id: 'r-project-03',
    slug: 'localisation-procurement-skills-readiness',
    dimensionId: 'projects',
    title: 'Localisation, Procurement and Skills Readiness',
    date: '2026-02-20',
    displayDate: 'February 2026',
    pages: 24,
    size: '1.7 MB',
    featured: false,
    summary:
      'Local content and procurement rules are only real if local firms have the technical capacity to deliver. We assess readiness trade by trade.',
    highlights: [
      'Readiness scorecards across local supplier categories',
      'Tender requirements that disqualify qualified local artisans',
      'Targeted upskilling routes to close the compliance gap',
    ],
    tags: ['Localisation', 'Procurement', 'Capacity'],
    audience: 'Suppliers · Employers · Policymakers',
  },
  {
    id: 'r-project-04',
    slug: 'maintenance-technical-services-backlog',
    dimensionId: 'projects',
    title: 'The Maintenance Backlog: Botswana’s Hidden Technical Jobs Market',
    date: '2025-12-05',
    displayDate: 'December 2025',
    pages: 21,
    size: '1.5 MB',
    featured: false,
    summary:
      'New build gets the headlines; maintenance keeps the country running. This brief quantifies the standing demand for service, repair and reliability technicians.',
    highlights: [
      'Steady-state versus project-based employment compared',
      'Trades with the most resilient year-round demand',
      'Why maintenance roles retain graduates longer',
    ],
    tags: ['Maintenance', 'Reliability', 'Employment'],
    audience: 'Students · Employers · TVET providers',
  },
  // ------- Skill Capacity Research & Labour Market Data --------------------
  {
    id: 'r-skills-01',
    slug: 'scarce-critical-skills-inventory',
    dimensionId: 'skills',
    title: 'Scarce and Critical Skills Inventory for Botswana',
    date: '2026-07-02',
    displayDate: 'July 2026',
    pages: 34,
    size: '2.4 MB',
    featured: true,
    summary:
      'The flagship skills inventory: occupations ranked by demand intensity, replacement difficulty and training lead time across Botswana’s primary growth sectors.',
    highlights: [
      'Ranked scarce and critical occupation list',
      'Training lead time required to close each gap',
      'Occupations where demand is structural, not cyclical',
    ],
    tags: ['Skills', 'Inventory', 'Demand'],
    audience: 'Policymakers · Employers · Students',
  },
  {
    id: 'r-skills-02',
    slug: 'training-capacity-enrolment-throughput',
    dimensionId: 'skills',
    title: 'Training Capacity and Enrolment Throughput by Provider',
    date: '2026-05-21',
    displayDate: 'May 2026',
    pages: 27,
    size: '1.9 MB',
    featured: false,
    summary:
      'How many learners the system can genuinely seat, teach and assess - measured against enrolment targets rather than advertised capacity.',
    highlights: [
      'Real throughput versus nominal intake capacity',
      'Trainer-to-trainee ratios by trade family',
      'Workshop and equipment constraints per institution type',
    ],
    tags: ['Capacity', 'Providers', 'Throughput'],
    audience: 'Institutions · Educators · Investors',
  },
  {
    id: 'r-skills-03',
    slug: 'graduate-absorption-wage-bands',
    dimensionId: 'skills',
    title: 'Graduate Absorption, Wage Bands and Job Tenure',
    date: '2026-03-12',
    displayDate: 'March 2026',
    pages: 25,
    size: '1.8 MB',
    featured: false,
    summary:
      'What happens in the first 36 months after graduation: absorption speed, starting wage bands by trade, and how long graduates stay in their first technical role.',
    highlights: [
      'Median time-to-employment by qualification',
      'Indicative wage bands for artisan and technician roles',
      'First-role tenure as a proxy for job quality',
    ],
    tags: ['Employment', 'Wages', 'Outcomes'],
    audience: 'Students · Parents · Employers',
  },
  {
    id: 'r-skills-04',
    slug: 'regional-access-to-accredited-training',
    dimensionId: 'skills',
    title: 'Regional Access to Accredited Training: The Distance Penalty',
    date: '2026-01-16',
    displayDate: 'January 2026',
    pages: 23,
    size: '1.6 MB',
    featured: false,
    summary:
      'Training access is not evenly spread. This brief measures how far learners must travel for accredited programmes - and what that distance does to completion rates.',
    highlights: [
      'Accredited programme density by region',
      'Accommodation, transport and completion correlations',
      'Where a satellite workshop would change the most outcomes',
    ],
    tags: ['Access', 'Regions', 'Equity'],
    audience: 'Policymakers · Parents · Institutions',
  },
  {
    id: 'r-skills-05',
    slug: 'upskilling-existing-workforce-routes',
    dimensionId: 'skills',
    title: 'Upskilling the Existing Workforce: Practical Routes',
    date: '2025-10-09',
    displayDate: 'October 2025',
    pages: 19,
    size: '1.3 MB',
    featured: false,
    summary:
      'Most of Botswana’s 2030 skills gap will be closed by people already working. We map recognition of prior learning, modular certification and in-plant training.',
    highlights: [
      'Recognition of prior learning pathways explained',
      'Modular and part-time training options by trade',
      'Cost and downtime comparison across delivery models',
    ],
    tags: ['Upskilling', 'RPL', 'Workforce'],
    audience: 'Employers · HR · Employees',
  },
  // ------------------------- Institutional Case Studies --------------------
  {
    id: 'r-inst-01',
    slug: 'institutional-governance-that-works',
    dimensionId: 'institutions',
    title: 'Institutional Governance That Works: Four Case Studies',
    date: '2026-06-27',
    displayDate: 'June 2026',
    pages: 29,
    size: '2.0 MB',
    featured: true,
    summary:
      'Four institutions, four governance choices that changed outcomes: council composition, industry advisory boards, trainer development budgets and assessment integrity.',
    highlights: [
      'Governance structures correlated with completion gains',
      'How advisory boards convert into real placements',
      'Budget lines that protect training quality',
    ],
    tags: ['Governance', 'Case study', 'Quality'],
    audience: 'Institutions · Regulators · Investors',
  },
  {
    id: 'r-inst-02',
    slug: 'industry-partnership-models-tvet',
    dimensionId: 'institutions',
    title: 'Industry Partnership Models in Botswana TVET',
    date: '2026-04-30',
    displayDate: 'April 2026',
    pages: 26,
    size: '1.8 MB',
    featured: false,
    summary:
      'From memorandum to machinery: how provider-employer partnerships are structured, funded and sustained - and why so many quietly expire after one cohort.',
    highlights: [
      'Partnership agreement structures that survive staff turnover',
      'Cost-sharing models for equipment and trainer time',
      'Metrics that keep both sides invested',
    ],
    tags: ['Partnerships', 'Industry', 'Placement'],
    audience: 'Institutions · Employers · Policymakers',
  },
  {
    id: 'r-inst-03',
    slug: 'workshop-utilisation-trainer-audit',
    dimensionId: 'institutions',
    title: 'Workshop Utilisation and Trainer Capacity Audit',
    date: '2025-12-18',
    displayDate: 'December 2025',
    pages: 22,
    size: '1.7 MB',
    featured: false,
    summary:
      'An operational audit of workshops, equipment and trainer time - measuring how many hours of practical training learners actually receive per enrolled seat.',
    highlights: [
      'Practical contact hours versus programme design intent',
      'Equipment downtime and its effect on assessment readiness',
      'Trainer workload and development investment measured',
    ],
    tags: ['Audit', 'Workshops', 'Trainers'],
    audience: 'Institutions · Regulators · Funders',
  },
  // -------------------- ESG & Global Industry Trends ------------------------
  {
    id: 'r-esg-01',
    slug: 'green-skills-energy-transition',
    dimensionId: 'esg',
    title: 'Green Skills and the Energy Transition in Botswana',
    date: '2026-06-02',
    displayDate: 'June 2026',
    pages: 27,
    size: '2.0 MB',
    featured: true,
    summary:
      'Solar installation, storage maintenance, energy auditing and grid-adjacent trades: the green-skills occupations Botswana will need as generation capacity diversifies.',
    highlights: [
      'Green occupation map for the next project cycle',
      'Certification requirements for renewable energy work',
      'Training institutions currently delivering these skills',
    ],
    tags: ['Green skills', 'Energy', 'Transition'],
    audience: 'Investors · Policymakers · Students',
  },
  {
    id: 'r-esg-02',
    slug: 'automation-digital-trades-readiness',
    dimensionId: 'esg',
    title: 'Automation and Digital Trades Readiness',
    date: '2026-03-05',
    displayDate: 'March 2026',
    pages: 24,
    size: '1.8 MB',
    featured: false,
    summary:
      'Automation does not remove trades - it changes them. We assess how ready Botswana’s training programmes are for PLCs, digital maintenance and connected plant equipment.',
    highlights: [
      'Automation exposure across current programme designs',
      'Digital maintenance skills employers now expect',
      'Where artificial intelligence changes entry-level tasks',
    ],
    tags: ['Automation', 'Digital', 'Readiness'],
    audience: 'Employers · Educators · Students',
  },
  {
    id: 'r-esg-03',
    slug: 'esg-just-transition-investor-standards',
    dimensionId: 'esg',
    title: 'ESG, Just Transition and Investor Reporting Standards',
    date: '2025-11-27',
    displayDate: 'November 2025',
    pages: 23,
    size: '1.7 MB',
    featured: false,
    summary:
      'Global capital now reports on workforce and community impact alongside financial return. This brief shows how TVET outcomes become credible, auditable ESG evidence.',
    highlights: [
      'Metrics investors accept as credible impact evidence',
      'Aligning training outcomes with recognised reporting frameworks',
      'Building an evidence trail that survives due diligence',
    ],
    tags: ['ESG', 'Investment', 'Reporting'],
    audience: 'Investors · Development partners · Executives',
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