# Codex Skin Source Image Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a bilingual, tool-neutral, copyable source-image prompt and tested safe-zone guidance that helps one image remain usable in both the Codex home banner and task background.

**Architecture:** Extend the typed guide-block model with a semantic prompt block and render it through a focused client component. Add localized content to the existing customize guides, expose a short content-driven note on the Dream Skin landing pages, and update customize metadata and sitemap freshness without adding routes, dependencies, uploads, or third-party tool changes.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript 5.9, CSS, Vitest 4, Testing Library, static bilingual content, Vercel.

## Global Constraints

- Keep public routes at 12; do not create another page or navigation item.
- Label the guidance `CodexSkin tested composition guidance` / `CodexSkin 实测构图建议`.
- Do not present the safe-zone values as OpenAI or upstream-project requirements.
- Do not name or recommend an image-generation provider, model, or affiliate service.
- Preserve the upstream-documented platform boundary: macOS has a local image workflow; current Windows documentation does not expose the same picker.
- The practical face-center range is 70%–82% of canvas width and 35%–50% of canvas height; the copyable prompt uses 45% height.
- The source canvas is 20:9, subject height is no more than 45%, and the left 55% is dark low-detail negative space.
- Important details stay away from the bottom composer region; the image contains no text, logo, border, or UI elements.
- Two-image support (20:9 home plus 16:9 task) and a focal-position control are future CodexSkin direction, not current functionality.
- Do not modify, host, proxy, repackage, or automatically download third-party installers or tool code.
- Preserve AdSense, analytics, GSC metadata, canonical/hreflang behavior, robots, ads.txt, and unrelated changes.

---

### Task 1: Add a semantic copyable prompt block

**Files:**
- Create: `src/components/guides/prompt-block.tsx`
- Modify: `src/components/guides/guide-section.tsx`
- Modify: `src/content/types.ts`
- Modify: `src/app/globals.css`
- Create: `tests/prompt-block.test.tsx`
- Modify: `tests/guide-page.test.tsx`

**Interfaces:**
- Consumes: existing `GuideContent.copyLabel`, `copiedLabel`, and `copyFailedLabel` strings.
- Produces: `GuideBlock` variant `{ type: "prompt"; text: string }` and `PromptBlock({ text, copyLabel, copiedLabel, copyFailedLabel })`.

- [ ] **Step 1: Write failing PromptBlock interaction tests**

Create `tests/prompt-block.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PromptBlock } from "@/components/guides/prompt-block";

describe("PromptBlock", () => {
  it("copies only the source-image prompt and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const user = userEvent.setup();

    render(
      <PromptBlock
        text="20:9 source-image prompt"
        copyLabel="Copy prompt"
        copiedLabel="Prompt copied"
        copyFailedLabel="Select and copy the prompt"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Copy prompt" }));
    expect(writeText).toHaveBeenCalledOnce();
    expect(writeText).toHaveBeenCalledWith("20:9 source-image prompt");
    expect(screen.getByRole("status")).toHaveTextContent("Prompt copied");
  });

  it("keeps the prompt selectable when clipboard access fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    render(
      <PromptBlock
        text="20:9 source-image prompt"
        copyLabel="Copy prompt"
        copiedLabel="Prompt copied"
        copyFailedLabel="Select and copy the prompt"
      />,
    );

    expect(screen.getByText("20:9 source-image prompt")).toBeVisible();
  });
});
```

- [ ] **Step 2: Write a failing guide rendering test**

Add to `tests/guide-page.test.tsx`:

```tsx
it("renders the customize prompt as prose rather than a shell command", () => {
  render(<GuidePage locale="zh" routeKey="customize" />);

  const prompt = screen.getByText(/20:9 超宽电影感桌面壁纸/);
  expect(prompt.closest(".prompt-block")).not.toBeNull();
  expect(prompt.closest(".command-block")).toBeNull();
  expect(screen.getByRole("button", { name: "复制提示词" })).toBeVisible();
});
```

- [ ] **Step 3: Run the focused tests and verify failure**

Run:

```bash
npm test -- tests/prompt-block.test.tsx tests/guide-page.test.tsx
```

Expected: FAIL because `PromptBlock` and the `prompt` block variant do not exist.

- [ ] **Step 4: Extend the guide-block type**

In `src/content/types.ts`, use:

```ts
export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "prompt"; text: string }
  | { type: "code"; code: string; language: "bash" | "powershell" };
```

Add localized prompt-action fields to `GuideContent`:

```ts
promptCopyLabel: string;
promptCopiedLabel: string;
promptCopyFailedLabel: string;
```

