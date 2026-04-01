import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { SubscriptionTier, UserGrowthChartDatum } from '../../types'
import { formatNumber } from '../../utils/dashboard'

interface UserGrowthBarChartProps {
  data: UserGrowthChartDatum[]
  subscriptionTier: SubscriptionTier
}

function UserGrowthBarChart({
  data,
  subscriptionTier,
}: UserGrowthBarChartProps) {
  const latest = data[data.length - 1]
  const averageSignups = Math.round(
    data.reduce((total, month) => total + month.signups, 0) / data.length,
  )
  const isTierFocused = subscriptionTier !== 'all'

  return (
    <section className="dashboard-card interactive-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="section-title">User growth</h2>
          <p className="section-subtitle">
            {isTierFocused
              ? 'Signups stay product-wide because the mock data does not assign acquisition to a single tier.'
              : 'Monthly signups and acquisition momentum over time.'}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Avg. monthly signups
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
            {formatNumber(averageSignups)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {latest.month} is the latest month in view.
          </p>
        </div>
      </div>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, left: -10 }}>
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              axisLine={false}
              dataKey="month"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value: number) => formatNumber(value)}
              tickLine={false}
              width={56}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                borderColor: '#e2e8f0',
                boxShadow: '0 20px 45px -28px rgba(15, 23, 42, 0.3)',
              }}
              formatter={(value) => [
                formatNumber(Number(value ?? 0)),
                'Signups',
              ]}
            />
            <Bar
              dataKey="signups"
              fill="#0ea5e9"
              maxBarSize={40}
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default UserGrowthBarChart
