'use client'

import { useState, useId } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { CheckCircle2, AlertCircle, Send, ChevronDown } from 'lucide-react'
import { cn, isValidEmail } from '@/lib/utils'
import type { ContactFormData, ContactFormState } from '@/types'

// ─── FLOATING LABEL INPUT ────────────────────────────────────────────
interface FloatingInputProps {
  id:           string
  label:        string
  value:        string
  onChange:     (v: string) => void
  type?:        string
  error?:       string
  required?:    boolean
  autoComplete?: string
}

function FloatingInput({
  id, label, value, onChange, type = 'text', error, required, autoComplete,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const isLifted = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          'absolute left-0 pointer-events-none',
          'font-sans transition-all duration-150 ease-default',
          isLifted
            ? 'text-[0.6875rem] top-0 text-brand-500'
            : 'text-sm top-3.5 text-neutral-400'
        )}
      >
        {label}{required && <span className="text-brand-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'block w-full bg-transparent',
          'border-b pt-5 pb-2 text-sm text-neutral-900',
          'font-sans outline-none caret-brand-500',
          'transition-all duration-150',
          error
            ? 'border-error-600'
            : focused
              ? 'border-brand-500 border-b-2'
              : 'border-neutral-300',
          'focus:outline-none'
        )}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />
      {/* motion.p → p with CSS fade-in-down */}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 mt-1.5 text-[0.6875rem] text-error-600 font-sans animate-fade-in-down"
        >
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── FLOATING LABEL TEXTAREA ─────────────────────────────────────────
function FloatingTextarea({
  id, label, value, onChange, error, required, placeholder,
}: FloatingInputProps & { placeholder?: string }) {
  const [focused, setFocused] = useState(false)
  const isLifted = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          'absolute left-0 pointer-events-none',
          'font-sans transition-all duration-150 ease-default',
          isLifted
            ? 'text-[0.6875rem] top-0 text-brand-500'
            : 'text-sm top-3.5 text-neutral-400'
        )}
      >
        {label}{required && <span className="text-brand-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        required={required}
        rows={4}
        placeholder={focused ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'block w-full bg-transparent',
          'border-b pt-5 pb-2 text-sm text-neutral-900',
          'font-sans outline-none caret-brand-500',
          'resize-none transition-all duration-150',
          'placeholder:text-neutral-300 placeholder:text-sm',
          error
            ? 'border-error-600'
            : focused
              ? 'border-brand-500 border-b-2'
              : 'border-neutral-300',
          'focus:outline-none'
        )}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 mt-1.5 text-[0.6875rem] text-error-600 font-sans animate-fade-in-down"
        >
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── SELECT ──────────────────────────────────────────────────────────
interface SelectProps {
  id:       string
  label:    string
  value:    string
  onChange: (v: string) => void
  options:  { value: string; label: string }[]
  error?:   string
  required?: boolean
}

