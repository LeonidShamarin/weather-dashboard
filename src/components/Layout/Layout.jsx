import { useDispatch, useSelector } from "react-redux";
import { setUnits } from "../../redux/slices/unitsSlice";
import { skyGradient } from "../../constants/config";

const Layout = ({ children, iconCode }) => {
  const dispatch = useDispatch();
  const units = useSelector((state) => state.units);

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      {/* Photo and tint are fixed layers rather than a background on the page
          itself, so they cover the viewport at any size and do not stretch
          with the content. The photo is one 193 KB file for every condition;
          the tint above it carries the weather. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/backdrop.jpg)" }}
      />
      <div
        aria-hidden="true"
        className={`fixed inset-0 bg-gradient-to-b ${skyGradient(
          iconCode
        )} transition-colors duration-700`}
      />

      <header className="relative border-b border-white/15 bg-black/20 backdrop-blur">
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

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">
        {children}
      </main>

      <footer className="relative border-t border-white/15 bg-black/20 px-4 py-5 text-center text-sm text-white/80">
        Data from OpenWeather · © {new Date().getFullYear()} Leonid Shamarin
      </footer>
    </div>
  );
};

export default Layout;
