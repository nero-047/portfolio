<script setup lang="ts">
import { workNavcrm, workNavfarm, workSecondary, workZrm, workNotionlite } from '~/config/work'

const rows = [workSecondary, workZrm, workNotionlite]
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
          <span v-if="workNavcrm.period" class="proj__period">{{ workNavcrm.period }}</span>
        </p>
        <div class="proj__lead">
          <h3 class="proj__title">{{ workNavcrm.title }}</h3>
          <p class="proj__descriptor">{{ workNavcrm.descriptor }}</p>
          <p class="proj__meta label">{{ workNavcrm.meta }}</p>
          <p class="proj__contribution">{{ workNavcrm.contribution }}</p>
          <p v-if="workNavcrm.restricted" class="restricted">{{ workNavcrm.restricted }}</p>
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

      <!-- 02 — flagship. Largest type on the page, and the tenancy model carries the weight. -->
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

      <!-- 03, 04 — secondary work and a personal project, deliberately quieter.
           Same index rail as above (number / tag / period) so the metadata reads
           the same way on every project. -->
      <ol class="proj-rows">
        <li v-for="e in rows" :key="e.number" v-reveal class="proj-row">
          <p class="proj__index">
            <span class="proj__num">{{ e.number }}</span>
            <span v-if="e.tag" class="proj__tag">{{ e.tag }}</span>
            <span v-if="e.period" class="proj__period">{{ e.period }}</span>
          </p>
          <div class="proj-row__text">
            <h3 class="proj-row__title">{{ e.title }}</h3>
            <p class="proj-row__descriptor">{{ e.descriptor }}</p>
            <p class="proj-row__contribution">{{ e.contribution }}</p>
            <p class="proj-row__action">
              <a
                v-if="e.external"
                class="link"
                :href="e.external.href"
                rel="noopener"
                :aria-label="`${e.external.label}: ${e.title}`"
              >{{ e.external.label }} ↗</a>
              <NuxtLink
                v-else-if="e.slug"
                class="link"
                :to="`/work/${e.slug}`"
                :aria-label="`Explore the ${e.title} case study`"
              >Explore case study →</NuxtLink>
            </p>
            <!-- The only real product capture on the site: the live public navfarm.com. -->
            <img
              v-if="e.image"
              class="proj-row__shot"
              :src="e.image.src"
              :alt="e.image.alt"
              :width="e.image.width"
              :height="e.image.height"
              loading="lazy"
              decoding="async"
            >
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
