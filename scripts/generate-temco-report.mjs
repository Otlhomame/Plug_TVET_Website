#!/usr/bin/env node
/**
 * THE PLUG TVET - branded PDF report builder
 * ---------------------------------------------------------------------------
 * Renders the TEMCO P2 Billion Hospital brief into a multi-page, on-brand PDF
 * at `public/reports/temco-p2-billion-hospital-project.pdf` - the ONLY file in
 * the Industry Insights library, filed under the "Approved Projects &
 * Infrastructure Pipeline" dimension.
 *
 * WHY A HAND-ROLLED PDF WRITER (no external dependency):
 *   The project's `reports:scaffold` script already renders valid PDFs with the
 *   base-14 Helvetica fonts and a hand-assembled xref table (zero npm deps, so
 *   CI never breaks). This script reuses that exact approach and extends it to
 *   multiple pages, a colour system, tables and bar charts.
 *
 * BRAND SYSTEM (sampled from tailwind.config.js / public/logo.svg):
 *   Plug Blue  #1C7BEE  (primary accent)     -> headings, table headers, charts
 *   Deep Blue  #123FAE                       -> title text, strong rules
 *   Plug Chrome #5C82B0 / #7FA6D4            -> secondary accent, chart alt bars
 *   Slate      #050912 / #0A1122             -> ink, table header fill
 *   Off-white  #D3DDEB                       -> subheads on dark fills
 *   Amber      #FFC876                       -> the seam highlight (bugle/caption)
 *
 * RUN:  npm run reports:temco
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '..', 'public', 'reports');
const OUT_FILE = path.join(outDir, 'temco-p2-billion-hospital-project.pdf');

/* ---------------------------------------------------------------------------
   Brand palette (0-1 RGB)
--------------------------------------------------------------------------- */
const COLORS = {
  blue: [0x1c / 255, 0x7b / 255, 0xee / 255], // Plug Blue #1C7BEE
  blueDeep: [0x12 / 255, 0x3f / 255, 0xae / 255], // #123FAE
  blueLight: [0x82 / 255, 0xbd / 255, 0xff / 255], // #82BDFF
  chrome: [0x5c / 255, 0x82 / 255, 0xb0 / 255], // #5C82B0
  chromeLight: [0x7f / 255, 0xa6 / 255, 0xd4 / 255], // #7FA6D4
  slate: [0x05 / 255, 0x09 / 255, 0x12 / 255], // #050912 ink
  slateDeep: [0x0a / 255, 0x11 / 255, 0x22 / 255], // #0A1122
  slate700: [0x17 / 255, 0x25 / 255, 0x3f / 255],
  slate300: [0x6b / 255, 0x82 / 255, 0xa6 / 255],
  offwhite: [0xd3 / 255, 0xdd / 255, 0xeb / 255], // #D3DDEB
  text: [0x1a / 255, 0x22 / 255, 0x33 / 255], // body ink on white
  muted: [0x46 / 255, 0x64 / 255, 0x8e / 255], // muted captions
  amber: [0xff / 255, 0xc8 / 255, 0x76 / 255], // #FFC876
  white: [1, 1, 1],
  rule: [0xc5 / 255, 0xd3 / 255, 0xe6 / 255], // light table rule
  band: [0xef / 255, 0xf5 / 255, 0xff / 255], // zebra fill
};

/** Serialise a colour as a PDF `r g b rg` operand. */
function rg(color) {
  return `${color[0].toFixed(4)} ${color[1].toFixed(4)} ${color[2].toFixed(4)} rg`;
}

/** Blend two colours by ratio t (0 -> a, 1 -> b). */
function mix(a, b, t) {
  return [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t);
}

/* ---------------------------------------------------------------------------
   Text primitives
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
    .replace(/[\u00E9]/g, 'e')
    .replace(/[\u00B2]/g, '2')
    .replace(/[^\x20-\x7E]/g, '');
}

/** Escape characters that are special inside a PDF string literal. */
function escapePdf(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Approximate Helvetica advance widths (per 1000 em). Base-14 Helvetica has a
 * fixed metric table; we only need it to wrap text and centre headings, so a
 * compact per-character table is enough and stays dependency-free.
 */
const HELV_W = {
  ' ': 278, '!': 278, '"': 355, '#': 556, $: 556, '%': 889, '&': 667, "'": 191,
  '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
  0: 556, 1: 556, 2: 556, 3: 556, 4: 556, 5: 556, 6: 556, 7: 556, 8: 556, 9: 556,
  ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556, '@': 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500,
  K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611,
  U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  '[': 278, '\\': 278, ']': 278, '^': 469, _: 556, '`': 333,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222,
  k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278,
  u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  '{': 334, '|': 260, '}': 334, '~': 584,
};

/** Measure a string's rendered width in points for a given font size/weight. */
function textWidth(text, size, bold = false) {
  const ascii = toAscii(text);
  let units = 0;
  for (const ch of ascii) {
    const w = HELV_W[ch] ?? 556;
    // Helvetica-Bold is roughly 4% wider on average - close enough for layout.
    units += bold ? w * 1.04 : w;
  }
  return (units / 1000) * size;
}

/** Greedy word wrap to a maximum width in points. */
function wrapWidth(value, size, maxWidth, bold = false) {
  const words = toAscii(value).split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const probe = current.length ? `${current} ${word}` : word;
    if (textWidth(probe, size, bold) <= maxWidth) {
      current = probe;
    } else {
      if (current.length) lines.push(current);
      current = word;
    }
  }
  if (current.length) lines.push(current);
  return lines;
}