- [ ] **Step 5: Implement PromptBlock**

Create `src/components/guides/prompt-block.tsx` with the same clipboard fallback, 2.2-second status reset, cleanup, and polite live region pattern used by `CommandBlock`. Render:

```tsx
<div className="prompt-block">
  <p tabIndex={0}>{text}</p>
  <button type="button" onClick={copy}>
    {status === "copied" ? copiedLabel : copyLabel}
  </button>
  <span className="sr-only" role="status" aria-live="polite">
    {message}
  </span>
</div>
```

The clipboard payload must be exactly `text`.

- [ ] **Step 6: Render prompt blocks in GuideSection**

In `src/components/guides/guide-section.tsx`, import `PromptBlock` and add this branch before the code fallback:

```tsx
if (block.type === "prompt") {
  return (
    <PromptBlock
      key={index}
      text={block.text}
      copyLabel={content.promptCopyLabel}
      copiedLabel={content.promptCopiedLabel}
      copyFailedLabel={content.promptCopyFailedLabel}
    />
  );
}
```

- [ ] **Step 7: Add prompt styling**

In `src/app/globals.css`, add a `.prompt-block` variant that visually matches `.command-block` but uses wrapped prose (`white-space: pre-wrap`, readable sans-serif text, `overflow-wrap: anywhere`) and preserves a 44px minimum copy-button target. At `max-width: 560px`, place the button above or below the prompt without horizontal overflow.

- [ ] **Step 8: Run focused tests and typecheck**

Run:

```bash
npm test -- tests/prompt-block.test.tsx tests/guide-page.test.tsx
npm run typecheck
```

Expected: all pass.

- [ ] **Step 9: Commit the prompt component**

```bash
git add src/components/guides/prompt-block.tsx src/components/guides/guide-section.tsx src/content/types.ts src/app/globals.css tests/prompt-block.test.tsx tests/guide-page.test.tsx
git commit -m "feat: add copyable guide prompt block"
```

---

### Task 2: Publish the bilingual tested composition workflow

**Files:**
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`
- Modify: `src/content/types.ts`
- Modify: `src/components/dream-skin/dream-skin-page.tsx`
- Modify: `tests/content.test.ts`
- Modify: `tests/dream-skin-page.test.tsx`
- Modify: `tests/guide-page.test.tsx`

**Interfaces:**
- Consumes: Task 1's `prompt` GuideBlock and localized prompt-action fields.
- Produces: complete bilingual customize-guide sections and `DreamSkinContent.materialsPracticeNote`.

- [ ] **Step 1: Write failing localized content-contract tests**

Add to `tests/content.test.ts`:

```ts
it.each(["en", "zh"] as const)(
  "contains complete %s tested source-image guidance",
  (locale) => {
    const guide = contentByLocale[locale].guides.customize;
    const serialized = JSON.stringify(guide);
    const prompt = guide.sections
      .flatMap((section) => section.blocks)
      .find((block) => block.type === "prompt");

    expect(serialized).toContain("20:9");
    expect(serialized).toMatch(/70%.*82%|70%至82%/);
    expect(serialized).toMatch(/35%.*50%|35%至50%/);
    expect(serialized).toContain("45%");
    expect(serialized).toContain("55%");
    expect(serialized).toContain("16:9");
    expect(prompt?.type).toBe("prompt");
    expect(contentByLocale[locale].dreamSkin.materialsPracticeNote).toBeTruthy();
  },
);

