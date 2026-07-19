# Codex Skin Source Image Guide Design

**Date:** 2026-07-20

## Goal

Turn firsthand CodexSkin composition findings into a bilingual, tool-neutral guide that helps visitors generate a source image usable in both the Codex home banner and task background.

The content must help a visitor move from a generic image prompt to a source image that preserves native text readability and avoids the task composer. It must not imply that these layout values are upstream-project or OpenAI requirements.

## Decisions

- Keep the existing routes: `/guide/customize` and `/zh/guide/customize`.
- Publish the full workflow in the customize guide.
- Add a short summary and stronger internal link in the Dream Skin materials section.
- Label the rules as `CodexSkin tested composition guidance` / `CodexSkin 实测构图建议`.
- Stay tool-neutral: no image-provider recommendations, affiliate links, model rankings, or provider-specific syntax.
- Keep current platform truth: the referenced upstream project documents the local image workflow for macOS; the current Windows workflow does not document the same picker.
- Treat the current single-image workflow as a composition compromise. Describe two-image support and a focal-position control as a future product direction, not a current capability.

## Information Architecture

### Customize guide

Retain the existing platform, image-format, picker, CLI, reload, and restore guidance. Insert the new content after the basic image preparation section and before the upstream application workflow:

1. `Why one image needs a safe composition` / `为什么单图需要安全构图`
   - Explain that the same source image appears as a wide home banner and a task-page background.
   - State that one image cannot be perfectly cropped for both surfaces without composition trade-offs.

2. `CodexSkin tested composition guidance` / `CodexSkin 实测构图建议`
   - Use a 20:9 ultrawide canvas.
   - Place the face center at 70%–82% of canvas width.
   - Place the face center at 35%–50% of canvas height; 45% is the prompt default.
   - Keep the full head visible with adequate headroom.
   - Keep subject height at or below 45% of canvas height.
   - Reserve the left 55% as dark, low-detail negative space.
   - Keep important details away from the bottom composer area.
   - Avoid dense background detail that reduces task-text readability.
   - Use no text, logos, borders, or interface elements in the source image.

3. `Copyable source-image prompt` / `可复制的原图提示词`
   - Render a purpose-built prompt block with a copy action.
   - Do not render the prompt as Bash, PowerShell, or another programming language.

4. `Validate both Codex surfaces` / `同时验收两个 Codex 页面`
   - Generate the source image.
   - Check the crop at 20:9.
   - Apply it through the upstream-documented macOS workflow.
   - Inspect the home banner and a normal task page.
   - Adjust subject size, face position, negative space, or detail density when either view fails.

5. `The ideal future: two images and a focal point` / `更理想的后续方案：双图与焦点位置`
   - One 20:9 home-banner image.
   - One 16:9 task-background image.
   - A focal-position control for crop alignment.
   - Explicitly mark this as a future CodexSkin product direction rather than current upstream behavior.

### Dream Skin landing page

In the existing materials section, add a compact note:

- English: `One source image serves both the home banner and task background, so usable results need a deliberate safe-zone composition.`
- Chinese: `同一张原图会同时用于首页横幅和任务页背景，因此真正可用的结果需要按安全区构图。`

Keep the existing link to the customize guide, but use a stronger label:

- English: `Get the usable source-image prompt`
- Chinese: `获取可用原图提示词`

Do not add a new route or another top-level navigation item.

## Exact Prompts

### Chinese

```text
20:9 超宽电影感桌面壁纸，人物较小地位于右侧三分之一，完整头部可见并保留充足头顶空间，脸部中心位于画面宽度的70%至82%、画面高度约45%，人物高度不超过画面45%，左侧55%为暗色低细节负空间，关键主体位于中央垂直安全区，重要细节远离底部输入框区域，背景细节克制以保证正文可读性，无文字、无Logo、无边框、无界面元素。
```

### English

```text
20:9 ultrawide cinematic desktop wallpaper, a small subject positioned in the right third, full head visible with generous headroom, face center at 70% to 82% of the canvas width and approximately 45% of the canvas height, subject height no more than 45% of the canvas, left 55% reserved as dark low-detail negative space, key subject kept within the central vertical safe zone, important details kept away from the bottom composer area, restrained background detail for readable task text, no text, no logo, no border, no UI elements.
```

The 35%–50% vertical range belongs in the surrounding guidance. The copyable prompt uses 45% as the practical default.

## Content Model and Components

Extend `GuideBlock` with a semantic prompt variant:

```ts
| { type: "prompt"; text: string }
```

Add a small `PromptBlock` client component that:

- renders the prompt as plain prose in a visually distinct block;
- reuses the guide's localized copy, copied, and copy-failure labels;
- copies only the prompt text;
- exposes a polite status message for assistive technology;
- remains keyboard accessible;
- does not introduce a dependency.

`GuideSection` renders `PromptBlock` for the new block type and keeps existing paragraph, list, and command behavior unchanged.

Add a localized practice-note field to `DreamSkinContent` so the summary remains content-driven rather than hardcoded in the component.

## SEO

- Keep both existing customize canonicals and reciprocal hreflang values.
- Update the English and Chinese customize metadata descriptions to naturally mention source-image generation, composition, and a copyable prompt.
- Use descriptive H2 headings for `Codex skin source image`, `Codex background prompt`, `Codex 皮肤原图`, and `背景图生成提示词` intent without repeating keyword variants mechanically.
- Keep the existing page H1 and broader customization scope.
- Set the two customize sitemap entries' `lastModified` to `2026-07-20`; route count and priorities remain unchanged.
- Do not add FAQ schema or unsupported product/software claims.

## Attribution and Accuracy Boundaries

- The safe-zone values are CodexSkin firsthand guidance, not OpenAI or upstream-project specifications.
- Platform, format, file-size, picker, and application claims remain attributed to the upstream documentation.
- The guide must not promise that an AI-generated image will always crop perfectly.
- The guide must not claim that two-image or focal-position support already exists.
- Generated-image rights remain the visitor's responsibility under the service and source material they use.

## Testing and Release Verification

Add tests for:

- both localized guides containing the safe-zone values, one-image explanation, prompt, validation workflow, and future two-image boundary;
- the prompt block copying only the prompt text and exposing localized success/failure state;
- the customize guide rendering the prompt as a prompt block rather than a command block;
- the Dream Skin landing page rendering the localized practice note and internal customize link;
- customize metadata descriptions and sitemap last-modified dates;
- absence of named generation providers and false current-capability language.

Run the existing full gates: tests, ESLint, TypeScript, production build, 12-route local verification, responsive browser checks, push to `main`, and production verification after Vercel deploys.

## Out of Scope

- Generating or hosting user images.
- Uploads, accounts, storage, or a browser-based skin generator.
- Recommending or integrating a particular image-generation provider.
- Implementing the future two-image or focal-position product features.
- Changing third-party installers, scripts, or tool code.
