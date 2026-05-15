"use client";

import { motion } from "framer-motion";
import { motionEase, PrimaryButton } from "./orb-ui";

const benefits = [
  "High ownership and real product impact",
  "Mentorship with direct access to leadership",
  "Hybrid collaboration with flexible schedules",
  "Learning budget for courses and certifications",
];

const roles = [
  { title: "AI Automation Engineer", location: "Islamabad · Hybrid", type: "Full-time" },
  { title: "Product Designer", location: "Islamabad · Hybrid", type: "Full-time" },
  { title: "Growth Marketing Lead", location: "Remote · Pakistan", type: "Full-time" },
];

export function JoinUsSection() {
  return (
    <section id="join" className="bg-[#f5f5f5] px-4 pb-24 pt-6 md:px-8 md:pb-28 md:pt-8">
      <div className="mx-auto max-w-[126rem]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="rounded-[14px] border border-white/85 bg-[#f5f5f5] p-7 shadow-[inset_0_3px_1px_rgba(255,255,255,.82),0_20px_45px_rgba(14,18,41,.08)] md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#555968]">Join Us</p>
              <h2 className="mt-4 text-[44px] font-semibold leading-none text-[#0e1229] md:text-[72px]">Help us shape the next era of AI delivery.</h2>
              <p className="mt-6 max-w-2xl text-[18px] leading-[1.65] text-[#555968] md:text-[21px]">
                We are building a team of operators, engineers, and designers who care about quality, speed, and customer outcomes.
                If you like solving complex problems and shipping meaningful work, we should talk.
              </p>
              <div className="mt-8">
                <PrimaryButton href="/contact">Apply Now</PrimaryButton>
              </div>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 rounded-[10px] border border-[#0e1229]/10 bg-white/35 px-4 py-4 text-[16px] font-semibold text-[#323d68]"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-[#0e1229]/8">
                    <span className="size-[7px] rounded-full bg-[#0e1229]" />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.62, ease: motionEase, delay: 0.08 }}
          className="mt-6 rounded-[12px] border border-white/85 bg-[#f5f5f5] p-5 shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_14px_32px_rgba(14,18,41,.08)] md:mt-7 md:p-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[24px] font-semibold text-[#0e1229] md:text-[30px]">Open Roles</h3>
            <a href="/contact" className="text-[14px] font-semibold text-[#323d68] hover:text-[#0e1229]">
              View Open Roles
            </a>
          </div>
          <div className="grid gap-3">
            {roles.map((role) => (
              <article
                key={role.title}
                className="grid gap-3 rounded-[10px] border border-[#0e1229]/10 bg-white/35 px-4 py-4 md:grid-cols-[1fr_auto_auto] md:items-center"
              >
                <div className="text-[18px] font-semibold text-[#0e1229]">{role.title}</div>
                <div className="text-[14px] font-medium text-[#555968]">{role.location}</div>
                <div className="inline-flex w-fit rounded-full border border-[#0e1229]/12 bg-white/45 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#323d68]">
                  {role.type}
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
