"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export function OrbMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#0e1229_128%)] shadow-[0_0.7px_1px_rgba(122,122,122,.58),0_1.8px_2.5px_rgba(122,122,122,.57),0_6.8px_9.6px_rgba(122,122,122,.52),0_30px_42px_-6px_rgba(122,122,122,.32)] ${
        compact ? "size-10 p-[3px]" : "size-[74px] p-1 md:size-[112px] md:p-[6px]"
      }`}
      aria-hidden="true"
    >
      <span className="grid size-full place-items-center rounded-full bg-[linear-gradient(90deg,#0e1229_0%,#323d68_213%)] shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
        <span className={`rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,.09)] ${compact ? "size-4" : "size-8 md:size-12"}`} />
      </span>
      {!compact ? (
        <>
          <span className="hero-satellite hero-satellite-one" />
          <span className="hero-satellite hero-satellite-two" />
        </>
      ) : null}
    </span>
  );
}

export function PrimaryButton({ href = "/#pricing", children = "Get Started" }: { href?: string; children?: ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.2, ease: motionEase }}
      className="inline-flex h-12 items-center justify-center rounded-[10px] bg-[#0e1229] px-5 text-[14px] font-semibold text-white shadow-[0_0.6px_1.08px_-1.25px_rgba(61,61,61,.72),0_2.28px_4.12px_-2.5px_rgba(61,61,61,.64),0_10px_18px_-3.75px_rgba(61,61,61,.25),0_30px_30px_-12px_rgba(0,0,0,.28)]"
    >
      {children}
    </motion.a>
  );
}
