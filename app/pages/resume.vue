<script setup lang="ts">
import { site } from '~/config/site'
import { work } from '~/config/work'
import { personLd, breadcrumbLd } from '~/composables/usePageSeo'

// Deliberately plain: this page is for reading, and for being read by someone in a hurry.
// Projects are drawn from the same config as the homepage so the two cannot drift apart.
//
// Experience describes roles and scope; Selected work describes the products. Nothing is
// described twice.
//
// Dates, education and history verified against the owner's ATS résumé (Sept 2026).
// Deliberately NOT published here: the phone number on that résumé. A personal mobile
// number on a public, indexed page is a standing spam and privacy cost, and the email
// and LinkedIn below already give a recruiter two ways in. Say the word and it goes back.

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
  { label: 'LinkedIn', href: site.linkedin }
]

const experience = [
  {
    org: site.company,
    title: 'Software Developer',
    period: 'May 2026 – Present',
    body: 'Co-developing the NAVFarm platform in a two-developer team, owning major frontend and product workflows — master data, inventory, sales, batch creation, daily feed and activity entry, multi-tenant access, and user and role management. Completed and now maintain NAVCRM across web and mobile. Handle code integration, production and development deployments, server troubleshooting, and operational maintenance across both platforms and company web properties.'
  },
  {
    org: site.company,
    title: 'Intern — Mobile App Developer',
    period: 'Jan 2026 – Apr 2026',
    body: 'Built consultingprudence.com end to end in Next.js, including an OpenAI API chatbot with function calling, rule-based consultation booking, consultant notifications and Google Sheets integration. Developed core NAVCRM multi-tenant web and backend capabilities, and the APIs behind its React Native application.'
  },
  {
    org: 'NAVFarm',
    title: 'Contract Web Developer',
    period: 'Oct 2025 – Dec 2025',
    body: 'Built navfarm.com independently with HTML, CSS, JavaScript, jQuery and Tailwind inside an existing WordPress-hosted environment, cutting average load time from around 6.0s to 3.2s through asset optimisation, a CDN, lazy loading and JavaScript work.'
  },
  {
    org: 'PYB247',
    title: 'Freelance Developer',
    period: '2023 – 2024',
    body: 'Delivered 34 paid client projects across web, mobile, e-commerce, Shopify customisation and interactive JavaScript work, each handled from requirements through to delivery.'
  }
]

const education = [
  {
    org: 'B.Tech, Computer Science & Engineering',
    title: 'Chandigarh Engineering College (CGC Landran)',
    period: '2022 – 2026'
  },
  {
    org: 'Smart India Hackathon — Grand Finalist',
    title: 'Built the Node.js/Express backend and FastAPI recommendation service for a cultural-heritage platform, and contributed to the React frontend.',
    period: '2023'
  }
]

// Grouped rather than a flat tag cloud: same information, far quicker to scan.
const skills = [
  ['Languages', 'TypeScript · JavaScript · Python · Dart'],
  ['Frontend', 'React · Next.js · Nuxt · Tailwind CSS · shadcn/ui'],
  ['Backend', 'Node.js · NestJS · Express · Hono · REST APIs'],
  ['Mobile', 'React Native · Flutter'],
  ['Data', 'MySQL · MongoDB · Redis · Drizzle ORM · Firebase'],
  ['Cloud / ops', 'Cloudflare Workers & Pages · AWS · Docker · Linux · Windows Server / IIS']
]
</script>

<template>
  <div class="cv">
    <header class="cv__head">
      <h1 class="cv__name">{{ site.name }}</h1>
      <p class="cv__role">{{ site.role }} — backend, web and mobile · {{ site.location }}</p>
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
        <article v-for="e in experience" :key="e.org + e.title" class="cv__entry">
          <div class="cv__entry-head">
            <h3>{{ e.org }} — {{ e.title }}</h3>
            <p class="cv__sub">{{ e.period }}</p>
          </div>
          <p>{{ e.body }}</p>
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
      <h2 class="label">Education &amp; achievements</h2>
      <div class="cv__entries">
        <article v-for="e in education" :key="e.org" class="cv__entry">
          <div class="cv__entry-head">
            <h3>{{ e.org }}</h3>
            <p class="cv__sub">{{ e.period }}</p>
          </div>
          <p>{{ e.title }}</p>
        </article>
      </div>
      <p class="cv__note">
        Certifications: AWS Academy Graduate — Data Engineering; AWS Academy Cloud Foundations.
      </p>
    </section>

    <section class="cv__section">
      <h2 class="label">Technologies</h2>
      <dl class="cv__skills">
        <div v-for="[group, items] in skills" :key="group">
          <dt class="label">{{ group }}</dt>
          <dd>{{ items }}</dd>
        </div>
      </dl>
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
