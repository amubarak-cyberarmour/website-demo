import type { ReactNode } from "react";
import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </>
  );
}

export function SimplePage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen w-[min(900px,calc(100%-32px))] pb-20 pt-40">
        <div className="mb-8 text-center">
          <div className="mx-auto inline-flex rounded-full border border-white bg-[#f5f5f5] px-4 py-2 text-xs font-semibold uppercase shadow-[inset_0_3px_1px_#fff]">
            {eyebrow}
          </div>
          <h1 className="mt-5 text-4xl font-semibold md:text-6xl">{title}</h1>
        </div>
        <div className="rounded-[8px] border border-white/80 bg-white/55 p-7 leading-8 text-[#555968] shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)]">
          {children}
        </div>
      </main>
    </>
  );
}
