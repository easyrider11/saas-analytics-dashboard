interface ErrorStateProps {
  onRetry: () => void
}

function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <section className="dashboard-card mx-auto max-w-3xl p-6 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl text-rose-600">
        !
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Unable to load dashboard data
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        A simulated analytics service error interrupted the dashboard render.
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This assessment state demonstrates how the UI responds to a recoverable
        failure without leaving the user stranded.
      </p>

      <div className="mt-8 rounded-3xl border border-rose-100 bg-rose-50/70 p-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
          Error message
        </p>
        <p className="mt-3 text-sm font-medium text-slate-700">
          Simulated request failed: dashboard metrics could not be prepared for
          display.
        </p>
      </div>

      <button
        type="button"
        className="mt-8 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        onClick={onRetry}
      >
        Retry dashboard
      </button>
    </section>
  )
}

export default ErrorState
