/**
 * Verifies the static export produced by `npm run build` (next.config.js uses
 * output: 'export', so everything lands in ./out as flat HTML/CSS/JS).
 *
 * Usage: node scripts/verify-export.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const log = [];

const exists = (p) => fs.existsSync(path.join(OUT, p));
const check = (p, note = '') => log.push(`${exists(p) ? 'OK  ' : 'MISS'} ${p}${note ? `  (${note})` : ''}`);

log.push('--- expected static pages ---');
for (const page of [
  'index.html',
  '404.html',
  'about/index.html',
  'services/index.html',
  'insights/index.html',
  'news/index.html',
  'contact/index.html',
]) {
  check(page);
}

log.push('\n--- exported report PDFs ---');
const reportsDir = path.join(OUT, 'reports');
if (fs.existsSync(reportsDir)) {
  const pdfs = fs.readdirSync(reportsDir).filter((f) => f.toLowerCase().endsWith('.pdf'));
  log.push(`count=${pdfs.length}`);
  pdfs.forEach((f) => log.push(`  ${f} (${(fs.statSync(path.join(reportsDir, f)).size / 1024).toFixed(0)} KB)`));
} else {
  log.push('MISS out/reports');
}

log.push('\n--- news slugs exported ---');
const newsDir = path.join(OUT, 'news');
if (fs.existsSync(newsDir)) {
  fs.readdirSync(newsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .forEach((d) => check(path.join('news', d.name, 'index.html')));
}

log.push('\n--- runtime assets ---');
check('.nojekyll', 'keeps _next/ on GitHub Pages');
check('sitemap.xml');
check('robots.txt');
check('logo.svg');
check('favicon.svg');

// ---------------------------------------------------------------------------
// Leak guard: everything in public/ is copied verbatim into out/ and is
// therefore world-readable once deployed. Internal notes, QA logs, editor
// backups and scratch files must never ship.
//
// NOTE: Next.js App Router static export legitimately emits `index.txt` RSC
// payload files next to every `index.html`. Those are framework output, not
// leaks, so `.txt` cannot be banned wholesale - only `index.txt` is allowed
// and every other `.txt` (except robots.txt) is treated as a leak.
// ---------------------------------------------------------------------------
log.push('\n--- leak guard (files that must NOT be published) ---');
const FORBIDDEN_EXT = ['.md', '.markdown', '.log', '.bak', '.orig', '.swp', '.tmp', '.stackdump'];
const ALLOWED_TXT = new Set(['robots.txt']);
const leaks = [];

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Never audit Next.js framework internals or the build ID directory.
      if (entry.name === '_next') continue;
      walk(full);
      continue;
    }
    const rel = path.relative(OUT, full).split(path.sep).join('/');
    const ext = path.extname(entry.name).toLowerCase();
    const lower = entry.name.toLowerCase();

    // `index.txt` = Next.js RSC payload, required by the exported app.
    if (ext === '.txt' && (ALLOWED_TXT.has(lower) || lower === 'index.txt')) continue;
    if (FORBIDDEN_EXT.includes(ext) || ext === '.txt') leaks.push(rel);
  }
};

if (fs.existsSync(OUT)) walk(OUT);

if (leaks.length === 0) {
  log.push('OK   no internal docs/logs found in out/');
} else {
  leaks.forEach((f) => log.push(`LEAK ${f}`));
}
const leakCount = leaks.length;
log.push(`leak count=${leakCount}`);

// ---------------------------------------------------------------------------
// Canonical-domain guard. The custom domain is www.plugtvet.com; if a build
// ever emits the wrong GitHub Pages origin into canonical/og:url/JSON-LD the
// site is advertising someone else's host to search engines.
// ---------------------------------------------------------------------------
log.push('\n--- canonical origin ---');
const EXPECTED_ORIGIN = 'https://www.plugtvet.com';
const staleOrigins = ['theplugtvet.github.io', 'otlhomame.github.io'];
const staleHits = [];
for (const f of ['index.html', 'insights/index.html', 'about/index.html']) {
  const full = path.join(OUT, f);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, 'utf8');
  for (const bad of staleOrigins) {
    if (html.includes(bad)) staleHits.push(`${f} references ${bad}`);
  }
  log.push(`${html.includes(EXPECTED_ORIGIN) ? 'OK  ' : 'WARN'} ${f} canonical origin`);
}
if (staleHits.length === 0) {
  log.push('OK   no stale GitHub Pages origins in HTML');
} else {
  staleHits.forEach((h) => log.push(`STALE ${h}`));
}

// ---------------------------------------------------------------------------
// .nojekyll must exist AND be genuinely empty, otherwise GitHub Pages will run
// Jekyll and strip the /_next directory, breaking every stylesheet and script.
// ---------------------------------------------------------------------------
const nojekyllPath = path.join(OUT, '.nojekyll');
if (fs.existsSync(nojekyllPath)) {
  const size = fs.statSync(nojekyllPath).size;
  log.push(size === 0 ? 'OK   .nojekyll is empty (valid Jekyll marker)' : `WARN .nojekyll is ${size} bytes - should be 0`);
}

// ---------------------------------------------------------------------------
// The landing page is what the custom domain serves at "/". If this is missing
// GitHub Pages shows "There isn't a GitHub Pages site here".
// ---------------------------------------------------------------------------
log.push('\n--- deployable landing page ---');
const indexHtml = path.join(OUT, 'index.html');
if (fs.existsSync(indexHtml)) {
  log.push(`OK   index.html (${(fs.statSync(indexHtml).size / 1024).toFixed(1)} KB)`);
} else {
  log.push('MISS index.html - custom domain would 404');
}

log.push('\n--- sanity greps on out/insights/index.html ---');
const insightsHtml = fs.existsSync(path.join(OUT, 'insights', 'index.html'))
  ? fs.readFileSync(path.join(OUT, 'insights', 'index.html'), 'utf8')
  : '';
log.push(`dimension selector present: ${insightsHtml.includes('Filtering this dimension') || insightsHtml.includes('Show') ? 'yes' : 'no'}`);
log.push(`insight-grid anchor present: ${insightsHtml.includes('insight-grid') ? 'yes' : 'no'}`);
log.push(`PDF download link present: ${/\/reports\/[a-z0-9-]+\.pdf/.test(insightsHtml) ? 'yes' : 'no'}`);
log.push(`substack link present: ${/substack\.com/.test(insightsHtml) ? 'yes' : 'no'}`);

log.push('\n--- sanity greps on out/index.html ---');
const homeHtml = fs.existsSync(path.join(OUT, 'index.html'))
  ? fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
  : '';
log.push(`62k Facebook claim present: ${/62/.test(homeHtml) ? 'yes' : 'no'}`);
log.push(`6k TikTok claim present: ${/6[,.]?[0-9]?k|6,000/i.test(homeHtml) ? 'yes' : 'no'}`);

const summary = log.join('\n');
fs.writeFileSync(path.join(ROOT, 'export-check.log'), summary, 'utf8');
console.log(summary);

// ---------------------------------------------------------------------------
// Exit non-zero when the export is not deployable. The CI workflow runs this
// script before uploading the Pages artifact, so a leak or a missing landing
// page now stops the deployment instead of shipping a broken/leaky site.
// ---------------------------------------------------------------------------
const fatal = [];
if (!fs.existsSync(path.join(OUT, 'index.html'))) fatal.push('out/index.html is missing');
if (!fs.existsSync(path.join(OUT, '.nojekyll'))) fatal.push('out/.nojekyll is missing');
if (leakCount > 0) fatal.push(`${leakCount} forbidden file(s) would be published`);
if (staleHits.length > 0) fatal.push(`${staleHits.length} stale origin reference(s) in published HTML`);

if (fatal.length > 0) {
  console.error(`\nFAIL export is not deployable:\n  - ${fatal.join('\n  - ')}`);
  process.exit(1);
}

console.log('\nPASS export is deployable.');