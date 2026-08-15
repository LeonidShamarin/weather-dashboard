import { useDispatch, useSelector } from "react-redux";
import { setUnits } from "../../redux/slices/unitsSlice";
import { skyGradient } from "../../constants/config";

const Layout = ({ children, iconCode }) => {
  const dispatch = useDispatch();
  const units = useSelector((state) => state.units);

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-b ${skyGradient(
        iconCode
      )} text-white transition-colors duration-700`}
    >
      <header className="border-b border-white/15 bg-black/10 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4">
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            Weather Dashboard
          </h1>

          <div className="ml-auto flex rounded-full border border-white/25 p-0.5 text-sm">
            {["metric", "imperial"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => dispatch(setUnits(id))}
                aria-pressed={units === id}
                className={`rounded-full px-3 py-1 transition ${
                  units === id
                    ? "bg-white text-slate-900"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {id === "metric" ? "°C" : "°F"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">
        {children}
      </main>

      <footer className="border-t border-white/15 bg-black/10 px-4 py-5 text-center text-sm text-white/70">
        Data from OpenWeather · © {new Date().getFullYear()} Leonid Shamarin
      </footer>
    </div>
  );
};

export default Layout;
