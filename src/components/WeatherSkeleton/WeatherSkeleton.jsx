/** Keeps the layout in place while a city loads, instead of a bare spinner. */
const WeatherSkeleton = () => (
  <div className="animate-pulse">
    <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-7">
      <div className="h-7 w-40 rounded bg-white/20" />
      <div className="mt-6 flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-white/20" />
        <div className="space-y-3">
          <div className="h-12 w-32 rounded bg-white/20" />
          <div className="h-4 w-24 rounded bg-white/15" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-14 rounded-xl bg-white/15" />
        ))}
      </div>
    </div>

    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="h-40 rounded-xl bg-white/15" />
      ))}
    </div>
  </div>
);

export default WeatherSkeleton;
