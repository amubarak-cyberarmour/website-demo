"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

type Office = {
  city: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
  highlightCountry: string;
};

type CountryFeature = GeoJSON.Feature<GeoJSON.Geometry, { name?: string }>;

const offices: Office[] = [
  { city: "Islamabad", country: "Pakistan", flag: "🇵🇰", lat: 33.7, lon: 73.1, highlightCountry: "Pakistan" },
  { city: "Ajman", country: "UAE", flag: "🇦🇪", lat: 25.4, lon: 55.4, highlightCountry: "United Arab Emirates" },
  { city: "London", country: "United Kingdom", flag: "🇬🇧", lat: 51.5, lon: -0.1, highlightCountry: "United Kingdom" },
  { city: "Hong Kong", country: "SAR China", flag: "🇭🇰", lat: 22.3, lon: 114.2, highlightCountry: "China" },
];

const nameMap: Record<number, string> = {
  4: "Afghanistan", 8: "Albania", 12: "Algeria", 24: "Angola", 32: "Argentina", 36: "Australia",
  40: "Austria", 50: "Bangladesh", 56: "Belgium", 64: "Bhutan", 68: "Bolivia", 76: "Brazil",
  100: "Bulgaria", 116: "Cambodia", 120: "Cameroon", 124: "Canada", 144: "Sri Lanka", 152: "Chile",
  156: "China", 170: "Colombia", 180: "DRC", 188: "Costa Rica", 192: "Cuba", 203: "Czech Republic",
  208: "Denmark", 218: "Ecuador", 818: "Egypt", 231: "Ethiopia", 246: "Finland", 250: "France",
  276: "Germany", 288: "Ghana", 300: "Greece", 320: "Guatemala", 332: "Haiti", 340: "Honduras",
  348: "Hungary", 356: "India", 360: "Indonesia", 364: "Iran", 368: "Iraq", 372: "Ireland",
  376: "Israel", 380: "Italy", 388: "Jamaica", 392: "Japan", 400: "Jordan", 398: "Kazakhstan",
  404: "Kenya", 410: "South Korea", 414: "Kuwait", 418: "Laos", 422: "Lebanon", 434: "Libya",
  484: "Mexico", 504: "Morocco", 508: "Mozambique", 524: "Nepal", 528: "Netherlands",
  558: "Nicaragua", 566: "Nigeria", 578: "Norway", 586: "Pakistan", 591: "Panama",
  604: "Peru", 608: "Philippines", 616: "Poland", 620: "Portugal", 642: "Romania",
  643: "Russia", 682: "Saudi Arabia", 686: "Senegal", 694: "Sierra Leone", 703: "Slovakia",
  706: "Somalia", 710: "South Africa", 724: "Spain", 729: "Sudan", 752: "Sweden", 756: "Switzerland",
  760: "Syria", 764: "Thailand", 788: "Tunisia", 792: "Turkey", 800: "Uganda", 804: "Ukraine",
  784: "United Arab Emirates", 826: "United Kingdom", 840: "United States of America",
  858: "Uruguay", 860: "Uzbekistan", 704: "Vietnam", 887: "Yemen", 894: "Zambia", 716: "Zimbabwe",
};

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function normAngle(a: number) {
  let value = a;
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
}

