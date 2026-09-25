<script setup lang="ts">
// `html` is produced at build time by markdown-it with raw HTML disabled.
defineProps<{ html: string }>()
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="prose" v-html="html" />
</template>
