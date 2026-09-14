#!/usr/bin/env node
/**
 * THE PLUG TVET - placeholder report generator
 * ---------------------------------------------------------------------------
 * Creates a valid, openable one-page PDF in `/public/reports/` for every report
 * slug declared in `src/data/reports.js`. This means:
 *
 *   - every "Download PDF" button on /insights resolves to a real file,
 *   - the repository can be demoed immediately after `git clone`,
 *   - replacing a placeholder is a simple file overwrite with the same name.
 *
 * RUN:  npm run reports:scaffold          (skip files that already exist)
 *       npm run reports:scaffold -- --force  (overwrite everything)
 *
 * Existing files are preserved by default, so uploaded client PDFs are never
 * clobbered by accident.
 */

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '..', 'public', 'reports');
const force = process.argv.includes('--force');

/* ---------------------------------------------------------------------------
   Read the report manifest
   ---------------------------------------------------------------------------
   `src/data/reports.js` is an ESM module consumed by Next.js. This project's
   package.json is CommonJS (required by next.config.js / tailwind.config.js),
   so Node cannot `import` it directly. Rather than duplicate the report list we
   parse the single source of truth with a small, strict field reader - and fail
   loudly if the file shape ever changes.
--------------------------------------------------------------------------- */

const dataFile = path.resolve(here, '..', 'src', 'data', 'reports.js');
// Normalise CRLF so the parser behaves identically on Windows and in CI.
const source = readFileSync(dataFile, 'utf8').replace(/\r\n/g, '\n');

/** Slice out one exported array literal and split it into object bodies. */
function readObjectBlocks(exportName) {
  const start = source.indexOf(`export const ${exportName} = [`);
  if (start === -1) return [];

  const end = source.indexOf('\n];', start);
  const body = source.slice(start, end === -1 ? undefined : end);

  // Objects are separated by a line containing only "  {".
  return body
    .split(/\n\s{2}\{\n/)
    .slice(1)
    .map((block) => {
      const close = block.search(/\n\s{2}\},?\n|$/);
      return close === -1 ? block : block.slice(0, close);
    });
}

/** Read a single-quoted string field from an object body. */
function readString(field, block) {
  const match = block.match(new RegExp(`${field}:\\s*(?:\\n\\s*)?'([^']*)'`));
  return match ? match[1] : '';
}

/** Read a numeric field from an object body. */
function readNumber(field, block) {
  const match = block.match(new RegExp(`${field}:\\s*(\\d+)`));
  return match ? Number(match[1]) : 0;
}

/** Read a string array field from an object body. */
function readArray(field, block) {
  const match = block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return [...match[1].matchAll(/'([^']*)'/g)].map((item) => item[1]);
}

/** Dimension lookup: id -> { title, short }. */
const dimensionById = Object.fromEntries(
  readObjectBlocks('reportDimensions').map((block) => [
    readString('id', block),
    { title: readString('title', block), short: readString('short', block) },
  ])
);

/** The report manifest, in declaration order. */
const reports = readObjectBlocks('reports').map((block) => ({
  id: readString('id', block),
  slug: readString('slug', block),
  dimensionId: readString('dimensionId', block),
  title: readString('title', block),
  displayDate: readString('displayDate', block),
  pages: readNumber('pages', block),
  audience: readString('audience', block),
  summary: readString('summary', block),
  highlights: readArray('highlights', block),
  tags: readArray('tags', block),
}));

if (reports.length === 0) {
  console.error(
    'Could not read any reports from src/data/reports.js.\n' +
      'Check that the `reports` array still follows the documented object shape.'
  );
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   PDF text primitives
--------------------------------------------------------------------------- */

/** Normalise unicode punctuation to WinAnsi-safe ASCII for the base14 fonts. */
function toAscii(value) {
  return String(value)
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[\u00B7\u2022]/g, '-')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E]/g, '');
}

