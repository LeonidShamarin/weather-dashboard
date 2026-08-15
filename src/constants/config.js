export const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = import.meta.env.VITE_API_URL;

export const UNITS = {
  metric: { id: "metric", label: "°C", temp: "°C", speed: "m/s" },
  imperial: { id: "imperial", label: "°F", temp: "°F", speed: "mph" },
};

const SKY_GRADIENTS = {
  clearDay: "from-sky-400 via-sky-500 to-blue-600",
  night: "from-slate-800 via-slate-900 to-slate-950",
  clouds: "from-slate-400 via-slate-500 to-slate-700",
  rain: "from-slate-500 via-slate-600 to-slate-800",
  thunderstorm: "from-indigo-800 via-slate-800 to-slate-900",
  snow: "from-sky-200 via-slate-300 to-slate-500",
  atmosphere: "from-stone-400 via-stone-500 to-stone-600",
};

/** Background for the page, chosen from OpenWeather's icon code. */
export function skyGradient(iconCode = "01d") {
  const isNight = iconCode.endsWith("n");
  const group = iconCode.slice(0, 2);

  if (isNight && ["01", "02", "03", "04"].includes(group)) {
    return SKY_GRADIENTS.night;
  }

  switch (group) {
    case "01":
      return SKY_GRADIENTS.clearDay;
    case "02":
    case "03":
    case "04":
      return SKY_GRADIENTS.clouds;
    case "09":
    case "10":
      return SKY_GRADIENTS.rain;
    case "11":
      return SKY_GRADIENTS.thunderstorm;
    case "13":
      return SKY_GRADIENTS.snow;
    case "50":
      return SKY_GRADIENTS.atmosphere;
    default:
      return SKY_GRADIENTS.clearDay;
  }
}
