<script setup lang="ts">
import type { WorkEntry } from '~/config/work'

defineProps<{ entry: WorkEntry }>()
</script>

<template>
  <article v-reveal class="wcompact">
    <span class="wcompact__num label">{{ entry.number }}</span>
    <div class="wcompact__text">
      <h3 class="wcompact__title">{{ entry.title }}</h3>
      <p class="wcompact__desc">{{ entry.descriptor }}</p>
    </div>
    <span class="wcompact__meta label">{{ entry.meta }}</span>
  </article>
</template>
