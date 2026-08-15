import { UNITS } from "../constants/config";

export const formatTemperature = (temp, units = "metric") =>
  `${Math.round(temp)}${UNITS[units].temp}`;

export const formatSpeed = (speed, units = "metric") =>
  `${Math.round(speed * 10) / 10} ${UNITS[units].speed}`;

export const formatDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

/** Local time of a place, using the offset the API reports for it. */
export const formatCityTime = (timestamp, timezoneOffset = 0) =>
  new Date((timestamp + timezoneOffset) * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

export const formatHour = (timestamp) =>
  new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const groupForecastByDay = (forecastList = []) =>
  forecastList.reduce((days, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    (days[date] = days[date] || []).push(item);
    return days;
  }, {});

/**
 * One entry per day with its real minimum and maximum, and the icon of the
 * slot closest to midday — the previous version averaged the temperatures and
 * took whichever icon happened to come first, which for today is the next
 * three-hour slot rather than anything representative.
 */
export const summariseDays = (forecastList = [], limit = 5) =>
  Object.values(groupForecastByDay(forecastList))
    .map((slots) => {
      const temps = slots.map((slot) => slot.main.temp);
      const midday = slots.reduce((closest, slot) => {
        const hour = new Date(slot.dt * 1000).getHours();
        const closestHour = new Date(closest.dt * 1000).getHours();
        return Math.abs(hour - 13) < Math.abs(closestHour - 13) ? slot : closest;
      }, slots[0]);

      return {
        dt: slots[0].dt,
        date: formatDate(slots[0].dt),
        min: Math.min(...temps),
        max: Math.max(...temps),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      };
    })
    .slice(0, limit);

export const nextHours = (forecastList = [], count = 8) =>
  forecastList.slice(0, count).map((slot) => ({
    dt: slot.dt,
    time: formatHour(slot.dt),
    temp: slot.main.temp,
    icon: slot.weather[0].icon,
    description: slot.weather[0].description,
    pop: Math.round((slot.pop ?? 0) * 100),
  }));
