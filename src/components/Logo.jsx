/**
 * <Logo /> - THE PLUG TVET identity
 * ---------------------------------------------------------------------------
 * Placeholder-safe SVG mark: the two-tone "THE PLUG / TVET" badge, drawn
 * inline so it stays crisp at any size and inherits the brand gradients
 * without an extra network request. A standalone copy also lives at
 * `public/logo.svg` for use in emails, decks and social profiles.
 *
 * NOTE ON GEOMETRY: this replaces the earlier abstract plug-node icon
 * (square 48x48 canvas, pins/hub/branches/nodes). The new brand mark is a
 * two-line "THE PLUG / TVET" badge, so it uses its own 400x300 design canvas
 * instead of the old square one - the two artworks don't share a shape
 * vocabulary, so there are no pins/hub/branch coordinates to carry over.
 * What *is* preserved from the old file: the inline-vs-standalone contract
 * (this copy stays transparent; `public/logo.svg` keeps its own full-bleed
 * background), the component's props/exports, and the gradient-id pattern
 * below (fixed ids at module scope, same as the old GRADIENT_ID/GLOW_ID).
 *
 * WHY 400x300: the badge was briefly 400x190 (2.11:1, a thin letterbox that
 * left the wordmark small on the plate). "THE PLUG" is the width-limiting
 * word, so the canvas WIDTH is fixed at 400 and the HEIGHT is the only free
 * lever - raising it is what squares the badge up. 1.33:1 was chosen over a
 * literal 1:1 because a square plate needs the two lines pushed far apart
 * (large leading), which shrinks the type until it is only ~31% of the plate
 * height; at 1.33:1 the words stay big (~70% of the plate) AND the badge is
 * 37% squarer than the old 2.11:1 lockup.
 *
 * The two bands are now exactly equal (147 + 147), and the type is set at its
 * natural Arial Black width (horizontal stretch 1.001x - previously 1.237x,
 * i.e. the old textLength stretched "THE PLUG" by 24%). Keep
 * font-size * 5.5591 = textLength for "THE PLUG" and font-size * 2.8945 =
 * textLength for "TVET", or the glyphs skew again (measured Arial Black ink
 * widths, see also the same numbers in public/logo.svg).
 *
 * The type tightly fills the height, so changing the canvas means moving the
 * baselines. Centre each word's cap box in its own band, then raise both by 3
 * to compensate for the descender space that neither word uses:
 *   THE PLUG  y = 3 + blueH/2 + 0.7158*fontSize/2 - 3              (96 here)
 *   TVET      y = 3 + blueH + silverH/2 + 0.7158*fontSize/2 - 3    (256 here)
 * where 0.7158 is Arial Black's cap height per em and the -3 is the optical
 * raise. Without it the baseline sits visually low, because a word with no
 * descenders leaves the gap under it looking bigger than the gap above.
 */

import Link from 'next/link';

/** Unique gradient/clip ids so multiple <Logo /> instances never clash. */
const BLUE_ID = 'plug-tvet-blue';
const SILVER_ID = 'plug-tvet-silver';
const SEAM_ID = 'plug-tvet-seam';
const BORDER_ID = 'plug-tvet-border';
const TEXT_WHITE_ID = 'plug-tvet-text-white';
const TEXT_BLUE_ID = 'plug-tvet-text-blue';
const CLIP_ID = 'plug-tvet-clip';

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
        viewBox="0 0 400 300"
        role="img"
        aria-label="THE PLUG TVET logo"
        className="h-[2.75rem] w-auto shrink-0 drop-shadow-[0_6px_18px_rgba(28,123,238,0.35)] sm:h-[3.25rem]"
      >
        <defs>
          <linearGradient id={BLUE_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#17B8FF" />
            <stop offset="45%" stopColor="#1C7BEE" />
            <stop offset="100%" stopColor="#1B3FB0" />
          </linearGradient>
          <linearGradient id={SILVER_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="18%" stopColor="#F1F3F4" />
            <stop offset="40%" stopColor="#D2D6D8" />
            <stop offset="60%" stopColor="#E9EBEC" />
            <stop offset="80%" stopColor="#C7CBCD" />
            <stop offset="100%" stopColor="#F6F7F7" />
          </linearGradient>
          <linearGradient id={SEAM_ID} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFC876" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFC876" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFC876" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={BORDER_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#9AA7B4" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id={TEXT_WHITE_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D6DEE6" />
          </linearGradient>
          <linearGradient id={TEXT_BLUE_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E86F5" />
            <stop offset="100%" stopColor="#0B3EA6" />
          </linearGradient>
          <clipPath id={CLIP_ID}>
            <rect x="3" y="3" width="394" height="294" rx="30" />
          </clipPath>
        </defs>

        {/* Outer dark edge line */}
        <rect x="1" y="1" width="398" height="298" rx="31" fill="none" stroke="#0B1220" strokeWidth="2" opacity="0.55" />

        {/* Two-tone badge fill, clipped to the rounded outline */}
        <g clipPath={`url(#${CLIP_ID})`}>
          <rect x="3" y="3" width="394" height="147" fill={`url(#${BLUE_ID})`} />
          <rect x="3" y="150" width="394" height="147" fill={`url(#${SILVER_ID})`} />
          <rect x="3" y="146" width="394" height="8" fill={`url(#${SEAM_ID})`} />
        </g>

        {/* Chrome frame */}
        <rect x="3" y="3" width="394" height="294" rx="30" fill="none" stroke={`url(#${BORDER_ID})`} strokeWidth="3.5" />

        {/* Wordmark */}
        <text
          x="200"
          y="96"
          textAnchor="middle"
          fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
          fontWeight="900"
          fontSize="64"
          fill={`url(#${TEXT_WHITE_ID})`}
          textLength="356"
          lengthAdjust="spacingAndGlyphs"
        >
          THE PLUG
        </text>
        <text
          x="200"
          y="256"
          textAnchor="middle"
          fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
          fontWeight="900"
          fontSize="100"
          fill={`url(#${TEXT_BLUE_ID})`}
          textLength="290"
          lengthAdjust="spacingAndGlyphs"
        >
          TVET
        </text>
      </svg>

      {/* ---- Sub-label ---------------------------------------------------- */}
      {!compact && (
        <span className="mt-1 whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.3em] text-slate-300/75">
          TVET Hub · Botswana
        </span>
      )}
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
