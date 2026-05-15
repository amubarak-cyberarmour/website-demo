"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motionEase } from "./orb-ui";

const services = [
  {
    title: "AI Strategy & Consulting",
    accent: "#d2b36a",
    glow: "rgba(210,179,106,.18)",
    icon: "strategy",
    items: ["AI Readiness Audit", "AI Roadmap Design", "Process Optimization Advisory"],
  },
  {
    title: "Workflow Automation",
    accent: "#e7849a",
    glow: "rgba(231,132,154,.16)",
    icon: "automation",
    items: ["CRM & Lead Automation", "Internal Process Bots", "Reporting Dashboards"],
  },
  {
    title: "AI Integrations & Custom Systems",
    accent: "#78ddd5",
    glow: "rgba(120,221,213,.16)",
    icon: "integrations",
    items: ["ChatGPT & LLM Integrations", "API Automation", "Custom AI Tools"],
  },
  {
    title: "Data Intelligence & Analytics",
    accent: "#78c6f7",
    glow: "rgba(120,198,247,.15)",
    icon: "analytics",
    items: ["Predictive Analytics", "Data Unification", "Insight Visualization"],
  },
  {
    title: "AI Marketing & Design",
    accent: "#edb48e",
    glow: "rgba(237,180,142,.16)",
    icon: "marketing",
    items: ["Personalized Campaigns", "Conversational Chatbots", "Content Generation Systems"],
  },
];

const MOBILE_GUTTER = 32;
const DESKTOP_GUTTER = 72;
const SCROLL_EASE = 0.3;
const SNAP_THRESHOLD = 0.5;

