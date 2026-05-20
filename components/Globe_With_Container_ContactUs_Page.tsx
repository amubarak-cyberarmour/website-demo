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

export default function Globe_With_Container_ContactUs_Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeOffice, setActiveOffice] = useState<number>(-1);
  const [isMapReady, setIsMapReady] = useState(false);
  const activeOfficeRef = useRef<number>(-1);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    canvas.width = W;
    canvas.height = H;
    const cx = W / 2;
    // Lift the globe a bit so the office flag row has clear breathing room.
    const cy = H * 0.41;
    const R = Math.min(W, H) * 0.37;

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
      d3.geoOrthographic().scale(R).translate([cx, cy]).clipAngle(90).rotate([rotLon, rotLat, 0]);

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
      const bgGrad = ctx.createRadialGradient(cx - 24, cy - 24, 10, cx, cy, R);
      bgGrad.addColorStop(0, "rgba(236,236,238,0.95)");
      bgGrad.addColorStop(0.62, "rgba(226,227,231,0.96)");
      bgGrad.addColorStop(1, "rgba(214,216,222,0.92)");
      ctx.beginPath();
      geoPath(sphere);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      const graticule = d3.geoGraticule()();
      if (graticule) {
        ctx.beginPath();
        geoPath(graticule as GeoJSON.Geometry);
        ctx.strokeStyle = "rgba(14, 18, 41, 0.08)";
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      worldData.forEach((country) => {
        const isActiveCountry =
          activeOfficeRef.current >= 0 &&
          country.properties?.name === offices[activeOfficeRef.current]?.highlightCountry;

        ctx.beginPath();
        geoPath(country);
        if (isActiveCountry) {
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.strokeStyle = "rgba(0,0,0,0.96)";
          ctx.lineWidth = 1.05;
        } else {
          ctx.fillStyle = "rgba(50,61,104,0.5)";
          ctx.strokeStyle = "rgba(14,18,41,0.22)";
          ctx.lineWidth = 0.3;
        }
        ctx.fill();
        ctx.stroke();
      });

      pulse += 0.055;
      for (let i = 0; i < offices.length; i += 1) {
        const office = offices[i];
        const projected = proj([office.lon, office.lat]);
        if (!projected) continue;
        const [px, py] = projected;

        const geoDistance = d3.geoDistance([office.lon, office.lat], [-rotLon, -rotLat]);
        if (geoDistance > Math.PI / 2) continue;

        const isActivePin = activeOfficeRef.current === i;
        const pinRadius = isActivePin ? 2.8 : 2;

        if (isActivePin) {
          const pulseSize = 7 + Math.sin(pulse * 2) * 2;
          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, pulseSize);
          pulseGrad.addColorStop(0, "rgba(0,0,0,0.3)");
          pulseGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(px, py, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = pulseGrad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, pinRadius, 0, Math.PI * 2);
        ctx.fillStyle = isActivePin ? "#000000" : "rgba(245,245,245,0.95)";
        ctx.fill();
        ctx.strokeStyle = isActivePin ? "rgba(14,18,41,0.85)" : "rgba(14,18,41,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
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
    <div
      ref={containerRef}
      className="relative h-[320px] rounded-[10px] bg-transparent pb-12 md:h-[360px] md:pb-14"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6f7280]">
          Loading map...
        </div>
      )}

      <div className="absolute inset-x-0 bottom-1 flex items-end justify-center gap-3 md:bottom-1.5">
        {offices.map((office, index) => {
          const isActive = activeOffice === index;
          return (
            <button
              key={office.city}
              type="button"
              onMouseEnter={() => onOfficeEnter(index)}
              onMouseLeave={onOfficeLeave}
              aria-label={`${office.city}, ${office.country}`}
              className="pointer-events-auto inline-flex min-w-[64px] flex-col items-center justify-center px-1 py-0.5 text-[12px] leading-none transition"
            >
              <span className={`mb-1 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>{office.flag}</span>
              <span className={`text-[10px] font-semibold ${isActive ? "text-black" : "text-[#323d68]"}`}>{office.city}</span>
              <span className={`mt-0.5 text-[9px] uppercase tracking-[0.04em] ${isActive ? "text-black/75" : "text-[#323d68]"}`}>
                {office.country}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
