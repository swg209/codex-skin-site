# CodexSkin AdSense 审核复检清单

更新日期：2026-07-20

这份清单同时覆盖代码可验证项与只能由站长在 Google、域名或流量后台确认的项目。当前源码保留 AdSense 所有权验证脚本与 `ads.txt`，但 `siteConfig.adsense.reviewMode` 为 `true`，所有手动广告位均停止输出。审核期间还必须在 AdSense 后台关闭 Auto ads，因为源码无法覆盖账号级自动广告设置。

## Blocker、High 与 Medium 整改结果

- [ ] 访问 `/privacy` 和 `/zh/privacy`，确认页面说明 Google AdSense、第三方 Cookie/标识符、IP 地址、个性化广告、地区同意、退出设置和联系邮箱。
- [ ] 访问 `/contact` 和 `/zh/contact`，确认 `weigensu@gmail.com` 邮件链接可用，并清楚区分本站问题与上游项目问题。
- [ ] 页脚在中英文页面都能进入 About、Contact、Privacy、Terms 和 Disclaimer。
- [ ] 首页不出现 `Coming Soon`、`即将上线`、占位联系渠道或不可用按钮。
- [ ] 首页只展示四张 CodexSkin 原创主题；旧 `skin-01.jpg` 至 `skin-08.jpg` 不再进入主画廊或 metadata。
- [ ] 主题详情显示创作者、日期、生成方式、授权文件、商业使用与再分发状态。
- [ ] Windows、macOS、自定义和恢复指南具有前置条件、步骤、验证、回滚、故障处理和来源说明。
- [ ] sitemap 返回 48 个公开 URL，并为每个中英文页面提供 canonical、`en`、`zh-CN` 与 `x-default`。
- [ ] 全站措辞为“开源视觉定制层/外观定制”，明确不修改、不托管、不重新打包官方程序或第三方安装程序。
- [ ] 页脚保留“Codex 是 OpenAI 的商标，本站与 OpenAI 无隶属关系”的独立身份说明。

## 工具标为 Unknown 的站长确认项

### 账号资格与所有权

- [ ] **ADS-ELIG-01**：核对 AdSense 收款人出生日期或主体资料，确认申请人年满 18 岁；未成年必须由监护人账号管理。
- [ ] **ADS-ELIG-02**：在所有常用 Google 账号中搜索 AdSense 邮件，并登录 AdSense 核对账号；确认同一收款主体只有一个 AdSense 账号，新网站添加到现有账号而不是重复开户。
- [ ] **ADS-OWN-01**：在浏览器“查看源代码”中搜索 `ca-pub-5491343418531814`，确认每种公开页面的 `<head>` 都含官方脚本。
- [ ] **ADS-OWN-02**：登录 Namecheap，确认 `codexskin.site` 在本人账号、联系人邮箱可用、DNS 可编辑；保存域名与 DNS 页面截图作为所有权记录。
- [ ] **ADS-SITE-01**：在 AdSense 后台“网站”中确认 `codexskin.site` 已添加、验证状态正常，并记录当前审核状态。
- [ ] **ADS-SITE-02**：分别打开 `/ads.txt` 和任一页面源代码，确认 ads.txt 授权行与 `<head>` 脚本至少一种验证方式被 AdSense 识别。

### 流量与广告实现

- [ ] **ADS-PROG-01**：确认本人、团队、测试人员没有点击本站广告；测试布局时使用审核模式或 Google 提供的测试方式，不点击真实素材。
- [ ] **ADS-PROG-03**：在桌面与手机实机查看每个广告位，确认显示中性“Advertisement/广告”标签，且与下载、安装、GitHub 按钮保持明显间距。
- [ ] **ADS-PROG-04**：在 GA4、Vercel Analytics 和 GSC 对照来源；确认没有 PTC、互点、激励流量、垃圾邮件、垃圾评论或来源突增无法解释的访问。
- [ ] **ADS-PROG-05**：对照 Google 提供的脚本，确认未改写 `adsbygoogle.js` 地址、publisher ID、事件或点击行为，也没有代理广告请求。
- [ ] **ADS-PROG-06**：关闭审核模式前抽查准入清单；只有完整教程、知识库文章和原创主题详情页可展示广告，首页、目录、政策、联系、弹窗和未知路径均不可展示。
- [ ] **ADS-UX-06 / ADS-PUB-10 / ADS-PUB-12 / ADS-REST-08**：用 375px 手机、768px 平板和桌面宽度人工检查；广告不得首屏压过正文、遮挡导航、悬浮覆盖内容、位于屏幕外或制造无法离开的死屏。

### 内容、商标与工具边界

- [ ] **ADS-PUB-02**：抽查所有图片的来源记录和许可证；确认主画廊仅使用 `public/original-themes` 资产，页面不把 OpenAI 或上游作者的商标、截图、作品声明为本站所有。
- [ ] **ADS-PUB-07**：搜索生产页面中的 `crack`、`破解`、`patch` 等词；确认教程只解释可逆视觉定制，不包含绕过授权、安全、付费或访问控制的方法。

### 隐私与定向

- [ ] **ADS-PRIV-03**：检查页面 URL、查询参数、data layer 与广告 slot 配置；不得把邮箱、手机号、姓名或其他 PII 传给 Google 广告请求。
- [ ] **ADS-PRIV-04**：在 AdSense“隐私权和消息”配置 Google 认证 CMP，覆盖 EEA、英国和瑞士；用相应地区或 Google 调试工具确认同意界面先于个性化广告。
- [ ] **ADS-PRIV-05**：在浏览器站点权限中确认本站不请求精确位置。未来若增加定位，必须先更新隐私政策并取得明确同意。
- [ ] **ADS-PRIV-07**：确认没有自写代理或脚本在 `google.com`、`doubleclick.net` 等 Google 域名上设置、覆盖或删除 Cookie。
- [ ] **ADS-PRIV-08**：在 AdSense、GA4 和任何受众平台检查受众定义；不得利用健康、宗教、性取向等敏感信息建立广告受众。
- [ ] **ADS-PRIV-09**：确认本站不投放或定向美加地区的房产、招聘、信贷广告；若未来涉及，必须检查 Google 对受保护属性定向的限制。
- [ ] **ADS-PRIV-10**：若开启个性化广告，确认所用数据具备合法使用权、CMP 记录同意，且隐私政策继续披露兴趣相关广告与退出方式。

## 提交审核前的最后复检

- [ ] AdSense 后台 Auto ads 已关闭，源码 `reviewMode` 仍为 `true`。
- [ ] `npm test`、`npm run lint`、`npm run typecheck` 与 `npm run build` 全部通过。
- [ ] 生产站 48 个 sitemap URL 均返回 200，无 404、5xx、`noindex` 或 Vercel 预览 canonical。
- [ ] `/robots.txt`、`/sitemap.xml`、`/ads.txt`、隐私政策和联系页可公开访问。
- [ ] GSC 已提交 `https://codexskin.site/sitemap.xml`，首页、Dream Skin 承接页、平台教程、知识库与主题页开始被发现。
- [ ] 手机和桌面人工抽查中英文首页、两篇平台教程、两篇知识库文章、两张主题详情和全部信任页。
- [ ] 原创内容、截图/主题授权、联系邮箱与独立站身份声明均与实际情况一致。
- [ ] 近 7 至 14 天流量来源自然且可解释，没有自点、互点、购买或激励流量。

所有复选项确认后再请求 AdSense 复审。审核通过也不代表可以跳过这些要求；启用任何广告库存前应再次完成布局、CMP 与流量质量检查。
