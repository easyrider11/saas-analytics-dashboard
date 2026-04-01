import { useEffect, useState } from 'react'

import DashboardSkeleton from './components/DashboardSkeleton'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'
import FilterBar from './components/FilterBar'
import KpiCard from './components/KpiCard'
import ConversionChart from './components/charts/ConversionChart'
import RevenueLineChart from './components/charts/RevenueLineChart'
import SubscriptionDonutChart from './components/charts/SubscriptionDonutChart'
import UserGrowthBarChart from './components/charts/UserGrowthBarChart'
import { mockMonthlyData } from './data/mockData'
import type { DateRangeOption, SubscriptionTier } from './types'
import {
  getDateRangeLabel,
  getDateRangeOptionLabel,
  getHeadlineMetric,
  getKpiMetrics,
  getLatestMonth,
  getSubscriptionSummary,
  getSubscriptionTierLabel,
  prepareConversionChartData,
  prepareRevenueChartData,
  prepareUserGrowthChartData,
  sliceDataByDateRange,
} from './utils/dashboard'

const INITIAL_LOADING_DELAY_MS = 900

function App() {
  const [dateRange, setDateRange] = useState<DateRangeOption>('all')
  const [subscriptionTier, setSubscriptionTier] =
    useState<SubscriptionTier>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false)
    }, INITIAL_LOADING_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const filteredData = sliceDataByDateRange(mockMonthlyData, dateRange)
  const latestMetrics = getLatestMonth(filteredData)
  const kpiMetrics = getKpiMetrics(filteredData, subscriptionTier)
  const headlineMetric = getHeadlineMetric(filteredData, subscriptionTier)
  const subscriptionSummary = getSubscriptionSummary(
    filteredData,
    subscriptionTier,
  )
  const revenueChartData = prepareRevenueChartData(filteredData)
  const userGrowthChartData = prepareUserGrowthChartData(filteredData)
  const conversionChartData = prepareConversionChartData(filteredData)
  const tierFilterLabel =
    subscriptionTier === 'all'
      ? 'All tiers'
      : `${getSubscriptionTierLabel(subscriptionTier)} focus`

  const resetFilters = () => {
    setDateRange('all')
    setSubscriptionTier('all')
  }

  const hasData = filteredData.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <div className="relative isolate flex-1 overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.16),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]" />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {!isLoading && !hasError ? (
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                className="rounded-2xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
                onClick={() => setHasError(true)}
              >
                Simulate Error
              </button>
            </div>
          ) : null}

          {isLoading ? (
            <DashboardSkeleton />
          ) : hasError ? (
            <ErrorState onRetry={() => setHasError(false)} />
          ) : (
            <div className="space-y-6">
              <section className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
                <div className="dashboard-card interactive-card p-6 sm:p-8">
                  <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Executive dashboard
                  </span>
                  <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Northstar Cloud Analytics
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    A polished SaaS performance overview covering revenue,
                    acquisition, subscriber mix, and conversion health across the
                    currently selected reporting window.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 ring-1 ring-slate-200">
                      {getDateRangeOptionLabel(dateRange)}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 ring-1 ring-slate-200">
                      {tierFilterLabel}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="dashboard-card interactive-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Reporting window
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                      {getDateRangeLabel(filteredData)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Preset: {getDateRangeOptionLabel(dateRange)}. Focus:{' '}
                      {tierFilterLabel}. Showing {filteredData.length} months
                      ending in {latestMetrics.month}.
                    </p>
                  </div>

                  <div className="dashboard-card interactive-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {headlineMetric.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                      {headlineMetric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {headlineMetric.helperText}
                    </p>
                  </div>
                </div>
              </section>

              <FilterBar
                dateRange={dateRange}
                monthsShown={filteredData.length}
                onDateRangeChange={setDateRange}
                onReset={resetFilters}
                onSubscriptionTierChange={setSubscriptionTier}
                subscriptionTier={subscriptionTier}
              />

              {!hasData ? (
                <EmptyState />
              ) : (
                <>
                  <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {kpiMetrics.map((metric) => (
                      <KpiCard
                        key={metric.label}
                        helperText={metric.helperText}
                        label={metric.label}
                        tone={metric.tone}
                        trendDirection={metric.trendDirection}
                        trendText={metric.trendText}
                        value={metric.value}
                      />
                    ))}
                  </section>

                  <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
                    <RevenueLineChart
                      data={revenueChartData}
                      subscriptionTier={subscriptionTier}
                    />
                    <UserGrowthBarChart
                      data={userGrowthChartData}
                      subscriptionTier={subscriptionTier}
                    />
                  </section>

                  <section className="grid gap-6 xl:grid-cols-[1fr_1.45fr]">
                    <SubscriptionDonutChart
                      subscriptionTier={subscriptionTier}
                      summary={subscriptionSummary}
                    />
                    <ConversionChart
                      data={conversionChartData}
                      subscriptionTier={subscriptionTier}
                    />
                  </section>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white px-6 py-3">
        <p className="mx-auto max-w-7xl text-center text-xs text-slate-400">
          Last updated: mock data through Mar 2026 &middot; Revenue, signups,
          and conversion are product-wide (not split by tier in this mock
          dataset)
        </p>
      </footer>
    </div>
  )
}

export default App
