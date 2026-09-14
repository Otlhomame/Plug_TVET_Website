/**
 * <FormField /> - accessible field primitive
 * ---------------------------------------------------------------------------
 * Renders an input, textarea or select with a consistent glass treatment, a
 * visible label, a hint line, and an inline validation message wired up with
 * aria-invalid / aria-describedby.
 *
 * No state of its own - the parent form owns values and errors.
 */

const baseControl =
  'w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-sm text-offwhite transition-colors duration-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30';

/**
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.label
 * @param {'input'|'textarea'|'select'} [props.as]
 * @param {string} [props.type]
 * @param {string} props.name
 * @param {string} props.value
 * @param {(e: any) => void} props.onChange
 * @param {string} [props.error]
 * @param {string} [props.hint]
 * @param {string} [props.placeholder]
 * @param {boolean} [props.required]
 * @param {{value: string, label: string, hint?: string}[]} [props.options]
 */
export default function FormField({
  id,
  label,
  as = 'input',
  type = 'text',
  name,
  value,
  onChange,
  error,
  hint,
  placeholder,
  required = false,
  options = [],
  autoComplete,
  rows = 5,
  className = '',
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ');

  const controlClass = [
    baseControl,
    error ? 'border-rose-400/70 focus:border-rose-400' : 'border-slate-600/50 focus:border-cyan-400/60',
  ].join(' ');

  return (
    <div className={['flex flex-col gap-2', className].join(' ')}>
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-cyan-400">
            *
          </span>
        )}
      </label>

      {as === 'textarea' && (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={[controlClass, 'resize-y'].join(' ')}
        />
      )}

      {as === 'select' && (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={[controlClass, 'appearance-none bg-slate-950/80'].join(' ')}
        >
          <option value="">Select an option...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === 'input' && (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={controlClass}
        />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-slate-400">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-2 text-xs font-medium text-rose-300"
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-rose-400" />
          {error}
        </p>
      )}
    </div>
  );
}