---
title: A content pipeline with no CMS in it
description: How the writing on this site becomes static routes — Markdown in, typed modules and a sitemap out, and a build that fails loudly.
order: 2
tags: [static-site, build-tooling, nuxt]
role: Experiment
context: This site
stack: [Node, Markdown, Nuxt]
links:
  Repository: https://github.com/nero-047/portfolio
---

## The requirement

Everything published on this site is Markdown in a folder. There is no database, no CMS,
no admin panel and no authentication — not as minimalism for its own sake, but because a
personal site that has any of those things has an operational burden it will not survive.
The site should still be online, unchanged, if I do not touch it for two years.

So: files in, static HTML out, nothing running afterwards.

## What the build actually does

One Node script runs before the framework does anything. It reads `content/`, and for
each collection it emits:

- a typed index module — every entry's front matter, as TypeScript the app imports
  directly, so a missing field is a type error rather than a runtime `undefined`
- one module per entry containing the rendered HTML
- a route list, which the static generator prerenders
- `sitemap.xml` and `robots.txt`

Bodies are emitted as separate modules on purpose: the index is small and always loaded,
while a page's HTML is a dynamic import that only that page pays for.

## Failing loudly is the feature

The script validates front matter and throws, naming the file:

- `title` and `description` are required and must be non-empty
- slugs must match a strict pattern, and duplicates within a collection are an error
- dates must parse; `tags` and `stack` must be string arrays
- `links` values must be real `http(s)` URLs
- `cover` must be a public path or an absolute URL
- `diagram` must name a diagram that actually exists

That last one exists because the alternative — a typo silently rendering nothing —
is the kind of bug you find six months later in production. A build that refuses to
run is cheaper than a page that is quietly wrong.

Raw HTML is disabled in the Markdown renderer, and external links get `rel="noopener"`
added at render time rather than being the author's responsibility.

## One source of truth for the origin

The production origin is read from a single JSON file by both the app (canonical URLs,
Open Graph, JSON-LD, the footer) and this script (sitemap, robots). It was previously
written out in two places, which is exactly the kind of duplication that stays correct
right up until the day the domain changes.

## What I like about it

The whole thing is a few hundred lines and it has no runtime. Writing a post means
adding a file. Deploying means running a build. Nothing can be down at 3am, because
nothing is running.

It is not the right architecture for most products. It is very obviously the right
architecture for this one, and choosing correctly for the actual problem is most of
the job.
