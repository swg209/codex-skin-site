import type { LocaleContent } from "@/content/types";

const nav = {
  themes: "Themes",
  dreamSkin: "Dream Skin",
  install: "Install",
  faq: "FAQ",
  github: "GitHub",
  menu: "Open menu",
  closeMenu: "Close menu",
};

const guideAttribution = {
  sourceNotice:
    "This guide references a third-party open-source project. CodexSkin.site is not the project developer and does not host or modify its installer.",
  sourceReviewNotice:
    "Before running third-party scripts, review the source code and confirm that you are downloading from the original repository.",
  overviewLabel: "About Codex Dream Skin",
  promptCopyLabel: "Copy prompt",
  promptCopiedLabel: "Prompt copied",
  promptCopyFailedLabel: "Select and copy the prompt manually",
};

export const enContent: LocaleContent = {
  locale: "en",
  chrome: {
    nav,
    localeLabel: "中文",
    skipLabel: "Skip to content",
    footerDescription:
      "Independent themes, tools, and setup guides for Codex Desktop.",
    repositoryLabel: "View Original Project",
    dreamSkinLabel: "About Codex Dream Skin",
    guidesLabel: "Installation Guides",
    issueLabel: "Report an Issue",
    licenseLabel: "MIT License",
    privacyTitle: "Privacy",
    privacyText:
      "This static site has no accounts, forms, or uploads. It uses Google AdSense and may use analytics; Google and other vendors may use cookies to serve and measure ads according to their policies.",
    disclaimer:
      "CodexSkin.site is an independent tutorial and customization website. It is not affiliated with OpenAI or the developers of the third-party tools referenced in these guides. Source code belongs to Fei-Away and its contributors.",
  },
  home: {
    seo: {
      title: "CodexSkin – Themes, Tools & Guides for Codex Desktop",
      description:
        "Discover independent Codex desktop themes, customization tools and setup guides for Windows and macOS.",
    },
    nav,
    hero: {
      eyebrow: "Independent Codex themes and guides",
      h1: "Independent Themes, Tools & Guides for Codex Desktop",
      description:
        "Explore setup guides, theme inspiration, and customization resources for Codex Desktop. Get referenced tools only from their original repositories.",
      proofLabels: ["Independent", "Windows Guides", "macOS Guides", "No Installer Hosting"],
    },
    galleryTitle: "Eight moods. One real workspace.",
    galleryIntro:
      "These examples from the referenced open-source project show how a theme can reshape the home and task views while the native interface stays interactive.",
    galleryDisclaimer:
      "Theme images are provided for demonstration. Users are responsible for ensuring they have the right to use and redistribute their chosen images.",
    gallery: [
      { name: "Rose Workspace", description: "A soft rose Codex workspace with translucent content layers.", src: "/themes/skin-01.jpg" },
      { name: "Golden Workday", description: "A warm gold theme framing the native project controls.", src: "/themes/skin-02.jpg" },
      { name: "Red-White Future", description: "A crisp red and white science-fiction theme for Codex Desktop.", src: "/themes/skin-03.jpg" },
      { name: "Clear Daylight", description: "A bright, low-noise workspace with cool glass-like surfaces.", src: "/themes/skin-04.jpg" },
      { name: "Cosmic Muse", description: "A deep-space composition behind the native Codex interface.", src: "/themes/skin-05.jpg" },
      { name: "Violet Night", description: "A restrained violet night theme with readable task content.", src: "/themes/skin-06.jpg" },
      { name: "Virtual Stage", description: "A vivid virtual-stage composition shown as a theme example.", src: "/themes/skin-07.jpg" },
      { name: "Black-Gold Stage", description: "A dramatic black and gold Codex workspace treatment.", src: "/themes/skin-08.jpg" },
    ],
    quickStart: {
      eyebrow: "Quick Start",
      title: "Choose your platform.",
      description:
        "Follow the step-by-step guide, then get the required open-source tool from its original repository. CodexSkin.site does not host or modify third-party installers.",
      externalHint: "opens the original repository in a new tab",
      platforms: [
        {
          platform: "macos",
          label: "macOS",
          title: "Apple Silicon & Intel",
          description:
            "Follow the macOS setup guide, choose your own image, verify the theme, and learn how to restore the default appearance.",
          steps: [
            "Read the macOS installation guide",
            "Get the tool from the original repository",
            "Choose an image and verify the result",
          ],
          guideLabel: "View macOS Guide",
          repositoryLabel: "Get from Original Repository",
        },
        {
          platform: "windows",
          label: "Windows",
          title: "Codex from Microsoft Store",
          description:
            "Follow the Windows setup guide and learn how to install, launch, customize, and restore the appearance.",
          steps: [
            "Check the Windows prerequisites",
            "Read the Windows installation guide",
            "Get the tool from the original repository",
          ],
          guideLabel: "View Windows Guide",
          repositoryLabel: "Get from Original Repository",
        },
      ],
    },
    createLook: {
      eyebrow: "Original resources",
      title: "Create Your Own Look",
      description:
        "Use original background artwork and readability presets to personalize your Codex workspace.",
      browseLabel: "Browse Themes",
      createLabel: "Create a Skin",
      comingSoon: "Coming Soon",
      href: "#themes",
    },
    featuresTitle: "A theme layer, not a fake interface",
    featuresIntro:
      "The referenced Dream Skin project changes the atmosphere around the official app while preserving the controls you already use.",
    features: [
      { title: "Real Interactive Interface", description: "The sidebar, suggestion cards, project picker, task content, menus, and composer remain native Codex controls." },
      { title: "Use Your Own Image on macOS", description: "The macOS studio can prepare a supported local image and turn it into a home banner and task background." },
      { title: "Windows & macOS Support", description: "The repository includes separate, platform-aware install, start, verify, and restore workflows." },
      { title: "Documented App Boundary", description: "According to the upstream documentation, Dream Skin does not intentionally patch .app, app.asar, WindowsApps, or the official code signature." },
      { title: "One-click Restore", description: "Platform launchers and scripts stop the themed session and reopen the official appearance." },
      { title: "Local CDP Injection", description: "The theme is applied to expected Codex renderer targets through a loopback-only debugging endpoint." },
    ],
    stepsTitle: "From an independent guide to a new look",
    steps: [
      { title: "1. Read the guide", description: "Use CodexSkin's original platform guide to understand requirements, restore steps, and risks." },
      { title: "2. Visit the original project", description: "Review the third-party source and get the tool directly from its original repository." },
      { title: "3. Apply and verify", description: "Follow the documented platform workflow, then verify the home and task views before regular use." },
    ],
    proofTitle: "Designed around the Codex you already use",
    proofDescription:
      "The visual treatment sits behind native navigation, suggestion cards, project controls, tasks, and the composer instead of replacing them with a screenshot.",
    safetyTitle: "Clear safety boundaries",
    safetyIntro:
      "CDP is powerful. Dream Skin narrows its use to local Codex targets, but a themed session should still be treated as a sensitive local debugging session.",
    safety: [
      "According to the upstream documentation, the CDP listener binds only to the local loopback address.",
      "Based on the upstream project's documented behavior, it does not intentionally modify the official .app, app.asar, WindowsApps package, or code signature.",
      "The upstream documentation says API keys, Base URLs, and model-provider settings are not automatically rewritten.",
      "Do not run untrusted local software while a themed CDP session is active.",
      "A Codex update can require Dream Skin to be reapplied or adapted.",
      "CodexSkin.site is an independent guide and is not an official OpenAI or upstream-project website.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { question: "What is Codex Dream Skin?", answer: "It is an open-source theme layer that launches the official Codex Desktop app with CSS and decorative interface elements injected through local CDP." },
      { question: "Is Codex Dream Skin an official OpenAI product?", answer: "No. It is an independent open-source project and is not affiliated with or endorsed by OpenAI." },
      { question: "Does it modify the Codex installation?", answer: "Based on the behavior documented by the upstream project, it does not intentionally patch the official .app, app.asar, WindowsApps package, or code signature." },
      { question: "Does it support Windows?", answer: "Yes. The repository includes Windows install, start, verify, and restore scripts for the official Store-installed Codex app." },
      { question: "Does it support Apple Silicon and Intel Mac?", answer: "Yes. The macOS workflow validates the installed official Codex app and supports both Apple Silicon and Intel Macs." },
      { question: "Can I use my own background image?", answer: "The documented macOS studio supports local PNG, JPEG, HEIC, TIFF, and WebP images. The current Windows workflow does not document the same image picker." },
      { question: "How do I restore the default Codex appearance?", answer: "Use the platform Restore launcher or restore script. It stops the recorded themed session and reopens the official app." },
      { question: "Will it continue working after Codex updates?", answer: "Not always without action. App updates can change renderer details, so you may need to reinstall, reapply, or wait for a compatibility update." },
      { question: "Does it change my API configuration?", answer: "It does not automatically change API keys, Base URLs, or model providers. Theme configuration and API provider configuration are separate." },
      { question: "Where can I report a problem?", answer: "For third-party tool issues, use the issue templates in the original Fei-Away/Codex-Dream-Skin repository and include your platform and verification results." },
    ],
    finalTitle: "Choose a Guide, Then Verify the Source",
    finalDescription:
      "Start with CodexSkin's independent guide, get third-party tools from the original repository, and keep the restore steps nearby.",
    labels: {
      windows: "Install for Windows",
      macos: "Install for macOS",
      github: "View Original Project",
      dreamSkin: "About Codex Dream Skin",
      previous: "Previous theme",
      next: "Next theme",
      close: "Close preview",
      viewTheme: "View theme",
    },
  },
  dreamSkin: {
    seo: {
      title: "Codex Dream Skin – GitHub, Install Guides & Themes",
      description:
        "Learn what Codex Dream Skin is, open the original GitHub repository, and follow independent Windows and macOS install guides from CodexSkin.",
    },
    hero: {
      eyebrow: "Independent project guide",
      h1: "Codex Dream Skin: GitHub Source, Install Guides & Themes",
      summary:
        "Codex Dream Skin is an independent open-source visual theme layer for the official Codex Desktop app. Start with the verified source, then use CodexSkin's independent platform guides.",
    },
    identityNotice:
      "CodexSkin.site is not an OpenAI website or the official Codex Dream Skin website. We are not the upstream author and do not host, modify, or repackage its installer.",
    sourceTitle: "Verified original GitHub repository",
    sourceLabel: "Open Original GitHub Repository",
    sourceHint:
      "Opens the third-party repository in a new tab. Review its source before running scripts.",
    whatTitle: "What Codex Dream Skin does",
    whatItems: [
      {
        title: "Adds a visual theme layer",
        description:
          "According to the upstream documentation, it applies CSS and decorative elements to supported Codex Desktop views.",
      },
      {
        title: "Keeps native Codex controls interactive",
        description:
          "The upstream documentation says navigation, project controls, tasks, and the composer remain native interactive controls.",
      },
      {
        title: "Documents Windows and macOS workflows",
        description:
          "The upstream repository documents separate install, launch, verification, and restore workflows for Windows and macOS.",
      },
    ],
    boundaryTitle: "What this independent site does not claim",
    boundaryItems: [
      "Codex Dream Skin is not an official OpenAI product.",
      "CodexSkin.site is not the upstream project's official website and its maintainer is not the upstream author.",
      "CodexSkin.site does not host, modify, or repackage the third-party installer.",
      "CodexSkin.site does not guarantee that third-party tooling will remain compatible after Codex updates.",
    ],
    installTitle: "Choose an independent installation guide",
    guides: [
      {
        routeKey: "windows",
        label: "Windows",
        title: "Install Codex Dream Skin on Windows",
        description:
          "Review requirements for the Store-installed official Codex app, the upstream PowerShell workflow, verification, and safe restore steps.",
        linkLabel: "View Windows install guide",
      },
      {
        routeKey: "macos",
        label: "macOS",
        title: "Install Codex Dream Skin on macOS",
        description:
          "Follow the independent guide for Apple Silicon or Intel Mac, including image selection and restore.",
        linkLabel: "View macOS install guide",
      },
    ],
    materialsTitle: "Codex skins and background materials",
    materialsDescription:
      "Explore visual examples and learn how image composition, contrast, and native controls work together in a Codex skin.",
    materialsPracticeNote:
      "One source image serves both the home banner and task background, so usable results need a deliberate safe-zone composition.",
    materialsDisclaimer:
      "The current gallery contains demonstration examples from the referenced project, not CodexSkin-owned theme downloads.",
    materialsLabel: "Browse Codex skin examples",
    customizeLabel: "Get the usable source-image prompt",
    faqTitle: "Codex Dream Skin questions",
    faq: [
      {
        question: "What is Codex Dream Skin?",
        answer:
          "Codex Dream Skin is an independent open-source visual theme layer for the official Codex Desktop app. It uses a local debugging workflow to apply CSS and decorative interface elements.",
      },
      {
        question: "Where is the original Codex Dream Skin GitHub repository?",
        answer:
          "The original repository verified for this guide is Fei-Away/Codex-Dream-Skin on GitHub. Use the source button on this page and review the repository before running scripts.",
      },
      {
        question: "Is Codex Dream Skin an official OpenAI product?",
        answer:
          "No. It is an independent open-source project and is not affiliated with or endorsed by OpenAI.",
      },
      {
        question: "Does CodexSkin.site maintain or distribute Codex Dream Skin?",
        answer:
          "No. CodexSkin.site is an independent guide, theme-material, and tools website. Its maintainer is not the upstream author, and the site does not host, modify, or repackage the installer.",
      },
      {
        question: "How do I install Codex Dream Skin on Windows or macOS?",
        answer:
          "Choose the Windows or macOS guide on this page, check the platform requirements, review the upstream source, and keep the documented verification and restore steps nearby.",
      },
      {
        question: "Can I use my own Codex skin or background image?",
        answer:
          "The upstream macOS workflow documents a local image studio for supported image formats. The current Windows workflow does not document the same image picker. The gallery on this site currently shows demonstration examples rather than CodexSkin-owned downloads.",
      },
    ],
    finalTitle: "Verify the source before you install",
    finalDescription:
      "CodexSkin is an independent guide and does not distribute the installer. Open the original repository, review its current instructions, then choose your platform guide.",
  },
  guides: {
    windows: {
      key: "windows",
      seo: { title: "Install Codex Dream Skin on Windows", description: "Install, launch, verify, and restore Codex Dream Skin for the official Windows Codex desktop app." },
      eyebrow: "Windows installation",
      h1: "Install Codex Dream Skin on Windows",
      summary: "Use this independent guide to review the upstream PowerShell workflow for the Store-installed Codex app.",
      ...guideAttribution,
      sourceLabel: "Get from Original Repository",
      issueLabel: "View Upstream Issues",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      copyFailedLabel: "Select and copy the command manually",
      contentsLabel: "On this page",
      relatedLabel: "Related guides",
      sections: [
        { id: "support", title: "Support and requirements", blocks: [{ type: "list", items: ["Windows with the official Microsoft Store Codex app installed", "Node.js 22 or newer", "PowerShell", "Permission to create Desktop and Start Menu shortcuts"] }] },
        { id: "prepare", title: "Before you install", tone: "warning", blocks: [{ type: "paragraph", text: "Close Codex before installation. The upstream documentation says its installer validates the registered Store package and stops when the official package identity cannot be verified." }, { type: "paragraph", text: "Get the files only from the original repository, review the scripts, and open PowerShell in its windows directory. Avoid unofficial download mirrors." }] },
        { id: "install", title: "Install the launcher", blocks: [{ type: "code", language: "powershell", code: ".\\scripts\\install-dream-skin.ps1" }, { type: "paragraph", text: "The installer records the existing appearance values, sets the matching base theme, and creates launch and restore shortcuts unless -NoShortcuts is used." }] },
        { id: "launch", title: "Launch the themed session", blocks: [{ type: "code", language: "powershell", code: ".\\scripts\\start-dream-skin.ps1" }, { type: "paragraph", text: "If Codex is already open without the verified Dream Skin endpoint, close it first. Command-line callers must explicitly add -RestartExisting when they want the script to restart an open window." }] },
        { id: "verify", title: "Verify the theme", blocks: [{ type: "code", language: "powershell", code: ".\\scripts\\verify-dream-skin.ps1 -ScreenshotPath \"$env:USERPROFILE\\Desktop\\codex-dream-skin.png\"" }, { type: "paragraph", text: "Check both the home view and a normal task. A missing hero, native composer, sidebar treatment, or injection marker is a verification failure." }] },
        { id: "change", title: "Theme changes on Windows", tone: "note", blocks: [{ type: "paragraph", text: "The current Windows package uses its bundled decorative assets. It does not document the macOS image-picker workflow. Check the repository changelog before following advice from third-party posts." }] },
        { id: "restore", title: "Restore the official appearance", blocks: [{ type: "code", language: "powershell", code: ".\\scripts\\restore-dream-skin.ps1 -RestoreBaseTheme" }, { type: "paragraph", text: "Restore closes the recorded CDP session, restores saved appearance keys, and reopens the official app. Add -Uninstall only when you also want the shortcuts removed." }] },
        { id: "troubleshooting", title: "Common problems", blocks: [{ type: "list", items: ["If port 9335 is occupied, the normal launcher chooses a free port unless you explicitly requested the occupied port.", "After a Codex update, rerun install and start so the scripts rediscover the current Store package.", "Do not run untrusted local software while the loopback CDP session is active.", "Use GitHub Issues and include the verify output when the theme does not appear."] }] },
      ],
      related: ["macos", "restore", "customize"],
    },
    macos: {
      key: "macos",
      seo: { title: "Install Codex Dream Skin on macOS", description: "Install Codex Dream Skin on Apple Silicon or Intel Mac, choose a background, verify it, and restore Codex." },
      eyebrow: "macOS installation",
      h1: "Install Codex Dream Skin on macOS",
      summary: "Use this independent guide to review the upstream macOS theme workflow for Apple Silicon and Intel Macs.",
      ...guideAttribution,
      sourceLabel: "Get from Original Repository",
      issueLabel: "View Upstream Issues",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      copyFailedLabel: "Select and copy the command manually",
      contentsLabel: "On this page",
      relatedLabel: "Related guides",
      sections: [
        { id: "support", title: "Support and requirements", blocks: [{ type: "list", items: ["Apple Silicon or Intel Mac", "The official Codex Desktop app installed and launched at least once", "A local ~/.codex/config.toml", "No separate global Node.js installation is required"] }] },
        { id: "download", title: "Get the third-party tool", blocks: [{ type: "paragraph", text: "Open the macos directory in the original repository, review the source, and follow the upstream download instructions shown there. Avoid unofficial download mirrors." }] },
        { id: "install", title: "Install Dream Skin", blocks: [{ type: "paragraph", text: "In Finder, double-click Install Codex Dream Skin.command. The source workflow below performs the same installation without launching immediately." }, { type: "code", language: "bash", code: "./scripts/install-dream-skin-macos.sh --no-launch" }] },
        { id: "launch", title: "Start and customize", blocks: [{ type: "paragraph", text: "Use Codex Dream Skin.command to launch or reapply the theme. Use Codex Dream Skin - Customize.command to choose an image through Finder." }, { type: "code", language: "bash", code: "~/.codex/codex-dream-skin-studio/scripts/customize-theme-macos.sh" }] },
        { id: "verify", title: "Verify the result", blocks: [{ type: "paragraph", text: "Double-click Codex Dream Skin - Verify.command. Inspect both the home screen and a normal task so the native sidebar, project picker, composer, and task content remain usable." }, { type: "code", language: "bash", code: "~/.codex/codex-dream-skin-studio/scripts/doctor-macos.sh" }] },
        { id: "image", title: "Background image guidance", blocks: [{ type: "list", items: ["Supported source formats: PNG, JPEG, HEIC, TIFF, and WebP", "Source file limit: 50 MB", "Prepared file limit: 16 MB", "A wide image at least 2000px across is recommended", "Keep the left side relatively calm for native home titles"] }] },
        { id: "restore", title: "Restore Codex", blocks: [{ type: "paragraph", text: "Double-click Codex Dream Skin - Restore.command. Restore stops only the recorded injector and matching themed Codex session, then reopens the official app." }, { type: "code", language: "bash", code: "./scripts/restore-dream-skin-macos.sh" }] },
        { id: "menu", title: "Optional menu bar", blocks: [{ type: "paragraph", text: "SwiftBar users can install the optional menu bar commands for apply, pause, and image changes." }, { type: "code", language: "bash", code: "./Install\\ Menu\\ Bar.command" }] },
      ],
      related: ["customize", "restore", "windows"],
    },
    customize: {
      key: "customize",
      seo: { title: "Customize a Codex Dream Skin Theme", description: "Generate a usable Codex skin source image with tested safe-zone composition, a copyable 20:9 background prompt, and the documented macOS workflow." },
      eyebrow: "Theme guide",
      h1: "Customize Your Codex Dream Skin Theme",
      summary: "Prepare a wide image, keep native text readable, and use the documented macOS studio to generate the theme assets.",
      ...guideAttribution,
      sourceLabel: "View Original Project",
      issueLabel: "View Upstream Issues",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      copyFailedLabel: "Select and copy the command manually",
      contentsLabel: "On this page",
      relatedLabel: "Related guides",
      sections: [
        { id: "platforms", title: "Platform availability", tone: "note", blocks: [{ type: "paragraph", text: "The repository documents a user-image studio for macOS. The current Windows package uses bundled decorative assets and does not expose the same picker." }] },
        { id: "prepare", title: "Prepare the image", blocks: [{ type: "list", items: ["Use PNG, JPEG, HEIC, TIFF, or WebP on macOS.", "Keep the source at or below 50 MB; the prepared asset must remain at or below 16 MB.", "A width of at least 2000px is recommended rather than enforced as a source minimum.", "Favor a calm left side and enough tonal contrast for native headings."] }] },
        { id: "single-image", title: "Why one image needs a compromise", blocks: [{ type: "paragraph", text: "The same source image appears as the ultrawide home banner and as the task-page background. A crop that looks perfect on one surface can hide the face, text, or important details on the other, so compose for the shared safe zone instead of a single screenshot." }] },
        { id: "composition", title: "CodexSkin tested composition guidance", blocks: [{ type: "paragraph", text: "These values come from CodexSkin hands-on testing, not from OpenAI or the upstream project." }, { type: "list", items: ["Start with a 20:9 ultrawide canvas.", "Place the face center at 70% to 82% of the canvas width and 35% to 50% of its height.", "Keep the subject height at no more than 45% and preserve generous headroom.", "Reserve the left 55% as dark, low-detail negative space for readable home and task text.", "Keep important details away from the bottom composer region, which can cover the image.", "Avoid dense background detail, and generate no text, logo, border, or UI elements."] }] },
        { id: "source-prompt", title: "Copy a source-image prompt", blocks: [{ type: "paragraph", text: "Use this tool-neutral prompt with an image generator that can create a wide source image, then validate the crop before applying it." }, { type: "prompt", text: "20:9 ultrawide cinematic desktop wallpaper, a small subject positioned in the right third, full head visible with generous headroom, face center at 70% to 82% of the canvas width and approximately 45% of the canvas height, subject height no more than 45% of the canvas, left 55% reserved as dark low-detail negative space, key subject kept within the central vertical safe zone, important details kept away from the bottom composer area, restrained background detail for readable task text, no text, no logo, no border, no UI elements." }] },
        { id: "validate", title: "Validate before you keep the image", blocks: [{ type: "list", items: ["Generate a 20:9 source image with the prompt above.", "Preview both an ultrawide banner crop and a conventional task-background crop.", "Apply the image using the upstream-documented macOS workflow below.", "Inspect the home page and a real task page, including headings and the bottom composer.", "Move the subject or simplify the background, regenerate, and repeat if either surface loses readability."] }] },
        { id: "future", title: "A better future two-image workflow", tone: "note", blocks: [{ type: "paragraph", text: "The ideal future CodexSkin workflow would accept a dedicated 20:9 home image, a separate 16:9 task background, and a focal-position control. That two-image feature does not exist today; the single-image guidance above is the current practical compromise." }] },
        { id: "picker", title: "Use the Finder picker", blocks: [{ type: "code", language: "bash", code: "~/.codex/codex-dream-skin-studio/scripts/customize-theme-macos.sh" }, { type: "paragraph", text: "Omit flags to choose an image in Finder. The studio prepares the local asset and updates the theme configuration." }] },
        { id: "cli", title: "Use the macOS CLI", blocks: [{ type: "code", language: "bash", code: "~/.codex/codex-dream-skin-studio/scripts/customize-theme-macos.sh \\\n  --image \"/path/to/image.png\" \\\n  --name \"My theme\" \\\n  --accent \"#7cff46\" \\\n  --secondary \"#36d7e8\" \\\n  --highlight \"#642a8c\"" }] },
        { id: "reload", title: "Reapply and check readability", blocks: [{ type: "paragraph", text: "Start or reapply Dream Skin after changing the image. Check the home and task routes, including the project picker and composer. If text contrast is weak, choose a quieter crop or adjust the accent colors." }] },
      ],
      related: ["macos", "restore", "windows"],
    },
    restore: {
      key: "restore",
      seo: { title: "Restore the Default Codex Appearance", description: "Stop Codex Dream Skin safely and restore the official Codex appearance on Windows or macOS." },
      eyebrow: "Restore guide",
      h1: "Restore the Default Codex Appearance",
      summary: "Use the platform's recorded restore workflow to stop the injector, close the local CDP session, and reopen the official app.",
      ...guideAttribution,
      sourceLabel: "View Original Project",
      issueLabel: "View Upstream Issues",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      copyFailedLabel: "Select and copy the command manually",
      contentsLabel: "On this page",
      relatedLabel: "Related guides",
      sections: [
        { id: "windows", title: "Restore on Windows", blocks: [{ type: "paragraph", text: "Use the Desktop Restore shortcut or run the repository script. The flag below restores only the appearance keys saved during install." }, { type: "code", language: "powershell", code: ".\\scripts\\restore-dream-skin.ps1 -RestoreBaseTheme" }] },
        { id: "macos", title: "Restore on macOS", blocks: [{ type: "paragraph", text: "Double-click Codex Dream Skin - Restore.command or run the installed restore script." }, { type: "code", language: "bash", code: "~/.codex/codex-dream-skin-studio/scripts/restore-dream-skin-macos.sh" }] },
        { id: "preserved", title: "What stays in place", blocks: [{ type: "list", items: ["The official Codex application and signature", "Threads, projects, pets/plugins, and authentication state", "API keys, Base URLs, and model-provider settings", "User images and logs in the Dream Skin state directory unless you remove them separately"] }] },
        { id: "verify", title: "Verify the restore", blocks: [{ type: "paragraph", text: "Confirm that Codex reopens without the theme and that the loopback debugging session has closed. Use the platform verification or doctor script if the state is unclear." }] },
        { id: "failure", title: "If restore fails", tone: "warning", blocks: [{ type: "paragraph", text: "Do not delete state files first. Preserve the logs and recorded state, close unverified Codex processes manually if instructed, and open a GitHub Issue with your platform and exact error." }] },
      ],
      related: ["windows", "macos", "customize"],
    },
  },
};