/* ---------------------------------------------------------------------------
   Page geometry
--------------------------------------------------------------------------- */
const PAGE_W = 595.28; // A4 points
const PAGE_H = 841.89;
const MARGIN_X = 50;
const MARGIN_TOP = 64;
const MARGIN_BOTTOM = 64;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const FOOTER_Y = 40; // y of the footer baseline

/* ---------------------------------------------------------------------------
   Document builder - a tiny flowable engine
   ---------------------------------------------------------------------------
   The builder accumulates draw-ops per page. `ensure(height)` starts a new page
   when the next block would not fit, which is what keeps tables (and any block
   passed as atomic) from being split across a page break.
--------------------------------------------------------------------------- */
class Document {
  constructor() {
    this.pages = [];
    this.startPage();
  }

  startPage() {
    this.ops = [];
    this.y = PAGE_H - MARGIN_TOP;
    this.pages.push(this.ops);
  }

  /** Remaining vertical space above the footer on the current page. */
  get remaining() {
    return this.y - (MARGIN_BOTTOM + 18);
  }

  /**
   * Guarantee `height` points of room, breaking to a fresh page if needed.
   * `keepWithNext` blocks call this before drawing so they never strand.
   */
  ensure(height) {
    if (this.y - height < MARGIN_BOTTOM + 18) {
      this.startPage();
      return true;
    }
    return false;
  }

  /** Absolute-positioned text baseline draw. */
  text(str, x, y, { size = 10, bold = false, italic = false, color = COLORS.text } = {}) {
    if (!String(str).length) return;
    const font = bold ? '/FB' : italic ? '/FI' : '/FR';
    this.ops.push(
      `BT ${rg(color)} ${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdf(str)}) Tj ET`
    );
  }

  /** Right-aligned text helper. */
  textRight(str, xRight, y, opts = {}) {
    const w = textWidth(str, opts.size ?? 10, opts.bold ?? false);
    this.text(str, xRight - w, y, opts);
  }

  /** Centred text helper. */
  textCenter(str, xCenter, y, opts = {}) {
    const w = textWidth(str, opts.size ?? 10, opts.bold ?? false);
    this.text(str, xCenter - w / 2, y, opts);
  }

  /** Filled rectangle. */
  rect(x, y, w, h, color) {
    this.ops.push(`q ${rg(color)} ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`);
  }

  /** Rectangle outline (stroke). */
  strokeRect(x, y, w, h, color, lineWidth = 0.75) {
    this.ops.push(
      `q ${rg(color)} ${lineWidth} w ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S Q`
    );
  }

  /** Horizontal rule. */
  hline(x, y, w, color, lineWidth = 0.75) {
    this.ops.push(`q ${rg(color)} ${lineWidth} w ${x.toFixed(2)} ${y.toFixed(2)} m ${(x + w).toFixed(2)} ${y.toFixed(2)} l S Q`);
  }

  /** A filled bar rectangle used by charts. */
  bar(x, y, w, h, color) {
    this.rect(x, y, w, h, color);
  }
}

/* ---------------------------------------------------------------------------
   Block helpers - high-level layout primitives
--------------------------------------------------------------------------- */

/** Section heading: accents bar + bold heading, kept with the following block. */
function heading(doc, text, { size = 15, color = COLORS.blueDeep } = {}) {
  doc.ensure(size + 34);
  doc.y -= 20;
  // Vertical accent bar to the left of the heading.
  doc.rect(MARGIN_X, doc.y - 2, 3, size + 1, COLORS.blue);
  doc.text(text, MARGIN_X + 12, doc.y, { size, bold: true, color });
  doc.y -= 10;
  doc.hline(MARGIN_X + 12, doc.y, CONTENT_W - 12, COLORS.rule, 0.6);
  doc.y -= 12;
}

/** Body paragraph, wrapped to the content width. */
function paragraph(doc, text, { size = 10.5, color = COLORS.text, gap = 15, italic = false, bold = false } = {}) {
  const lines = wrapWidth(text, size, CONTENT_W, bold);
  doc.ensure(lines.length * gap + 4);
  for (const line of lines) {
    doc.text(line, MARGIN_X, doc.y, { size, color, italic, bold });
    doc.y -= gap;
  }
  doc.y -= 4;
}

/** A small caption / eyebrow label in brand blue. */
function eyebrow(doc, text) {
  doc.ensure(18);
  doc.text(text.toUpperCase(), MARGIN_X, doc.y, { size: 8.5, bold: true, color: COLORS.blue });
  doc.y -= 14;
}

