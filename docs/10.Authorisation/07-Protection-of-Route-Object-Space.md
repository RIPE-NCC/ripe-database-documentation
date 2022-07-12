# Protection of Route(6) Object Space


The **route(6)** object creation must satisfy several authorisation criteria. As with all objects, it must satisfy its own **mntner** object references in the “mnt-by:” attributes. It must also satisfy two separate hierarchical authorisations. All three authorisations must be passed for the object to be created. For modify and delete of a **route(6)** object, only its own **mntner** object in the “mnt-by:” attributes needs to authorise the operation.

**Address space**: the creation of a **route(6)** object needs to be authorised either by existing, related **route(6)** objects or related address space objects. The **route(6)** objects are checked first. If a **route(6)** object with an exact matching address prefix exists, it will be used for authorisation. If this does not exist, one with a less specific prefix is used. If no such **route(6)** object exists, an address space object (**inetnum** or **inet6num**) with an exact matching prefix will be used, otherwise a less specific prefix is used. One of these objects will always be found in the database. Following this order, the first valid object found is the one used to authorise the new object creation. If the supplied credentials do not satisfy the authorisation required by this first valid object found, then authorisation fails. The software does not look for the next possible valid object in the sequence.

**Autonomous System (AS) Number**: you do not need to authenticate against the origin AS Number when creating a **route(6)** object. Any originating AS Number can be used, so long as it’s not in reserved space. The originating AS Number does not need to exist in the RIPE Database.

The origin AS holder is notified of a route(6) creation, using the "notify:" attribute on the aut-num object, if the both the AS Number exists and the "notify:" attribute is set.

The RIPE Database is used as an inter-routing registry. However, it is only possible to create a **route(6)** object in the RIPE Database with an origin prefix that has been allocated to the RIPE region.

Please refer to [Managing Route Objects in the IRR](https://www.ripe.net/manage-ips-and-asns/db/support/managing-route-objects-in-the-irr) for more information about the authorisation rules for creating route(6) objects.
