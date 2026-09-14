'use client';

/**
 * <SocialTicker /> - infinite traction marquee
 * ---------------------------------------------------------------------------
 * The "social proof rail" under the hero: a seamless, duplicated track of
 * community milestones and platform stats. Pure CSS animation (no JS per frame)
 * with an accessible, reduced-motion-friendly fallback.
 */

import Icon from '@/components/Icon';
import { stats } from '@/data/stats';

/** Additional editorial facts mixed in with the live metrics. */
const editorialFacts = [
  { label: 'Francistown born', icon: 'mapPin' },
  { label: '5 research dimensions', icon: 'layers' },
  { label: 'Free PDF reports', icon: 'fileText' },
  { label: '4-5 minute reads', icon: 'clock' },
  { label: 'Substack deep dives', icon: 'book' },
  { label: 'National coverage', icon: 'globe' },
];

export default function SocialTicker() {
  // Metric chips first, then the editorial facts - rendered twice for a
  // seamless -50% translation loop.
  const items = [
    ...stats.map((stat) => ({ label: `${stat.value} ${stat.label}`, icon: stat.icon })),
    ...editorialFacts,
  ];

  const track = (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">
      {items.map((item, index) => (
        <li
          key={`${item.label}-${index}`}
          className="chip whitespace-nowrap border-slate-600/40 bg-slate-900/50 text-slate-200"
        >
          <Icon name={item.icon} className="h-3.5 w-3.5 text-cyan-300" />
          {item.label}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-slate-700/50 bg-slate-950/60 py-4">
      {/* Fade masks so the loop never shows a hard cut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent"
      />

      {/* Screen-reader version of the rail */}
      <p className="sr-only">
        Social traction and platform facts:{' '}
        {items.map((item) => item.label).join(', ')}.
      </p>

      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track}
        {track}
      </div>
    </div>
  );
}