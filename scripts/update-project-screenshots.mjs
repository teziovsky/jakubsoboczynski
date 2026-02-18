import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const ROOT_DIR = process.cwd();
const EN_PROJECT_DIR = path.join(ROOT_DIR, "src/data/project/en");
const OUTPUT_DIR = path.join(ROOT_DIR, "public");
const VIEWPORT = { width: 1366, height: 768 };
const WAIT_AFTER_LOAD_MS = 2500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1].split("\n");
  const data = {
    title: "",
    demoUrl: "",
    screenshotSrc: "",
    autoUpdateScreenshot: false,
  };

  let inScreenshot = false;

  for (const line of frontmatter) {
    if (line.startsWith("title:")) data.title = line.replace("title:", "").trim();
    if (line.startsWith("demoUrl:")) data.demoUrl = line.replace("demoUrl:", "").trim();
    if (line.startsWith("autoUpdateScreenshot:")) {
      data.autoUpdateScreenshot = line.replace("autoUpdateScreenshot:", "").trim() === "true";
    }

    if (line.startsWith("screenshot:")) {
      inScreenshot = true;
      continue;
    }

    if (inScreenshot && /^\S/.test(line)) {
      inScreenshot = false;
    }

    if (inScreenshot && line.trim().startsWith("src:")) {
      data.screenshotSrc = line.trim().replace("src:", "").trim();
    }
  }

  return data;
}

function resolveScreenshotPath(screenshotSrc) {
  if (!screenshotSrc?.startsWith("/")) {
    throw new Error(`Screenshot source must start with '/'. Received: ${screenshotSrc}`);
  }

  return path.join(OUTPUT_DIR, screenshotSrc);
}

async function getProjectsToUpdate() {
  const files = await fs.readdir(EN_PROJECT_DIR);
  const projects = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

    const filePath = path.join(EN_PROJECT_DIR, file);
    const raw = await fs.readFile(filePath, "utf8");
    const data = parseFrontmatter(raw);

    if (!data) continue;

    projects.push({ id: file, ...data });
  }

  return projects.filter((project) => project.autoUpdateScreenshot);
}

async function screenshotToWebp(page, outputPath) {
  const tempPng = `${outputPath}.tmp.png`;

  await page.screenshot({ path: tempPng, fullPage: false });

  await execFileAsync("cwebp", ["-q", "85", tempPng, "-o", outputPath]);
  await fs.rm(tempPng, { force: true });
}

async function updateProjectScreenshot(page, project) {
  const outputPath = resolveScreenshotPath(project.screenshotSrc);

  await page.setViewportSize(VIEWPORT);
  await page.goto(project.demoUrl, {
    waitUntil: "networkidle",
    timeout: 90_000,
  });
  await sleep(WAIT_AFTER_LOAD_MS);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await screenshotToWebp(page, outputPath);

  console.log(`✅ Updated screenshot for ${project.title} (${project.id}) -> ${project.screenshotSrc}`);
}

async function main() {
  const projects = await getProjectsToUpdate();

  if (projects.length === 0) {
    console.log("No projects configured for automatic screenshot updates.");
    return;
  }

  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    throw new Error(
      "Missing dependency: playwright. Install it with your package manager (for example, `pnpm add -D playwright`) or add it to your dependencies.",
    );
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    for (const project of projects) {
      await updateProjectScreenshot(page, project);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("❌ Screenshot update failed:", error);
  process.exitCode = 1;
});
