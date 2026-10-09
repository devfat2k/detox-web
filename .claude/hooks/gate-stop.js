#!/usr/bin/env node

/**
 * Stop Hook: gate-stop
 * Ensures TypeScript check and lint pass before Claude stops.
 */

const { execSync } = require("child_process");

let inputData = "";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  inputData += chunk;
});

process.stdin.on("end", () => {
  let stopHookActive = false;

  if (inputData.trim()) {
    try {
      const payload = JSON.parse(inputData);
      stopHookActive = Boolean(payload.stop_hook_active);
    } catch {
      // ignore JSON parse error
    }
  }

  const errors = [];

  // 1. Run typecheck
  try {
    execSync("bun run typecheck", {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
    });
  } catch (err) {
    const output = (err.stderr || "") + (err.stdout || "");
    errors.push(`[Typecheck Error]:\n${output.trim()}`);
  }

  // 2. Run lint
  try {
    execSync("bun run lint", {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
    });
  } catch (err) {
    const output = (err.stderr || "") + (err.stdout || "");
    errors.push(`[Lint Error]:\n${output.trim()}`);
  }

  if (errors.length > 0) {
    console.error(`[gate-stop] Checks failed. Please fix before concluding turn:\n\n${errors.join("\n\n")}`);
    process.exit(2);
  }

  process.exit(0);
});
