# Report library - maintainer guide (`docs/reports.md`)

> **Why this file lives in `docs/`, not in `public/reports/`:**
> Next.js copies everything inside `public/` verbatim into the static export
> (`out/`), which is published to the live site on GitHub Pages. Keeping this
> internal publishing workflow here means it is **never** served at
> `https://www.plugtvet.com/reports/README.md`. Only the PDFs belong in
> `public/reports/`.

The PDFs in `public/reports/` are published **as-is** to the live site at:

```
https://<your-domain>/reports/<file-name>.pdf
```

The `/insights` page links to these files through the basePath-aware `asset()`
helper (`src/data/site.js`), so downloads keep working on GitHub Pages project
sites such as `https://user.github.io/Plug_TVET_Website/`.

---

## Publishing a new report

1. **Add the PDF here**, naming it to match the report `slug`, e.g.

   ```
   public/reports/digital-trades-skills-gap-review.pdf
   ```

2. **Register it in the data layer** - add one object to the `reports` array in
   `src/data/reports.js`:

   ```js
   {
     id: 'r-skills-02',
     slug: 'digital-trades-skills-gap-review',   // must match the file name
     dimensionId: 'skills',                      // one of the five dimensions
     title: 'Digital Trades and the Skills Gap',
     date: '2026-09-01',
     displayDate: 'September 2026',
     pages: 24,
     size: '1.7 MB',
     featured: true,                             // optional: hero shelf
     summary: '...',
     highlights: ['...', '...', '...'],
     tags: ['Digital', 'Skills'],
     audience: 'Employers · Educators · Students',
   }
   ```

   If you need a different file name, set `file: '/reports/whatever.pdf'`
   explicitly on that object - `reportFile()` will honour it.

3. **Commit and push.** GitHub Actions rebuilds the static export and deploys
   it. The new report appears in the grid, the dimension counters, the search
   index and the sitemap without any further code changes.

---

## Placeholder files

This repository ships a **generated placeholder PDF** for every declared report
so that no download link ever 404s. Each placeholder is clearly marked and is
safe to overwrite with the final document (keep the same file name).

Regenerate them at any time:

```bash
npm run reports:scaffold            # creates only missing files
npm run reports:scaffold -- --force # overwrites everything
```

The generator lives at `scripts/generate-placeholder-reports.mjs` and reads the
report list directly from `src/data/reports.js`.

---

## File naming conventions

| Rule            | Example                                  |
| --------------- | ---------------------------------------- |
| Lowercase       | `scarce-critical-skills-inventory.pdf`   |
| Hyphenated      | `digital-trades-skills-gap-review.pdf`   |
| No year suffix  | unless the report is annual              |
| Keep under 4 MB | compress scans before committing         |
