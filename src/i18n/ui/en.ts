/** Canonical string set. Every other locale file must satisfy `UIStrings`. */
export const en = {
  'site.title': 'DopeJs — open source tools for AI-native development',
  'site.description':
    'DopeJs builds open source tools for AI-native development: agent runtimes, terminal coding agents, CLI environment tooling and Canvas rendering engines.',

  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.github': 'GitHub',
  'nav.skip': 'Skip to content',
  'nav.theme': 'Theme',
  'nav.language': 'Language',

  'hero.eyebrow': 'open source · built in the open',
  'hero.title': 'Tools for AI-native development.',
  'hero.body':
    'DopeJs is a small group of open source projects around one question: what does the software you use every day look like when agents are part of the loop? Agent runtimes, terminal coding agents, CLI environment tooling, Canvas rendering engines — all developed in public.',
  'hero.cta.projects': 'Browse projects',
  'hero.cta.github': 'View on GitHub',
  'hero.count': 'projects',

  'projects.title': 'Projects',
  'projects.repo': 'Repository',
  'projects.homepage': 'Homepage',
  'projects.install': 'Install',
  'projects.copy': 'Copy',
  'projects.copied': 'Copied',
  'projects.details': 'Details',

  'status.stable': 'Released',
  'status.active': 'Active development',
  'status.early': 'Early — not production ready',
  'status.design': 'Design phase',

  'project.back': 'All projects',
  'project.overview': 'Overview',
  'project.highlights': 'What it does',
  'project.getStarted': 'Get started',
  'project.requirements': 'Requirements',
  'project.facts': 'At a glance',
  'project.facts.status': 'Status',
  'project.facts.languages': 'Languages',
  'project.facts.license': 'License',
  'project.facts.noLicense': 'None yet',
  'project.links': 'Links',
  'project.issues': 'Issues',
  'project.releases': 'Releases',
  'project.prev': 'Previous',
  'project.next': 'Next',

  'about.title': 'About DopeJs',
  'about.body':
    'Everything here is developed in the open, on GitHub. Issues and pull requests are welcome on any repository — and so are honest reports that something does not work yet. Several of these projects are pre-release by design; where that is the case, the project says so.',
  'about.cta': 'Follow the org on GitHub',

  'footer.built': 'Built with React and Vite. Source on GitHub.',
  'footer.rights': 'DopeJs',
  'footer.translations': 'Translations are machine-generated — corrections are welcome.',
} as const;

export type UIKey = keyof typeof en;
export type UIStrings = Record<UIKey, string>;
