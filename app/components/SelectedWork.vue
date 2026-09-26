<script setup lang="ts">
import { workNavcrm, workNavfarm, workSecondary, workNotionlite } from '~/config/work'

const rows = [workSecondary, workNotionlite]
</script>

<template>
  <section id="work" class="section work" tabindex="-1" aria-labelledby="work-heading">
    <div class="wrap">
      <header class="section__head">
        <div class="section__headline">
          <p class="eyebrow">01 / Selected work</p>
          <h2 id="work-heading" class="section__title">Systems, products and experiments.</h2>
        </div>
        <p class="section__lede">
          A selection of professional work and personal projects I’ve built, maintained or
          helped develop.
        </p>
      </header>

      <!-- 01 — professional work with no publishable interface. The structure is the evidence. -->
      <article v-reveal class="proj proj--split">
        <p class="proj__index">
          <span class="proj__num">{{ workNavcrm.number }}</span>
          <span v-if="workNavcrm.tag" class="proj__tag">{{ workNavcrm.tag }}</span>
        </p>
        <div class="proj__lead">
          <h3 class="proj__title">{{ workNavcrm.title }}</h3>
          <p class="proj__descriptor">{{ workNavcrm.descriptor }}</p>
          <p class="proj__meta label">{{ workNavcrm.meta }}</p>
          <p class="proj__contribution">{{ workNavcrm.contribution }}</p>
          <p v-if="workNavcrm.restricted" class="restricted">
            <svg class="restricted__icon" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">
              <path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="currentColor" stroke-width="1.3" />
              <rect x="3" y="7" width="10" height="7" rx="1" fill="currentColor" />
            </svg>
            <span>{{ workNavcrm.restricted }}</span>
          </p>
          <NuxtLink
            v-if="workNavcrm.slug"
            class="link proj__cta"
            :to="`/work/${workNavcrm.slug}`"
            :aria-label="`Explore the ${workNavcrm.title} case study`"
          >Explore case study →</NuxtLink>
        </div>
        <div class="proj__aside">
          <ProjectDiagram id="navcrm-surfaces" />
        </div>
      </article>

      <!-- 02 — flagship. Largest type on the page, and the diagram carries the visual weight. -->
      <article v-reveal class="proj proj--flagship">
        <p class="proj__index">
          <span class="proj__num">{{ workNavfarm.number }}</span>
          <span v-if="workNavfarm.tag" class="proj__tag">{{ workNavfarm.tag }}</span>
          <span v-if="workNavfarm.period" class="proj__period">{{ workNavfarm.period }}</span>
        </p>
        <h3 class="proj__title proj__title--flagship">{{ workNavfarm.title }}</h3>
        <p class="proj__descriptor proj__descriptor--flagship">{{ workNavfarm.descriptor }}</p>
        <div class="proj__spread">
          <div class="proj__prose">
            <p class="proj__meta label">{{ workNavfarm.meta }}</p>
            <p class="proj__contribution">{{ workNavfarm.contribution }}</p>
            <NuxtLink
              v-if="workNavfarm.slug"
              class="link proj__cta"
              :to="`/work/${workNavfarm.slug}`"
              :aria-label="`Explore the ${workNavfarm.title} case study`"
            >Explore case study →</NuxtLink>
          </div>
          <div class="proj__figure">
            <ProjectDiagram id="navfarm-tenancy" />
          </div>
        </div>
      </article>

      <!-- 03, 04 — secondary work and a personal project, deliberately quieter. -->
      <ol class="proj-rows">
        <li v-for="(e, i) in rows" :key="e.number" v-reveal :class="['proj-row', { 'proj-row--minor': i === 1 }]">
          <p class="proj__index">
            <span class="proj__num">{{ e.number }}</span>
            <span v-if="e.tag" class="proj__tag">{{ e.tag }}</span>
          </p>
          <div class="proj-row__text">
            <h3 class="proj-row__title">{{ e.title }}</h3>
            <p class="proj-row__descriptor">{{ e.descriptor }}</p>
            <p v-if="i === 0" class="proj-row__contribution">{{ e.contribution }}</p>
          </div>
          <p class="proj-row__meta label">
            {{ e.meta }}<template v-if="e.period"> · {{ e.period }}</template>
          </p>
          <p class="proj-row__action">
            <a v-if="e.external" class="link" :href="e.external.href" rel="noopener" :aria-label="`${e.external.label}: ${e.title}`">{{ e.external.label }} ↗</a>
            <NuxtLink v-else-if="e.slug" class="link" :to="`/work/${e.slug}`" :aria-label="`View ${e.title}`">View work →</NuxtLink>
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>