/** Bulleted list item. */
function bullet(doc, text, { size = 10.5, color = COLORS.text, gap = 15 } = {}) {
  const lines = wrapWidth(text, size, CONTENT_W - 16);
  doc.ensure(lines.length * gap + 3);
  doc.rect(MARGIN_X + 1, doc.y + 2, 4, 4, COLORS.blue);
  lines.forEach((line, i) => {
    doc.text(line, MARGIN_X + 14, doc.y, { size, color });
    doc.y -= gap;
    if (i < lines.length - 1) doc.ensure(gap);
  });
  doc.y -= 3;
}

/** A tinted callout panel with a blue rail. Returns nothing; advances cursor. */
function callout(doc, title, body) {
  const innerW = CONTENT_W - 28;
  const titleLines = title ? wrapWidth(title, 10.5, innerW, true) : [];
  const bodyLines = wrapWidth(body, 9.5, innerW);
  const lineH = 13.5;
  const height = 20 + titleLines.length * lineH + bodyLines.length * lineH + 8;

  doc.ensure(height + 8);
  doc.y -= 6;
  const top = doc.y + 10;
  doc.rect(MARGIN_X, top - height, CONTENT_W, height, COLORS.band);
  doc.rect(MARGIN_X, top - height, 3.5, height, COLORS.blue);
  doc.strokeRect(MARGIN_X, top - height, CONTENT_W, height, COLORS.rule, 0.6);

  let cursor = top - 16;
  for (const line of titleLines) {
    doc.text(line, MARGIN_X + 14, cursor, { size: 10.5, bold: true, color: COLORS.blueDeep });
    cursor -= lineH;
  }
  for (const line of bodyLines) {
    doc.text(line, MARGIN_X + 14, cursor, { size: 9.5, color: COLORS.text });
    cursor -= lineH;
  }
  doc.y = top - height - 10;
}

/* ---------------------------------------------------------------------------
   Table renderer
   ---------------------------------------------------------------------------
   `columns` is an array of relative weights. The whole table is measured first
   and, if it does not fit the remaining space, it is pushed to a fresh page so
   no row is ever cut in half by a page break.
--------------------------------------------------------------------------- */
function table(doc, columns, rows, { headerBold = true, caption = null } = {}) {
  const cellPadX = 7;
  const cellPadY = 5.5;
  const lineH = 12.2;
  const headerH = 22;

  // Column x-positions and widths from the relative weights.
  const weightSum = columns.reduce((s, c) => s + c.weight, 0);
  const widths = columns.map((c) => (c.weight / weightSum) * CONTENT_W);
  const xs = [];
  let acc = MARGIN_X;
  for (const w of widths) {
    xs.push(acc);
    acc += w;
  }

  // Pre-measure every row height so the atomic block fits on one page.
  const rowHeights = rows.map((row) =>
    Math.max(
      ...row.map((cell, i) => wrapWidth(cell, 8.8, widths[i] - cellPadX * 2).length * lineH)
    ) + cellPadY * 2
  );
  const totalH = headerH + rowHeights.reduce((s, h) => s + h, 0);
  const captionH = caption ? 16 : 0;

  if (doc.y - (totalH + captionH) < MARGIN_BOTTOM + 18) {
    doc.startPage();
  }

  // ---- Caption above the table --------------------------------------------
  if (caption) {
    doc.text(caption, MARGIN_X, doc.y, { size: 8.6, italic: true, color: COLORS.muted });
    doc.y -= captionH;
  }

  // ---- Header row ---------------------------------------------------------
  let rowTop = doc.y;
  doc.rect(MARGIN_X, rowTop - headerH, CONTENT_W, headerH, COLORS.blueDeep);
  columns.forEach((col, i) => {
    doc.text(col.label.toUpperCase(), xs[i] + cellPadX, rowTop - 15, {
      size: 8.6,
      bold: headerBold,
      color: COLORS.white,
    });
  });
  let cursor = rowTop - headerH;

  // ---- Body rows ----------------------------------------------------------
  rows.forEach((row, r) => {
    const h = rowHeights[r];
    const fill = r % 2 === 1 ? COLORS.band : COLORS.white;
    doc.rect(MARGIN_X, cursor - h, CONTENT_W, h, fill);

    row.forEach((cell, i) => {
      const lines = wrapWidth(cell, 8.8, widths[i] - cellPadX * 2);
      let ty = cursor - cellPadY - 9;
      const first = i === 0;
      for (const line of lines) {
        doc.text(line, xs[i] + cellPadX, ty, {
          size: 8.8,
          bold: first,
          color: first ? COLORS.blueDeep : COLORS.text,
        });
        ty -= lineH;
      }
    });

    // Row separator.
    doc.hline(MARGIN_X, cursor - h, CONTENT_W, COLORS.rule, 0.5);
    cursor -= h;
  });

  // Table outline.
  doc.strokeRect(MARGIN_X, cursor, CONTENT_W, totalH, COLORS.rule, 0.7);
  // Column separators.
  for (let i = 1; i < xs.length; i += 1) {
    doc.ops.push(
      `q ${rg(COLORS.rule)} 0.5 w ${xs[i].toFixed(2)} ${cursor.toFixed(2)} m ${xs[i].toFixed(2)} ${(cursor + totalH).toFixed(2)} l S Q`
    );
  }

  doc.y = cursor - 14;
}

