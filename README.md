# THE PLUG TVET — Website

> **Connecting Botswana to TVET Opportunities.**
> Botswana's Technical and Vocational Education and Training (TVET) information
> hub and boutique consultancy.

A production-ready, **100% statically exported** Next.js + Tailwind CSS website.
`next build` compiles the entire project into flat HTML/CSS/JS in `/out`, which
hosts **completely free** on GitHub Pages, Netlify, Cloudflare Pages, S3 or any
static host.

---

## Feature summary

| Area | What is included |
| --- | --- |
| **Home** | watchfire-style premium hero, live traction marquee, dynamic bento stats grid (62K+ Facebook, 6K+ TikTok), Inform/Guide/Connect pillars, offerings preview, featured reports, rapid-read news, Substack CTA panel, contact band |
| **About** | Mission (*Empowering Skills. Building Futures.*), ecosystem-gap analysis, milestone timeline, strategic goals, operating principles |
| **Services** | Interactive 4-column bento grid (Courses & Career Guidance, Applications & Opportunities, Skills & Training Information, Student & Graduate Stories) with all four panels expanded by default and collapse-on-tap, boutique consultancy mandates, 4-step engagement model, six audience segments |
| **Industry Insights** | Dedicated repository page with **layout filtering across the five industrial dimensions**, free-text search, featured shelf, downloadable PDFs from `/public/reports/` |
| **TVET News** | Polished blog grid of 4–5 minute rapid reads with category filtering, per-post article pages, table of contents, NewsArticle + Breadcrumb JSON-LD |
| **Contact** | Validated enquiry form (name, email, query type: Student / Employer / Stakeholder), office details, response promise, FAQ |
| **Design** | Fluid dark mode by default, deep slate blue + Plug Blue / Plug Chrome accents sampled from the logo + crisp off-white, glassmorphism, custom scrollbar tracks, mobile-first responsive |
| **Motion** | Framer Motion scroll-driven entrances, page-transition fades, hover scales on report download buttons, animated filters |
| **SEO** | Metadata templates, canonical URLs, OpenGraph/Twitter cards, `robots.txt`, static `sitemap.xml`, EducationalOrganization/WebSite/NewsArticle/BreadcrumbList structured data |
| **CI/CD** | `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push |

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Generate the placeholder report PDFs (already committed, safe to re-run)
npm run reports:scaffold

# 3. Run the dev server
npm run dev            # http://localhost:3000
```

### Production build

```bash
npm run build          # emits the static site into ./out
npm run preview        # serves ./out on :4000 to verify the real export
```

`out/` is a complete static website — no Node server is required at runtime.

---

## Project structure

```
.
├── .github/workflows/deploy.yml      # CI/CD: build + deploy to GitHub Pages
├── next.config.js                    # output: 'export' + basePath handling
├── tailwind.config.js                # brand palette, fonts, animations
├── scripts/
│   ├── generate-placeholder-reports.mjs   # scaffolds every declared report PDF
│   ├── verify-export.mjs                  # inspects ./out after a build
│   └── spot-check.mjs                     # asserts production copy in ./out
├── docs/                             # maintainer docs - NOT served publicly
│   └── reports.md                    # how to publish a report PDF (was public/reports/README.md)
├── public/                           # copied verbatim into the live export - keep PDFs/art only
│   ├── .nojekyll                     # tells GitHub Pages to skip Jekyll
│   ├── favicon.svg / logo.svg        # brand marks
│   ├── robots.txt / sitemap.xml      # SEO (hand-maintained static files)
│   └── reports/                      # ← DROP NEW PDF REPORTS HERE (PDFs only, no .md)
└── src/
    ├── app/                          # App Router pages
    │   ├── layout.jsx                # shell, fonts, metadata, JSON-LD
    │   ├── template.jsx              # route-change fade (Framer Motion)
    │   ├── page.jsx                  # Home
    │   ├── about/page.jsx
    │   ├── services/page.jsx
    │   ├── insights/page.jsx         # report repository
    │   ├── news/page.jsx             # blog index
    │   ├── news/[slug]/page.jsx      # statically generated post pages
    │   ├── contact/page.jsx
    │   ├── not-found.jsx             # serves out/404.html
    │   └── globals.css               # design system + custom scrollbars
    ├── components/                   # all UI (Hero, bento grids, cards, forms)
    ├── data/                         # ← ALL CONTENT LIVES HERE
    └── lib/                          # motion variants + SEO schema builders
```

---

## Editing content (no component surgery required)

Everything editorial is data-driven:

| File | Controls |
| --- | --- |
| `src/data/site.js` | Brand name, tagline, founding date (`founded` + machine-readable `foundedISO`), **contact details**, socials, **Substack URL**, navigation |
| `src/data/stats.js` | Traction metrics, the three pillars, ecosystem challenges, goals, milestones |
| `src/data/services.js` | The four offerings, engagement steps, consultancy mandates |
| `src/data/reports.js` | The five industrial dimensions + every downloadable report |
| `src/data/news.js` | TVET News posts (structured body blocks) and Substack deep links |

### Publishing a report

