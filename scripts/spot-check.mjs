/**
 * Content spot-check on the exported static HTML.
 *
 * Confirms the production copy requested in the brief actually made it into the
 * flat output: hero headline, social-proof stats, the three pillars, the Substack
 * CTAs, the contact details and the report download hooks.
 *
 * Usage: node scripts/spot-check.mjs   (run after `npm run build`)
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const read = (p) => fs.readFileSync(path.join(OUT, p), 'utf8');
const log = [];

/**
 * Decode the handful of HTML entities Next.js emits so plain-text assertions
 * (e.g. "Courses & Career Guidance") match the exported markup reliably.
 * React also separates adjacent text nodes with `<!-- -->` markers in SSR
 * output, which we strip so split sentences still read as one string.
 */
function decode(html) {
  return html
    .replace(/<!--.*?-->/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '\u201c')
    .replace(/&rdquo;/g, '\u201d')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/** Records a readable pass/fail line for each expected string. */
function checkHtml(label, html, needles) {
  const text = decode(html);
  log.push(`\n--- ${label} ---`);
  for (const needle of needles) {
    const found = typeof needle === 'string' ? text.includes(needle) : needle.test(text);
    log.push(`${found ? 'OK  ' : 'MISS'} ${String(needle)}`);
  }
}

checkHtml('home (out/index.html)', read('index.html'), [
  'THE PLUG TVET',
  'Connecting Botswana to TVET Opportunities',
  /62[,.]?000|62k/i,
  /6[,.]?[0-9]?k|6,000/i,
  'Inform',
  'Guide',
  'Connect',
  /substack\.com/,
]);

checkHtml('about (out/about/index.html)', read('about/index.html'), [
  'Empowering Skills. Building Futures.',
  'Francistown',
  'Strategic goals',
]);

checkHtml('services (out/services/index.html)', read('services/index.html'), [
  'Courses & Career Guidance',
  'Applications & Opportunities',
  'Skills & Training Information',
  'Student & Graduate Stories',
]);

checkHtml('insights (out/insights/index.html)', read('insights/index.html'), [
  'Policy Analysis & Financial Impact',
  'Approved Projects & Infrastructure Pipeline',
  'Skill Capacity Research & Labour Market Data',
  'Institutional Case Studies',
  'ESG & Global Industry Trends',
  // Dimension-selector tiles rendered by <InsightsRepository /> (section 1).
  'Who pays, how much, and what does the country get back?',
  'Which projects are real, and which trades will they absorb?',
  '20 reports available for free',
  // Repository grid + download hooks (section 2).
  'insight-grid',
  'Download PDF',
  'Search titles, tags, audiences...',
  'Reports are served from',
  '/reports/tvet-funding-flows-botswana-2026.pdf',
]);

checkHtml('news (out/news/index.html)', read('news/index.html'), [
  'Deeper Analysis',
  /substack\.com/,
]);

// Every article must carry the global "Deeper Analysis" Substack anchor.
const newsDir = path.join(OUT, 'news');
const slugs = fs
  .readdirSync(newsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
log.push('\n--- per-article Deeper Analysis anchors ---');
for (const slug of slugs) {
  const html = read(path.join('news', slug, 'index.html'));
  const hasAnchor = html.includes('Deeper Analysis');
  const hasSubstack = /substack\.com/.test(html);
  log.push(`${hasAnchor && hasSubstack ? 'OK  ' : 'MISS'} ${slug}`);
}

checkHtml('contact (out/contact/index.html)', read('contact/index.html'), [
  'theplugtvet@gmail.com',
  'Blue Jacket Street',
  'Francistown',
  'Botswana',
  '+267 75476059',
  '+26775476059',
  'Student',
  'Employer',
  'Stakeholder',
]);

// Count real PDF download anchors across the site.
const insightsHtml = read('insights/index.html');
const pdfLinks = insightsHtml.match(/\/reports\/[a-z0-9-]+\.pdf/g) || [];
log.push(`\nPDF download links rendered on /insights: ${pdfLinks.length} (unique: ${new Set(pdfLinks).size})`);

const summary = log.join('\n');
fs.writeFileSync(path.join(process.cwd(), 'spot-check.log'), summary, 'utf8');
console.log(summary);