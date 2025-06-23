<script setup lang="ts">
import { inBrowser } from 'vitepress'
import { computed, provide, watchEffect } from 'vue'
import { useData } from 'vitepress'

import VPNavBar from './VPNavBar.vue'
import VPNavScreen from 'vitepress/dist/client/theme-default/components/VPNavScreen.vue'
import {useNav} from "../composables/useNav";
const { isScreenOpen, closeScreen, toggleScreen } = useNav()
const { frontmatter } = useData()

const hasNavbar = computed(() => {
  return frontmatter.value.navbar !== false
})

provide('close-screen', closeScreen)

watchEffect(() => {
  if (inBrowser) {
    document.documentElement.classList.toggle('hide-nav', !hasNavbar.value)
  }
})
</script>

<template>
  <header v-if="hasNavbar" class="VPNav">
    <VPNavBar is-screen-open/>
    <VPNavScreen :open="isScreenOpen">
      <template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
      <template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>
    </VPNavScreen>
  </header>
</template>

<style scoped>
.VPNav {
  display: flex;
  height: 70px;
  position: sticky;
  top: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 99999;
}

@media (min-width: 960px) {
  .VPNav {
    position: fixed;
  }
}
</style>