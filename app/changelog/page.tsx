import { SimplePage } from "@/components/Site";
import { updates } from "@/lib/data";

export default function ChangelogPage() {
  return (
    <SimplePage eyebrow="Updates" title="Latest Product Notes">
      <div className="space-y-5">
        {updates.map((update) => (
          <article key={update.title} className="rounded-[8px] bg-white/65 p-5">
            <div className="text-sm font-semibold text-[#6f7280]">{update.date}</div>
            <h2 className="mt-2 text-2xl font-semibold text-[#0e1229]">{update.title}</h2>
            <p className="mt-2">{update.text}</p>
          </article>
        ))}
      </div>
    </SimplePage>
  );
}
