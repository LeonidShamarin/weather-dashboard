import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { removeFromFavorites } from "../../redux/slices/favoritesSlice";
import { fetchWeatherByCity } from "../../services/weatherApi";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { formatTemperature } from "../../utils/helpers";

const FavoritesList = ({ onSelect }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const units = useSelector((state) => state.units);
  const [live, setLive] = useState({});

  // Favourites used to display the temperature captured when the city was
  // added and never changed it. Their current weather is fetched here, once
  // per list or unit change.
  useEffect(() => {
    let cancelled = false;
    if (favorites.length === 0) {
      setLive({});
      return undefined;
    }

    Promise.all(
      favorites.map((city) =>
        fetchWeatherByCity(city.name, units)
          .then((data) => [city.id, data])
          .catch(() => [city.id, null])
      )
    ).then((entries) => {
      if (!cancelled) setLive(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
    };
  }, [favorites, units]);

  if (favorites.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">Favorites</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((city) => {
          const weather = live[city.id];
          return (
            <div
              key={city.id}
              className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur transition hover:bg-white/20"
            >
              <button
                type="button"
                onClick={() => onSelect(city.name)}
                className="flex flex-1 items-center gap-3 text-left"
              >
                {weather ? (
                  <WeatherIcon
                    code={weather.weather[0].icon}
                    className="h-10 w-10"
                  />
                ) : (
                  <span className="h-10 w-10 animate-pulse rounded-full bg-white/20" />
                )}
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {city.name}
                    {city.country && (
                      <span className="ml-1 text-white/60">{city.country}</span>
                    )}
                  </span>
                  <span className="block text-sm text-white/75">
                    {weather
                      ? `${formatTemperature(weather.main.temp, units)} · ${weather.weather[0].description}`
                      : "Loading…"}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => dispatch(removeFromFavorites(city.id))}
                aria-label={`Remove ${city.name} from favorites`}
                className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/20 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FavoritesList;
