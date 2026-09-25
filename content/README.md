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
role: Your role           # optional; shown in the project header if present
status: Status text       # optional
stack: [Tech, Tech]       # optional; only list what is true
links:                     # optional; real URLs only
  Repository: https://github.com/example/repo
  Live: https://example.com
---

Markdown body. Raw HTML is disabled.
```

Invalid front matter (missing fields, bad slug, duplicate slug, bad URL/date) fails the build with the offending file named.

## Adding each type

- **Work** — `content/work/<name>.md`: a real software project. Only write what is true.
- **Case study** — `content/case-studies/<name>.md`: an in-depth write-up.
- **Blog** — `content/blog/<name>.md`: a post; set `date`.
- **Lab** — `content/lab/<name>.md`: an experiment, prototype or small tool.

`npm run content:generate` regenerates `app/generated/`, `public/sitemap.xml` and `public/robots.txt`
(all git-ignored; `dev`, `build` and `postinstall` run it automatically).
