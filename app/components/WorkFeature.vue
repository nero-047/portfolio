<script setup lang="ts">
import type { EntryMeta } from '~/generated/content-index.generated'

defineProps<{ entry: EntryMeta; index: number; to: string }>()
</script>

<template>
  <li v-reveal class="feature">
    <NuxtLink class="feature__link" :to="to">
      <p class="feature__num">{{ String(index + 1).padStart(2, '0') }}</p>
      <h2 class="feature__title">{{ entry.title }}</h2>
      <p class="feature__desc">{{ entry.description }}</p>
      <p v-if="entry.context || entry.year || entry.stack?.length" class="feature__meta label">
        <template v-if="entry.context">{{ entry.context }}</template>
        <template v-if="entry.context && entry.year"> · </template>
        <template v-if="entry.year">{{ entry.year }}</template>
        <template v-if="(entry.context || entry.year) && entry.stack?.length"><br></template>
        <template v-if="entry.stack?.length">{{ entry.stack.join(' · ') }}</template>
      </p>
      <p class="feature__more link">Explore case study →</p>
    </NuxtLink>
  </li>
</template>