export default function Globe_Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeOffice, setActiveOffice] = useState<number>(-1);
  const [isMapReady, setIsMapReady] = useState(false);
  const activeOfficeRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = 200;

    let rotLon = -20;
    let rotLat = -15;
    let targetLon = rotLon;
    let targetLat = rotLat;
    let easeStartLon = rotLon;
    let easeStartLat = rotLat;
    let easeT = 1;
    let hovering = false;
    let pulse = 0;
    let frameId = 0;
    let mounted = true;

    let worldData: CountryFeature[] = [];

    const projection = () =>
      d3
        .geoOrthographic()
        .scale(R)
        .translate([cx, cy])
        .clipAngle(90)
        .rotate([rotLon, rotLat, 0]);

    const geoPath = d3.geoPath().context(ctx);

    const targetForOffice = (index: number) => {
      const office = offices[index];
      return { lon: -office.lon + 5, lat: -office.lat * 0.6 };
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, W, H);
      const proj = projection();
      geoPath.projection(proj);

      const sphere = { type: "Sphere" } as d3.GeoPermissibleObjects;

      const bgGrad = ctx.createRadialGradient(cx - 55, cy - 55, 15, cx, cy, R);
      bgGrad.addColorStop(0, "#dde6fb");
      bgGrad.addColorStop(0.6, "#c6d3f0");
      bgGrad.addColorStop(1, "#aebfdf");
      ctx.beginPath();
      geoPath(sphere);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      const graticule = d3.geoGraticule()();
      if (graticule) {
        ctx.beginPath();
        geoPath(graticule as GeoJSON.Geometry);
        ctx.strokeStyle = "rgba(14, 18, 41, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      worldData.forEach((country) => {
        const isActiveCountry =
          activeOfficeRef.current >= 0 &&
          country.properties?.name === offices[activeOfficeRef.current]?.highlightCountry;

        ctx.beginPath();
        geoPath(country);
        if (isActiveCountry) {
          ctx.fillStyle = "rgba(185,241,109,0.65)";
          ctx.strokeStyle = "rgba(50,61,104,0.8)";
          ctx.lineWidth = 1.2;
        } else {
          ctx.fillStyle = "rgba(50,61,104,0.5)";
          ctx.strokeStyle = "rgba(14,18,41,0.22)";
          ctx.lineWidth = 0.5;
        }
        ctx.fill();
        ctx.stroke();
      });

      ctx.beginPath();
      geoPath(sphere);
      ctx.strokeStyle = "rgba(50,61,104,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const atmo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.15);
      atmo.addColorStop(0, "rgba(50,61,104,0)");
      atmo.addColorStop(0.5, "rgba(50,61,104,0.12)");
      atmo.addColorStop(1, "rgba(50,61,104,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      pulse += 0.055;
      for (let i = 0; i < offices.length; i += 1) {
        const office = offices[i];
        const projected = proj([office.lon, office.lat]);
        if (!projected) continue;

        const [px, py] = projected;
        const geoDistance = d3.geoDistance([office.lon, office.lat], [-rotLon, -rotLat]);
        if (geoDistance > Math.PI / 2) continue;

        const isActivePin = activeOfficeRef.current === i;
        const pinRadius = isActivePin ? 5.5 : 3.5;

        if (isActivePin) {
          const pulseSize = 13 + Math.sin(pulse * 2) * 4;
          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, pulseSize);
          pulseGrad.addColorStop(0, "rgba(185,241,109,0.42)");
          pulseGrad.addColorStop(1, "rgba(185,241,109,0)");
          ctx.beginPath();
          ctx.arc(px, py, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = pulseGrad;
          ctx.fill();

          const ring = 9 + Math.sin(pulse * 2 + 1) * 3;
          ctx.beginPath();
          ctx.arc(px, py, ring, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(50,61,104,0.35)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, pinRadius, 0, Math.PI * 2);
        ctx.fillStyle = isActivePin ? "#b9f16d" : "rgba(245,245,245,0.95)";
        ctx.fill();
        ctx.strokeStyle = isActivePin ? "rgba(14,18,41,0.85)" : "rgba(14,18,41,0.3)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const shine = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.4, 0, cx - R * 0.2, cy - R * 0.2, R * 0.7);
      shine.addColorStop(0, "rgba(255,255,255,0.25)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      geoPath(sphere);
      ctx.fillStyle = shine;
      ctx.fill();
    };

    const animate = () => {
      if (!hovering) {
        rotLon -= 0.18;
      } else if (easeT < 1) {
        easeT = Math.min(1, easeT + 0.022);
        const t = easeInOut(easeT);
        rotLon = easeStartLon + normAngle(targetLon - easeStartLon) * t;
        rotLat = easeStartLat + normAngle(targetLat - easeStartLat) * t;
      }

      drawFrame();
      frameId = requestAnimationFrame(animate);
    };

    const load = async () => {
      const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
      const topo = await res.json();
      const countries = feature(topo, topo.objects.countries);
      if (!("features" in countries)) return;
      const fc = countries as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry, { name?: string }>;
      worldData = fc.features.map((country) => {
        const id = Number(country.id);
        return {
          ...country,
          properties: {
            ...country.properties,
            name: nameMap[id] || country.properties?.name || "",
          },
        };
      });

      if (!mounted) return;
      setIsMapReady(true);
      animate();
    };

    void load();

    const enterOffice = (index: number) => {
      hovering = true;
      activeOfficeRef.current = index;
      setActiveOffice(index);
      const target = targetForOffice(index);
      targetLon = target.lon;
      targetLat = target.lat;
      easeStartLon = rotLon;
      easeStartLat = rotLat;
      easeT = 0;
    };

    const leaveOffice = () => {
      hovering = false;
      activeOfficeRef.current = -1;
      setActiveOffice(-1);
    };

    (canvas as HTMLCanvasElement & {
      __enterOffice?: (index: number) => void;
      __leaveOffice?: () => void;
    }).__enterOffice = enterOffice;
    (canvas as HTMLCanvasElement & {
      __enterOffice?: (index: number) => void;
      __leaveOffice?: () => void;
    }).__leaveOffice = leaveOffice;

    return () => {
      mounted = false;
      cancelAnimationFrame(frameId);
    };
  }, []);

  const onOfficeEnter = (index: number) => {
    const canvas = canvasRef.current as (HTMLCanvasElement & {
      __enterOffice?: (officeIndex: number) => void;
    }) | null;
    canvas?.__enterOffice?.(index);
  };

  const onOfficeLeave = () => {
    const canvas = canvasRef.current as (HTMLCanvasElement & {
      __leaveOffice?: () => void;
    }) | null;
    canvas?.__leaveOffice?.();
  };

  return (
    <footer id="contact" className="border-t border-[var(--line)] bg-[var(--paper)] pb-8 text-[var(--muted)]">
      <div className="relative z-10 flex items-center justify-between px-6 pb-0 pt-8 md:px-12">
        <div className="font-[syne] text-lg font-extrabold tracking-[-0.02em] text-[var(--ink)]">CYBERARMOUR</div>
        <ul className="hidden list-none items-center gap-8 text-[13px] text-[var(--muted)] md:flex">
          <li><a className="transition-colors hover:text-[var(--ink)]" href="#services">Services</a></li>
          <li><a className="transition-colors hover:text-[var(--ink)]" href="#about">About</a></li>
          <li><a className="transition-colors hover:text-[var(--ink)]" href="#join-us">Careers</a></li>
          <li><a className="transition-colors hover:text-[var(--ink)]" href="#contact">Contact</a></li>
        </ul>
      </div>

      <div className="relative flex h-[460px] items-center justify-center">
        <canvas ref={canvasRef} width={460} height={460} className="block" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_56%_50%_at_50%_50%,transparent_36%,#f5f5f5_100%)]" />
        {!isMapReady && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-[syne] text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
            Loading world map...
          </div>
        )}
      </div>

      <div className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-2 px-6 md:gap-3">
        {offices.map((office, index) => {
          const isActive = activeOffice === index;
          return (
            <button
              key={office.city}
              type="button"
              onMouseEnter={() => onOfficeEnter(index)}
              onMouseLeave={onOfficeLeave}
              className={`relative flex min-w-[140px] flex-col items-center rounded-xl border px-7 py-4 transition-all duration-300 ${
                isActive
                  ? "border-[var(--line)] bg-white/60"
                  : "border-transparent bg-transparent hover:border-[var(--line)] hover:bg-white/40"
              }`}
            >
              <span className={`mb-1 text-[22px] transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>{office.flag}</span>
              <span className={`font-[syne] text-sm font-semibold tracking-[0.02em] ${isActive ? "text-[var(--blue)]" : "text-[var(--ink)]"}`}>
                {office.city}
              </span>
              <span className="mt-0.5 text-[11px] uppercase tracking-[0.05em] text-[var(--muted)]">{office.country}</span>
              <span
                className={`absolute bottom-0 left-1/2 h-[2px] w-9 -translate-x-1/2 rounded-sm bg-[var(--green)] transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mx-6 mt-6 border-t border-[var(--line)] pt-6 md:mx-12">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div className="text-xs text-[var(--muted)]">© 2026 CyberArmour. All rights reserved.</div>
          <ul className="flex list-none gap-6 text-xs text-[var(--muted)]">
            <li><a className="transition-colors hover:text-[var(--ink)]" href="/privacy">Privacy</a></li>
            <li><a className="transition-colors hover:text-[var(--ink)]" href="#">Terms</a></li>
            <li><a className="transition-colors hover:text-[var(--ink)]" href="#">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
