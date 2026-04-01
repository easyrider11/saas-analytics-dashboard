import type {
  ConversionChartDatum,
  DashboardHeadlineMetric,
  DateRangeOption,
  KpiMetric,
  MonthlyMetric,
  RevenueChartDatum,
  SubscriptionSummary,
  SubscriptionTier,
  TrendDirection,
  UserGrowthChartDatum,
} from '../types'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const numberFormatter = new Intl.NumberFormat('en-US')

const tierMetadata = {
  free: { label: 'Free', fill: '#cbd5e1' },
  pro: { label: 'Pro', fill: '#0ea5e9' },
  enterprise: { label: 'Enterprise', fill: '#0f766e' },
} as const

export const formatCurrency = (
  value: number,
  options?: { compact?: boolean },
) =>
  options?.compact
    ? compactCurrencyFormatter.format(value)
    : currencyFormatter.format(value)

export const formatNumber = (value: number) => numberFormatter.format(value)

export const formatPercentage = (value: number) => `${value.toFixed(1)}%`

export const getDateRangeOptionLabel = (dateRange: DateRangeOption) => {
  switch (dateRange) {
    case '3m':
      return 'Last 3 months'
    case '6m':
      return 'Last 6 months'
    default:
      return 'All'
  }
}

export const getSubscriptionTierLabel = (tier: SubscriptionTier) =>
  tier === 'all' ? 'All tiers' : tierMetadata[tier].label

export const getTierColor = (tier: Exclude<SubscriptionTier, 'all'>) =>
  tierMetadata[tier].fill

export const getLatestMonth = (data: MonthlyMetric[]) => data[data.length - 1]

export const getPreviousMonth = (data: MonthlyMetric[]) =>
  data[data.length - 2] ?? data[data.length - 1]

export const getDateRangeLabel = (data: MonthlyMetric[]) =>
  `${data[0].month} - ${getLatestMonth(data).month}`

export const sliceDataByDateRange = (
  data: MonthlyMetric[],
  dateRange: DateRangeOption,
) => {
  switch (dateRange) {
    case '3m':
      return data.slice(-3)
    case '6m':
      return data.slice(-6)
    default:
      return data
  }
}

export const getTotalSubscribers = (month: MonthlyMetric) =>
  month.freeUsers + month.proUsers + month.enterpriseUsers

export const getPaidSubscribers = (month: MonthlyMetric) =>
  month.proUsers + month.enterpriseUsers

export const getTierUserCount = (
  month: MonthlyMetric,
  tier: SubscriptionTier,
) => {
  switch (tier) {
    case 'free':
      return month.freeUsers
    case 'pro':
      return month.proUsers
    case 'enterprise':
      return month.enterpriseUsers
    default:
      return getTotalSubscribers(month)
  }
}

export const getTotalRevenue = (data: MonthlyMetric[]) =>
  data.reduce((total, month) => total + month.revenue, 0)

export const getTotalSignups = (data: MonthlyMetric[]) =>
  data.reduce((total, month) => total + month.signups, 0)

export const getAverageConversionRate = (
  data: Array<{ conversionRate: number }>,
) =>
  data.reduce((total, month) => total + month.conversionRate, 0) / data.length

export const getGrowthPercentage = (current: number, previous: number) => {
  if (previous === 0) {
    return 0
  }

  return ((current - previous) / previous) * 100
}

export const formatDelta = (value: number) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

