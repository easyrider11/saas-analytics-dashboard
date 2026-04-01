import type { DateRangeOption, SubscriptionTier } from '../types'

interface FilterBarProps {
  dateRange: DateRangeOption
  subscriptionTier: SubscriptionTier
  monthsShown: number
  onDateRangeChange: (value: DateRangeOption) => void
  onSubscriptionTierChange: (value: SubscriptionTier) => void
  onReset: () => void
}

const dateRangeOptions: Array<{ label: string; value: DateRangeOption }> = [
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'All', value: 'all' },
]

const tierOptions: Array<{ label: string; value: SubscriptionTier }> = [
  { label: 'All', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
]

function FilterBar({
  dateRange,
  subscriptionTier,
  monthsShown,
  onDateRangeChange,
  onSubscriptionTierChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters = dateRange !== 'all' || subscriptionTier !== 'all'

  return (
    <section className="dashboard-card interactive-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Filters</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Live
            </span>
          </div>
          <p className="section-subtitle">
            Date range updates the full dashboard. Tier focus applies where the
            data is plan-specific.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Visible window
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
              {monthsShown} months
            </p>
          </div>
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasActiveFilters}
            onClick={onReset}
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-600">
            Date range
          </span>
          <select
            className="filter-control"
            onChange={(event) =>
              onDateRangeChange(event.target.value as DateRangeOption)
            }
            value={dateRange}
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-600">
            Subscription tier
          </span>
          <select
            className="filter-control"
            onChange={(event) =>
              onSubscriptionTierChange(
                event.target.value as SubscriptionTier,
              )
            }
            value={subscriptionTier}
          >
            {tierOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}

export default FilterBar
