---
permalink: /Authorisation/Protection-of-Reverse-Delegation-Objects
---

# Protection of Reverse Delegation Objects

Protection of the reverse domain object space for "in-addr.arpa" and "ip6.arpa" domains is done with separate methods for creation, deletion and modification. The **domain** object creation is described in a [flow chart](../Appendices/Appendix-E--Domain-Object-Creation-Flowchart/#domain-object-creation-flowchart).

The creation of **domain** objects for "in-addr.arpa" and "ip6.arpa" domains must satisfy several authorisation criteria. As with all objects, it must satisfy its own **mntner** object references in the "mnt-by:" attributes. It must also satisfy a hierarchical authorisation. Both authorisations must be passed for the object to be created. For modification and deletion of a **domain** object, only its own **mntner** object in the "mnt-by:" attributes needs to authorise the operation. Where a deletion fails, **mntner** objects referenced in a "mnt-domains", "mnt-lower" or "mnt-by" attribute of the corresponding **inet(6)num** object can authorise the deletion. They will be checked in this order. The first attribute type found will be taken as the only one to use.

The hierarchical authorisation uses the related address space objects. An address space object (**inetnum** or **inet6num**) with an exact matching prefix will be used; otherwise a less specific prefix is used. One of these objects will always be found in the database. Following this order, the first valid object found is the one used to authorise the new object creation. If the supplied credentials do not satisfy the authorisation required by this first valid object found, then authorisation fails. The software does not look for the next possible valid object in the sequence.

There is no hierarchy allowed in the reverse **domain** objects. Therefore, no hierarchical authorisation is required from the **domain** objects, as is also the case for **route** objects.
