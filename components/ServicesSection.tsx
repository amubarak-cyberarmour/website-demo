"use client";

import { motion } from "framer-motion";
import { BarChart3, Bot, Briefcase, Megaphone, Puzzle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motionEase } from "./orb-ui";

const services = [
  {
    title: "AI Strategy & Consulting",
    accent: "#d2b36a",
    glow: "rgba(210,179,106,.18)",
    icon: "strategy",
    items: [
      { title: "AI Readiness Audit", description: "assessing data, workflows, and automation potential" },
      { title: "AI Roadmap Design", description: "defining a custom strategy for AI adoption" },
      { title: "Process Optimization Advisory", description: "rethinking operations to align with AI systems" },
    ],
  },
  {
    title: "Workflow Automation",
    accent: "#e7849a",
    glow: "rgba(231,132,154,.16)",
    icon: "automation",
    items: [
      { title: "CRM & Lead Automation", description: "automating sales and customer follow-up pipelines" },
      { title: "Internal Process Bots", description: "automating repetitive admin and data tasks" },
      { title: "Reporting Dashboards", description: "automated analytics and KPI tracking systems" },
    ],
  },
  {
    title: "AI Integrations & Custom Systems",
    accent: "#78ddd5",
    glow: "rgba(120,221,213,.16)",
    icon: "integrations",
    items: [
      { title: "ChatGPT & LLM Integrations", description: "embedding AI assistants into websites and apps" },
      { title: "API Automation", description: "connecting third-party tools and data sources" },
      { title: "Custom AI Tools", description: "building tailored internal AI-powered applications" },
    ],
  },
  {
    title: "Data Intelligence & Analytics",
    accent: "#78c6f7",
    glow: "rgba(120,198,247,.15)",
    icon: "analytics",
    items: [
      { title: "Predictive Analytics", description: "forecasting trends and behaviors with machine learning" },
      { title: "Data Unification", description: "merging scattered data sources into one ecosystem" },
      { title: "Insight Visualization", description: "interactive dashboards and data storytelling" },
    ],
  },
  {
    title: "AI Marketing & Design",
    accent: "#edb48e",
    glow: "rgba(237,180,142,.16)",
    icon: "marketing",
    items: [
      { title: "Personalized Campaigns", description: "using AI for audience segmentation and targeting" },
      { title: "Conversational Chatbots", description: "automated support and lead qualification" },
      { title: "Content Generation Systems", description: "scalable AI-based copy and visuals" },
    ],
  },
];

const MOBILE_GUTTER = 32;
const DESKTOP_GUTTER = 72;
const SCROLL_EASE = 0.3;
const SNAP_THRESHOLD = 0.5;

function ServiceIcon({ type, color }: { type: string; color: string }) {
  const iconClassName = "size-[74px]";

  if (type === "strategy") {
    return <Briefcase className={iconClassName} color={color} strokeWidth={1.8} aria-hidden="true" />;
  }

  if (type === "automation") {
    return <Bot className={iconClassName} color={color} strokeWidth={1.8} aria-hidden="true" />;
  }

  if (type === "integrations") {
    return <Puzzle className={iconClassName} color={color} strokeWidth={1.8} aria-hidden="true" />;
  }

  if (type === "analytics") {
    return <BarChart3 className={iconClassName} color={color} strokeWidth={1.8} aria-hidden="true" />;
  }

  if (type === "marketing") {
    return <Megaphone className={iconClassName} color={color} strokeWidth={1.8} aria-hidden="true" />;
  }

  return (
    <Briefcase className={iconClassName} color={color} strokeWidth={1.8} aria-hidden="true" />
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const toggleItem = (itemIndex: number) => {
    setActiveItem((prev) => (prev === itemIndex ? null : itemIndex));
  };

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
        {service.items.map((item, index) => (
          <div key={item.title} className="border-b border-[#0e1229]/10">
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="flex w-full items-center gap-4 py-6 text-left text-[16px] font-semibold text-[#323d68]"
              aria-label={`Toggle ${item.title}`}
              aria-expanded={activeItem === index}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-[#0e1229]/6">
                <span className="size-2 rounded-full bg-[#0e1229]" />
              </span>
              <span className="flex-1">{item.title}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full text-[#0e1229] opacity-80 transition-all hover:bg-[#0e1229]/10 hover:opacity-100">
                <span
                  className={`relative block h-4 w-4 transition-transform duration-300 ${
                    activeItem === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <span className="absolute left-1/2 top-0 h-full w-[1.6px] -translate-x-1/2 rounded-full bg-current" />
                  <span className="absolute left-0 top-1/2 h-[1.6px] w-full -translate-y-1/2 rounded-full bg-current" />
                </span>
              </span>
            </button>
            {activeItem === index ? (
              <p className="pb-3 pl-10 pr-12 -mt-2 text-[16px] leading-relaxed text-[#0e1229]/65 md:text-[18px]">
                {item.description}
              </p>
            ) : null}
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
