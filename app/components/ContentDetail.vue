<script setup lang="ts">
import { contentIndex, contentLoaders, type CollectionName } from '~/generated/content-index.generated'
import type { DiagramId } from '~/config/work'
import { site } from '~/config/site'
import { formatDate } from '~/utils/format'
import { breadcrumbLd, entryLd } from '~/composables/usePageSeo'

const props = defineProps<{ collection: CollectionName; backLabel: string }>()
const route = useRoute()
const slug = String(route.params.slug)
const base = `/${props.collection}`

const entries = contentIndex[props.collection]
const meta = entries.find((e) => e.slug === slug)
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
    m.context && ['Context', m.context],
    m.year && ['Year', m.year],
    m.stack?.length && ['Stack', m.stack.join(', ')],
    m.status && ['Status', m.status],
    m.updated && ['Updated', formatDate(m.updated)]
  ].filter(Boolean) as [string, string][]
})

/** Wraps around, so the last entry still offers somewhere to go. */
const next = computed(() => {
  if (entries.length < 2) return undefined
  const i = entries.findIndex((e) => e.slug === slug)
  return entries[(i + 1) % entries.length]
})
</script>

<template>
  <!--
    One reading column, centred. Only the metadata row and figures use the wider
    track either side, and they break out symmetrically — every text block keeps
    the same left edge. The empty space is an article's margin, not a column that
    was left unfilled; nothing is invented to occupy it.
  -->
  <article v-if="meta" class="article">
    <p class="article__crumb"><NuxtLink class="crumb" :to="base">← {{ backLabel }}</NuxtLink></p>
    <h1 class="article__title">{{ meta.title }}</h1>
    <p class="article__desc">{{ meta.description }}</p>
    <dl v-if="facts.length" class="meta article__wide">
      <div v-for="[k, v] in facts" :key="k">
        <dt class="label">{{ k }}</dt>
        <dd>{{ v }}</dd>
      </div>
    </dl>

    <div v-if="meta.cover" class="cover article__wide"><img :src="meta.cover" alt="" loading="lazy" decoding="async"></div>
    <!-- Structure, not a screenshot: the lead visual for work that has no publishable interface. -->
    <div v-else-if="meta.diagram" class="article__figure article__wide">
      <ProjectDiagram :id="(meta.diagram as DiagramId)" />
    </div>

    <ProseContent v-if="body" :html="body.html" />

    <p v-if="meta.links" class="article__links">
      <a v-for="(href, label) in meta.links" :key="label" class="link" :href="href" rel="noopener">{{ label }} ↗</a>
    </p>

    <!-- Someone who read this far is the most engaged visitor the site will get. -->
    <section class="article__cta" aria-labelledby="cta-heading">
      <h2 id="cta-heading" class="article__cta-title">Have something in mind?</h2>
      <p class="article__cta-copy">
        Open to interesting software-engineering opportunities and always happy to talk software.
      </p>
      <a class="button" :href="`mailto:${site.email}`">Let’s talk →</a>
    </section>

    <nav v-if="next" class="article__next" :aria-label="`Next in ${backLabel}`">
      <NuxtLink :to="`${base}/${next.slug}`">
        <span class="label">Next project</span>
        <span class="article__next-title">{{ next.title }}</span>
      </NuxtLink>
    </nav>
  </article>
</template>
