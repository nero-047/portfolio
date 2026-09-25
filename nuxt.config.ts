import { existsSync, readFileSync } from 'node:fs'

// Routes for real Markdown entries, written by scripts/generate-content.mjs.
const routesFile = new URL('./app/generated/routes.generated.json', import.meta.url)
const contentRoutes: string[] = existsSync(routesFile) ? JSON.parse(readFileSync(routesFile, 'utf8')) : []

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
      script: [
        {
          key: 'theme-init',
          // Blocking, runs before first paint: applies the persisted explicit choice, or
          // system preference otherwise, to <html data-theme> so there is no flash of the
          // wrong theme. A legacy/invalid stored value (e.g. old tri-state "system") is
          // treated as no override and cleared. Kept tiny and defensive — storage can be
          // unavailable (private mode) or throw.
          innerHTML: `(function(){try{var k='nero-theme',s=localStorage.getItem(k),o=s==='light'||s==='dark',d=window.matchMedia('(prefers-color-scheme: dark)').matches,r=o?s:(d?'dark':'light'),e=document.documentElement;e.dataset.theme=r;e.dataset.themeOverride=o?'true':'false';if(s&&!o){try{localStorage.removeItem(k)}catch(_){}}}catch(_){}})();`,
          tagPriority: 'critical'
        }
      ]
    }
  },

  hooks: {
    // Keep Three.js and the hero scene out of <link rel="prefetch">: they are fetched
    // only by the hero's own eligibility/idle logic, never on phones or data-saver.
    'build:manifest': (manifest) => {
      for (const [key, entry] of Object.entries(manifest)) {
        if (/three|HeroF1Scene/i.test(key) || /three|HeroF1Scene/i.test(entry.src ?? '')) {
          entry.prefetch = false
          entry.preload = false
        }
      }
    }
  },

  vite: {
    server: {
      // Dev server only: allow ngrok tunnels (a leading dot matches any subdomain).
      allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io']
    }
  },

  nitro: {
    preset: 'static',
    prerender: {
      routes: contentRoutes,
      crawlLinks: true
    }
  }
})
