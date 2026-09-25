export interface WorkImage {
  src: string
  /** Empty when purely decorative; the caption already states it's illustrative. */
  alt: string
  /** True while this is temporary/generated artwork standing in for a real capture. */
  isPlaceholder: boolean
}

export interface WorkEntry {
  number: string
  /** Small attribution tag shown above the title, e.g. "Prudence". Omit for personal work. */
  tag?: string
  title: string
  descriptor: string
  meta: string
  /** A short, verified scope note. Never an outcome, metric or ownership claim. */
  contribution: string
  image?: WorkImage
  /** Real, verified destination only. Omit rather than link to nothing. */
  href?: string
}

// Verified facts only — no metrics, screenshots, results or outcomes.
export const workFeatured: WorkEntry = {
  number: '01',
  tag: 'Prudence',
  title: 'NavCRM',
  descriptor: 'Multi-tenant CRM platform',
  meta: 'Prudence · 2026',
  contribution: 'Backend, web and React Native. Maintaining and extending an existing product.',
  image: { src: '/images/projects/navcrm-placeholder.svg', alt: '', isPlaceholder: true }
}

export const workPair: WorkEntry[] = [
  {
    number: '02',
    tag: 'Prudence',
    title: 'Navfarm Platform',
    descriptor: 'Farm ERP redevelopment',
    meta: 'Prudence / Navfarm · 2026–present',
    contribution: 'Ongoing redevelopment of the platform.',
    image: { src: '/images/projects/navfarm-platform-placeholder.svg', alt: '', isPlaceholder: true }
  },
  {
    number: '03',
    tag: 'Navfarm',
    title: 'Navfarm.com',
    descriptor: 'Marketing / landing website',
    meta: 'Navfarm · 2025–26',
    contribution: 'Website development and maintenance.',
    image: { src: '/images/projects/navfarm-site-placeholder.svg', alt: '', isPlaceholder: true }
  }
]

export const workCompact: WorkEntry = {
  number: '04',
  title: 'NotionLite',
  descriptor: 'Minimal Notion-inspired workspace',
  meta: 'Personal project',
  contribution: 'A minimal personal implementation.'
}

export const work: WorkEntry[] = [workFeatured, ...workPair, workCompact]
