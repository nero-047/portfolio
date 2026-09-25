<script setup lang="ts">
import { nav, site } from '~/config/site'

const open = ref(false)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    document.getElementById('nav-toggle')?.focus()
  }
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="site-header">
    <div class="inner">
      <NuxtLink class="wordmark" to="/" :aria-label="`${site.name} — home`">{{ site.wordmark }}<span class="wordmark__dot">.</span></NuxtLink>

      <nav aria-label="Main" class="site-nav">
        <ul class="nav-list nav-list--inline">
          <li v-for="item in nav" :key="item.href">
            <a :href="item.href">{{ item.label }}<template v-if="item.arrow"> ↗</template></a>
          </li>
        </ul>
        <ThemeToggle class="site-nav__theme" />
      </nav>

      <button
        id="nav-toggle"
        class="nav-toggle"
        type="button"
        aria-controls="nav-panel"
        :aria-expanded="open"
        @click="open = !open"
      >{{ open ? 'Close' : 'Menu' }}</button>

      <div id="nav-panel" class="nav-panel" :data-open="open">
        <ul class="nav-list">
          <li v-for="item in nav" :key="item.href">
            <a :href="item.href" @click="open = false">{{ item.label }}<template v-if="item.arrow"> ↗</template></a>
          </li>
        </ul>
        <ThemeToggle class="nav-panel__theme" />
      </div>
    </div>
  </header>
</template>
