// Build-time content pipeline: Markdown in content/ -> typed modules in app/generated/,
// plus public/sitemap.xml and public/robots.txt. No runtime server or database involved.
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE_URL = 'https://rishi.is-a.dev'
const COLLECTIONS = ['work', 'case-studies', 'blog', 'lab']
// Only '/' is publicly promoted right now (Work/About/Contact are sections on it).
// /work, /case-studies, /blog and /lab stay as dormant, unlinked architecture: they exist
// so a future Markdown entry becomes a crawlable route without code changes, but they are
// deliberately excluded from the sitemap while empty.
const STATIC_ROUTES = ['/']
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const md = new MarkdownIt({ html: false, linkify: true, typographer: true })
const defaultLink = md.renderer.rules.link_open || ((t, i, o, _e, s) => s.renderToken(t, i, o))
md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
  const href = tokens[idx].attrGet('href') || ''
  if (/^https?:\/\//i.test(href)) tokens[idx].attrSet('rel', 'noopener')
  return defaultLink(tokens, idx, opts, env, self)
}

class ContentError extends Error {}
const fail = (file, msg) => { throw new ContentError(`[content] ${path.relative(root, file)}: ${msg}`) }

const asDate = (file, key, v) => {
  if (v === undefined || v === null || v === '') return undefined
  const d = v instanceof Date ? v : new Date(String(v))
  if (Number.isNaN(d.getTime())) fail(file, `"${key}" is not a valid date`)
  return d.toISOString().slice(0, 10)
}
const isHttpUrl = (s) => { try { return ['http:', 'https:'].includes(new URL(s).protocol) } catch { return false } }
const xmlEscape = (s) => String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

async function readCollection(collection) {
  const dir = path.join(root, 'content', collection)
  let names = []
  try { names = await fs.readdir(dir) } catch { return [] }
  const entries = []
  const seen = new Map()
  for (const name of names.sort()) {
    if (name.startsWith('_') || name.startsWith('.') || !/\.(md|markdown)$/i.test(name)) continue
    const file = path.join(dir, name)
    if (!(await fs.stat(file)).isFile()) continue
    const { data, content } = matter(await fs.readFile(file, 'utf8'))

    for (const key of ['title', 'description']) {
      if (typeof data[key] !== 'string' || !data[key].trim()) fail(file, `missing required front matter "${key}" (non-empty string)`)
    }
    const slug = data.slug === undefined ? name.replace(/\.(md|markdown)$/i, '') : data.slug
    if (typeof slug !== 'string' || !SLUG_RE.test(slug)) fail(file, `invalid slug "${slug}" (use lowercase letters, numbers and single hyphens)`)
    if (seen.has(slug)) fail(file, `duplicate slug "${slug}" (also used by ${seen.get(slug)})`)
    seen.set(slug, name)

    if (data.draft !== undefined && typeof data.draft !== 'boolean') fail(file, '"draft" must be true or false')
    if (data.featured !== undefined && typeof data.featured !== 'boolean') fail(file, '"featured" must be true or false')
    if (data.order !== undefined && typeof data.order !== 'number') fail(file, '"order" must be a number')
    if (data.tags !== undefined && !(Array.isArray(data.tags) && data.tags.every((t) => typeof t === 'string'))) fail(file, '"tags" must be a list of strings')
    for (const key of ['role', 'status']) {
      if (data[key] !== undefined && (typeof data[key] !== 'string' || !data[key].trim())) fail(file, `"${key}" must be a non-empty string`)
    }
    if (data.stack !== undefined && !(Array.isArray(data.stack) && data.stack.every((t) => typeof t === 'string'))) fail(file, '"stack" must be a list of strings')
    if (data.cover !== undefined && (typeof data.cover !== 'string' || !(data.cover.startsWith('/') || isHttpUrl(data.cover)))) fail(file, '"cover" must be a /public path or an http(s) URL')
    let links
    if (data.links !== undefined) {
      if (typeof data.links !== 'object' || data.links === null || Array.isArray(data.links)) fail(file, '"links" must be a map of label: url')
      for (const [k, v] of Object.entries(data.links)) if (typeof v !== 'string' || !isHttpUrl(v)) fail(file, `links.${k} must be an http(s) URL`)
      links = data.links
    }
    if (data.draft === true) continue

    entries.push({
      meta: {
        slug,
        title: data.title.trim(),
        description: data.description.trim(),
        ...(asDate(file, 'date', data.date) && { date: asDate(file, 'date', data.date) }),
        ...(asDate(file, 'updated', data.updated) && { updated: asDate(file, 'updated', data.updated) }),
        ...(data.tags?.length && { tags: data.tags }),
        ...(data.featured && { featured: true }),
        ...(typeof data.order === 'number' && { order: data.order }),
        ...(data.cover && { cover: data.cover }),
        ...(data.role && { role: data.role.trim() }),
        ...(data.status && { status: data.status.trim() }),
        ...(data.stack?.length && { stack: data.stack }),
        ...(links && Object.keys(links).length && { links }),
      },
      html: md.render(content),
    })
  }
  // order asc (if any), then newest date first, then title
  entries.sort((a, b) =>
    (a.meta.order ?? Infinity) - (b.meta.order ?? Infinity) ||
    (b.meta.date || '').localeCompare(a.meta.date || '') ||
    a.meta.title.localeCompare(b.meta.title))
  return entries
}

