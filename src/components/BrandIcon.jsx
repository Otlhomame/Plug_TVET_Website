/**
 * THE PLUG TVET - brand / social icons
 * ---------------------------------------------------------------------------
 * Filled glyphs (Facebook, TikTok, Substack...) do not work as
 * outlines, so they live in their own map rendered with fill="currentColor".
 */

/** Filled brand glyphs, all drawn on a 24x24 grid. */
const brandIcons = {
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z" />
  ),
  tiktok: (
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.1v12.4a2.59 2.59 0 1 1-1.84-2.48V9.71a5.72 5.72 0 1 0 4.94 5.66V8.9a7.3 7.3 0 0 0 4.29 1.38V7.17a4.27 4.27 0 0 1-3.23-1.35Z" />
  ),
  substack: (
    <path d="M4.5 3.5H19.5V5.9H4.5V3.5ZM4.5 7.6H19.5V10H4.5V7.6ZM4.5 11.7 12 15.9l7.5-4.2V21L12 16.8 4.5 21V11.7Z" />
  ),
  whatsapp: (
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84a9.76 9.76 0 0 0 1.35 4.98L2 22l5.32-1.5a9.9 9.9 0 0 0 4.72 1.2c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm5.7 13.9c-.24.68-1.4 1.3-1.94 1.35-.53.06-1.02.1-1.77-.13a13.6 13.6 0 0 1-5.6-4.4c-.5-.72-.95-1.6-.95-2.5 0-.9.47-1.34.7-1.55.23-.2.5-.25.67-.25h.48c.16 0 .37-.03.56.44.2.5.68 1.72.74 1.85.06.12.1.27.02.43-.09.16-.3.42-.48.6-.13.15-.3.3-.13.6.17.3.75 1.24 1.6 2.01 1.1.98 1.75 1.13 2.05 1.28.23.12.44.1.6-.06.16-.16.66-.77.84-1.03.18-.27.36-.2.6-.13.24.07 1.5.72 1.76.85.26.13.43.2.5.3.05.12.05.66-.19 1.34Z" />
  ),
};

/** Names of the available brand icons. */
export const brandIconNames = Object.keys(brandIcons);

/**
 * Renders a filled brand icon.
 * @param {{name: string, className?: string}} props
 */
export default function BrandIcon({ name, className = 'h-5 w-5', ...rest }) {
  const glyph = brandIcons[name] || brandIcons.facebook;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {glyph}
    </svg>
  );
}