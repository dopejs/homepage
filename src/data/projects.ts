export type ProjectStatus = 'stable' | 'active' | 'early' | 'design';

/** A string that exists in both site locales. */
export interface I18nText {
  en: string;
  zh: string;
}

export interface InstallCommand {
  label: I18nText;
  command: string;
}

export interface Project {
  /** Repository name under github.com/dopejs — also the detail-page slug. */
  slug: string;
  name: string;
  /** Short one-liner shown on the card and under the detail-page title. */
  tagline: I18nText;
  /** Two or three sentences, shown on the card and as the detail-page lead. */
  summary: I18nText;
  /** Detail-page body paragraphs. */
  body: I18nText[];
  /** Detail-page bullet list — concrete capabilities, sourced from the README. */
  highlights: I18nText[];
  status: ProjectStatus;
  languages: string[];
  license: string | null;
  /** Shown next to the license when it needs a caveat (e.g. no license chosen yet). */
  licenseNote?: I18nText;
  repo: string;
  /** Project homepage, when it has one that is not the repo. */
  homepage?: string;
  /** Copy-pasteable commands, when the project ships them. */
  installs?: InstallCommand[];
  /** Prerequisites for building or running locally. */
  requirements?: I18nText;
}

/**
 * Kept in sync by hand with each repository's README and GitHub metadata.
 * Two rules for anything written here:
 *   1. Every claim must be traceable to the repository — no inferred features.
 *   2. Status and license wording stays conservative; several of these projects
 *      are pre-release and one has no open-source license at all.
 */
