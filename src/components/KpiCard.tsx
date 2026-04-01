import type { AccentTone, TrendDirection } from '../types'

interface KpiCardProps {
  label: string
  value: string
  helperText: string
  tone: AccentTone
  trendText?: string
  trendDirection?: TrendDirection
}

const toneStyles: Record<
  AccentTone,
  { accent: string; badge: string; trend: string }
> = {
  sky: {
    accent: 'from-sky-500 to-sky-200',
    badge: 'bg-sky-50 text-sky-700 ring-sky-100',
    trend: 'bg-sky-50 text-sky-700',
  },
  emerald: {
    accent: 'from-emerald-500 to-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    trend: 'bg-emerald-50 text-emerald-700',
  },
  amber: {
    accent: 'from-amber-500 to-amber-200',
    badge: 'bg-amber-50 text-amber-700 ring-amber-100',
    trend: 'bg-amber-50 text-amber-700',
  },
  violet: {
    accent: 'from-violet-500 to-violet-200',
    badge: 'bg-violet-50 text-violet-700 ring-violet-100',
    trend: 'bg-violet-50 text-violet-700',
  },
}

function KpiCard({
  label,
  value,
  helperText,
  tone,
  trendText,
  trendDirection = 'neutral',
}: KpiCardProps) {
  const styles = toneStyles[tone]

  return (
    <article className="dashboard-card interactive-card relative overflow-hidden p-5 sm:p-6">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.accent}`}
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ${styles.badge}`}
        >
          {label}
        </span>

        {trendText ? (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.trend}`}
          >
            <span aria-hidden="true">
              {trendDirection === 'up'
                ? '+'
                : trendDirection === 'down'
                  ? '-'
                  : '='}
            </span>
            {trendText}
          </span>
        ) : null}
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{helperText}</p>
    </article>
  )
}

export default KpiCard
