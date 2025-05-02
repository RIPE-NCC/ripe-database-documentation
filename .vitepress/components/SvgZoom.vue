<template>
  <div id="svg_inside_div" class="svg-zoom-wrapper">
    <div class="zoom-controls">
      <button id="zoom_out" @click="zoom(-1)">➖ Zoom Out</button>
      <button id="zoom_in" @click="zoom(1)">➕ Zoom In</button>
    </div>
    <div ref="container" class="svg-container" v-html="svgContent" />
    <noscript>
      <img :src="props.src" alt="Diagram" />
    </noscript>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import * as panzoomModule from '@panzoom/panzoom';
const panzoom = panzoomModule.default;

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const container = ref(null);
const svgContent = ref('');
let panzoomInstance = null;

const loadSvg = async () => {
  try {
    const res = await fetch(props.src);
    svgContent.value = await res.text();
  } catch (err) {
    console.error(`Failed to load SVG from ${props.src}:`, err);
  }
};

const zoom = (direction: number) => {
  if (panzoomInstance) {
    direction === -1 ? panzoomInstance.zoomOut() : panzoomInstance.zoomIn();
  }
};

const setupPanzoom = () => {
  if (!container.value) return;

  // Only select <svg> directly inside this component's container
  const svgEl = container.value.querySelector(':scope > svg');
  if (svgEl) {
    panzoomInstance = panzoom(svgEl, {
      maxScale: 5,
      minScale: 0.5,
    });
  } else {
    console.warn('SVG element not found inside container.');
  }
};

onMounted(async () => {
  await loadSvg();
  await nextTick(); // Wait for svgContent to render into DOM
  setupPanzoom();
});

watch(() => props.src, async () => {
  if (panzoomInstance) panzoomInstance.destroy();
  await loadSvg();
  await nextTick(); // Wait for re-render
  setupPanzoom();
});
</script>


<style lang="stylus">

.svg-container {
  width: 100%;
  height: 100%;
  z-index: 2;
}

#my-svg .decisionNodes text {
  font-size: 18px;
  font-weight: bold;
}

#my-svg foreignObject {
  height: 100px //by default set to 38, some lines are cut
}

#svg_inside_div {
  text-align: center;
  padding: 9px 4px 9px 4px;
  z-index: 1;
  position: relative;
  background-color: var(--mdc-text-field-fill-color, white);
}

.zoom-controls {
  text-align: center;
  margin: 10px 0;
}

#zoom_in, #zoom_out {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 8px 12px;
  margin: 0 4px;
  background-color: #f9f9f9;
  border-radius: 4px;
  font-size: 14px;
}
#zoom_in:hover, #zoom_out:hover {
  background-color: #e0e0e0;
}

</style>
