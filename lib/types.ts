export interface GithubRepo {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  forks: number;
  fork: boolean;
  primaryLanguage: string | null;
  languages: string[];
  isPinned: boolean;
  updatedAt: string;
}

export interface GithubProfile {
  login: string;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  bio: string | null;
  url: string;
  contributions: number | null;
}
