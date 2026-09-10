// lib/hashnode.ts
import type { BlogPost, HashnodeStats } from "./types";

// Hashnode retired free GraphQL API access on 2026-05-13 — every query
// (reads included) now requires a paid Pro plan on the publication.
// See: https://hashnode.com/changelog/2026-05-13-graphql-api-paid-access
//
// This uses the blog's public RSS feed instead, which stays free and
// unauthenticated. Trade-off: RSS doesn't carry live follower counts or
// per-post view/reaction counts, so those are no longer auto-fetched.
// `followers` is always null here — if you want a number to show, add it
// manually as `stats.hashnodeFollowers` in data/header.json and read it
// from there in the UI; there's no free way to fetch it live anymore.

const HASHNODE_RSS_URL = "https://boradesanket13.hashnode.dev/rss.xml";
const POST_LIMIT = 6;

function extractTag(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!m) return null;
  return m[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function extractAttr(xml: string, tag: string, attr: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"[^>]*/?>`));
  return m ? m[1] : null;
}

// Hashnode's RSS feed doesn't emit <media:content>/<enclosure> for the
// cover image — it's just the first <img> inside the post's HTML content.
// This has to run on the raw (un-stripped) HTML, before stripHtml() below.
function extractFirstImageSrc(html: string): string | null {
  const m = html.match(/<img[^>]+src="([^"]+)"/);
  return m ? m[1] : null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(plainText: string): number {
  const words = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugFromLink(link: string): string {
  try {
    return new URL(link).pathname.replace(/^\/|\/$/g, "");
  } catch {
    return link;
  }
}

/**
 * Returns the 6 most Recent Writings from the RSS feed, or null if the feed
 * is unreachable / empty. Follower and per-post view/reaction counts are
 * no longer fetched (Hashnode paywalled the API that exposed them) —
 * callers should hide those fields rather than show stale/zero numbers.
 */
export async function getHashnodeData(): Promise<HashnodeStats | null> {
  try {
    const res = await fetch(HASHNODE_RSS_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const xml = await res.text();

    const rawItems = xml.split("<item>").slice(1).slice(0, POST_LIMIT);
    if (rawItems.length === 0) return null;

    const posts: BlogPost[] = rawItems.map((chunk, i) => {
      const item = chunk.split("</item>")[0];
      const title = extractTag(item, "title") ?? "Untitled";
      const link = extractTag(item, "link") ?? HASHNODE_RSS_URL;
      const pubDate = extractTag(item, "pubDate");
      const guid = extractTag(item, "guid");
      const rawContent =
        extractTag(item, "content:encoded") ?? extractTag(item, "description") ?? "";
      const plain = stripHtml(rawContent);
      const coverImage =
        extractFirstImageSrc(rawContent) ??
        extractAttr(item, "media:content", "url") ??
        extractAttr(item, "enclosure", "url") ??
        null;

      return {
        id: guid ?? link ?? `hashnode-post-${i}`,
        title,
        brief: plain.length > 160 ? `${plain.slice(0, 157)}...` : plain,
        slug: slugFromLink(link),
        url: link,
        coverImage,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        readTimeMinutes: estimateReadTime(plain)
      };
    });

    return { followers: null, posts };
  } catch {
    return null;
  }
}