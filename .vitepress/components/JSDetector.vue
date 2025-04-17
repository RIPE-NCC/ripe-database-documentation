<script setup>
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (url.searchParams.has('js')) return;

  url.searchParams.set('js', 'true');
  window.location.replace(url.toString());
});
</script>

<template>
  <!-- Nothing is rendered -->
</template>