import { useState } from "react";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = city.trim();
    if (name) {
      setGeoError("");
      onSearch({ city: name });
    }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setGeoError("This browser cannot report a location.");
      return;
    }

    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        onSearch({ lat: coords.latitude, lon: coords.longitude });
      },
      () => {
        setLocating(false);
        setGeoError("Location permission denied — search by name instead.");
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city…"
            aria-label="City name"
            className="w-full rounded-xl border border-white/20 bg-white/95 py-3 pl-10 pr-3 text-slate-900 placeholder-slate-400 shadow-lg outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 shadow-lg transition hover:bg-white/90"
        >
          Search
        </button>

        {/* The obvious missing feature for a weather app: no typing at all. */}
        <button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
        >
          <MapPinIcon className="h-5 w-5" />
          {locating ? "Locating…" : "My location"}
        </button>
      </form>

      {geoError && (
        <p className="mt-2 text-center text-sm text-white/90">{geoError}</p>
      )}
    </div>
  );
};

export default WeatherSearch;
