# Sanket Borade — Portfolio

Recruiter-focused static portfolio for a Java/Spring Software Engineer.

## Architecture

The site is intentionally **static** so it can be deployed to GitHub Pages without a Node.js server.

```text
GitHub API
    │
    │ GitHub Actions (build time)
    ▼
data/generated/github.json
    │
    ▼
Next.js static export
    │
    ▼
GitHub Pages
```

The GitHub integration is still API-driven, but API calls happen in GitHub Actions rather than in the visitor's browser. This removes runtime API failures, CORS concerns and the need for server-side Next.js routes.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages** and select **GitHub Actions** as the source.
3. Push to `main`; `.github/workflows/deploy-pages.yml` builds and deploys the static site.
4. Optionally add the `PORTFOLIO_GH_TOKEN` repository secret for GitHub GraphQL access and pinned repositories. Without it, the public REST API fallback is used.

The Pages workflow supplies the correct base path automatically, so both a project site and a `username.github.io` site work.

## Data refresh

`.github/workflows/update-data.yml` refreshes the GitHub snapshot every 6 hours and commits it when it changes. The deployment workflow also refreshes the snapshot immediately before each build.

## Local development

```bash
npm ci
npm run dev
```

Production static build:

```bash
npm run build
```

The generated site is in `out/`.

## Content

- `data/header.json` — headline/contact data
- `data/resume.json` — experience, skills, education and projects
- `data/socials.json` — external profiles
- `data/generated/github.json` — build-time GitHub snapshot
