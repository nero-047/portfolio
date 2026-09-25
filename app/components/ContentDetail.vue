<script setup lang="ts">
import { contentIndex, contentLoaders, type CollectionName } from '~/generated/content-index.generated'
import { formatDate } from '~/utils/format'
import { breadcrumbLd, entryLd } from '~/composables/usePageSeo'

const props = defineProps<{ collection: CollectionName; backLabel: string }>()
const route = useRoute()
const slug = String(route.params.slug)
const base = `/${props.collection}`

const meta = contentIndex[props.collection].find((e) => e.slug === slug)
const loader = meta ? contentLoaders[props.collection][slug] : undefined
if (!meta || !loader) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: body } = await useAsyncData(`content:${props.collection}:${slug}`, async () => (await loader()).default)

usePageSeo({
  title: meta.title,
  description: meta.description,
  path: `${base}/${slug}`,
  type: 'article',
  published: meta.date,
  modified: meta.updated,
  jsonLd: [
    entryLd(props.collection, meta),
    breadcrumbLd([{ name: 'Home', path: '/' }, { name: props.backLabel, path: base }, { name: meta.title, path: `${base}/${slug}` }])
  ]
})

const facts = computed(() => {
  const m = meta!
  return [
    m.role && ['Role', m.role],
    m.stack?.length && ['Stack', m.stack.join(', ')],
    m.status && ['Status', m.status],
    m.date && ['Date', formatDate(m.date)],
    m.updated && ['Updated', formatDate(m.updated)],
    m.tags?.length && ['Tags', m.tags.join(' / ')]
  ].filter(Boolean) as [string, string][]
})
</script>

<template>
  <article v-if="meta" class="detail">
    <header class="detail__head">
      <NuxtLink class="crumb" :to="base">← {{ backLabel }}</NuxtLink>
      <h1>{{ meta.title }}</h1>
      <p class="detail__desc">{{ meta.description }}</p>
      <dl v-if="facts.length" class="meta">
        <div v-for="[k, v] in facts" :key="k">
          <dt class="label">{{ k }}</dt>
          <dd>{{ v }}</dd>
        </div>
      </dl>
    </header>
    <div class="wrap">
      <div v-if="meta.cover" class="cover"><img :src="meta.cover" alt="" loading="lazy" decoding="async"></div>
      <div class="detail__body">
        <ProseContent v-if="body" :html="body.html" />
        <div v-if="meta.links" class="detail__links">
          <a v-for="(href, label) in meta.links" :key="label" class="link" :href="href" rel="noopener">{{ label }} ↗</a>
        </div>
      </div>
    </div>
  </article>
</template>
