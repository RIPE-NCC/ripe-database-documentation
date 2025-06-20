<script setup>
import { ref } from 'vue'
import Search from "@swe-database/ncc-vitepress-plugin-search/Search.vue";
import Logo from '../../components/SiteLogo.vue';
const isMenuOpen = ref(false)

const appSwitcher = h('app-switcher', { appenv: 'prod', class: 'gt-xs' })
const userLogin = h('user-login', { accessurl: 'access.ripe.net' })

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="custom-navbar">
    <div class="navbar-left">
      <Logo/>
    </div>
    <div class="navbar-right">
      <app-switcher appenv="prod" class="gt-xs" />
      <user-login accessurl="access.ripe.net" />
    </div>
  </nav>
  <Search />
</template>

<style scoped>
.custom-navbar {
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  color: white;
  font-weight: bold;
  padding: 1rem 2rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 15px 15px;
  user-select: none;
}

.custom-navbar a {
  color: #f0f0f0;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.custom-navbar a:hover {
  color: #ffeb3b;
  text-shadow: 0 0 5px #ffeb3b;
}
</style>