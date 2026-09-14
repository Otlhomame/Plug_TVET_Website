/**
 * THE PLUG TVET - Next.js configuration
 * ---------------------------------------------------------------------------
 * CRUCIAL REQUIREMENT: `output: 'export'` compiles the whole project into flat,
 * 100% static HTML/CSS/JS assets inside `/out`. That folder can be dropped on
 * GitHub Pages, Netlify, Cloudflare Pages, S3 or any static host for free.
 *
 * GITHUB PAGES PROJECT SITES
 * --------------------------
 * A project site lives at `https://<user>.github.io/<repo>/`, so every asset
 * needs a `/repo` prefix. We read that prefix from `NEXT_PUBLIC_BASE_PATH`
 * so the same codebase works for:
 *   - local dev            -> basePath = ''            (empty, no prefix)
 *   - repo Pages site      -> basePath = '/Repo_Name'  (set by the workflow)
 *   - custom domain / user site -> basePath = ''       (set NEXT_PUBLIC_BASE_PATH='')
 * The CI workflow in `.github/workflows/deploy.yml` injects the correct value.
 */

/** The GitHub repository name - used as the default basePath for project pages. */
const repoName = 'Plug_TVET_Website';

/**
 * Resolve the asset prefix.
 * NOTE: We only set `basePath`. Next.js automatically prefixes `/_next/*`
 * assets with the same basePath, which is exactly what GitHub Pages expects.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ---- Static export (the whole point) ------------------------------------
  output: 'export',

  // Emit `/about/index.html` instead of `/about.html`. GitHub Pages serves
  // directory indexes cleanly and this avoids 404s on deep links.
  trailingSlash: true,

  // ---- Path handling -----------------------------------------------------
  basePath,
  assetPrefix: basePath || undefined,

  // ---- Images ------------------------------------------------------------
  // The default Image Optimization API needs a Node server; static export
  // therefore requires `unoptimized: true`.
  images: {
    unoptimized: true,
  },

  // ---- Build hygiene -----------------------------------------------------
  reactStrictMode: true,
  // Fail the CI build on type/lint errors so broken content never deploys.
  eslint: {
    ignoreDuringBuilds: false,
  },
  compiler: {
    // Strip `console.*` from production bundles (keeps a clean console).
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  // Expose the repo name to the client (used for the canonical site URL).
  env: {
    NEXT_PUBLIC_REPO_NAME: repoName,
  },
};

module.exports = nextConfig;