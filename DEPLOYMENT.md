# Deployment

Static site: Nuxt → `nuxt generate` → static files → Cloudflare Pages. No Node server,
Worker, database or Functions.

| | |
|---|---|
| **Production URL** | <https://nero.is-a.dev> |
| Canonical origin (single source of truth) | [`app/config/site.json`](app/config/site.json) — read by `app/config/site.ts` and `scripts/generate-content.mjs`. Change it there and nowhere else. |
| Cloudflare Pages project | `rishigurung` (also reachable at `rishigurung.pages.dev`) |
| Production branch | `main` |
| Build command | `npm run build` (content generation + `nuxt generate`) |
| Output directory | `.output/public` |

The Pages *project name* is `rishigurung` and is unrelated to the public domain —
renaming it would create a new project and a new `pages.dev` host, so it is left alone.
`wrangler.jsonc` sets `name: rishigurung` and `pages_build_output_dir: ./.output/public`.
If the Cloudflare dashboard build settings ever disagree with this file, fix the
dashboard to match the build command and output directory above.

## Direct upload (manual deploy)

```bash
npm run deploy
```

which runs `npm run build` then `npx wrangler pages deploy .output/public --project-name rishigurung`.
Wrangler is fetched by `npx` on demand (not a project dependency) and needs
`npx wrangler login` once.

## Local static preview

```bash
npm run build && npm run preview   # wrangler pages dev on .output/public
```

## What the origin drives

Changing `app/config/site.json` updates, in one build: canonical `<link>` tags, all
`og:url` values, JSON-LD `@id`s and `url`s, the absolute `og:image`/`twitter:image`
URLs, `sitemap.xml`, the `Sitemap:` line in `robots.txt`, and the URL printed in the
site footer.

## Notes

- `public/_headers` sets long-lived immutable caching for `/models/*`,
  `/images/hero/*` and `/_nuxt/*`, plus basic security headers. The social card at
  `/images/social/card.png` is deliberately **not** immutable — it has no content hash
  and scrapers need to see updates.
- Unknown URLs get HTTP 404 with `404.html` (Nuxt's client-rendered error page).
  There is no SPA catch-all redirect.
- The 3D model (`/models/f1-75/…glb`) is never preloaded; it loads only on capable
  desktop browsers after idle. See the hero section of the README.
- `/case-studies` and `/blog` are prerendered but empty: they are excluded from the
  sitemap, unlinked from navigation, and served `noindex, follow` while they have no
  entries.
