---
permalink: /Authorisation/Protection-of-Objects-with-Hierarchical-Names
---

# Protection of Objects with Hierarchical Names

RPSL set objects do not have a natural hierarchy of their own but allow hierarchical names, such as the **as-set** object. An **as-set** object may have a non-hierarchical name such as "AS-Foo" or a hierarchical name in the form "AS1:AS-BAR".

For set objects with non-hierarchical names, authorisation corresponds to the rules for individual objects described in the section ['Security of Data Using Authorisation'](../Authorisation/Security-of-Data-Using-Authorisation/#security-of-data-using-authorisation).

If hierarchical names are used, then the creation of an object must be authorised by the object whose primary key is named by everything to the left of the rightmost colon in the primary key name of the object being created. Consider the object "AS1:AS-BAR:AS2". This would need to be authorised by "AS1:AS-BAR". This object is considered to be the 'parent' of the object being created.

Hierarchical authorisation is determined by first using any **mntner** object referenced by the parent object's "mnt-lower:" attributes. If none of these exist, then any **mntner** object referenced by the parent object's "mnt-by:" attributes is used.

The parent authorisation is required in addition to the authorisation of the individual object itself and is only required when an object is created.