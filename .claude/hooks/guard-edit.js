#!/usr/bin/env node

/**
 * PreToolUse Hook: guard-edit
 * Blocks edits/writes that violate privacy, security, or design rules.
 */

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
    const textToCheck = (toolInput.content || "") + (toolInput.new_string || "");

    // 1. Block .env* file modifications
    if (/(^|[/\\])\.env/i.test(filePath)) {
      console.error("[guard-edit] Blocked: Modifying .env files is strictly forbidden.");
      process.exit(2);
    }

    // 2. Block client persistence in source code
    const isSourceCode = (filePath.includes("src/") || filePath.includes("src\\")) && /\.(ts|tsx|js|jsx)$/.test(filePath);
    if (isSourceCode && /(localStorage|sessionStorage|document\.cookie)/.test(textToCheck)) {
      console.error(
        "[guard-edit] Blocked: Usage of localStorage, sessionStorage, or document.cookie violates client-side privacy rules."
      );
      process.exit(2);
    }

    // 3. Block raw hex codes in UI components (excluding CSS files)
    const isUIFile =
      (filePath.includes("src/components/") || filePath.includes("src/app/")) &&
      !filePath.endsWith(".css");

    if (isUIFile && /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/.test(textToCheck)) {
      console.error(
        "[guard-edit] Blocked: Raw hex colors are not allowed in components. Use tokens from globals.css."
      );
      process.exit(2);
    }

    // 4. Block forbidden visual elements (gradients, blur, animations)
    const forbiddenVisualPattern =
      /\b(bg-gradient-|linear-gradient|backdrop-blur|blur-|animate-pulse|animate-bounce|animate-ping)\b/;
    if (isUIFile && forbiddenVisualPattern.test(textToCheck)) {
      console.error(
        "[guard-edit] Blocked: Forbidden visual effects detected (gradients, blur, or decorative animations)."
      );
      process.exit(2);
    }

    process.exit(0);
  } catch (err) {
    // If JSON parsing fails, do not block the operation
    process.exit(0);
  }
});
