import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { RevenueChartDatum, SubscriptionTier } from '../../types'
import { formatCurrency } from '../../utils/dashboard'

interface RevenueLineChartProps {
  data: RevenueChartDatum[]
  subscriptionTier: SubscriptionTier
}

function RevenueLineChart({
  data,
  subscriptionTier,
}: RevenueLineChartProps) {
  const latest = data[data.length - 1]
  const isTierFocused = subscriptionTier !== 'all'

  return (
    <section className="dashboard-card interactive-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="section-title">Revenue trend</h2>
          <p className="section-subtitle">
            {isTierFocused
              ? 'Revenue remains product-wide because the mock data does not split billing by tier.'
              : 'Monthly recurring revenue across the current reporting window.'}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Latest month
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
            {formatCurrency(latest.revenue)}
          </p>
        </div>
      </div>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12 }}>
            <defs>
              <linearGradient id="revenueStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
            </defs>

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
              tickFormatter={(value: number) =>
                formatCurrency(value, { compact: true })
              }
              tickLine={false}
              width={72}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                borderColor: '#e2e8f0',
                boxShadow: '0 20px 45px -28px rgba(15, 23, 42, 0.3)',
              }}
              formatter={(value) => [
                formatCurrency(Number(value ?? 0)),
                'Revenue',
              ]}
            />
            <Line
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              dataKey="revenue"
              dot={false}
              stroke="url(#revenueStroke)"
              strokeLinecap="round"
              strokeWidth={3}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default RevenueLineChart
