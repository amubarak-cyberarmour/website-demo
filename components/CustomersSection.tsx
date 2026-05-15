"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { motionEase } from "./orb-ui";

const orbitCards = [
  {
    title: "Government Agencies",
    description: "Cyber resilience, monitoring, and incident readiness for public infrastructure.",
  },
  {
    title: "Financial Services",
    description: "Fraud prevention and data protection for banks, fintech, and regulated teams.",
  },
  {
    title: "Communications Providers",
    description: "Telecom and ISP security against disruption, attacks, and data compromise.",
  },
];

function OrbitCustomersVisual() {
  return (
    <div className="customers-orbit" aria-hidden="true">
      <div className="customers-orbit-crop">
        <ul className="customers-orbit-list" style={{ ["--count" as string]: orbitCards.length } as CSSProperties}>
          {orbitCards.map((card, index) => (
            <li key={`orbit-${card.title}`} style={{ ["--item-index" as string]: index } as CSSProperties}>
              <div className="customers-orbit-card">
                <span className="customers-orbit-name">{card.title}</span>
                <span className="customers-orbit-copy">{card.description}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="customers-orbit-circle customers-orbit-circle-last" />
        <div className="customers-orbit-circle customers-orbit-circle-second" />
      </div>
      <div className="customers-orbit-mask" />
      <div className="customers-orbit-circle customers-orbit-circle-center" />
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
          className="mb-12 md:mb-16"
        >
          <OrbitCustomersVisual />
        </motion.div>

      </div>
    </section>
  );
}
