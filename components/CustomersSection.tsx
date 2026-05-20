"use client";

import { motion } from "framer-motion";
import { Building2, HeartPulse, Landmark, RadioTower, ShieldCheck, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motionEase } from "./orb-ui";

const firstRowCards = [
  {
    title: "Government Agencies",
    description: "Cyber resilience, monitoring, and incident readiness for public infrastructure.",
    icon: Landmark,
  },
  {
    title: "Financial Services",
    description: "Fraud prevention and data protection for banks, fintech, and regulated teams.",
    icon: Building2,
  },
  {
    title: "Communications Providers",
    description: "Telecom and ISP security against disruption, attacks, and data compromise.",
    icon: RadioTower,
  },
];

const secondRowCards = [
  {
    title: "Healthcare",
    description: "Secure patient data, strengthen compliance posture, and reduce operational risk.",
    icon: HeartPulse,
  },
  {
    title: "E-Commerce",
    description: "Protect payment flows, customer accounts, and high-volume digital storefronts.",
    icon: Store,
  },
  {
    title: "Enterprise SaaS",
    description: "Harden cloud platforms, identity layers, and customer-facing applications.",
    icon: ShieldCheck,
  },
];

function IndustryCard({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <article className="customers-marquee-card">
      <div className="customers-marquee-icon-wrap">
        <Icon className="customers-marquee-icon" aria-hidden="true" />
      </div>
      <h3 className="customers-marquee-title">{title}</h3>
      <p className="customers-marquee-copy">{description}</p>
    </article>
  );
}

function MarqueeLane({
  cards,
  reverse = false,
}: {
  cards: { title: string; description: string; icon: LucideIcon }[];
  reverse?: boolean;
}) {
  const loopCards = [...cards, ...cards];

  return (
    <div className="customers-marquee-lane" aria-hidden="true">
      <div className={`customers-marquee-track ${reverse ? "customers-marquee-track-reverse" : ""}`}>
        {loopCards.map((card, index) => (
          <IndustryCard key={`${card.title}-${index}`} title={card.title} description={card.description} icon={card.icon} />
        ))}
      </div>
    </div>
  );
}

export function CustomersSection() {
  return (
    <section id="customers" className="bg-[#f5f5f5] px-4 pb-24 pt-8 md:px-8 md:pb-28">
      <div className="mx-auto max-w-[126rem]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="text-[52px] font-semibold leading-none tracking-normal text-[#0e1229] md:text-[86px]">
            Industries We Work With
          </h2>
          <p className="mx-auto mt-6 max-w-5xl text-[20px] leading-[1.5] text-[#555968] md:text-[24px] md:leading-[1.4]">
            We help organizations across critical sectors build practical cyber resilience, secure operations,
            and protect customer trust at scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="customers-marquee-shell"
        >
          <MarqueeLane cards={firstRowCards} />
          <MarqueeLane cards={secondRowCards} reverse />
        </motion.div>
      </div>
    </section>
  );
}
