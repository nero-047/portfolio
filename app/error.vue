<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from '~/config/site'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
useSeoMeta({
  title: is404.value ? `Page not found — ${site.name}` : `Something went wrong — ${site.name}`,
  robots: 'noindex'
})
</script>

<template>
  <NuxtLayout>
    <div class="wrap">
      <header class="page-head">
        <p class="label">{{ is404 ? '404' : 'Error' }}</p>
        <h1>{{ is404 ? 'Page not found' : 'Something went wrong' }}</h1>
        <p>{{ is404 ? 'That page does not exist or has moved.' : 'An unexpected error occurred. Please try again.' }}</p>
      </header>
      <p style="padding-bottom: 5rem"><a class="button" href="/" @click.prevent="clearError({ redirect: '/' })">Back to home</a></p>
    </div>
  </NuxtLayout>
</template>
