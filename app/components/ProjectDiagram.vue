<script setup lang="ts">
import type { DiagramId } from '~/config/work'

/**
 * Hand-authored structural diagrams. These are real text in real elements — not
 * images — so they reflow at any width, read correctly to a screen reader and
 * inherit the theme. They stand in for product screenshots deliberately: they
 * describe structure that is safe to publish, which a screenshot is not.
 *
 * Ids are validated at build time by scripts/generate-content.mjs (DIAGRAMS).
 * `caption` needs an explicit default: Vue casts an absent boolean prop to false.
 */
withDefaults(defineProps<{ id: DiagramId; caption?: boolean }>(), { caption: true })
</script>

<template>
  <figure v-if="id === 'navfarm-tenancy'" class="dg">
    <figcaption v-if="caption" class="dg__cap label">Tenancy model</figcaption>
    <ol class="dg__levels">
      <li class="dg__level">
        <span class="dg__node">Platform</span>
      </li>
      <li class="dg__level">
        <span class="dg__group">
          <span class="dg__node dg__node--accent">Tenant</span>
          <span class="dg__note">provisioned with isolated data</span>
        </span>
      </li>
      <li class="dg__level">
        <span class="dg__node">Companies</span>
        <span class="dg__node">Operational areas</span>
      </li>
      <li class="dg__level dg__level--leaves">
        <span class="dg__leaf">Piggery</span>
        <span class="dg__leaf">Hatchery</span>
        <span class="dg__leaf">Shrimp</span>
      </li>
    </ol>
  </figure>

  <figure v-else-if="id === 'navcrm-surfaces'" class="fl">
    <figcaption v-if="caption" class="fl__cap label">Surfaces</figcaption>
    <ol class="fl__stages">
      <li class="fl__stage">
        <p class="fl__label label">Clients</p>
        <span class="fl__node">React Native app</span>
        <span class="fl__node">Web interface</span>
      </li>
      <li class="fl__stage">
        <p class="fl__label label">Boundary</p>
        <span class="fl__node fl__node--accent">HTTP API</span>
      </li>
      <li class="fl__stage">
        <p class="fl__label label">Server</p>
        <span class="fl__node">Application services</span>
        <span class="fl__node">Database</span>
      </li>
    </ol>
  </figure>
</template>
