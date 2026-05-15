import { Navbar } from "@/components/Navbar";
import { caseStudies } from "@/lib/case-studies";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5f5f5] px-4 pb-24 pt-36 text-[#0e1229] md:px-8">
        <section className="mx-auto max-w-[1180px]">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#6f7280]">Case studies</p>
            <h1 className="mt-4 max-w-4xl text-[52px] font-semibold leading-none tracking-normal md:text-[86px]">
              Applied AI systems with measurable outcomes.
            </h1>
          </div>

          <div className="grid gap-5">
            {caseStudies.map((study) => (
              <a
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group grid overflow-hidden rounded-[8px] border border-white/80 bg-[#f5f5f5] shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)] transition-transform hover:-translate-y-1 md:grid-cols-[0.72fr_1.28fr]"
              >
                <div className="min-h-56" style={{ backgroundColor: study.color }} />
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="rounded-[8px] border border-[#0e1229]/15 px-3 py-2 text-xs font-semibold text-[#555968]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-10 flex items-end justify-between gap-6">
                    <div>
                      <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">{study.title}</h2>
                      <p className="mt-4 max-w-2xl text-base leading-7 text-[#555968]">{study.summary}</p>
                    </div>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#0e1229] text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
