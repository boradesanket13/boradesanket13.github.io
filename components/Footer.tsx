import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import headerData from "@/data/header.json";
import socials from "@/data/socials.json";
import { sitePath } from "@/lib/site";

const links = [
  ["LinkedIn", "linkedin", Linkedin],
  ["GitHub", "github", Github],
] as const;

export function Footer() {
  return (
    <footer id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">05 / CONTACT</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">Open to strong backend engineering opportunities.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-fg-dim">Java / Spring backend roles. Email is the fastest way to reach me.</p>
            <a href={`mailto:${headerData.email}`} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950"><Mail size={16} /> {headerData.email}</a>
          </div>
          <div className="flex flex-wrap gap-3">
            {links.map(([label, id, Icon]) => { const url = socials.find((item) => item.id === id)?.url ?? "#"; return <a key={id} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 text-sm text-fg-dim hover:border-accent hover:text-accent"><Icon size={16} /> {label} <ArrowUpRight size={13} /></a>; })}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-hairline pt-5 font-mono text-[10px] uppercase tracking-wider text-fg-dim sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Sanket Borade</span><a href={sitePath("/resume-sanket-borade.pdf")} className="hover:text-accent">Résumé ↗</a></div>
      </div>
    </footer>
  );
}
