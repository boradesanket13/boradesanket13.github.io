import type { GithubRepo, GithubProfile } from "./types";

const GITHUB_USERNAME = "boradesanket13";
const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

// A token is required to read pinned repos (not exposed by REST API).
// Create a fine-grained PAT with public_repo (read) scope and set GITHUB_TOKEN in .env
const TOKEN = process.env.GITHUB_TOKEN;

const PINNED_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      bio
      url
      followers { totalCount }
      following { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            updatedAt
            primaryLanguage { name }
            languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
              nodes { name }
            }
          }
        }
      }
    }
  }
`;

async function fetchPinnedViaGraphQL(): Promise<{ profile: GithubProfile; repos: GithubRepo[] } | null> {
  if (!TOKEN) return null;
  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: PINNED_QUERY, variables: { login: GITHUB_USERNAME } }),
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return null;

    const profile: GithubProfile = {
      login: user.login,
      avatarUrl: user.avatarUrl,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      publicRepos: user.repositories.totalCount,
      bio: user.bio,
      url: user.url,
      contributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? null
    };

    const repos: GithubRepo[] = (user.pinnedItems.nodes || []).map((n: any) => ({
      id: n.id,
      name: n.name,
      description: n.description,
      url: n.url,
      homepageUrl: n.homepageUrl,
      stars: n.stargazerCount,
      forks: n.forkCount,
      primaryLanguage: n.primaryLanguage?.name ?? null,
      languages: (n.languages?.nodes || []).map((l: any) => l.name),
      isPinned: true,
      updatedAt: n.updatedAt
    }));

    return { profile, repos };
  } catch {
    return null;
  }
}

// The REST API has no endpoint for total contributions. Without a token we
// scrape the same public contributions calendar GitHub renders on profile
// pages (used by most "GitHub stats card" projects) and sum up the daily
// `data-count` attributes. No auth needed since the calendar is public.
async function fetchContributionsViaScrape(): Promise<number | null> {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const matches = [...html.matchAll(/data-count="(\d+)"/g)];
    if (matches.length === 0) return null;
    return matches.reduce((sum, m) => sum + Number(m[1]), 0);
  } catch {
    return null;
  }
}

async function fetchAllReposViaRest(): Promise<{ profile: GithubProfile; repos: GithubRepo[] } | null> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

    const [userRes, reposRes, contributions] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        headers,
        next: { revalidate: 3600 }
      }),
      fetchContributionsViaScrape()
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const reposJson = await reposRes.json();

    const profile: GithubProfile = {
      login: user.login,
      avatarUrl: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      bio: user.bio,
      url: user.html_url,
      contributions
    };

    const repos: GithubRepo[] = (reposJson || [])
      .filter((r: any) => !r.fork)
      .map((r: any) => ({
        id: String(r.id),
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepageUrl: r.homepage,
        stars: r.stargazers_count,
        forks: r.forks_count,
        primaryLanguage: r.language,
        languages: r.language ? [r.language] : [],
        isPinned: false,
        updatedAt: r.updated_at
      }));

    return { profile, repos };
  } catch {
    return null;
  }
}

/**
 * Resolution order:
 * 1. Pinned repos via GraphQL (needs GITHUB_TOKEN) — best result
 * 2. All repos via REST, grouped by language on the client — no token needed
 * 3. Caller falls back to data/resume.json projectsFallback
 */
export async function getGithubData(): Promise<{
  profile: GithubProfile | null;
  repos: GithubRepo[];
  source: "pinned" | "all" | "none";
}> {
  const pinned = await fetchPinnedViaGraphQL();
  if (pinned && pinned.repos.length > 0) {
    return { profile: pinned.profile, repos: pinned.repos, source: "pinned" };
  }

  const all = await fetchAllReposViaRest();
  if (all && all.repos.length > 0) {
    return { profile: all.profile, repos: all.repos, source: "all" };
  }

  return { profile: pinned?.profile ?? all?.profile ?? null, repos: [], source: "none" };
}