it("keeps the source-image guide tool-neutral and future capabilities honest", () => {
  const content = JSON.stringify({
    en: contentByLocale.en.guides.customize,
    zh: contentByLocale.zh.guides.customize,
  });

  expect(content).not.toMatch(/Midjourney|Stable Diffusion|Flux|DALL.E/i);
  expect(content).not.toMatch(/currently supports two images|当前支持双图/i);
});
```

- [ ] **Step 2: Write failing Dream Skin internal-link tests**

Add to `tests/dream-skin-page.test.tsx`:

```tsx
it.each([
  ["en", "One source image serves both the home banner and task background", "Get the usable source-image prompt", "/guide/customize"],
  ["zh", "同一张原图会同时用于首页横幅和任务页背景", "获取可用原图提示词", "/zh/guide/customize"],
] as const)("links %s visitors to the tested source-image guide", (locale, note, label, href) => {
  render(<DreamSkinPage locale={locale} />);
  expect(screen.getByText(new RegExp(note))).toBeVisible();
  expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
});
```

- [ ] **Step 3: Run the content and page tests and verify failure**

Run:

```bash
npm test -- tests/content.test.ts tests/dream-skin-page.test.tsx tests/guide-page.test.tsx
```

Expected: FAIL because the new guide sections, prompt actions, practice note, and labels are missing.

- [ ] **Step 4: Add content-driven practice-note typing**

In `DreamSkinContent` add:

```ts
materialsPracticeNote: string;
```

- [ ] **Step 5: Add localized prompt action labels to every guide through guideAttribution**

English:

```ts
promptCopyLabel: "Copy prompt",
promptCopiedLabel: "Prompt copied",
promptCopyFailedLabel: "Select and copy the prompt manually",
```

Chinese:

```ts
promptCopyLabel: "复制提示词",
promptCopiedLabel: "提示词已复制",
promptCopyFailedLabel: "请手动选择并复制提示词",
```

- [ ] **Step 6: Add the exact English customize sections**

After `prepare` and before `picker`, insert:

- `single-image`: explain one image serves the home banner and task background and requires a compromise.
- `composition`: title `CodexSkin tested composition guidance`; include 20:9, x 70%–82%, y 35%–50%, subject height <=45%, left 55%, bottom composer avoidance, restrained detail, and no text/logo/border/UI.
- `source-prompt`: paragraph explaining the tool-neutral prompt and this exact block:

```ts
{
  type: "prompt",
  text: "20:9 ultrawide cinematic desktop wallpaper, a small subject positioned in the right third, full head visible with generous headroom, face center at 70% to 82% of the canvas width and approximately 45% of the canvas height, subject height no more than 45% of the canvas, left 55% reserved as dark low-detail negative space, key subject kept within the central vertical safe zone, important details kept away from the bottom composer area, restrained background detail for readable task text, no text, no logo, no border, no UI elements.",
}
```
- `validate`: ordered-language list expressed as five list items: generate, crop-check, apply with the upstream-documented macOS workflow, inspect both surfaces, adjust.
- `future`: note that a 20:9 home image plus 16:9 task image and focal-position control would be ideal future CodexSkin support and do not exist today.

Update English customize SEO description to:

```text
Generate a usable Codex skin source image with tested safe-zone composition, a copyable 20:9 background prompt, and the documented macOS workflow.
```

- [ ] **Step 7: Add the exact Chinese customize sections**

Mirror Step 6 with these titles:

- `为什么单图需要安全构图`
- `CodexSkin 实测构图建议`
- `可复制的 Codex 皮肤原图提示词`
- `同时验收首页与任务页`
- `更理想的后续方案：双图与焦点位置`

Use this exact prompt block:

```ts
{
  type: "prompt",
  text: "20:9 超宽电影感桌面壁纸，人物较小地位于右侧三分之一，完整头部可见并保留充足头顶空间，脸部中心位于画面宽度的70%至82%、画面高度约45%，人物高度不超过画面45%，左侧55%为暗色低细节负空间，关键主体位于中央垂直安全区，重要细节远离底部输入框区域，背景细节克制以保证正文可读性，无文字、无Logo、无边框、无界面元素。",
}
```

Update the SEO description to:

```text
使用 CodexSkin 实测安全区构图和可复制的 20:9 背景图提示词，生成可用于首页与任务页的 Codex 皮肤原图，再通过 macOS 流程应用。
```

- [ ] **Step 8: Add the Dream Skin practice note and stronger label**

English:

```ts
materialsPracticeNote:
  "One source image serves both the home banner and task background, so usable results need a deliberate safe-zone composition.",
customizeLabel: "Get the usable source-image prompt",
```

Chinese:

```ts
materialsPracticeNote:
  "同一张原图会同时用于首页横幅和任务页背景，因此真正可用的结果需要按安全区构图。",
customizeLabel: "获取可用原图提示词",
```

Render `content.materialsPracticeNote` in `DreamSkinPage` as a visually distinct `<p className="dream-skin-practice-note">` between the materials disclaimer and actions.

- [ ] **Step 9: Add minimal practice-note styling**

In `src/app/globals.css`, style `.dream-skin-practice-note` with a left accent border, restrained surface background, readable muted text, and no fixed width that could overflow mobile.

- [ ] **Step 10: Run focused tests and typecheck**

Run:

```bash
npm test -- tests/content.test.ts tests/dream-skin-page.test.tsx tests/guide-page.test.tsx tests/prompt-block.test.tsx
npm run typecheck
```

Expected: all pass.

- [ ] **Step 11: Commit bilingual content**

```bash
git add src/content/en.ts src/content/zh.ts src/content/types.ts src/components/dream-skin/dream-skin-page.tsx src/app/globals.css tests/content.test.ts tests/dream-skin-page.test.tsx tests/guide-page.test.tsx
git commit -m "feat: publish Codex skin source image guidance"
```

---

### Task 3: Update sitemap freshness and complete release verification

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `tests/seo.test.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: existing route key `customize` and the completed bilingual content.
- Produces: customize sitemap freshness at `2026-07-20`, unchanged 12-route contract, and updated project documentation.

