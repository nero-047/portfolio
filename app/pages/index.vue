<script setup lang="ts">
import { site } from '~/config/site'
import { personLd, websiteLd } from '~/composables/usePageSeo'

usePageSeo({
  title: `${site.name} — ${site.role}`,
  description: `${site.name} (nero), ${site.role.toLowerCase()} working across backend, web and mobile.`,
  path: '/',
  suffix: false,
  jsonLd: [personLd, websiteLd]
})

const facts = [
  { label: 'Name', value: site.name },
  { label: 'Handle', value: site.handle },
  { label: 'Role', value: site.role },
  { label: 'Interests', value: 'F1 / software / design / experiments' }
]

const contacts = [
  { label: 'Email', handle: site.email, href: `mailto:${site.email}` },
  { label: 'GitHub', handle: site.githubHandle, href: site.github },
  { label: 'LinkedIn', handle: site.name, href: site.linkedin },
  { label: 'X', handle: site.xHandle, href: site.x }
]
</script>

<template>
  <div>
    <HeroSection />

    <SelectedWork />

    <section id="about" class="section about-section" tabindex="-1" aria-labelledby="about-heading">
      <div class="wrap about-section__grid">
        <div class="about-section__main">
          <p class="eyebrow">02 / About</p>
          <h2 id="about-heading" class="section__title">I like understanding how systems fit together.</h2>
          <div class="about">
            <p>
              I work across backend, web and mobile, often on existing systems where understanding
              how things already work matters as much as writing the next feature.
            </p>
            <p>
              I like tracing problems across interfaces, APIs, databases and deployment, then
              finding the simplest useful way to change the system.
            </p>
            <p>
              Outside work, I’m usually following Formula 1 or building something because I want to
              understand how it works.
            </p>
          </div>
        </div>

        <dl class="facts">
          <div v-for="f in facts" :key="f.label" class="facts__row">
            <dt class="label">{{ f.label }}</dt>
            <dd>{{ f.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="contact" class="section contact-section" tabindex="-1" aria-labelledby="contact-heading">
      <div class="wrap contact-section__grid">
        <div>
          <p class="eyebrow">03 / Contact</p>
          <h2 id="contact-heading" class="section__title">Have something in mind?</h2>
          <p class="contact-lede">
            Open to interesting software-engineering opportunities and always happy to talk software.
          </p>
          <a class="button contact-cta" :href="`mailto:${site.email}`">Let’s talk →</a>
        </div>
        <ul class="contact-rows">
          <li v-for="c in contacts" :key="c.label">
            <a :href="c.href" rel="noopener">
              <span class="contact-rows__label label">{{ c.label }}</span>
              <span class="contact-rows__handle">{{ c.handle }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
