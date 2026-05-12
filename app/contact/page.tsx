import { SimplePage } from "@/components/Site";

export default function ContactPage() {
  return (
    <SimplePage eyebrow="Contact" title="Let's Build Your AI Advantage">
      <p>
        Tell us where your team loses time, where customers wait, and which decisions need sharper signals. We will
        map the highest-impact automation opportunities and shape a practical deployment plan.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a className="rounded-[8px] bg-white/70 p-4 font-semibold text-[#0e1229]" href="mailto:orbai@support.com">
          orbai@support.com
        </a>
        <a className="rounded-[8px] bg-white/70 p-4 font-semibold text-[#0e1229]" href="/#pricing">
          View pricing
        </a>
      </div>
    </SimplePage>
  );
}
