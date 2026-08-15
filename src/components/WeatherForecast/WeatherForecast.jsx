import { useSelector } from "react-redux";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { formatTemperature, summariseDays } from "../../utils/helpers";

const WeatherForecast = () => {
  const { forecast } = useSelector((state) => state.weather);
  const units = useSelector((state) => state.units);

  if (!forecast?.list?.length) return null;
  const days = summariseDays(forecast.list, 5);

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">5-day forecast</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {days.map((day) => (
          <div
            key={day.dt}
            className="rounded-xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur"
          >
            <div className="text-sm font-medium">{day.date}</div>
            <WeatherIcon code={day.icon} className="mx-auto h-14 w-14" />
            {/* Real min and max for the day, not the average of every slot. */}
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-xl font-semibold">
                {formatTemperature(day.max, units)}
              </span>
              <span className="text-sm text-white/70">
                {formatTemperature(day.min, units)}
              </span>
            </div>
            <div className="mt-1 text-xs capitalize text-white/75">
              {day.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherForecast;
