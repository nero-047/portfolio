<script setup lang="ts">
import { modelCredit, site } from '~/config/site'
const year = useState('footer-year', () => new Date().getFullYear())
</script>

<template>
  <footer class="site-footer">
    <div class="inner">
      <p class="site-footer__id">{{ site.wordmark }}<span class="wordmark__dot">.</span> / {{ year }}</p>
      <p class="site-footer__credit">
        {{ modelCredit.title }} by
        <a :href="modelCredit.sourceUrl" rel="noopener">{{ modelCredit.creator }}</a>,
        <a :href="modelCredit.licenseUrl" rel="noopener">{{ modelCredit.licenseName }}</a>
      </p>
      <p class="site-footer__copy">{{ site.url.replace('https://', '') }}</p>
    </div>
  </footer>
</template>
