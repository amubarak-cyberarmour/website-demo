"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { motionEase } from "./orb-ui";

const navbarItems = [
  { label: "Home", href: "/#hero" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Customers", href: "/#customers" },
];

function Logo() {
  return (
    <a href="/#hero" className="flex items-center gap-3" aria-label="CyberArmour home">
      <Image
        src="/cyberarmour-logo.svg"
        alt=""
        width={1254}
        height={1254}
        priority
        className="size-[52px] object-contain"
      />
      <span className="text-[22px] font-normal leading-none text-black md:text-[24px]">CyberArmour</span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] bg-[#f7f7f7]">
      <nav className="w-full overflow-hidden bg-[#f7f7f7]">
        <div className="grid h-[68px] grid-cols-[1fr_auto] items-center px-5 sm:px-9 md:grid-cols-[1fr_auto_1fr] md:px-[72px]">
          <Logo />

          <div className="hidden items-center gap-[42px] md:flex">
            {navbarItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[16px] font-normal leading-none text-[#171717] transition duration-200 hover:text-black/60"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden justify-self-end md:block">
            <motion.a
              href="/#pricing"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: motionEase }}
              className="inline-flex h-[46px] items-center justify-center rounded-[11px] bg-black px-[24px] text-[15px] font-normal leading-none !text-[#f7f4ed] shadow-[0_12px_24px_rgba(0,0,0,.2)]"
            >
              Contact Us
            </motion.a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-[10px] bg-black text-white md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className="relative h-[18px] w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: motionEase }}
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-2 px-5 pb-5">
                {navbarItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[10px] bg-white px-4 py-3 text-[18px] font-medium text-black"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-black px-4 text-[16px] font-normal !text-[#f7f4ed]"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
