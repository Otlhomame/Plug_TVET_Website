/**
 * <Logo /> - THE PLUG TVET identity
 * ---------------------------------------------------------------------------
 * Placeholder-safe SVG mark: a plug node (two live pins feeding a hub) that
 * branches into a three-point network - literally "plug" + "TVET network".
 * Built inline so it stays crisp at any size and inherits the brand gradient
 * without an extra network request. A standalone copy also lives at
 * `public/logo.svg` for use in emails, decks and social profiles.
 */

import Link from 'next/link';

/** Unique gradient ids so multiple <Logo /> instances never clash. */
const GRADIENT_ID = 'plug-tvet-gradient';
const GLOW_ID = 'plug-tvet-glow';

/**
 * @param {object}  props
 * @param {boolean} props.compact  hide the sub-label (used in tight layouts)
 * @param {string}  props.className wrapper classes
 * @param {boolean} props.linked   wrap the logo in a link to "/"
 */
export default function Logo({ compact = false, className = '', linked = true, ...rest }) {
  const mark = (
    <span className={['flex items-center gap-3', className].join(' ')} {...rest}>
      {/* ---- Mark ------------------------------------------------------- */}
      <svg
        viewBox="0 0 48 48"
        role="img"
        aria-label="THE PLUG TVET logo"
        className="h-10 w-10 shrink-0 drop-shadow-[0_6px_18px_rgba(34,211,238,0.35)] sm:h-11 sm:w-11"
      >
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="55%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#A5F3FC" />
          </linearGradient>
          <radialGradient id={GLOW_ID} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.28)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* Glow bed */}
        <circle cx="24" cy="24" r="22" fill={`url(#${GLOW_ID})`} />

        {/* Outer node frame */}
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="14"
          fill="rgba(10,17,34,0.72)"
          stroke={`url(#${GRADIENT_ID})`}
          strokeWidth="1.4"
        />

        {/* Plug pins */}
        <path
          d="M19 7.5v6M29 7.5v6"
          stroke={`url(#${GRADIENT_ID})`}
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Plughub */}
        <rect
          x="13"
          y="13.5"
          width="22"
          height="10.5"
          rx="5"
          fill="rgba(34,211,238,0.12)"
          stroke={`url(#${GRADIENT_ID})`}
          strokeWidth="1.6"
        />
        <circle cx="24" cy="18.75" r="2.1" fill="#A5F3FC" />

        {/* Network branches */}
        <path
          d="M24 24v4.5M24 28.5 14.8 33.6M24 28.5l9.2 5.1"
          stroke={`url(#${GRADIENT_ID})`}
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        {/* Network nodes */}
        <circle cx="14.8" cy="36.2" r="2.9" fill="#2DD4BF" />
        <circle cx="33.2" cy="36.2" r="2.9" fill="#22D3EE" />
        <circle cx="24" cy="36.2" r="2.4" fill="#A5F3FC" />
      </svg>

      {/* ---- Wordmark --------------------------------------------------- */}
      <span className="flex min-w-0 flex-col leading-none">
        <span className="whitespace-nowrap text-[1.02rem] font-semibold tracking-tightest text-offwhite sm:text-[1.12rem]">
          THE PLUG <span className="text-gradient">TVET</span>
        </span>
        {!compact && (
          <span className="mt-1 whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.3em] text-slate-300/75">
            TVET Hub · Botswana
          </span>
        )}
      </span>
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href="/"
      aria-label="THE PLUG TVET - go to homepage"
      className="group rounded-2xl transition-opacity duration-300 hover:opacity-90"
    >
      {mark}
    </Link>
  );
}