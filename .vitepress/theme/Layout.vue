<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import VPFooter from 'vitepress/dist/client/theme-default/components/VPFooter.vue'
import VPSidebar from 'vitepress/dist/client/theme-default/components/VPSidebar.vue'
import VPNavBar from './components/VPNavBar.vue'

const { frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <div class="VitePressLayout">
    <VPNavBar />

    <div class="VitePressLayout__container">
      <VPSidebar v-if="hasSidebar" :open="true" class="sidebar" />

      <div class="main">
        <VPContent />
        <VPFooter />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VitePressLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.VitePressLayout__container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 272px;
  border-right: 1px solid var(--vp-c-divider);
}

.main {
  flex: 1;
  padding: 1rem 2rem;
}
</style>
