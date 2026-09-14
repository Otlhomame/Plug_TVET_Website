/**
 * THE PLUG TVET - core service offerings
 * ---------------------------------------------------------------------------
 * Powers the 4-column interactive bento grid on /services and the condensed
 * "What we do" strip elsewhere on the site.
 */

export const services = [
  {
    id: 'guidance',
    title: 'Courses & Career Guidance',
    short: 'Choose a trade with your eyes open.',
    summary:
      'Bespoke guidance that matches a student’s strengths, budget and geography to accredited programmes - and to the trades Botswana will actually need over the next decade.',
    icon: 'compass',
    accent: 'cyan',
    // Rendered as the interactive checklist inside each bento card.
    features: [
      'Course-to-career mapping across accredited institutions',
      'Entry requirement and qualification equivalency checks',
      'Trade-by-trade earning and progression outlooks',
      'One-on-one advisory sessions for students and parents',
    ],
    outcome: 'A written pathway plan: programme, institution, funding route and timeline.',
    forWho: 'Students, school leavers, parents, career changers',
  },
  {
    id: 'applications',
    title: 'Applications & Opportunities',
    short: 'Never miss a window again.',
    summary:
      'Everything that has a deadline, in one place: admissions cycles, bursary and levy-funded windows, internships, attachments, learnerships and apprenticeship intakes.',
    icon: 'folder',
    accent: 'teal',
    features: [
      'Live admissions and application deadline tracking',
      'Bursary, sponsorship and levy-funded programme alerts',
      'Application document checklists and verification support',
      'Internship, attachment and learnership opportunity listings',
    ],
    outcome: 'A complete, deadline-backed application calendar with nothing missed.',
    forWho: 'Applicants, current trainees, graduates seeking placement',
  },
  {
    id: 'skills',
    title: 'Skills & Training Information',
    short: 'The market’s real demand signals.',
    summary:
      'Labour-market intelligence on scarce and critical skills, training provider capacity and the certification standards employers recognise.',
    icon: 'layers',
    accent: 'cyan',
    features: [
      'Scarce and critical skills analysis by sector and region',
      'Accreditation, BQA and assessment requirement explainers',
      'Training provider capability comparisons',
      'Upskilling and reskilling routes for existing workers',
    ],
    outcome: 'A prioritised skills plan aligned to live employer demand.',
    forWho: 'Students, employers, HR teams, educators, policymakers',
  },
  {
    id: 'stories',
    title: 'Student & Graduate Stories',
    short: 'Proof that the path works.',
    summary:
      'Documented journeys from enrolment to employment - wages, timelines, setbacks and wins - so the next generation can see a verified route rather than a slogan.',
    icon: 'spark',
    accent: 'teal',
    features: [
      'Long-form interviews with working artisans and technicians',
      'Graduate income and progression transparency',
      'Employer spotlights on absorption and mentorship',
      'Feature submissions open to alumni nationwide',
    ],
    outcome: 'Trustworthy social proof that de-risks the vocational decision.',
    forWho: 'Prospective students, parents, educators, media',
  },
];

/** How an engagement with THE PLUG TVET actually runs (used on /services). */
export const engagementSteps = [
  {
    step: '01',
    title: 'Discovery call',
    detail:
      'We establish the goal: a learner pathway, a cohort pipeline, a labour-market question or a research brief.',
  },
  {
    step: '02',
    title: 'Data & mapping',
    detail:
      'We pull the relevant policy, funding, institutional and project data, then map it to the decision at hand.',
  },
  {
    step: '03',
    title: 'Deliverable',
    detail:
      'A pathway plan, placement design, insight brief or report - written in plain language and formatted for use.',
  },
  {
    step: '04',
    title: 'Publish & track',
    detail:
      'Where it serves the public interest, findings are published free, then tracked against real outcomes.',
  },
];

/** Boutique consultancy mandates offered to institutions and industry. */
export const consultancyServices = [
  {
    title: 'Labour-market & skills-gap research',
    detail:
      'Primary and secondary research that quantifies the gap between training output and industrial demand.',
  },
  {
    title: 'Curriculum relevance reviews',
    detail:
      'Assessment of programme content against current industry practice and certification requirements.',
  },
  {
    title: 'Placement & absorption design',
    detail:
      'Structured attachment, internship and learnership frameworks with measurable absorption targets.',
  },
  {
    title: 'Insight reporting & publications',
    detail:
      'Industry-facing reports, ESG-aligned impact narratives and stakeholder presentation decks.',
  },
  {
    title: 'Stakeholder facilitation',
    detail:
      'Round tables and workshops between training providers, employers, government and development partners.',
  },
  {
    title: 'Student pipeline marketing',
    detail:
      'Reach the 62,000-strong TVET community with intake campaigns that are accurate, accessible and fast.',
  },
];