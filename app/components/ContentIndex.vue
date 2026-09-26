<script setup lang="ts">
import { contentIndex, type CollectionName } from '~/generated/content-index.generated'
import { breadcrumbLd } from '~/composables/usePageSeo'

const props = defineProps<{
  collection: CollectionName
  title: string
  intro: string
  seoDescription: string
  emptyMessage?: string
}>()

const base = `/${props.collection}`
const entries = computed(() => contentIndex[props.collection])

usePageSeo({
  title: props.title,
  description: props.seoDescription,
  path: base,
  jsonLd: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: props.title, path: base }])]
})

// A collection with nothing in it is a thin page. The route stays (so adding a
// Markdown file is all it takes to publish) but it should not be indexed while empty.
if (!entries.value.length) useSeoMeta({ robots: 'noindex, follow' })
</script>

<template>
  <div>
    <header class="page-head">
      <h1>{{ title }}</h1>
      <p class="page-head__intro">{{ intro }}</p>
    </header>
    <div class="wrap">
      <WorkList v-if="collection === 'work'" :entries="entries" :empty-message="emptyMessage" />
      <ContentList v-else :entries="entries" :base="base" :empty-message="emptyMessage" />
    </div>
  </div>
</template>
