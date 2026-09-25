<script setup lang="ts">
import type { EntryMeta } from '~/generated/content-index.generated'

defineProps<{ entry: EntryMeta; index: number; to: string }>()
</script>

<template>
  <article v-reveal class="feature" :class="{ 'feature--visual': !!entry.cover, 'feature--flip': index % 2 === 1 }">
    <div class="feature__text">
      <p class="feature__num">{{ String(index + 1).padStart(2, '0') }}</p>
      <h3 class="feature__title">
        <NuxtLink class="feature__link" :to="to">{{ entry.title }}</NuxtLink>
      </h3>
      <p class="feature__desc">{{ entry.description }}</p>
      <p class="feature__more link">View project →</p>
    </div>
    <div v-if="entry.cover" class="feature__visual">
      <img :src="entry.cover" alt="" loading="lazy" decoding="async">
    </div>
  </article>
</template>