/* ---------------------------------------------------------------------------
   Bar chart
   ---------------------------------------------------------------------------
   `series` is an array of { label, value, sub } and `max` normalises the bars.
--------------------------------------------------------------------------- */
function barChart(doc, title, series, { max = null, unit = '', caption = null } = {}) {
  const chartH = series.length * 24 + 34;
  const captionH = caption ? 16 : 0;
  doc.ensure(chartH + captionH + 12);

  if (caption) {
    doc.text(caption, MARGIN_X, doc.y, { size: 8.6, italic: true, color: COLORS.muted });
    doc.y -= captionH;
  }
  doc.text(title, MARGIN_X, doc.y, { size: 10.5, bold: true, color: COLORS.blueDeep });
  doc.y -= 16;

  const labelW = 132;
  const valueW = 54;
  const trackX = MARGIN_X + labelW;
  const trackW = CONTENT_W - labelW - valueW;
  const peak = max ?? Math.max(...series.map((s) => s.value));

  series.forEach((s, i) => {
    const ratio = peak ? s.value / peak : 0;
    const barW = Math.max(2, ratio * trackW);
    const barH = 13;
    // Alternate the primary/secondary accents so pairs stay distinguishable.
    const color = i % 2 === 0 ? COLORS.blue : COLORS.chrome;
    doc.text(s.label, MARGIN_X, doc.y, { size: 8.8, color: COLORS.text });
    doc.rect(trackX, doc.y - 3, trackW, barH, COLORS.band);
    doc.rect(trackX, doc.y - 3, barW, barH, color);
    doc.textRight(`${s.sub ?? s.value}`, MARGIN_X + CONTENT_W, doc.y, {
      size: 8.8,
      bold: true,
      color: COLORS.blueDeep,
    });
    doc.y -= 24;
  });
  if (unit) {
    doc.text(unit, MARGIN_X, doc.y + 6, { size: 8, italic: true, color: COLORS.muted });
  }
  doc.y -= 8;
}

/* ---------------------------------------------------------------------------
   Brand mark
   ---------------------------------------------------------------------------
   A compact vector re-draw of the "THE PLUG / TVET" badge (public/logo.svg):
   blue over chrome with an amber seam, the wordmark split at the seam so it
   reads white on the blue half and blue on the chrome half, plus the chrome
   frame. Drawn with base-14 text so no font embedding is required.
--------------------------------------------------------------------------- */
function drawLogo(doc, x, y, w, h) {
  const blueW = w;
  const half = h / 2;
  // Blue (top) + chrome (bottom) halves.
  doc.rect(x, y + half, blueW, half, COLORS.blue);
  doc.rect(x, y, blueW, half, COLORS.chromeLight);
  // Amber seam glow.
  doc.rect(x, y + half - 1.6, blueW, 3.2, COLORS.amber);
  // Chrome frame.
  doc.strokeRect(x, y, w, h, COLORS.chromeLight, 1.4);

  const cx = x + w / 2;
  // "THE PLUG" sits in the blue half (white), "TVET" in the chrome half (blue).
  doc.textCenter('THE PLUG', cx, y + half + half * 0.30, {
    size: Math.min(h * 0.34, 26),
    bold: true,
    color: COLORS.white,
  });
  doc.textCenter('TVET', cx, y + half - half * 0.45, {
    size: Math.min(h * 0.50, 38),
    bold: true,
    color: COLORS.blueDeep,
  });
}

/* ---------------------------------------------------------------------------
   Running header / footer
--------------------------------------------------------------------------- */
function drawHeader(doc, pageIndex) {
  if (pageIndex === 0) return; // cover page has its own masthead
  doc.text('THE PLUG TVET', MARGIN_X, PAGE_H - 40, { size: 8.5, bold: true, color: COLORS.blueDeep });
  doc.textRight('Approved Projects & Infrastructure Pipeline', MARGIN_X + CONTENT_W, PAGE_H - 40, {
    size: 8.5,
    color: COLORS.muted,
  });
  doc.hline(MARGIN_X, PAGE_H - 47, CONTENT_W, COLORS.rule, 0.6);
}

function drawFooter(doc, pageIndex, pageCount) {
  // Brand strip: blue + chrome split to echo the badge.
  doc.rect(MARGIN_X, FOOTER_Y + 8, CONTENT_W * 0.62, 2, COLORS.blue);
  doc.rect(MARGIN_X + CONTENT_W * 0.62, FOOTER_Y + 8, CONTENT_W * 0.38, 2, COLORS.chromeLight);
  doc.text('www.plugtvet.com', MARGIN_X, FOOTER_Y, { size: 8, bold: true, color: COLORS.blueDeep });
  doc.textRight(`Page ${pageIndex + 1} of ${pageCount}`, MARGIN_X + CONTENT_W, FOOTER_Y, {
    size: 8,
    color: COLORS.muted,
  });
}

