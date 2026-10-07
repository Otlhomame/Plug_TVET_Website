/**
 * THE PLUG TVET - Tailwind CSS design system
 * ---------------------------------------------------------------------------
 * Palette is sampled straight from the brand mark (public/logo.svg + the
 * inline <Logo /> badge) so the site chrome and the artwork speak ONE visual
 * language - see the `brand` / `steel` ramps below.
 *   slate      -> Deep Slate Blue.  Primary surfaces + background contrast.
 *   brand      -> Plug Blue.  The blue half of the badge (#1CC0FF - #1C7BEE
 *                 - #123FAE). CTAs, active states, data, focus rings.
 *   steel      -> Plug Chrome.  The silver half + chrome frame of the badge.
 *                 Secondary accent / data viz.
 *   offwhite    -> Crisp Off-White.  Primary typography on dark surfaces.
 *
 * LEGACY ALIASES: the site previously ran a cyan/teal accent pair, so `cyan`
 * and `teal` are still valid keys - they are bound by reference to `brand` /
 * `steel` (an alias, never a second palette). Existing `*-cyan-*` / `*-teal-*`
 * classes therefore render on-brand without touching a single page.
 *
 * Fluid dark mode is the DEFAULT (see `darkMode: 'class'` + <html class="dark">).
 */

/**
 * Plug Blue - the primary accent ramp, sampled from the blue half of the brand
 * mark (public/logo.svg / <Logo />). 500 is the exact mid stop of the badge
 * gradient; 400 is kept light enough (6.9:1 on slate-950) for ink-on-accent
 * uses such as `.btn-primary`, the skip link and the report CTA buttons.
 */
const brand = {
  50: '#EFF7FF',
  100: '#DAEBFF',
  200: '#B6D8FF',
  300: '#82BDFF',
  400: '#3B9BFF',
  500: '#1C7BEE', // exact mid stop of the badge's blue gradient
  600: '#1560C8',
  700: '#114A9C',
  800: '#0E3B7C',
  900: '#0C2F63',
};

/**
 * Plug Chrome - the secondary accent ramp, sampled from the silver half of the
 * badge plus its chrome frame. Cool, desaturated and lighter than Plug Blue so
 * the two accents stay distinguishable as a primary/secondary pair. 400 is
 * 8.0:1 on slate-950, so it also carries ink-on-accent text safely.
 */
const steel = {
  200: '#CFE1F5',
  300: '#A9C6E8',
  400: '#7FA6D4',
  500: '#5C82B0',
  600: '#46648E',
  700: '#35506F',
};

/** Plug Blue focus/hover glow - shared by `glow-brand` and legacy `glow-cyan`. */
const glowBrand = '0 0 0 1px rgba(59,155,255,0.40), 0 18px 50px -18px rgba(28,123,238,0.55)';

/** Plug Chrome glow - shared by `glow-steel` and legacy `glow-teal`. */
const glowSteel = '0 0 0 1px rgba(127,166,212,0.40), 0 18px 50px -18px rgba(92,130,176,0.50)';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/data/**/*.{js,jsx,mdx}',
    './src/lib/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ---- Deep Slate Blue: background contrast scale -------------------
        slate: {
          950: '#050912',
          900: '#0A1122',
          850: '#0D1529',
          800: '#111C34',
          700: '#17253F',
          600: '#1F3050',
          500: '#2B4066',
          400: '#41597F',
          300: '#6B82A6',
          200: '#A3B4CC',
          100: '#D3DDEB',
        },
        // ---- Plug Blue / Plug Chrome: the single brand accent pair --------
        brand,
        steel,
        // ---- Legacy aliases - bound to the ramps above by reference, so the
        //      old `cyan`/`teal` keys can never drift into a second palette.
        cyan: brand,
        teal: steel,
        // ---- Crisp Off-White: typography ---------------------------------
        offwhite: '#F5F8FC',
        ink: '#050912',
      },
      fontFamily: {
        // Bound to the next/font CSS variables declared in app/layout.jsx
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        // Ultra-modern, tight headers (premium tech-forward infrastructure feel)
        tighter: '-0.035em',
        tightest: '-0.05em',
      },
      fontSize: {
        '7.5xl': ['5.25rem', { lineHeight: '1', letterSpacing: '-0.045em' }],
      },
      maxWidth: {
        '8xl': '90rem',
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        glass: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 60px -30px rgba(0,0,0,0.85)',
        // `*-brand` / `*-steel` are the canonical names; the old `*-cyan` /
        // `*-teal` keys remain valid aliases pointing at the same values.
        'glow-brand': glowBrand,
        'glow-cyan': glowBrand,
        'glow-steel': glowSteel,
        'glow-teal': glowSteel,
        lift: '0 32px 80px -40px rgba(4,10,25,0.95)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(to right, rgba(148,178,215,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,178,215,0.07) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(59,155,255,0.20) 0%, rgba(28,123,238,0.10) 40%, transparent 75%)',
        // Plug Blue sweep. Every stop is deliberately light-to-mid: this one
        // token paints dark-ink CTAs (.btn-primary -> text-slate-950) as well
        // as clipped headline text (.text-gradient), so it must never go navy.
        'brand-sheen':
          'linear-gradient(120deg, #1CC0FF 0%, #2E86F5 45%, #A9D6FF 100%)',
      },
      backgroundSize: {
        grid: '64px 64px',
        'grid-sm': '32px 32px',
      },
      keyframes: {
        // Slow aurora movement for hero backdrops
        aurora: {
          '0%, 100%': { transform: 'translate3d(-6%, -4%, 0) scale(1.05)' },
          '50%': { transform: 'translate3d(6%, 4%, 0) scale(1.15)' },
        },
        // Gentle floating for decorative nodes
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Infinite ticker used by the "social traction" strip
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Pulsing live-dot indicator
        pulseRing: {
          '0%': { transform: 'scale(0.85)', opacity: '0.85' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        aurora: 'aurora 22s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.6s linear infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

module.exports = config;