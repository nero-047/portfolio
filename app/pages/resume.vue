<script setup lang="ts">
import { site } from '~/config/site'
import { work } from '~/config/work'
import { personLd, breadcrumbLd } from '~/composables/usePageSeo'

// Deliberately plain: this page is for reading, and for being read by someone in a hurry.
// Everything here also appears elsewhere on the site — it is drawn from the same config
// as the homepage so the two cannot drift apart.
usePageSeo({
  title: 'Résumé',
  description: `Résumé of ${site.name} — ${site.role.toLowerCase()} working across backend, web and mobile.`,
  path: '/resume',
  jsonLd: [personLd, breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Résumé', path: '/resume' }])]
})

const links = [
  { label: site.url.replace('https://', ''), href: site.url },
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.githubHandle, href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: site.xHandle, href: site.x }
]

const technologies = [
  'TypeScript', 'JavaScript', 'NestJS', 'Next.js', 'React Native',
  'Nuxt', 'Vue', 'Node.js', 'Nx', 'MySQL', 'Three.js', 'IIS / Windows deployment'
]
</script>

<template>
  <div class="cv">
    <header class="cv__head">
      <h1 class="cv__name">{{ site.name }}</h1>
      <p class="cv__role">{{ site.role }} — backend, web and mobile</p>
      <ul class="cv__links">
        <li v-for="l in links" :key="l.href"><a class="link" :href="l.href" rel="noopener">{{ l.label }}</a></li>
      </ul>
    </header>

    <section class="cv__section">
      <h2 class="label">Summary</h2>
      <p class="cv__intro">
        Software engineer working across backend, web and mobile, mostly on existing systems:
        multi-tenant platforms, the APIs behind them, the interfaces on top, and the deployment
        path that puts them in front of people. I like tracing a problem across all of those
        layers and finding the simplest useful change.
      </p>
    </section>

    <section class="cv__section">
      <h2 class="label">Experience</h2>
      <div class="cv__entries">
        <article class="cv__entry">
          <div class="cv__entry-head">
            <h3>{{ site.company }} — {{ site.role }}</h3>
            <p class="cv__sub">Current</p>
          </div>
          <ul>
            <li>
              <strong>NAVFarm</strong> — multi-tenant farm ERP and operations platform.
              Backend services, web interfaces, schema and deployment, across a tenancy model
              where each tenant is provisioned with its own isolated data.
              NestJS, Next.js, Nx, MySQL, Windows/IIS.
            </li>
            <li>
              <strong>NavCRM</strong> — multi-tenant CRM platform. Maintaining and extending an
              existing product across backend APIs, web interfaces and React Native applications.
            </li>
            <li>
              <strong>Navfarm.com</strong> — development and maintenance of the public website.
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="cv__section">
      <h2 class="label">Selected work</h2>
      <div class="cv__entries">
        <article v-for="e in work" :key="e.number" class="cv__entry">
          <div class="cv__entry-head">
            <h3>{{ e.title }}</h3>
            <p class="cv__sub">{{ e.meta }}<template v-if="e.period"> · {{ e.period }}</template></p>
          </div>
          <p>{{ e.descriptor }} — {{ e.contribution }}</p>
          <p v-if="e.slug || e.external" class="cv__sub">
            <NuxtLink v-if="e.slug" class="link" :to="`/work/${e.slug}`">Case study →</NuxtLink>
            <a v-else-if="e.external" class="link" :href="e.external.href" rel="noopener">{{ e.external.label }} ↗</a>
          </p>
        </article>
      </div>
    </section>

    <section class="cv__section">
      <h2 class="label">Technologies</h2>
      <ul class="cv__tags">
        <li v-for="t in technologies" :key="t">{{ t }}</li>
      </ul>
      <p class="cv__note">
        Listed because they appear in work described on this site, not as a ranking of skill.
      </p>
    </section>

    <section class="cv__section">
      <h2 class="label">Contact</h2>
      <p class="cv__intro">
        Open to interesting software-engineering opportunities.
        The fastest way to reach me is <a class="link" :href="`mailto:${site.email}`">{{ site.email }}</a>.
      </p>
    </section>
  </div>
</template>
