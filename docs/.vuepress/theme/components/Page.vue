<template>
  <main class="page">
    <slot name="top" />
    <div class="custom-theme-content" v-if="$page.frontmatter.theme === 'svg theme'">    
      <Content />
      <slot name="workspace" />
    </div>
    <div class="theme-default-content" v-else>
      <Content />
      <slot name="workspace" />
    </div>
    <footer v-if="$page.frontmatter.footer !== false">
      <PageEdit/>
      <PageNav v-bind="{ sidebarItems }" />
      <slot name="bottom" />
    </footer>
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";
export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
};
</script>

<style lang="stylus">
// @require '@theme/styles/wrapper.styl'
.page
  padding-bottom 2rem
  display block
</style>
