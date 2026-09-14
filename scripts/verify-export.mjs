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