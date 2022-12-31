# Protection of Route(6) Object Space


The **route(6)** object creation must satisfy several authorisation criteria. As with all objects, it must satisfy its own **mntner** object references in the “mnt-by:” attributes. It must also satisfy two separate hierarchical authorisations. All three authorisations must be passed for the object to be created. For modify and delete of a **route(6)** object, only its own **mntner** object in the “mnt-by:” attributes needs to authorise the operation.

**Address space**: the creation of a **route(6)** object needs to be authorised either by existing, related **route(6)** objects or related address space objects. The **route(6)** objects are checked first. If a **route(6)** object with an exact matching address prefix exists, it will be used for authorisation. If this does not exist, one with a less specific prefix is used. If no such **route(6)** object exists, an address space object (**inetnum** or **inet6num**) with an exact matching prefix will be used, otherwise a less specific prefix is used. One of these objects will always be found in the database. Following this order, the first valid object found is the one used to authorise the new object creation. If the supplied credentials do not satisfy the authorisation required by this first valid object found, then authorisation fails. The software does not look for the next possible valid object in the sequence.

**Autonomous System (AS) Number**: you do not need to authenticate against the origin AS Number when creating a **route(6)** object. Any originating AS Number can be used, so long as it’s not in reserved space. The originating AS Number does not need to exist in the RIPE Database.

The origin AS holder is notified of a route(6) creation, using the "notify:" attribute on the aut-num object, if the both the AS Number exists and the "notify:" attribute is set.

The RIPE Database is used as an inter-routing registry. However, it is only possible to create a **route(6)** object in the RIPE Database with an origin prefix that has been allocated to the RIPE region.


## Authorisation rules for creating route objects

The IRR that the RIPE NCC operated is tightly coupled with the RIPE Database, which contains resource and contact information for the address space and ASNs that the RIPE NCC manages. This means that when you query for a certain resource in the RIPE Database, you will also get relevant results from the IRR. Conversely, when entering data into IRR, authorisation for the relevant RIPE Database objects is required.

To create a **route(6)** (i.e. a **route** or **route(6)**) object in the RIPE database, you must authenticate against the address space you are referring to. Only address space within the RIPE region can be referred to.

