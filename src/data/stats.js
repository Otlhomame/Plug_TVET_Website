/**
 * THE PLUG TVET - headline traction numbers, core pillars and impact narrative
 * ---------------------------------------------------------------------------
 * Used by the Home page bento grid, the About page and the footer strip.
 */

// The report count is derived from the report manifest so the copy can never
// drift out of sync with the repository (see src/data/reports.js).
import { reportMetrics } from './reports';

/**
 * Social + editorial traction. `accent` controls the cyan vs teal highlight
 * used inside the bento cards.
 */
export const stats = [
  {
    id: 'facebook',
    value: '62K+',
    label: 'Facebook community',
    detail: 'TVET applicants, graduates, parents and employers following every intake update.',
    accent: 'cyan',
    icon: 'users',
  },
  {
    id: 'tiktok',
    value: '6K+',
    label: 'TikTok followers',
    detail: 'Rapid, mobile-first explainers on courses, bursaries and skilled trades.',
    accent: 'teal',
    icon: 'play',
  },
  {
    id: 'dimensions',
    value: '5',
    label: 'Research dimensions',
    detail: 'Policy, projects, skills capacity, institutional case studies and ESG trends.',
    accent: 'cyan',
    icon: 'layers',
  },
  {
    id: 'reports',
    value: `${reportMetrics.total}`,
    label: reportMetrics.total === 1 ? 'Downloadable report' : 'Downloadable reports',
    detail: 'Free PDF insight briefs written for decision-makers and students alike.',
    accent: 'teal',
    icon: 'download',
  },
  {
    id: 'readtime',
    value: '4-5 min',
    label: 'Rapid-read news',
    detail: 'Every TVET headline summarised fast, with a route to the full deep dive.',
    accent: 'cyan',
    icon: 'clock',
  },
  {
    id: 'cost',
    value: '100%',
    label: 'Free to access',
    detail: 'No paywalls, no gatekeeping - information is the intervention.',
    accent: 'teal',
    icon: 'unlock',
  },
];

/** The three pillars of the platform. Rendered as the Home page grid cards. */
export const pillars = [
  {
    id: 'inform',
    title: 'Inform',
    kicker: 'Signal, not noise',
    summary:
      'We translate Botswana’s TVET policy, funding windows, enrolment cycles and industrial projects into plain language - published in 4-5 minute reads and downloadable briefs.',
    points: [
      'Government gazettes, HRDC calls and BQA updates decoded',
      'Bursary, levy and sponsorship deadlines tracked in one calendar',
      'Project pipelines mapped to the trades they will need',
    ],
    accent: 'cyan',
    icon: 'broadcast',
  },
  {
    id: 'guide',
    title: 'Guide',
    kicker: 'From confused to enrolled',
    summary:
      'A guided pathway from course choice to certified competence - entry requirements, institution comparisons, application steps and realistic career outcomes.',
    points: [
      'Course and institution comparison frameworks',
      'Step-by-step application and attachment checklists',
      'Interview, portfolio and trade-test preparation',
    ],
    accent: 'teal',
    icon: 'compass',
  },
  {
    id: 'connect',
    title: 'Connect',
    kicker: 'Skills meet demand',
    summary:
      'We put learners in front of the institutions and employers who need them - and give industry a direct channel to shape the talent pipeline.',
    points: [
      'Employer visibility for internships, attachments and learnerships',
      'Graduate stories that prove the return on vocational training',
      'Stakeholder round tables across Botswana’s regions',
    ],
    accent: 'cyan',
    icon: 'network',
  },
];

/** "Why THE PLUG TVET exists" - the local ecosystem challenge we address. */
export const ecosystemChallenges = [
  {
    problem: 'Information is scattered',
    detail:
      'Admissions notices, bursary circulars and levy-funded programme calls land in different places, in dense policy language, often after the deadline has passed.',
  },
  {
    problem: 'Skills demand is invisible',
    detail:
      'Employers know which trades are short. Learners rarely do - so thousands train for saturated fields while welders, millwrights, solar technicians and agri-processors go unfilled.',
  },
  {
    problem: 'Vocational paths carry stigma',
    detail:
      'Families still treat TVET as a fallback. The evidence says the opposite: artisans and technicians are the backbone of every project in Botswana’s investment pipeline.',
  },
];

/** Strategic goals - used on the About page growth section. */
export const strategicGoals = [
  {
    id: 'goal-access',
    horizon: 'Near term',
    title: 'Universal access to entry information',
    detail:
      'A single, always-current resource for admission requirements, funding windows and application deadlines across all recognised Botswana TVET institutions.',
    metric: 'Every intake cycle covered before it opens',
  },
  {
    id: 'goal-database',
    horizon: 'Near term',
    title: 'An open skills-demand database',
    detail:
      'Structured, region-by-region labour-market signals that tell learners which trades are actually hiring - and tell policymakers where capacity is thin.',
    metric: 'National regions mapped against the project pipeline',
  },
  {
    id: 'goal-industry',
    horizon: 'Mid term',
    title: 'Industry-funded talent pipelines',
    detail:
      'Formal placement pathways between accredited training providers and employers, with measurable absorption rates published after every cohort.',
    metric: 'Absorption rate reported for every partner programme',
  },
  {
    id: 'goal-investment',
    horizon: 'Mid term',
    title: 'Investment-grade evidence for partners',
    detail:
      'ESG-aligned, audit-ready insight packs that help global investors and development partners fund Botswana’s skills infrastructure with confidence.',
    metric: 'Standards-aligned reporting on funded interventions',
  },
];

/**
 * Milestones timeline for the About page.
 * ---------------------------------------------------------------------------
 * The channel went live in October 2025 (`siteConfig.founded`), so the timeline
 * starts there and follows the real publication record in `src/data/reports.js`:
 * the first free brief shipped in that same month, and all five research
 * dimensions had been covered before the end of 2025.
 *
 * `year` is also the React key on /about, so every label must stay unique.
 */
export const milestones = [
  {
    year: 'Oct 2025',
    title: 'THE PLUG TVET goes live',
    detail:
      'A Francistown-born social channel starts summarising TVET admissions news for applicants who had nobody to ask - and publishes its first free insight brief in the same month.',
  },
  {
    year: 'Dec 2025',
    title: 'All five dimensions covered',
    detail:
      'Within one quarter the insight library spans the full research scope: policy and funding, approved capital projects, scarce skills, institutional case studies and ESG.',
  },
  {
    year: '2026',
    title: 'The community scales',
    detail:
      'Facebook traction passes 62,000 followers and TikTok crosses 6,000 - driven almost entirely by word of mouth and shared posts - while rapid-read TVET News joins the library.',
  },
  {
    year: '2026 - now',
    title: 'A boutique consultancy',
    detail:
      'Structured advisory for institutions and industry: labour-market research, curriculum relevance reviews and placement design.',
  },
];