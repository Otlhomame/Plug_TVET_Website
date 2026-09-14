/**
 * <SectionHeading /> - shared section header
 * ---------------------------------------------------------------------------
 * Consistent eyebrow / title / lede trio used on every page. Keeping it in one
 * component is what makes the typographic rhythm feel designed rather than
 * assembled.
 */

import Reveal from '@/components/Reveal';

/**
 * @param {object}  props
 * @param {string}  props.eyebrow     small uppercase label above the title
 * @param {string}  props.title       main heading text
 * @param {string}  props.accent      optional trailing words rendered in gradient
 * @param {string}  props.description supporting paragraph
 * @param {'left'|'center'} props.align
 * @param {'h1'|'h2'|'h3'} props.as   heading level (SEO semantics)
 * @param {string}  props.id          anchor id for deep links
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent = '',
  description,
  align = 'left',
  as: Tag = 'h2',
  id,
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div
      id={id}
      className={[
        'anchor-offset max-w-3xl',
        isCentered ? 'mx-auto text-center' : '',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <Reveal variant="fadeIn">
          <p className={['eyebrow', isCentered ? 'justify-center' : ''].join(' ')}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <Tag
          className={[
            'mt-5 font-semibold tracking-tighter text-offwhite',
            Tag === 'h1'
              ? 'text-4xl sm:text-5xl lg:text-6xl'
              : 'text-3xl sm:text-4xl lg:text-[2.75rem]',
          ].join(' ')}
        >
          {title}
          {accent ? (
            <>
              {' '}
              <span className="text-gradient">{accent}</span>
            </>
          ) : null}
        </Tag>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p className="lede mt-5 text-slate-200/90">{description}</p>
        </Reveal>
      )}
    </div>
  );
}