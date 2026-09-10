import { ArrowUpRight, Github } from "lucide-react";
import resumeData from "@/data/resume.json";
import githubData from "@/data/generated/github.json";
import { RevealOnScroll } from "./RevealOnScroll";
import { sitePath } from "@/lib/site";

const featuredIds = new Set(["shikshasetu", "fundseed"]);

export function Projects() {
const repos = githubData.repos
  .filter(
    (repo) =>
      !repo.forks &&
      repo.name !== "boradesanket13" &&
      repo.name !== "boradesanket13.github.io"
  )
  .slice(0, 4);
  return (
    <section id="projects" className="border-y border-hairline bg-elevated/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <RevealOnScroll>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">02 / SELECTED WORK</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Projects & engineering work</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-fg-dim">A small selection of systems and applications. The emphasis is on engineering decisions, not a long list of demos.</p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {resumeData.projectsFallback.filter((project) => featuredIds.has(project.id)).map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-xl border border-hairline bg-bg p-6 transition-colors hover:border-accent/50">
                <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-wider text-fg-dim">Personal project</p><h3 className="mt-2 font-display text-xl font-semibold">{project.name}</h3></div><span className="font-mono text-[10px] text-fg-dim">{project.period}</span></div>
                <p className="mt-4 flex-1 text-sm leading-7 text-fg-dim">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-md bg-elevated px-2 py-1 font-mono text-[10px] text-fg-dim">{item}</span>)}</div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {repos.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between gap-4"><h3 className="font-display text-xl font-semibold">GitHub activity</h3><a href="https://github.com/boradesanket13" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-dim hover:text-accent">View GitHub <ArrowUpRight size={13} /></a></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {repos.map((repo, index) => <RevealOnScroll key={repo.id} delay={index * 0.04}><a href={repo.url} target="_blank" rel="noreferrer" className="block rounded-lg border border-hairline bg-bg p-4 transition-colors hover:border-accent/50"><div className="flex items-center gap-2"><Github size={14} className="text-fg-dim" /><span className="truncate text-sm font-medium">{repo.name}</span></div><p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-fg-dim">{repo.description || "Open-source project."}</p><div className="mt-3 font-mono text-[10px] text-fg-dim">{repo.primaryLanguage || "Code"} · ★ {repo.stars}</div></a></RevealOnScroll>)}
            </div>
          </div>
        )}

        <div className="mt-8"><a href={sitePath("/resume-sanket-borade.pdf")} className="font-mono text-xs text-fg-dim hover:text-accent">More details → résumé</a></div>
      </div>
    </section>
  );
}
