import type { InfoPageContent } from "@/content/types";
import type { InfoRouteKey } from "@/lib/site";

export const enInfoContent: Record<InfoRouteKey, InfoPageContent> = {
  about: {
    seo: {
      title: "About CodexSkin – Independent Codex Themes & Guides",
      description: "Learn how CodexSkin creates independent Codex Desktop theme guidance, verifies third-party sources, and separates its work from OpenAI and upstream projects.",
    },
    eyebrow: "About this site",
    h1: "About CodexSkin",
    summary: "CodexSkin is an independent website for Codex Desktop theme inspiration, practical setup guidance, and original customization advice.",
    updatedLabel: "Last updated",
    updatedAt: "July 20, 2026",
    sections: [
      { id: "purpose", title: "What the site is for", paragraphs: ["CodexSkin helps visitors understand visual customization options for Codex Desktop, find the original source of referenced third-party projects, and follow platform-specific installation, customization, and restore guidance.", "The site also publishes original composition advice for background artwork. It does not provide a replacement Codex client, an automated installer, or a hosted copy of third-party packages."] },
      { id: "editorial", title: "How content is produced", paragraphs: ["Guides are written in original language after reviewing the linked upstream documentation. Platform requirements, script names, behavior claims, and safety boundaries are checked against the original repository before publication.", "Hands-on CodexSkin recommendations are labeled as tested guidance so they are not confused with OpenAI requirements or upstream-project guarantees."], items: ["Source links are centralized in the site configuration.", "Material changes receive a dated review.", "Unverified versions or capabilities are not presented as tested facts."] },
      { id: "independence", title: "Our relationship with OpenAI and upstream projects", paragraphs: ["CodexSkin.site is not owned, operated, endorsed, or sponsored by OpenAI. It is also not the official website of Codex Dream Skin, and the CodexSkin maintainer is not the upstream author.", "Third-party project names, trademarks, code, and assets remain the property of their respective owners and contributors. CodexSkin does not host, modify, or repackage third-party installers."] },
    ],
  },
  contact: {
    seo: {
      title: "Contact CodexSkin – Site Content & Corrections",
      description: "Find the correct channel for CodexSkin site corrections, content questions, and third-party Codex Dream Skin support without sending private information.",
    },
    eyebrow: "Contact",
    h1: "Contact CodexSkin",
    summary: "Use the appropriate channel for website feedback or third-party project support. A public CodexSkin contact email has not yet been configured.",
    updatedLabel: "Last updated",
    updatedAt: "July 20, 2026",
    sections: [
      { id: "status", title: "Contact status", paragraphs: ["CodexSkin currently has no public contact email or submission form. This page will be updated when a verified site-owned address is configured; no placeholder address is presented as real contact information."] },
      { id: "site-feedback", title: "Website corrections and content questions", paragraphs: ["For now, use the public CodexSkin website repository linked in the footer when you need to report a broken link, translation problem, accessibility issue, or factual correction. Do not include passwords, API keys, authentication data, private images, or other sensitive information."], items: ["Include the affected CodexSkin URL.", "Describe the expected and observed content.", "Link an authoritative source when proposing a factual correction."] },
      { id: "upstream-support", title: "Third-party tool support", paragraphs: ["Installation failures, runtime errors, compatibility reports, and feature requests for Codex Dream Skin belong in the original Fei-Away/Codex-Dream-Skin repository. CodexSkin does not develop or distribute that tool and cannot accept private support files on its behalf."] },
    ],
  },
  privacy: {
    seo: {
      title: "CodexSkin Privacy Policy – Analytics, Ads & Cookies",
      description: "Read how CodexSkin handles site access, Vercel Analytics, optional Google Analytics, Google AdSense, cookies, external links, and user-submitted data.",
    },
    eyebrow: "Policy",
    h1: "Privacy Policy",
    summary: "This policy describes the services actually present in the CodexSkin website and the data choices available to visitors.",
    updatedLabel: "Last updated",
    updatedAt: "July 20, 2026",
    sections: [
      { id: "data", title: "Data you provide", paragraphs: ["CodexSkin currently has no accounts, login, contact form, database-backed profile, payment flow, or image-upload feature. The site therefore does not intentionally collect those categories of user-submitted data.", "If you follow an external link and provide information there, that information is handled by the external service under its own policy."] },
      { id: "analytics", title: "Analytics and hosting", paragraphs: ["The site uses Vercel Analytics to measure aggregate website usage. Google Analytics code is included only when a valid site measurement ID is configured; it should not be assumed active when that setting is absent.", "Hosting and delivery providers may process technical request information such as IP address, browser type, device data, requested URL, timestamps, and security logs as needed to operate and protect the site."] },
      { id: "ads", title: "Google AdSense and cookies", paragraphs: ["CodexSkin loads Google AdSense code. Google and its advertising partners may use cookies or similar technologies to serve, personalize, limit, and measure advertising according to their policies and applicable consent requirements.", "Availability and personalization of ads can vary by region, consent choice, browser setting, and Google account settings."], items: ["You can manage cookies through browser controls.", "You can review Google advertising and privacy controls in your Google account or Google's published policies.", "Blocking cookies may change ad behavior without preventing access to the site's editorial content."] },
      { id: "external", title: "External links and policy changes", paragraphs: ["Links to GitHub, OpenAI-related resources, Google, and other sites take you outside CodexSkin. Their privacy practices are not controlled by this site.", "This policy may be updated when the site's actual analytics, advertising, forms, or data practices change. The date above identifies the current published revision."] },
    ],
  },
  terms: {
    seo: {
      title: "CodexSkin Terms of Use – Content & Third-Party Links",
      description: "Review the terms for using CodexSkin tutorials and original materials, following third-party links, respecting ownership, and understanding service limitations.",
    },
    eyebrow: "Policy",
    h1: "Terms of Use",
    summary: "These terms cover CodexSkin's independent editorial content and links to third-party software and services.",
    updatedLabel: "Last updated",
    updatedAt: "July 20, 2026",
    sections: [
      { id: "informational", title: "Informational use", paragraphs: ["CodexSkin provides tutorials, visual examples, and customization guidance for general informational purposes. You are responsible for deciding whether a third-party tool, script, image, or workflow is appropriate for your device, account, workplace, and local rules."] },
      { id: "materials", title: "Original and third-party materials", paragraphs: ["Original CodexSkin writing, page design, and clearly identified original materials may not be presented as your own work or used to impersonate CodexSkin. A separate license or notice controls any material that carries one.", "Third-party code, project names, screenshots, trademarks, and contributed artwork remain governed by their owners' licenses and rights. A software license does not automatically grant rights to portraits, trademarks, or every bundled image."] },
      { id: "links", title: "Third-party links and software", paragraphs: ["CodexSkin links to original repositories but does not control their availability, releases, security, or compatibility. Review source code, permissions, current documentation, and restore steps before running third-party scripts.", "Do not use CodexSkin content to imply official OpenAI support, upstream authorship, or a safety guarantee that the site has not made."] },
      { id: "availability", title: "No warranty and limitation of responsibility", paragraphs: ["The site and its editorial content are provided on an as-available basis without a promise of uninterrupted access, error-free instructions, permanent compatibility, or a particular result.", "To the extent permitted by applicable law, CodexSkin is not responsible for losses caused by third-party software, external services, user configuration, rights violations, or reliance on outdated information. Nothing here excludes rights or liability that cannot legally be excluded."] },
    ],
  },
  disclaimer: {
    seo: {
      title: "CodexSkin Disclaimer – Independent, Unofficial Guides",
      description: "Understand CodexSkin's independent status, third-party trademark and script risks, installer-hosting boundary, compatibility limits, and artwork responsibilities.",
    },
    eyebrow: "Disclosure",
    h1: "Disclaimer",
    summary: "CodexSkin is an independent editorial website, not an official OpenAI service or the official website of the projects it references.",
    updatedLabel: "Last updated",
    updatedAt: "July 20, 2026",
    sections: [
      { id: "identity", title: "Independent and unofficial", paragraphs: ["CodexSkin.site is not affiliated with, endorsed by, sponsored by, or operated by OpenAI. It is not the official Codex Dream Skin website, and its maintainer is not the developer of that upstream project.", "OpenAI, Codex, project names, company names, and other marks belong to their respective owners. Reference to them is descriptive and does not imply partnership or endorsement."] },
      { id: "software", title: "Third-party scripts and installers", paragraphs: ["CodexSkin does not host, modify, proxy, automatically download, or repackage Codex Dream Skin installers. Links direct visitors to an original third-party repository verified on the date stated on the project guide.", "Running local debugging or injection tools can carry security and compatibility risk. Review the source, understand requested permissions, keep restore instructions available, and do not treat any guide as a guarantee of absolute safety."] },
      { id: "accuracy", title: "Accuracy and compatibility", paragraphs: ["Documentation and software can change after publication. Codex updates may require a third-party theme to be reinstalled, adapted, or temporarily discontinued. CodexSkin does not promise permanent compatibility or continuous availability."] },
      { id: "artwork", title: "Artwork and user responsibility", paragraphs: ["Theme examples can contain user-provided, AI-generated, trademarked, or likeness-related material. Before using or redistributing an image, confirm that you have the necessary rights and that the intended use complies with applicable rules."] },
    ],
  },
};

