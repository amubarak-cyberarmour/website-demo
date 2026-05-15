import world from "@svg-maps/world";

const locations = world.locations as Array<{ id: string; path: string }>;
const hiddenMapRegions = new Set([
  "us",
  "ca",
  "gl",
  "mx",
  "gt",
  "bz",
  "sv",
  "hn",
  "ni",
  "cr",
  "pa",
  "cu",
  "jm",
  "ht",
  "do",
  "bs",
  "tt",
  "bb",
  "ve",
  "co",
  "gy",
  "sr",
  "gf",
  "ec",
  "pe",
  "bo",
  "br",
  "py",
  "uy",
  "ar",
  "cl",
]);

const footerColumnPlaceholders = [0, 1, 2, 3];
const pakistanPin = {
  x: 671,
  y: 388,
};

export default function Footer_With_Map() {
  const [minX, minY, width, height] = world.viewBox;

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[#2f3238] bg-[#1f2023] px-6 py-14 text-[#bfc4d1] md:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3a4454_0%,#273142_42%,#1f2734_100%)]" />
        <svg
          viewBox={`${minX} ${minY} ${width} ${height}`}
          className="absolute left-[-28%] top-1/2 h-[88%] w-[96%] -translate-y-1/2 opacity-80"
          role="img"
          aria-label="World map background"
          preserveAspectRatio="xMidYMid meet"
        >
          {locations
            .filter((location) => !hiddenMapRegions.has(location.id))
            .map((location) => (
            <path
              key={location.id}
              d={location.path}
              fill="#8f97a5"
              stroke="#5f6673"
              strokeWidth={0.45}
            />
          ))}
          <g aria-label="Pakistan pin">
            <circle cx={pakistanPin.x} cy={pakistanPin.y} r={8.5} fill="#ef4444" opacity={0.22} />
            <path
              d={`M ${pakistanPin.x} ${pakistanPin.y - 12}
                  C ${pakistanPin.x - 4.7} ${pakistanPin.y - 12}, ${pakistanPin.x - 8.2} ${pakistanPin.y - 8.4}, ${pakistanPin.x - 8.2} ${pakistanPin.y - 3.7}
                  C ${pakistanPin.x - 8.2} ${pakistanPin.y + 1.8}, ${pakistanPin.x - 2.7} ${pakistanPin.y + 8.2}, ${pakistanPin.x} ${pakistanPin.y + 11.8}
                  C ${pakistanPin.x + 2.7} ${pakistanPin.y + 8.2}, ${pakistanPin.x + 8.2} ${pakistanPin.y + 1.8}, ${pakistanPin.x + 8.2} ${pakistanPin.y - 3.7}
                  C ${pakistanPin.x + 8.2} ${pakistanPin.y - 8.4}, ${pakistanPin.x + 4.7} ${pakistanPin.y - 12}, ${pakistanPin.x} ${pakistanPin.y - 12} Z`}
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth={0.9}
            />
            <circle cx={pakistanPin.x} cy={pakistanPin.y - 4} r={2.1} fill="#ffffff" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[#1f2023]/52" />
      </div>

      <div className="relative z-10">
        <section className="pointer-events-none absolute inset-0" />

        <section>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="text-right">
              <div className="mb-4 h-7" />
              <div className="h-14" />
              <div className="mt-4 h-5" />
            </div>

            <div>
              <div className="mb-4 h-6" />
              <ul className="space-y-2 text-sm">
                <li className="h-6" />
                <li className="h-6" />
                <li className="h-6" />
                <li className="h-6" />
              </ul>
            </div>

            <div>
              <div className="mb-4 h-6" />
              <ul className="space-y-2 text-sm">
                <li className="h-6" />
                <li className="h-6" />
                <li className="h-6" />
                <li className="h-6" />
              </ul>
            </div>

            <div>
              <div className="mb-4 h-6" />
              <div className="mb-4 h-6" />
              <div className="h-10" />
            </div>
          </div>

          <div className="my-10 h-px" />

          <div className="grid grid-cols-1 gap-10 text-start md:grid-cols-4">
            {footerColumnPlaceholders.map((column) => (
              <div key={column}>
                <div className="h-7" />
                <div className="h-6" />
              </div>
            ))}
          </div>

          <div className="my-8 h-px" />

          <div className="h-6" />
        </section>
      </div>
    </footer>
  );
}
