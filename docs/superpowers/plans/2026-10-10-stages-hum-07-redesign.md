# Section 2 Stages Progression (Hum-07 DNA) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine Section 2 (Stages Section) on Homepage (`/`) matching Hallmark Hum-07 "Four stages, start to slice" design pattern with seamless vertical timeline, stage cards, duration pills, and plan links.

**Architecture:** Server Component in `src/app/(site)/page.tsx` rendering stage timeline data with CSS design tokens.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, Lucide React icons, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-10-stages-hum-07-spec.md`

## Global Constraints

- **Typography:** Be Vietnam Pro font only (weights 300, 400, 500, 600). NO `font-bold` (700+).
- **Design Tokens:** Strict use of CSS tokens from `src/app/globals.css`. No raw hex (`#...`), no default Tailwind colors, no gradients, no backdrop-blur.
- **Iconography & Copy:** `lucide-react` icons with `strokeWidth={1.75}`. NO emojis, NO text used as icons. Honest copy.
- **Testing:** Unit tests executed via `bun run test`. Must pass `bun run typecheck` and `bun run lint`.

## Review Focus

1. **Continuous Vertical Timeline:** Ensure vertical line `bg-primary/25` connects seamlessly without misalignment across breakpoints.
2. **Badge & Typography Hierarchy:** Ensure badges `1.0`, `2.0`, `3.0` are clear and use `font-semibold`.
3. **Pill Badges & Tap Targets:** Badges have proper spacing and links have min-height 44px tap targets on mobile.
4. **Responsive Stacking:** Clean flex/grid layout on 390px mobile and 1280px desktop.

---

### Task 1: Refine Section 2 Markup & Polish (Hum-07 Stages Progression)

**Files:**
- Modify: `src/app/(site)/page.tsx`
- Test: `src/test/app-screens.test.tsx`

**Interfaces:**
- Consumes: `PLANS_DATA` from `src/data/plans.ts`, `PLAN_STAGE_DETAILS`
- Produces: Polished vertical timeline stage progression matching Hum-07.

- [ ] **Step 1: Check existing test coverage in `src/test/app-screens.test.tsx`**

Verify assertions for `1.0`, `2.0`, `3.0`, and plan titles already exist.

- [ ] **Step 2: Polish Section 2 in `src/app/(site)/page.tsx`**

Ensure:
- Vertical timeline line is properly aligned with badge centers.
- Badge has `w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent-soft text-primary font-heading font-semibold border border-border/80`.
- Stage cards have `rounded-2xl border border-border bg-surface p-5 sm:p-7 shadow-2xs hover:border-primary/50 transition-colors`.
- Duration & intensity pills have crisp styling with token borders.

- [ ] **Step 3: Run typecheck, lint, and tests**

Run: `bun run typecheck && bun run lint && bun run test`
Expected: ALL PASS with 0 errors.

---

### Task 2: Build & Verification

- [ ] **Step 1: Execute production build**

Run: `bun run build`
Expected: Build succeeds cleanly with 0 TypeScript/ESLint warnings.
