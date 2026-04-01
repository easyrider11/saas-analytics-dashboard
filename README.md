# SaaS Analytics Dashboard

Northstar Cloud Analytics is a polished single-page SaaS dashboard built for a
time-boxed front-end technical assessment. It presents mock executive metrics
for revenue, user growth, subscription mix, and conversion health in a clean,
deployable React application.

<!-- Replace with an actual screenshot after deploying -->
![Dashboard Screenshot](docs/screenshot.png)

## Project Overview

- Executive-style light-mode analytics dashboard
- Local mock data only, with no backend or routing
- Interactive date-range and subscription-tier filtering
- Responsive KPI cards and charts for desktop, tablet, and mobile
- Includes loading and recoverable error states for assessment completeness

## Features

- Initial loading skeleton on first render
- Simulated error state with retry recovery
- Empty state when filters yield no data
- KPI cards with lightweight trend indicators
- Revenue trend line chart
- User growth bar chart
- Subscription mix donut chart
- Conversion rate line chart
- Controlled filters for date range and subscription tier
- Footer with data freshness note

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Recharts

## Mock Data Assumptions

- Data models a fictional SaaS company over ten monthly periods (Jun 2025 -- Mar 2026)
- Free users are the largest tier (~87%), followed by Pro (~11%) and Enterprise (~2%)
- Revenue tracks paid-tier growth rather than free-user volume
- Active users, signups, and conversion rates trend upward with slight variance
- A small December dip reflects seasonal patterns
- Revenue, signups, and conversion remain product-wide because the mock dataset
  does not split those metrics by subscription tier -- this is called out in the
  UI footer and in chart subtitles to avoid misleading anyone reviewing the dashboard

## Filtering Behavior

- `Date range` filters the active dataset used by KPI cards, summary panels, and
  all charts
- `Subscription tier` focuses tier-specific summaries such as subscriber counts
  and the subscription breakdown chart
- Product-wide charts stay visible under tier focus and are labeled clearly to
  avoid implying unsupported tier-level revenue or signup data
- Filters apply instantly on change -- no "Apply" button needed for a small
  local dataset

## Design Decisions

- **Instant filters, no "Apply" button.** With a small local dataset, there is
  no reason to batch filter changes. Immediate feedback feels more responsive.
- **Product-wide metrics stay unfiltered under tier focus.** Rather than
  fabricating per-tier revenue or conversion breakdowns, those charts always show
  the full picture. Only views where tier filtering is meaningful (subscriber
  counts, donut chart) respond to the tier filter. Chart subtitles explain this.
- **Skeleton mirrors the real layout.** The loading skeleton uses the same grid
  structure as the dashboard so content does not shift when data appears.
- **No external state library.** `useState` in a single component tree is
  sufficient for this scope and keeps the dependency footprint minimal.
- **Footer transparency.** A persistent footer note clarifies that data is mock
  and that revenue/signups/conversion are product-wide, so reviewers see this
  context without reading the source code.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

## Development Scripts

- Start the local dev server:

  ```bash
  npm run dev
  ```

- Create a production build:

  ```bash
  npm run build
  ```

- Run ESLint:

  ```bash
  npm run lint
  ```

- Preview the production build locally:

  ```bash
  npm run preview
  ```

## Deployment to Vercel

This project is a standard Vite static app and can be deployed directly to
Vercel.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project into Vercel.
3. Vercel should detect the framework automatically.
4. Use the default settings or confirm:

   - Build command: `npm run build`
   - Output directory: `dist`

5. Deploy.

You can also deploy from the CLI with:

```bash
vercel
```

## Assessment Note

The implementation intentionally stays simple and interview-friendly. It is
structured to demonstrate component design, state handling, reusable utility
logic, loading/error UX, and responsive dashboard polish within a practical
assessment time box.
