import { ArrowUpRight, Github, Linkedin, Rss, Code2, Download } from "lucide-react";
import headerData from "@/data/header.json";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/boradesanket13/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/boradesanket13",
    icon: Github,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/boradesanket13/",
    icon: Code2,
  },
  {
    label: "Hashnode",
    href: "https://boradesanket13.hashnode.dev/",
    icon: Rss,
  },
] as const;

export function Footer() {
  return (
    <footer id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
              06 / CONTACT
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Open to strong backend engineering opportunities.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-fg-dim">
              Java / Spring backend roles, with a preference for Pune. Email is the fastest way to reach me.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${headerData.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950"
              >
                {headerData.email}
              </a>
              <a
                href={headerData.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-between gap-3 rounded-lg border border-hairline px-4 py-3 text-sm text-fg-dim transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={16} />
                  {label}
                </span>
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-5 font-mono text-[10px] uppercase tracking-wider text-fg-dim sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Sanket Borade</span>
          <span>Java · Spring · Backend Engineering</span>
        </div>
      </div>
    </footer>
  );
}
