# Replacing the project placeholder images

The Work section currently ships original, illustrative placeholder artwork (not real
product screenshots) for three of the four entries. Swap them out once real captures
exist — no component or layout changes are needed, only the files below.

## Files to replace

| File | Used by | Recommended size / aspect |
|---|---|---|
| `public/images/projects/navcrm-placeholder.svg` | NavCRM (featured row) | ~1200×900px, 4:3. Desktop crops to a wider box, so keep the subject centered. |
| `public/images/projects/navfarm-platform-placeholder.svg` | Navfarm Platform (paired card) | ~1200×900px, 4:3. |
| `public/images/projects/navfarm-site-placeholder.svg` | Navfarm.com (paired card) | ~1200×900px, 4:3. |

`NotionLite` (the compact row) has no image in the approved layout — nothing to replace there.

## How to replace an image

1. Add the new file anywhere under `public/images/projects/` (any real raster/vector format —
   `.webp` and `.avif` are good choices for photos; keep `.svg` only if the replacement is
   itself vector art). Don't just rename an existing file's extension.
2. Open [`app/config/work.ts`](app/config/work.ts) and update the matching entry's `image`:
   - `src` — the new file's path (e.g. `/images/projects/navcrm.webp`)
   - `alt` — accurate alt text. Leave it `''` only if the image is purely decorative; if it
     conveys real information (a real screenshot), describe what's actually shown.
   - `isPlaceholder` — set to `false`. This removes the small "Illustrative preview" badge
     rendered by `WorkFeatured.vue` / `WorkCard.vue`.
3. No other file needs to change. The image components use fixed `aspect-ratio` boxes with
   `object-fit: cover`, so any reasonably close aspect ratio will fill the frame without
   causing layout shift; a 4:3 source crops most predictably.

## Notes

- Keep image weight reasonable (target well under 300KB per image) since the site is a fully
  static, prerendered build.
- If a project gets a real destination (case study, live site, repo), add `href` to its entry
  in `work.ts` — the components don't currently render a link since none of the four projects
  has a verified destination yet.
