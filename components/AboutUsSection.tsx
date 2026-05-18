"use client";

import { motion } from "framer-motion";
import { motionEase } from "./orb-ui";

const valuePoints = [
  "We turn repetitive workflows into AI-assisted systems that reduce response time and manual handoffs.",
  "We design every deployment around measurable KPIs, so your team can track impact in revenue, speed, and customer satisfaction.",
  "We build with your real stack and constraints in mind, so adoption is practical and long-term, not another pilot that fades.",
];

const highlights = [
  { metric: "120+", label: "Client Projects Delivered" },
  { metric: "18", label: "Industries Served" },
  { metric: "99.9%", label: "Platform Reliability" },
  { metric: "24/7", label: "Implementation Support" },
];

const revealParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: motionEase } },
};

export function AboutUsSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f5f5f5] px-4 py-24 md:px-8 md:py-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(120,198,247,0.22)_0%,_rgba(120,198,247,0)_72%)] blur-2xl"
        animate={{ x: [0, 22, -8, 0], y: [0, 16, -10, 0], opacity: [0.42, 0.75, 0.55, 0.42] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(237,180,142,0.2)_0%,_rgba(237,180,142,0)_72%)] blur-2xl"
        animate={{ x: [0, -18, 10, 0], y: [0, -12, 18, 0], opacity: [0.4, 0.68, 0.5, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-[126rem]">
        <motion.div
          variants={revealParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={revealItem} className="text-[52px] font-semibold leading-none tracking-normal text-[#0e1229] md:text-[86px]">
            Why Teams Choose CyberArmour
          </motion.p>
          <motion.p variants={revealItem} className="mt-4 text-[20px] font-semibold leading-none text-[#0e1229] md:text-[24px]">
            You should not have to hire a full AI department to modernize your operations.
          </motion.p>
          <motion.p variants={revealItem} className="mx-auto mt-6 max-w-5xl text-[20px] leading-[1.5] text-[#555968] md:text-[24px] md:leading-[1.4]">
            We help growth-focused teams deploy practical AI systems that save time, improve customer experience, and create measurable business
            outcomes without disrupting daily operations.
          </motion.p>
        </motion.div>

        <div className="mt-8 space-y-3 md:mt-10 md:space-y-4">
          <div className="flex min-h-[24vh] items-center">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.68, ease: motionEase }}
              whileHover={{ y: -6, boxShadow: "inset 0 3px 1px rgba(255,255,255,.8),0 22px 42px rgba(14,18,41,.14)" }}
              className="group w-full rounded-[12px] border border-white/85 bg-[#f5f5f5] p-7 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_12px_34px_rgba(14,18,41,.08)] transition-shadow duration-300 md:p-10"
            >
              <div className="mb-6 h-[2px] w-24 bg-gradient-to-r from-[#0e1229] to-transparent transition-all duration-300 group-hover:w-40" />
              <h3 className="text-[28px] font-semibold leading-tight text-[#0e1229] md:text-[34px]">Why we are qualified to help</h3>
              <p className="mt-3 text-[16px] leading-7 text-[#555968]">
                CyberArmour started after we saw operations teams spending most of their week on repetitive reporting, fragmented handoffs, and slow
                follow-ups. We built and tested internal AI workflows to fix those same pain points first, then brought that production-first approach to
                clients who needed results quickly and safely.
              </p>
            </motion.div>
          </div>

          <div className="flex min-h-[26vh] items-center">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.68, ease: motionEase }}
              whileHover={{ y: -6, boxShadow: "inset 0 3px 1px rgba(255,255,255,.8),0 22px 42px rgba(14,18,41,.14)" }}
              className="group w-full rounded-[12px] border border-white/85 bg-[#f5f5f5] p-7 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_12px_34px_rgba(14,18,41,.08)] transition-shadow duration-300 md:p-10"
            >
              <div className="mb-6 h-[2px] w-24 bg-gradient-to-r from-[#0e1229] to-transparent transition-all duration-300 group-hover:w-40" />
              <h3 className="text-[28px] font-semibold leading-tight text-[#0e1229] md:text-[34px]">How this makes your life easier</h3>
              <motion.div variants={revealParent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} className="mt-5 grid gap-4">
                {valuePoints.map((point, index) => (
                  <motion.article
                    key={point}
                    variants={revealItem}
                    whileHover={{ x: 6, borderColor: "rgba(14,18,41,.25)", backgroundColor: "rgba(255,255,255,.58)" }}
                    transition={{ duration: 0.28, ease: motionEase, delay: index * 0.02 }}
                    className="rounded-[10px] border border-[#0e1229]/10 bg-white/35 px-4 py-4"
                  >
                    <p className="text-[16px] leading-7 text-[#555968]">{point}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex min-h-[22vh] items-center">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.62, ease: motionEase }}
              className="grid w-full gap-4 rounded-[12px] border border-white/85 bg-[#f5f5f5] p-6 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_14px_30px_rgba(14,18,41,.08)] md:grid-cols-4 md:p-8"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, ease: motionEase, delay: index * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02, backgroundColor: "rgba(255,255,255,.6)" }}
                  className="rounded-[10px] border border-[#0e1229]/8 bg-white/35 px-4 py-5 text-center"
                >
                  <div className="text-[36px] font-semibold leading-none text-[#0e1229] md:text-[44px]">{item.metric}</div>
                  <div className="mt-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#555968]">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex min-h-[20vh] items-center">
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.62, ease: motionEase }}
              whileHover={{ y: -6, boxShadow: "inset 0 3px 1px rgba(255,255,255,.8),0 22px 42px rgba(14,18,41,.14)" }}
              className="group w-full rounded-[12px] border border-white/85 bg-[#f5f5f5] p-6 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_14px_30px_rgba(14,18,41,.08)] transition-shadow duration-300 md:p-8"
            >
              <div className="mb-5 h-[2px] w-20 bg-gradient-to-r from-[#0e1229] to-transparent transition-all duration-300 group-hover:w-32" />
              <h3 className="text-[24px] font-semibold text-[#0e1229] md:text-[30px]">Credentials</h3>
              <p className="mt-3 text-[16px] leading-7 text-[#555968]">
                Security-first development standards, production AI deployment experience, and cross-industry implementation across healthcare,
                operations, and marketing teams.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
