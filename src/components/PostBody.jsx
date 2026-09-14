/**
 * <PostBody /> - renders the structured content blocks of a TVET News post
 * ---------------------------------------------------------------------------
 * Posts in `src/data/news.js` store their body as an array of typed blocks so
 * writers never touch JSX:
 *
 *   { type: 'p',     text: '...' }
 *   { type: 'h2',    text: '...' }            -> becomes a heading + TOC anchor
 *   { type: 'ul',    items: ['...', '...'] }
 *   { type: 'quote', text: '...' }
 *
 * Long-form typography comes from the `.article-body` class in globals.css, so
 * styling stays centralised.
 */

/** Turn a heading into a URL-safe id (used for in-page anchors and the TOC). */
export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Extract the H2 headings so a table of contents can be rendered. */
export function extractHeadings(blocks = []) {
  return blocks
    .filter((block) => block.type === 'h2')
    .map((block) => ({ id: slugifyHeading(block.text), text: block.text }));
}

export default function PostBody({ blocks = [] }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'h2') {
          return (
            <h2 key={key} id={slugifyHeading(block.text)} className="anchor-offset">
              {block.text}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return <h3 key={key}>{block.text}</h3>;
        }

        if (block.type === 'ul') {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === 'quote') {
          return <blockquote key={key}>{block.text}</blockquote>;
        }

        return <p key={key}>{block.text}</p>;
      })}
    </div>
  );
}