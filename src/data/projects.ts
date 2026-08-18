export type ProjectStatus = 'stable' | 'active' | 'early' | 'design';

/**
 * Structural, language-independent metadata for one repository.
 * Translated prose lives in `src/data/copy/<locale>.ts`, keyed by slug.
 */
export interface Project {
  /** Repository name under github.com/dopejs — also the detail-page slug. */
  slug: string;
  name: string;
  status: ProjectStatus;
  languages: string[];
  license: string | null;
  repo: string;
  /** Project homepage, when it has one that is not the repo. */
  homepage?: string;
  /** Whether the repository publishes GitHub releases (drives the sidebar link). */
  hasReleases?: boolean;
  /** Shell commands, shown verbatim in every locale. Labels are translated. */
  commands?: Command[];
}

/**
 * `install` and `run` are things a visitor can paste and use. `dev` commands
 * only work from a checkout of the repository — the project card never shows
 * those, because a card-level command reads as "this is how you get it".
 */
export type CommandKind = 'install' | 'run' | 'dev';

export interface Command {
  command: string;
  kind: CommandKind;
}

export const projects: Project[] = [
  {
    slug: 'dope-agent',
    name: 'DopeAgent',
    status: 'active',
    languages: ['Rust', 'TypeScript'],
    license: null,
    repo: 'https://github.com/dopejs/dope-agent',
  },
  {
    slug: 'dsh-tui',
    name: 'dsh-tui',
    status: 'stable',
    languages: ['TypeScript'],
    license: 'MIT',
    repo: 'https://github.com/dopejs/dsh-tui',
    hasReleases: true,
    commands: [
      { command: 'npm install -g @deepseek-ai/dsh @dopejs/dsh-tui', kind: 'install' },
      { command: 'dtui', kind: 'run' },
      { command: 'dtui --doctor', kind: 'run' },
    ],
  },
  {
    slug: 'gozen',
    name: 'GoZen',
    status: 'stable',
    languages: ['Go'],
    license: 'MIT',
    repo: 'https://github.com/dopejs/GoZen',
    homepage: 'https://gozen.dev/',
    hasReleases: true,
    commands: [
      { command: 'curl -fsSL https://raw.githubusercontent.com/dopejs/gozen/main/install.sh | sh', kind: 'install' },
      { command: 'zen config add provider && zen', kind: 'run' },
    ],
  },
  {
    slug: 'loopforge',
    name: 'Loopforge',
    status: 'early',
    languages: ['Python'],
    license: null,
    repo: 'https://github.com/dopejs/loopforge',
    commands: [
      { command: 'uv tool install git+https://github.com/dopejs/loopforge.git', kind: 'install' },
      { command: 'loopforge setup --host codex', kind: 'run' },
    ],
  },
  {
    slug: 'doper',
    name: 'doper',
    status: 'early',
    languages: ['TypeScript', 'Rust'],
    license: null,
    repo: 'https://github.com/dopejs/doper',
    homepage: 'https://doper.dopejs.com/',
    hasReleases: true,
    // Contributor-only: this runs the probe from a checkout. doper publishes
    // package tarballs on its releases, but no documented consumer install.
    commands: [{ command: 'pnpm install --frozen-lockfile && pnpm m0:check && pnpm probe:dev', kind: 'dev' }],
  },
  {
    slug: 'dope-canvas',
    name: 'dope-canvas',
    status: 'design',
    languages: ['TypeScript'],
    license: null,
    repo: 'https://github.com/dopejs/dope-canvas',
    homepage: 'https://canvas.dopejs.com/',
    hasReleases: true,
  },
];

export type ProjectSlug = (typeof projects)[number]['slug'];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
