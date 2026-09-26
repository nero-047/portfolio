<script setup lang="ts">
import { site } from '~/config/site'

// Flipped by HeroF1Scene once the first WebGL frame is on screen; until then
// (and forever, on anything that fails the eligibility gate) the poster is what shows.
const live = ref(false)
</script>

<template>
  <section class="hero">
    <div class="hero__text">
      <p class="eyebrow">{{ site.name }} / {{ site.role }}</p>
      <!-- <br> rather than block spans: the line breaks are visual, but the accessible
           name still reads as one sentence with spaces between the words. -->
      <h1 class="hero__title">
        I’m Rishi.<br>
        I build software<br>
        <span class="hero__title-quiet">that has to work.</span>
      </h1>
      <p class="hero__body">Web, backend and mobile — from existing systems to new products.</p>
      <div class="hero__actions">
        <a class="button" href="#work">View selected work →</a>
        <a class="link" :href="site.github" rel="noopener">GitHub ↗</a>
      </div>
      <p class="hero__aside label"><span class="hero__dot" aria-hidden="true"></span>Currently at {{ site.company }}</p>
    </div>

    <div class="hero__stage" :class="{ 'hero__stage--live': live }">
      <img
        class="hero__poster"
        src="/images/hero/f1-75-poster.a44fc938.webp"
        width="1600"
        height="900"
        alt=""
        fetchpriority="high"
        decoding="async"
      >
      <HeroF1Scene class="hero__canvas" @ready="live = true" @fail="live = false" />
      <p class="hero__caption label">
        <span>Off-duty interest</span>
        <span class="hero__caption-sub">2022 / F1-75</span>
      </p>
    </div>
  </section>
</template>
