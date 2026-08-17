export type ProjectStatus = 'stable' | 'active' | 'early' | 'design';

export interface Project {
  /** Repository name under github.com/dopejs — also used as the anchor id. */
  slug: string;
  name: string;
  /** Short one-liner shown on the card. */
  tagline: { en: string; zh: string };
  /** Two or three sentences, shown under the tagline. */
  summary: { en: string; zh: string };
  status: ProjectStatus;
  languages: string[];
  license: string | null;
  repo: string;
  /** Project homepage, when it has one that is not the repo. */
  homepage?: string;
  /** Copy-pasteable first command, when the project ships one. */
  install?: string;
}

/**
 * Kept in sync by hand with each repository's README and GitHub metadata.
 * Status wording is deliberately conservative: several of these are
 * pre-release and must not read as production-ready.
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
    status: 'active',
    languages: ['Rust', 'TypeScript'],
    license: null,
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
    status: 'stable',
    languages: ['Rust'],
    license: 'Apache-2.0',
    repo: 'https://github.com/dopejs/dcode',
    install: 'curl -fsSL https://github.com/dopejs/dcode/releases/latest/download/install-dcode.sh | sh',
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
    status: 'stable',
    languages: ['Go'],
    license: 'MIT',
    repo: 'https://github.com/dopejs/GoZen',
    homepage: 'https://gozen.dev/',
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
    status: 'early',
    languages: ['TypeScript', 'Rust'],
    license: null,
    repo: 'https://github.com/dopejs/doper',
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
    status: 'design',
    languages: ['TypeScript'],
    license: null,
    repo: 'https://github.com/dopejs/dope-canvas',
  },
];
