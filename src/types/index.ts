export type AccentTone = 'sky' | 'emerald' | 'amber' | 'violet'
export type DateRangeOption = '3m' | '6m' | 'all'
export type SubscriptionTier = 'all' | 'free' | 'pro' | 'enterprise'
export type TrendDirection = 'up' | 'down' | 'neutral'

export interface MonthlyMetric {
  month: string
  revenue: number
  signups: number
  freeUsers: number
  proUsers: number
  enterpriseUsers: number
  activeUsers: number
  conversionRate: number
}

export interface KpiMetric {
  label: string
  value: string
  helperText: string
  tone: AccentTone
  trendText?: string
  trendDirection?: TrendDirection
}

export interface DashboardHeadlineMetric {
  label: string
  value: string
  helperText: string
}

export interface SubscriptionBreakdownItem {
  name: string
  value: number
  fill: string
}

export interface SubscriptionSummary {
  breakdown: SubscriptionBreakdownItem[]
  headlineLabel: string
  headlineValue: number
  focusShare: number
  totalUsers: number
  contextMonth: string
}

export interface RevenueChartDatum {
  month: string
  revenue: number
}

export interface UserGrowthChartDatum {
  month: string
  signups: number
}

export interface ConversionChartDatum {
  month: string
  conversionRate: number
}
