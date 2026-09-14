/**
 * THE PLUG TVET - Tailwind CSS design system
 * ---------------------------------------------------------------------------
 * Palette is derived from watchfire.io + Botswana national identity elements:
 *   slate      -> Deep Slate Blue.  Primary surfaces + background contrast.
 *   cyan/teal   -> High-Vis Cyan/Teal. Accents, CTAs, active states, data.
 *   offwhite    -> Crisp Off-White.  Primary typography on dark surfaces.
 * Fluid dark mode is the DEFAULT (see `darkMode: 'class'` + <html class="dark">).
 */

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
        // ---- High-Vis Cyan: primary action colour -------------------------
        cyan: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        // ---- Teal: secondary accent / data viz ---------------------------
        teal: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
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
        'glow-cyan': '0 0 0 1px rgba(34,211,238,0.35), 0 18px 50px -18px rgba(34,211,238,0.45)',
        'glow-teal': '0 0 0 1px rgba(45,212,191,0.35), 0 18px 50px -18px rgba(20,184,166,0.45)',
        lift: '0 32px 80px -40px rgba(4,10,25,0.95)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(to right, rgba(148,178,215,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,178,215,0.07) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(34,211,238,0.20) 0%, rgba(20,184,166,0.10) 40%, transparent 75%)',
        'brand-sheen':
          'linear-gradient(120deg, #22D3EE 0%, #2DD4BF 45%, #A5F3FC 100%)',
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