function FloatingSelect({ id, label, value, onChange, options, error, required }: SelectProps) {
  const [focused, setFocused] = useState(false)
  const isLifted = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          'absolute left-0 pointer-events-none z-10',
          'font-sans transition-all duration-150 ease-default',
          isLifted
            ? 'text-[0.6875rem] top-0 text-brand-500'
            : 'text-sm top-3.5 text-neutral-400'
        )}
      >
        {label}{required && <span className="text-brand-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'block w-full bg-transparent appearance-none',
            'border-b pt-5 pb-2 text-sm pr-6',
            'font-sans outline-none cursor-pointer',
            'transition-all duration-150',
            value ? 'text-neutral-900' : 'text-transparent',
            error
              ? 'border-error-600'
              : focused
                ? 'border-brand-500 border-b-2'
                : 'border-neutral-300',
            'focus:outline-none'
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-neutral-900">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-0 top-1/2 translate-y-1 text-neutral-400 pointer-events-none"
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 mt-1.5 text-[0.6875rem] text-error-600 font-sans animate-fade-in-down"
        >
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

// ─── MAIN FORM ───────────────────────────────────────────────────────
export default function ContactForm() {
  const t        = useTranslations('contact.form')
  const tCommon  = useTranslations('common')
  const locale   = useLocale()
  const formId   = useId()

  const [formData, setFormData] = useState<ContactFormData>({
    name: '', company: '', email: '', projectType: '', message: '',
  })
  const [errors, setErrors]       = useState<Partial<ContactFormData>>({})
  const [formState, setFormState] = useState<ContactFormState>({ status: 'idle' })

  const update = (field: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}
    if (!formData.name.trim())    newErrors.name    = tCommon('required')
    if (!formData.company.trim()) newErrors.company = tCommon('required')
    if (!formData.email.trim()) {
      newErrors.email = tCommon('required')
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = tCommon('invalidEmail')
    }
    if (!formData.projectType) newErrors.projectType = tCommon('required')
    if (!formData.message.trim()) newErrors.message  = tCommon('required')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setFormState({ status: 'submitting' })
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...formData, locale }),
      })
      if (res.ok) {
        setFormState({ status: 'success', message: t('success') })
        setFormData({ name: '', company: '', email: '', projectType: '', message: '' })
      } else {
        throw new Error('Submit failed')
      }
    } catch {
      setFormState({ status: 'error', message: t('error') })
    }
  }

  const projectTypeOptions = t.raw('projectTypeOptions') as { value: string; label: string }[]

  // ── Success state — motion.div → div with CSS fade-in-up ──────────
  if (formState.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
        <div className="w-14 h-14 rounded-full bg-success-50 flex items-center justify-center mb-5">
          <CheckCircle2 size={28} className="text-success-600" />
        </div>
        <h3 className="font-display font-semibold text-xl text-neutral-900 mb-2">
          {locale === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
        </h3>
        <p className="font-sans text-sm text-neutral-600 max-w-xs">
          {formState.message}
        </p>
      </div>
    )
  }

  return (
    <form
      id={`${formId}-form`}
      onSubmit={handleSubmit}
      noValidate
      aria-label={locale === 'es' ? 'Formulario de contacto' : 'Contact form'}
    >
      <div className="space-y-6">
        <FloatingInput
          id={`${formId}-name`}    label={t('name')}        value={formData.name}
          onChange={update('name')} error={errors.name}      required autoComplete="name"
        />
        <FloatingInput
          id={`${formId}-company`}    label={t('company')}      value={formData.company}
          onChange={update('company')} error={errors.company}    required autoComplete="organization"
        />
        <FloatingInput
          id={`${formId}-email`}   label={t('email')}       value={formData.email}
          onChange={update('email')} type="email"             error={errors.email}
          required autoComplete="email"
        />
        <FloatingSelect
          id={`${formId}-type`}     label={t('projectType')}  value={formData.projectType}
          onChange={update('projectType')} options={projectTypeOptions}
          error={errors.projectType} required
        />
        <FloatingTextarea
          id={`${formId}-message`}    label={t('message')}      value={formData.message}
          onChange={update('message')} placeholder={t('messagePlaceholder')}
          error={errors.message} required
        />
      </div>

      {/* Error state — motion.p → p with CSS fade-in */}
      {formState.status === 'error' && (
        <p
          role="alert"
          className="flex items-center gap-2 mt-4 text-sm text-error-600 font-sans animate-fade-in"
        >
          <AlertCircle size={14} />
          {formState.message}
        </p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={formState.status === 'submitting'}
          className={cn(
            'w-full flex items-center justify-center gap-2.5',
            'bg-brand-500 text-white rounded-sm',
            'font-display font-semibold text-sm tracking-[0.04em] uppercase',
            'py-4 px-6',
            'transition-all duration-200',
            'hover:bg-brand-600',
            'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[3px]',
            'disabled:opacity-60 disabled:cursor-not-allowed'
          )}
        >
          {formState.status === 'submitting' ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t('submitting')}
            </>
          ) : (
            <>
              <Send size={15} />
              {t('submit')}
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-center font-sans text-[0.6875rem] text-neutral-400">
        {t('privacy')}
      </p>
    </form>
  )
}
