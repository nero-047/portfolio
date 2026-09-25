<script setup lang="ts">
import type { EntryMeta } from '~/generated/content-index.generated'
import { formatDate } from '~/utils/format'

defineProps<{ entry: EntryMeta; to: string }>()
</script>

<template>
  <li v-reveal class="row">
    <NuxtLink class="row__link" :to="to">
      <span class="row__title">{{ entry.title }}</span>
      <span class="row__arrow" aria-hidden="true">→</span>
      <p class="row__desc">{{ entry.description }}</p>
      <p v-if="entry.date || entry.tags?.length" class="label row__meta">
        <time v-if="entry.date" :datetime="entry.date">{{ formatDate(entry.date) }}</time>
        <template v-if="entry.date && entry.tags?.length"> · </template>
        <template v-if="entry.tags?.length">{{ entry.tags.join(' / ') }}</template>
      </p>
    </NuxtLink>
  </li>
</template>
