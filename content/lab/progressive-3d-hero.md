---
title: A 3D hero that is allowed to not load
description: Putting a WebGL Formula 1 car in the hero of this site without letting it cost anyone a single blocked pixel.
order: 1
tags: [three-js, performance, progressive-enhancement]
role: Experiment
context: This site
stack: [Three.js, WebGL, Nuxt]
links:
  Repository: https://github.com/nero-047/portfolio
---

## The rule I set first

The car on the homepage is a real 3D model. It is also, architecturally, optional.

Before writing any of it I set one rule: the 3D layer may never block meaningful
content, and it may never be the reason someone waits. Everything else followed from
that, including the decision to ship a static image as the real hero and treat WebGL
as a layer that may quietly arrive later — or never.

## What ships first

The server-rendered hero is a WebP poster of the car. It has explicit dimensions, it is
marked high priority, and it is the LCP candidate. On most visits, for most of the visit,
that image *is* the hero. Nothing about the page is waiting on anything.

## What has to be true before WebGL is allowed

The enhancement only starts if every one of these passes:

- a viewport of at least 960px
- a fine pointer with real hover (so: not a phone, not a tablet)
- `prefers-reduced-motion` is not set
- the Network Information API does not report `saveData`
- the effective connection type is not `slow-2g` or `2g`
- a `webgl2` context can actually be created (probed, then immediately released)

If any check fails, the module never imports Three.js, the GLB is never requested, and
the visitor gets the poster — which was always a complete hero, not a placeholder.

If all of them pass, it *still* waits: for the page to be idle, and for the hero to be
near the viewport. Both conditions, not either.

The GLB is roughly 6.5MB. That number is exactly why none of this is negotiable.

## Keeping the bundler out of it

There is a subtle way to lose this fight without noticing: the framework helpfully adds
`<link rel="prefetch">` for route chunks, and Three.js is a route chunk. The
eligibility gate would then be protecting a download that already happened.

So the build manifest is post-processed to strip `prefetch` and `preload` from anything
matching the Three.js or hero-scene chunks. The gate is the only thing allowed to decide.

## The part I did not expect to be hard

Swapping a 2D poster for a 3D render without the car visibly jumping.

A poster and a perspective camera do not naturally agree on where a car is. The fix was
to stop treating the hero box as an image frame and start treating it as a *car frame*:
the alpha bounding box of the poster was measured once, and the image is scaled and
offset so its silhouette fills that box at 94%. The WebGL camera then does the same
thing from the other side — it projects around four thousand sampled mesh points, fits
the real silhouette to the same 94%, and shifts the render window so the centre lands in
the same place.

Both representations now agree on where the car is, so the crossfade is just an opacity
change. Layout stays a matter of "place a car-sized box", which is something CSS is
good at.

## Giving up gracefully

The scene renders at about 30fps, only while visible and only while the tab is shown.
Motion is deliberately small — a slight pointer response, a near-static drift, a
restrained scroll relationship. It is a signature, not a configurator, and it never spins.

On `webglcontextlost` the whole scene is disposed and the poster comes back. On unmount,
geometries, materials, textures, the environment target and the renderer are all
released. A decorative layer that leaks memory is worse than no decorative layer.

## What I took from it

The interesting engineering in this was not the 3D. It was deciding, up front, what the
feature was not allowed to cost — and then discovering that almost every implementation
detail was determined by that one constraint.