When creating a **route(6)** object you must authenticate against multiple [maintainers](../19.Database-Support/03-Database-Security.md#maintainers) to verify that you have control over the address space you are referring to. This means the related **inet(6)num** object must exist in the RIPE Database and you can authenticate against it, before you can create a **route(6)** object in the IRR.

When you submit a new **route(6)** object, the following validation process is triggered:

* The maintainer of any existing **route(6)** object that is exactly matching or covering a less specific prefix is checked. If there is none, the maintainer of the **inet(6)num** object that is exactly matching or coering a less specific prefix is checked.
* If successful, the maintainer of the **route(6)** object you are creating is verified.

The order in which the RIPE Database will verify available maintainers is:

* mnt-routes
* mnt-lower
* mnt-by

This means that if a **route(6)** or **inet(6)num** object has all three kinds of maintainers defined, you **must** use the "mnt-routes:" attributes to authenticate. In this case, you cannot use the "mnt-lower:" or "mnt-by:" attributes. Likewise, if you have a "mnt-lower:" and a "mnt-by:" attribute on the objects, the "mnt-lower:" attribute must be used.


**Route object creationg flowchart**


```mermaidjs
flowchart LR
A[Begin]:::initLastNodes --> B{Is there an exact <br> match route?}:::decisionNodes


B --> |Yes| C{Does exact match route <br> have 'mnt-routes'?}:::decisionNodes
B --> |No| D{Is there a less <br> specific route?}:::decisionNodes
C --> |No| F[Check authorisation using maintainers <br> in 'mnt-by' or exact match route]:::operationNodes
C --> |Yes| E[Check authorisation using maintainers <br> in 'mnt-routes']:::operationNodes

D --> |Yes| G{Does less specific route <br> have 'mnt-rutes'?}:::decisionNodes
D --> |No| H{Is there an exact <br> match inetnum?}:::decisionNodes
G --> |Yes| E[Check authorisation using maintainers <br> in 'mnt-routes']:::operationNodes
G --> |No| I{Does less specific route <br> have 'mnt-lower'?}:::decisionNodes
I --> |Yes| J[Check authorisation using maintainers <br> in 'mnt-lower']:::operationNodes
I --> |No| K[Check authorisation using maintainers <br> in or less specific route]:::operationNodes

H --> |Yes| L{Does exact match inetnum <br> have 'mnt-routes'?}:::decisionNodes
H --> |No| M{Is there a less <br> specific inetnum?}:::decisionNodes
L --> |No| N[Check the authorisation using <br> the maintainers in 'mnt-by']:::operationNodes
L --> |Yes| O[Check authorisation using maintainers <br> in 'mnt-routes']:::operationNodes

M --> |Yes| P{Does less specific inetnum <br> have 'mnt-routers'?}:::decisionNodes
M --> |No| Q[Reject creation]:::initLastNodes
P --> |Yes| O[Check authorisation using maintainers <br> in 'mnt-routes']:::operationNodes
P --> |No| R{Does less specific inetnum <br> have 'mnt-lower'?}:::decisionNodes
R --> |No| S[Check the authorisation using <br> the maintainers in 'mnt-by']:::operationNodes
R --> |Yes| T[Check the authorisation using <br> the maintainers in 'mnt-lower']:::operationNodes


F --> U{Authorisation successful?}:::decisionNodes
E --> U
J --> U
K --> U
N --> U
O --> U
S --> U
T --> U

U --> |Yes| V[Go to authorisation check from route object itself]:::initLastNodes
U --> |No| Q

%% Class Definitions
%% =================

classDef initLastNodes fill:#a4a1c4,stroke:#9b96cf,stroke-width:4px
classDef decisionNodes fill:#00e4b8,stroke:#00b693,stroke-width:4px
classDef operationNodes fill:#bbb4ff,stroke:#c2bcff,stroke-width:4px


```


You can only create a **route(6)** object for a prefix you manage. If these objects are maintained by your organisation's single shared maintainer, you just need to supply one credentials to satisfy all of the requirements. However, when you use multiple maintainers, you may need to supply different credentials to create a single **route(6)** objects.

If you wish to avoid having to supply multiple credentials, it is best to set up [hierarchical authorisation](../19.Database-Support/03-Database-Security.md#maintainers) by adding a "mnt-routes:" attribute to all of your resource objects and consistently use this maintainer to create and manage **route(6)** objects.


## Creating route objects referring to resources you don't manage

You do not need to authenticate against the origin AS Number when creating a **route(6)** object. Any originating AS Number can be used, so long as it's not in reserved space. The originating AS Number does not have to exist in the RIPE Database.

If the originating AS Number exists in the RIPE Database, and if the **aut-num** object contains one or more notify: attributes, these will be used to notify the originating AS Number holder when the **route(6)** object is created.


## Creating route objects for out-of-region (non-RIPE) resources

It is not possible to create a **route(6)** object in the RIPE Routing Registry that refers to a prefix that is not managed by the RIPE NCC, but by one of the other Regional Internet Registries.

This change was introduced by NWI-5, which is documented in a RIPE Labs article: [Out-of-Region ROUTE(6) and AUT-NUM Objects in the RIPE Database](https://labs.ripe.net/author/denis/out-of-region-route6-and-aut-num-objects-in-the-ripe-database/).


## Force deleting blocking route objects

When the RIPE Database gets authorisation from the address space for the creation your new **route(6)** object, it will first check if there is an exact matching or less specific **route(6)** object. If this route object has a maintainer that you do not have the credentials for, it can block you from creating a new **route(6)** object. In this case you, as the resource holder, can simply delete the blocking **route(6)** object.

Normally an object can only be deleted if the operation is authorised by one of the maintainers in the "mnt-by:" attributes of the object to be deleted. However, the [force delete](../10.Authorisation/14-Force-Delete-Functionality.md#force-delete-functionality) funtionality also looks for the eact matching, encompassing or less specific address space object that was allocated or assigned by the RIPE NCC in the hierarchy of the object that is to be deleted.

The result is that the "mnt-lower:" attribute of an allocation, or the "mnt-by:" attribute of a PI or anycast assignment, has the authority to reclaim any more specific or related object. Practically, this means a **route** object can be deleted by:

* the mnt-by: attribute of the **route** object
* the mnt-routes: attribute of the parent **inet(6)num** that was allocated or assigned by the RIPE NCC
* the mnt-lower: attribute of the parent **inet(6)num** that was allocated or assigned by the RIPE NCC

It is important to undestand that this functionality only works when the parent **inet(6)num** object is protected by the [RIPE-NCC-HM-MNT](https://apps.db.ripe.net/db-web-ui/lookup?source=ripe&key=RIPE-NCC-HM-MNT&type=mntner) maintainer. If not, the system will look up in the hierarchy until it finds an **inet(6)num** which has a RIPE NCC maintainer on it, after which it will look at the "mnt-lower:" or "mnt-routes:" attributes on that **inet(6)num** object and use them for the authentication.
