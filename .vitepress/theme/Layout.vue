<script setup lang="ts">
import { useSidebar } from 'vitepress/theme'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import VPFooter from 'vitepress/dist/client/theme-default/components/VPFooter.vue'
import VPSidebar from 'vitepress/dist/client/theme-default/components/VPSidebar.vue'
import VPNav from "./components/VPNav.vue";
import Search from "@swe-database/ncc-vitepress-plugin-search/Search.vue";
const { hasSidebar } = useSidebar()
</script>

<template>
  <div class="VitePressLayout">
    <VPNav />
    <div class="VPSearch">
      <Search />
    </div>
    <VPSidebar v-if="hasSidebar" :open="true" class="sidebar" />
    <VPContent />
    <VPFooter />
  </div>
</template>

<style scoped>
.VitePressLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