/* ---------------------------------------------------------------------------
   Cover page
--------------------------------------------------------------------------- */
function drawCover(doc) {
  // Deep slate backdrop for the whole cover.
  doc.rect(0, 0, PAGE_W, PAGE_H, COLORS.slate);

  // Logo, centred above the title, complementing the masthead.
  const logoW = 190;
  const logoH = 128;
  drawLogo(doc, (PAGE_W - logoW) / 2, PAGE_H - 250, logoW, logoH);

  doc.textCenter('THE PLUG TVET', PAGE_W / 2, PAGE_H - 92, { size: 15, bold: true, color: COLORS.offwhite });
  doc.textCenter('INDUSTRY INSIGHTS - DOWNLOADABLE RESEARCH BRIEF', PAGE_W / 2, PAGE_H - 112, {
    size: 8.5,
    color: COLORS.chromeLight,
  });

  // Category chip.
  const chipLabel = 'APPROVED PROJECTS & INFRASTRUCTURE PIPELINE';
  const chipW = textWidth(chipLabel, 8.5, true) + 26;
  doc.rect((PAGE_W - chipW) / 2, PAGE_H - 330, chipW, 22, COLORS.blue);
  doc.textCenter(chipLabel, PAGE_W / 2, PAGE_H - 324, { size: 8.5, bold: true, color: COLORS.white });

  // Title (large, wrapped).
  const titleLines = wrapWidth(
    'The Short-term Impact Of TEMCO\u2019s P2 Billion Hospital Project On The TVET Ecosystem',
    22,
    PAGE_W - 130,
    true
  );
  let ty = PAGE_H - 380;
  for (const line of titleLines) {
    doc.textCenter(line, PAGE_W / 2, ty, { size: 22, bold: true, color: COLORS.offwhite });
    ty -= 28;
  }

  // Amber accent rule under the title.
  doc.rect((PAGE_W - 90) / 2, ty + 6, 90, 3, COLORS.amber);

  // Meta line.
  doc.textCenter('September 2026  |  6 pages  |  Industry Insight - Approved Projects & Infrastructure', PAGE_W / 2, ty - 26, {
    size: 9.5,
    color: COLORS.chromeLight,
  });
  doc.textCenter('Audience: Graduates - Contractors - Suppliers - Skilled Tradesmen', PAGE_W / 2, ty - 44, {
    size: 9.5,
    color: COLORS.chromeLight,
  });

  // Footer strip on the cover.
  doc.rect(MARGIN_X, FOOTER_Y + 8, CONTENT_W, 2, COLORS.blue);
  doc.textCenter('www.plugtvet.com', PAGE_W / 2, FOOTER_Y, { size: 9, bold: true, color: COLORS.offwhite });

  doc.startPage();
}

