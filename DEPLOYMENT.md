# Deployment

Static site: Nuxt → `nuxt generate` → static files → Cloudflare Pages. No Node server, Worker, database or Functions.

| | |
|---|---|
| Pages project | `rishigurung` (https://rishigurung.pages.dev) |
| Production branch | `main` |
| App-configured canonical URL | https://rishi.is-a.dev — set in code (`app/config/site.ts`, `scripts/generate-content.mjs`). This is the intended domain, not a claim that it is registered or attached. |
| Previously attached custom domain | https://nero.is-a.dev — attached to the Pages project as of the last deploy. Domain registration/DNS is unchanged by this app-config update; reconciling the two is a separate, explicit task. |
| Build command | `npm run build` (content generation + `nuxt generate`) |
| Output directory | `.output/public` |

`wrangler.jsonc` sets `name: rishigurung` and `pages_build_output_dir: ./.output/public` (compatibility date preserved).
If the Cloudflare dashboard build settings ever disagree with this file, fix the dashboard to match (build command and output directory above).

## Direct upload (manual deploy)

```bash
npm run deploy
```

which runs `npm run build` then `npx wrangler pages deploy .output/public --project-name rishigurung`.
Wrangler is fetched by `npx` on demand (not a project dependency) and needs `npx wrangler login` once.

## Local static preview

```bash
npm run build && npm run preview   # wrangler pages dev on .output/public
```

## Notes

- `public/_headers` sets long-lived immutable caching for `/models/*`, `/images/hero/*`, `/_nuxt/*` and basic security headers.
- Unknown URLs get HTTP 404 with `404.html` (Nuxt's client-rendered error page). There is no SPA catch-all redirect.
- The 3D model (`/models/f1-75/…glb`) is never preloaded; it loads only on capable desktop browsers after idle (see `app/components/HeroF1Scene.client.vue`).
