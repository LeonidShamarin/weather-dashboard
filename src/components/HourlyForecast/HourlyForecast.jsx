import { useSelector } from "react-redux";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { formatTemperature, nextHours } from "../../utils/helpers";

/**
 * The next 24 hours, taken from the same five-day payload the forecast already
 * uses — eight three-hour slots, so it costs no extra request.
 */
const HourlyForecast = () => {
  const { forecast } = useSelector((state) => state.weather);
  const units = useSelector((state) => state.units);

  if (!forecast?.list?.length) return null;
  const hours = nextHours(forecast.list, 8);

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-lg font-semibold">Next 24 hours</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hours.map((hour) => (
          <div
            key={hour.dt}
            className="flex min-w-[104px] flex-col items-center rounded-xl border border-white/15 bg-white/10 px-3 py-3 backdrop-blur"
          >
            <div className="text-sm text-white/80">{hour.time}</div>
            <WeatherIcon code={hour.icon} className="h-12 w-12" />
            <div className="font-semibold">
              {formatTemperature(hour.temp, units)}
            </div>
            <div className="text-xs text-white/70">
              {hour.pop > 0 ? `${hour.pop}% rain` : "—"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyForecast;
