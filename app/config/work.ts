/**
 * Homepage composition for Selected Work.
 *
 * This file carries layout intent — which project is the flagship, which is a
 * footnote — because that judgement does not belong in Markdown front matter.
 * The long-form writing lives in `content/work/<slug>.md`; `slug` below is the
 * link between the two. Verified facts only: no metrics, outcomes, ownership
 * claims or invented screenshots.
 */

export type DiagramId = 'navcrm-surfaces' | 'navfarm-tenancy'

export interface WorkImage {
  src: string
  /** Describe what is actually shown. Empty only if purely decorative. */
  alt: string
  width: number
  height: number
}

export interface WorkEntry {
  number: string
  /** Attribution tag shown above the title, e.g. "Prudence". Omitted for personal work. */
  tag?: string
  title: string
  descriptor: string
  /** Short technical line — surfaces or stack. Only what is true. */
  meta: string
  period?: string
  /** A verified scope note. Never an outcome, metric or ownership claim. */
  contribution: string
  /** Case study under /work, when one exists. */
  slug?: string
  /** A real public destination, when the work itself is public. */
  external?: { label: string; href: string }
  /** Structural diagram shown instead of product imagery. */
  diagram?: DiagramId
  /** Stated reason there is no product imagery, when that is a deliberate choice. */
  restricted?: string
  /** A real, approved capture. Nothing stands in for one. */
  image?: WorkImage
}

export const workNavcrm: WorkEntry = {
  number: '01',
  tag: 'Prudence',
  title: 'NavCRM',
  descriptor: 'Multi-tenant CRM platform',
  meta: 'Backend · Web · React Native',
  contribution:
    'Maintaining and extending an existing CRM across APIs, web interfaces and mobile applications.',
  slug: 'navcrm',
  diagram: 'navcrm-surfaces',
  restricted: 'Professional work · screenshots restricted'
}

export const workNavfarm: WorkEntry = {
  number: '02',
  tag: 'Prudence / Navfarm',
  title: 'NAVFarm',
  descriptor: 'Farm ERP / operations platform',
  meta: 'NestJS · Next.js · Nx · MySQL',
  period: '2026–present',
  contribution:
    'A multi-tenant platform: each tenant is provisioned with its own isolated data, and companies and operational areas sit beneath it across several lines of business.',
  slug: 'navfarm',
  diagram: 'navfarm-tenancy'
}

export const workSecondary: WorkEntry = {
  number: '03',
  tag: 'Navfarm',
  title: 'Navfarm.com',
  descriptor: 'Website development / maintenance',
  meta: 'Web',
  period: '2025–26',
  contribution: 'Building and maintaining the public site.',
  external: { label: 'Visit site', href: 'https://navfarm.com' }
}

export const workNotionlite: WorkEntry = {
  number: '04',
  title: 'NotionLite',
  descriptor: 'Minimal Notion-inspired workspace',
  meta: 'Personal project',
  contribution: 'A small independent build focused on calm interaction and editor-style UI.',
  slug: 'notionlite'
}

export const work: WorkEntry[] = [workNavcrm, workNavfarm, workSecondary, workNotionlite]
