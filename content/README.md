# Content

Everything published on the site lives here as Markdown. There is no CMS or database:
add a file, commit, and rebuild (`npm run build`) — the file becomes a static route.

```
content/
  work/          → /work/<slug>
  case-studies/  → /case-studies/<slug>
  blog/          → /blog/<slug>
  lab/           → /lab/<slug>
```

Files starting with `_` (or not ending in `.md`) are ignored. The slug defaults to the file name.

## Front matter

Required: `title`, `description`. Everything else is optional.

```md
---
title: Your title here
description: One factual sentence for lists and search results.
slug: custom-slug          # optional; lowercase letters, numbers, hyphens
date: 2026-01-31           # optional; YYYY-MM-DD
updated: 2026-02-15        # optional
tags: [tag-one, tag-two]   # optional
featured: true             # optional; featured Work is listed first on the home page
order: 1                   # optional; lower numbers first
draft: true                # optional; excluded from lists, sitemap and the build
cover: /images/example.webp  # optional; large visual on project pages/list (path under public/ or https URL)
diagram: navfarm-tenancy  # optional; a structural diagram used as the lead visual when
                          # there is no cover. Must name one that exists — see below.
role: Your role           # optional; shown in the project header if present
context: Company / client # optional; who the work was for
year: 2026–present        # optional; free text, so ranges work. Only if verified.
status: Status text       # optional
stack: [Tech, Tech]       # optional; only list what is true
links:                     # optional; real URLs only
  Repository: https://github.com/example/repo
  Live: https://example.com
---

Markdown body. Raw HTML is disabled.
```

Invalid front matter (missing fields, bad slug, duplicate slug, bad URL/date, unknown
`diagram`) fails the build with the offending file named.

## Diagrams

`diagram` names a hand-authored structural diagram rendered by
[`app/components/ProjectDiagram.vue`](../app/components/ProjectDiagram.vue) — real text
in real elements, not an image, so it reflows and reads correctly to a screen reader.
It is used as the page's lead visual when there is no `cover`.

Valid ids are listed in `DIAGRAMS` in [`scripts/generate-content.mjs`](../scripts/generate-content.mjs):
`navfarm-tenancy`, `navcrm-surfaces`. Adding one means adding a branch to the component
*and* the id to that list; a typo fails the build rather than rendering nothing.

Diagrams exist because some of this work has no publishable interface. See
[`PROJECT-IMAGES.md`](../PROJECT-IMAGES.md) for the policy and for how to swap in a real
capture later.

## Adding each type

- **Work** — `content/work/<name>.md`: a case study for a real project. Listed on `/work`
  and linked from the homepage. Only write what is true: no invented metrics, user
  counts, outcomes or ownership claims.
- **Lab** — `content/lab/<name>.md`: an experiment, prototype, small tool or
  implementation note — things too small to be a case study.
- **Case study** — `content/case-studies/<name>.md`: currently dormant. Project
  write-ups live under `work/`; this collection exists if a longer form is ever wanted.
- **Blog** — `content/blog/<name>.md`: currently dormant. Set `date` when used.

Collections with no entries are unlinked from navigation and served `noindex` — the
route still exists, so publishing is only ever "add a file".

`npm run content:generate` regenerates `app/generated/`, `public/sitemap.xml` and `public/robots.txt`
(all git-ignored; `dev`, `build` and `postinstall` run it automatically).
