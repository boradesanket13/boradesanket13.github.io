import resumeData from "@/data/resume.json";
import { RevealOnScroll } from "./RevealOnScroll";
import { formatMonthYear } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="01 / EXPERIENCE" title="Production experience" />
      <div className="mt-12 space-y-12">
        {resumeData.experience.map((job, index) => (
          <RevealOnScroll key={job.id} delay={index * 0.05}>
            <article className="grid gap-6 lg:grid-cols-[190px_1fr]">
              <div className="font-mono text-xs leading-6 text-fg-dim">
                {formatMonthYear(job.start)} — {formatMonthYear(job.end)}<br />{job.location}
              </div>
              <div className="border-l border-hairline pl-6 lg:pl-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{job.role}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>
                {job.id === "tcs" && <p className="mt-5 max-w-3xl text-sm leading-7 text-fg-dim"><span className="text-fg">SBI Enterprise Document Management System</span> — backend and production engineering for a high-throughput enterprise platform.</p>}
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((item) => <span key={item} className="rounded-md bg-elevated px-2.5 py-1 font-mono text-[11px] text-fg-dim">{item}</span>)}
                </div>
                <ul className="mt-6 space-y-3">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-7 text-fg-dim"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /><span>{highlight}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <RevealOnScroll><p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">{eyebrow}</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2></RevealOnScroll>;
}
