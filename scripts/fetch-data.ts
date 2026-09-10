/**
 * Fetches public GitHub data and snapshots it into source-controlled JSON.
 * The portfolio is a static export, so external API calls happen in GitHub Actions,
 * never in the visitor's browser.
 *
 * Run: npm run fetch:data
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getGithubData } from "../lib/github";

const OUT_DIR = path.join(process.cwd(), "data", "generated");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const github = await getGithubData();

  await writeFile(
    path.join(OUT_DIR, "github.json"),
    JSON.stringify(github, null, 2)
  );

  console.log(`GitHub snapshot written: ${github.source}, ${github.repos.length} repos`);
}

main().catch((error) => {
  console.error("fetch:data failed:", error);
  process.exit(1);
});
