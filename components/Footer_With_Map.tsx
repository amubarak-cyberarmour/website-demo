"use client";

import { FormEvent, useState } from "react";
import world from "@svg-maps/world";
import { apiUrl } from "@/lib/apiClient";

const locations = world.locations as Array<{ id: string; path: string }>;

const hiddenMapRegions = new Set([
  "us", "ca", "gl", "mx", "gt", "bz", "sv", "hn", "ni", "cr", "pa",
  "cu", "jm", "ht", "do", "bs", "tt", "bb", "ve", "co", "gy", "sr",
  "gf", "ec", "pe", "bo", "br", "py", "uy", "ar", "cl",
]);

const highlightCountries = new Set(["pk", "gb", "hk", "ae"]);

const pins = [
  { id: "pk", label: "Pakistan",       x: 669, y: 373 },
  { id: "gb", label: "United Kingdom", x: 466, y: 274 },
  { id: "hk", label: "Hong Kong",      x: 795, y: 399 },
  { id: "ae", label: "UAE",            x: 626, y: 393 },
];

function Pin({ x, y, label, onEnter, onLeave }: {
  x: number; y: number; label: string;
  onEnter: () => void; onLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ph = 25;

  return (
    <g
      aria-label={`${label} office location`}
      style={{ cursor: "pointer" }}
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
    >
      {/* hit area */}
      <circle cx={x} cy={y - ph / 2} r={20} fill="transparent" />
      {/* glow */}
      <circle cx={x} cy={y} r={16} fill="#8fb4ff" opacity={hovered ? 0.26 : 0.14}
        style={{ transition: "opacity 0.25s" }} />
      {/* pin icon */}
      <path
        d={`M ${x} ${y}
            C ${x - 8.4} ${y - 9.2}, ${x - 9.1} ${y - 17.2}, ${x} ${y - ph}
            C ${x + 9.1} ${y - 17.2}, ${x + 8.4} ${y - 9.2}, ${x} ${y} Z`}
        fill="#8fb4ff"
        stroke="#d6e4ff"
        strokeWidth={1.15}
        opacity={hovered ? 1 : 0.85}
        style={{ transition: "opacity 0.2s" }}
      />
      {/* inner dot */}
      <circle cx={x} cy={y - ph + 8.2} r={3.1} fill="#1f2023" opacity={0.95} />
      {/* tooltip */}
      {hovered && (
        <g>
          <rect
            x={x - label.length * 3.6 - 8}
            y={y - ph - 26}
            width={label.length * 7.2 + 16}
            height={20}
            rx={3}
            fill="rgba(10,14,22,0.92)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={0.5}
          />
          <text
            x={x}
            y={y - ph - 11}
            textAnchor="middle"
            fill="#c8d4e4"
            fontSize={10}
            fontFamily="'Josefin Sans', sans-serif"
            letterSpacing="0.08em"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export default function Footer_With_Map() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [minX, minY, width, height] = world.viewBox;

  const onNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = email.trim();
    if (!value) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(apiUrl("/api/newsletter"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });

      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Unable to subscribe right now.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Subscribed successfully.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe right now.");
    }
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[#2f3238] bg-[#1f2023] px-6 py-14 text-[#bfc4d1] md:px-20"
    >
      {/* Background layer */}
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3a4454_0%,#273142_42%,#1f2734_100%)]" />
        <svg
          viewBox={`${minX} ${minY} ${width} ${height}`}
          className="pointer-events-auto absolute left-[-25%] top-1/2 h-[88%] w-[96%] -translate-y-1/2 opacity-80"
          role="img"
          aria-label="World map background"
          preserveAspectRatio="xMidYMid meet"
        >
          {locations
            .filter((loc) => !hiddenMapRegions.has(loc.id))
            .map((loc) => {
              const isHighlight = highlightCountries.has(loc.id);
              const isHovered =
                hoveredCountry === loc.id ||
                (hoveredCountry === "hk" && loc.id === "cn");
              const shouldFill = (isHighlight || loc.id === "cn") && isHovered;
              return (
                <path
                  key={loc.id}
                  d={loc.path}
                  fill={shouldFill ? "#ffffff" : "#8f97a5"}
                  stroke={shouldFill ? "#ffffff" : "#5f6673"}
                  strokeWidth={shouldFill ? 0.7 : 0.45}
                  style={{
                    transition: isHighlight || loc.id === "cn" ? "fill 0.35s ease, filter 0.35s ease" : undefined,
                    opacity: shouldFill ? 1 : 1,
                    filter: shouldFill
                      ? "drop-shadow(0 0 1px rgba(0,0,0,0.95)) drop-shadow(0 0 5px rgba(0,0,0,0.85)) drop-shadow(0 0 9px rgba(255,255,255,0.75))"
                      : undefined,
                  }}
                />
              );
            })}

          {/* Pins — rendered on top of countries */}
          {pins.map((pin) => (
            <Pin
              key={pin.id}
              x={pin.x}
              y={pin.y}
              label={pin.label}
              onEnter={() => setHoveredCountry(pin.id)}
              onLeave={() => setHoveredCountry(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-[#1f2023]/52" />
      </div>

      {/* Foreground content in non-land (right-side) area */}
      <div className="pointer-events-none relative z-10">
        <section className="ml-auto w-full max-w-[660px] pointer-events-auto border-l border-white/10 bg-[linear-gradient(90deg,rgba(31,32,35,0.15)_0%,rgba(31,32,35,0.78)_16%,rgba(31,32,35,0.92)_100%)] p-6 md:p-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-xl font-semibold text-white">CyberArmour</h2>
              <p className="text-sm leading-relaxed text-[#d4d7df]">
                xyz,<br />
                xyz Islamabad
              </p>
              <a
                href="mailto:info@cyberarmour.pk"
                className="mt-4 inline-block text-sm text-[#8fb4ff] transition-colors hover:text-white"
              >
                info@cyberarmour.pk
              </a>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm text-[#d4d7df]">
                <li><a href="#hero" className="transition-colors hover:text-white">Home</a></li>
                <li><a href="#about" className="transition-colors hover:text-white">About</a></li>
                <li><a href="#services" className="transition-colors hover:text-white">Services</a></li>
                <li><a href="#contact" className="transition-colors hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">Services</h3>
              <ul className="space-y-2 text-sm text-[#d4d7df]">
                <li>Consulting &amp; Design</li>
                <li>System Integration</li>
                <li>Operation &amp; Maintenance</li>
                <li>Data Governance</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">Newsletter</h3>
              <p className="mb-3 text-sm text-[#d4d7df]">Subscribe for updates and insights</p>
              <form onSubmit={onNewsletterSubmit}>
                <div className="flex items-stretch overflow-hidden rounded-[14px] border border-white/28 bg-white/10">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 min-h-12 min-w-0 flex-1 bg-transparent px-4 text-base leading-none text-white outline-none placeholder:text-[#c2c7d4]"
                    aria-label="Newsletter email address"
                    autoComplete="email"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative z-10 grid h-12 w-[56px] shrink-0 place-items-center border-l border-white/25 bg-black text-[22px] font-semibold leading-none text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Submit newsletter subscription"
                  >
                    {status === "loading" ? "..." : "→"}
                  </button>
                </div>
                {message ? (
                  <p
                    className={`mt-2 text-xs ${status === "success" ? "text-emerald-300" : "text-red-300"}`}
                    role="status"
                    aria-live="polite"
                  >
                    {message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>

          <div className="my-7 border-t border-white/10" />

          <div className="grid grid-cols-2 gap-y-5 text-start md:flex md:justify-between md:gap-8">
            <div
              onMouseEnter={() => setHoveredCountry("pk")}
              onMouseLeave={() => setHoveredCountry(null)}
              className="group cursor-pointer"
            >
              <p className="font-semibold text-white transition-colors group-hover:text-[#8fb4ff]">Pakistan</p>
              <p className="text-sm text-[#d4d7df] transition-colors group-hover:text-[#8fb4ff]">Islamabad</p>
            </div>
            <div
              onMouseEnter={() => setHoveredCountry("gb")}
              onMouseLeave={() => setHoveredCountry(null)}
              className="group cursor-pointer"
            >
              <p className="font-semibold text-white transition-colors group-hover:text-[#8fb4ff]">United Kingdom</p>
              <p className="text-sm text-[#d4d7df] transition-colors group-hover:text-[#8fb4ff]">London</p>
            </div>
            <div
              onMouseEnter={() => setHoveredCountry("hk")}
              onMouseLeave={() => setHoveredCountry(null)}
              className="group cursor-pointer"
            >
              <p className="font-semibold text-white transition-colors group-hover:text-[#8fb4ff]">Hong Kong</p>
              <p className="text-sm text-[#d4d7df] transition-colors group-hover:text-[#8fb4ff]">S.A.R China</p>
            </div>
            <div
              onMouseEnter={() => setHoveredCountry("ae")}
              onMouseLeave={() => setHoveredCountry(null)}
              className="group cursor-pointer"
            >
              <p className="font-semibold text-white transition-colors group-hover:text-[#8fb4ff]">United Arab Emirates</p>
              <p className="text-sm text-[#d4d7df] transition-colors group-hover:text-[#8fb4ff]">Ajman</p>
            </div>
          </div>

          <div className="my-6 border-t border-white/10" />

          <div className="text-sm text-[#d4d7df]">
            © 2026 CyberArmour Pvt Ltd. All rights reserved.
          </div>
        </section>
      </div>
    </footer>
  );
}
