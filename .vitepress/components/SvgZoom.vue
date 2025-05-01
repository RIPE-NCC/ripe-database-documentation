<template>
  <div id="svg_inside_div" class="zoom-controls">
    <button id="zoom_in" @click="zoom(1)">Zoom in</button>
    <button id="zoom_out" @click="zoom(-1)">Zoom out</button>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import * as panzoomModule from '@panzoom/panzoom';
import type { PanzoomObject } from '@panzoom/panzoom';
const panzoom = panzoomModule.default;

let panzoomInstance: PanzoomObject | null = null;

const zoom = (direction: number) => {
  if (panzoomInstance) {
    direction === -1 ? panzoomInstance.zoomOut() : panzoomInstance.zoomIn();
  }
};

onMounted(() => {
  const checkMermaidLoaded = setInterval(() => {
    const div = document.querySelector('.diagram-container');
    if (div) {
      clearInterval(checkMermaidLoaded);
      const insideDiv = document.getElementById('svg_inside_div');
      if (insideDiv) {
        div.parentNode?.insertBefore(insideDiv, div);
      }
      const svg = div.querySelector('img');
      if (svg) {
        panzoomInstance = panzoom(svg as HTMLElement, { maxScale: 5 });
      }
    }
  }, 300);
});
</script>

<style lang="stylus">
svg[id^="diagram-container"] {
  width: 100%;
  height: 100%;
  overflow: scroll;
  z-index: 2;
}
.vuepress-mermaid{
  overflow: scroll;
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
#svg_inside_div {
  text-align: center;
  padding: 9px 4px 9px 4px;
  z-index: 1;
  position: relative;
  background-color: var(--mdc-text-field-fill-color, white);
}
#route-object-creation-flowchart, #domain-object-creation-flowchart{
  text-align: center;
  position: relative;
  z-index: 1;
  background-color: var(--mdc-text-field-fill-color, white);
}
</style>