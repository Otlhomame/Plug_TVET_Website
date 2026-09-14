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
 *   cover       -> CSS gradient key (see COVER_GRADIENTS)
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
    slug: 'botswana-tvet-enrolment-window-what-changes-this-cycle',
    subSlug: 'botswana-tvet-enrolment-window-decoded',
    title: 'Botswana’s TVET enrolment window: what actually changes this cycle',
    category: 'Admissions',
    cover: 'cyan',
    date: '2026-08-24',
    displayDate: '24 August 2026',
    readMinutes: 4,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'Application windows, document requirements and placement sequencing have shifted. Here is the short version every applicant should read before submitting anything.',
    takeaways: [
      'Submission windows open earlier and close harder than last cycle.',
      'Certified copies and identity documents cause the most rejections.',
      'Second-choice programmes are now far more competitive - choose deliberately.',
    ],
    body: [
      {
        type: 'p',
        text: 'Every intake cycle, thousands of qualified applicants lose a place for a reason that has nothing to do with ability: a missing certified copy, an unverified result slip, or a submission made four hours after the portal closed. This cycle tightens those margins further, so the sequence matters as much as the qualification.',
      },
      { type: 'h2', text: 'The three changes that matter' },
      {
        type: 'ul',
        items: [
          'Earlier opening: verification-heavy programmes now require documents submitted weeks ahead of the general deadline.',
          'Tighter confirmation: offers must be accepted within a shorter window before the seat is released to the waiting list.',
          'Structured placement: applicants who indicate a realistic second and third preference are placed faster than single-choice applicants.',
        ],
      },
      { type: 'h2', text: 'What to do this week' },
      {
        type: 'p',
        text: 'Build a document pack before you open the portal: certified ID, certified results, proof of residence where requested, and a scanned sponsorship or bursary letter if you have one. Then map three programmes - one ambitious, one matched, one safe - against your actual subject passes rather than your hoped-for ones.',
      },
      {
        type: 'quote',
        text: 'Most rejections we see are administrative, not academic. Fix the paperwork and you are already ahead of the queue.',
      },
      {
        type: 'p',
        text: 'Finally, verify every requirement against the institution’s own published notice. Third-party summaries - including ours - are a starting point, never the final word.',
      },
    ],
  },
  {
    id: 'n-02',
    slug: 'levy-funded-training-claims-employers-leave-money-behind',
    subSlug: 'levy-funded-training-claims-botswana',
    title: 'Levy-funded training: the money employers leave behind every year',
    category: 'Employers',
    cover: 'teal',
    date: '2026-08-11',
    displayDate: '11 August 2026',
    readMinutes: 5,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'Botswana employers contribute to skills development by law - and then fail to claim it back. The paperwork is the barrier, not the eligibility.',
    takeaways: [
      'Eligibility is broader than most HR teams assume.',
      'Claims fail on documentation sequencing, not on merit.',
      'A pre-approved training plan is the single highest-leverage fix.',
    ],
    body: [
      {
        type: 'p',
        text: 'The levy exists to convert employer contributions into trained people. In practice, a meaningful share of it returns to no one, because claims arrive incomplete, late, or without the approval trail that makes them defensible.',
      },
      { type: 'h2', text: 'Where claims break' },
      {
        type: 'ul',
        items: [
          'Training is delivered before the plan is registered - so the activity is real but the claim is not recognisable.',
          'Provider accreditation is assumed rather than verified.',
          'Attendance and assessment evidence is collected informally and cannot be reconstructed at claim time.',
        ],
      },
      { type: 'h2', text: 'The fix is a calendar, not a consultant' },
      {
        type: 'p',
        text: 'Register the training plan first, confirm the provider’s accreditation in writing, and capture attendance, assessment and completion evidence as the training runs - not three months later. Employers who operate this sequence recover substantially more of what they contribute.',
      },
      {
        type: 'p',
        text: 'For a full worked example, including the document pack we recommend, see our levy review in the Industry Insights repository.',
      },
    ],
  },
  {
    id: 'n-03',
    slug: 'scarce-skills-where-botswana-demand-outruns-training-capacity',
    subSlug: 'scarce-skills-botswana-capacity-gap',
    title: 'Scarce skills: where Botswana’s demand is outrunning training capacity',
    category: 'Labour Market',
    cover: 'mix',
    date: '2026-07-29',
    displayDate: '29 July 2026',
    readMinutes: 4,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'Approved projects are stacking up faster than the workshops that produce the trades they need. Four skill families sit at the centre of that squeeze.',
    takeaways: [
      'Demand is concentrated in maintenance, electrical, welding and control disciplines.',
      'Capacity constraints are as much about trainers as about equipment.',
      'Regional access decides who can realistically train.',
    ],
    body: [
      {
        type: 'p',
        text: 'A project pipeline is a promise to employ people who do not yet exist in sufficient numbers. Botswana’s approved project list is healthy; the artisan and technician supply behind it is not keeping pace - and the shortfall is not evenly distributed.',
      },
      { type: 'h2', text: 'The four families under pressure' },
      {
        type: 'ul',
        items: [
          'Electro-mechanical trades: electricians, millwrights and instrumentation technicians.',
          'Fabrication and welding: coded welders and structural fabricators.',
          'Maintenance and reliability: mechanical fitters, planners and condition monitors.',
          'Process and control: plant operators moving into automated control environments.',
        ],
      },
      { type: 'h2', text: 'Why the workshops cannot simply scale' },
      {
        type: 'p',
        text: 'Trainer availability - not building space - is the binding constraint in most institutions. Experienced artisans are better paid in industry, so every additional training seat competes with a production line for the same person.',
      },
      {
        type: 'p',
        text: 'The practical consequence for learners: programmes in these families carry strong absorption prospects, especially where they include structured workplace exposure.',
      },
    ],
  },
  {
    id: 'n-04',
    slug: 'graduate-attachments-that-convert-into-jobs',
    subSlug: 'graduate-attachments-job-conversion',
    title: 'Attachments that actually convert into jobs',
    category: 'Graduate Pathways',
    cover: 'deep',
    date: '2026-07-10',
    displayDate: '10 July 2026',
    readMinutes: 5,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'Placement is not the same thing as absorption. What separates an attachment that ends in a contract from one that ends in a certificate of attendance?',
    takeaways: [
      'Structured task assignment is the strongest predictor of conversion.',
      'Host supervisors must be briefed before the trainee arrives.',
      'Documented competence evidence travels with the graduate.',
    ],
    body: [
      {
        type: 'p',
        text: 'Thousands of attachments are completed in Botswana every year. A minority convert into employment, and the difference is rarely about the learner’s technical ability. It is about how the placement itself was designed.',
      },
      { type: 'h2', text: 'What converts' },
      {
        type: 'ul',
        items: [
          'A defined task list with deliverables the host genuinely needs completed.',
          'A named supervisor with allocated time - not a willing colleague squeezed between shifts.',
          'Regular feedback in the first two weeks, when habits are still forming.',
          'A closing assessment that documents what the trainee can now do unsupervised.',
        ],
      },
      { type: 'h2', text: 'What does not' },
      {
        type: 'p',
        text: 'Observation-only placements. If the trainee spends twelve weeks watching a qualified artisan work, no employer has evidence that the trainee can perform. Without evidence, the safest hiring decision is to hire someone else.',
      },
      {
        type: 'quote',
        text: 'A placement is a twelve-week interview. Design it like one, on both sides.',
      },
      {
        type: 'p',
        text: 'Employers: brief your supervisors and log the trainee’s signed-off competences. Graduates: ask for the task list in writing on day one. Both actions materially raise the conversion rate.',
      },
    ],
  },
  {
    id: 'n-05',
    slug: 'green-skills-energy-transition-botswana-trades',
    subSlug: 'green-skills-botswana-trades',
    title: 'Green skills: the trades arriving with the energy transition',
    category: 'Industry Trends',
    cover: 'teal',
    date: '2026-06-22',
    displayDate: '22 June 2026',
    readMinutes: 4,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'Renewables create maintenance jobs, not just installation work. Here are the certifications and trades Botswana will need next - and how to start now.',
    takeaways: [
      'Maintenance and storage skills outlast the installation boom.',
      'Certification requirements are tightening as capacity grows.',
      'Electrical and instrumentation backgrounds transfer fastest.',
    ],
    body: [
      {
        type: 'p',
        text: 'Every megawatt of renewable capacity installed creates a smaller but far longer-lived demand for maintenance, testing and repair. That maintenance tail is where TVET graduates build durable careers.',
      },
      { type: 'h2', text: 'Where the work sits' },
      {
        type: 'ul',
        items: [
          'Solar PV installation and, more durably, array inspection and fault-finding.',
          'Battery storage commissioning and preventive maintenance.',
          'Energy monitoring, metering and efficiency auditing.',
          'Grid connection work requiring electrical certification.',
        ],
      },
      { type: 'h2', text: 'How to position yourself' },
      {
        type: 'p',
        text: 'If you already hold an electrical or instrumentation qualification, you are closest to these roles. Add a recognised renewable certification and documented hours on live installations, and you become employable in a market that currently imports far more specialist skill than it should.',
      },
      {
        type: 'p',
        text: 'For the full occupational map, capacity and certification detail, see our green skills report in the Industry Insights repository.',
      },
    ],
  },
  {
    id: 'n-06',
    slug: 'choosing-a-tvet-course-without-regret',
    subSlug: 'choosing-a-tvet-course-framework',
    title: 'Choosing a TVET course you will not regret in three years',
    category: 'Guidance',
    cover: 'cyan',
    date: '2026-05-19',
    displayDate: '19 May 2026',
    readMinutes: 5,
    author: 'THE PLUG TVET Editorial',
    excerpt:
      'Popularity and employability are different things. A simple five-question framework for choosing a programme you will still be glad about when the certificate arrives.',
    takeaways: [
      'Check who hires graduates of that exact programme.',
      'Practical contact hours matter more than programme title.',
      'Ask about assessment evidence before you enrol.',
    ],
    body: [
      {
        type: 'p',
        text: 'Course choice is usually made under time pressure, with limited information and a great deal of family expectation. The five questions below take an afternoon to answer and materially reduce the chance of regret.',
      },
      { type: 'h2', text: 'The five questions' },
      {
        type: 'ul',
        items: [
          'Who actually hires from this programme? Ask for names of employers that took graduates in the last two intakes.',
          'How many practical contact hours will I get, and in what condition are the workshops?',
          'What certification will I hold, and is it recognised by the employers on my list?',
          'Does the programme include a structured attachment with a defined task list?',
          'What can a graduate of this programme earn in year one, and where do they go in year three?',
        ],
      },
      { type: 'h2', text: 'Why the answers matter more than the title' },
      {
        type: 'p',
        text: 'Two programmes can share a name and produce very different graduates. The version with real workshop time, current equipment and a placement pipeline produces employable technicians; the version without them produces certificates.',
      },
      {
        type: 'quote',
        text: 'Do not ask whether the course is popular. Ask who hired last year’s graduates, and in what role.',
      },
      {
        type: 'p',
        text: 'If you are still undecided after answering these questions, our advisory sessions map your subject passes and budget to realistic routes with live absorption data.',
      },
    ],
  },
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