# nero — Rishi Gurung's portfolio

The personal site of **Rishi Gurung** (`nero`), a software engineer working across
backend, web and mobile. Live at **<https://nero.is-a.dev>**.

![The homepage: an asymmetric hero with the identity block on the left and a Ferrari F1-75 on the right, on a warm paper background.](docs/homepage.png)

---

## What this is

A static, prerendered site. Every page is HTML on disk before a visitor arrives.

- **No database.** Content is Markdown files in [`content/`](content/README.md).
- **No CMS.** Publishing is `git commit` + a build.
- **No authentication, no admin panel, no server.** There is nothing running between
  builds, so there is nothing to keep up, patch or pay for.

That is a deliberate fit to the problem rather than minimalism for its own sake: a
personal site that needs operating will eventually stop being operated.

## Architecture

| | |
|---|---|
| Framework | Nuxt 4 (Vue 3, TypeScript) |
| Rendering | `nuxt generate` — full static prerender, `nitro.preset: 'static'` |
| Content | Markdown → typed TS modules at build time ([`scripts/generate-content.mjs`](scripts/generate-content.mjs)) |
| 3D | Three.js, loaded conditionally and never at first paint |
| Styling | One hand-written stylesheet, CSS custom properties, no framework |
| Hosting | Cloudflare Pages (see [`DEPLOYMENT.md`](DEPLOYMENT.md)) |

### The content pipeline

`scripts/generate-content.mjs` runs before Nuxt on every `dev`, `build` and
`postinstall`. It reads `content/`, validates front matter, and writes:

- `app/generated/content-index.generated.ts` — typed metadata for every entry
- `app/generated/entries/<collection>/<slug>.generated.ts` — one module per entry's
  rendered HTML, so a page's body is a dynamic import rather than part of the index
- `app/generated/routes.generated.json` — the prerender route list
- `public/sitemap.xml` and `public/robots.txt`

Everything under `app/generated/` is git-ignored and rebuilt from the Markdown.

Invalid front matter **fails the build**, naming the file: a missing `title`, a bad
slug, a duplicate slug, a malformed date, a non-URL in `links`, or a `diagram` id that
does not exist. A build that refuses to run is cheaper than a page that is quietly wrong.

### One source of truth for the origin

The production origin lives in [`app/config/site.json`](app/config/site.json) and
nowhere else. It is read by `app/config/site.ts` (canonical URLs, Open Graph, JSON-LD,
the footer) and by the content script (sitemap, robots).

### The progressive F1 hero

The hero car is a real 2022 Ferrari F1-75 model. It is also entirely optional.

1. **A static WebP poster ships server-rendered** with explicit dimensions and
   `fetchpriority="high"`. It is the LCP candidate and a complete hero on its own.
2. **Three.js and the ~6.5MB GLB load only if every check passes**: viewport ≥ 960px,
   fine pointer with hover, `prefers-reduced-motion` unset, no `saveData`, effective
   connection better than 2g, and a `webgl2` context that can actually be created.
3. **Even then it waits** for the page to be idle *and* the hero to be near the viewport.
4. **Any failure falls back to the poster** — including `webglcontextlost` at runtime,
   which disposes the whole scene.

`nuxt.config.ts` post-processes the build manifest to strip `prefetch`/`preload` from
the Three.js and hero-scene chunks, so the eligibility gate is the only thing that can
trigger the download.

The poster and the WebGL camera are fitted to the same measured silhouette box, so the
crossfade from poster to live model does not move the car. See
[`app/components/HeroF1Scene.client.vue`](app/components/HeroF1Scene.client.vue) and the
hero section of [`app/assets/css/main.css`](app/assets/css/main.css).

## Content structure

```
content/
  work/          → /work/<slug>          case studies
  lab/           → /lab/<slug>           experiments and implementation notes
  case-studies/  → /case-studies/<slug>  dormant (route exists, nothing published)
  blog/          → /blog/<slug>          dormant
```

Dormant collections are unlinked and `noindex` while empty; adding a Markdown file is
all it takes to publish one. Front matter is documented in
[`content/README.md`](content/README.md).

## Development

```bash
npm install          # also runs content generation + nuxt prepare
npm run dev          # http://localhost:3000
npm run build        # content generation + nuxt generate → .output/public
npm run preview      # wrangler pages dev on the built output
npm run deploy       # build, then wrangler pages deploy
npx vue-tsc --noEmit -p tsconfig.json   # typecheck
```

`npm run content:generate` regenerates `app/generated/`, `public/sitemap.xml` and
`public/robots.txt` on their own.

## Deployment

Static output in `.output/public`, deployed to Cloudflare Pages. Full details,
including caching headers and the custom domain, are in [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Credits

The hero 3D model is *2022 Ferrari F1-75* by `asdasfwefsfwsef` on Sketchfab, used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The attribution is rendered
in the site footer on every page.
