<script setup lang="ts">
import type { EntryMeta } from '~/generated/content-index.generated'

defineProps<{ entries: EntryMeta[]; base: string; emptyMessage?: string }>()
</script>

<template>
  <ul v-if="entries.length" class="rows">
    <ContentRow v-for="e in entries" :key="e.slug" :entry="e" :to="`${base}/${e.slug}`" />
  </ul>
  <EmptyCollection v-else :message="emptyMessage" />
</template>
