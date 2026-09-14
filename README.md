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
| **Services** | Interactive 4-column bento grid (Courses & Career Guidance, Applications & Opportunities, Skills & Training Information, Student & Graduate Stories), boutique consultancy mandates, 4-step engagement model, six audience segments |
| **Industry Insights** | Dedicated repository page with **layout filtering across the five industrial dimensions**, free-text search, featured shelf, downloadable PDFs from `/public/reports/` |
| **TVET News** | Polished blog grid of 4–5 minute rapid reads with category filtering, per-post article pages, table of contents, NewsArticle + Breadcrumb JSON-LD |
| **Contact** | Validated enquiry form (name, email, query type: Student / Employer / Stakeholder), office details, response promise, FAQ |
| **Design** | Fluid dark mode by default, deep slate blue + high-vis cyan/teal + crisp off-white, glassmorphism, custom scrollbar tracks, mobile-first responsive |
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
│   └── generate-placeholder-reports.mjs   # scaffolds every declared report PDF
├── public/
│   ├── .nojekyll                     # tells GitHub Pages to skip Jekyll
│   ├── favicon.svg / logo.svg        # brand marks
│   ├── robots.txt / sitemap.xml      # SEO (hand-maintained static files)
│   └── reports/                      # ← DROP NEW PDF REPORTS HERE
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
| `src/data/site.js` | Brand name, tagline, **contact details**, socials, **Substack URL**, navigation |
| `src/data/stats.js` | Traction metrics, the three pillars, ecosystem challenges, goals, milestones |
| `src/data/services.js` | The four offerings, engagement steps, consultancy mandates |
| `src/data/reports.js` | The five industrial dimensions + every downloadable report |
| `src/data/news.js` | TVET News posts (structured body blocks) and Substack deep links |

### Publishing a report

1. Save the PDF to `public/reports/<slug>.pdf`.
2. Add an object to the `reports` array in `src/data/reports.js`.
3. Commit and push — the grid, filters, counters, search index and sitemap all
   update from that single entry.

See `public/reports/README.md` for the full field reference.

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

> Node **18.12+** is required (Next.js 13.5 line). The CI workflow uses Node 20.

---

## Licence

© THE PLUG TVET. All rights reserved. Content, research and branding are the
property of THE PLUG TVET.
