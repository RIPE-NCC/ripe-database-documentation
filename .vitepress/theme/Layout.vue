<script setup lang="ts">
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import VPFooter from 'vitepress/dist/client/theme-default/components/VPFooter.vue'
import VPSidebar from 'vitepress/dist/client/theme-default/components/VPSidebar.vue'
import VPNav from "./components/VPNav.vue";
import Search from "@swe-database/ncc-vitepress-plugin-search/Search.vue";
import {computed, onMounted} from 'vue'

const { hasSidebar } = useSidebar()
const { frontmatter } = useData()

const showTopSearch = computed(() => frontmatter.value.searchPosition !== 'inside')

onMounted(() => {
  const toggle = document.getElementById('menu-toggle')
  const sidebar = document.querySelector('.VPSidebar')

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('show')
    })
  }
})
</script>

<template>
  <div :class="{ 'with-top-search': showTopSearch }" class="VitePressLayout">>
    <VPNav />
    <div class="VPSearch" v-if="frontmatter.searchPosition !== 'inside'">
      <Search />
    </div>
    <VPSidebar v-if="hasSidebar" :open="true" class="sidebar" />
    <VPContent/>
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
