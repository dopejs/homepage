/** A language-neutral route. The language is resolved on the client. */
export interface SiteRoute {
  readonly path: string;
  readonly kind: 'home' | 'project';
  /** Project slug, for project routes. */
  readonly slug?: string;
}
