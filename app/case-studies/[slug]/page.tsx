import { Navbar } from "@/components/Navbar";
import { caseStudies } from "@/lib/case-studies";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f5f5f5] px-4 pb-24 pt-36 text-[#0e1229] md:px-8">
        <article className="mx-auto max-w-[1120px]">
          <a href="/case-studies" className="text-sm font-semibold text-[#555968]">
            Back to case studies
          </a>

          <div className="mt-8 overflow-hidden rounded-[8px] border border-white/80 bg-[#f5f5f5] shadow-[inset_0_3px_1px_rgba(255,255,255,.8),0_18px_50px_rgba(14,18,41,.08)]">
            <div className="min-h-[320px]" style={{ backgroundColor: study.color }} />
            <div className="p-7 md:p-12">
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="rounded-[8px] border border-[#0e1229]/15 px-3 py-2 text-xs font-semibold text-[#555968]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-8 max-w-5xl text-[44px] font-semibold leading-none tracking-normal md:text-[76px]">{study.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#555968]">{study.summary}</p>

              <div className="mt-10 h-[2px] bg-[#0e1229]" />
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-4xl font-semibold leading-none md:text-5xl">{metric.value}</p>
                    <p className="mt-3 text-base text-[#858585]">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
