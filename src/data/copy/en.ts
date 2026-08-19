import type { ProjectCopyMap } from './types';

/**
 * Source of truth for project prose. Every claim here is traceable to the
 * repository's README; other locales are translations of this file.
 */
export const en: ProjectCopyMap = {
  'dope-agent': {
    tagline: 'A personal agent OS — one local daemon, many thin clients.',
    summary:
      'A Rust control plane runs locally and owns the runtime, LLM providers, channel connectors, storage and events. Clients stay thin: a React web UI, a full-screen Rust TUI, chat-channel connectors, and a TypeScript SDK — all speaking the same JSON Schema contracts.',
    body: [
      'The daemon is the product. Everything that has to be correct — session state, provider routing, the tool harness, the event log — lives in one Rust workspace behind a local HTTP API, so a client is never more than a view onto it. The daemon binary is `dope-cli`; the HTTP API is `dope-api`.',
      'Cross-language contracts live in `schemas/` as JSON Schema and are the source of truth for the API, events and config — the Rust daemon and the TypeScript clients are generated against the same definitions rather than kept in sync by convention.',
      'A stated working assumption is that long-lived agent state must be observable, replayable and safe to evolve; context engineering, memory, planning, handoff and policy are being redesigned rather than lightly patched.',
    ],
    highlights: [
      'Rust control plane: runtime, LLM providers, channels/connectors, store, events, HTTP API and harness in one workspace.',
      'Three surfaces over one daemon: React 19 + Vite web UI, full-screen Rust TUI (`dope-tui`), and chat-channel connectors.',
      'TypeScript client SDK (`@dope/client`) generated against the shared JSON Schema contracts.',
      'Separate test and prod environments — `~/.dope-test` on port 19192 versus `~/.dope` on 19191, with live connectors disabled by default in test.',
      'The earlier Go daemon was fully replaced by the Rust workspace; the migration is recorded in `crates/MIGRATION.md`.',
    ],
    licenseNote: 'No license file in the repository yet.',
  },

  gozen: {
    tagline: 'Multi-CLI environment switcher with API proxy auto-failover.',
    summary:
      'Switch environments across Claude Code, Codex and OpenCode from one place, and keep working when an upstream provider degrades — GoZen proxies API traffic and fails over automatically.',
    body: [
      'All API configuration lives in `~/.zen/zen.json`, and a single `zend` daemon hosts both the proxy server and a password-protected web UI. Directories can be bound to a specific profile and CLI, so `zen` in a project folder launches the right client against the right provider without flags.',
      'The proxy is the reason to run it: requests are routed by characteristics such as thinking, image and long-context, and fall over to backup providers when the primary is unavailable. Version 3 adds token/cost tracking per provider, model and project, budget limits with warn/downgrade/block actions, provider health checks, several load-balancing strategies, and webhook notifications.',
      'Config can be synced across devices through WebDAV, S3, a GitHub Gist or a GitHub repository, encrypted with AES-256-GCM. Web UI tokens are transported with RSA encryption behind session-based auth.',
    ],
    highlights: [
      'One switcher for Claude Code, Codex and OpenCode, configurable per project through directory bindings.',
      'Built-in HTTP proxy with automatic failover to backup providers, plus scenario routing (thinking, image, long context).',
      'Usage and cost tracking per provider, model and project, with daily/weekly/monthly budget limits.',
      'Provider health monitoring with latency and error-rate tracking; failover, round-robin, least-latency and least-cost balancing.',
      'Encrypted config sync over WebDAV, S3, GitHub Gist or GitHub repo (AES-256-GCM).',
      'Bot gateway to monitor and control Claude Code sessions from Telegram, Discord, Slack, Lark or Messenger.',
      'Self-update via `zen upgrade`, plus zsh / bash / fish completion.',
    ],
    commandLabels: ['Install', 'First run'],
  },

  loopforge: {
    tagline: 'A game-development toolkit made of Agent Skills and a deterministic CLI.',
    summary:
      'Loopforge helps an existing coding agent turn a game idea into tested, evidence-backed playable builds without hiding project state inside a chat. Creative judgment stays in the skills and in human review; state transitions, validation, evidence and recovery stay in the CLI. The project is in early implementation.',
    body: [
      'The split is the point. Skills hold creative judgment and human review; the CLI owns state transitions, validation, evidence and recovery. Rather than building a proprietary agent runtime, Loopforge drives coding agents you already run: `loopforge setup --host codex` installs the official skills into the Codex skills directory, and `$loopforge-router` reads durable project state to route the next action to gameplay prototyping, Godot implementation, game design or art production.',
      'Project state is durable and inspectable instead of living in a chat log: hash-chained events, locking, reconciliation, read-only diagnostics, artifact integrity validation, registered evidence, hypothesis records and guarded stage advancement. `status` also derives scoped quality claims and marks them stale when the source identity changes, so a claim cannot outlive the thing it was made about.',
      'The repository is explicit about what is not done. This is early implementation: validation against a real Godot installation and production-stage release skills are not implemented yet. The package is not published to PyPI either — `uv tool install loopforge` does not refer to this project — so install from the Git URL and pin a reviewed tag or commit for reproducible environments.',
    ],
    highlights: [
      'Agent Skills plus a deterministic Python CLI: creative judgment in the skills, state transitions and validation in the CLI.',
      'Hash-chained event state with locking, reconciliation and recovery, so project history is auditable rather than conversational.',
      'Evidence-first workflow: registered evidence, hypothesis records, artifact integrity validation and guarded stage advancement.',
      'Scoped quality claims that go stale automatically when the identity of their source changes.',
      'Godot 4 build/test adapter, playtest import, and atomic keep, kill or refactor decisions on prototypes.',
      'Drives coding agents you already use instead of shipping a proprietary agent runtime.',
    ],
    commandLabels: ['Install the CLI', 'Install the skills into Codex'],
    requirements:
      'Python 3.11+, uv and Git; Godot 4 only for the Godot build workflow. Not published to PyPI — install from the Git URL.',
    licenseNote: 'No license file in the repository yet.',
  },

  doper: {
    tagline: 'A Web Canvas rendering engine designed from scratch.',
    summary:
      'A high-performance TSX runtime with native virtual scrolling, a deterministic Rust/WASM core behind a versioned binary ABI, full text rendering and canvas-native editing. Milestones M0–M3 are complete; M4 brings the editing, event, hit-testing and accessibility chain.',
    body: [
      'doper is not yet a rendering engine you can drop into a product, and the repository says so plainly. P0/M0 through M3 are done; M4 — the editing, event, hit-testing and accessibility chain — is the next stage. Technical decisions are settled in `docs/design.md`, and delivery order and exit gates in `docs/plan.md`.',
      'What runs today is `apps/platform-probe`: a measurement slice rather than a demo. It records worker rAF frame intervals, main-thread-to-worker latency through SharedArrayBuffer, worker self-drive while the main thread blocks for 200 ms, Canvas2D and scroll-copy throughput, WASM size and load cost, and the Canvas editing input path — EditContext first, with a centralized textarea proxy as fallback — including recorded IME sessions replayed for determinism.',
      'The probe proves the local environment is viable — the dev server sends COOP/COEP headers for cross-origin isolation — not that a production deployment meets those conditions. Real-device performance and real IME behaviour are treated as a separate platform qualification: until a platform is qualified with `pnpm platform:qualify`, the project does not claim its numbers.',
    ],
    highlights: [
      'High-performance TSX runtime with virtual scrolling as a first-class primitive, not a userland add-on.',
      'Deterministic Rust/WASM core behind a versioned binary ABI.',
      'Canvas-native text editing: EditContext-first input with a centralized textarea proxy fallback, and deterministic IME record/replay.',
      'Platform qualification is explicitly separate from milestone completion — unqualified platforms make no performance claims.',
    ],
    commandLabels: ['Run the probe from a checkout of the repository'],
    requirements: 'Node.js 22.12+, pnpm 10.33.2, Rust 1.96.0 with the wasm32-unknown-unknown target.',
    licenseNote: 'No license file in the repository yet.',
  },

  'dope-canvas': {
    tagline: 'An infinite canvas for large collections of AI-generated web artifacts.',
    summary:
      'Hundreds of live iframes do not scale; flattening every page to an image loses selection and event targeting. dope-canvas keeps artifacts retained — source, durable state, interaction tree, paint cache and an optional live runtime — so Figma-like selection and activation survive. The repository is at its pre-development baseline: architecture, delivery plan and security model, not yet a working canvas.',
    body: [
      'Every iframe retains a browsing context, DOM/CSS state, a script realm, resources and rendering state, so keeping hundreds of generated pages alive scales badly. The design answer here is a retained artifact model — `artifact = source + durable state + interaction tree + paint cache + optional live runtime` — in which a snapshot is only a paint cache. The document and interaction model stay available for selection, event routing, activation and revision-safe restoration.',
      'The canvas itself owns camera movement, spatial virtualization, live/snapshot lifecycle, interaction metadata, resource budgets and rendering composition; artifacts contribute HTML, CSS and controlled JavaScript. The package split follows those boundaries — protocol, spatial, core, artifact, security, runtime, renderer, editor — and every package is private and versioned 0.0.0, with none presented as a stable public contract.',
      'Two limits are stated up front: the M0 browser-evidence gates have not been exited, so support for experimental HTML-in-Canvas APIs remains a capability rather than a claim; and no license has been selected, so until the owners add one the contents are not offered under an open-source license.',
    ],
    highlights: [
      'Retained artifact model: a snapshot is only a paint cache, so selection and event targeting survive.',
      'Canvas owns camera, spatial virtualization, live/snapshot lifecycle, resource budgets and composition.',
      'Package boundaries mirror the design: protocol, spatial, core, artifact, security, runtime, renderer, editor.',
      'Security is a first-class package — sanitizer, URL policy, quotas and capabilities — not a later hardening pass.',
      'Documented up front: technical design, delivery plan, security model, compatibility strategy, benchmark protocol and open questions.',
    ],
    requirements: 'Node.js 22.12+ and pnpm 10.33.2.',
    licenseNote:
      'No license selected yet — until one is added, the contents are not offered under an open-source license.',
  },
};
