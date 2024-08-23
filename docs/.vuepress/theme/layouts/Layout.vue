<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <ClientOnly>
      <ripe-header open logo="ris" lighttheme homeurl="/docs/" v-if="$page.frontmatter.navbar !== false">
      <svg id="svglogo" slot="logo-app" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      	 viewBox="0 0 5820.92 550.74" style="enable-background:new 0 0 5820.92 550.74;opacity:0;" xml:space="preserve">
      <style type="text/css">
      	.st0{fill:url(#SVGID_1_);}
      	.st1{fill:#26316A;}
      	.st2{fill:#8B8FB1;}
      </style>
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="69.0952" y1="525.8441" x2="458.1069" y2="136.8323">
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
      <path class="st0" d="M400.06,225.77v-0.17l0-146.82L263.6,0L127.14,78.78l0,146.82v0.17L0,299.18l0,157.57l136.46,78.79
      	l127.14-73.41l127.14,73.41l136.46-78.79l0-157.57L400.06,225.77z M263.6,293.63l-108.52-62.65l108.52-62.66l108.52,62.66
      	L263.6,293.63z M145.77,247.28l108.52,62.65l0,125.13l-108.52-62.65L145.77,247.28z M272.91,309.93l108.52-62.65l0,125.13
      	l-108.52,62.65L272.91,309.93z M145.77,89.54L263.6,21.5l117.83,68.03l0,125.31L263.6,146.82l-117.83,68.03L145.77,89.54z
      	 M18.63,445.99l0-136.06l108.52-62.65l0,135.89l117.98,68.12l-108.67,62.74L18.63,445.99z M508.58,445.99l-117.83,68.03
      	l-108.67-62.74l117.98-68.12l0-135.89l108.52,62.65L508.58,445.99z"/>
      <g>
      	<path class="st1" d="M850.97,456.35l-73.88-133.39h-42.44v133.39h-93.8V78.95h163.49c37.2,0,66.02,7.94,89.6,25.41
      		c28.82,21.17,44.02,56.11,44.02,93.69c0,46.05-22.01,91.04-70.74,111.16l85.94,147.15H850.97z M792.28,153.05h-58.16v100.04h58.16
      		c33.54,0,54.5-19.58,54.5-50.28C846.78,167.87,823.72,153.05,792.28,153.05z"/>
      	<path class="st1" d="M1005.55,456.35V78.95h93.8v377.4H1005.55z"/>
      	<path class="st1" d="M1344.06,325.61h-77.55v130.74h-93.27V78.95h168.73c82.79,0,131,51.34,131,121.21
      		C1472.96,262.09,1435.23,325.61,1344.06,325.61z M1326.76,153.05h-60.26v100.04h60.26c31.96,0,54.5-16.94,54.5-50.81
      		C1381.26,169.46,1360.3,153.05,1326.76,153.05z"/>
      	<path class="st1" d="M1530.08,456.35V78.95h275.1v76.75h-181.83v71.99h153.01v76.22h-153.01v75.16h182.88v77.28H1530.08z"/>
      	<path class="st1" d="M2171.98,456.35H2015.3V78.95h155.63c83.32,0,153.01,44.99,153.01,132.86V318.2
      		C2323.94,411.89,2250.58,456.35,2171.98,456.35z M2163.59,156.23h-55.02V379.6h57.64c34.06,0,63.4-21.7,63.4-60.34l0.52-103.75
      		C2230.14,178.46,2200.8,156.23,2163.59,156.23z"/>
      	<path class="st1" d="M2550.83,456.35c0-2.12-2.62-28.58-2.62-31.23h-2.1c-23.06,31.23-55.54,37.05-83.32,37.05
      		c-52.92,0-91.18-28.58-91.18-80.98c0-65.63,67.6-90.51,123.14-90.51h48.21v-21.7c0-22.23-15.2-34.93-42.97-34.93
      		s-40.87,13.23-40.87,28.05v8.47h-77.03V260.5c0-60.34,59.74-88.39,122.62-88.39c63.4,0,124.19,25.41,124.19,95.8v127.04
      		c0,21.17,3.14,56.11,5.24,61.4H2550.83z M2501.57,339.37c-25.15,0-43.49,7.41-43.49,30.17c0,18,11.53,30.17,38.25,30.17
      		c31.44,0,45.06-18,46.11-44.46l0.52-15.88H2501.57z"/>
      	<path class="st1" d="M2797.12,245.15v118.04c0,17.47,6.29,25.41,33.01,25.41c8.38,0,20.96-2.12,24.63-2.65v66.69
      		c-19.39,5.29-45.06,8.47-60.78,8.47c-41.92,0-82.79-17.47-82.79-75.69V245.15h-35.63v-64.05h35.11v-78.34h86.46v78.34h58.69v64.05
      		H2797.12z"/>
      	<path class="st1" d="M3071.17,456.35c0-2.12-2.62-28.58-2.62-31.23h-2.1c-23.06,31.23-55.54,37.05-83.32,37.05
      		c-52.92,0-91.18-28.58-91.18-80.98c0-65.63,67.6-90.51,123.14-90.51h48.21v-21.7c0-22.23-15.2-34.93-42.97-34.93
      		s-40.87,13.23-40.87,28.05v8.47h-77.03V260.5c0-60.34,59.74-88.39,122.62-88.39c63.4,0,124.19,25.41,124.19,95.8v127.04
      		c0,21.17,3.14,56.11,5.24,61.4H3071.17z M3021.91,339.37c-25.15,0-43.49,7.41-43.49,30.17c0,18,11.53,30.17,38.25,30.17
      		c31.44,0,45.06-18,46.11-44.46l0.52-15.88H3021.91z"/>
      	<path class="st1" d="M3370.37,463.23c-26.72,0-52.4-12.7-68.12-32.82h-1.57v25.94h-84.36V78.95h86.46v131.27h0.52
      		c19.91-26.47,49.26-38.11,75.98-38.11c61.83,0,102.18,38.64,102.18,103.22v84.16C3481.46,424.06,3430.63,463.23,3370.37,463.23z
      		 M3394.48,284.85c0-29.11-20.44-44.99-45.06-44.99c-22.01,0-46.64,12.17-46.64,50.28v64.05c0,30.7,24.1,44.46,47.16,44.46
      		c22.53,0,44.54-13.76,44.54-46.05V284.85z"/>
      	<path class="st1" d="M3704.69,456.35c0-2.12-2.62-28.58-2.62-31.23h-2.1c-23.06,31.23-55.54,37.05-83.32,37.05
      		c-52.92,0-91.18-28.58-91.18-80.98c0-65.63,67.6-90.51,123.14-90.51h48.21v-21.7c0-22.23-15.2-34.93-42.97-34.93
      		c-27.77,0-40.87,13.23-40.87,28.05v8.47h-77.03V260.5c0-60.34,59.74-88.39,122.62-88.39c63.4,0,124.19,25.41,124.19,95.8v127.04
      		c0,21.17,3.14,56.11,5.24,61.4H3704.69z M3655.43,339.37c-25.15,0-43.49,7.41-43.49,30.17c0,18,11.53,30.17,38.25,30.17
      		c31.44,0,45.06-18,46.11-44.46l0.52-15.88H3655.43z"/>
      	<path class="st1" d="M3963.02,462.17c-51.88,0-98.51-10.59-131.52-51.34l51.35-45.52c16.77,21.17,46.64,35.46,77.03,35.46
      		c19.91,0,41.92-5.29,41.92-23.82c0-15.88-14.15-20.11-36.68-23.82c-1.57-1.06-20.44-3.71-21.48-3.71
      		c-6.81-1.59-39.3-11.12-44.54-13.23c-34.06-12.17-53.97-33.35-53.97-68.81c0-58.22,48.21-95.28,116.33-95.28
      		c55.02,0,90.13,12.7,117.9,45.52l-55.02,42.34c-15.72-18-37.73-26.47-60.26-26.47c-23.06,0-37.73,6.35-37.73,21.7
      		c0,12.7,12.58,15.88,29.34,19.06c4.19,2.65,31.96,5.82,36.16,6.88c5.76,1.59,33.01,9,37.2,11.12
      		c38.78,13.76,60.26,40.23,60.26,74.63C4089.31,434.65,4021.19,462.17,3963.02,462.17z"/>
      	<path class="st1" d="M4219.79,345.72v6.35c0,28.58,35.11,43.4,62.88,43.4c25.15,0,55.54-13.23,67.6-18.53l25.68,61.93
      		c-27.25,14.82-56.07,24.35-107.42,24.35c-66.02,0-136.76-33.88-136.76-113.8v-55.58c0-82.57,66.02-121.74,132.05-121.74
      		c64.45,0,127.33,35.46,127.33,103.75v69.87H4219.79z M4307.29,279.56c0-29.11-20.44-41.29-42.44-41.29
      		c-24.63,0-45.06,13.76-45.06,44.99v10.06h87.51V279.56z"/>
      </g>
      <path class="st2" d="M4755.47,460.2h-153.91V92.99h152.98c81.93,0,150.33,43.84,150.33,129.19v103.54
      	C4904.71,416.98,4832.73,460.2,4755.47,460.2z M4747.23,168.24h-54.1v217.34h56.59c33.42,0,62.34-21.14,62.34-58.77l0.47-100.9
      	C4812.52,189.85,4783.76,168.24,4747.23,168.24z"/>
      <path class="st2" d="M5085.52,466.42c-64.83,0-130.28-29.85-130.28-108.67v-58.14c0-78.35,64.83-115.82,128.26-115.82
      	c64.83,0,130.75,35.6,130.75,113.8v56.12C5214.24,432.37,5146.3,466.42,5085.52,466.42z M5128.27,291.83
      	c0-25.81-18.5-43.22-43.84-43.22c-24.25,0-43.22,15.39-43.22,44.77v66.38c0,26.27,16.95,42.29,44.31,42.29
      	c23.63,0,42.75-14.46,42.75-42.75V291.83z"/>
      <path class="st2" d="M5391.94,466.88c-64.83,0-131.37-32.96-131.37-110.69v-54.1c0-79.75,64.83-118.46,129.81-118.46
      	c63.27,0,125.15,34.05,125.15,100.9v11.82h-82.4v-8.24c0-28.29-20.05-40.11-41.66-40.11c-23.63,0-44.31,12.9-44.31,43.84v67.01
      	c0,27.83,18.03,44.31,45.4,44.31c21.14,0,40.11-11.82,40.11-40.11v-7.15h82.86v12.44C5515.53,435.01,5455.37,466.88,5391.94,466.88z
      	"/>
      <path class="st2" d="M5677.68,465.95c-50.99,0-96.85-10.26-129.19-49.9l50.53-44.31c16.48,20.52,45.86,34.51,75.71,34.51
      	c19.59,0,41.2-5.13,41.2-23.16c0-15.39-13.84-19.59-36.07-23.16c-1.55-1.09-20.05-3.58-21.14-3.58
      	c-6.69-1.55-38.56-10.88-43.84-12.9c-33.42-11.82-53.01-32.49-53.01-67.01c0-56.59,47.42-92.66,114.27-92.66
      	c54.1,0,88.62,12.44,115.82,44.31l-54.1,41.2c-15.39-17.57-37-25.81-59.23-25.81c-22.7,0-37,6.22-37,21.14
      	c0,12.44,12.44,15.39,28.92,18.5c4.04,2.64,31.4,5.6,35.6,6.68c5.6,1.55,32.49,8.71,36.53,10.88c38.09,13.37,59.23,39.18,59.23,72.6
      	C5801.9,439.21,5734.89,465.95,5677.68,465.95z"/>
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
        <!-- Add static path to reach the generated documentation-->
        <ul class="sidebar-links">
          <li><a href="/docs/terms-conditions" aria-current="page" class="sidebar-link">Terms and Conditions</a></li>
          <li><a href="/docs/acceptable-use-policy" aria-current="page" class="sidebar-link">Acceptable Use Policy</a></li>
          <li><a href="/docs/entire-documentation-HTML" aria-current="page" class="sidebar-link">Entire Documentation HTML</a></li>
        </ul>
      </template>
    </Sidebar>
    
    <Home v-if="$page.frontmatter.home"></Home>

    <Page v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #workspace>
        <slot name="page-workspace" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>

    <component is="noscript" v-if="$page.frontmatter.navbar !== false">
      <meta http-equiv="refresh" content="0; url='/docs/entire-documentation-HTML'" />
    </component>

  </div>
</template>

<script>
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";

import SearchBox from "@SearchBox";
import NavLinks from "@theme/components/NavLinks.vue";
import { resolveSidebarItems } from "@vuepress/theme-default/util";
// this doesn't work for SSR, but on dev *not* including this
// throws errors (without consequences, but still annoying)

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    SearchBox,
    NavLinks,
  },
  data() {
    return {
      isSidebarOpen: false,
      dynamicComponent: null,
      ripeComponentsLoaded: false,
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
    }
  },
  mounted() {
    import("@technical-design/ripe-app-webcomponents").then((_) => {
      const header = document.querySelector("ripe-header");
      header.addEventListener("ripe-header-menu-toggle", (e) => {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.$emit("toggle-sidebar", this.isSidebarOpen);
      });
      this.ripeComponentsLoaded = true;
      // minimize slow loading logo fill in your svg logo id below, and add opacity=0 to the style declaration of your svg logo
      document.getElementById("svglogo").style.opacity = 1;
    });

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },
  updated() {
    if (this.ripeComponentsLoaded) {
      document.getElementById("svglogo").style.opacity = 1;
    }
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
