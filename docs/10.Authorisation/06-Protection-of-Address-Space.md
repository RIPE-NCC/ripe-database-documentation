# Protection of Address Space

The **inetnum** and **inet6num** objects represent address space allocations and assignments. The "mnt-lower:" attribute is used to reference a **mntner** object that authorizes the creation of more specific **inetnum** or **inet6num** objects. If no "mnt-lower:" attribute is present, one of the "mnt-by:" attributes of the parent object will be used instead.

This parent authorization is only required when an **inetnum** or **inet6num** object is created. This authorization is in addition to the authorization of the individual object itself.