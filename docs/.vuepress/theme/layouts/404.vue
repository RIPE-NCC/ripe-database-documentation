<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <ClientOnly>
      <ripe-header open logo="stat" lighttheme homeurl="/docs/">
		<svg slot="logo-app" version="1.1" height="34px" width="271.11px" id="svglogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 4742.49 594.76" style="enable-background:new 0 0 4742.49 594.76;opacity:0;" xml:space="preserve">
<style type="text/css">
	.st0{fill:url(#SVGID_1_);}
	.st1{fill:#26316A;}
	.st2{fill:#8B8FB0;}
</style>
<g>
	<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="76.7087" y1="584.0011" x2="508.5856" y2="152.1242">
		<stop  offset="0" style="stop-color:#24326A"/>
		<stop  offset="0.0611" style="stop-color:#283369"/>
		<stop  offset="0.1228" style="stop-color:#333567"/>
		<stop  offset="0.1848" style="stop-color:#453864"/>
		<stop  offset="0.2471" style="stop-color:#5B3D5F"/>
		<stop  offset="0.3095" style="stop-color:#764459"/>
		<stop  offset="0.3721" style="stop-color:#964E4E"/>
		<stop  offset="0.4336" style="stop-color:#BF5B3C"/>
		<stop  offset="0.4872" style="stop-color:#ED6B23"/>
		<stop  offset="1" style="stop-color:#9C9C9C"/>
	</linearGradient>
	<path class="st0" d="M444.14,250.86v-0.19l0-162.99L292.65,0.21L141.15,87.68l0,162.99v0.19L0,332.36l0,174.93l151.49,87.47
		l141.15-81.5l141.15,81.5l151.49-87.47l0-174.93L444.14,250.86z M292.65,326.19l-120.48-69.55l120.48-69.56l120.48,69.56
		L292.65,326.19z M161.83,274.74l120.48,69.56l0,138.92l-120.48-69.56L161.83,274.74z M302.99,344.3l120.48-69.56l0,138.92
		l-120.48,69.56L302.99,344.3z M161.83,99.62l130.82-75.53l130.82,75.53l0,139.12l-130.82-75.53l-130.82,75.53L161.83,99.62z
		 M20.68,495.35l0-151.05l120.48-69.56l0,150.86l130.98,75.62l-120.64,69.65L20.68,495.35z M564.62,495.35L433.8,570.88
		l-120.64-69.65l130.98-75.62l0-150.86l120.48,69.56L564.62,495.35z"/>
</g>
<g>
	<path class="st1" d="M941.44,504.86l-82-146.55h-47.11v146.55h-104.1V90.2h181.45c41.29,0,73.28,8.72,99.45,27.92
		c31.99,23.26,48.85,61.65,48.85,102.94c0,50.6-24.43,100.03-78.51,122.13l95.38,161.67H941.44z M876.3,171.62h-64.55v109.91h64.55
		c37.22,0,60.48-21.52,60.48-55.25C936.79,187.91,911.2,171.62,876.3,171.62z"/>
	<path class="st1" d="M1112.99,504.86V90.2h104.1v414.65H1112.99z"/>
	<path class="st1" d="M1488.67,361.21h-86.07v143.64h-103.52V90.2h187.26c91.89,0,145.39,56.41,145.39,133.18
		C1631.73,291.42,1589.86,361.21,1488.67,361.21z M1469.48,171.62h-66.88v109.91h66.88c35.48,0,60.48-18.61,60.48-55.83
		C1529.96,189.65,1506.7,171.62,1469.48,171.62z"/>
	<path class="st1" d="M1695.11,504.86V90.2h305.32v84.33h-201.8v79.09h169.82v83.75h-169.82v82.58h202.96v84.91H1695.11z"/>
	<path class="st1" d="M2199.89,511.25c-57.57,0-109.33-11.63-145.97-56.41l56.99-50.01c18.61,23.26,51.76,38.96,85.49,38.96
		c22.1,0,46.52-5.82,46.52-26.17c0-17.45-15.7-22.1-40.71-26.17c-1.74-1.16-22.68-4.07-23.84-4.07
		c-7.56-1.75-43.62-12.21-49.43-14.54c-37.8-13.38-59.9-36.64-59.9-75.6c0-63.97,53.5-104.68,129.11-104.68
		c61.06,0,100.03,13.96,130.85,50.01l-61.06,46.53c-17.45-19.77-41.87-29.08-66.88-29.08c-25.59,0-41.87,6.98-41.87,23.84
		c0,13.96,13.96,17.45,32.57,20.94c4.65,2.91,35.48,6.4,40.13,7.56c6.4,1.75,36.64,9.89,41.29,12.21
		c43.04,15.12,66.88,44.2,66.88,82C2340.04,481.01,2264.44,511.25,2199.89,511.25z"/>
	<path class="st1" d="M2511.6,272.81V402.5c0,19.19,6.98,27.92,36.64,27.92c9.3,0,23.26-2.33,27.33-2.91v73.28
		c-21.52,5.82-50.01,9.31-67.46,9.31c-46.52,0-91.89-19.19-91.89-83.16V272.81h-39.55v-70.37h38.96v-86.07h95.96v86.07h65.13v70.37
		H2511.6z"/>
	<path class="st1" d="M2815.74,504.86c0-2.33-2.91-31.4-2.91-34.31h-2.33c-25.59,34.31-61.65,40.71-92.47,40.71
		c-58.74,0-101.19-31.4-101.19-88.98c0-72.11,75.02-99.45,136.67-99.45h53.5v-23.84c0-24.42-16.87-38.38-47.69-38.38
		c-30.82,0-45.36,14.54-45.36,30.82v9.3h-85.49v-11.05c0-66.3,66.3-97.12,136.08-97.12c70.37,0,137.83,27.92,137.83,105.26v139.57
		c0,23.26,3.49,61.65,5.82,67.46H2815.74z M2761.08,376.33c-27.92,0-48.27,8.14-48.27,33.15c0,19.77,12.79,33.15,42.45,33.15
		c34.89,0,50.01-19.77,51.18-48.85l0.58-17.45H2761.08z"/>
	<path class="st1" d="M3089.07,272.81V402.5c0,19.19,6.98,27.92,36.64,27.92c9.3,0,23.26-2.33,27.33-2.91v73.28
		c-21.52,5.82-50.01,9.31-67.46,9.31c-46.52,0-91.89-19.19-91.89-83.16V272.81h-39.55v-70.37h38.96v-86.07h95.96v86.07h65.13v70.37
		H3089.07z"/>
	<path class="st2" d="M3543.26,504.86h-173.89V90.2h172.72c92.47,0,169.81,49.43,169.81,145.97v116.89
		C3711.91,456.01,3630.49,504.86,3543.26,504.86z M3533.95,175.11h-61.06v245.42h63.97c37.8,0,70.37-23.84,70.37-66.3l0.58-113.99
		C3607.81,199.54,3575.24,175.11,3533.95,175.11z"/>
	<path class="st2" d="M3916.03,511.83c-73.28,0-147.13-33.73-147.13-122.71v-65.72c0-88.4,73.28-130.85,144.81-130.85
		c73.28,0,147.72,40.13,147.72,128.52v63.39C4061.42,473.45,3984.65,511.83,3916.03,511.83z M3964.3,314.69
		c0-29.08-20.94-48.85-49.43-48.85c-27.33,0-48.85,17.45-48.85,50.6v75.02c0,29.66,19.19,47.69,50.01,47.69
		c26.75,0,48.27-16.28,48.27-48.27V314.69z"/>
	<path class="st2" d="M4262.05,512.42c-73.28,0-148.3-37.22-148.3-125.04v-61.06c0-90.14,73.28-133.76,146.55-133.76
		c71.53,0,141.32,38.38,141.32,113.99v13.38h-93.05v-9.3c0-31.99-22.68-45.36-47.11-45.36c-26.75,0-50.01,14.54-50.01,49.43v75.6
		c0,31.4,20.35,50.01,51.18,50.01c23.84,0,45.36-13.38,45.36-45.36v-8.14h93.63v13.96C4401.62,476.36,4333.58,512.42,4262.05,512.42
		z"/>
	<path class="st2" d="M4584.8,511.25c-57.57,0-109.33-11.63-145.97-56.41l56.99-50.01c18.61,23.26,51.76,38.96,85.49,38.96
		c22.1,0,46.52-5.82,46.52-26.17c0-17.45-15.7-22.1-40.71-26.17c-1.74-1.16-22.68-4.07-23.84-4.07
		c-7.56-1.75-43.62-12.21-49.43-14.54c-37.8-13.38-59.9-36.64-59.9-75.6c0-63.97,53.5-104.68,129.11-104.68
		c61.06,0,100.03,13.96,130.85,50.01l-61.06,46.53c-17.45-19.77-41.87-29.08-66.88-29.08c-25.59,0-41.87,6.98-41.87,23.84
		c0,13.96,13.96,17.45,32.57,20.94c4.65,2.91,35.47,6.4,40.13,7.56c6.4,1.75,36.64,9.89,41.29,12.21
		c43.04,15.12,66.88,44.2,66.88,82C4724.96,481.01,4649.35,511.25,4584.8,511.25z"/>
</g>
</svg>
        <app-switcher appenv="prod" class="gt-xs"/>
        <user-login accessurl="access.ripe.net"></user-login>
      </ripe-header>
    </ClientOnly>
    <Navbar />
    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Page :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #workspace>
        <div class="theme-default-content">
        <h1 id="ripe-atlas-docs-centre">
          <a href="#ripe-atlas-docs-centre" class="header-anchor">#</a>
          Document Not Found
        </h1>
        <p>
          This document does not exist. Use the searchbar above or go
          to the <a href="/docs/">home page</a>.
        </p>
        </div>
      </template>
    </Page>
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";

import NavLinks from "@theme/components/NavLinks.vue";
import { resolveSidebarItems } from "@vuepress/theme-default/util";
// this doesn't work for SSR, but on dev *not* including this
// throws errors (without consequences, but still annoying)
// import "@technical-design/ripe-app-webcomponents";

export default {
  name: "Layout",

  components: {
    Page,
    Navbar,
    NavLinks,
  },
  data() {
    return {
      isSidebarOpen: true,
      dynamicComponent: null,
    };
  },
  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },
  mounted() {
    import("@technical-design/ripe-app-webcomponents").then((_) => {
      const header = document.querySelector("ripe-header");
      header.addEventListener("ripe-header-menu-toggle", (e) => {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.$emit("toggle-sidebar", this.isSidebarOpen);
      });
    });

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>
