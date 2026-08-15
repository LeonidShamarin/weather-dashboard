/**
 * Weather icons drawn inline.
 *
 * OpenWeather's own PNGs are a flat orange disc for "clear sky" and a dark
 * disc at night, which reads as a rendering bug rather than an icon. These are
 * also served over plain http, so they were blocked as mixed content on the
 * deployed https page. Drawing them here fixes both and removes one network
 * request per icon.
 */

const Sun = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="12" fill="#fbbf24" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <rect
        key={angle}
        x="31"
        y="6"
        width="2"
        height="8"
        rx="1"
        fill="#fbbf24"
        transform={`rotate(${angle} 32 32)`}
      />
    ))}
  </svg>
);

const Moon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M40 12a20 20 0 1 0 12 36 22 22 0 0 1-12-36z"
      fill="#e2e8f0"
    />
  </svg>
);

const Cloud = ({ className, fill = "#f1f5f9" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M45 48H21a11 11 0 0 1-1.6-21.9A14 14 0 0 1 46 28.6 10 10 0 0 1 45 48z"
      fill={fill}
    />
  </svg>
);

const SunCloud = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="24" cy="22" r="9" fill="#fbbf24" />
    <path
      d="M47 50H24a10 10 0 0 1-1.4-19.9A12.5 12.5 0 0 1 48 32.4 9 9 0 0 1 47 50z"
      fill="#f1f5f9"
    />
  </svg>
);

const MoonCloud = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path d="M30 10a14 14 0 1 0 9 25 15 15 0 0 1-9-25z" fill="#e2e8f0" />
    <path
      d="M47 52H24a10 10 0 0 1-1.4-19.9A12.5 12.5 0 0 1 48 34.4 9 9 0 0 1 47 52z"
      fill="#cbd5e1"
    />
  </svg>
);

const Rain = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M44 40H21a10 10 0 0 1-1.4-19.9A12.5 12.5 0 0 1 45 22.4 9 9 0 0 1 44 40z"
      fill="#e2e8f0"
    />
    {[24, 34, 44].map((x, i) => (
      <rect
        key={x}
        x={x}
        y={46 + (i % 2) * 3}
        width="3"
        height="10"
        rx="1.5"
        fill="#38bdf8"
        transform={`rotate(15 ${x} 50)`}
      />
    ))}
  </svg>
);

const Thunder = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M44 38H21a10 10 0 0 1-1.4-19.9A12.5 12.5 0 0 1 45 20.4 9 9 0 0 1 44 38z"
      fill="#cbd5e1"
    />
    <path d="M34 40l-9 14h7l-3 10 12-16h-8l4-8z" fill="#fbbf24" />
  </svg>
);

const Snow = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M44 38H21a10 10 0 0 1-1.4-19.9A12.5 12.5 0 0 1 45 20.4 9 9 0 0 1 44 38z"
      fill="#e2e8f0"
    />
    {[24, 32, 40].map((x, i) => (
      <circle key={x} cx={x} cy={48 + (i % 2) * 5} r="3" fill="#bae6fd" />
    ))}
  </svg>
);

const Fog = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M44 32H21a10 10 0 0 1-1.4-19.9A12.5 12.5 0 0 1 45 14.4 9 9 0 0 1 44 32z"
      fill="#e2e8f0"
    />
    {[40, 48, 56].map((y) => (
      <rect key={y} x="14" y={y} width="36" height="4" rx="2" fill="#cbd5e1" />
    ))}
  </svg>
);

const WeatherIcon = ({ code = "01d", className = "h-12 w-12" }) => {
  const night = code.endsWith("n");

  switch (code.slice(0, 2)) {
    case "01":
      return night ? <Moon className={className} /> : <Sun className={className} />;
    case "02":
      return night ? (
        <MoonCloud className={className} />
      ) : (
        <SunCloud className={className} />
      );
    case "03":
      return <Cloud className={className} />;
    case "04":
      return <Cloud className={className} fill="#cbd5e1" />;
    case "09":
    case "10":
      return <Rain className={className} />;
    case "11":
      return <Thunder className={className} />;
    case "13":
      return <Snow className={className} />;
    case "50":
      return <Fog className={className} />;
    default:
      return <Sun className={className} />;
  }
};

export default WeatherIcon;
