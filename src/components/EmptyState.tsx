interface EmptyStateProps {
  title?: string
  message?: string
}

function EmptyState({
  title = 'No data available',
  message = 'Try adjusting your filters to see more results.',
}: EmptyStateProps) {
  return (
    <section className="dashboard-card col-span-full flex flex-col items-center justify-center py-16">
      <svg
        className="mb-3 h-10 w-10 text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
        />
      </svg>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-xs text-slate-400">{message}</p>
    </section>
  )
}

export default EmptyState
