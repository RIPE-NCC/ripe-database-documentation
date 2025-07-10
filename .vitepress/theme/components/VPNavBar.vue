<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import {h, ref, watchPostEffect} from 'vue'
import VPNavBarTitle from 'vitepress/dist/client/theme-default/components/VPNavBarTitle.vue'
import Logo from '../../components/SiteLogo.vue';
import {useSidebar} from "vitepress/theme";
import Search from "@swe-database/ncc-vitepress-plugin-search/dist/Search.vue";

const appSwitcher = h('app-switcher', { appenv: 'prod', class: 'gt-xs' })
const userLogin = h('user-login', { accessurl: 'access.ripe.net' })

const props = defineProps<{
  isScreenOpen: boolean
}>()

defineEmits<{
  (e: 'toggle-screen'): void
}>()

const { y } = useWindowScroll()
const { hasSidebar } = useSidebar()


const classes = ref<Record<string, boolean>>({})

watchPostEffect(() => {
  classes.value = {
    'has-sidebar': hasSidebar.value,
    'top': y.value === 0,
    'screen-open': props.isScreenOpen
  }
})
</script>

<template>
  <div class="VPNavBar" :class="classes">
        <VPNavBarTitle>
          <template #nav-bar-title-before>
            <Logo/>
          </template>
        </VPNavBarTitle>

      <div class="content-body">
        <button id="menu-toggle" class="menu-toggle">
          <span class="menu-text">Menu</span>
          <span class="vpi-align-left menu-icon"></span>
        </button>
        <app-switcher appenv="prod" class="gt-xs" />
        <user-login accessurl="access.ripe.net" />
      </div>
  </div>
</template>



<style scoped>
.VPNavBar {
  align-items: center;
  background: #fff;
  box-shadow: 0 0 9px rgba(0, 0, 0, .3);
  display: flex;
  height: 70px;
  justify-content: space-between;
  left: 0;
  padding-top: var(--ripe-header-padding-top, 0);
  position: fixed;
  top: 0;
  width: 100%;
}

.VPNavBar.screen-open {
  transition: none;
  background-color: var(--vp-nav-bg-color);
  border-bottom: 1px solid var(--vp-c-divider);
}

.VPNavBar:not(.home) {
  background-color: var(--vp-nav-bg-color);
}

user-login, app-switcher {
  line-height: 14px;
}


.content-body {
  pointer-events: none;
}

.content-body :deep(*) {
  pointer-events: auto;
}

@media (min-width: 960px) {
  .VPNavBar.has-sidebar .content-body {
    max-width: 100%;
  }
}


@media (min-width: 960px) {
  .VPNavBar.has-sidebar .title {
    top: 0;
    left: 0;
    z-index: 2;
    padding: 0 32px;
    width: var(--vp-sidebar-width);
    height: var(--vp-nav-height);
  }
}

@media (min-width: 1440px) {
  .VPNavBar.has-sidebar .title {
    padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
    width: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
  }
}

.content-body {
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 1.4rem 0 0;
}

.menu + .translations::before,
.menu + .appearance::before,
.menu + .social-links::before,
.translations + .appearance::before,
.appearance + .social-links::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: "";
}

.menu + .appearance::before,
.translations + .appearance::before {
  margin-right: 16px;
}

.appearance + .social-links::before {
  margin-left: 16px;
}

.social-links {
  margin-right: -8px;
}


@media (min-width: 1440px) {
  .VPNavBar.has-sidebar .divider {
    padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
  }
}

.VPNavBar:not(.home) .divider-line {
  background-color: var(--vp-c-gutter);
}

.vpi-align-left {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M21 6H3M15 12H3M17 18H3'/%3E%3C/svg%3E")
}

[class^=vpi-], [class*=" vpi-"], .vp-icon {
  width: 1em;
  height: 1em;
}

.menu-icon {
  font-size: 14px;
}

</style>