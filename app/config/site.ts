import siteJson from './site.json'

/**
 * Production origin. Declared once in site.json because two consumers need it:
 * this module (canonical URLs, Open Graph, JSON-LD, footer) and the Node build
 * script (sitemap, robots). Never hardcode the origin anywhere else.
 */
export const origin = siteJson.origin

export const site = {
  name: 'Rishi Gurung',
  /** Internet identity / wordmark. The professional name above is never replaced by it. */
  wordmark: 'nero',
  handle: 'nero',
  role: 'Software Engineer',
  company: 'Prudence Consulting',
  url: origin,
  email: 'rishigurung47@gmail.com',
  github: 'https://github.com/nero-047',
  githubHandle: '@nero-047',
  linkedin: 'https://www.linkedin.com/in/rishi-gurung-349218316',
  x: 'https://x.com/047nero',
  xHandle: '@047nero'
} as const

/**
 * Primary navigation. Anchors point at homepage sections; paths are real routes.
 * Nothing is listed here until its destination exists — no dead links.
 */
export const nav: { label: string; href: string; arrow?: boolean }[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/#about' },
  { label: 'Lab', href: '/lab' },
  { label: 'Résumé', href: '/resume' },
  { label: 'Say hello', href: '/#contact', arrow: true }
]

/** Open Graph / Twitter card. 1200×630 composition built from the real F1-75 poster. */
export const social = {
  image: '/images/social/card.png',
  alt: 'nero. — Rishi Gurung, software engineer. A Ferrari F1-75 rendered in three-quarter view on a warm paper background.',
  width: 1200,
  height: 630
} as const

/** Source credit for the hero 3D asset — verified against the live Sketchfab listing. */
export const modelCredit = {
  title: '2022 Ferrari F1-75',
  creator: 'asdasfwefsfwsef',
  sourceUrl: 'https://sketchfab.com/3d-models/2022-ferrari-f1-75-ce53f6bd404c41ceaebb29813e87cfb9',
  licenseName: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
} as const
