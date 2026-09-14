/**
 * THE PLUG TVET - inline SVG icon set (no external icon dependency)
 * ---------------------------------------------------------------------------
 * Kept as a local component so the static export stays dependency-free and
 * icon strokes automatically inherit `currentColor`.
 *
 * Usage:  <Icon name="download" className="h-5 w-5 text-cyan-300" />
 */

/** Stroke-based UI icons (24x24 grid, lucide-style geometry). */
const uiIcons = {
  // ---- Stats / data ------------------------------------------------------
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.74" />
    </>
  ),
  play: <path d="M5 3.5v17a1 1 0 0 0 1.5.87l14-8.5a1 1 0 0 0 0-1.74l-14-8.5A1 1 0 0 0 5 3.5Z" />,
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5M12 15V3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  unlock: (
    <>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l3.5-4 3 3L20 7" />
    </>
  ),
  trendUp: (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  // ---- Pillars / services ------------------------------------------------
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="4.5" cy="18" r="2.5" />
      <circle cx="19.5" cy="18" r="2.5" />
      <path d="M12 7v4m0 0-6 5m6-5 6 5" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      <path d="M3 11h18" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M8 7h8M8 11h5" />
    </>
  ),
};

/** Secondary UI icons (dimensions, navigation, feedback, contact). */
const uiIconsExtra = {
  // ---- Research dimensions ----------------------------------------------
  scale: (
    <>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 7h14M5 7 2 14h6L5 7Zm14 0-3 7h6l-3-7Z" />
    </>
  ),
  crane: (
    <>
      <path d="M5 21V4h14" />
      <path d="M5 8h9M14 4v7m0 0 4 3m-4-3-3 3" />
      <path d="M9 21h4" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15" />
      <path d="M15 10h3a2 2 0 0 1 2 2v9M2 21h20" />
      <path d="M8 8h3M8 12h3M8 16h3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17" />
      <path d="M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z" />
    </>
  ),
  // ---- Navigation & feedback -------------------------------------------
  arrowRight: <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H9m8 0v8" />,
  arrowDown: <path d="M12 5v14m0 0-6-6m6 6 6-6" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  // ---- Contact & content ------------------------------------------------
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1Z" />
  ),
  mapPin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4l1.4 4L17.5 9.5 13.4 11 12 15l-1.4-4L6.5 9.5 10.6 8 12 4Z" />
      <path d="M18.5 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z" />
    </>
  ),
  dot: <circle cx="12" cy="12" r="4" />,
};

/** All available icon names. */
export const iconNames = [...Object.keys(uiIcons), ...Object.keys(uiIconsExtra)];

/**
 * Renders an inline SVG icon with a consistent 24x24 viewBox.
 * @param {{name: string, className?: string, strokeWidth?: number}} props
 */
export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6, ...rest }) {
  const content = uiIcons[name] || uiIconsExtra[name] || uiIconsExtra.dot;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {content}
    </svg>
  );
}