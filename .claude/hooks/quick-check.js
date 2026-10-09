#!/usr/bin/env node

/**
 * PostToolUse Hook: quick-check
 * Runs ESLint on modified TypeScript/JavaScript files.
 */

const { execSync } = require("child_process");

let inputData = "";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  inputData += chunk;
});

process.stdin.on("end", () => {
  if (!inputData.trim()) {
    process.exit(0);
  }

  try {
    const payload = JSON.parse(inputData);
    const toolInput = payload.tool_input || {};
    const filePath = toolInput.file_path || "";

    // Only lint JS/TS files
    if (!/\.(ts|tsx|js|jsx|mjs)$/.test(filePath)) {
      process.exit(0);
    }

    try {
      execSync(`npx eslint "${filePath}"`, {
        stdio: ["ignore", "pipe", "pipe"],
        encoding: "utf8",
      });
      process.exit(0);
    } catch (error) {
      const stderr = error.stderr || error.stdout || error.message;
      console.error(`[quick-check] ESLint errors in ${filePath}:\n${stderr}`);
      process.exit(2);
    }
  } catch (err) {
    process.exit(0);
  }
});
