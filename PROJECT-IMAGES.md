# Project imagery

## The policy

This site does not ship invented product screenshots, stand-in dashboard artwork or
generated "illustrative previews". NavCRM and NAVFarm are client software whose
interfaces show customer data, and an image that only *looks* like the product tells a
visitor less than nothing.

So where a real, approved capture does not exist, the work is presented with the things
that are genuinely mine to publish: structure, scope and reasoning. The homepage and the
case studies use hand-authored structural diagrams
([`app/components/ProjectDiagram.vue`](app/components/ProjectDiagram.vue)) instead. Those
are real text in real elements, so they reflow, read correctly to a screen reader and
follow the theme — and they are honest about what they are.

NavCRM additionally states the constraint outright rather than hiding it, with a
"Professional work · screenshots restricted" marker.

## Adding a real image later

Nothing in the layout needs to change when an approved capture exists.

### On the homepage

1. Put the file under `public/images/projects/` (`.webp` or `.avif` for photographic
   captures; `.svg` only if it is genuinely vector art).
2. In [`app/config/work.ts`](app/config/work.ts), set the entry's `image`:
   ```ts
   image: { src: '/images/projects/navfarm.webp', alt: 'What the image actually shows', width: 1600, height: 1200 }
   ```
   `alt` must describe what is shown — leave it `''` only if the image is purely
   decorative and the surrounding text already carries the meaning.
3. Render it in [`app/components/SelectedWork.vue`](app/components/SelectedWork.vue)
   where that entry's `ProjectDiagram` currently sits, or alongside it.

### On a case study page

Add `cover: /images/projects/<file>` to the Markdown front matter. A `cover` takes
precedence over `diagram` as the lead visual, so the diagram can either move into the
body or be dropped from the front matter.

## Constraints

- Keep each image well under ~300KB; this is a fully static build with no image service.
- Always give images explicit `width`/`height` (or a fixed `aspect-ratio` box) so
  nothing shifts as they load.
- Only publish an image you are permitted to publish. If that is in any doubt, the
  diagram is the better answer anyway.

## The social card

`public/images/social/card.png` (1200×630) is built from the real F1-75 poster asset,
not from a generic preview image. Its source is
[`scripts/og-card/card.html`](scripts/og-card/card.html), which includes the one-line
headless-Chrome command that regenerates it. It is not part of the build, so the project
has no browser dependency.
