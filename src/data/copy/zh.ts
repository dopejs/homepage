import type { ProjectCopyMap } from './types';

export const zh: ProjectCopyMap = {
  'dope-agent': {
    tagline: '个人 Agent 操作系统 —— 一个本地守护进程，多个轻客户端。',
    summary:
      'Rust 控制平面在本地运行，掌管运行时、LLM 提供方、渠道连接器、存储与事件。客户端保持轻量：React Web UI、全屏 Rust TUI、聊天渠道连接器和 TypeScript SDK —— 全部基于同一套 JSON Schema 契约。',
    body: [
      '守护进程才是产品本体。所有必须保证正确的部分 —— 会话状态、提供方路由、工具 harness、事件日志 —— 都收敛在一个 Rust workspace 里，通过本地 HTTP API 暴露；客户端不过是它的一个视图。守护进程二进制为 `dope-cli`，HTTP API 为 `dope-api`。',
      '跨语言契约以 JSON Schema 形式存放在 `schemas/`，是 API、事件与配置的唯一事实来源 —— Rust 守护进程与 TypeScript 客户端基于同一份定义生成，而不是靠约定手工对齐。',
      '项目明确的工作假设是：长生命周期的 Agent 状态必须可观测、可重放、可安全演进；上下文工程、记忆、规划、交接与策略是重新设计，而非小修小补。',
    ],
    highlights: [
      'Rust 控制平面：运行时、LLM 提供方、渠道连接器、存储、事件、HTTP API 与 harness 收敛在一个 workspace。',
      '同一守护进程之上的三种界面：React 19 + Vite Web UI、全屏 Rust TUI（`dope-tui`）、聊天渠道连接器。',
      'TypeScript 客户端 SDK（`@dope/client`），基于共享的 JSON Schema 契约生成。',
      '测试与生产环境隔离 —— `~/.dope-test` 使用 19192 端口，`~/.dope` 使用 19191；测试环境默认关闭真实连接器。',
      '早期的 Go 守护进程已被 Rust workspace 完全替代，迁移过程记录在 `crates/MIGRATION.md`。',
    ],
    licenseNote: '仓库尚未添加 license 文件。',
  },

  'dsh-tui': {
    tagline: '为 DeepSeek Harness 打造的插件原生终端界面。',
    summary:
      'dsh-tui 以 out-of-tree 的 Harness bundle 形式分发，与 Agent 运行时运行在同一进程内。它通过 `ctx.agents` 创建与恢复 Agent，不依赖 Web 客户端代码即可渲染持久化的 session/event 日志，并为审批、提问与命令提供终端适配层。0.1.0 是首个正式发布版本。',
    body: [
      '它是 Harness 插件，而不是独立客户端：与 Agent 运行时同进程运行。同进程架构是刻意的选择 —— 远程传输被留作后续可能的适配器与产品形态，而不是混进第一版实现里。',
      '0.1.0 精确锁定 `0.1.0-rc.6` 的 Harness 依赖，因此不对 Harness 各 RC 版本之间的兼容性做任何承诺。会话要能真正工作，必须先具备供应商凭据（如 `DEEPSEEK_API_KEY`）；`dsh --profile tui --doctor` 会以只读方式检查服务、模型选择器、会话持久化与终端能力，不启动任何会话或 Agent。',
      '终端体验才是这个项目的实质：多行编辑器支持 Unicode 光标移动、选区、撤销/重做、有界历史与 bracketed paste；转录区跟随输出直到导航将其脱离，并提供有界搜索；Ctrl-P 的模糊命令面板把该 Agent 的 Harness 命令与 TUI 导航合并在一起；Ctrl-O 的会话中心仅在 Agent 空闲且编辑器为空时才允许切换，并会先完整冲刷并释放旧的连接。',
    ],
    highlights: [
      '同进程 Harness 插件：通过 `ctx.agents` 创建与恢复 Agent，不依赖 Web 客户端代码渲染持久化的 session/event 日志。',
      '终端、diff、搜索、读取与 Web 结果均采用工具自有的呈现意图（presentation intents）。',
      '多行编辑器：Unicode 光标移动、选区、撤销/重做、有界历史与 bracketed paste。',
      'Ctrl-P 命令面板融合 Harness 命令与 TUI 导航，即使终端无法发出组合键，所有面板依然可达。',
      '无障碍是内建能力：`default`、`high-contrast`、`no-color` 三套主题，面板以语义色调而非颜色命名，屏幕阅读器模式去除画框字符，减弱动效与按键重绑定统一收在一份经校验的偏好文档中。',
      '每一个取得的 Agent 句柄、监听器、提示与终端模式都被视为显式持有的资源。',
    ],
    commandLabels: ['运行 TUI', '只读环境自检'],
    requirements:
      'Node.js ^22.19.0 || >=24.0.0、pnpm 11.7.0，以及供应商凭据（如 DEEPSEEK_API_KEY）。以 Harness 插件方式安装该 bundle 的步骤见仓库 README。',
  },

  gozen: {
    tagline: '多 CLI 环境切换器，内置 API 代理自动故障转移。',
    summary:
      '在一处切换 Claude Code、Codex、OpenCode 的运行环境；上游供应商抖动时也不中断 —— GoZen 代理 API 流量并自动切换到可用线路。',
    body: [
      '所有 API 配置集中在 `~/.zen/zen.json`，单个 `zend` 守护进程同时承载代理服务与带密码保护的 Web UI。目录可以绑定到指定 profile 与 CLI，在项目目录里直接敲 `zen` 就会用正确的客户端连上正确的供应商，无需附加参数。',
      '真正的价值在代理层：请求按 thinking、image、longContext 等特征路由，主线路不可用时自动切到备用供应商。v3 增加了按供应商 / 模型 / 项目维度的 token 与成本统计、带告警/降级/阻断动作的预算控制、供应商健康检查、多种负载均衡策略以及 Webhook 通知。',
      '配置可通过 WebDAV、S3、GitHub Gist 或 GitHub 仓库在多设备间同步，使用 AES-256-GCM 加密。Web UI 采用会话认证，令牌传输使用 RSA 加密。',
    ],
    highlights: [
      '一个切换器覆盖 Claude Code、Codex、OpenCode，可通过目录绑定按项目配置。',
      '内置 HTTP 代理，主线路故障时自动切换备用供应商，并支持场景化路由（thinking、image、长上下文）。',
      '按供应商、模型、项目统计用量与成本，支持日 / 周 / 月预算限额。',
      '供应商健康监控（延迟与错误率），支持故障转移、轮询、最低延迟、最低成本等均衡策略。',
      '通过 WebDAV、S3、GitHub Gist 或 GitHub 仓库同步配置，使用 AES-256-GCM 加密。',
      'Bot 网关：可从 Telegram、Discord、Slack、飞书或 Messenger 监控与控制 Claude Code 会话。',
      '`zen upgrade` 自更新，并提供 zsh / bash / fish 补全。',
    ],
    commandLabels: ['安装', '首次运行'],
  },

  doper: {
    tagline: '从零设计的 Web Canvas 渲染引擎。',
    summary:
      '高性能 TSX 运行时，原生虚拟滚动，确定性 Rust/WASM Core 与版本化二进制 ABI，完整文本渲染与 Canvas 原生编辑能力。M0–M3 里程碑已完成，M4 将补齐编辑、事件、命中与无障碍主链。',
    body: [
      'doper 目前还不是可以直接接入业务的渲染引擎，仓库本身也是这么写的。P0/M0 至 M3 已完成，下一阶段是 M4 —— 编辑、事件、命中与无障碍主链。技术决策以 `docs/design.md` 为准，交付顺序与出口门禁见 `docs/plan.md`。',
      '当前真正可运行的是 `apps/platform-probe`：一条用于度量而非演示的切片。它采集 Worker rAF 帧间隔、主线程经 SharedArrayBuffer 到 Worker 的延迟、主线程阻塞 200ms 时 Worker 的自驱情况、Canvas2D 与 scroll-copy 吞吐、WASM 体积与加载开销，以及 Canvas 编辑输入路径（EditContext 优先，集中式 textarea proxy 降级），并含可确定性回放的 IME 录制。',
      '探针只证明本地环境可用（开发服务器会发送 COOP/COEP 响应头以启用跨源隔离），不代表业务部署已满足这些条件。真机性能与真实输入法行为属于独立的平台资格认证：在通过 `pnpm platform:qualify` 认证之前，项目不对外宣称对应指标。',
    ],
    highlights: [
      '高性能 TSX 运行时，虚拟滚动是一等原语，而非上层附加实现。',
      '确定性 Rust/WASM Core，通过版本化二进制 ABI 暴露。',
      'Canvas 原生文本编辑：EditContext 优先、集中式 textarea proxy 降级，并支持确定性的 IME 录制与回放。',
      '平台资格认证与里程碑完成明确解耦 —— 未认证的平台不做性能宣称。',
    ],
    commandLabels: ['从仓库源码运行平台探针'],
    requirements: 'Node.js 22.12+、pnpm 10.33.2、Rust 1.96.0，并安装 wasm32-unknown-unknown target。',
    licenseNote: '仓库尚未添加 license 文件。',
  },

  'dope-canvas': {
    tagline: '面向海量 AI 生成 Web 产物的无限画布运行时。',
    summary:
      '几百个活跃 iframe 无法规模化，而把页面全部拍平成图片又会丢失选区与事件定位。dope-canvas 以"保留式产物"建模 —— 源码、持久状态、交互树、绘制缓存与可选的活跃运行时 —— 让 Figma 式的选择与激活得以保留。仓库当前处于开发前基线：只有架构、交付计划与安全模型，尚无可运行的画布。',
    body: [
      '每个 iframe 都保留着浏览上下文、DOM/CSS 状态、脚本 realm、资源与渲染状态，因此让几百个生成页面同时存活的代价极高。这里的设计回答是"保留式产物"模型 —— `产物 = 源码 + 持久状态 + 交互树 + 绘制缓存 + 可选的活跃运行时` —— 其中快照仅仅是绘制缓存，文档与交互模型始终可用，从而支持选择、事件路由、激活与版本安全的恢复。',
      '画布本身掌管相机移动、空间虚拟化、活跃/快照生命周期、交互元数据、资源预算与渲染合成；产物则提供 HTML、CSS 与受控 JavaScript。包的拆分沿着这些边界展开 —— protocol、spatial、core、artifact、security、runtime、renderer、editor —— 所有包均为 private 且版本为 0.0.0，没有任何一个被视为稳定的公开契约。',
      '有两条限制是仓库主动写明的：M0 的浏览器证据门禁尚未通过，因此对实验性 HTML-in-Canvas API 的支持只是"能力"而非"承诺"；以及尚未选择 license，在维护者补充之前，仓库内容不以开源协议提供。',
    ],
    highlights: [
      '保留式产物模型：快照只是绘制缓存，因此选区与事件定位不会丢失。',
      '画布掌管相机、空间虚拟化、活跃/快照生命周期、资源预算与合成。',
      '包边界与设计一致：protocol、spatial、core、artifact、security、runtime、renderer、editor。',
      '安全是一等公民包 —— sanitizer、URL 策略、配额与能力控制 —— 而不是后期加固。',
      '前置文档齐备：技术设计、交付计划、安全模型、兼容性策略、基准测试协议与开放问题。',
    ],
    requirements: 'Node.js 22.12+ 与 pnpm 10.33.2。',
    licenseNote: '尚未选择 license —— 在维护者补充之前，仓库内容不以开源协议提供。',
  },
};
