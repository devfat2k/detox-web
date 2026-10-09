#!/usr/bin/env bun
/**
 * validate-skills.ts — kiểm tra tĩnh các Claude Code skills theo chuẩn
 * "The Complete Guide to Building Skills for Claude" (Anthropic).
 *
 * Chạy:   bun scripts/validate-skills.ts [--dir .claude/skills] [--strict] [--overlap 0.3]
 * Thoát:  0 = không có lỗi chặn | 1 = có lỗi (hoặc có cảnh báo khi --strict)
 *
 * Lỗi (error)     : sai cấu trúc/frontmatter, vi phạm quy tắc cứng, script giả/rỗng.
 * Cảnh báo (warn) : dấu hiệu rủi ro kích hoạt nhầm hoặc tốn token (mang tính heuristic).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

type Severity = "error" | "warning";
interface Issue {
  severity: Severity;
  skill: string;
  message: string;
}
interface SkillInfo {
  folder: string;
  name: string;
  description: string;
  hasExclusion: boolean;
  keywords: Set<string>;
}

// ---------- Cấu hình ----------
const MAX_DESC_CHARS = 1024; // giới hạn cứng theo tài liệu
const WARN_DESC_CHARS = 600; // mềm: description quá dài tốn token cố định
const MAX_BODY_WORDS = 5000; // theo tài liệu
const CHARS_PER_TOKEN = 3.8; // ước lượng thô, giống báo cáo audit
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WHEN_CUE =
  /(dùng khi|dùng cho|khi người dùng|khi nào|kích hoạt khi|use when|use for|use this|when the user|when user|\bwhen\b|trigger)/i;
const EXCLUSION_CUE =
  /(không dùng|do not use|don't use|not for|đừng dùng|tránh dùng)/i;
const QUOTED_PHRASE = /["“'‘][^"”'’\n]{2,}["”'’]/;
const PLACEHOLDER_PATTERNS: Array<[RegExp, string]> = [
  [/#\s*main logic here/i, '"# Main logic here"'],
  [/NotImplementedError/, "NotImplementedError"],
  [/TODO:?\s*implement/i, "TODO implement"],
];
const STOPWORDS = new Set(
  (
    "this that with from when user users code file files using used use for and the not into your have will " +
    "should claude skill skills then than also only any all can may one two " +
    "khi dùng không cho các của và một được theo trong với này những hoặc để cần rồi sau trước tạo viết " +
    "hàm file trên mới khác nào gì thì là có"
  ).split(" ")
);

// ---------- Tham số dòng lệnh ----------
function parseArgs(argv: string[]) {
  const opts = { dir: ".claude/skills", strict: false, overlap: 0.3, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--strict") opts.strict = true;
    else if (a === "--help" || a === "-h") opts.help = true;
    else if (a === "--dir") opts.dir = argv[++i] ?? opts.dir;
    else if (a === "--overlap") opts.overlap = Number(argv[++i] ?? opts.overlap);
  }
  return opts;
}

// ---------- Frontmatter (parser tối giản, đủ cho name/description) ----------
interface Frontmatter {
  data: Record<string, string>;
  body: string;
  problems: string[];
}

function parseFrontmatter(raw: string): Frontmatter | null {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  if (!m) return null;

  const data: Record<string, string> = {};
  const problems: string[] = [];
  const blocks: Record<string, string[]> = {};
  const styles: Record<string, string> = {};
  let current: string | null = null;

  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+):[ \t]*(.*)$/);
    if (kv && !/^\s/.test(line)) {
      current = kv[1];
      blocks[current] = [];
      data[current] = kv[2].trim();
      styles[current] = /^[>|][+-]?$/.test(data[current]) ? data[current][0] : "";
    } else if (current !== null) {
      blocks[current].push(line);
    }
  }

  for (const key of Object.keys(data)) {
    const cont = blocks[key].map((l) => l.trim()).filter((l) => l.length > 0);
    const style = styles[key];
    let value = data[key];
    if (style === "|") value = cont.join("\n");
    else if (style === ">") value = cont.join(" ");
    else if (cont.length > 0) value = [value, ...cont].filter(Boolean).join(" ");

    const q = value[0];
    if (style === "" && q !== '"' && q !== "'" && (key === "name" || key === "description") && /: | #/.test(value)) {
      problems.push(
        `"${key}" chứa ": " hoặc " #" nhưng không đặt trong nháy, YAML sẽ lỗi (dùng "description: >-" hoặc đặt trong nháy)`
      );
    }
    if ((q === '"' || q === "'") && (value.length < 2 || value[value.length - 1] !== q)) {
      problems.push(`giá trị "${key}" có dấu nháy không được đóng`);
    } else if ((q === '"' || q === "'") && value.length >= 2) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, body: text.slice(m[0].length), problems };
}

// ---------- Tiện ích ----------
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function keywordsOf(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w))
  );
}

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code: number, s: string) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);

// ---------- Kiểm tra từng skill ----------
function checkSkill(root: string, folder: string, issues: Issue[]): SkillInfo | null {
  const dir = join(root, folder);
  const add = (severity: Severity, message: string) => issues.push({ severity, skill: folder, message });
  const entries = readdirSync(dir);

  if (!KEBAB.test(folder)) {
    add("error", "tên thư mục phải là kebab-case (không dấu cách, gạch dưới hay chữ hoa)");
  }
  if (!entries.includes("SKILL.md")) {
    const variant = entries.find((e) => e.toLowerCase() === "skill.md");
    add("error", variant ? `file phải đặt tên đúng "SKILL.md" (đang là "${variant}")` : "thiếu SKILL.md");
    return null;
  }
  const readme = entries.find((e) => e.toLowerCase() === "readme.md");
  if (readme) add("error", `không đặt ${readme} trong thư mục skill (đưa nội dung vào SKILL.md hoặc references/)`);

  const fm = parseFrontmatter(readFileSync(join(dir, "SKILL.md"), "utf8"));
  if (!fm) {
    add("error", 'frontmatter không hợp lệ: cần "---" ở đầu file và một dòng "---" đóng');
    return null;
  }
  fm.problems.forEach((p) => add("error", `frontmatter: ${p}`));

  const name = fm.data["name"] ?? "";
  const description = fm.data["description"] ?? "";

  // name
  if (!name) add("error", 'thiếu trường "name"');
  else {
    if (!KEBAB.test(name)) add("error", `name "${name}" phải là kebab-case`);
    if (name !== folder) add("error", `name "${name}" không khớp tên thư mục "${folder}"`);
    if (/claude|anthropic/i.test(name)) add("error", `name "${name}" chứa từ khóa bị bảo lưu (claude/anthropic)`);
  }

  // description
  if (!description) add("error", 'thiếu trường "description"');
  else {
    if (description.length > MAX_DESC_CHARS) {
      add("error", `description ${description.length} ký tự, vượt giới hạn ${MAX_DESC_CHARS}`);
    } else if (description.length > WARN_DESC_CHARS) {
      add("warning", `description ${description.length} ký tự (> ${WARN_DESC_CHARS}), tốn token cố định mỗi lượt`);
    }
    if (/[<>]/.test(description)) add("error", "description chứa ký tự < hoặc > (bị cấm trong frontmatter)");
    if (!WHEN_CUE.test(description)) {
      add("warning", 'description chưa rõ "khi nào dùng" (ví dụ: "Dùng khi: ...", "Use when ...")');
    }
    if (!QUOTED_PHRASE.test(description)) {
      add("warning", "description chưa có cụm từ kích hoạt cụ thể trong dấu nháy (câu người dùng hay gõ)");
    }
  }

  // body
  const words = fm.body.split(/\s+/).filter(Boolean).length;
  if (words > MAX_BODY_WORDS) {
    add("warning", `SKILL.md ${words} từ (> ${MAX_BODY_WORDS}), nên chuyển chi tiết sang references/`);
  }
  if (entries.includes("references") && !/references\//.test(fm.body)) {
    add("warning", "có thư mục references/ nhưng SKILL.md không trỏ tới file nào trong đó");
  }

  // scripts giả / rỗng
  const scriptsDir = join(dir, "scripts");
  if (existsSync(scriptsDir) && statSync(scriptsDir).isDirectory()) {
    for (const file of walk(scriptsDir)) {
      if (statSync(file).size > 1_000_000) continue;
      const rel = relative(root, file);
      let content: string;
      try {
        content = readFileSync(file, "utf8");
      } catch {
        continue;
      }
      const hit = PLACEHOLDER_PATTERNS.find(([re]) => re.test(content));
      if (hit) {
        add("error", `${rel}: script giả/chưa cài đặt (gặp ${hit[1]})`);
        continue;
      }
      const meaningful = content
        .split("\n")
        .filter((l) => l.trim() && !/^\s*(#|\/\/)/.test(l)).length;
      if (meaningful < 3) add("warning", `${rel}: script gần như rỗng (${meaningful} dòng có nghĩa)`);
    }
  }

  return {
    folder,
    name: name || folder,
    description,
    hasExclusion: EXCLUSION_CUE.test(description),
    keywords: keywordsOf(description),
  };
}

// ---------- Kiểm tra chéo: trùng từ khóa giữa các description ----------
function checkOverlap(skills: SkillInfo[], threshold: number, issues: Issue[]) {
  for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
      const a = skills[i];
      const b = skills[j];
      if (a.keywords.size === 0 || b.keywords.size === 0) continue;
      const shared = [...a.keywords].filter((k) => b.keywords.has(k));
      const union = new Set([...a.keywords, ...b.keywords]).size;
      const jaccard = shared.length / union;
      if (jaccard < threshold) continue;
      const missing = [a, b].filter((s) => !s.hasExclusion).map((s) => s.folder);
      const hint = missing.length
        ? `; thiếu điều kiện loại trừ ở: ${missing.join(", ")}`
        : "; cả hai đã có điều kiện loại trừ, hãy chạy test kích hoạt để xác nhận";
      issues.push({
        severity: "warning",
        skill: `${a.folder} <> ${b.folder}`,
        message: `description trùng ${(jaccard * 100).toFixed(0)}% từ khóa (${shared.slice(0, 6).join(", ")})${hint}`,
      });
    }
  }
}

// ---------- Main ----------
function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log("Usage: bun scripts/validate-skills.ts [--dir .claude/skills] [--strict] [--overlap 0.3]");
    process.exit(0);
  }

  const root = resolve(opts.dir);
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(paint(31, `✖ Không tìm thấy thư mục skills: ${root}`));
    process.exit(1);
  }

  const folders = readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort();

  const issues: Issue[] = [];
  const infos: SkillInfo[] = [];
  for (const folder of folders) {
    const info = checkSkill(root, folder, issues);
    if (info) infos.push(info);
  }
  checkOverlap(infos, opts.overlap, issues);

  // In kết quả theo nhóm
  const groups = new Map<string, Issue[]>();
  for (const i of issues) groups.set(i.skill, [...(groups.get(i.skill) ?? []), i]);
  for (const [skill, list] of groups) {
    console.log(`\n${skill}`);
    for (const i of list) {
      const mark = i.severity === "error" ? paint(31, "  ✖") : paint(33, "  ⚠");
      console.log(`${mark} ${i.message}`);
    }
  }

  const errors = issues.filter((i) => i.severity === "error").length;
  const warnings = issues.length - errors;
  const descChars = infos.reduce((n, s) => n + s.description.length, 0);
  const tokens = Math.ceil(descChars / CHARS_PER_TOKEN);

  console.log(
    `\n${folders.length} skill | ${paint(31, `${errors} lỗi`)} | ${paint(33, `${warnings} cảnh báo`)} | ` +
      `description chiếm khoảng ${tokens} token cố định/lượt (ước lượng ${CHARS_PER_TOKEN} ký tự/token)`
  );

  const failed = errors > 0 || (opts.strict && warnings > 0);
  if (failed) {
    console.log(paint(31, opts.strict && errors === 0 ? "✖ Thất bại (chế độ --strict)" : "✖ Thất bại"));
    process.exit(1);
  }
  console.log(paint(32, "✔ Đạt"));
}

main();
