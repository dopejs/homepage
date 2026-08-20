import type { ProjectCopyMap } from './types';

/**
 * Source of truth for project prose. Every claim here is traceable to the
 * repository's README; other locales are translations of this file.
 */
export const en: ProjectCopyMap = {
  kura: {
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
    tagline: 'An independent, local game-development agent with a desktop workbench.',
    summary:
      'Loopforge works inside a normal game repository: it turns ideas into playable experiments, gathers technical and human evidence, and helps make explicit keep, kill or refactor decisions. The Agent is the control plane and the desktop Workbench is the interface; the CLI and Skills are internal capabilities rather than things you drive by hand.',
    body: [
      'Opening a project is the whole setup: the Workbench takes a game repository through the native folder picker, then starts or reconnects that project’s Agent and loads a constrained slice of project context — without exposing provider credentials, environment variables or access tokens.',
      'The interface is organised around the project rather than around the Agent process. A project menu switches repositories and project-level views, the header carries project identity and its actions, the work area hosts mode-specific tools, and a floating toolbar moves between exploration, design, build and test. The chat sits beside the work instead of replacing it, because project state and evidence live in the game repository — chat history is not the only record of what happened.',
      'The boundaries are deliberate. `apps/agent` holds the domain Agent and everything a user sees; `cli` holds deterministic project operations and a headless adapter, explicitly not the control plane; `skills` holds versioned capabilities for work that needs judgement; `contracts` holds the versioned schemas. Kura supplies the generic model, session and runtime behaviour and carries no Loopforge state, and the release application embeds the Agent with a pinned Kura sidecar.',
    ],
    highlights: [
      'A desktop Workbench (Tauri + React) as the product surface, with the Agent as its only sidecar.',
      'Projects open from a normal game repository; credentials and environment variables stay out of the project context that is loaded.',
      'Mode toolbar for exploration, design, build and test, with the Agent chat beside the work rather than in place of it.',
      'State and evidence are written into the repository, so the record of what happened does not depend on a chat log.',
      'Deterministic operations and versioned Skills remain available for automation and diagnosis — internal capabilities, not the way in.',
      'Generic model, session and runtime behaviour comes from Kura as a pinned sidecar, keeping domain logic on the Loopforge side of the line.',
    ],
    commandLabels: ['Run the Workbench from a checkout'],
    requirements:
      'Git, Node.js 22 and pnpm, Rust and Cargo, Python 3.11+ with uv; Godot 4 only for the Godot workflow. There is no packaged release yet, so the desktop app is built from a checkout.',
  },

  pingo: {
    tagline: 'A Web Canvas rendering engine designed from scratch.',
    summary:
      'A high-performance TSX runtime with native virtual scrolling, a deterministic Rust/WASM core behind a versioned binary ABI, full text rendering and canvas-native editing. Milestones M0–M3 are complete; M4 brings the editing, event, hit-testing and accessibility chain.',
    body: [
      'Pingo is not yet a rendering engine you can drop into a product, and the repository says so plainly. P0/M0 through M3 are done; M4 — the editing, event, hit-testing and accessibility chain — is the next stage. Technical decisions are settled in `docs/design.md`, and delivery order and exit gates in `docs/plan.md`.',
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
  },

  deckle: {
    tagline: 'An infinite canvas for large collections of AI-generated web artifacts.',
    summary:
      'Hundreds of live iframes do not scale; flattening every page to an image loses selection and event targeting. Deckle keeps artifacts retained — source, durable state, interaction tree, paint cache and an optional live runtime — so Figma-like selection and activation survive. The backend-independent engine contracts are implemented and tested; the browser-evidence gates are not exited yet.',
    body: [
      'Every iframe retains a browsing context, DOM/CSS state, a script realm, resources and rendering state, so keeping hundreds of generated pages alive scales badly. The design answer is a retained artifact model — `artifact = source + durable state + interaction tree + paint cache + optional live runtime` — in which a snapshot is only a paint cache. The document and interaction model stay available for selection, event routing, activation and revision-safe restoration.',
      'Because the artifacts come from agents, they arrive incrementally, and streaming is a first-class property of the node model rather than a wrapper around it. Every content kind commits at its own boundary — a grapheme, a line, a closed markdown construct, a JSON value, a decided HTML tag — and that boundary only moves forward, so a reader never sees an interpretation get retracted.',
      'Implemented and tested today: scene transactions, camera and spatial virtualization, lifecycle and budgets, artifact revisions, sanitization, the controlled runtime protocol, retained rendering and internal hit testing. Not yet: the M0 browser-evidence gates are not exited, support for the experimental HTML-in-Canvas APIs is a capability the probe detects rather than a claim, and absolute performance and memory gates stay unset until measurements exist. Nothing is a stable public contract yet.',
      'The name is the thesis. A deckle is the frame that bounds a sheet of handmade paper while the pulp is still settling, and the ragged edge it leaves is called a deckle edge — a frame around content that has not finished arriving, leaving the boundary visible instead of pretending the sheet is done.',
    ],
    highlights: [
      'Retained artifact model: a snapshot is only a paint cache, so selection and event targeting survive.',
      'Streaming is built into the node model, with per-kind commit boundaries that only move forward — no retracted interpretations.',
      'Engine contracts implemented and tested: scene transactions, camera and spatial virtualization, lifecycle, budgets, revisions, sanitization, runtime protocol, retained rendering, hit testing.',
      'Security is a first-class package — sanitizer, URL policy, quotas and capabilities — not a later hardening pass.',
      'Apache-2.0, chosen for the patent grant: the streaming boundary model and the canvas-native rendering profile are implementation work that benefits from an explicit grant.',
      'Libraries shipped as `@dopejs/canvas-*` through 0.3.0 and are being renamed to `@dopejs/deckle-*` from 0.4.0; only the name changes.',
    ],
    requirements: 'Node.js 22.12+ and pnpm 10.33.2.',
  },
};
