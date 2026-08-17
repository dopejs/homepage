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
  /** Shell commands, shown verbatim in every locale. Labels are translated. */
  commands?: string[];
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
    commands: [
      'pnpm dlx --allow-build=node-pty @deepseek-ai/dsh@0.1.0-rc.6 --profile tui',
      'dsh --profile tui --doctor',
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
    commands: [
      'curl -fsSL https://raw.githubusercontent.com/dopejs/gozen/main/install.sh | sh',
      'zen config add provider && zen',
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
    commands: ['pnpm install --frozen-lockfile && pnpm m0:check && pnpm probe:dev'],
  },
  {
    slug: 'dope-canvas',
    name: 'dope-canvas',
    status: 'design',
    languages: ['TypeScript'],
    license: null,
    repo: 'https://github.com/dopejs/dope-canvas',
    homepage: 'https://canvas.dopejs.com/',
  },
];

export type ProjectSlug = (typeof projects)[number]['slug'];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
