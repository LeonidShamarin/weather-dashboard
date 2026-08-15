import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ExclamationTriangleIcon, SunIcon } from "@heroicons/react/24/outline";

import store from "./redux/store";
import Layout from "./components/Layout/Layout";
import WeatherSearch from "./components/WeatherSearch/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import FavoritesList from "./components/FavoritesList/FavoritesList";
import WeatherSkeleton from "./components/WeatherSkeleton/WeatherSkeleton";
import { fetchWeatherData } from "./redux/slices/weatherSlice";

const SUGGESTIONS = ["Lviv", "Kyiv", "London", "Tokyo", "New York"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const units = useSelector((state) => state.units);
  const { currentWeather, loading, error } = useSelector((state) => state.weather);
  // The last thing asked for, so switching °C/°F can repeat it.
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) dispatch(fetchWeatherData({ ...query, units }));
  }, [dispatch, query, units]);

  const iconCode = currentWeather?.weather?.[0]?.icon;

  return (
    <Layout iconCode={iconCode}>
      <WeatherSearch onSearch={setQuery} />

      {error && (
        <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-white/20 bg-black/20 p-4">
          <ExclamationTriangleIcon className="h-6 w-6 shrink-0 text-amber-300" />
          <div>
            <p className="font-medium capitalize">{error}</p>
            <p className="text-sm text-white/75">
              Check the spelling, or try a nearby larger city.
            </p>
          </div>
        </div>
      )}

      {loading && <WeatherSkeleton />}

      {!loading && !currentWeather && !error && (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur">
          <SunIcon className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-3 text-xl font-semibold">Pick a place to start</h2>
          <p className="mt-1 text-white/75">
            Search for a city, use your location, or try one of these:
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setQuery({ city })}
                className="rounded-full border border-white/30 px-4 py-1.5 text-sm transition hover:bg-white/20"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && currentWeather && (
        <>
          <WeatherDisplay />
          <HourlyForecast />
          <WeatherForecast />
        </>
      )}

      <FavoritesList onSelect={(city) => setQuery({ city })} />
    </Layout>
  );
};

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

export default App;
