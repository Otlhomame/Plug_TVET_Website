# Security Policy

## Reporting a vulnerability

Please report suspected vulnerabilities privately to
**theplugtvet@gmail.com**. Do not open a public issue for a security problem.

We aim to acknowledge reports within 5 working days and to publish a fix as
soon as is practical.

Please include:

- the affected URL or file,
- steps to reproduce,
- the impact you believe it has,
- and any proof-of-concept you are comfortable sharing.

## Scope

`www.plugtvet.com` is a **100% static site**. There is no server, no database,
no user accounts and no server-side request handling. The only dynamic element
is the contact form, which hands off to a third-party form endpoint from the
browser.

The deployed surface therefore consists solely of the files produced by
`next build` (`output: 'export'`) into `/out`. This means the highest-risk
class of bug is **information disclosure** — internal documents, QA logs or
configuration accidentally shipped inside the `public/` directory, which
GitHub Pages copies verbatim into the published site.

## Publishing rules (contributors)

Everything under `public/` is **world-readable once deployed** at
`https://www.plugtvet.com/<file>`. Therefore:

- Do **not** place notes, drafts, runbooks or QA output in `public/`.
  Internal documentation belongs in `docs/`, which is never published.
- Only public PDF deliverables belong in `public/reports/`.
- Never commit secrets, API keys or `.env` files. There are no secrets in the
  build; the site is fully static.

### Automated enforcement

`scripts/verify-export.mjs` runs inside the deploy workflow, *before* the Pages
artifact is uploaded. It fails the build (non-zero exit) if:

- `out/index.html` is missing (the landing page the custom domain serves),
- `out/.nojekyll` is missing,
- any `.md`, `.markdown`, `.log`, `.bak`, `.orig`, `.swp`, `.tmp` or
  `.stackdump` file, or any unexpected `.txt` file, is about to be published.
  (`index.txt` — Next.js RSC payload — and `robots.txt` are the only
  permitted `.txt` files.)

It also warns on a non-empty `.nojekyll` and on canonical URLs that still point
at a GitHub Pages host instead of the production domain.

## Supported versions

Only the currently deployed build (the latest commit on `main`) is supported.
