export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-amber-200 bg-white px-5 py-4">
        <div>
          <h1 className="text-2xl font-bold">Cat Passport</h1>
          <p className="text-sm text-slate-600">
            Every community cat has a story.
          </p>
        </div>

        <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium">
          Guest
        </button>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-6">
        <div className="rounded-3xl bg-teal-700 p-6 text-white shadow-lg">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider">
            Your neighbourhood cat guide
          </p>

          <h2 className="max-w-xl text-3xl font-bold leading-tight">
            Discover the community cats living near you.
          </h2>

          <p className="mt-3 max-w-xl text-teal-50">
            Find local cat celebrities, view their Passports, and add sightings
            when you meet them.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-5 py-3 font-semibold text-teal-800">
              Find Nearby Cats
            </button>

            <button className="rounded-full border border-white px-5 py-3 font-semibold text-white">
              Add a Cat
            </button>
          </div>
        </div>

        <div className="flex min-h-[420px] items-center justify-center rounded-3xl border-2 border-dashed border-teal-300 bg-teal-50">
          <div className="text-center">
            <p className="text-5xl">🗺️</p>
            <h3 className="mt-4 text-xl font-bold">UAE Map</h3>
            <p className="mt-2 text-sm text-slate-600">
              Nearby community cats will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}