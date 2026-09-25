export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'nero-theme'

/**
 * Single light/dark toggle. With no explicit saved choice the resolved theme
 * follows the OS setting and updates live if it changes; clicking the toggle
 * saves an explicit choice that then wins on every later visit. Reads/writes
 * the same state the blocking init script in nuxt.config already applied
 * (see app.head.script) so there is no flash of the wrong theme, and no
 * second flash on hydration. localStorage access is best-effort: if it
 * throws (private mode, disabled storage), the preference simply doesn't
 * persist across reloads instead of breaking the page.
 */
export function useTheme() {
  const resolved = useState<ResolvedTheme>('theme-resolved', () => 'light')
  const hasOverride = useState<boolean>('theme-has-override', () => false)

  const systemPrefersDark = () => import.meta.client && window.matchMedia('(prefers-color-scheme: dark)').matches

  function applyDom(theme: ResolvedTheme) {
    if (!import.meta.client) return
    document.documentElement.dataset.theme = theme
  }

  function setExplicit(theme: ResolvedTheme) {
    resolved.value = theme
    hasOverride.value = true
    applyDom(theme)
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, theme)
      } catch {
        // storage unavailable — theme still applies for this load, just doesn't persist
      }
    }
  }

  function toggle() {
    setExplicit(resolved.value === 'dark' ? 'light' : 'dark')
  }

  let mq: MediaQueryList | undefined
  function onSystemChange() {
    if (hasOverride.value) return
    resolved.value = systemPrefersDark() ? 'dark' : 'light'
    applyDom(resolved.value)
  }

  onMounted(() => {
    // Adopt whatever the blocking script already applied, so this doesn't cause a second flash.
    resolved.value = (document.documentElement.dataset.theme as ResolvedTheme) || 'light'
    hasOverride.value = document.documentElement.dataset.themeOverride === 'true'
    mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', onSystemChange)
  })
  onBeforeUnmount(() => mq?.removeEventListener('change', onSystemChange))

  return { resolved, toggle }
}
