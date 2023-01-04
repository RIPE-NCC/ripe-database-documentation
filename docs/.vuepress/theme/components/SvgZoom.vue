<template></template>
<script>
import * as d3 from "d3";
export default {
    name: "svgZoom",
    mounted() {
        window.addEventListener('load', function () {
            // Create buttons
            let div = document.querySelector("div[id^='mermaid']");
            let p = document.createElement("p");

            let zoom_in = document.createElement("button");
            zoom_in.type="submit"
            zoom_in.name="zoom_in";
            zoom_in.innerHTML="Zoom in";
            zoom_in.id="zoom_in";

            console.log(div)

            let zoom_out = document.createElement("button");
            zoom_out.type="submit"
            zoom_out.name="zoom_out";
            zoom_out.innerHTML="Zoom out";
            zoom_out.id="zoom_out";

            p.append(zoom_in); 
            p.append(zoom_out); 
            div.parentNode.insertBefore(p,div);


            //Zoom logic

            console.log("a1")
            //let zoom = d3.zoom().on("zoom", zoomed);

            let svg = d3.select("svg[id^='mermaid']")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("background-color", "#eeeeee");
            svg.html("<g>" + svg.html() + "</g>");
            var inner = svg.select("g");

            var zoom = d3.zoom().on("zoom", function(event) {
                inner.attr("transform", event.transform);
            });
            /*d3.select("#zoom_in").on("click", function() {
                console.log("zoom in");
                zoom.scaleBy(svg.transition().duration(750), 1.2);
            });
            d3.select("#zoom_out").on("click", function() {
                console.log("zoom out");
                zoom.scaleBy(svg.transition().duration(750), 0.8);
            });*/

            svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(-880.3226965549293,-755.7167138457196).scale(1.7195129724860199));
        });
        
    }
}
</script>