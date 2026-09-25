<script setup lang="ts">
const { resolved, toggle } = useTheme()

const label = computed(() => (resolved.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'))
</script>

<template>
  <button type="button" class="theme" :aria-label="label" @click="toggle">
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <g v-if="resolved === 'dark'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
      </g>
      <g v-else fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <circle cx="12" cy="12" r="4.1" />
        <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" />
      </g>
    </svg>
  </button>
</template>
