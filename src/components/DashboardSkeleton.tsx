function SkeletonBlock({ className }: { className: string }) {
  return <div className={`loading-shimmer rounded-2xl bg-slate-200 ${className}`} />
}

function DashboardSkeleton() {
  return (
    <div aria-live="polite" className="space-y-6" role="status">
      <section className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <div className="dashboard-card p-6 sm:p-8">
          <SkeletonBlock className="h-7 w-36" />
          <SkeletonBlock className="mt-5 h-12 w-full max-w-xl" />
          <SkeletonBlock className="mt-4 h-5 w-full max-w-2xl" />
          <SkeletonBlock className="mt-3 h-5 w-3/4 max-w-xl" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[0, 1].map((item) => (
            <div key={item} className="dashboard-card p-5">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="mt-4 h-9 w-40" />
              <SkeletonBlock className="mt-3 h-4 w-full" />
              <SkeletonBlock className="mt-2 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="mt-3 h-4 w-72 max-w-full" />
          </div>
          <SkeletonBlock className="h-11 w-36" />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <SkeletonBlock className="h-20 w-full" />
          <SkeletonBlock className="h-20 w-full" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="dashboard-card p-5 sm:p-6">
            <SkeletonBlock className="h-6 w-28" />
            <SkeletonBlock className="mt-5 h-10 w-32" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <div className="dashboard-card p-5 sm:p-6">
          <SkeletonBlock className="h-5 w-36" />
          <SkeletonBlock className="mt-3 h-4 w-64 max-w-full" />
          <SkeletonBlock className="mt-6 h-80 w-full rounded-[24px]" />
        </div>
        <div className="dashboard-card p-5 sm:p-6">
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="mt-3 h-4 w-56 max-w-full" />
          <SkeletonBlock className="mt-6 h-80 w-full rounded-[24px]" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.45fr]">
        <div className="dashboard-card p-5 sm:p-6">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="mt-3 h-4 w-64 max-w-full" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <SkeletonBlock className="h-72 w-full rounded-[24px]" />
            <div className="space-y-4">
              {[0, 1, 2].map((item) => (
                <SkeletonBlock key={item} className="h-24 w-full" />
              ))}
            </div>
          </div>
        </div>
        <div className="dashboard-card p-5 sm:p-6">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="mt-3 h-4 w-72 max-w-full" />
          <SkeletonBlock className="mt-6 h-80 w-full rounded-[24px]" />
        </div>
      </section>
    </div>
  )
}

export default DashboardSkeleton
