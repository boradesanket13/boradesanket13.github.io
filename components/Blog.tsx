"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Rss } from "lucide-react";
import type { HashnodeStats } from "@/lib/types";
import hashnodeData from "@/data/generated/hashnode.json";

const BLOG_URL = "https://boradesanket13.hashnode.dev";
const data = hashnodeData as HashnodeStats;

export function Blog() {
  if (!data?.posts?.length) return null;

  const posts = [...data.posts, ...data.posts];

  return (
    <section id="writing" className="overflow-hidden border-y border-hairline bg-elevated/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
              04 / WRITING
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Recent Writings
            </h2>
          </div>

          <a
            href={BLOG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-fg-dim transition-colors hover:text-accent"
          >
            <Rss size={14} />
            Hashnode
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: Math.max(data.posts.length * 8, 32),
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {posts.map((post, index) => (
              <a
                key={`${post.id}-${index}`}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="group flex w-[310px] shrink-0 flex-col overflow-hidden rounded-2xl border border-hairline bg-bg transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 sm:w-[360px]"
              >
                {post.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-hairline bg-elevated">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex min-h-52 flex-col p-5">
                  <h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-fg-dim">
                    {post.brief}
                  </p>

                  <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                    <Clock size={12} />
                    {post.readTimeMinutes} min read
                    <span className="ml-auto">Read ↗</span>
                  </div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
