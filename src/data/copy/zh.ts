import type { ProjectCopyMap } from './types';

export const zh: ProjectCopyMap = {
  kura: {
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

  loopforge: {
    tagline: '由 Agent Skills 与确定性 CLI 组成的游戏开发工具包。',
    summary:
      'Loopforge 让你已有的编码 Agent 把游戏创意变成经过测试、有证据支撑的可玩构建，而不是把项目状态藏在聊天记录里。创意判断留在 skills 与人工评审中；状态迁移、校验、证据与恢复则由 CLI 掌管。项目目前处于早期实现阶段。',
    body: [
      '这种拆分正是要点所在。Skills 承载创意判断与人工评审，CLI 掌管状态迁移、校验、证据与恢复。Loopforge 不自建专有 Agent 运行时，而是驱动你已经在用的编码 Agent：`loopforge setup --host codex` 把官方 skills 安装到 Codex 的 skills 目录，`$loopforge-router` 读取持久化的项目状态，把下一步动作路由到玩法原型、Godot 实现、游戏设计或美术生产。',
      '项目状态是持久且可检视的，而不是散落在对话里：哈希链事件、加锁、对账、只读诊断、产物完整性校验、已登记的证据、假设记录，以及带门禁的阶段推进。`status` 还会推导出有作用域的质量结论，并在来源标识发生变化时把它标记为过期 —— 结论不能比它所描述的对象活得更久。',
      '仓库对"还没做什么"写得很直接：当前是早期实现，针对真实 Godot 安装的验证与生产阶段的发布 skills 尚未实现；包也没有发布到 PyPI —— `uv tool install loopforge` 指向的并不是本项目 —— 因此请从 Git URL 安装，并在需要可复现环境时锁定经过评审的 tag 或 commit。',
    ],
    highlights: [
      'Agent Skills 加确定性 Python CLI：创意判断在 skills，状态迁移与校验在 CLI。',
      '哈希链事件状态，配合加锁、对账与恢复，项目历史可审计，而不是靠聊天回溯。',
      '以证据为先的流程：证据登记、假设记录、产物完整性校验与带门禁的阶段推进。',
      '带作用域的质量结论，在来源标识变化时自动失效。',
      'Godot 4 构建/测试适配器、playtest 导入，以及对原型的保留、废弃或重构的原子决策。',
      '驱动你已经在用的编码 Agent，而不是另造一套专有 Agent 运行时。',
    ],
    commandLabels: ['安装 CLI', '把 skills 安装到 Codex'],
    requirements:
      'Python 3.11+、uv 与 Git；仅在使用 Godot 构建流程时需要 Godot 4。未发布到 PyPI —— 请从 Git URL 安装。',
    licenseNote: '仓库尚未添加 license 文件。',
  },

  pingo: {
    tagline: '从零设计的 Web Canvas 渲染引擎。',
    summary:
      '高性能 TSX 运行时，原生虚拟滚动，确定性 Rust/WASM Core 与版本化二进制 ABI，完整文本渲染与 Canvas 原生编辑能力。M0–M3 里程碑已完成，M4 将补齐编辑、事件、命中与无障碍主链。',
    body: [
      'Pingo 目前还不是可以直接接入业务的渲染引擎，仓库本身也是这么写的。P0/M0 至 M3 已完成，下一阶段是 M4 —— 编辑、事件、命中与无障碍主链。技术决策以 `docs/design.md` 为准，交付顺序与出口门禁见 `docs/plan.md`。',
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

  deckle: {
    tagline: '面向海量 AI 生成 Web 产物的无限画布运行时。',
    summary:
      '几百个活跃 iframe 无法规模化，而把页面全部拍平成图片又会丢失选区与事件定位。Deckle 以"保留式产物"建模 —— 源码、持久状态、交互树、绘制缓存与可选的活跃运行时 —— 让 Figma 式的选择与激活得以保留。与后端无关的引擎契约已实现并有测试覆盖；浏览器证据门禁尚未通过。',
    body: [
      '每个 iframe 都保留着浏览上下文、DOM/CSS 状态、脚本 realm、资源与渲染状态，因此让几百个生成页面同时存活的代价极高。设计上的回答是"保留式产物"模型 —— `产物 = 源码 + 持久状态 + 交互树 + 绘制缓存 + 可选的活跃运行时` —— 其中快照仅仅是绘制缓存，文档与交互模型始终可用，从而支持选择、事件路由、激活与版本安全的恢复。',
      '由于产物来自 Agent，它们是逐步到达的，因此流式不是包在节点模型外面的一层，而是模型自身的一等属性。每种内容都在自己的边界处提交 —— 一个字素、一行、一个闭合的 Markdown 结构、一个 JSON 值、一个已确定的 HTML 标签 —— 且该边界只前进不后退，读者永远不会看到某个解释被撤回。',
      '目前已实现并有测试的部分：场景事务、相机与空间虚拟化、生命周期与预算、产物版本、内容净化、受控运行时协议、保留式渲染与内部命中测试。尚未完成的部分：M0 的浏览器证据门禁未通过，对实验性 HTML-in-Canvas API 的支持是探针检测出的"能力"而非承诺，绝对性能与内存门限在有实测数据前保持未设定。目前还没有任何接口构成稳定的公开契约。',
      '这个名字本身就是论点。deckle 是手工造纸时框住纸浆的定型框，纸浆尚未沉定，它留下的毛边就叫 deckle edge —— 为尚未到齐的内容框定边界，并让这条边界可见，而不是假装这张纸已经完成。',
    ],
    highlights: [
      '保留式产物模型：快照只是绘制缓存，因此选区与事件定位不会丢失。',
      '流式内建于节点模型，各类内容各有只进不退的提交边界 —— 不存在被撤回的解释。',
      '引擎契约已实现并有测试：场景事务、相机与空间虚拟化、生命周期、预算、版本、净化、运行时协议、保留式渲染、命中测试。',
      '安全是一等公民包 —— sanitizer、URL 策略、配额与能力控制 —— 而不是后期加固。',
      '采用 Apache-2.0，看重的是专利授权：流式边界模型与 Canvas 原生渲染剖面属于需要显式授权的实现性工作。',
      '库在 0.3.0 之前以 `@dopejs/canvas-*` 发布，自 0.4.0 起改名为 `@dopejs/deckle-*`，仅改名字，代码不变。',
    ],
    requirements: 'Node.js 22.12+ 与 pnpm 10.33.2。',
  },
};
