"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { motionEase } from "./orb-ui";
import Link from "next/link";

function StudyMark({ type, color }: { type: string; color: string }) {
  if (type === "stack") {
    return (
      <svg viewBox="0 0 120 120" className="h-32 w-32" aria-hidden="true">
        <path d="m60 24 44 26-44 26-44-26 44-26Z" fill="#f5f5f5" opacity="0.96" />
        <path d="m34 53 26 15 26-15v12L60 80 34 65V53Z" fill="#9da7c7" />
        <path d="m21 66 39 23 39-23v14l-39 23-39-23V66Z" fill="#dfe4f0" />
        <path d="m60 24 17 10-17 10-17-10 17-10Z" fill="#323d68" />
      </svg>
    );
  }

  if (type === "pie") {
    return (
      <svg viewBox="0 0 120 120" className="h-32 w-32" aria-hidden="true">
        <path d="M56 24a38 38 0 1 0 38 38H56V24Z" fill="#b9f16d" opacity="0.84" />
        <path d="M66 16v44h44c0-24.3-19.7-44-44-44Z" fill="#f5f5f5" opacity="0.92" />
        <path d="M66 68h34c-3 16.8-17 30-34 32V68Z" fill="#323d68" opacity="0.72" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 140 90" className="h-24 w-40" aria-hidden="true">
      <path d="M22 65 52 20h24L46 65H22Z" fill="#6f7280" />
      <path d="M58 65 88 20h24L82 65H58Z" fill="#9da7c7" />
      <path d="M94 65 124 20h24l-30 45H94Z" fill="#f5f5f5" />
      <path d="M22 65h96l-10 14H12l10-14Z" fill={color} opacity="0.42" />
    </svg>
  );
}

function Tags({ tags }: { tags: ReadonlyArray<string> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex h-9 items-center rounded-[8px] border border-[#0e1229]/15 bg-white/35 px-4 text-sm font-medium leading-none text-[#0e1229] md:text-[15px]"
        >
          <span className="mr-2 size-1.5 rounded-full bg-[#0e1229]" />
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyCard({ study, index }: { study: (typeof caseStudies)[number]; index: number }) {
  const imagePanel = (
    <div
      className="flex h-[320px] items-center justify-center rounded-[8px] md:h-[460px] lg:h-[560px]"
      style={{ background: `linear-gradient(135deg, ${study.color}, #0e1229)` }}
    >
      <StudyMark type={study.icon} color={study.color} />
    </div>
  );

  const contentPanel = (
    <div className="flex h-[320px] flex-col justify-between px-6 py-7 md:h-[460px] md:px-10 md:py-12 lg:h-[560px] lg:px-14 lg:py-14">
      <Tags tags={study.tags} />

      <div>
        <h3 className="max-w-[760px] text-[34px] font-semibold leading-[1.08] tracking-normal text-[#0e1229] md:text-[56px] lg:text-[64px]">
          {study.title}
        </h3>
        <div className="mt-8 h-[2px] w-full bg-[#0e1229]" />
        <div className="mt-7 grid grid-cols-3 gap-4">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-[30px] font-semibold leading-none text-[#0e1229] md:text-[42px]">{metric.value}</p>
              <p className="mt-2 text-sm leading-tight text-[#6f7280] md:text-base">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="sticky top-[88px] block overflow-hidden rounded-[8px] border border-white/85 bg-[#f5f5f5] shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_24px_70px_rgba(14,18,41,.16)]"
      style={{ zIndex: index + 1, marginTop: index === 0 ? 0 : -112 }}
    >
      <motion.article
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: motionEase }}
        className="grid gap-0 lg:grid-cols-2"
      >
        {study.imageFirst ? imagePanel : contentPanel}
        {study.imageFirst ? contentPanel : imagePanel}
      </motion.article>
    </Link>
  );
}

export function CaseStudiesSection() {
  return (
    <section id="case-studies" className="bg-[#f5f5f5] px-4 py-24 text-[#0e1229] md:px-8 md:py-28">
      <div className="mx-auto max-w-[126rem]">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: motionEase }}
          className="mb-14 text-center text-[52px] font-semibold leading-none tracking-normal text-[#0e1229] md:mb-20 md:text-[86px]"
        >
          Latest Case Studies
        </motion.h2>

        <div className="grid gap-[12vh] pb-[4vh]">
          {caseStudies.slice(0, 3).map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>

        <Link
          href="/case-studies"
          className="relative z-10 mx-auto block min-h-[132px] max-w-[126rem] overflow-hidden rounded-[8px] border border-white/85 bg-[#f5f5f5] p-3 text-[#0e1229] shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_24px_70px_rgba(14,18,41,.16)] md:min-h-[168px] md:p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65, ease: motionEase }}
            className="flex items-center gap-6 md:gap-8"
          >
          <div className="hidden h-[108px] w-[124px] shrink-0 items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,#323d68,#0e1229)] md:flex md:h-[136px] md:w-[156px]">
            <StudyMark type="bars" color="#323d68" />
          </div>
          <div className="min-w-0 flex-1 px-2">
            <h3 className="text-[34px] font-semibold leading-none tracking-normal md:text-[56px]">View all case studies</h3>
            <p className="mt-4 text-base leading-6 text-[#555968] md:text-xl">
              Access in-depth reports, strategic analysis, and thought leadership
            </p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#0e1229] text-white md:size-22">
            <ArrowRight size={34} strokeWidth={1.6} />
          </span>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
