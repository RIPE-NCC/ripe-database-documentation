---
theme: svg theme
title: Appendix-E--Domain-Object-Creation-Flowchart
---
<script setup>
    import svgZoomComponent from '../.vuepress/components/SvgZoom.vue'
</script>
<svgZoomComponent />

# Domain Object Creation Flowchart

```mermaidjs
flowchart TB
A[Begin]:::initLastNodes --> B{Is there an exact <br> match inetnum?}:::decisionNodes
B --> |Yes| C[I=matching <br> inetnum?]:::operationNodes
B --> |No| D{Is there a less <br> specific inetnum?}:::decisionNodes
C --> E{Does 'I' have <br> 'mnt-domains:'?}:::decisionNodes
D --> |Yes| C
D --> |No| F{Is there a less <br> specific domain?}:::decisionNodes



E --> |Yes| G[Check the authorisation <br> using the maintainers <br> mentioned in the 'mnt-domains']:::operationNodes
E --> |No| H{Does 'I' have <br> 'mnt-lower:'?}:::decisionNodes

F --> |Yes| I[D=matching domain]:::operationNodes
F --> |No| J{reject creation}:::initLastNodes
G --> K{Is the <br> authorisation successful?}:::decisionNodes
H --> |Yes| L[Check the authorisation <br> using the maintainers <br> mentioned in 'mnt-lower']:::operationNodes
H --> |No| M[Check the authorisation <br> using the maintainers <br> mentioned in 'mnt-by']:::operationNodes
I --> N{Does 'D' have 'mnt -lower'?}:::decisionNodes
K --> |Yes| O{accept creation}:::initLastNodes
K --> |No| F
L --> K
M --> K


N --> |Yes| P[check the authorisation <br> using the maintainers <br> mentioned in 'mnt-lower']:::operationNodes
N --> |No| Q{Does 'D' have 'mnt-by:'?}:::decisionNodes

P --> R{Is the authorisation <br> successful?}:::decisionNodes

Q --> |Yes| S[Check the authorisation <br> using the maintainers <br> mentioned in 'mnt-by']:::operationNodes
Q --> |No| J

R --> |Yes| O
R --> |No| J

S --> R


%% Class Definitions
%% =================

classDef initLastNodes fill:#a4a1c4,stroke:#9b96cf,stroke-width:4px
classDef decisionNodes fill:#00e4b8,stroke:#00b693,stroke-width:4px
classDef operationNodes fill:#bbb4ff,stroke:#c2bcff,stroke-width:4px


```