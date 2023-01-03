<template></template>
<script>
import * as d3 from "d3";
export default {
    name: "svgZoom",
    mounted() {
        window.addEventListener('load', function () {
            var svgs = d3.selectAll("svg[id^='mermaid']");
            svgs.each(function() {
                var svg = d3.select(this);
                svg.html("<g>" + svg.html() + "</g>");
                var inner = svg.select("g");
                var zoom = d3.zoom().on("zoom", function(event) {
                    inner.attr("transform", event.transform);
                });
                svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(-880.3226965549293,-755.7167138457196).scale(1.7195129724860199));
            });
        });
    }
}
</script>