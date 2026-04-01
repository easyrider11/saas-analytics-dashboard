import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { ConversionChartDatum, SubscriptionTier } from '../../types'
import {
  formatPercentage,
  getAverageConversionRate,
} from '../../utils/dashboard'

interface ConversionChartProps {
  data: ConversionChartDatum[]
  subscriptionTier: SubscriptionTier
}

function ConversionChart({ data, subscriptionTier }: ConversionChartProps) {
  const latest = data[data.length - 1]
  const averageRate = getAverageConversionRate(data)
  const lowestRate = Math.min(...data.map((month) => month.conversionRate))
  const highestRate = Math.max(...data.map((month) => month.conversionRate))
  const isTierFocused = subscriptionTier !== 'all'

  return (
    <section className="dashboard-card interactive-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="section-title">Conversion rate</h2>
          <p className="section-subtitle">
            {isTierFocused
              ? 'Conversion stays product-wide because signups convert into the overall paid base, not a single selected tier.'
              : 'Share of signups converting into paid tiers each month.'}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 px-4 py-3 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Period average
          </p>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
            {formatPercentage(averageRate)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {formatPercentage(latest.conversionRate)} in {latest.month}
          </p>
        </div>
      </div>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12 }}>
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
              domain={[lowestRate - 0.4, highestRate + 0.4]}
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value: number) => `${value.toFixed(1)}%`}
              tickLine={false}
              width={64}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                borderColor: '#e2e8f0',
                boxShadow: '0 20px 45px -28px rgba(15, 23, 42, 0.3)',
              }}
              formatter={(value) => [
                formatPercentage(Number(value ?? 0)),
                'Conversion rate',
              ]}
            />
            <ReferenceLine
              stroke="#94a3b8"
              strokeDasharray="5 5"
              y={averageRate}
            />
            <Line
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              dataKey="conversionRate"
              dot={false}
              stroke="#0f766e"
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

export default ConversionChart