- [ ] **Step 1: Write a failing customize sitemap test**

Add to `tests/seo.test.ts`:

```ts
const customizeEntries = entries.filter((entry) =>
  entry.url.endsWith("/guide/customize"),
);
expect(customizeEntries).toHaveLength(2);
for (const entry of customizeEntries) {
  expect(entry.lastModified).toEqual(
    new Date("2026-07-20T00:00:00.000Z"),
  );
  expect(entry.changeFrequency).toBe("monthly");
  expect(entry.priority).toBe(0.8);
}
```

- [ ] **Step 2: Run the SEO test and verify failure**

Run:

```bash
npm test -- tests/seo.test.ts
```

Expected: FAIL because customize entries still use `2026-07-16`.

- [ ] **Step 3: Make sitemap dates route-aware**

In `src/app/sitemap.ts`, add:

```ts
const isCustomize = key === "customize";

lastModified: new Date(
  isCustomize
    ? "2026-07-20T00:00:00.000Z"
    : isDreamSkin
      ? "2026-07-18T00:00:00.000Z"
      : "2026-07-16T00:00:00.000Z",
),
```

Do not change route count, frequency, priority, or alternates.

- [ ] **Step 4: Update README content scope**

Under the public-route/source-boundary text, state that the customize guide includes tool-neutral CodexSkin tested composition guidance and a copyable prompt. State that two-image/focal-position support remains future work.

- [ ] **Step 5: Run the full automated release gate**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
git diff --check
```

Expected: 0 test failures, no lint/type errors, successful static build with 12 public content routes, and no whitespace errors.

- [ ] **Step 6: Run local production verification**

Start:

```bash
npm run start -- --hostname 127.0.0.1 --port 3100
```

Then run:

```bash
SITE_ORIGIN=http://127.0.0.1:3100 npm run verify:site
```

Expected: `Verified 12 routes and 5 SEO endpoints.`

- [ ] **Step 7: Perform responsive browser verification**

At 390px and 1440px verify `/guide/customize` and `/zh/guide/customize`:

- one H1;
- no horizontal overflow;
- no error overlay or console errors;
- prompt wraps without clipping;
- copy button is visible and keyboard reachable;
- platform boundary, tested-guidance attribution, exact percentages, and future-only two-image note are visible.

- [ ] **Step 8: Commit release metadata**

```bash
git add src/app/sitemap.ts tests/seo.test.ts README.md
git commit -m "test: verify source image guide SEO"
```

---

### Task 4: Merge through develop and deploy production

**Files:** No content changes; Git and deployment operations only.

**Interfaces:**
- Consumes: clean, verified `develop` branch containing all plan commits.
- Produces: `origin/develop`, merged `origin/main`, and a verified Vercel production deployment.

- [ ] **Step 1: Verify branch and commit state**

Run:

```bash
git status --short --branch
git log --oneline --decorate -8
```

Expected: clean `develop` branch with the design, plan, prompt component, bilingual content, and release metadata commits.

- [ ] **Step 2: Push develop**

```bash
git push -u origin develop
```

Expected: `origin/develop` is created or updated without force-push.

- [ ] **Step 3: Merge develop into main**

```bash
git switch main
git merge --no-ff develop -m "merge: publish Codex skin source image guide"
```

Expected: clean merge; do not reset or discard unrelated work.

- [ ] **Step 4: Re-run tests on merged main**

```bash
npm test
npm run typecheck
```

Expected: all tests pass and TypeScript exits 0.

- [ ] **Step 5: Push main to trigger Vercel production**

```bash
git push origin main
```

Expected: GitHub accepts the merge commit and Vercel starts a production deployment.

- [ ] **Step 6: Wait for and verify production**

Run until the new deployment is active:

```bash
SITE_ORIGIN=https://codexskin.site npm run verify:site
```

Expected: `Verified 12 routes and 5 SEO endpoints.` Then directly confirm both live customize pages include the new prompt heading and exact safe-zone values.

- [ ] **Step 7: Confirm repository synchronization**

```bash
git status --short --branch
git rev-parse main
git rev-parse origin/main
git rev-parse develop
git rev-parse origin/develop
```

Expected: clean worktree; local/remote hashes match for both branches.