async function main() {
  const genDir = path.join(root, 'app', 'generated')
  await fs.rm(genDir, { recursive: true, force: true })
  await fs.mkdir(genDir, { recursive: true })

  const all = {}
  for (const c of COLLECTIONS) all[c] = await readCollection(c)

  let index = `// AUTO-GENERATED by scripts/generate-content.mjs. Do not edit.
export interface EntryMeta {
  slug: string
  title: string
  description: string
  date?: string
  updated?: string
  tags?: string[]
  featured?: boolean
  order?: number
  cover?: string
  role?: string
  status?: string
  stack?: string[]
  links?: Record<string, string>
}
export interface EntryBody { html: string }
export type CollectionName = ${COLLECTIONS.map((c) => `'${c}'`).join(' | ')}
export type EntryLoader = () => Promise<{ default: EntryBody }>

`
  index += `export const contentIndex: Record<CollectionName, EntryMeta[]> = {\n`
  for (const c of COLLECTIONS) index += `  '${c}': ${JSON.stringify(all[c].map((e) => e.meta), null, 2).replace(/\n/g, '\n  ')},\n`
  index += `}\n\nexport const contentLoaders: Record<CollectionName, Record<string, EntryLoader>> = {\n`
  for (const c of COLLECTIONS) {
    index += `  '${c}': {\n`
    for (const { meta } of all[c]) index += `    ${JSON.stringify(meta.slug)}: () => import('./entries/${c}/${meta.slug}.generated'),\n`
    index += `  },\n`
    await fs.mkdir(path.join(genDir, 'entries', c), { recursive: true })
    for (const { meta, html } of all[c]) {
      await fs.writeFile(path.join(genDir, 'entries', c, `${meta.slug}.generated.ts`),
        `// AUTO-GENERATED by scripts/generate-content.mjs. Do not edit.\nimport type { EntryBody } from '../../content-index.generated'\nconst body: EntryBody = { html: ${JSON.stringify(html)} }\nexport default body\n`)
    }
  }
  index += `}\n`
  await fs.writeFile(path.join(genDir, 'content-index.generated.ts'), index)

  const routes = [...STATIC_ROUTES]
  const urls = STATIC_ROUTES.map((r) => ({ loc: r }))
  for (const c of COLLECTIONS) for (const { meta } of all[c]) {
    routes.push(`/${c}/${meta.slug}`)
    urls.push({ loc: `/${c}/${meta.slug}`, lastmod: meta.updated || meta.date })
  }
  await fs.writeFile(path.join(genDir, 'routes.generated.json'), JSON.stringify(routes, null, 2) + '\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${xmlEscape(SITE_URL + (u.loc === '/' ? '/' : u.loc))}</loc>\n${u.lastmod ? `    <lastmod>${xmlEscape(u.lastmod)}</lastmod>\n` : ''}  </url>\n`).join('') +
    `</urlset>\n`
  await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap)
  await fs.writeFile(path.join(root, 'public', 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

  const counts = COLLECTIONS.map((c) => `${c}: ${all[c].length}`).join(', ')
  console.log(`[content] generated (${counts}); ${urls.length} sitemap URLs`)
}

main().catch((e) => {
  console.error(e instanceof ContentError ? e.message : e)
  process.exit(1)
})
