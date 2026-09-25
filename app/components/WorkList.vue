<script setup lang="ts">
import type { EntryMeta } from '~/generated/content-index.generated'

defineProps<{ entries: EntryMeta[]; emptyMessage?: string }>()
</script>

<template>
  <div v-if="entries.length" class="work-list">
    <WorkFeature v-for="(e, i) in entries" :key="e.slug" :entry="e" :index="i" :to="`/work/${e.slug}`" />
  </div>
  <EmptyCollection v-else :message="emptyMessage" />
</template>
