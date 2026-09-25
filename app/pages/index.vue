<script setup lang="ts">
import { site } from '~/config/site'
import { workFeatured, workPair, workCompact } from '~/config/work'
import { personLd, websiteLd } from '~/composables/usePageSeo'

usePageSeo({
  title: `${site.name} — ${site.role}`,
  description: `${site.name}, ${site.role.toLowerCase()}. Web, backend and mobile — work, and how to reach me.`,
  path: '/',
  suffix: false,
  jsonLd: [personLd, websiteLd]
})

const contacts = [
  { label: 'Email', handle: site.email, href: `mailto:${site.email}` },
  { label: 'GitHub', handle: site.githubHandle, href: site.github },
  { label: 'LinkedIn', handle: site.name, href: site.linkedin }
]
</script>

<template>
  <div>
    <HeroSection />

    <section id="work" class="section" tabindex="-1" aria-labelledby="work-heading">
      <div class="wrap">
        <div class="section__head">
          <div>
            <p class="eyebrow">01 / Selected work</p>
            <h2 id="work-heading" class="h2">Things I’ve worked on.</h2>
          </div>
          <span class="label work-section__category">Employer work + personal projects</span>
        </div>
        <div class="work-stack">
          <WorkFeatured :entry="workFeatured" />
          <div class="work-pair">
            <WorkCard v-for="e in workPair" :key="e.number" :entry="e" />
          </div>
          <WorkCompact :entry="workCompact" />
        </div>
      </div>
    </section>

    <div class="closing section">
      <div class="wrap closing__grid">
        <section id="about" class="closing__col" tabindex="-1" aria-labelledby="about-heading">
          <p class="eyebrow">02 / A little about me</p>
          <h2 id="about-heading" class="closing__title">Curious about how things work.</h2>
          <div class="about">
            <p>I started with Python around 2019. Today I work across web, backend and mobile — building, fixing and extending software.</p>
          </div>
          <div class="identity">
            <p class="identity__name">{{ site.name }}</p>
            <p class="identity__role">Software Developer</p>
            <p class="identity__company">{{ site.company }}</p>
            <p class="identity__aside label">F1 between builds</p>
          </div>
        </section>

        <section id="contact" class="closing__col closing__col--contact" tabindex="-1" aria-labelledby="contact-heading">
          <h2 id="contact-heading" class="closing__title">Have something in mind?</h2>
          <p class="contact-lede">Open to interesting job opportunities and always happy to talk software.</p>
          <a class="button contact-cta" :href="`mailto:${site.email}`">Let’s talk →</a>
          <ul class="contact-rows">
            <li v-for="c in contacts" :key="c.label">
              <a :href="c.href" rel="noopener" :aria-label="`${c.label}: ${c.handle}`">
                <span class="contact-rows__label label">{{ c.label }}</span>
                <span class="contact-rows__handle">{{ c.handle }}</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