/** Escape characters that are special inside a PDF string literal. */
function escapePdf(value) {
  return toAscii(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/** Greedy word wrap to a maximum character width. */
function wrapText(value, maxChars = 84) {
  const words = toAscii(value).split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    if (!current.length) {
      current = word;
    } else if (`${current} ${word}`.length <= maxChars) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
if (current.length) lines.push(current);
  return lines;
}
  /* ---------------------------------------------------------------------------
   Document layout
--------------------------------------------------------------------------- */

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;

/** Convert report metadata into printable lines with type specs. */
function buildLines(report, dimension) {
  const lines = [];

  const push = (text, { size = 11, bold = false, gap = 18, color = 0.15 } = {}) => {
    lines.push({ text: toAscii(text), size, bold, gap, color });
  };

  push('THE PLUG TVET', { size: 22, bold: true, gap: 26, color: 0.1 });
  push('Industry Insights - Downloadable Research Brief', { size: 10, gap: 30, color: 0.45 });
  push(' ', { size: 4, gap: 12 });

  push(dimension?.title || 'Insight report', { size: 11, bold: true, gap: 20, color: 0.3 });

  wrapText(report.title, 60).forEach((text, index) => {
    lines.push({ text, size: 17, bold: true, gap: index === 0 ? 26 : 22, color: 0.05 });
  });

  push(' ', { size: 4, gap: 10 });
  push(`${report.displayDate}  |  ${report.pages} pages  |  Audience: ${report.audience}`, {
    size: 10,
    gap: 26,
    color: 0.45,
  });

  push('SUMMARY', { size: 10, bold: true, gap: 18, color: 0.25 });
  wrapText(report.summary, 88).forEach((text) => {
    lines.push({ text, size: 11, bold: false, gap: 16, color: 0.15 });
  });

  push(' ', { size: 4, gap: 12 });
  push('KEY POINTS IN THIS BRIEF', { size: 10, bold: true, gap: 18, color: 0.25 });

  for (const highlight of report.highlights || []) {
    wrapText(`- ${highlight}`, 86).forEach((text, index) => {
      lines.push({ text, size: 11, bold: false, gap: index === 0 ? 17 : 15, color: 0.15 });
    });
  }

  push(' ', { size: 4, gap: 12 });
  push(`TAGS: ${(report.tags || []).join('  |  ')}`, { size: 9, gap: 30, color: 0.45 });

  push('- - - - -', { size: 9, gap: 20, color: 0.7 });

  const note =
    `PLACEHOLDER PDF: this file is generated so every download link resolves. Replace it by ` +
    `saving the final report over public/reports/${report.slug}.pdf and committing - the CI ` +
    `pipeline republishes the static site automatically.`;

  wrapText(note, 88).forEach((text) => {
    lines.push({ text, size: 9, bold: false, gap: 14, color: 0.5 });
  });

  return lines;
}

/** Build the PDF content stream using absolute text positioning. */
function buildContentStream(lines) {
  let y = PAGE_HEIGHT - MARGIN;
  let stream = '';

  for (const line of lines) {
    y -= line.gap;
    if (y < MARGIN) break; // single-page placeholder: stop above the footer

    if (!line.text.trim().length) continue;

    const font = line.bold ? '/F1' : '/F2';
    const gray = line.color ?? 0.15;

    stream +=
      `BT ${gray} ${gray} ${gray} rg ${font} ${line.size} Tf ` +
      `1 0 0 1 ${MARGIN} ${y.toFixed(2)} Tm (${escapePdf(line.text)}) Tj ET\n`;
  }

  // Brand strip at the foot of the page.
  stream += `q 0.133 0.827 0.933 rg ${MARGIN} 46 ${(PAGE_WIDTH - MARGIN * 2).toFixed(2)} 2 re f Q\n`;
  stream +=
    `BT 0.35 0.4 0.45 rg /F2 9 Tf 1 0 0 1 ${MARGIN} 30 Tm ` +
    `(theplugtvet@gmail.com  -  +267 75476059  -  Blue Jacket Street, Francistown, Botswana) Tj ET\n`;

  return stream;
}

/** Assemble a complete, xref-correct PDF document. */
function buildPdf(report, dimension) {
  const content = buildContentStream(buildLines(report, dimension));

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] ' +
      '/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}endstream`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];

  objects.forEach((body, index) => {
    offsets[index] = Buffer.byteLength(pdf, 'latin1');
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const startxref = Buffer.byteLength(pdf, 'latin1');
  const size = objects.length + 1;

  pdf += `xref\n0 ${size}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

/* ---------------------------------------------------------------------------
   Run
--------------------------------------------------------------------------- */

mkdirSync(outDir, { recursive: true });

let created = 0;
let skipped = 0;

for (const report of reports) {
  const target = path.join(outDir, `${report.slug}.pdf`);

  if (existsSync(target) && !force) {
    skipped += 1;
    continue;
  }

  writeFileSync(target, buildPdf(report, dimensionById[report.dimensionId]));
  created += 1;
}

console.log('THE PLUG TVET - report scaffold');
console.log(`  output:   ${outDir}`);
console.log(`  created:  ${created}`);
console.log(`  skipped:  ${skipped} (already present - use --force to overwrite)`);
console.log(`  declared: ${reports.length} reports in src/data/reports.js`);