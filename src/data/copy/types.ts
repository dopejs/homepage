/** Translated prose for one project, in one locale. */
export interface ProjectCopy {
  /** One-line positioning, shown on the card and under the detail-page title. */
  tagline: string;
  /** Two or three sentences, shown on the card and as the detail-page lead. */
  summary: string;
  /** Detail-page body paragraphs. */
  body: string[];
  /** Concrete capabilities, sourced from the README. */
  highlights: string[];
  /** Labels for `Project.commands`, in the same order. */
  commandLabels?: string[];
  /** Prerequisites for building or running locally. */
  requirements?: string;
  /** Caveat shown next to the license (e.g. no license chosen yet). */
  licenseNote?: string;
}

export type ProjectCopyMap = Record<string, ProjectCopy>;
