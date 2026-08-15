import { useSelector, useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

import { addToFavorites, removeFromFavorites } from "../../redux/slices/favoritesSlice";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import {
  formatTemperature,
  formatSpeed,
  formatCityTime,
} from "../../utils/helpers";

const Stat = ({ label, value }) => (
  <div className="rounded-xl bg-white/10 px-3 py-2">
    <div className="text-xs uppercase tracking-wide text-white/70">{label}</div>
    <div className="mt-0.5 font-medium">{value}</div>
  </div>
);

const WeatherDisplay = () => {
  const dispatch = useDispatch();
  const { currentWeather } = useSelector((state) => state.weather);
  const units = useSelector((state) => state.units);
  const favorites = useSelector((state) => state.favorites);

  if (!currentWeather) return null;

  const { name, sys, main, wind, weather, visibility, timezone, dt } =
    currentWeather;
  const condition = weather[0];
  const isFavorite = favorites.some((city) => city.id === currentWeather.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(currentWeather.id));
    } else {
      dispatch(addToFavorites(currentWeather));
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur sm:p-7">
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {name}
            {sys?.country && (
              <span className="ml-2 text-lg text-white/70">{sys.country}</span>
            )}
          </h2>
          <p className="text-sm text-white/70">
            Local time {formatCityTime(dt, timezone)}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleFavorite}
          className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/30 px-3 py-2 text-sm transition hover:bg-white/15"
        >
          {isFavorite ? (
            <StarSolid className="h-5 w-5 text-amber-300" />
          ) : (
            <StarIcon className="h-5 w-5" />
          )}
          {isFavorite ? "In favorites" : "Add to favorites"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <WeatherIcon code={condition.icon} className="h-24 w-24 drop-shadow" />
        <div>
          <div className="text-6xl font-semibold leading-none">
            {formatTemperature(main.temp, units)}
          </div>
          <div className="mt-2 capitalize text-white/90">
            {condition.description}
          </div>
          <div className="text-sm text-white/70">
            Feels like {formatTemperature(main.feels_like, units)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Humidity" value={`${main.humidity}%`} />
        <Stat label="Wind" value={formatSpeed(wind.speed, units)} />
        <Stat label="Pressure" value={`${main.pressure} hPa`} />
        <Stat
          label="Visibility"
          value={visibility ? `${Math.round(visibility / 100) / 10} km` : "—"}
        />
        <Stat label="Sunrise" value={formatCityTime(sys.sunrise, timezone)} />
        <Stat label="Sunset" value={formatCityTime(sys.sunset, timezone)} />
      </div>
    </section>
  );
};

export default WeatherDisplay;
