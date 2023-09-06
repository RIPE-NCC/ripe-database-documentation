<template>
    <div id="svg_inside_div">
        <button type="submit" id="zoom_in" name="zoom_in" @click="zoom(1)">Zoom in</button>
        <button type="submit" id="zoom_out" name="zoom_out" @click="zoom(-1)">Zoom out</button>
    </div>
</template>
<script>
import Panzoom from '@panzoom/panzoom'
export default {
    name: "svgZoomComponent",
    mounted() {
        let div = document.querySelector("div[id^='mermaid']");
        let insideDiv = document.getElementById("svg_inside_div");
        div.parentNode.insertBefore(insideDiv,div);


        this.panzoom = Panzoom(document.querySelector("div[id^='mermaid']"), {
            maxScale: 5
        })
    },
    methods: {
        zoom(event){
            event === -1 ? this.panzoom.zoomOut() : this.panzoom.zoomIn()
        }
    }
}
</script>

<style lang="stylus">
svg[id^="mermaid"] {
    width: 100%;
    height: 100%;
    overflow: scroll;
    z-index: 2;
}
.vuepress-mermaid{
    overflow: scroll;
}
#svg_inside_div {
    text-align: center;
    padding: 9px 4px 9px 4px;
    z-index: 1;
    position: relative;
    background-color: var(--mdc-text-field-fill-color, white);
}
#zoom_in, #zoom_out{
    cursor: pointer;
    border: 1px solid white;
    width: 10%;
    padding: 9px 4px 9px 4px;
    background-image: url("assets/zoom-in.png");
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 10px center;
}

#zoom_out{
    background-image: url("assets/zoom-out.png");
}

#route-object-creation-flowchart, #domain-object-creation-flowchart{
    text-align: center;
    position: relative;
    z-index: 1;
    background-color: var(--mdc-text-field-fill-color, white);
}
</style>