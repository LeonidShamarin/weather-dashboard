/**
 * Stand-in for src/constants/config.js under Jest.
 *
 * The real module reads `import.meta.env`, which Vite understands and Jest's
 * CommonJS transform cannot parse — the weather slice suite failed to run at
 * all because of it. jest.config.cjs maps the module here.
 */
export const API_KEY = "test-key";
export const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const UNITS = {
  metric: { id: "metric", label: "°C", temp: "°C", speed: "m/s" },
  imperial: { id: "imperial", label: "°F", temp: "°F", speed: "mph" },
};

export const skyGradient = () => "from-sky-400 via-sky-500 to-blue-600";
