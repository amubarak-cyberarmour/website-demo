"use client";

import { motion } from "framer-motion";
import { motionEase, PrimaryButton } from "./orb-ui";

const benefits = [
  "High ownership and real product impact",
  "Mentorship with direct access to leadership",
  "Hybrid collaboration with flexible schedules",
  "Learning budget for courses and certifications",
];

export function JoinUsSection() {
  return (
    <section id="join" className="bg-[#f5f5f5] px-4 pb-24 pt-12 md:px-8 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-[126rem]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="mx-auto max-w-4xl py-12 text-center md:py-16"
        >
          <p className="text-[52px] font-semibold leading-none tracking-normal text-[#0e1229] md:text-[86px]">Build What Matters With Us</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="rounded-[14px] border border-white/85 bg-[#f5f5f5] p-7 shadow-[inset_0_3px_1px_rgba(255,255,255,.82),0_20px_45px_rgba(14,18,41,.08)] md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-10">
            <div>
              <h2 className="text-[34px] font-semibold leading-tight text-[#0e1229] md:text-[54px]">Let’s build the next era of AI together.</h2>
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
            <h3 className="text-[24px] font-semibold text-[#0e1229] md:text-[30px]">Careers</h3>
          </div>
          <div className="rounded-[10px] border border-[#0e1229]/10 bg-white/35 px-4 py-5">
            <p className="text-[18px] font-semibold text-[#0e1229]">No open roles right now.</p>
            <p className="mt-2 text-[14px] leading-6 text-[#555968]">
              We are not hiring at the moment. You can still reach out through our contact page, and we will get in touch when
              new opportunities open.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
