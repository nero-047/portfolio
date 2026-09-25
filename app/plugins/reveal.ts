// v-reveal: small opacity/translate entrance for below-the-fold blocks.
// Server output is fully visible; on the client only elements that start off-screen are hidden and revealed.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
      const delay = Number(binding.value) || 0
      el.classList.add('rv-pre')
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        el.style.transitionDelay = `${delay}ms`
        el.classList.add('rv-in')
        requestAnimationFrame(() => el.classList.remove('rv-pre'))
      }, { rootMargin: '0px 0px -8% 0px' })
      io.observe(el)
    }
  })
})
