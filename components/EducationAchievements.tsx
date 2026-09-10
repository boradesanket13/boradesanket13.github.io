import resumeData from "@/data/resume.json";
import { RevealOnScroll } from "./RevealOnScroll";
import { formatMonthYear } from "@/lib/utils";

export function EducationAchievements() {
  return (
    <section id="education" className="border-t border-hairline bg-elevated/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 md:grid-cols-[1fr_1fr]">
        <RevealOnScroll>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
            05 / EDUCATION
          </p>

          {resumeData.education.map((ed) => (
            <div key={ed.id} className="mt-6">
              <h2 className="font-display text-2xl font-semibold">{ed.degree}</h2>
              <p className="mt-2 text-sm text-fg-dim">{ed.school}</p>
              <p className="mt-2 font-mono text-xs text-fg-dim">
                {formatMonthYear(ed.start)} — {formatMonthYear(ed.end)} · {ed.score}
              </p>
            </div>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delay={0.06}>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
            CREDENTIALS
          </p>

          <div className="mt-6 space-y-3">
            {resumeData.certifications.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl border border-hairline bg-bg p-5"
              >
                <p className="font-display text-lg font-semibold">{cert.title}</p>
                <p className="mt-1 text-sm text-fg-dim">{cert.issuer} certification</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
