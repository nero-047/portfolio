<script setup lang="ts">
import type { WorkEntry } from '~/config/work'

defineProps<{ entry: WorkEntry }>()
</script>

<template>
  <article v-reveal class="wfeat">
    <div v-if="entry.image" class="wfeat__media">
      <img :src="entry.image.src" :alt="entry.image.alt" width="960" height="720" loading="lazy" decoding="async">
      <span v-if="entry.image.isPlaceholder" class="media-badge">Illustrative preview</span>
    </div>
    <div class="wfeat__text">
      <p class="wfeat__tag label">{{ entry.number }}<template v-if="entry.tag"> / {{ entry.tag }}</template></p>
      <h3 class="wfeat__title">{{ entry.title }}</h3>
      <p class="wfeat__desc">{{ entry.descriptor }}</p>
      <p class="wfeat__meta label">{{ entry.meta }}</p>
      <p class="wfeat__contribution">{{ entry.contribution }}</p>
    </div>
  </article>
</template>