export const zhInfoContent: Record<InfoRouteKey, InfoPageContent> = {
  about: {
    seo: { title: "关于 CodexSkin - 独立 Codex 主题与教程网站", description: "了解 CodexSkin 如何制作独立的 Codex 桌面端主题教程、核对第三方来源，并明确本站与 OpenAI 及上游项目的关系。" },
    eyebrow: "关于本站",
    h1: "关于 CodexSkin",
    summary: "CodexSkin 是提供 Codex 桌面端主题灵感、实用教程与原创定制建议的独立网站。",
    updatedLabel: "最后更新",
    updatedAt: "2026年7月20日",
    sections: [
      { id: "purpose", title: "网站用途", paragraphs: ["CodexSkin 帮助访问者了解 Codex 桌面端的视觉定制方式、找到所引用第三方项目的原始来源，并阅读分平台安装、定制和恢复教程。", "本站也发布原创背景图构图经验，但不提供替代版 Codex 客户端、自动安装服务或第三方安装包镜像。"] },
      { id: "editorial", title: "内容如何制作与核对", paragraphs: ["教程使用原创表述，并在发布前检查所链接的上游文档。平台要求、脚本名称、行为说明和安全边界均以原始仓库为主要核对依据。", "CodexSkin 自己的实践经验会明确标注为实测建议，避免被误解为 OpenAI 要求或上游项目保证。"], items: ["上游链接集中在站点配置中维护。", "重要变化会记录核对日期。", "未核验的版本或能力不会写成本站实测事实。"] },
      { id: "independence", title: "与 OpenAI 和上游项目的关系", paragraphs: ["CodexSkin.site 不属于 OpenAI，也未获得 OpenAI 运营、认可、赞助或背书。本站也不是 Codex Dream Skin 官方网站，本站维护者不是其上游作者。", "第三方项目名称、商标、代码和素材归对应权利人及贡献者所有。本站不托管、不修改、不重新打包第三方安装程序。"] },
    ],
  },
  contact: {
    seo: { title: "联系 CodexSkin - 网站内容反馈与纠错", description: "了解 CodexSkin 网站纠错、内容问题与第三方 Codex Dream Skin 支持应使用的渠道，并避免提交隐私或敏感信息。" },
    eyebrow: "联系",
    h1: "联系 CodexSkin",
    summary: "请区分网站内容反馈与第三方项目支持。CodexSkin 目前尚未配置公开联系邮箱。",
    updatedLabel: "最后更新",
    updatedAt: "2026年7月20日",
    sections: [
      { id: "status", title: "联系渠道状态", paragraphs: ["CodexSkin 当前没有公开联系邮箱或提交表单。配置并验证站点自有邮箱后，本页会同步更新；本站不会用虚构地址充当真实联系方式。"] },
      { id: "site-feedback", title: "网站纠错与内容问题", paragraphs: ["现阶段如需反馈失效链接、翻译、无障碍问题或事实错误，可使用页脚链接的 CodexSkin 网站源码仓库。不要提交密码、API Key、验证码、私人图片或其他敏感资料。"], items: ["附上受影响的 CodexSkin 页面 URL。", "说明预期内容和当前表现。", "事实纠错尽量提供权威来源链接。"] },
      { id: "upstream-support", title: "第三方工具支持", paragraphs: ["Codex Dream Skin 的安装失败、运行错误、兼容性报告和功能建议，应提交到原始 Fei-Away/Codex-Dream-Skin 仓库。CodexSkin 不开发或分发该工具，也不代表上游接收私人支持文件。"] },
    ],
  },
  privacy: {
    seo: { title: "CodexSkin 隐私政策 - 统计、广告与 Cookie", description: "了解 CodexSkin 如何处理网站访问、Vercel Analytics、可选 Google Analytics、Google AdSense、Cookie、外部链接与用户提交数据。" },
    eyebrow: "政策",
    h1: "隐私政策",
    summary: "本政策仅说明 CodexSkin 网站实际存在的服务，以及访问者可以使用的数据和 Cookie 控制方式。",
    updatedLabel: "最后更新",
    updatedAt: "2026年7月20日",
    sections: [
      { id: "data", title: "你主动提供的数据", paragraphs: ["CodexSkin 当前没有账号、登录、联系表单、数据库个人资料、支付或图片上传功能，因此本站不会主动收集这些类别的用户提交数据。", "如果你访问外部链接并在那里提交信息，相应数据将由外部服务按照其政策处理。"] },
      { id: "analytics", title: "访问统计与托管", paragraphs: ["本站使用 Vercel Analytics 统计汇总访问情况。只有配置有效站点 Measurement ID 时才会加载 Google Analytics；未配置时不应把它理解为已启用。", "托管和内容分发服务可能为运行和保护网站处理必要的技术请求信息，例如 IP 地址、浏览器和设备类型、访问 URL、时间戳及安全日志。"] },
      { id: "ads", title: "Google AdSense 与 Cookie", paragraphs: ["CodexSkin 加载 Google AdSense 代码。Google 及其广告合作方可能根据自身政策和适用的同意要求，使用 Cookie 或类似技术投放、个性化、限制及衡量广告。", "广告是否显示、是否个性化，可能因地区、同意选择、浏览器设置和 Google 账号设置而不同。"], items: ["可以通过浏览器设置管理 Cookie。", "可以在 Google 账号或 Google 公布的政策页面查看广告和隐私控制。", "阻止 Cookie 可能改变广告行为，但不会阻止阅读本站正文。"] },
      { id: "external", title: "外部链接与政策更新", paragraphs: ["前往 GitHub、Google、OpenAI 相关资源或其他网站后，将适用对应外部网站的隐私政策，CodexSkin 无法控制其数据处理。", "当本站真实使用的统计、广告、表单或数据流程发生变化时，本政策会随之更新；页面顶部日期代表当前公开版本。"] },
    ],
  },
  terms: {
    seo: { title: "CodexSkin 使用条款 - 内容与第三方链接", description: "查看 CodexSkin 教程和原创素材的使用条件、第三方链接与软件责任、权利归属、禁止冒充以及服务限制。" },
    eyebrow: "政策",
    h1: "使用条款",
    summary: "这些条款适用于 CodexSkin 的独立编辑内容，以及本站指向第三方软件和服务的链接。",
    updatedLabel: "最后更新",
    updatedAt: "2026年7月20日",
    sections: [
      { id: "informational", title: "信息用途", paragraphs: ["CodexSkin 提供的教程、视觉示例和定制建议仅用于一般信息参考。你需要自行判断第三方工具、脚本、图片或操作流程是否适合自己的设备、账号、工作环境和当地规则。"] },
      { id: "materials", title: "原创与第三方素材", paragraphs: ["CodexSkin 原创文字、页面设计和明确标注的原创素材，不得被冒充为他人原创或用于假冒 CodexSkin。带有单独许可或声明的素材，以对应文件为准。", "第三方代码、项目名称、截图、商标和贡献素材仍受各自权利人许可与权利约束。软件许可证不当然授予人物肖像、商标或全部随附图片的使用权。"] },
      { id: "links", title: "第三方链接与软件", paragraphs: ["CodexSkin 链接到原始仓库，但不控制其可用性、版本、安全性或兼容性。运行第三方脚本前，请检查源码、权限、最新文档和恢复方法。", "不得利用本站内容暗示 OpenAI 官方支持、冒充上游作者，或宣称本站未作出的安全保证。"] },
      { id: "availability", title: "无保证与责任限制", paragraphs: ["本站及编辑内容按现状和可用状态提供，不承诺持续无中断、教程绝无错误、永久兼容或一定达到某种效果。", "在适用法律允许范围内，CodexSkin 不对第三方软件、外部服务、用户配置、权利侵害或依赖过期信息造成的损失负责；法律不得排除的权利或责任不受本条影响。"] },
    ],
  },
  disclaimer: {
    seo: { title: "CodexSkin 免责声明 - 独立非官方教程", description: "了解 CodexSkin 的独立身份、第三方商标与脚本风险、不托管安装程序的边界、兼容性限制及图片素材责任。" },
    eyebrow: "声明",
    h1: "免责声明",
    summary: "CodexSkin 是独立编辑网站，不是 OpenAI 官方服务，也不是所引用项目的官方网站。",
    updatedLabel: "最后更新",
    updatedAt: "2026年7月20日",
    sections: [
      { id: "identity", title: "独立且非官方", paragraphs: ["CodexSkin.site 与 OpenAI 没有隶属、认可、赞助或运营关系。本站不是 Codex Dream Skin 官方网站，本站维护者也不是该上游项目开发者。", "OpenAI、Codex、项目名、公司名及其他商标归各自权利人所有。本站仅为说明性引用，不代表合作或背书。"] },
      { id: "software", title: "第三方脚本与安装程序", paragraphs: ["CodexSkin 不托管、不修改、不代理、不自动下载、不重新打包 Codex Dream Skin 安装程序。页面链接指向项目页所列核对日期确认的第三方原始仓库。", "运行本机调试或注入工具可能存在安全和兼容风险。请检查源码、理解权限、保留恢复步骤，不要把任何教程理解为绝对安全保证。"] },
      { id: "accuracy", title: "准确性与兼容性", paragraphs: ["文档和软件可能在本站发布后变化。Codex 更新可能导致第三方主题需要重装、适配或暂时停止使用；CodexSkin 不承诺永久兼容或持续可用。"] },
      { id: "artwork", title: "图片素材与用户责任", paragraphs: ["主题示例可能包含用户提供、AI 生成、商标或人物相关素材。使用或再次分发图片前，请确认拥有必要权利，并确保用途符合适用规则。"] },
    ],
  },
};
