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
usePageSeo({
  title: props.title,
  description: props.seoDescription,
  path: base,
  jsonLd: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: props.title, path: base }])]
})
</script>

<template>
  <div>
    <header class="page-head">
      <h1>{{ title }}</h1>
      <p class="page-head__intro">{{ intro }}</p>
    </header>
    <div class="wrap">
      <WorkList v-if="collection === 'work'" :entries="contentIndex.work" :empty-message="emptyMessage" />
      <ContentList v-else :entries="contentIndex[collection]" :base="base" :empty-message="emptyMessage" />
    </div>
  </div>
</template>
