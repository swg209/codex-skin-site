import type { GuideRouteKey } from "@/lib/site";

import type { GuideSection } from "./types";

export const enGuideDepth: Record<GuideRouteKey, GuideSection[]> = {
  windows: [
    {
      id: "editorial-context",
      title: "Editorial review context",
      blocks: [
        { type: "evidence", label: "Editorial review context", environment: "Documentation review of the upstream Windows directory, its PowerShell entry points, and the official Store-app boundary described by the project.", reviewed: "20 July 2026", distinction: "First-party editorial review by CodexSkin; command names and behavioral claims remain attributed to the upstream repository, not to OpenAI." },
        { type: "paragraph", text: "This page is a reading companion, not an installer mirror. It organizes the public upstream workflow into preparation, execution, verification, and recovery stages so that you can make a deliberate decision before running any script. Repository contents can change after this review date. Compare every command on this page with the current source, release notes, and file history before use. If a filename, required version, or described result differs, investigate the current repository rather than forcing an older command to run." },
        { type: "callout", label: "Safety boundary", text: "The visual helper is not part of the official Codex app. It does not grant access, unlock features, bypass licensing, alter signatures, or make an untrusted script safe. Stop when package identity cannot be verified or a command requests privileges that the reviewed source does not explain." },
      ],
    },
    {
      id: "source-check",
      title: "Verify the source before PowerShell",
      blocks: [
        { type: "paragraph", text: "Open the original repository from the link above and confirm that the browser address, repository owner, and Windows directory match the source named by this guide. Read the README and inspect the scripts directory instead of downloading a similarly named archive from search results. GitHub exposes commit history for each file; use it to see when installation, launch, verification, and restore behavior last changed. A short review is especially important for PowerShell because a script can read local files, start processes, and change user-level configuration with the permissions of the person running it." },
        { type: "list", items: ["Confirm that the official Codex app came from Microsoft Store and opens normally before adding a visual layer.", "Read install-dream-skin.ps1, start-dream-skin.ps1, verify-dream-skin.ps1, and restore-dream-skin.ps1 as one lifecycle rather than reviewing only install.", "Check recent repository issues for Store-package discovery or Codex-update reports that resemble your environment.", "Keep Windows Security enabled and do not suppress warnings merely to make an unfamiliar archive run.", "Record the commit or release you reviewed so later troubleshooting refers to the same source state."] },
      ],
    },
    {
      id: "expected-results",
      title: "Know the expected result at each stage",
      blocks: [
        { type: "paragraph", text: "Preparation should leave the official app working and closed, with Node.js and PowerShell available from the same user account that will run the helper. Installation should create only the project-described user files, saved appearance state, and optional shortcuts. Launch should open a Codex window through the documented local runtime-styling path. It should not replace the official application with a second executable or ask you to upload credentials. Verification should confirm both visual changes and native interaction. Restoration should return the ordinary appearance without removing threads, projects, authentication, provider settings, or the signed Store package." },
        { type: "paragraph", text: "Treat unexpected behavior as information, not as a prompt to repeat commands blindly. If installation stops because the Store package is missing, first open the official app and check Windows settings. If launch reports an occupied port, identify the owning process instead of terminating arbitrary processes. If the visual layer appears on the home view but not a task, capture verification output and note exactly which route was open. If restore cannot identify a recorded session, close Codex normally, preserve the state directory, and consult current upstream instructions before deleting anything." },
      ],
    },
    {
      id: "windows-verification-checklist",
      title: "Windows verification checklist",
      blocks: [
        { type: "list", items: ["Open the home screen and confirm project cards, navigation, account controls, and keyboard focus still behave as native controls.", "Open an existing task and a new task; verify that the background does not obscure code, links, status text, or errors.", "Place focus in the composer, type without sending, and make sure the input region remains distinguishable from the background.", "Resize the window and test the narrowest size you normally use because responsive cropping can reveal noisy areas.", "Run the documented verification script and save its text output. A screenshot is supporting evidence, not a substitute for diagnostics.", "Run the restore path once before relying on the theme. A customization is not ready until you know how to exit it."] },
        { type: "paragraph", text: "A successful visual check means the official interface remains usable, not merely that a background is visible. Contrast problems often appear only in task history, menus, hover states, muted text, or the composer. Use a quiet image with a dark reading region and verify under the Windows scaling setting you actually use. If the theme requires unusually bright text, hidden controls, or repeated restarts to remain legible, change the image or colors instead of accepting a fragile setup." },
      ],
    },
    {
      id: "updates-and-escalation",
      title: "Handle updates and prepare a useful issue report",
      blocks: [
        { type: "paragraph", text: "Microsoft Store updates can change the installed Codex package while the third-party project may also change its detection and styling logic. When a previously working setup stops, separate those two timelines. Confirm that official Codex works without the theme, note the app update date, then compare the repository state with the commit you originally reviewed. Reinstall or reapply only when current upstream documentation instructs you to do so. Do not copy commands from an old comment into an updated checkout without understanding the difference." },
        { type: "list", items: ["Include Windows edition, CPU architecture, Node.js major version, and whether Codex came from Microsoft Store.", "Name the exact script and arguments, but remove usernames, tokens, identifying local paths, and task content.", "Attach verification output and the smallest relevant log excerpt; redact personal information before posting publicly.", "State whether the official appearance works after restore and whether port selection was automatic or explicitly configured.", "Link the upstream commit used. Send website-copy corrections to CodexSkin and tool behavior reports to the upstream project."] },
      ],
    },
  ],
  macos: [
    {
      id: "editorial-context",
      title: "Editorial review context",
      blocks: [
        { type: "evidence", label: "Editorial review context", environment: "Documentation review of the upstream macOS directory, Apple Silicon and Intel launchers, customization script, doctor, and restore flow.", reviewed: "20 July 2026", distinction: "First-party editorial review by CodexSkin; platform commands and supported input claims are attributed to the upstream project." },
        { type: "paragraph", text: "This guide translates the repository layout into a cautious user journey. It is not a signed package, download service, or promise that a particular Codex release remains compatible. Start by confirming that the official Codex application opens normally. Then review the current repository files and their history. The .command launchers are convenience entry points to scripts, so inspect the script each launcher invokes rather than assuming a Finder icon makes it trustworthy." },
        { type: "callout", label: "Safety boundary", text: "A visual customization layer should not ask you to disable macOS security globally, replace the signed Codex application, disclose credentials, or bypass access controls. A Gatekeeper prompt is a reason to verify provenance and inspect the file, not a reason to click through automatically." },
      ],
    },
    {
      id: "architecture-and-permissions",
      title: "Apple Silicon, Intel, and permission checks",
      blocks: [
        { type: "paragraph", text: "Apple Silicon and Intel Macs use different processor architectures, while shell launchers can inherit different PATH values depending on whether they are opened from Finder or Terminal. Use current upstream instructions for your architecture and do not substitute an unrelated binary when a command fails. The documented workflow says a separate global Node.js installation is not required; a prompt telling you to install a random runtime from another domain therefore deserves additional scrutiny. Confirm the official app location and launch it once so its normal configuration exists before running the helper." },
        { type: "paragraph", text: "macOS may quarantine files downloaded through a browser. Inspect the source, repository owner, and file contents before choosing any system-provided Open Anyway action. Prefer narrow, file-specific approval over weakening Gatekeeper or granting broad Full Disk Access. The visual workflow needs access only to paths and processes described by its source. If a prompt requests unrelated folders, contacts, photos, microphone, accessibility control, or administrator credentials without a documented reason, cancel and investigate." },
      ],
    },
    {
      id: "mac-source-check",
      title: "Review the macOS lifecycle before installation",
      blocks: [
        { type: "list", items: ["Read the install script and identify the user-level destination before double-clicking Install Codex Dream Skin.command.", "Follow Codex Dream Skin.command to the script it invokes and confirm local connection and target selection match the explanation.", "Review Codex Dream Skin - Customize.command and the image-preparation script before selecting a personal photo.", "Read Codex Dream Skin - Verify.command, doctor-macos.sh, and Codex Dream Skin - Restore.command before launch.", "Check recent issues for architecture, permission, and current Codex compatibility reports; do not infer support from an old screenshot."] },
        { type: "paragraph", text: "Keep the downloaded source folder until you have verified both launch and restore because it gives you a stable reference for the exact scripts used. If you later update the repository, review changes before mixing a new launcher with old installed state. A reproducible setup has a known source commit, known official-app state, and saved diagnostic output; it is not defined merely by a successful double-click." },
      ],
    },
    {
      id: "mac-verification-checklist",
      title: "Verify the Mac result beyond the wallpaper",
      blocks: [
        { type: "paragraph", text: "Run the documented doctor or Verify launcher after applying the theme, then inspect the interface yourself. Check the home screen, project picker, a long task, code blocks, links, menus, composer, window resizing, and the base appearances you actually use. A background that looks attractive behind an empty window can make dense task history difficult to read. Use the composition guide to reserve quiet space and avoid critical details near the bottom input region." },
        { type: "list", items: ["Confirm official Codex identity and ordinary launch still work independently of the helper.", "Confirm keyboard navigation, selection, copy, scrolling, links, and composer controls remain available.", "Check the Finder-selected image in both the ultrawide home crop and task-page crop.", "Save doctor output without publishing task text, usernames, home-directory paths, tokens, or account details.", "Exercise Codex Dream Skin - Restore.command and verify that normal appearance returns before treating setup as complete."] },
      ],
    },
    {
      id: "mac-troubleshooting",
      title: "Troubleshoot permissions, updates, and stale state",
      blocks: [
        { type: "paragraph", text: "When a launcher opens and closes immediately, run the corresponding reviewed script from Terminal so you can read its output instead of repeatedly double-clicking. Distinguish a shell permission error from Gatekeeper quarantine, a missing official app, an unsupported image, a local-port conflict, and a renderer compatibility change. Those causes require different responses. Do not solve all of them by adding execute permission recursively or removing quarantine attributes from an entire directory tree." },
        { type: "paragraph", text: "After a Codex update, first restore and confirm the official application is healthy. Compare upstream changes, rerun only the documented installation or launch stage, and verify again. If the theme shows on one surface only, record which page, window size, and base appearance were active. If image preparation fails, test a copy of a modest PNG or JPEG rather than altering the original photo. This separates format and size problems from runtime styling." },
        { type: "list", items: ["Include Mac model family, processor architecture, macOS version, exact launcher, source commit, and sanitized doctor output.", "Describe whether the official app launches after restore and whether the problem began after a Codex, macOS, or project update.", "Do not upload personal backgrounds or screenshots containing private task content unless essential and safely redacted.", "Send documentation corrections to CodexSkin and runtime behavior reports to the upstream repository."] },
      ],
    },
  ],
  customize: [
    {
      id: "editorial-context",
      title: "Editorial review context",
      blocks: [
        { type: "evidence", label: "Editorial review context", environment: "First-party composition review comparing the shared ultrawide home banner and conventional task-background use described on this site.", reviewed: "20 July 2026", distinction: "First-party editorial guidance from CodexSkin. File limits and platform controls are attributed upstream; composition percentages are practical recommendations, not official requirements." },
        { type: "callout", label: "Rights boundary", text: "Use an image you created, commissioned, licensed, or otherwise have permission to adapt. A technically compatible file is not automatically lawful to publish, redistribute, or use commercially." },
      ],
    },
    {
      id: "design-for-two-surfaces",
      title: "Design for two surfaces, not one screenshot",
      blocks: [
        { type: "paragraph", text: "The home view behaves like a wide banner with prominent titles and cards, while a task view contains a taller reading column, code, status messages, and a composer near the bottom. The same image can be cropped and covered differently. Begin with the harder requirement: uninterrupted reading. Reserve a broad, low-detail region behind likely text, then position the subject where the home crop still recognizes it. A decorative image succeeds only when the interface remains effortless to scan for an extended session." },
        { type: "paragraph", text: "The 70% to 82% horizontal face range and 35% to 50% vertical range are working zones, not a demand that every image contain a person. For landscapes, products, architecture, or abstract art, place the primary focal mass in the same right-side zone and keep the left 55% quiet. The 45% subject-height ceiling preserves headroom and reduces accidental cropping. Treat the bottom composer region as unavailable: texture can continue through it, but faces, hands, symbols, horizon lines, and other meaningful details should not depend on being visible there." },
      ],
    },
    {
      id: "contrast-test",
      title: "Test contrast with real interface states",
      blocks: [
        { type: "paragraph", text: "A dark image is not necessarily readable. High-frequency stars, hair, foliage, city lights, or generated micro-text can create local contrast that competes with letters even when average luminance is low. Preview headings, normal paragraphs, muted metadata, code, selection, links, error messages, disabled controls, and focus rings. The quiet zone should remain quiet at full desktop size and after responsive cropping. If the interface needs a heavy opaque panel everywhere, simplify the source image before increasing overlays." },
        { type: "list", items: ["Inspect the image at window sizes you actually use rather than only at export resolution.", "Check the lightest and darkest areas behind small muted text, not only the main heading.", "Use a temporary grayscale preview to reveal tonal conflicts that saturated color can disguise.", "Scroll a long task so different content occupies the same background regions.", "Check focus and selection outlines; a background should not make keyboard navigation ambiguous.", "Prefer reducing texture, brightness variation, or subject scale before hiding more of the image."] },
      ],
    },
    {
      id: "crop-review",
      title: "Run a repeatable crop review",
      blocks: [
        { type: "paragraph", text: "Keep the master file outside the theme state directory. Export a working copy, apply it through the documented platform flow, and record what changes between home and task views. Look for three failures: the focal subject is cut or hidden; interface text overlaps detailed or bright regions; and the composer covers a meaningful element. Change one variable at a time—subject position, scale, background detail, or tonal range—so the next export shows whether the adjustment helped." },
        { type: "list", items: ["Preview a 20:9 home crop and 16:9 task approximation before importing.", "Inspect full-width, medium, and narrow desktop windows after import.", "Compare an empty home screen with a populated task; neither alone represents normal use.", "Keep export names versioned so a failed crop can be compared or rolled back without overwriting the master.", "After final crop approval, repeat platform verification and restore checks."] },
      ],
    },
    {
      id: "image-rights",
      title: "Keep a usable image-rights record",
      blocks: [
        { type: "paragraph", text: "For your own photograph or illustration, retain the original file and creation date. For commissioned work, keep the agreement explaining adaptation and display rights. For stock or generated material, save the provider, asset page or generation record, license version, purchase receipt when applicable, and restrictions on commercial use, redistribution, recognizable people, trademarks, or sensitive locations. A prompt alone does not establish an unambiguous rights chain, and removing a logo does not cure an unauthorized source." },
        { type: "paragraph", text: "Personal desktop use and publishing a downloadable theme are different uses. Before sharing a theme, confirm that redistribution of the background itself is allowed and required attribution can accompany it. Avoid presenting OpenAI or Codex marks as your own branding and do not imply official approval. CodexSkin original theme pages identify asset origin and usage terms; use the same discipline for material you distribute elsewhere." },
      ],
    },
    {
      id: "customization-troubleshooting",
      title: "When the image looks wrong after import",
      blocks: [
        { type: "list", items: ["If the subject is clipped, reduce its scale or move the focal mass farther inside the right-side safe zone.", "If text looks noisy, remove detail or compress tonal range in the reading zone instead of only increasing text brightness.", "If the composer hides a key element, move that element upward; bottom padding in the source is usually more reliable than changing interface layout.", "If colors feel inconsistent, test the background independently from accent colors and change one variable at a time.", "If import fails, verify documented format and size limits with a copy, then check the platform guide for diagnostics.", "If only one Codex view changes, preserve verification evidence and treat it as a runtime or compatibility issue."] },
      ],
    },
  ],
  restore: [
    {
      id: "editorial-context",
      title: "Editorial review context",
      blocks: [
        { type: "evidence", label: "Editorial review context", environment: "Documentation review of upstream Windows and macOS restore launchers, saved appearance state, and diagnostic guidance.", reviewed: "20 July 2026", distinction: "First-party editorial review by CodexSkin; exact restore behavior remains source-dependent and should be checked against the current upstream commit." },
        { type: "callout", label: "Recovery boundary", text: "Restore the visual session before deleting files. Preserving state and logs helps the documented restore process distinguish an active helper, saved appearance values, and unrelated official-app problems." },
      ],
    },
    {
      id: "prepare-restore",
      title: "Prepare a controlled restore",
      blocks: [
        { type: "paragraph", text: "Save work in Codex and note which window shows the unwanted appearance. Close unrelated terminals or helper copies so you know which process the restore action belongs to. Locate the exact source or installed launcher used for setup and compare it with current upstream instructions. If the appearance problem began after an update, record whether Codex, the operating system, or the third-party project changed. That timeline prevents an app compatibility problem from being mistaken for a failed restore." },
        { type: "paragraph", text: "Do not begin by deleting the state directory, shortcuts, images, or logs. The recorded session and saved appearance values can help the script target only the intended helper and themed window. Manual cleanup before the normal restore attempt removes that context and can make diagnosis harder. If a command shown here differs from the reviewed repository state you have, stop and follow current source rather than combining versions." },
      ],
    },
    {
      id: "clean-state-checklist",
      title: "Verify a clean official-app state",
      blocks: [
        { type: "list", items: ["Launch Codex through its ordinary Start menu, Applications folder, Dock, or official shortcut rather than a Dream Skin launcher.", "Confirm the custom background, accent treatment, and runtime styling are absent on both home and task views.", "Confirm projects, threads, authentication, provider settings, and normal keyboard interaction remain available.", "Use platform verify or doctor output to confirm the recorded local styling session is no longer active.", "Quit and reopen the official app once more; a result that survives a clean relaunch is stronger than a single restored window.", "If you plan to uninstall helper files, keep a sanitized copy of relevant logs until clean state is confirmed."] },
        { type: "paragraph", text: "A clean restore does not necessarily erase every selected image, log, or convenience shortcut. Restoration and uninstall are separate decisions. The normal restore goal is to stop the recorded visual session, return saved appearance values where documented, and open the official app normally. Remove residual user-level files only after identifying them from current upstream documentation and deciding that you no longer need the customization or diagnostic history." },
      ],
    },
    {
      id: "residual-symptoms",
      title: "Diagnose residual symptoms without guessing",
      blocks: [
        { type: "paragraph", text: "If the background remains, determine whether you reopened a theme launcher instead of the official app. If only one old window remains themed, close it and perform a clean official launch. If the official app fails without the helper, reproduce that independently before changing theme files; the issue may be a Codex or operating-system update. If restore cannot identify its recorded process or state, preserve output and compare installed files with the source commit used during setup." },
        { type: "list", items: ["Repeated styling after login can indicate that a convenience launcher or optional menu integration is still being used.", "Normal appearance with leftover shortcuts is an uninstall question, not evidence that runtime styling remains active.", "A blank official window after restore should be reproduced without the helper before being reported as a theme defect.", "An occupied local port should be traced to its owning process; do not terminate unrelated development tools.", "Differences between machines should be reported with platform, architecture, source commit, and exact launcher."] },
      ],
    },
    {
      id: "restore-escalation",
      title: "Escalate with evidence and protect private data",
      blocks: [
        { type: "paragraph", text: "Send website wording, broken links, or unclear guidance to CodexSkin. Send script errors, process targeting, compatibility, and restore behavior to the original project because CodexSkin does not maintain or distribute the tool. Before posting, remove usernames, home-directory paths, tokens, account identifiers, private repository names, and task content. Share the smallest log excerpt containing the error and immediate context." },
        { type: "list", items: ["Name Windows or macOS, operating-system version, processor architecture, and official Codex distribution source.", "Provide upstream commit or release, exact restore launcher or command, and whether setup used custom options.", "State what official Codex does when opened normally, what remains themed, and whether a second clean relaunch changes the result.", "Include sanitized verify or doctor output and the order of restore, quit, and relaunch actions.", "Do not publish the background or a task screenshot unless necessary, licensed, and fully redacted."] },
      ],
    },
  ],
};
