---
permalink: /Authorisation/Protection-of-AUT-NUM-Object-Space
lastUpdated: 1688479960000
prev:
  text: 04 Protection of PERSON and ROLE Objects
  link: /Authorisation/04-Protection-of-PERSON-and-ROLE-Objects/
next:
  text: 06 Protection of Address Space
  link: /Authorisation/06-Protection-of-Address-Space/
---

# Protection of AUT-NUM Object Space

Protection of **aut-num** object space is done using **as-block** objects. The **mntner** object that authorises the creation of **aut-num** objects is specified by any one of the "mnt-lower:" attributes of the parent **as-block** object. When no "mnt-lower:" attribute exists, the **mntner** object from any one of the parent "mnt-by:" attributes is used.

This parent authorisation is only required when an **aut-num** object is created. It is in addition to the authorisation of the individual object itself.
