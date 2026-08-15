export const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = import.meta.env.VITE_API_URL;

export const UNITS = {
  metric: { id: "metric", label: "°C", temp: "°C", speed: "m/s" },
  imperial: { id: "imperial", label: "°F", temp: "°F", speed: "mph" },
};

/**
 * Tints laid over the backdrop photo, not solid backgrounds: the alpha keeps
 * the picture visible while the colour still says what the weather is doing,
 * and holds enough contrast for white text.
 */
const SKY_GRADIENTS = {
  clearDay: "from-sky-500/70 via-sky-600/60 to-blue-800/80",
  night: "from-slate-900/85 via-slate-900/75 to-black/90",
  clouds: "from-slate-500/75 via-slate-600/70 to-slate-800/85",
  rain: "from-slate-600/80 via-slate-700/75 to-slate-900/85",
  thunderstorm: "from-indigo-900/80 via-slate-800/80 to-slate-950/90",
  snow: "from-sky-300/70 via-slate-400/70 to-slate-600/85",
  atmosphere: "from-stone-500/75 via-stone-600/70 to-stone-800/85",
};

/** Tint for the page, chosen from OpenWeather's icon code. */
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
