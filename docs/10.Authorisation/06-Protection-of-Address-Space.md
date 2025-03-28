---
permalink: /Authorisation/Protection-of-Address-Space
lastUpdated: 1688479960000
prev:
  text: 05 Protection of AUT NUM Object Space
  link: /Authorisation/05-Protection-of-AUT-NUM-Object-Space/
next:
  text: 07 Protection of Route Object Space
  link: /Authorisation/07-Protection-of-Route-Object-Space/
---

# Protection of Address Space

The **inetnum** and **inet6num** objects represent address space allocations and assignments. The "mnt-lower:" attribute is used to reference a **mntner** object that authorises the creation of more specific **inetnum** or **inet6num** objects. If no "mnt-lower:" attribute is present, one of the "mnt-by:" attributes of the parent object will be used instead.

This parent authorisation is only required when an **inetnum** or **inet6num** object is created. This authorisation is in addition to the authorisation of the individual object itself.
