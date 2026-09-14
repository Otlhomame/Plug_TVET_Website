'use client';

/**
 * <NewsExplorer /> - TVET News index with category filtering
 * ---------------------------------------------------------------------------
 * The first post is promoted to a full-width featured card; the rest flow into
 * a responsive grid. Category buttons filter the grid with an animated
 * layout shift, mirroring the insights repository interaction.
 */

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Icon from '@/components/Icon';
import NewsCard from '@/components/NewsCard';
import { easings } from '@/lib/motion';

const railBase =
  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300';

export default function NewsExplorer({ posts, categories }) {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? posts : posts.filter((post) => post.category === active)),
    [active, posts]
  );

  // Only feature the lead story when the unfiltered list is being shown.
  const [lead, ...rest] = filtered;
  const showLead = active === 'All' && lead;
  const gridPosts = showLead ? rest : filtered;

  return (
    <div>
      {/* ---- Category rail ---------------------------------------------- */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="News categories">
        {categories.map((category) => {
          const isActive = active === category;
          const count =
            category === 'All'
              ? posts.length
              : posts.filter((post) => post.category === category).length;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category)}
              className={[
                railBase,
                isActive
                  ? 'border-cyan-400/60 bg-cyan-400/15 text-cyan-100 shadow-glow-cyan'
                  : 'border-slate-600/50 bg-slate-900/50 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200',
              ].join(' ')}
            >
              <Icon name="filter" className="h-3.5 w-3.5" />
              {category}
              <span className="text-[10px] text-slate-400">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ---- Featured lead story ---------------------------------------- */}
      {showLead && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easings.premium }}
          className="mt-8"
        >
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            This week’s focus
          </p>
          <NewsCard post={lead} featured />
        </motion.div>
      )}

      {/* ---- Filtered grid ---------------------------------------------- */}
      <motion.div layout className="mt-10 grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {gridPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.36, ease: easings.premium }}
            >
              <NewsCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {gridPosts.length === 0 && !showLead && (
        <div className="glass mt-10 flex flex-col items-center gap-3 p-12 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-offwhite">
            Nothing published in that category yet
          </h2>
          <p className="max-w-md text-sm text-slate-300">
            Switch back to “All” to see every rapid read, or subscribe on Substack for the full
            analysis while we publish the next summary.
          </p>
          <button type="button" onClick={() => setActive('All')} className="btn-primary mt-2">
            Show all posts
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}