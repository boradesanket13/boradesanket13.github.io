"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import headerData from "@/data/header.json";
import socials from "@/data/socials.json";
import { sitePath } from "@/lib/site";

const social = (id: string) => socials.find((item) => item.id === id)?.url ?? "#";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-36 sm:pb-24 sm:pt-44">
        <div>
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-8 bg-accent" /> Software Engineer · Java Backend
            </motion.div>


            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="eyesome-script mt-6 text-6xl tracking-wide sm:text-8xl">
              Sanket Borade
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="mt-6 max-w-2xl text-lg leading-8 text-fg-dim sm:text-xl">
              Software Engineer building reliable backend systems with <strong className="font-medium text-fg">Java, Spring and REST APIs</strong>. Production experience with high-throughput enterprise systems, CI/CD, automation and distributed deployments.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="mt-8 flex flex-wrap gap-3">
              <a href={sitePath(headerData.resumeUrl)} download className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:-translate-y-0.5">
                <Download size={16} /> Resume
              </a>
              <a href={social("linkedin")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent">
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
              </a>
              <a href={social("github")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent">
                <Github size={16} /> GitHub <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>

        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-5 font-mono text-xs text-fg-dim">
          <span>Based in Mumbai</span><span className="text-border">·</span><span>Open to Pune</span><span className="text-border">·</span><a href={`mailto:${headerData.email}`} className="inline-flex items-center gap-1.5 hover:text-accent"><Mail size={13} /> {headerData.email}</a>
        </div>
      </div>
    </section>
  );
}
