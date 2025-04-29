<template>
  <div class="zoom-container">
    <div class="zoom-controls">
      <button @click="zoomIn">Zoom In</button>
      <button @click="zoomOut">Zoom Out</button>
    </div>
    <div ref="svgContainer" class="svg-wrapper">
      <img :src="src" alt="Diagram" ref="svgImage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const panzoom = (await import('@panzoom/panzoom')).default;

defineProps<{ src: string }>();

const svgImage = ref<HTMLImageElement | null>(null);
let zoomInstance: ReturnType<typeof panzoom> | null = null;

const zoomIn = () => zoomInstance?.zoomIn();
const zoomOut = () => zoomInstance?.zoomOut();

onMounted(() => {
  if (svgImage.value) {
    zoomInstance = panzoom(svgImage.value, {
      maxScale: 5,
      minScale: 0.5
    });
  }
});
</script>

<style scoped>
.zoom-controls {
  text-align: center;
  margin-bottom: 10px;
}
button {
  margin: 0 5px;
  padding: 6px 10px;
}
.svg-wrapper {
  overflow: hidden;
  text-align: center;
}
</style>
