---
permalink: /Updating-Objects-in-the-RIPE-Database/Garbage-Collection
---

# Garbage Collection
When specific objects of a certain type have existed in the database unreferenced for a continuous period of time, it becomes eligible for automatic deletion.

The object types include **person**, **role**, **mntner**, **organisation** (not if the type is LIR) and **key-cert**. Clusters of these objects that form a self-referencing group, without any reference from resource data, will also be deleted.