/* ---------------------------------------------------------------------------
   Report body
--------------------------------------------------------------------------- */
function drawBody(doc) {
  // ---- Summary ------------------------------------------------------------
  eyebrow(doc, 'Summary');
  paragraph(
    doc,
    'The Opportunity With TEMCO Specialized General Hospital: a high-level report on the construction project of TEMCO Hospital. Project delivery timelines, the TVET skills to be engaged, contractor & supplier requisites and the ESG commitments of the construction project.'
  );

  callout(
    doc,
    'Key Points In This Brief',
    'Projected Construction Phases for TEMCO  -  Workforce Composition & Personnel Forecast  -  TVET Trades by Stage (labour allocation by construction phase)  -  Local Contractor & Supplier In-Country Value Share  -  ESG Commitments by Construction Phase.'
  );

  paragraph(doc, 'Project Proponent & Legal Entity: Murua Home (Pty) Ltd  -  CIPA Reg. Number BW00009159934.', {
    size: 9.5,
    color: COLORS.muted,
  });

  // ---- Key detail overview ------------------------------------------------
  heading(doc, 'Key Detail Overview');
  paragraph(
    doc,
    'A Specialized General Medical Hospital facility in Botswana offering the following services:'
  );
  [
    'First robotic surgical platform in Botswana',
    'Two-linac radiation oncology',
    'Complex & neuro-oncology neurosurgery',
    'Complex electrophysiology',
    'Advanced IVF & embryology',
    'PET/CT & nuclear medicine',
    'Structural-heart intervention',
    'Dialysis at scale',
  ].forEach((item) => bullet(doc, item));

  paragraph(
    doc,
    'Construction Groundbreaking - December 2026  |  Contractor Engagement - Q1 2027  |  Grand Opening for Operations - Q2 2029.',
    { bold: true }
  );

  // ---- Project at a glance ------------------------------------------------
  heading(doc, 'The Project At A Glance');
  table(
    doc,
    [
      { label: 'Figure', weight: 1.1 },
      { label: 'Value', weight: 2.6 },
    ],
    [
      ['Licensed beds', '130, of which 24 critical care - about 18%, against a usual norm near 10%'],
      ['Floor area', 'Approximately 18,000 m2'],
      ['National Priority Class', 'NDP 12 BETP project with delivery-readiness validation'],
      ['Site / Location', 'About 11 hectares, SSKIA Special Economic Zone'],
      ['Project cost', 'US$120 million hospital development'],
      ['SEZ Investor Licence', 'Granted 5 August 2026, ref. SEZA 1/13/2 VOL I (24), valid up to 50 years'],
      ['Pledged investment on the licence', 'P675 million, about US$51.2 million'],
      ['Development Schedule', '42 months - 12 design, 22 build, 8 commissioning'],
      ['Beds staffed at opening', 'About 90 of the 130; the rest follow as demand and recruitment allow'],
    ],
    { caption: 'Table 1 - TEMCO Specialized General Hospital project fundamentals.' }
  );

  // ---- Unique identifiers -------------------------------------------------
  heading(doc, 'Unique Identifiers For Project Feasibility');
  [
    "Botswana Investment Credit Rating - Moody's Baa1 and S&P BBB minus (October 2025)",
    'Strategic Positioning - Central geographic positioning within the SADC region',
    'Political Neutrality - Stable neighbourly relations, no history of coups nor asset expropriation',
    'SEZ Benefit - 5-10% tax rate compared to an approximate ~22% standard. Zero customs duty on qualifying imported medical equipment, free profit repatriation',
  ].forEach((item) => bullet(doc, item));

  eyebrow(doc, 'Foreign Technical Partners');
  ['Pansante Group', 'Pan-China Construction Group', 'Advance Medical Africa'].forEach((p) =>
    bullet(doc, p)
  );

  // ---- Construction phases ------------------------------------------------
  heading(doc, 'Core Construction Phases / Stages');
  paragraph(doc, 'Overlapping phases with indicative time periods for each phase.', {
    italic: true,
    color: COLORS.muted,
  });
  table(
    doc,
    [
      { label: 'Stage', weight: 1.4 },
      { label: 'Indicative period', weight: 0.9 },
      { label: 'Activities', weight: 2.6 },
    ],
    [
      ['Site establishment and earthworks', '2-3 months', 'Site camp, access, bulk earthworks, terracing, stormwater, service diversions'],
      ['Substructure and foundations', '3-4 months', 'Piling or raft as designed, ground beams, drainage below slab, and the radiotherapy bunkers'],
      ['Superstructure', '5-6 months', 'Frame, structural steel, floor slabs, roof, envelope'],
      ['Services first fix and envelope close', '5-6 months', 'Mechanical, electrical, medical gas, HVAC, fire, windows and cladding'],
      ['Fit-out, finishes and external works', '6-7 months', 'Partitions, ceilings, floors, clinical fit-out, roads, parking, landscaping'],
      ['Commissioning', '8 months & further', 'Testing, balancing, equipment installation, licensing and accreditation readiness'],
    ],
    { caption: 'Table 2 - Construction phases with indicative durations.' }
  );

  // ---- Quality control ----------------------------------------------------
  heading(doc, 'Quality Control Compliance');
  callout(
    doc,
    'Joint Commission International (JCI) Accreditation In-View',
    'Construction quality outcomes will be bound by high international standards of patient safety, clinical quality, and regulatory compliance.'
  );
  callout(
    doc,
    'Uncompromised Gold-Standard Radiation Safety',
    'Specific structural engineering foresight from day one of construction for 2.4 metre thick radiation shielding. Radiotherapy bunkers are poured early and at full planned scale to accommodate a 2-linac system, where one linear accelerator is installed at opening and the second is gated on demand - prioritising future-proofing, absolute safety, and long-term financial efficiency from day one.'
  );

  // ---- Workforce composition ---------------------------------------------
  heading(doc, 'Workforce Composition & Personnel Forecast');
  paragraph(doc, 'A skill composition of the workforce during construction by percentage.');
  barChart(
    doc,
    'Workforce composition by category',
    [
      { label: 'General labour / semi-skilled', value: 47.5, sub: '45-50%  (215-235)' },
      { label: 'Skilled trades', value: 37.5, sub: '35-40%  (165-190)' },
      { label: 'Professional / supervisory', value: 13.5, sub: '12-15%  (55-70)' },
    ],
    {
      max: 50,
      unit: 'Bars scaled to the upper bound of each band; peak headcount shown on the right.',
      caption: 'Chart 1 - Skill composition of the construction workforce.',
    }
  );

  paragraph(doc, 'Projected to create well over 470 jobs for the entire 22-month construction period as projected below.');
  table(
    doc,
    [
      { label: 'Figure', weight: 1.3 },
      { label: 'Value', weight: 0.8 },
      { label: 'Explication', weight: 2.6 },
    ],
    [
      ['Peak construction employment', '~ 445', 'The busiest single moment on site, not a total'],
      ['Positions created across the build', '> 470', 'Individuals who pass through the site over the programme'],
      ['Ramp to peak', '20 -> 115 -> 435', 'First fortnight, month two, month five'],
    ],
    { caption: 'Table 3 - Employment forecast across the build.' }
  );

  // ---- Labour allocation by phase ----------------------------------------
  heading(doc, 'Labour Allocation By Construction Phase');
  paragraph(doc, 'Skilled trades required for each phase of construction.');
  table(
    doc,
    [
      { label: 'Phase / stage', weight: 1.2 },
      { label: 'Skilled trade', weight: 3.4 },
    ],
    [
      ['Earthworks', 'Plant operators, excavator and grader drivers, truck drivers, surveyors, banksmen, general labour'],
      ['Substructure', 'Steel fixers, shutterhands and formwork carpenters, concrete hands, pump operators, drainlayers, waterproofers'],
      ['Superstructure', 'Structural steel erectors, welders, riggers, crane operators, bricklayers, scaffolders, roof sheeters'],
      ['Services first fix', 'Electricians, plumbers, HVAC and ducting installers, medical gas pipefitters, fire sprinkler fitters, data and low-voltage technicians'],
      ['Fit-out and finishes', 'Drywall partitioners, ceiling fixers, tilers, screeders, joiners, painters, glaziers, floor layers - welded vinyl in clinical areas'],
      ['External works', 'Roadworks crews, kerb layers, paviours, fencers, landscapers, signage installers'],
      ['Commissioning', 'Test and balance technicians, controls and building-management engineers, medical equipment installers, lift engineers'],
    ],
    { caption: 'Table 4 - TVET trades by construction phase.' }
  );

  callout(
    doc,
    'NB: Employment Structure',
    'Construction staff will NOT work directly for TEMCO during the fixed term of their work on site. Construction employment is fixed-term and tied to a package rather than permanent. Employees will be engaged by contractors assigned a package to carry out specific works on site.'
  );

  // ---- Foreign technical delivery partners -------------------------------
  heading(doc, 'Foreign Technical Delivery Partners');
  paragraph(
    doc,
    'For skill gaps & highly sensitive construction activities, Murua Homes (Pty) Ltd will engage key international partners to cover the following:'
  );
  table(
    doc,
    [
      { label: 'Partner', weight: 1.4 },
      { label: 'Role', weight: 3.2 },
    ],
    [
      ['Pansante Group', 'Engineering, development and hospital architecture, working alongside our own team with TEMCO in the lead'],
      ['Pan-China Construction Group', 'Construction delivery, jointly controlled by TEMCO and Pansante'],
      ['Advance Medical Africa', 'Clinical operations, protocols, staffing pipelines and training integration'],
    ],
    { caption: 'Table 5 - International technical delivery partners.' }
  );

  // ---- Local ICT delivery partner ----------------------------------------
  heading(doc, 'Local ICT Delivery Partner');
  paragraph(
    doc,
    'Orange Botswana is the preferred connectivity & ICT delivery partner for the digital healthcare ecosystem. Key services include connectivity & ICT (high-speed network infrastructure to support medical and industrial operations), digital health (secure data management, electronic health records and telemedicine capabilities), and smart infrastructure (digital payment integration and smart facility management).'
  );

  // ---- Local value share --------------------------------------------------
  heading(doc, 'Local Contractor & Supplier In-Country Value Share');
  paragraph(
    doc,
    'Localisation plans for the TEMCO construction project reveal that, for the building process, Batswana will be the majority participants, while sourcing specialist healthcare machinery will be obtained from international manufacturers.'
  );
  table(
    doc,
    [
      { label: 'Category', weight: 1.5 },
      { label: 'Expected local share', weight: 3.1 },
    ],
    [
      ['Labour, all categories', 'The large majority of roles go to Batswana.'],
      ['Civil and building works', 'Earthworks, concrete, brickwork, roads and finishes - the substantial majority expected to be Botswana-based'],
      ['Specialist medical systems and imported equipment', 'Necessarily low. The accelerators, the catheterisation laboratory and the imaging are manufactured abroad by a handful of firms worldwide.'],
    ],
    { caption: 'Table 6 - Expected in-country value share.' }
  );

  paragraph(doc, 'A preliminary breakdown of how likely local contractors are to get contracts.');
  table(
    doc,
    [
      { label: 'Package', weight: 1.6 },
      { label: 'Likelihood', weight: 1.0 },
      { label: 'Keynote', weight: 2.6 },
    ],
    [
      ['Earthworks and site services', 'Yes, strongly', 'Highly competitive local plant and crews.'],
      ['Civil and structural works', 'Yes', 'Main contract or substantial subpackages'],
      ['Finishes', 'Yes', 'Large labour content; clinical finishes need certification'],
      ['Structural steel', 'Partly', 'Fabrication may be imported; erection is local'],
      ['Mechanical and electrical', 'Partly', 'General work is local; medical gas and theatre HVAC need specialist certification'],
      ['Medical equipment supply', 'Unlikely', 'Global vendors. The local opportunity is installation, service and maintenance'],
    ],
    { caption: 'Table 7 - Contractor package award expectation.' }
  );

  // ---- Baseline eligibility ----------------------------------------------
  heading(doc, 'Contractor & Supplier Baseline Eligibility Requirements');
  table(
    doc,
    [
      { label: 'Requirement', weight: 1.3 },
      { label: 'Detail', weight: 2.9 },
    ],
    [
      ['PPADB registration', 'At the appropriate class for the package size'],
      ['Track record of comparable scale', 'Projects of similar value and complexity, 3 years minimum'],
      ['Health and safety', 'A documented record and a working system.'],
      ['Bonding and insurance', 'Capacity sized to the package'],
      ['Statutory compliance', 'Tax clearance and statutory filings in order'],
      ['Ability to carry payment terms', 'Vetting: financial liquidity, backing & capacity evaluation.'],
    ],
    { caption: 'Table 8 - Baseline eligibility requirements for contractors and suppliers.' }
  );

  callout(
    doc,
    'NB: Local Sourcing & Tender Channels',
    'Local suppliers to receive first priority across any section of construction (cement, aggregate, blocks and bricks, reinforcement, general steel, timber, and standard electrical and plumbing materials). Official communication channels for tender packages will be carried through the TEMCO website, customary public tender routes and platforms like THE PLUG TVET.'
  );

  // ---- ESG ----------------------------------------------------------------
  heading(doc, 'Environmental, Social and Governance (ESG) Commitments');
  paragraph(
    doc,
    'Granular clarity on ESG considerations by construction phase will be largely driven by capital partners. At a high level, the following metrics will be under close observation:'
  );
  table(
    doc,
    [
      { label: 'Stakeholder', weight: 1.1 },
      { label: 'Metric measured and reported', weight: 3.5 },
    ],
    [
      ['Workers', 'Lost-time injury rate, hours worked without incident, toolbox talks held, local employment by category, apprentices taken on, wages at or above sector norms'],
      ['Local community', 'Local procurement value, number of Botswana-based firms contracted, dust, noise and traffic management on the zone boundary, waste diverted from landfill'],
      ['Regulators', 'SEZA reporting obligations, environmental authorisation conditions, building control and health facility standards, radiation safety licensing for the bunkers, and the JCI accreditation pathway once operating'],
      ['Investors', 'Programme and budget against plan, and the governance reporting required by whichever development finance institution ends up in the structure, since those bodies impose their own environmental and social standards'],
    ],
    { caption: 'Table 9 - ESG metrics under observation by stakeholder.' }
  );

  // ---- End ----------------------------------------------------------------
  doc.y -= 6;
  doc.hline(MARGIN_X, doc.y, CONTENT_W, COLORS.blue, 1.2);
  doc.y -= 16;
  doc.textCenter('- End Of Report -', PAGE_W / 2, doc.y, { size: 10, italic: true, color: COLORS.muted });
}

