<script setup lang="ts">
import type { WorkEntry } from '~/config/work'

defineProps<{ entry: WorkEntry }>()
</script>

<template>
  <article v-reveal class="wcard">
    <div v-if="entry.image" class="wcard__media">
      <img :src="entry.image.src" :alt="entry.image.alt" width="640" height="480" loading="lazy" decoding="async">
      <span v-if="entry.image.isPlaceholder" class="media-badge">Illustrative preview</span>
    </div>
    <div class="wcard__text">
      <p class="wcard__tag label">{{ entry.number }}<template v-if="entry.tag"> / {{ entry.tag }}</template></p>
      <h3 class="wcard__title">{{ entry.title }}</h3>
      <p class="wcard__desc">{{ entry.descriptor }}</p>
    </div>
  </article>
</template>
