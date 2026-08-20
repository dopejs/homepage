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
  /** Filename under public/logos/, when the project ships its own mark. */
  logo?: string;
  /** Variant for the light theme, when the default mark is drawn for dark surfaces. */
  logoLight?: string;
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
    slug: 'kura',
    name: 'Kura',
    logo: 'kura.svg',
    logoLight: 'kura-light.svg',
    status: 'active',
    languages: ['Rust', 'TypeScript'],
    license: 'Apache-2.0',
    repo: 'https://github.com/dopejs/kura',
    homepage: 'https://kura.dopejs.com/',
  },
  {
    slug: 'gozen',
    name: 'GoZen',
    logo: 'gozen.svg',
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
    logo: 'loopforge.svg',
    status: 'early',
    languages: ['Python', 'TypeScript', 'Rust'],
    license: 'Apache-2.0',
    repo: 'https://github.com/dopejs/loopforge',
    // The product is now a desktop application with no published release, so
    // the only way in is a checkout: `dev.sh` builds the sidecars and starts it.
    commands: [
      { command: 'git clone https://github.com/dopejs/loopforge.git && cd loopforge && ./dev.sh', kind: 'dev' },
    ],
  },
  {
    slug: 'pingo',
    name: 'Pingo',
    logo: 'pingo.svg',
    logoLight: 'pingo-light.svg',
    status: 'early',
    languages: ['TypeScript', 'Rust'],
    license: 'Apache-2.0',
    repo: 'https://github.com/dopejs/pingo',
    homepage: 'https://pingo.dopejs.com/',
    hasReleases: true,
    // Contributor-only: this runs the probe from a checkout. Pingo publishes
    // package tarballs on its releases, but no documented consumer install.
    commands: [{ command: 'pnpm install --frozen-lockfile && pnpm m0:check && pnpm probe:dev', kind: 'dev' }],
  },
  {
    slug: 'deckle',
    name: 'Deckle',
    logo: 'deckle.svg',
    status: 'early',
    languages: ['TypeScript'],
    license: 'Apache-2.0',
    repo: 'https://github.com/dopejs/deckle',
    homepage: 'https://deckle.dopejs.com/',
    hasReleases: true,
  },
];

export type ProjectSlug = (typeof projects)[number]['slug'];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
