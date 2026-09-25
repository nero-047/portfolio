export const site = {
  name: 'Rishi Gurung',
  /** Public wordmark only — never used as a standalone identity alias. */
  wordmark: 'rishi',
  role: 'Software Engineer',
  company: 'Prudence Consulting',
  url: 'https://rishi.is-a.dev',
  email: 'rishigurung47@gmail.com',
  github: 'https://github.com/nero-047',
  githubHandle: '@nero-047',
  linkedin: 'https://www.linkedin.com/in/rishi-gurung-349218316',
  x: 'https://x.com/047nero',
  xHandle: '@047nero'
} as const

/** Same-page anchor navigation — the public site is currently a single page. */
export const nav: { label: string; href: string; arrow?: boolean }[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Say hello', href: '#contact', arrow: true }
]

export const social = {
  image: '/images/social/f1-75-poster.png',
  alt: 'A Formula 1 car rendered in three-quarter view',
  width: 1600,
  height: 900
} as const

/** Source credit for the hero 3D asset — verified against the live Sketchfab listing. */
export const modelCredit = {
  title: '2022 Ferrari F1-75',
  creator: 'asdasfwefsfwsef',
  sourceUrl: 'https://sketchfab.com/3d-models/2022-ferrari-f1-75-ce53f6bd404c41ceaebb29813e87cfb9',
  licenseName: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
} as const
