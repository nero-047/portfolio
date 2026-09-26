import { site, social } from '~/config/site'

interface PageSeo {
  title: string
  description: string
  path: string
  type?: 'website' | 'article' | 'profile'
  /** Suffix the site name (default true). Home passes false. */
  suffix?: boolean
  published?: string
  modified?: string
  /** Extra JSON-LD objects (already without @context). */
  jsonLd?: Record<string, unknown>[]
}

const abs = (path: string) => site.url + (path === '/' ? '/' : path.replace(/\/$/, ''))
const ld = (obj: unknown) => JSON.stringify(obj).replace(/</g, '\\u003c')

export function usePageSeo({ title, description, path, type = 'website', suffix = true, published, modified, jsonLd }: PageSeo) {
  const fullTitle = suffix ? `${title} — ${site.name}` : title
  const url = abs(path)
  const image = site.url + social.image
  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: url,
    ogType: type,
    ogSiteName: site.name,
    ogLocale: 'en_US',
    ogImage: image,
    ogImageWidth: String(social.width),
    ogImageHeight: String(social.height),
    ogImageAlt: social.alt,
    ogImageType: 'image/png',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: social.alt,
    ...(type === 'article' && published ? { articlePublishedTime: published } : {}),
    ...(type === 'article' && modified ? { articleModifiedTime: modified } : {})
  })
  const scripts = (jsonLd ?? []).map((o) => ({ type: 'application/ld+json', innerHTML: ld({ '@context': 'https://schema.org', ...o }) }))
  useHead({ link: [{ rel: 'canonical', href: url }], script: scripts as never })
}

export const personLd = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  jobTitle: site.role,
  worksFor: { '@type': 'Organization', name: site.company },
  sameAs: [site.github, site.linkedin, site.x]
}

export const websiteLd = {
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  author: { '@id': `${site.url}/#person` }
}

export function entryLd(collection: string, e: { title: string; description: string; date?: string; updated?: string; slug: string }) {
  const type = collection === 'blog' ? 'BlogPosting' : collection === 'case-studies' ? 'Article' : 'CreativeWork'
  return {
    '@type': type,
    headline: e.title,
    name: e.title,
    description: e.description,
    url: abs(`/${collection}/${e.slug}`),
    author: { '@id': `${site.url}/#person` },
    ...(e.date && { datePublished: e.date }),
    ...(e.updated && { dateModified: e.updated })
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) }))
  }
}
