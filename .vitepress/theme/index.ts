import { h, nextTick, watch } from 'vue'
import { type Theme, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Logo from '../components/SiteLogo.vue';
// Import custom layouts
import PageLayout from './layouts/Page.vue'
import '@technical-design/ripe-app-webcomponents/style/ripe-app-colors.css';
import '@fontsource-variable/public-sans';
import '@fontsource-variable/public-sans/wght-italic.css'
import '@fontsource-variable/public-sans/wght.css';
import './style.css'
import './fonts.css'
// Import web components
import '@technical-design/ripe-app-webcomponents';
import {
  AppNavBar,
  AppCookieConsent,
  AppSwitcher,
  RipeHeader,
  UserLogin,
  LegalAccordion,
  QuestionMark,
  AppBanner,
} from '@technical-design/ripe-app-webcomponents';
import {compileStyles} from "mermaid/dist/rendering-util/rendering-elements/shapes/handDrawnShapeStyles";

// Prevent tree-shaking
const keepAliveComponents = [
  AppNavBar,
  AppCookieConsent,
  AppSwitcher,
  RipeHeader,
  UserLogin,
  LegalAccordion,
  QuestionMark,
  AppBanner
];

// Highlight the current sidebar item based on the current path
function highlightSidebar(path: string) {
  if (typeof document !== "undefined") {
    document.querySelectorAll(".VPSidebarItem.is-link").forEach((sidebarItem) => {
      const link = sidebarItem.querySelector("a");
      if (!link) return;

      const href = link.getAttribute("href")?.replace(/\/$/, "");
      if (!href) return;

      const normalizedPath = path.replace(/\/$/, "");
      const cleanedPath = normalizedPath.replace(/_index$/, "");
      const cleanedHref = href.replace(/_index$/, "");

      if (cleanedPath === cleanedHref) {
        sidebarItem.classList.add("is-active", "has-active");
      } else {
        sidebarItem.classList.remove("is-active", "has-active");
      }
    });
  }
}

// Use click events for expansion
function expandSidebarForCurrentPath() {
	if (typeof document === "undefined") return;

	// Get the current path
	const currentPath = window.location.pathname;
	// console.log(`🚀 Expanding sidebar for path: ${currentPath}`);
  
	// Find the current page's link element
	const currentPageLink = document.querySelector(`a[href="${currentPath}"]`) || 
							document.querySelector(`a[href="${currentPath}/"]`);

	if (!currentPageLink) {
	console.log(`⚠️ Couldn't find link for current path: ${currentPath}`);
	return;
	}
  
	// Identify all parent collapsible items that need expanding
	let itemsToExpand: HTMLElement[] = [];
	let element: HTMLElement | null = currentPageLink.parentElement;

	while (element && element instanceof HTMLElement) {
	if (element.classList.contains("VPSidebarItem") && element.classList.contains("collapsible")) {
		if (element.classList.contains("collapsed")) {
		itemsToExpand.push(element);
		}
	}
	element = element.parentElement as HTMLElement | null;
	}

	// Click the toggle element of each collapsed parent, starting from the top level
	itemsToExpand.reverse().forEach(item => {
	const toggle = item.querySelector('.item[role="button"]');
	if (toggle) {
		// console.log(`Clicking toggle for:`, item.querySelector('.text')?.textContent);
		// Simulate a click event
		(toggle as HTMLElement).click();
	}
	});
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { frontmatter } = useData()

    const appSwitcher = h('app-switcher', { appenv: 'prod', class: 'gt-xs' })
    const userLogin = h('user-login', { accessurl: 'access.ripe.net' })
    const logo = h(Logo);
    if (frontmatter.value?.layout === 'custom') {
        // console.log("USING CUSTOM DOC LAYOUT");
        return h(PageLayout, { frontmatter: frontmatter.value }, {
          // Pass the header components as slots
          'nav-bar-content-after': () => [appSwitcher, userLogin],
          'nav-bar-title-before': () => logo
        })
      } else {
        // console.log("USING DEFAULT LAYOUT");
      }
      return h(DefaultTheme.Layout, null, {
        'nav-bar-content-after': () => [appSwitcher, userLogin],
        'nav-bar-title-before': () => logo
      })
  },

  enhanceApp({ app, router }) {
    // console.log("🚀 enhanceApp is running!");
    // Register global components
    // Disable internal prefetch function
    (globalThis as any).__vitepress__usePrefetch = () => false;
    const createJS = () => {
      if (typeof window === 'undefined') return;

      const url = new URL(window.location.href);
      if (url.searchParams.has('js')) return;

      url.searchParams.set('js', 'true');
      window.location.replace(url.toString());
    };

    createJS();

    nextTick(() => {
      // Set up route change handling for highlighting
      watch(
        () => router.route.path,
        (newPath, oldPath) => {
          // console.log(`🔄 Route changed: ${oldPath} -> ${newPath}`);

          // Preserve existing sidebar highlighting logic
          setTimeout(() => {
            highlightSidebar(newPath);
            expandSidebarForCurrentPath();
          }, 300);
        }
      );

      // Set up initial sidebar expansion for the current page
      if (typeof window !== 'undefined') {
        // On page load
        window.addEventListener('load', () => {
          // console.log("🏁 Page loaded, expanding sidebar");
          setTimeout(() => {
            expandSidebarForCurrentPath();
          }, 300);
        });

        // Also try immediately (for cases where the load event might have already fired)
        setTimeout(() => {
          expandSidebarForCurrentPath();
        }, 300);
      }
    });
  }
} satisfies Theme