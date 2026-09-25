<script setup lang="ts">
import { site } from '~/config/site'

const live = ref(false)
</script>

<template>
  <section class="hero">
    <div class="hero__text">
      <p class="eyebrow">{{ site.name }} / {{ site.role }}</p>
      <h1 class="hero__title">
        <span>I’m Rishi.</span>
        <span>I build software.</span>
      </h1>
      <p class="hero__body">Web, backend and mobile. From new ideas to existing systems.</p>
      <div class="hero__actions">
        <a class="button" href="#work">View work →</a>
        <a class="link" :href="site.github" rel="noopener">GitHub ↗</a>
      </div>
      <p class="hero__aside label">Currently at {{ site.company }}</p>
    </div>

    <div class="hero__stage" :class="{ 'hero__stage--live': live }">
      <p class="hero__note">off-duty: F1</p>
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
      <p class="hero__caption label">Personal interest / F1-75</p>
    </div>
  </section>
</template>