export const formatPointDelta = (value: number) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(1)} pts`

export const getTrendDirection = (value: number): TrendDirection => {
  if (value > 0) {
    return 'up'
  }

  if (value < 0) {
    return 'down'
  }

  return 'neutral'
}

export const getHeadlineMetric = (
  data: MonthlyMetric[],
  tier: SubscriptionTier,
): DashboardHeadlineMetric => {
  const latest = getLatestMonth(data)
  const totalSubscribers = getTotalSubscribers(latest)

  if (tier === 'all') {
    return {
      label: 'Latest paid subscribers',
      value: formatNumber(getPaidSubscribers(latest)),
      helperText: `${latest.month} snapshot with ${formatCurrency(latest.revenue)} in monthly revenue.`,
    }
  }

  const tierUsers = getTierUserCount(latest, tier)
  const share = totalSubscribers === 0 ? 0 : (tierUsers / totalSubscribers) * 100

  return {
    label: `Latest ${getSubscriptionTierLabel(tier)} users`,
    value: formatNumber(tierUsers),
    helperText: `${share.toFixed(1)}% of the subscriber base in ${latest.month}.`,
  }
}

export const getKpiMetrics = (
  data: MonthlyMetric[],
  tier: SubscriptionTier,
): KpiMetric[] => {
  const latest = getLatestMonth(data)
  const previous = getPreviousMonth(data)
  const dateRangeLabel = getDateRangeLabel(data)
  const isTierFocused = tier !== 'all'
  const focusValue =
    tier === 'all' ? latest.activeUsers : getTierUserCount(latest, tier)
  const previousFocusValue =
    tier === 'all' ? previous.activeUsers : getTierUserCount(previous, tier)
  const focusGrowth = getGrowthPercentage(focusValue, previousFocusValue)
  const revenueGrowth = getGrowthPercentage(latest.revenue, previous.revenue)
  const signupsGrowth = getGrowthPercentage(latest.signups, previous.signups)
  const conversionDelta = latest.conversionRate - previous.conversionRate

  return [
    {
      label: 'Total revenue',
      value: formatCurrency(getTotalRevenue(data)),
      helperText: isTierFocused
        ? `Product-wide revenue across ${dateRangeLabel}`
        : `${dateRangeLabel} cumulative revenue`,
      tone: 'sky',
      trendText: `${formatDelta(revenueGrowth)} vs ${previous.month}`,
      trendDirection: getTrendDirection(revenueGrowth),
    },
    {
      label: 'Total signups',
      value: formatNumber(getTotalSignups(data)),
      helperText: isTierFocused
        ? `Product-wide acquisition across ${dateRangeLabel}`
        : `${formatNumber(latest.signups)} added in ${latest.month}`,
      tone: 'emerald',
      trendText: `${formatDelta(signupsGrowth)} vs ${previous.month}`,
      trendDirection: getTrendDirection(signupsGrowth),
    },
    {
      label:
        tier === 'all'
          ? 'Latest active users'
          : `Latest ${getSubscriptionTierLabel(tier)} users`,
      value: formatNumber(focusValue),
      helperText: `${formatDelta(focusGrowth)} vs ${previous.month}`,
      tone: 'amber',
      trendText: `${formatDelta(focusGrowth)} vs ${previous.month}`,
      trendDirection: getTrendDirection(focusGrowth),
    },
    {
      label: 'Average conversion rate',
      value: formatPercentage(getAverageConversionRate(data)),
      helperText: isTierFocused
        ? `Overall product conversion across ${dateRangeLabel}`
        : `${formatPercentage(latest.conversionRate)} in ${latest.month}`,
      tone: 'violet',
      trendText: `${formatPointDelta(conversionDelta)} vs ${previous.month}`,
      trendDirection: getTrendDirection(conversionDelta),
    },
  ]
}

export const getSubscriptionSummary = (
  data: MonthlyMetric[],
  tier: SubscriptionTier,
): SubscriptionSummary => {
  const latest = getLatestMonth(data)
  const totalUsers = getTotalSubscribers(latest)

  if (tier === 'all') {
    return {
      breakdown: [
        { name: 'Free', value: latest.freeUsers, fill: getTierColor('free') },
        { name: 'Pro', value: latest.proUsers, fill: getTierColor('pro') },
        {
          name: 'Enterprise',
          value: latest.enterpriseUsers,
          fill: getTierColor('enterprise'),
        },
      ],
      headlineLabel: 'Total subscribers',
      headlineValue: totalUsers,
      focusShare: 100,
      totalUsers,
      contextMonth: latest.month,
    }
  }

  const selectedTierValue = getTierUserCount(latest, tier)

  return {
    breakdown: [
      {
        name: getSubscriptionTierLabel(tier),
        value: selectedTierValue,
        fill: getTierColor(tier),
      },
      {
        name: 'Other tiers',
        value: Math.max(totalUsers - selectedTierValue, 0),
        fill: '#e2e8f0',
      },
    ],
    headlineLabel: `${getSubscriptionTierLabel(tier)} users`,
    headlineValue: selectedTierValue,
    focusShare: totalUsers === 0 ? 0 : (selectedTierValue / totalUsers) * 100,
    totalUsers,
    contextMonth: latest.month,
  }
}

export const prepareRevenueChartData = (
  data: MonthlyMetric[],
): RevenueChartDatum[] =>
  data.map(({ month, revenue }) => ({
    month,
    revenue,
  }))

export const prepareUserGrowthChartData = (
  data: MonthlyMetric[],
): UserGrowthChartDatum[] =>
  data.map(({ month, signups }) => ({
    month,
    signups,
  }))

export const prepareConversionChartData = (
  data: MonthlyMetric[],
): ConversionChartDatum[] =>
  data.map(({ month, conversionRate }) => ({
    month,
    conversionRate,
  }))
