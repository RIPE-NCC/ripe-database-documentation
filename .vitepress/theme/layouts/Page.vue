<!-- Page.vue -->
<script setup>
import { defineProps } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { frontmatter } = useData()

defineProps({
  frontmatter: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- Your custom doc content -->
    <template #doc-before>
      <div style="background-color: yellow; padding: 20px; border: 5px solid red; margin-bottom: 20px;">
        <h1>{{ frontmatter.title || "Custom Doc" }}</h1>
      </div>
    </template>

    <!-- Include slots for header customizations -->
    <template #nav-bar-content-after>
      <slot name="nav-bar-content-after"></slot>
    </template>

    <template #nav-bar-title-before>
      <slot name="nav-bar-title-before"></slot>
    </template>
  </DefaultTheme.Layout>
</template>