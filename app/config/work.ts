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
  period: '2026–present',
  contribution:
    'Completed an in-progress multi-tenant CRM and now maintain it across web and mobile — APIs, web interfaces and the React Native application.',
  slug: 'navcrm',
  diagram: 'navcrm-surfaces',
  restricted: 'Professional work · screenshots restricted'
}

export const workNavfarm: WorkEntry = {
  number: '02',
  tag: 'Prudence / Navfarm',
  title: 'NAVFarm',
  descriptor: 'Farm ERP / operations platform',
  meta: 'Nx · Next.js · NestJS · Drizzle · MySQL',
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
  descriptor: 'Public website build',
  meta: 'Contract',
  period: '2025',
  contribution:
    'Built the public site inside an existing WordPress-hosted environment, and cut average load time from around 6.0s to 3.2s through asset optimisation, a CDN, lazy loading and JavaScript work.',
  external: { label: 'Visit site', href: 'https://navfarm.com' },
  // The one real product visual on the site: a capture of the live public page at
  // navfarm.com. Framed (not retouched) so the site's fixed chat and ROI widgets fall
  // outside the crop — no pixel of the page itself is altered.
  image: {
    src: '/images/projects/navfarm-site.png',
    alt: 'The navfarm.com homepage: the navfarm wordmark and navigation above the headline “Digitize Poultry, Dairy, Livestock & Crop Farming – All from One Powerful Platform”, with a “Talk to Expert” button and an illustration of livestock beside a hand holding a phone.',
    width: 1190,
    height: 640
  }
}

export const workZrm: WorkEntry = {
  number: '04',
  tag: 'Personal',
  title: 'ZRM',
  descriptor: 'Metadata-driven CRM',
  meta: 'Nx · Nuxt · Hono · Drizzle',
  period: 'In progress',
  contribution:
    'A CRM where the modules are data rather than code: industry-specific module templates and workflow automation, with the frontend on Cloudflare Pages and the backend on a VPS.',
  slug: 'zrm'
  // No `external` link yet: nothing public to point at. Add one when there is.
}

export const workNotionlite: WorkEntry = {
  number: '05',
  tag: 'Personal',
  title: 'NotionLite',
  descriptor: 'Collaborative Notion-style workspace',
  meta: 'Personal project',
  contribution:
    'Nested pages, block-based editing with drag-and-drop, public and private sharing, block comments and authentication — built to understand how editors actually work.',
  slug: 'notionlite'
  // No `external` link: there is no public NotionLite repository under github.com/nero-047,
  // so there is nothing verified to point at. Add one here the moment there is.
}

export const work: WorkEntry[] = [workNavcrm, workNavfarm, workSecondary, workZrm, workNotionlite]
