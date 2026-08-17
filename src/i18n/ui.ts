export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.title': 'dopejs — open source tools for AI-native development',
    'site.description':
      'dopejs builds open source tools for AI-native development: agent runtimes, terminal coding agents, CLI environment tooling and Canvas rendering engines.',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.github': 'GitHub',
    'nav.skip': 'Skip to content',

    'hero.eyebrow': 'open source · built in the open',
    'hero.title': 'Tools for AI-native development.',
    'hero.body':
      'dopejs is a small group of open source projects around one question: what does the software you use every day look like when agents are part of the loop? Agent runtimes, terminal coding agents, CLI environment tooling, Canvas rendering engines — all developed in public.',
    'hero.cta.projects': 'Browse projects',
    'hero.cta.github': 'View on GitHub',
    'hero.count': 'projects',

    'projects.title': 'Projects',
    'projects.lead':
      'Five repositories, at honestly different stages of maturity. Status labels below are not marketing — they say what you can actually rely on today. Licensing differs too; each project page states its own.',
    'projects.repo': 'Repository',
    'projects.homepage': 'Homepage',
    'projects.install': 'Install',
    'projects.copy': 'Copy',
    'projects.copied': 'Copied',
    'projects.details': 'Details',

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

    'status.stable': 'Released',
    'status.active': 'Active development',
    'status.early': 'Early — not production ready',
    'status.design': 'Design phase',

    'about.title': 'About dopejs',
    'about.body':
      'Everything here is developed in the open, on GitHub. Issues and pull requests are welcome on any repository — and so are honest reports that something does not work yet. Several of these projects are pre-release by design; where that is the case, the project says so.',
    'about.cta': 'Follow the org on GitHub',

    'footer.built': 'Built with Astro. Source on GitHub.',
    'footer.rights': 'dopejs',
  },
  zh: {
    'site.title': 'dopejs —— 面向 AI 原生开发的开源工具',
    'site.description':
      'dopejs 构建面向 AI 原生开发的开源工具：Agent 运行时、终端编码 Agent、CLI 环境工具与 Canvas 渲染引擎。',
    'nav.projects': '项目',
    'nav.about': '关于',
    'nav.github': 'GitHub',
    'nav.skip': '跳到正文',

    'hero.eyebrow': '开源 · 公开开发',
    'hero.title': '面向 AI 原生开发的工具。',
    'hero.body':
      'dopejs 是一组围绕同一个问题展开的开源项目：当 Agent 成为开发闭环的一部分，你每天使用的软件应该长什么样？Agent 运行时、终端编码 Agent、CLI 环境工具、Canvas 渲染引擎 —— 全部公开开发。',
    'hero.cta.projects': '查看项目',
    'hero.cta.github': '在 GitHub 上查看',
    'hero.count': '个项目',

    'projects.title': '项目',
    'projects.lead':
      '五个仓库，成熟度确实各不相同。下面的状态标签不是宣传语，它说明的是今天你真正可以依赖到什么程度。许可证同样不统一，各项目页面均有明确标注。',
    'projects.repo': '仓库',
    'projects.homepage': '官网',
    'projects.install': '安装',
    'projects.copy': '复制',
    'projects.copied': '已复制',
    'projects.details': '详情',

    'project.back': '全部项目',
    'project.overview': '概览',
    'project.highlights': '它做了什么',
    'project.getStarted': '开始使用',
    'project.requirements': '环境要求',
    'project.facts': '基本信息',
    'project.facts.status': '状态',
    'project.facts.languages': '语言',
    'project.facts.license': '许可证',
    'project.facts.noLicense': '暂无',
    'project.links': '链接',
    'project.issues': 'Issues',
    'project.releases': 'Releases',
    'project.prev': '上一个',
    'project.next': '下一个',

    'status.stable': '已发布',
    'status.active': '活跃开发中',
    'status.early': '早期 —— 尚不可用于生产',
    'status.design': '设计阶段',

    'about.title': '关于 dopejs',
    'about.body':
      '所有项目都在 GitHub 上公开开发。欢迎在任意仓库提交 Issue 与 Pull Request —— 也欢迎如实反馈"这个还不能用"。其中若干项目按设计就处于预发布阶段，项目页面会明确说明。',
    'about.cta': '在 GitHub 上关注该组织',

    'footer.built': '由 Astro 构建，源码在 GitHub。',
    'footer.rights': 'dopejs',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
