<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), { message: 'Nothing here yet.' })
</script>

<template>
  <div class="empty"><p class="empty__msg">{{ message }}</p></div>
</template>