function ServiceIcon({ type, color }: { type: string; color: string }) {
  return (
    <svg viewBox="0 0 64 64" className="size-[74px]" aria-hidden="true">
      {type === "strategy" ? (
        <>
          <path d="M15 14h28c6 0 10 4 10 10v15c0 6-4 10-10 10h-8l-6 7c-2 2-5 1-5-2v-5h-9c-6 0-10-4-10-10V24c0-6 4-10 10-10Z" fill={color} opacity="0.72" />
          <path d="M25 25v15M32 21v23M39 27v11" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        </>
      ) : null}
      {type === "automation" ? (
        <>
          <path d="M32 8 38 15l9-1 3 9-7 6 1 4 7 6-4 9-9-1-6 7-8-5-1-9-4-3-9 1-4-9 7-6v-4l-7-6 4-9 9 1 6-7 7 5Z" fill={color} opacity="0.72" />
          <circle cx="32" cy="32" r="8" fill="#ffffff" opacity="0.88" />
        </>
      ) : null}
      {type === "integrations" ? (
        <>
          <rect x="10" y="10" width="44" height="44" rx="13" fill={color} opacity="0.72" />
          <path d="M21 18v28M43 18v28M21 29h8M35 35h8" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="21" cy="31" r="5" fill="none" stroke="#ffffff" strokeWidth="4" />
          <circle cx="43" cy="33" r="5" fill="none" stroke="#ffffff" strokeWidth="4" />
        </>
      ) : null}
      {type === "analytics" ? (
        <>
          <path d="M32 7c12 0 22 9 22 21 0 8-4 14-10 18v4c0 4-3 7-7 7H27c-4 0-7-3-7-7v-4c-6-4-10-10-10-18C10 16 20 7 32 7Z" fill={color} opacity="0.68" />
          <path d="m29 20-6 11h8l-4 13 13-18h-8l4-6h-7Z" fill="#ffffff" opacity="0.86" />
          <path d="M27 50h10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        </>
      ) : null}
      {type === "marketing" ? (
        <>
          <path d="M15 14h34c5 0 8 3 8 8v18c0 5-3 8-8 8H38l-4 8c-1 3-5 3-6 0l-4-8h-9c-5 0-8-3-8-8V22c0-5 3-8 8-8Z" fill={color} opacity="0.68" />
          <path d="M22 27c0-5 6-8 10-4 4-4 10-1 10 4 0 8-10 13-10 13S22 35 22 27Z" fill="#ffffff" opacity="0.86" />
        </>
      ) : null}
    </svg>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article
      className="relative flex h-[500px] w-[calc(100vw-64px)] shrink-0 flex-col justify-between overflow-hidden rounded-[8px] border border-white/80 bg-[#f5f5f5] p-8 text-[#0e1229] shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)] md:h-[520px] md:w-[calc((100vw-164px)/2)] lg:h-[min(560px,64svh)] lg:min-h-[500px] lg:w-[calc((100vw-192px)/3)] lg:p-11"
    >
      <div className="flex items-start gap-8">
        <ServiceIcon type={service.icon} color="#0e1229" />
        <h3 className="max-w-[330px] text-[30px] font-semibold leading-tight md:text-[34px]">
          {service.title}
        </h3>
      </div>

      <div className="space-y-0">
        {service.items.map((item) => (
          <div key={item} className="flex items-center gap-4 border-b border-[#0e1229]/10 py-6 text-[16px] font-semibold text-[#323d68]">
            <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-[#0e1229]/6">
              <span className="size-2 rounded-full bg-[#0e1229]" />
            </span>
            <span className="flex-1">{item}</span>
            <span className="text-2xl font-light leading-none opacity-80">+</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const [distance, setDistance] = useState(900);

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const cards = rail ? Array.from(rail.children) as HTMLElement[] : [];
      if (!rail || cards.length === 0) return;

      const finalCard = cards[cards.length - 1];
      const viewport = window.innerWidth;
      const rightGutter = viewport >= 768 ? DESKTOP_GUTTER : MOBILE_GUTTER;
      const finalCardRight = finalCard.offsetLeft + finalCard.offsetWidth;
      const viewportRight = viewport - rightGutter;

      setDistance(Math.max(0, Math.ceil(finalCardRight - viewportRight)));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const applyRailX = (nextX: number) => {
      const rail = railRef.current;
      if (!rail) return;

      currentXRef.current = nextX;
      rail.style.transform = `translate3d(${nextX}px, 0, 0)`;
    };

    const stopFrame = () => {
      if (frameRef.current === null) return;

      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };

    const renderFrame = () => {
      const target = targetXRef.current;
      const current = currentXRef.current;
      const delta = target - current;

      if (Math.abs(delta) <= SNAP_THRESHOLD) {
        applyRailX(target);
        frameRef.current = null;
        return;
      }

      applyRailX(current + delta * SCROLL_EASE);
      frameRef.current = window.requestAnimationFrame(renderFrame);
    };

    const startFrame = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(renderFrame);
    };

    const setRailTarget = (nextX: number, snap = false) => {
      if (Math.abs(targetXRef.current - nextX) <= SNAP_THRESHOLD && !snap) return;

      targetXRef.current = nextX;

      if (snap) {
        stopFrame();
        applyRailX(nextX);
        return;
      }

      startFrame();
    };

    const updatePosition = () => {
      if (!sectionRef.current || distance <= 0) {
        setRailTarget(0, true);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const nextX = -distance * progress;

      setRailTarget(nextX, progress === 0 || progress === 1);
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      stopFrame();
    };
  }, [distance]);

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#f5f5f5]" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden bg-[#f5f5f5] py-14 md:py-16">
        <div className="mb-8 px-8 md:mb-10 md:px-[72px]">
          <motion.h2
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: motionEase }}
            className="text-[52px] text-center font-semibold leading-none tracking-normal text-[#0e1229] md:text-[86px]"
          >
            Our Services
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <div
            ref={railRef}
            className="flex gap-4 pl-8 pr-8 md:gap-5 md:pl-[72px] md:pr-[72px] lg:gap-6"
            style={{ willChange: "transform" }}
            aria-label="Five CyberArmour service cards"
          >
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
