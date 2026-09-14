'use client';

/**
 * <ContactForm /> - static-host-friendly enquiry form
 * ---------------------------------------------------------------------------
 * A static export has no server, so the form is fully client-validated and then
 * hands the message to the visitor's mail client via a prefilled `mailto:` link
 * (and offers WhatsApp as a second channel). Nothing is silently dropped.
 *
 * Maps: name, email, query type (Student / Employer / Stakeholder), subject,
 * message. Includes inline field errors, an aria-live status region, and a
 * success panel with the two follow-up channels.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Icon from '@/components/Icon';
import BrandIcon from '@/components/BrandIcon';
import FormField from '@/components/FormField';
import { queryTypes, siteConfig } from '@/data/site';
import { easings } from '@/lib/motion';

/** Field-level validation rules. */
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  else if (values.name.trim().length < 2) errors.name = 'That name looks too short.';

  if (!values.email.trim()) errors.email = 'An email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!values.queryType) errors.queryType = 'Select the option that describes you.';

  if (!values.message.trim()) errors.message = 'Please add a short message.';
  else if (values.message.trim().length < 20)
    errors.message = 'A little more detail helps us route your query (20+ characters).';

  return errors;
}

const initialState = {
  name: '',
  email: '',
  queryType: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [mailtoHref, setMailtoHref] = useState('');

  /** Shared change handler for inputs and the select. */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being corrected.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  /** Validate, compose the enquiry, then open the visitor's mail client. */
  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    const typeLabel =
      queryTypes.find((type) => type.value === values.queryType)?.label || values.queryType;

    const subject =
      values.subject.trim() ||
      `[${typeLabel}] Website enquiry from ${values.name.trim()}`;

    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Query type: ${typeLabel}`,
      '',
      values.message.trim(),
      '',
      '— Sent from theplugtvet website contact form',
    ].join('\n');

    const href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setMailtoHref(href);

    // Hand off to the mail client without navigating away from the page.
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }

    setStatus('sent');
  };

  /** Reset the form back to its pristine state. */
  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setStatus('idle');
    setMailtoHref('');
  };

  return (
    <div className="glass-strong relative overflow-hidden p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          /* ---- Success panel -------------------------------------------- */
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: easings.premium }}
            className="flex flex-col items-start gap-5"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
              <Icon name="check" className="h-7 w-7" strokeWidth={2.2} />
            </span>

            <div>
              <h2 className="text-xl font-semibold tracking-tighter text-offwhite sm:text-2xl">
                Your enquiry is ready to send
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                We opened your email client with the message pre-addressed to{' '}
                <span className="font-medium text-cyan-200">{siteConfig.contact.email}</span>. If
                nothing opened, use one of the buttons below - your answers are still here.
              </p>
            </div>

            <dl className="grid w-full gap-3 rounded-2xl border border-slate-600/40 bg-slate-950/50 p-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Name</dt>
                <dd className="mt-1 text-slate-100">{values.name}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Email</dt>
                <dd className="mt-1 break-all text-slate-100">{values.email}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Query type
                </dt>
                <dd className="mt-1 text-slate-100">
                  {queryTypes.find((type) => type.value === values.queryType)?.label ||
                    values.queryType}
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href={mailtoHref}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.28, ease: easings.premium }}
                className="btn-primary"
              >
                <Icon name="mail" className="h-4 w-4" />
                Open mail app again
              </motion.a>

              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <BrandIcon name="whatsapp" className="h-4 w-4 text-teal-300" />
                WhatsApp {siteConfig.contact.phoneDisplay}
              </a>

              <button type="button" onClick={resetForm} className="btn-quiet">
                Send another enquiry
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easings.premium }}
            className="grid gap-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">
                  <Icon name="mail" className="h-3.5 w-3.5" />
                  Send an enquiry
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tighter text-offwhite sm:text-2xl">
                  Tell us what you need
                </h2>
              </div>
              <span className="chip">Replies within 2 working days</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="contact-name"
                name="name"
                label="Full name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="e.g. Kagiso Mokoena"
                autoComplete="name"
                required
              />

              <FormField
                id="contact-email"
                name="email"
                label="Email address"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <FormField
              id="contact-type"
              name="queryType"
              as="select"
              label="Query type"
              value={values.queryType}
              onChange={handleChange}
              error={errors.queryType}
              options={queryTypes}
              hint="This routes your message to the right desk: learner guidance, employer pipeline, or stakeholder and policy enquiries."
              required
            />

            <FormField
              id="contact-subject"
              name="subject"
              label="Subject (optional)"
              value={values.subject}
              onChange={handleChange}
              placeholder="e.g. Bursary application guidance for 2026 intake"
            />

            <FormField
              id="contact-message"
              name="message"
              as="textarea"
              label="Message"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Share your details, your programme of interest, deadlines you are working to, or the training question you need answered."
              required
            />

            {/* ---- Status region (screen-reader announced) --------------- */}
            <div aria-live="polite" className="min-h-[1.25rem] text-xs">
              {status === 'error' && (
                <p className="flex items-center gap-2 text-rose-300">
                  <Icon name="close" className="h-3.5 w-3.5" />
                  Please fix the highlighted fields and submit again.
                </p>
              )}
            </div>

            {/* ---- Actions ---------------------------------------------- */}
            <div className="flex flex-wrap items-center gap-3 border-t border-slate-700/60 pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.28, ease: easings.premium }}
                className="btn-primary"
              >
                <Icon name="arrowRight" className="h-4 w-4" />
                Send enquiry
              </motion.button>

              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <BrandIcon name="whatsapp" className="h-4 w-4 text-teal-300" />
                WhatsApp instead
              </a>
            </div>

            <p className="text-[11px] leading-relaxed text-slate-400">
              This site is a fully static build, so submitting opens your email client with the
              enquiry pre-addressed to {siteConfig.contact.email}. Nothing is stored on the site.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}