/* ---------------------------------------------------------------------------
   PDF assembly (mirrors scripts/generate-placeholder-reports.mjs)
--------------------------------------------------------------------------- */
function buildPdf(pageStreams) {
  const objects = [];
  const pageCount = pageStreams.length;
  const contentObjStart = 7; // obj 1..6 = catalog..font; pages & contents follow

  // 1 Catalog, 2 Pages, 3..(2+pageCount) Page objs, then content streams, then 6 fonts.
  // We build a stable object map:
  //   1  Catalog
  //   2  Pages
  //   3..(2+N)          Page objects
  //   (3+N)..(2+2N)     Content streams
  //   last 6            Font resources
  const firstPageObj = 3;
  const firstContentObj = firstPageObj + pageCount;
  const firstFontObj = firstContentObj + pageCount;

  const fontObjs = [
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>', // FR
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>', // FB
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>', // FI
  ];
  const FR = firstFontObj;
  const FB = firstFontObj + 1;
  const FI = firstFontObj + 2;

  // Catalog + Pages.
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  const kids = pageStreams.map((_, i) => `${firstPageObj + i} 0 R`).join(' ');
  objects[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pageCount} >>`;

  // Page objects.
  pageStreams.forEach((_, i) => {
    const pageObj = firstPageObj + i;
    const contentObj = firstContentObj + i;
    objects[pageObj] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /FR ${FR} 0 R /FB ${FB} 0 R /FI ${FI} 0 R >> >> ` +
      `/Contents ${contentObj} 0 R >>`;
  });

  // Content streams.
  pageStreams.forEach((stream, i) => {
    const contentObj = firstContentObj + i;
    objects[contentObj] = `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}endstream`;
  });

  // Fonts.
  fontObjs.forEach((body, i) => {
    objects[firstFontObj + i] = body;
  });

  const totalObjects = firstFontObj + fontObjs.length - 1;

  // Serialise with a correct xref table.
  let pdf = '%PDF-1.4\n';
  const offsets = [];
  for (let id = 1; id <= totalObjects; id += 1) {
    offsets[id] = Buffer.byteLength(pdf, 'latin1');
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const startxref = Buffer.byteLength(pdf, 'latin1');
  const size = totalObjects + 1;
  pdf += `xref\n0 ${size}\n0000000000 65535 f \n`;
  for (let id = 1; id <= totalObjects; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

/* ---------------------------------------------------------------------------
   Run
--------------------------------------------------------------------------- */
const doc = new Document();
drawCover(doc); // writes the cover onto page 0, then starts page 1
drawBody(doc); // flows the report body across pages, keeping blocks whole

// Stamp the running header/footer onto every page after the cover.
const pageCount = doc.pages.length;
doc.pages.forEach((_, i) => {
  const savedY = doc.y;
  const savedOps = doc.ops;
  doc.ops = doc.pages[i];
  doc.y = 0;
  drawHeader(doc, i);
  drawFooter(doc, i, pageCount);
  doc.ops = savedOps;
  doc.y = savedY;
});

const streams = doc.pages.map((ops) => `${ops.join('\n')}\n`);

mkdirSync(outDir, { recursive: true });
writeFileSync(OUT_FILE, buildPdf(streams));

console.log('THE PLUG TVET - TEMCO report build');
console.log(`  output: ${OUT_FILE}`);
console.log(`  pages:  ${pageCount}`);
console.log(`  bytes:  ${Buffer.byteLength(buildPdf(streams), 'latin1')}`);


