<script setup lang="ts">
import { nav, site } from '~/config/site'

const open = ref(false)
const route = useRoute()

// The panel is display:none when closed, so its links leave the tab order entirely;
// Escape closes it and returns focus to the control that opened it.
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    document.getElementById('nav-toggle')?.focus()
  }
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="site-header">
    <div class="inner">
      <NuxtLink class="wordmark" to="/" :aria-label="`${site.wordmark}. — ${site.name}, home`">{{ site.wordmark }}<span class="wordmark__dot">.</span></NuxtLink>

      <nav aria-label="Main" class="site-nav">
        <ul class="nav-list nav-list--inline">
          <li v-for="item in nav" :key="item.href">
            <NuxtLink :to="item.href">{{ item.label }}<template v-if="item.arrow"> ↗</template></NuxtLink>
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
        <nav aria-label="Main (mobile)">
          <ul class="nav-list">
            <li v-for="item in nav" :key="item.href">
              <NuxtLink :to="item.href" @click="open = false">{{ item.label }}<template v-if="item.arrow"> ↗</template></NuxtLink>
            </li>
          </ul>
        </nav>
        <ThemeToggle class="nav-panel__theme" />
      </div>
    </div>
  </header>
</template>
