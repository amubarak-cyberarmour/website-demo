"use client";

import { motion } from "framer-motion";
import { motionEase } from "./orb-ui";

const values = [
  {
    title: "Human-Led AI",
    description: "We combine practical AI engineering with domain expertise to build systems people can trust and run.",
  },
  {
    title: "Security by Design",
    description: "Every product and workflow is designed with resilience, privacy, and responsible governance from day one.",
  },
  {
    title: "Outcome Focused",
    description: "We prioritize measurable business outcomes, not experiments that look impressive but fail in production.",
  },
];

const highlights = [
  { metric: "120+", label: "Projects Delivered" },
  { metric: "18", label: "Industries Served" },
  { metric: "99.9%", label: "Platform Reliability" },
  { metric: "24/7", label: "Support Coverage" },
];

export function AboutUsSection() {
  return (
    <section id="about" className="bg-[#f5f5f5] px-4 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-[126rem]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#555968]">About Us</p>
          <h2 className="mt-4 text-[46px] font-semibold leading-none text-[#0e1229] md:text-[82px]">Building practical AI for real teams.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-[19px] leading-[1.6] text-[#555968] md:text-[22px]">
            CyberArmour helps organizations modernize operations with AI systems that are secure, scalable, and aligned with business reality.
            We work side-by-side with teams to turn strategy into deployed, high-impact products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.65, ease: motionEase, delay: 0.08 }}
          className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3"
        >
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[12px] border border-white/85 bg-[#f5f5f5] p-7 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_12px_34px_rgba(14,18,41,.08)]"
            >
              <h3 className="text-[28px] font-semibold leading-tight text-[#0e1229]">{value.title}</h3>
              <p className="mt-4 text-[16px] leading-7 text-[#555968]">{value.description}</p>
            </article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62, ease: motionEase, delay: 0.12 }}
          className="mt-8 grid gap-4 rounded-[12px] border border-white/85 bg-[#f5f5f5] p-6 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_14px_30px_rgba(14,18,41,.08)] md:mt-10 md:grid-cols-4 md:p-8"
        >
          {highlights.map((item) => (
            <div key={item.label} className="rounded-[10px] border border-[#0e1229]/8 bg-white/35 px-4 py-5 text-center">
              <div className="text-[36px] font-semibold leading-none text-[#0e1229] md:text-[44px]">{item.metric}</div>
              <div className="mt-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#555968]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
