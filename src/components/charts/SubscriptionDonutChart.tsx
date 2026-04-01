import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import type { SubscriptionSummary, SubscriptionTier } from '../../types'
import {
  formatNumber,
  getSubscriptionTierLabel,
} from '../../utils/dashboard'

interface SubscriptionDonutChartProps {
  summary: SubscriptionSummary
  subscriptionTier: SubscriptionTier
}

function SubscriptionDonutChart({
  summary,
  subscriptionTier,
}: SubscriptionDonutChartProps) {
  const isTierFocused = subscriptionTier !== 'all'
  const centerValue = isTierFocused
    ? `${summary.focusShare.toFixed(1)}%`
    : formatNumber(summary.totalUsers)
  const centerLabel = isTierFocused
    ? `${getSubscriptionTierLabel(subscriptionTier)} share`
    : 'Total users'

  return (
    <section className="dashboard-card interactive-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="section-title">Subscription breakdown</h2>
          <p className="section-subtitle">
            {isTierFocused
              ? `Latest ${getSubscriptionTierLabel(subscriptionTier)} mix versus the rest of the subscriber base in ${summary.contextMonth}.`
              : `Latest subscriber mix by plan tier for ${summary.contextMonth}.`}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {summary.headlineLabel}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
            {formatNumber(summary.headlineValue)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {isTierFocused
              ? `${summary.focusShare.toFixed(1)}% of the latest subscriber base`
              : `${formatNumber(summary.totalUsers)} total users in ${summary.contextMonth}`}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="relative h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summary.breakdown}
                dataKey="value"
                innerRadius={82}
                outerRadius={112}
                paddingAngle={3}
                stroke="#ffffff"
                strokeWidth={4}
              >
                {summary.breakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  borderColor: '#e2e8f0',
                  boxShadow: '0 20px 45px -28px rgba(15, 23, 42, 0.3)',
                }}
                formatter={(value) => [
                  formatNumber(Number(value ?? 0)),
                  'Users',
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {centerValue}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                {centerLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {summary.breakdown.map((item) => {
            const share =
              summary.totalUsers === 0 ? 0 : (item.value / summary.totalUsers) * 100

            return (
              <div
                key={item.name}
                className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">
                    {share.toFixed(1)}%
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                  {formatNumber(item.value)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SubscriptionDonutChart
