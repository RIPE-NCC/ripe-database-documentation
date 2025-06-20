<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import DefaultContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import DefaultSidebar from 'vitepress/dist/client/theme-default/components/VPSidebar.vue'
import DefaultFooter from 'vitepress/dist/client/theme-default/components/VPFooter.vue'
import VPNavBar from "../components/VPNavBar.vue";

</script>

<template>
  <div class="vp-doc">
    <VPNavBar />
    <DefaultSidebar :open="true"/>
    <main class="vp-main">
      <DefaultContent />
      <DefaultFooter />
    </main>
  </div>
</template>

<style>
/* Optional: copy or tweak styles from default Layout */
.vp-doc {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

.vp-main {
  flex-grow: 1;
  padding: 2rem;
}
</style>