1. Save the PDF to `public/reports/<slug>.pdf`.
2. Add an object to the `reports` array in `src/data/reports.js`.
3. Commit and push — the grid, filters, counters, search index and sitemap all
   update from that single entry.

See `docs/reports.md` for the full field reference. (This maintainer doc lives in
`docs/`, OUTSIDE `public/`, because Next.js copies everything in `public/` verbatim
into the live static export.)

### Publishing a news post

1. Add an object to `newsPosts` in `src/data/news.js` (copy an existing post).
2. Set `subSlug` to the matching Substack post path — this powers the global
   **Deeper Analysis** anchor that appears in every post.
3. Add the new URL to `public/sitemap.xml`.

The post page, blog card, category filter and `generateStaticParams` entry are
all generated automatically.

---

## The Substack hand-off (*Deeper Analysis*)

`src/components/DeeperAnalysis.jsx` is the global long-form anchor. It renders:

- as a **bar** inside the article body,
- as a **full panel** under every post,
- as a **rail card** in the post sidebar,
- and as a text link on every news card in the grid.

All of them resolve through `siteConfig.substack.postUrl(subSlug)`, so changing
the publication URL in `src/data/site.js` updates every link on the site at once.

---

## Deploying to GitHub Pages

1. Push this repository to GitHub (branch `main`).
2. Go to **Settings → Pages** and set **Source = "GitHub Actions"**.
3. Push any change — the workflow installs dependencies, runs the static export
   and publishes `out/` live.

### basePath behaviour

`next.config.js` reads `NEXT_PUBLIC_BASE_PATH`:

| Scenario | Value |
| --- | --- |
| Local dev | *(unset → no prefix)* |
| Project site `user.github.io/Plug_TVET_Website` | `/Plug_TVET_Website` (injected automatically by `actions/configure-pages`) |
| User site or custom domain | *(empty)* |

Asset and PDF links go through `asset()` in `src/data/site.js`, so downloads keep
working under a project-site prefix.

To publish on a custom domain, set these in the workflow env (or a
`.env.production` file):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BASE_PATH=
```

…then update the host in `public/sitemap.xml` and `public/robots.txt`.

---

## Notes for maintainers

- **Contact form:** the site is static, so the form validates client-side and
  then hands off to the visitor's mail client via a prefilled `mailto:` link
  (with WhatsApp as a second channel). Nothing is posted to a server. To wire a
  real backend later, point the submit handler at Formspree/Getform or an API
  route on a different host.
- **Report count in the copy** is derived from `publishedReports.length`, so it
  never drifts when you add or remove a PDF.
- **`npm run reports:scaffold` never overwrites** an existing PDF unless you pass
  `-- --force`, so uploading the real document over a placeholder is safe.
- **Verify a build** with `npm run verify` (build + `verify-export.mjs` +
  `spot-check.mjs`). They assert every page, PDF and runtime asset is present in
  `out/` and that the production copy still renders.
- **Adding a new page** means: create `src/app/<route>/page.jsx`, export
  `metadata`, and add the route to `src/data/site.js` (`navLinks`) plus
  `public/sitemap.xml`.

---

## Tech stack

- **Next.js 13.5** (App Router) with `output: 'export'`
- **React 18**
- **Tailwind CSS 3.4** with a bespoke brand design system
- **Framer Motion 11** for scroll-driven motion
- **Inter** + **JetBrains Mono** via `next/font` (self-hosted, no layout shift)
- **Zero runtime UI dependencies** — all icons are inline SVG components

### Brand palette

The accent pair is sampled straight from the brand mark, so the site chrome and
the artwork share one visual language.

| Token | Role | Where it comes from in the logo |
| --- | --- | --- |
| `brand` — **Plug Blue** | Primary actions, active states, data, focus rings | blue band of the badge. `brand-500` is the mark's own `#1C7BEE` mid stop; the sheen reuses the mark's `#1CC0FF` (favicon) / `#2E86F5` (logo text gradient) |
| `steel` — **Plug Chrome** | Secondary accent, data viz | silver half + chrome frame. Derived from the mark's silver `#9AA7B4` and frame greys `#C7CBCD`–`#F6F7F7` (`steel-200` → `steel-700`) |
| `slate` | Surfaces, borders, muted text | deep slate blue (`#050912` plate of the mark) |
| `offwhite` / `ink` | Typography, page base | crisp off-white, near-black |

The mark also carries a warm amber highlight (`#FFC876`) along the band seam.
It is deliberately **not** wired into the UI: keeping the accent pair to blue +
chrome means one visual language, and a third hue would compete with the artwork.

`cyan` and `teal` are kept as **legacy aliases** bound by reference to
`brand` / `steel` in `tailwind.config.js`, so older markup such as
`text-cyan-300` or `shadow-glow-teal` renders on-brand without a rename.
The steps that carry ink-on-accent text (`brand-400` 6.9:1 and `steel-400`
8.0:1 against `slate-950`) are annotated in the config — keep them light if you
ever retune the ramps.

> Node **18.12+** is required (Next.js 13.5 line). The CI workflow uses Node 20.

---

## Licence

© THE PLUG TVET. All rights reserved. Content, research and branding are the
property of THE PLUG TVET.