export const projects: Project[] = [
  {
    slug: 'dope-agent',
    name: 'DopeAgent',
    tagline: {
      en: 'A personal agent OS — one local daemon, many thin clients.',
      zh: '个人 Agent 操作系统 —— 一个本地守护进程，多个轻客户端。',
    },
    summary: {
      en: 'A Rust control plane runs locally and owns the runtime, LLM providers, channel connectors, storage and events. Clients stay thin: a React web UI, a full-screen Rust TUI, chat-channel connectors, and a TypeScript SDK — all speaking the same JSON Schema contracts.',
      zh: 'Rust 控制平面在本地运行，掌管运行时、LLM 提供方、渠道连接器、存储与事件。客户端保持轻量：React Web UI、全屏 Rust TUI、聊天渠道连接器和 TypeScript SDK —— 全部基于同一套 JSON Schema 契约。',
    },
    body: [
      {
        en: 'The daemon is the product. Everything that has to be correct — session state, provider routing, the tool harness, the event log — lives in one Rust workspace behind a local HTTP API, so a client is never more than a view onto it. The daemon binary is `dope-cli`; the HTTP API is `dope-api`.',
        zh: '守护进程才是产品本体。所有必须保证正确的部分 —— 会话状态、提供方路由、工具 harness、事件日志 —— 都收敛在一个 Rust workspace 里，通过本地 HTTP API 暴露；客户端不过是它的一个视图。守护进程二进制为 `dope-cli`，HTTP API 为 `dope-api`。',
      },
      {
        en: 'Cross-language contracts live in `schemas/` as JSON Schema and are the source of truth for the API, events and config — the Rust daemon and the TypeScript clients are generated against the same definitions rather than kept in sync by convention.',
        zh: '跨语言契约以 JSON Schema 形式存放在 `schemas/`，是 API、事件与配置的唯一事实来源 —— Rust 守护进程与 TypeScript 客户端基于同一份定义生成，而不是靠约定手工对齐。',
      },
      {
        en: 'A stated working assumption is that long-lived agent state must be observable, replayable and safe to evolve; context engineering, memory, planning, handoff and policy are being redesigned rather than lightly patched.',
        zh: '项目明确的工作假设是：长生命周期的 Agent 状态必须可观测、可重放、可安全演进；上下文工程、记忆、规划、交接与策略是重新设计，而非小修小补。',
      },
    ],
    highlights: [
      {
        en: 'Rust control plane: runtime, LLM providers, channels/connectors, store, events, HTTP API and harness in one workspace.',
        zh: 'Rust 控制平面：运行时、LLM 提供方、渠道连接器、存储、事件、HTTP API 与 harness 收敛在一个 workspace。',
      },
      {
        en: 'Three surfaces over one daemon: React 19 + Vite web UI, full-screen Rust TUI (`dope-tui`), and chat-channel connectors.',
        zh: '同一守护进程之上的三种界面：React 19 + Vite Web UI、全屏 Rust TUI（`dope-tui`）、聊天渠道连接器。',
      },
      {
        en: 'TypeScript client SDK (`@dope/client`) generated against the shared JSON Schema contracts.',
        zh: 'TypeScript 客户端 SDK（`@dope/client`），基于共享的 JSON Schema 契约生成。',
      },
      {
        en: 'Separate test and prod environments — `~/.dope-test` on port 19192 versus `~/.dope` on 19191, with live connectors disabled by default in test.',
        zh: '测试与生产环境隔离 —— `~/.dope-test` 使用 19192 端口，`~/.dope` 使用 19191；测试环境默认关闭真实连接器。',
      },
      {
        en: 'The earlier Go daemon was fully replaced by the Rust workspace; the migration is recorded in `crates/MIGRATION.md`.',
        zh: '早期的 Go 守护进程已被 Rust workspace 完全替代，迁移过程记录在 `crates/MIGRATION.md`。',
      },
    ],
    status: 'active',
    languages: ['Rust', 'TypeScript'],
    license: null,
    licenseNote: {
      en: 'No license file in the repository yet.',
      zh: '仓库尚未添加 license 文件。',
    },
    repo: 'https://github.com/dopejs/dope-agent',
  },
  {
    slug: 'dcode',
    name: 'DCode',
    tagline: {
      en: 'Lightweight coding agent that runs in your terminal.',
      zh: '运行在终端里的轻量编码 Agent。',
    },
    summary: {
      en: 'A DeepSeek-focused fork of Codex CLI shipping the `dcode` command. Defaults to DeepSeek V4 Flash, supports API-key login, DeepSeek balance and model APIs, and an optional external vision model for image inputs. Signed, checksummed release builds for macOS, Linux and Windows.',
      zh: 'Codex CLI 的 DeepSeek 定制分支，提供 `dcode` 命令。默认使用 DeepSeek V4 Flash，支持 API Key 登录、DeepSeek 余额与模型接口，并可选接入外部视觉模型处理图片输入。macOS、Linux、Windows 均有带校验和的发布产物。',
    },
    body: [
      {
        en: 'DCode keeps the upstream Codex development workflow and layers a DeepSeek-shaped product on top: `/login` in the TUI takes a DeepSeek API key, and the account balance then shows up in the status line. Images are handled by an optional external vision model rather than by the main coding model.',
        zh: 'DCode 保留了上游 Codex 的开发流程，在其上叠加面向 DeepSeek 的产品形态：在 TUI 中执行 `/login` 输入 DeepSeek API Key，登录后状态栏会显示账户余额。图片输入由可选的外部视觉模型处理，而不是交给主编码模型。',
      },
      {
        en: 'Releases are the deliberate part of this project. The installer verifies the archive against `dcode_SHA256SUMS`, unpacks a complete runtime package under `${DCODE_HOME:-~/.dcode}/packages/standalone`, and exposes the command through `~/.local/bin`. `dcode update` reinstalls the newest release through that same verified path. macOS artifacts are ad-hoc signed but not Apple-notarized.',
        zh: '发布链路是这个项目刻意打磨的部分。安装脚本会用 `dcode_SHA256SUMS` 校验归档，把完整运行时解包到 `${DCODE_HOME:-~/.dcode}/packages/standalone`，并通过 `~/.local/bin` 暴露命令。`dcode update` 走同一条经过校验的路径重装最新版本。macOS 产物为 ad-hoc 签名，未经 Apple 公证。',
      },
    ],
    highlights: [
      {
        en: 'Ships the `dcode` command; defaults to DeepSeek V4 Flash with API-key login from inside the TUI.',
        zh: '提供 `dcode` 命令，默认使用 DeepSeek V4 Flash，可在 TUI 内用 API Key 登录。',
      },
      {
        en: 'DeepSeek balance and model APIs wired in — remaining balance appears in the status line after login.',
        zh: '接入 DeepSeek 余额与模型接口 —— 登录后状态栏直接显示剩余额度。',
      },
      {
        en: 'Optional external vision model for image inputs.',
        zh: '可选接入外部视觉模型处理图片输入。',
      },
      {
        en: 'Release targets: macOS (Apple Silicon and Intel), Linux glibc (arm64 and x86_64), Windows x86_64.',
        zh: '发布目标：macOS（Apple Silicon 与 Intel）、Linux glibc（arm64 与 x86_64）、Windows x86_64。',
      },
      {
        en: 'Installer verifies SHA-256 checksums; `DCODE_INSTALL_DIR` and `DCODE_RELEASE` override the install path and version.',
        zh: '安装脚本校验 SHA-256；可用 `DCODE_INSTALL_DIR`、`DCODE_RELEASE` 覆盖安装路径与版本。',
      },
    ],
    status: 'stable',
    languages: ['Rust'],
    license: 'Apache-2.0',
    repo: 'https://github.com/dopejs/dcode',
    installs: [
      {
        label: { en: 'macOS and Linux', zh: 'macOS 与 Linux' },
        command: 'curl -fsSL https://github.com/dopejs/dcode/releases/latest/download/install-dcode.sh | sh',
      },
      {
        label: { en: 'Windows PowerShell (x86_64)', zh: 'Windows PowerShell（x86_64）' },
        command:
          'powershell -ExecutionPolicy Bypass -c "irm https://github.com/dopejs/dcode/releases/latest/download/install-dcode.ps1 | iex"',
      },
    ],
  },
  {
    slug: 'gozen',
    name: 'GoZen',
    tagline: {
      en: 'Multi-CLI environment switcher with API proxy auto-failover.',
      zh: '多 CLI 环境切换器，内置 API 代理自动故障转移。',
    },
    summary: {
      en: 'Switch environments across Claude Code, Codex and OpenCode from one place, and keep working when an upstream provider degrades — GoZen proxies API traffic and fails over automatically.',
      zh: '在一处切换 Claude Code、Codex、OpenCode 的运行环境；上游供应商抖动时也不中断 —— GoZen 代理 API 流量并自动切换到可用线路。',
    },
    body: [
      {
        en: 'All API configuration lives in `~/.zen/zen.json`, and a single `zend` daemon hosts both the proxy server and a password-protected web UI. Directories can be bound to a specific profile and CLI, so `zen` in a project folder launches the right client against the right provider without flags.',
        zh: '所有 API 配置集中在 `~/.zen/zen.json`，单个 `zend` 守护进程同时承载代理服务与带密码保护的 Web UI。目录可以绑定到指定 profile 与 CLI，在项目目录里直接敲 `zen` 就会用正确的客户端连上正确的供应商，无需附加参数。',
      },
      {
        en: 'The proxy is the reason to run it: requests are routed by characteristics such as thinking, image and long-context, and fall over to backup providers when the primary is unavailable. Version 3 adds token/cost tracking per provider, model and project, budget limits with warn/downgrade/block actions, provider health checks, several load-balancing strategies, and webhook notifications.',
        zh: '真正的价值在代理层：请求按 thinking、image、longContext 等特征路由，主线路不可用时自动切到备用供应商。v3 增加了按供应商 / 模型 / 项目维度的 token 与成本统计、带告警/降级/阻断动作的预算控制、供应商健康检查、多种负载均衡策略以及 Webhook 通知。',
      },
      {
        en: 'Config can be synced across devices through WebDAV, S3, a GitHub Gist or a GitHub repository, encrypted with AES-256-GCM. Web UI tokens are transported with RSA encryption behind session-based auth.',
        zh: '配置可通过 WebDAV、S3、GitHub Gist 或 GitHub 仓库在多设备间同步，使用 AES-256-GCM 加密。Web UI 采用会话认证，令牌传输使用 RSA 加密。',
      },
    ],
    highlights: [
      {
        en: 'One switcher for Claude Code, Codex and OpenCode, configurable per project through directory bindings.',
        zh: '一个切换器覆盖 Claude Code、Codex、OpenCode，可通过目录绑定按项目配置。',
      },
      {
        en: 'Built-in HTTP proxy with automatic failover to backup providers, plus scenario routing (thinking, image, long context).',
        zh: '内置 HTTP 代理，主线路故障时自动切换备用供应商，并支持场景化路由（thinking、image、长上下文）。',
      },
      {
        en: 'Usage and cost tracking per provider, model and project, with daily/weekly/monthly budget limits.',
        zh: '按供应商、模型、项目统计用量与成本，支持日 / 周 / 月预算限额。',
      },
      {
        en: 'Provider health monitoring with latency and error-rate tracking; failover, round-robin, least-latency and least-cost balancing.',
        zh: '供应商健康监控（延迟与错误率），支持故障转移、轮询、最低延迟、最低成本等均衡策略。',
      },
      {
        en: 'Encrypted config sync over WebDAV, S3, GitHub Gist or GitHub repo (AES-256-GCM).',
        zh: '通过 WebDAV、S3、GitHub Gist 或 GitHub 仓库同步配置，使用 AES-256-GCM 加密。',
      },
      {
        en: 'Bot gateway to monitor and control Claude Code sessions from Telegram, Discord, Slack, Lark or Messenger.',
        zh: 'Bot 网关：可从 Telegram、Discord、Slack、飞书或 Messenger 监控与控制 Claude Code 会话。',
      },
      {
        en: 'Self-update via `zen upgrade`, plus zsh / bash / fish completion.',
        zh: '`zen upgrade` 自更新，并提供 zsh / bash / fish 补全。',
      },
    ],
    status: 'stable',
    languages: ['Go'],
    license: 'MIT',
    repo: 'https://github.com/dopejs/GoZen',
    homepage: 'https://gozen.dev/',
    installs: [
      {
        label: { en: 'Install', zh: '安装' },
        command: 'curl -fsSL https://raw.githubusercontent.com/dopejs/gozen/main/install.sh | sh',
      },
      {
        label: { en: 'First run', zh: '首次运行' },
        command: 'zen config add provider && zen',
      },
    ],
  },
  {
    slug: 'doper',
    name: 'doper',
    tagline: {
      en: 'A Web Canvas rendering engine designed from scratch.',
      zh: '从零设计的 Web Canvas 渲染引擎。',
    },
    summary: {
      en: 'A high-performance TSX runtime with native virtual scrolling, a deterministic Rust/WASM core behind a versioned binary ABI, full text rendering and canvas-native editing. Milestones M0–M3 are complete; M4 brings the editing, event, hit-testing and accessibility chain.',
      zh: '高性能 TSX 运行时，原生虚拟滚动，确定性 Rust/WASM Core 与版本化二进制 ABI，完整文本渲染与 Canvas 原生编辑能力。M0–M3 里程碑已完成，M4 将补齐编辑、事件、命中与无障碍主链。',
    },
    body: [
      {
        en: 'doper is not yet a rendering engine you can drop into a product, and the repository says so plainly. P0/M0 through M3 are done; M4 — the editing, event, hit-testing and accessibility chain — is the next stage. Technical decisions are settled in `docs/design.md`, and delivery order and exit gates in `docs/plan.md`.',
        zh: 'doper 目前还不是可以直接接入业务的渲染引擎，仓库本身也是这么写的。P0/M0 至 M3 已完成，下一阶段是 M4 —— 编辑、事件、命中与无障碍主链。技术决策以 `docs/design.md` 为准，交付顺序与出口门禁见 `docs/plan.md`。',
      },
      {
        en: 'What runs today is `apps/platform-probe`: a measurement slice rather than a demo. It records worker rAF frame intervals, main-thread-to-worker latency through SharedArrayBuffer, worker self-drive while the main thread blocks for 200 ms, Canvas2D and scroll-copy throughput, WASM size and load cost, and the Canvas editing input path — EditContext first, with a centralized textarea proxy as fallback — including recorded IME sessions replayed for determinism.',
        zh: '当前真正可运行的是 `apps/platform-probe`：一条用于度量而非演示的切片。它采集 Worker rAF 帧间隔、主线程经 SharedArrayBuffer 到 Worker 的延迟、主线程阻塞 200ms 时 Worker 的自驱情况、Canvas2D 与 scroll-copy 吞吐、WASM 体积与加载开销，以及 Canvas 编辑输入路径（EditContext 优先，集中式 textarea proxy 降级），并含可确定性回放的 IME 录制。',
      },
      {
        en: 'The probe proves the local environment is viable — the dev server sends COOP/COEP headers for cross-origin isolation — not that a production deployment meets those conditions. Real-device performance and real IME behaviour are treated as a separate platform qualification: until a platform is qualified with `pnpm platform:qualify`, the project does not claim its numbers.',
        zh: '探针只证明本地环境可用（开发服务器会发送 COOP/COEP 响应头以启用跨源隔离），不代表业务部署已满足这些条件。真机性能与真实输入法行为属于独立的平台资格认证：在通过 `pnpm platform:qualify` 认证之前，项目不对外宣称对应指标。',
      },
    ],
    highlights: [
      {
        en: 'High-performance TSX runtime with virtual scrolling as a first-class primitive, not a userland add-on.',
        zh: '高性能 TSX 运行时，虚拟滚动是一等原语，而非上层附加实现。',
      },
      {
        en: 'Deterministic Rust/WASM core behind a versioned binary ABI.',
        zh: '确定性 Rust/WASM Core，通过版本化二进制 ABI 暴露。',
      },
      {
        en: 'Canvas-native text editing: EditContext-first input with a centralized textarea proxy fallback, and deterministic IME record/replay.',
        zh: 'Canvas 原生文本编辑：EditContext 优先、集中式 textarea proxy 降级，并支持确定性的 IME 录制与回放。',
      },
      {
        en: 'Platform qualification is explicitly separate from milestone completion — unqualified platforms make no performance claims.',
        zh: '平台资格认证与里程碑完成明确解耦 —— 未认证的平台不做性能宣称。',
      },
    ],
    status: 'early',
    languages: ['TypeScript', 'Rust'],
    license: null,
    licenseNote: {
      en: 'No license file in the repository yet.',
      zh: '仓库尚未添加 license 文件。',
    },
    repo: 'https://github.com/dopejs/doper',
    requirements: {
      en: 'Node.js 22.12+, pnpm 10.33.2, Rust 1.96.0 with the wasm32-unknown-unknown target.',
      zh: 'Node.js 22.12+、pnpm 10.33.2、Rust 1.96.0，并安装 wasm32-unknown-unknown target。',
    },
    installs: [
      {
        label: { en: 'Run the platform probe', zh: '运行平台探针' },
        command: 'pnpm install --frozen-lockfile && pnpm m0:check && pnpm probe:dev',
      },
    ],
  },
  {
    slug: 'dope-canvas',
    name: 'dope-canvas',
    tagline: {
      en: 'An infinite canvas for large collections of AI-generated web artifacts.',
      zh: '面向海量 AI 生成 Web 产物的无限画布运行时。',
    },
    summary: {
      en: 'Hundreds of live iframes do not scale; flattening every page to an image loses selection and event targeting. dope-canvas keeps artifacts retained — source, durable state, interaction tree, paint cache and an optional live runtime — so Figma-like selection and activation survive. The repository is at its pre-development baseline: architecture, delivery plan and security model, not yet a working canvas.',
      zh: '几百个活跃 iframe 无法规模化，而把页面全部拍平成图片又会丢失选区与事件定位。dope-canvas 以"保留式产物"建模 —— 源码、持久状态、交互树、绘制缓存与可选的活跃运行时 —— 让 Figma 式的选择与激活得以保留。仓库当前处于开发前基线：只有架构、交付计划与安全模型，尚无可运行的画布。',
    },
    body: [
      {
        en: 'Every iframe retains a browsing context, DOM/CSS state, a script realm, resources and rendering state, so keeping hundreds of generated pages alive scales badly. The design answer here is a retained artifact model — `artifact = source + durable state + interaction tree + paint cache + optional live runtime` — in which a snapshot is only a paint cache. The document and interaction model stay available for selection, event routing, activation and revision-safe restoration.',
        zh: '每个 iframe 都保留着浏览上下文、DOM/CSS 状态、脚本 realm、资源与渲染状态，因此让几百个生成页面同时存活的代价极高。这里的设计回答是"保留式产物"模型 —— `产物 = 源码 + 持久状态 + 交互树 + 绘制缓存 + 可选的活跃运行时` —— 其中快照仅仅是绘制缓存，文档与交互模型始终可用，从而支持选择、事件路由、激活与版本安全的恢复。',
      },
      {
        en: 'The canvas itself owns camera movement, spatial virtualization, live/snapshot lifecycle, interaction metadata, resource budgets and rendering composition; artifacts contribute HTML, CSS and controlled JavaScript. The package split follows those boundaries — protocol, spatial, core, artifact, security, runtime, renderer, editor — and every package is private and versioned 0.0.0, with none presented as a stable public contract.',
        zh: '画布本身掌管相机移动、空间虚拟化、活跃/快照生命周期、交互元数据、资源预算与渲染合成；产物则提供 HTML、CSS 与受控 JavaScript。包的拆分沿着这些边界展开 —— protocol、spatial、core、artifact、security、runtime、renderer、editor —— 所有包均为 private 且版本为 0.0.0，没有任何一个被视为稳定的公开契约。',
      },
      {
        en: 'Two limits are stated up front: the M0 browser-evidence gates have not been exited, so support for experimental HTML-in-Canvas APIs remains a capability rather than a claim; and no license has been selected, so until the owners add one the contents are not offered under an open-source license.',
        zh: '有两条限制是仓库主动写明的：M0 的浏览器证据门禁尚未通过，因此对实验性 HTML-in-Canvas API 的支持只是"能力"而非"承诺"；以及尚未选择 license，在维护者补充之前，仓库内容不以开源协议提供。',
      },
    ],
    highlights: [
      {
        en: 'Retained artifact model: a snapshot is only a paint cache, so selection and event targeting survive.',
        zh: '保留式产物模型：快照只是绘制缓存，因此选区与事件定位不会丢失。',
      },
      {
        en: 'Canvas owns camera, spatial virtualization, live/snapshot lifecycle, resource budgets and composition.',
        zh: '画布掌管相机、空间虚拟化、活跃/快照生命周期、资源预算与合成。',
      },
      {
        en: 'Package boundaries mirror the design: protocol, spatial, core, artifact, security, runtime, renderer, editor.',
        zh: '包边界与设计一致：protocol、spatial、core、artifact、security、runtime、renderer、editor。',
      },
      {
        en: 'Security is a first-class package — sanitizer, URL policy, quotas and capabilities — not a later hardening pass.',
        zh: '安全是一等公民包 —— sanitizer、URL 策略、配额与能力控制 —— 而不是后期加固。',
      },
      {
        en: 'Documented up front: technical design, delivery plan, security model, compatibility strategy, benchmark protocol and open questions.',
        zh: '前置文档齐备：技术设计、交付计划、安全模型、兼容性策略、基准测试协议与开放问题。',
      },
    ],
    status: 'design',
    languages: ['TypeScript'],
    license: null,
    licenseNote: {
      en: 'No license selected yet — until one is added, the contents are not offered under an open-source license.',
      zh: '尚未选择 license —— 在维护者补充之前，仓库内容不以开源协议提供。',
    },
    repo: 'https://github.com/dopejs/dope-canvas',
    requirements: {
      en: 'Node.js 22.12+ and pnpm 10.33.2.',
      zh: 'Node.js 22.12+ 与 pnpm 10.33.2。',
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
