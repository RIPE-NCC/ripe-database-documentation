---
permalink: /RPSL-Object-Types/Descriptions-of-Primary-Objects
---

# Descriptions of Primary Objects

* [Description of the AUT-NUM Object](#description-of-the-aut-num-object)
* [Description of the DOMAIN Object](#description-of-the-domain-object)
* [Description of the INET6NUM Object](#description-of-the-inet6num-object)
* [Description of the INETNUM Object](#description-of-the-inetnum-object)
* [Description of the ROUTE Object](#description-of-the-route-object)
* [Description of the ROUTE6 Object](#description-of-the-route6-object)
* [Description of the AS-SET Object](#description-of-the-as-set-object)
* [Description of the FILTER-SET Object](#description-of-the-filter-set-object)
* [Description of the INET-RTR Object](#description-of-the-inet-rtr-object)
* [Description of the PEERING-SET Object](#description-of-the-peering-set-object)
* [Description of the ROUTE-SET Object](#description-of-the-route-set-object)
* [Description of the RTR-SET Object](#description-of-the-rtr-set-object)


## Description of the AUT-NUM Object

Below is the object template for the **aut-num** object. It lists all possible attributes that are allowed in this object type. Required attributes are shown as ‘mandatory'.

    Attribute Name   Presence   Repeat     Indexed 
    aut-num:         mandatory  single     primary/lookup
    as-name:         mandatory  single    
    descr:           optional   multiple  
    member-of:       optional   multiple   inverse
    import-via:      optional   multiple  
    import:          optional   multiple  
    mp-import:       optional   multiple  
    export-via:      optional   multiple  
    export:          optional   multiple  
    mp-export:       optional   multiple  
    default:         optional   multiple  
    mp-default:      optional   multiple  
    remarks:         optional   multiple  
    org:             optional   single     inverse
    sponsoring-org:  optional   single
    admin-c:         mandatory  multiple   inverse
    tech-c:          mandatory  multiple   inverse
    abuse-c:         optional   single     inverse
    status:          generated  single    
    notify:          optional   multiple   inverse
    mnt-by:          mandatory  multiple   inverse
    created:         generated  single
    last-modified:   generated  single
    source:          mandatory  single  

The **aut-num** object serves a dual purpose in the database. As part of the RIPE Internet Number Registry, it contains the registration details of an Autonomous System Number (ASN) resource assigned by the RIPE NCC. As part of an Internet Routing Registry, it allows routing policies to be published. It refers to a group of IP networks that have a single and clearly defined external routing policy, operated by one or more network operators – an Autonomous System (AS). This is the only primary object that crosses over between these two registries in the RIPE Database.

Because of this crossover between the two registries contained within the RIPE Database, authorisation for creation of **route(6)** objects can and must be provided by both the address space holder and the holder of the AS number. For more details, see the section ['Authorisation'](../Authorisation/#authorisation).

The number part of an ASN is a 32-bit number. Historically, these were 16-bit numbers. But when the pool of available numbers was running low, they were extended to 32 bits. In theory, there is no difference between a 16-bit ASN and a 32-bit ASN, except perhaps the size of the number. One is just a subset of the other. For technical reasons, some users still prefer a 16-bit ASN.

The primary key value will be in this format:

‘ASn' where ‘n' is a 32-bit unsigned, number in the range 0: 4,294,967,295.

Leading zeroes (AS065536) are not allowed and will be removed (AS65536) by the database software.

**Description of Attributes Specific to the AUT-NUM Object**


* **"aut-num:"** – the registered AS Number of the Autonomous System (AS) that this object describes. It must start with the two letters ‘AS'.
* **"as-name:"** – a symbolic name of the AS. Must be a single word of letters, numbers and the characters ‘-‘ and ‘_'.
* **"descr:"** - A short description related to the object.
* **"member-of:"** - references a set object that this AS wants to be a member of. This membership claim must be acknowledged by a respective "mbrs-by-ref:" attribute in the referenced set object.
* **"import:"**, **"export:"** and **"default:"** - specify the IPv4 routing policies of the AS.
* **"import-via:"** and **"export-via:"** - specify routing policies regarding non-adjacent networks. These attributes help participants of Multi-Lateral Peering services to inform the intermediate autonomous system what routing policy should be applied towards other participants.
* **"mp-import:"**, **"mp-export:"** and **"mp-default:"** - specify IPv4, IPv6 and multicast routing policies.
* **"org:"** – single-valued to make sure that only one organisation is responsible for this resource. This is a required attribute in the **aut-num** object. If the "status:" value is ‘ASSIGNED' then the object must have an "org:" attribute.
* **"sponsoring-org:"** – references an **organisation** object representing the sponsoring organisation that is administratively responsible for the resource. This value is generated by the software and synchronised with the registry information. If a resource is no longer subject to a contract with the sponsoring organisation, or a contract is signed with a new sponsoring organisation, this will be updated in the registry information for this resource. The **aut-num** object in the RIPE Database will then be synchronised with the changes. A user cannot set, remove or change this value. An **aut-num** object can be created without this attribute. But the RIPE NCC can remove the attribute during a period in-between the ending of a contract with one sponsoring organisation and the signing of a contract with a new sponsoring organisation.
* **"status:"** – There are three different categories of **aut-num** objects in the RIPE Database. This generated "status:" attribute clearly shows which category an **aut-num** object belongs to. The categories are:
    * ‘ASSIGNED', - all AS Number resources assigned by the RIPE NCC
    * ‘LEGACY' - all legacy AS Numbers used within the RIPE region but not assigned by the RIPE NCC
    * ‘OTHER' – any **aut-num** that is not one of the above, typically a non-authoritative copy of an **aut-num** from another RIR region used for routing authentication in the RIPE Database
A user cannot set, remove or change this value. It is determined from the status noted for this resource in the registry information and set by the software when the object is updated. An update to an **aut-num** object will never fail because of a missing "status:" attribute or incorrect value. The software will add or correct it. The status of an **aut-num** is only administrative. It does not affect the usage of an **aut-num** for any routing purpose or impact certification in any way.
* **“abuse-c:”** – This attribute references an abuse contact object. If present, this overrides any existing reference on a referenced **organisation** object. This can only be a **role** object that contains an "abuse-mailbox:" attribute. Making this reference will remove any query limits for that **role** object, which must only include business data (no personal information).
* **“mnt-by:”** – This attribute may have extra powers in addition to its default behaviour. In the absence of any “mnt-routes:” attributes, the **mntner** objects listed in the “mnt-by:” attributes can authorise the creation of **route(6)** objects originated by this AS number. For more details, see the section ['Authorisation'](../Authorisation/#authorisation).




## Description of the DOMAIN Object

Below is the object template for the **domain** object. It lists all possible attributes allowed in this object type.

    Attribute Name    Presence       Repeat       Indexed
    domain:           mandatory      single       primary/lookup
    descr:            optional       multiple
    org:              optional       multiple     inverse
    admin-c:          mandatory      multiple     inverse
    tech-c:           mandatory      multiple     inverse
    zone-c:           mandatory      multiple     inverse
    nserver:          mandatory      multiple     inverse
    ds-rdata:         optional       multiple     inverse
    remarks:          optional       multiple
    notify:           optional       multiple     inverse
    mnt-by:           mandatory      multiple     inverse
    created:          generated      single
    last-modified:    generated      single
    source:           mandatory      single

The **domain** object is mainly for registering reverse delegations (number-to-name translations) in both the RIPE Database and the DNS zone files. The RIPE Database is used as the management database for producing the DNS zones. No forward domain names are stored in the RIPE Database. [IANA](https://www.iana.org/) provides information about forward domains.

Reverse DNS delegations allow applications to map to a domain name from an IP address. Reverse delegation is achieved by use of the special domain names in-addr.arpa (IPv4) and ip6.arpa (IPv6).

The **domain** object is also used for registering ENUM delegations using the domain name e164.arpa.

For IPv4 addresses, a dash is allowed in the fourth octet of the reverse address. This allows for reverse DNS delegations for address space that doesn't fall on octet boundaries as specified in [RFC 2317](https://www.ietf.org/rfc/rfc2317.txt). A dash is not allowed in any other octet. For example:

    IPv4 address range
    10.2.1.6 - 10.2.1.25

    reverse delegation
    6-25.1.2.10.in-addr.arpa

This is created in the RIPE Database as a single object, including the dash in the range. The DNS provisioning software handles the dash notation and propagates this delegation to the zone file. The range 0-255 is a special case and is not allowed in the fourth octet. Modification and deletion can be performed on this single object in the database. Any change is propagated into the zone file by the DNS provisioning software.

Reverse DNS zones in the RIPE Database do not allow child objects. From a DNS view, only the parent object is effective. Business rules in the database software check for hierarchies when a reverse **domain** object is being created. If either a less or more specific **domain** object already exists, the creation of the new object is rejected.

**Description of Attributes Specific to the DOMAIN Object**


* **“domain:”** - This is the reverse delegation address or range. It can be for IPv4 or IPv6 addresses or an ENUM phone number. If a trailing dot is included it will be removed from the stored record.
* **“descr:”** - A short description related to the object.
* **“zone-c:”** - This attribute references the primary key, or NIC Handle, of either a **role** or **person** object. It should always reference a **role** object, except in the **role** object where it optionally references nested **role** objects or a **person** object.
* **“nserver:”** - The "nserver:" attributes in each **domain** object define the officially delegated DNS nameservers (the ‘NS' in DNS zone contents). If a trailing dot is included it will be removed from the stored record. The nameserver name can optionally be followed by an IPv4 or IPv6 address as a glue record.
* **“ds-rdata:”** – This attribute holds information about a signed delegation record for DNS Security Extensions (DNSSEC). In DNSSEC the Delegation Signer (DS) Resource Record is created from a DNSKEY Resource Record by comparing it with the public key. The parent publishes the [DS Resource Record](http://www.ietf.org/rfc/rfc4034.txt).
The "ds-rdata:" attribute contains the RDATA of the DS Resource Records related to the domain (as shown in the "domain:" attribute).
    ds-rdata: 64431 5 1 278BF194C29A812B33935BB2517E17D1486210FA
The tools provided with BIND (version 9.3.0 and later) will generate a "ds set" during signing. Before an update, you can copy the DS Rdata into the attributes.





## Description of the INET6NUM Object

Below is the object template for the **inet6num** object. It lists all possible attributes that are allowed in this object type. Required attributes are shown as ‘mandatory'.

    Attribute Name    Presence    Repeat     Indexed
    inet6num:         mandatory   single     primary/lookup key
    netname:          mandatory   single     lookup key
    descr:            optional    multiple  
    country:          mandatory   multiple  
    geofeed:          optional    single
    geoloc:           optional    single    
    language:         optional    multiple  
    org:              optional    single     inverse key
    sponsoring-org:   optional    single    
    admin-c:          mandatory   multiple   inverse key
    tech-c:           mandatory   multiple   inverse key
    abuse-c:          optional    single     inverse key
    status:           mandatory   single    
    assignment-size:  optional    single    
    remarks:          optional    multiple  
    notify:           optional    multiple   inverse key
    mnt-by:           mandatory   multiple   inverse key
    mnt-lower:        optional    multiple   inverse key
    mnt-routes:       optional    multiple   inverse key
    mnt-domains:      optional    multiple   inverse key
    mnt-irt:          optional    multiple   inverse key
    created:          generated   single
    last-modified:    generated   single
    source:           mandatory   single

An **inet6num** object contains information on allocations and assignments of IPv6 address space resources. This is one of the main elements of the RIPE Internet Number Registry.

**Hierarchy of INET6NUM Objects**

The **inet6num** objects cover many different types of data in the RIPE Database. The [policy on issuing IPv6 addresses in the RIPE NCC service region](http://www.ripe.net/publications/docs/ipv6-policy) explains more about the process of allocating and assigning addresses. This policy has changed a number of times over the years and some of the data in the RIPE Database was set up under previous policy conditions. The following paragraphs try to outline how this physical data in the RIPE Database is structured and how to make sense of it.

They are arranged in a hierarchical structure starting with a root object ::/0. This root object is there for data management reasons. It does not mean the RIPE NCC has any administrative authority over the whole IPv6 address space.

The next level down in the hierarchy after the root object includes placeholder objects representing the blocks of address space that the RIPE NCC is administratively responsible for. Most allocations to members are from the placeholder objects. However, there are also some allocations to members that have no parent placeholder object. All of these objects, from the root object down to and including the allocations to members, have the same status value of ‘ALLOCATED-BY-RIR'. There are no differences in the status to distinguish between [blocks allocated by IANA to the RIPE NCC](https://www.iana.org/assignments/ipv6-unicast-address-assignments/ipv6-unicast-address-assignments.xhtml) and allocations made by the RIPE NCC to members. For this you need to look at the “mnt-lower:”. For the blocks allocated by IANA to the RIPE NCC, the “mnt-lower:” has a RIPE NCC **mntner**, or it has no “mnt-lower:” which defaults to the “mnt-by:”. For allocations made from these administrative blocks to members, the “mnt-lower:” has the member's **mntner**. Some objects also include remarks highlighting that they are allocations from IANA to the RIPE NCC.

RIPE NCC also makes assignments to end users and TLD operators from the placeholder administrative objects. These are recognised by the “status:” and the “mnt-by:”. In most cases, these assignments will have the status ‘ASSIGNED PI' or ‘ASSIGNED ANYCAST'. Some of the earlier direct assignments still have the status ‘ASSIGNED'. These can still be recognised, as they should have a RIPE NCC mntner as one of the joint “mnt-by:” attributes.

Within the hierarchy, these allocations and assignments made from the administrative blocks are on the same level. They all have a placeholder object as their parent. All of these allocations and assignments are required to have a reference to an **organisation** object. Although the “org:” attribute is syntactically optional in an **inet6num** object, this requirement is set by software business rules.

The same principle applies to the assignments made from these administrative blocks. These are jointly managed by the RIPE NCC and either the End User or the sponsoring organisation. The sponsoring organisation is a RIPE NCC member who handles the End User's administration for this resource with the RIPE NCC.

An assignment is the lowest level of the hierarchy. There can be no more specific objects. For the allocations, the hierarchy can continue down several levels of more specific objects. All objects more specific to the allocation are created and managed in the RIPE Database by the member organisation, not by the RIPE NCC.

The allocation can be partitioned to match the member organisation's business structure, or the member can create an aggregation object with part of the allocation. Assignments of a fixed size will be made from this aggregation object. Finally, any part of the address space may be assigned to an End User. Again, the assignment is the lowest level, or an end point, for that part of the hierarchy. All of these levels can be recognised by the status values.

**Description of Attributes Specific to the INET6NUM Object**


* **“inet6num:”** – This specifies a block of IPv6 addresses that the **inet6num** object presents. The block may be one or more addresses.
Addresses can only be expressed in a prefix notation. The prefix is converted to a canonical format where necessary and an informational message will be returned to the user if this conversion is done.
The format expresses addresses as a 128-bit number in hexadecimal groups of two bytes with colon separators between the groups . There is the possibility of using a shorthand notation for strings of consecutive zeros. Leading zeros from any two-byte group will be removed by the software. In this case, an informational message will be returned to the user.
* **“netname:”** – This is a name given to a range of IP address space. A netname is made up of letters, digits, the underscore character and the hyphen character. The first character of a name must be a letter, and the last character of a name must be a letter or a digit. It is recommended that the same netname be used for any set of assignment ranges used for a common purpose, such as a customer or service. 
* **“descr:”** – A short description related to the object.
* **“country:”** – This identifies a country using the ISO 3166 2-letter country codes. It has never been specified what this country represents. It could be the location of the head office of a multi-national company, where the server centre is based, or the home of the End User. Therefore, it cannot be used in any reliable way to map IP addresses to countries.
* **"geofeed:"** – Contains a URL referencing a CSV file containing geolocation data for the resource. The geofeed format is defined in [RFC 8805](https://datatracker.ietf.org/doc/rfc8805/).
* **“geoloc:”** – The geolocation coordinates for the resource in decimal degrees notation. Format is latitude followed by longitude, separated by a space. Latitude ranges from [-90,+90] and longitude from [-180,+180]. All more specific objects to the **inet6num** object containing this attribute inherit this data.
* **“language:”** – Identifies the language as a two-letter code from the ISO 639-1 language code list. All more specific objects to the **inet6num** object containing this attribute inherit this data.
* **“org:”** – single valued to make sure that only one organisation is responsible for this resource. This is a required attribute. In some cases, there are business rules to ensure that it is present. If the **inet6num** object is (jointly) maintained by the RIPE NCC then the object must have an “org:” attribute.
* **“sponsoring-org:”** – references an **organisation** object representing the sponsoring organisation that is administratively responsible for the resource. If a resource is no longer subject to a contract with the sponsoring organisation, or a contract is signed with a new sponsoring organisation, this will be updated in the registry information for this resource. The **inet6num** object in the RIPE Database will then be synchronised with the changes. A user cannot set, remove or change this value. An **inet6num** object can be created without this attribute. The software will generate the correct value if it is required. The RIPE NCC will remove the attribute during a period in-between the ending of a contract with one sponsoring organisation and the signing of a contract with a new sponsoring organisation.
* **“abuse-c:”** – This attribute references an abuse contact object. If present, this overrides any existing referenced **organisation**, or **"abuse-c:"** attribute present in the hierarchy of this object . This can only be a **role** object that contains an "abuse-mailbox:" attribute. Making this reference will remove any query limits for that **role** object, which must only include business data (no personal information).
* **“status:”** – The status is used to show the different types of data stored in an **inet6num** object and the relative positions within a hierarchy. It can not be changed after creating the object and it can take one of these values:
    * ALLOCATED-BY-RIR – This is mostly used to identify blocks of addresses for which the RIPE NCC is administratively responsible and allocations made to members by the RIPE NCC.
    * ALLOCATED-BY-LIR – This is equivalent to the **inetnum** status ‘SUB-ALLOCATED PA'. A member can sub-allocate part of an allocation to another organisation. The other organisation may take over some of the management of this sub-allocation. However, the RIPE NCC member is still responsible for the whole of their registered resources, even if some parts of it have been sub-allocated to another organisation. Provisions have been built in to the RIPE Database software to ensure that the member is always technically in control of their allocated address space. Within such allocation, it is still required to document assignments using the status "AGGREGATED-BY-LIR" or "ASSIGNED".
With the **inet6num** object there is no equivalent to the **inetnum** ‘LIR-PARTITIONED' status values allowing partitioning of an allocation by a member for internal business reasons.
    * AGGREGATED-BY-LIR – With IPv6, it is not necessary to document each individual End User assignment in the RIPE Database. If you have a group of End Users who all require blocks of addresses of the same size, say a /56, then you can create a large, single block with this status. The “assignment-size:” attribute specifies the size of the End User blocks. All assignments made from this block must have that size. It is possible to have two levels of ‘AGGREGATED-BY-LIR'. The "assignment-size" value cannot be changed after the **inet6num** object has been created.

    ![](~@imgs/assignment-size.png)

    * ASSIGNED – These are assignments made by a member from their allocations to an End User.

    ![](~@imgs/assigned.png)

    * ASSIGNED PI – These are assignments made by the RIPE NCC directly to an End User. In most cases, there is a member acting as the sponsoring organisation who handles the administrative processes on behalf of the End User. The sponsoring organisation may also manage the resource and related objects in the RIPE Database for the End User.
    * ASSIGNED ANYCAST – This address space has been assigned for use in TLD anycast networks. 
* **“assignment-size:”** – This specifies the common size of all individual assignments aggregated into one block with the status ‘AGGREGATED-BY-LIR'. This attribute is required to be present if the **inet6num** object has this status. The individual assignments do not need to be represented in the RIPE Database. But one or more assignments may be included if the member wishes to specify them for any reason. The maximum assignment size is 128.
* **“mnt-lower:”** – This attribute references **mntner** objects that provide a set of authorisation tokens used for hierarchical object creation. These tokens are used to authorise the creation of the one level more specific (child) objects to the **inet6num** with the “mnt-lower:” attribute. If there is no “mnt-lower:” attribute, the “mnt-by:” authorises the creation of the child objects. This is explained in more detail in the section ['Authorisation'](../Authorisation/#authorisation).
* **“mnt-domains:”** – This attribute references **mntner** objects that provide a set of authorisation tokens used for **domain** object creation for reverse delegation. These tokens are used to authorise the creation of the domain objects whose prefixes are contained within the range of addresses set by the inet6num with the “mnt-domains:” attribute. Depending on the hierarchical relationship between the inet6num and domain objects, the “mnt-lower:” and “mnt-by:” attributes may also be used. This is explained in more detail in the section ['Authorisation'](../Authorisation/#authorisation).
* **“mnt-routes:”** – This attribute references **mntner** objects that provide a set of authorisation tokens that may be used for **route6** object creation. Authorisation for **route6** object creation is the most complex. This is explained in more detail in the section ['Authorisation'](../Authorisation/#authorisation).
* **“mnt-irt:”** – Despite its name, this attribute is not a reference to a **mntner** object. It references an **irt** object, which is a contact data object, like the role object. Authorisation is required from the **irt** object to be able to add this reference. These references apply in a hierarchical way. So where an “irt:” attribute is included, all more specifics to that **inet6num** object inherit the reference.





## Description of the INETNUM Object

Below is the object template for the **inetnum** object. It lists all possible attributes allowed in this object type. Required attributes are shown as ‘mandatory'.

    Attribute Name    Presence   Repeat     Indexed
    inetnum:          mandatory  single     primary/lookup key
    netname:          mandatory  single     lookup key
    descr:            optional   multiple  
    country:          mandatory  multiple  
    geofeed:          optional   single
    geoloc:           optional   single    
    language:         optional   multiple  
    org:              optional   single     inverse key
    sponsoring-org:   optional   single    
    admin-c:          mandatory  multiple   inverse key
    tech-c:           mandatory  multiple   inverse key
    abuse-c:          optional   single     inverse key
    status:           mandatory  single    
    remarks:          optional   multiple  
    notify:           optional   multiple   inverse key
    mnt-by:           mandatory  multiple   inverse key
    mnt-lower:        optional   multiple   inverse key
    mnt-routes:       optional   multiple   inverse key
    mnt-domains:      optional   multiple   inverse key
    mnt-irt:          optional   multiple   inverse key
    created:          generated  single
    last-modified:    generated  single
    source:           mandatory  single  

An **inetnum** object contains information on allocations and assignments of IPv4 address space resources. This is one of the main elements of the RIPE Internet Number Registry.

**Hierarchy of INETNUM Objects**

The **inetnum** objects cover many different types of data in the RIPE Database. The [policy on issuing IPv4 addresses in the RIPE NCC service region](https://www.ripe.net/docs/ipv4-policies) explains more about the process of allocating and assigning addresses within the region. This policy has changed many times over the years. Some of the data in the RIPE Database was set up under previous policy conditions. The following paragraphs outline how this physical data in the RIPE Database is structured and how to make sense of it.

They are arranged in a hierarchical structure starting with a root object 0/0. This root object is there for data management reasons. It does not mean the RIPE NCC has any administrative authority over the whole IPv4 address space.

The next level down in the hierarchy after the root object includes placeholder objects representing the /8 ranges of address space that the RIPE NCC is administratively responsible for. There are also top-level legacy objects. These are outside the administrative control of the RIPE NCC but still used by resource holders within the RIPE NCC service region. These are generally smaller than a /8 but hierarchically on the same level. In other words, the root object is the parent of all the top-level legacy objects and these /8 placeholder objects. There may be other placeholder objects outside these /8 objects for historical reasons. These will be cleaned up at some point in the future. There are also some allocations to members that have no parent placeholder object.

The different types of data can be recognised by the “status:” and “mnt-lower:” attribute values. The root object and all the placeholder objects will have a status ‘ALLOCATED UNSPECIFIED'. But some of the member allocations may also have this status. If it has this status and has a RIPE NCC **mntner** as the “mnt-lower:”, then it is an administrative block. All the legacy objects will have the status ‘LEGACY'.

The RIPE NCC has directly issued address space to its members and End Users from the placeholder administrative objects. Again, these are recognised by the “status:” and “mnt-lower:” attribute values. Most allocations to members have a status ‘ALLOCATED PA'. But a few will also have the status ‘ALLOCATED UNSPECIFIED'. They will all have the members **mntner** as “mnt-lower:”. The assignments made by the RIPE NCC will have a status ‘ASSIGNED PI' or ‘ASSIGNED ANYCAST'.

Within the hierarchy, these allocations and assignments made from the administrative blocks are on the same level. They all have the placeholder objects as their parent. All of these allocations and assignments are required to have a reference to an **organisation** object. Although the “org:” attribute is syntactically optional in an **inetnum** object, this requirement is set by software business rules.

The member allocation objects are partly managed by the RIPE NCC and partly by the member. Because of this joint management, there are two maintainers on the object as the “mnt-by:” - these are the RIPE NCC **maintainer** and the LIR's [default maintainer](../Database-Support/Database-Security/#maintainers). If no default maintainer is present yet, the LIR must select it on [the LIR Portal account details](https://my.ripe.net/#/account-details) page. After doing this, the default maintainer will be reflected on all existing and new objects that have joint responsibility. Business rules determine which attributes can only be changed by the RIPE NCC and which ones can be changed by the LIR.

The same principle applies to the assignments made from these administrative blocks. These are jointly managed by the RIPE NCC and either the End User or the sponsoring organisation. The sponsoring organisation is a RIPE NCC member who handles the End User's administration for this resource with the RIPE NCC.

An assignment is the lowest level of the hierarchy. There can be no more specific objects. For the allocations, the hierarchy can continue down several levels of more specific objects. All objects more specific to the allocation are created and managed in the RIPE Database by the member organisation, not by the RIPE NCC.

The allocation can be partitioned to match the member organisation's business structure, or part of it can be sub-allocated to another organisation. Finally, any part of it may be assigned to an End User. Again, the assignment is the lowest level or end point for that part of the hierarchy. All of these levels can be recognised by the status values.

The top-level legacy objects are also jointly managed by the resource holder and the RIPE NCC. Some values in these objects have business rules preventing the resource holder from changing the values. All other parts of the object can be edited in the same way as any other object. Below the top-level legacy object, the resource holder can create as many levels of hierarchy as they wish. All the objects in this legacy hierarchy will have the same status value of ‘LEGACY'. So it is not possible to identify, for example, sub-allocations or assignments in the legacy hierarchy by status.

**Description of Attributes Specific to the INETNUM Object**

* **“inetnum:”** – This specifies a range of IPv4 addresses that the **inetnum** object presents. The range may be one or more addresses.

Addresses can be expressed in either range or prefix notation. If prefix notation is used, the software will convert this to range notation and an informational message will be returned to the user. The end address must always be greater than or equal to the start address.

The range notation expresses addresses as 32-bit whole numbers in dotted quad notation. Leading zeros from any quad will be removed by the software and an informational message will be returned to the user.

* **“netname:”** – This is a name given to a range of IP address space. A netname is made up of letters, digits, the underscore character and the hyphen character. The first character of a name must be a letter, and the last character of a name must be a letter or a digit. It is recommended that the same netname be used for any set of assignment ranges used for a common purpose, such as a customer or service.
* **“descr:”** - A short description related to the object.
* **“country:”** – This identifies a country using the ISO 3166-2 letter country codes. It has never been specified what this country represents. It could be the location of the head office of a multi-national company or where the server centre is based or the home of the End User. Therefore, it cannot be used in any reliable way to map IP addresses to countries.
* **"geofeed:"** - Contains a URL referencing a CSV file containing geolocation data for the resource. The geofeed format is defined in [RFC 8805](https://datatracker.ietf.org/doc/rfc8805/).
* **“geoloc:”** - The geolocation coordinates for the resource in decimal degrees notation. Format is latitude followed by longitude, separated by a space. Latitude ranges from [-90,+90] and longitude from [-180,+180]. All more specific objects to the **inetnum** object containing this attribute inherit this data.
* **“language:”** - Identifies the language as a two-letter code from the ISO 639-1 language code list. All more specific objects to the **inetnum** object containing this attribute inherit this data.
* **“org:”** – single-valued to make sure that only one organisation is responsible for this resource. This is a required attribute. In some cases, there are business rules to ensure that it is present. If the **inetnum** object is (jointly) maintained by the RIPE NCC then the object must have an “org:” attribute.
* **“sponsoring-org:”** – references an **organisation** object representing the sponsoring organisation that is administratively responsible for the resource. This value is generated by the software and synchronised with the registry information. If a resource is no longer subject to a contract with the sponsoring organisation, or a contract is signed with a new sponsoring organisation, this will be updated in the registry information for this resource. The **inetnum** object in the RIPE Database will then be synchronised with the changes. A user cannot set, remove or change this value. An **inetnum** object can be created without this attribute. The software will generate the correct value if it is required. The RIPE NCC will remove the attribute during a period in-between the ending of a contract with one sponsoring organisation and the signing of a contract with a new sponsoring organisation.
* **“abuse-c:”** – This attribute references an abuse contact object. If present, this overrides any existing referenced **organisation**, or * **"abuse-c:"** attribute present in the hierarchy of this object . This can only be a **role** object that contains an "abuse-mailbox:" attribute. Making this reference will remove any query limits for that **role** object, which must only include business data (no personal information).
* **“status:”** – The status is used to show the different types of data stored in an **inetnum** object and the relative positions within a hierarchy. It can take one of these values:
    * ‘ALLOCATED UNSPECIFIED' – This is mostly used to identify blocks of addresses for which the RIPE NCC is administratively responsible. Historically, a small number of allocations made to members have this status also.
    * ‘ALLOCATED PA' – These are allocations made to members by the RIPE NCC.
    * ‘LIR-PARTITIONED PA' – This is to allow partitioning of an allocation by a member for internal business reasons.
    * ‘SUB-ALLOCATED PA' – A member can sub-allocate a part of an allocation to another organisation. The other organisation may take over some of the management of this sub-allocation. However, the RIPE NCC member is still responsible for the whole of their registered resources, even if parts of it have been sub-allocated. Provisions have been built in to the RIPE Database software to ensure that the member is always technically in control of their allocated address space.
    * ‘ASSIGNED PA' – These are assignments made by a member from their allocations to an End User.
    * ‘ASSIGNED PI' – These are assignments made by the RIPE NCC directly to an End User. In most cases, there is a member acting as the sponsoring organisation who handles the administrative processes on behalf of the End User. The sponsoring organisation may also manage the resource and related objects in the RIPE Database for the End User.
    * ‘ASSIGNED ANYCAST' - This address space has been assigned for use in TLD anycast networks.
    * ‘LEGACY' – These are resources that were allocated to users before the RIPE NCC was set up.

* **“mnt-lower:”** – This attribute references **mntner** objects that provide a set of authorisation tokens used for hierarchical object creation. These tokens are used to authorise the creation of the one-level more specific (child) objects to the **inetnum** with the “mnt-lower:” attribute. If there is no “mnt-lower:” attribute, the “mnt-by:” authorises the creation of the child objects. This is explained in more detail in the section, ['Authorisation'](../Authorisation/#authorisation)
* **“mnt-domains:”** - This attribute references **mntner** objects that provide a set of authorisation tokens used for **domain** object creation for reverse delegation. These tokens are used to authorise the creation of the **domain** objects whose prefixes are contained within the range of addresses set by the **inetnum** with the “mnt-domains:” attribute. Depending on the hierarchical relationship between the **inetnum** and **domain** objects, the “mnt-lower:” and “mnt-by:” attributes may also be used. This is explained in more detail in the section, ['Authorisation'](../Authorisation/#authorisation)
* **“mnt-routes:”** - This attribute references **mntner** objects that provide a set of authorisation tokens that may be used for **route** object creation. Authorisation for **route** object creation is the most complex. This is explained in more detail in the section, ['Authorisation'](../Authorisation/#authorisation)
* **“mnt-irt:”** - This attribute is not a reference to a **mntner** object. It references an **irt** object, which is a contact data object, like the **role** object. Authorisation is required from the **irt** object to be able to add this reference. These references apply in a hierarchical way. Therefore, where an “irt:” attribute is included, all more specifics to that **inetnum** object inherit the reference. This is explained in more detail in the section on Abuse Handling.





## Description of the ROUTE Object

Below is the object template for the **route** object. It lists all possible attributes that are allowed in this object type.

    Attribute Name  Presence   Repeat     Indexed
    route:          mandatory  single     primary/lookup key
    descr:          optional   multiple   
    origin:         mandatory  single     primary/inverse key
    pingable:       optional   multiple   
    ping-hdl:       optional   multiple   inverse key
    holes:          optional   multiple   
    org:            optional   multiple   inverse key
    member-of:      optional   multiple   inverse key
    inject:         optional   multiple   
    aggr-mtd:       optional   single     
    aggr-bndry:     optional   single     
    export-comps:   optional   single     
    components:     optional   single     
    remarks:        optional   multiple   
    notify:         optional   multiple   inverse key
    mnt-lower:      optional   multiple   inverse key
    mnt-routes:     optional   multiple   inverse key
    mnt-by:         mandatory  multiple   inverse key
    created:        generated  single     
    last-modified:  generated  single     
    source:         mandatory  single     

A **route** object contains routing information for IPv4 address space resources. This is one of the main elements of the RIPE Internet Routing Registry.

Each interAS route (also known as an interdomain route) originated by an Autonomous System can be specified by using a **route** object for IPv4 addresses.

Authorisation for creating **route** objects is quite complex. There are multiple scenarios depending on who administers the address space. Because the RIPE INR and IRR are part of the same logical database, they can both be used for authorisation if the address space is RIPE NCC administered resources. For more details on this see the section, ['Authorisation'](../Authorisation/#authorisation).

Please refer to [RFC 2622](https://tools.ietf.org/html/rfc2622) for more information on the specific routing information attributes in the **route** object. 

The route consistency can be checked using the [AS routing consistency tool](https://stat.ripe.net/widget/as-routing-consistency). This wizard compares the actual state of the Internet Routing tables (collected by RIS), in order to identify and correct possible inconsistencies in the RIPE Database.

**Description of Attributes Specific to the ROUTE Object**


* **“route:”** – This specifies the IPv4 address prefix of the route. Together with the "origin:" attribute, these constitute a combined primary key of the **route** object. 
The address can only be specified as a prefix. It can be one or more IP addresses.
* **“descr:”** - A short description related to the object.
* **“origin:”** - AS Number of the Autonomous System that originates the route into the interAS routing system. The corresponding **aut-num** object for this Autonomous System may not exist in the RIPE Database.
* **“pingable:”** - Allows a network operator to advertise an IP address of a node that should be reachable from outside networks. This node can be used as a destination address for diagnostic tests. The IP address must be within the address range of the **route** object containing this attribute.
* **“ping-hdl:”** - References a person or role capable of responding to queries concerning the IP address(es) specified in the 'pingable' attribute.
* **“holes:”** – These attributes form a list of the component address prefixes that are not reachable through the aggregate route (that part of the address space is possibly unallocated).
* **“member-of:”** – This attribute identifies a set object that this **route** object wants to be a member of. This membership claim, however, should be acknowledged by a corresponding "mbrs-by-ref:" attribute in the referenced set object.
* **“inject:”** – These attributes specify which routers perform the aggregation and when they perform it.
* **“aggr-mtd:”** – This attribute specifies how the aggregate is generated.
* **“aggr-bndry:”** – This attribute defines a set of Autonomous Systems, which form the aggregation boundary.
* **“export-comps:”** – This attribute defines the set's policy filter, a logical expression which, when applied to a set of routes, returns a subset of these routes.
* **“components:”** – This attribute defines the component routes used to form the aggregate.
* **“mnt-lower:”** - Provides a set of authorisation tokens used for hierarchical object creation. These tokens are used to authorise the creation of the one level more specific (child) objects to the **route** with the “mnt-lower:” attribute. This is only used if the parent **route** object does not contain an “mnt-routes:” attribute. If there is no “mnt-routes:” or “mnt-lower:” attribute, the “mnt-by:” authorises the creation of the child objects. For more details see the section on authorisation.
* **“mnt-routes:”** - Provides a set of authorisation tokens that may be used for exact match or more specific **route** object creation. For an exact match **route** object- if there is no “mnt-routes:” attribute, the “mnt-by:” is used. For a more specific **route** object the “mnt-lower may also be used, if present.
The "mnt-routes:" attribute can include an optional list of prefix ranges inside curly brackets ("{}") or the keyword "ANY". This should follow the reference to the maintainer. The default, when no additional set items are specified, is "ANY" or all more specifics.





## Description of the ROUTE6 Object

Below is the object template for the **route6** object. It lists all possible attributes that are allowed in this object type.

    Attribute Name  Presence   Repeat     Indexed
    route6:         mandatory  single     primary/lookup key
    descr:          optional   multiple  
    origin:         mandatory  single     primary/inverse key
    pingable:       optional   multiple  
    ping-hdl:       optional   multiple   inverse key
    holes:          optional   multiple  
    org:            optional   multiple   inverse key
    member-of:      optional   multiple   inverse key
    inject:         optional   multiple  
    aggr-mtd:       optional   single    
    aggr-bndry:     optional   single    
    export-comps:   optional   single    
    components:     optional   single    
    remarks:        optional   multiple  
    notify:         optional   multiple   inverse key
    mnt-lower:      optional   multiple   inverse key
    mnt-routes:     optional   multiple   inverse key
    mnt-by:         mandatory  multiple   inverse key
    created:        generated  single
    last-modified:  generated  single
    source:         mandatory  single 

A **route6** object contains routing information for IPv6 address space resources. This is one of the main elements of the RIPE Internet Routing Registry.

Each interAS route (also known as an interdomain route) originated by an Autonomous System can be specified by using a **route6** object for IPv6 addresses.

Authorisation for creating **route6** objects is quite complex. There are four scenarios depending on who administers the address space and the AS Number. Because the RIPE INR and IRR are part of the same logical database, they can both be used for authorisation if the address space and/or AS Number are RIPE NCC administered resources. Where one or both are not administered by the RIPE NCC authorisation is bypassed but with the illusion of being genuine authorisation. For more details see the section ['Authorisation'](../Authorisation/#authorisation).

The route consistency can be checked using the [AS routing consistency tool](https://stat.ripe.net/widget/as-routing-consistency). This wizard compares the actual state of the Internet Routing tables (collected by RIS), in order to identify and correct possible inconsistencies in the RIPE Database.

**Example ROUTE6 object including all optional attributes:**

    route6:        fc00:600::/32
    descr:         Route
    origin:        AS3333
    mnt-by:        CHILD-MB-MNT
    components:    protocol BGP4 { 0:0:0:0:1:1:1:1/10^+}
                   protocol OSPF { 0:0:0:0:1:1:1:1/12^+}
    inject:        at 1.2.3.4 action pref=100; upon HAVE-COMPONENTS { 0:0:0:0:1:1:1:1/0, 0:0:0:0:1:1:1:1/0 }
    inject:        at rtrs-myset:AS2:rtrs-test:AS777234
    inject:        at AS777234:rtrs-myset:AS2:rtrs-test:AS7777234
    inject:        action community = {65535:295};
    inject:        action community = {65535:20};
    inject:        upon HAVE-COMPONENTS {::/8}
    export-comps:  { fc00:600::/48 }
    holes:         fc00:600::/48, fc00:600::/56, fc00:600::/64
    aggr-bndry:    AS771234:AS-mytest:AS3:AS-test:AS775234
    aggr-mtd:      outbound AS771234:AS-mytest:AS3:AS-test:AS775234
    member-of:     AS200200:rs-test
    member-of:     AS3333:rs-test
    mnt-routes:    LIR-MNT { fc00:600::/36^+, fc00:600::/36^-, fc00:600::/16^36-48, fc00:600::/16^42, fc00:600::/56}
    mnt-routes:    LIR2-MNT      anY
    created:       1970-01-01T00:00:00Z
    last-modified: 2012-01-01T15:30:45Z
    source:        TEST

Please refer to [RFC 2622](https://tools.ietf.org/html/rfc2622) for more information on the specific routing information attributes in the **route6** object. 

**Description of Attributes Specific to the ROUTE6 Object**


* **“route6:”** – This specifies the IPv6 address prefix of the route. Together with the "origin:" attribute, these constitute a combined primary key of the **route6** object.
The address can only be specified as a prefix. It can be one or more addresses.
* **“descr:”** - A short description related to the object.
* **“origin:”** - AS Number of the Autonomous System that originates the route into the interAS routing system. The corresponding **aut-num** object for this AS must already exist in the RIPE Database.
* **“pingable:”** - Allows a network operator to advertise an IP address of a node that should be reachable from outside networks. This node can be used as a destination address for diagnostic tests. The IP address must be within the address range of the route6 object containing this attribute.
* **“ping-hdl:”** - References a person or role capable of responding to queries concerning the IP address(es) specified in the 'pingable' attribute.
* **“holes:”** – These attributes form a list of the component address prefixes that are not reachable through the aggregate route (that part of the address space is possibly unallocated).
* **“member-of:”** – This attribute identifies a set object that this **route6** object wants to be a member of. This membership claim, however, should be acknowledged by a corresponding "mbrs-by-ref:" attribute in the referenced set object.
* **“inject:”** – These attributes specify which routers perform the aggregation and when they perform it.
* **“aggr-mtd:”** – This attribute specifies how the aggregate is generated.
* **“aggr-bndry:”** – This attribute defines a set of Autonomous Systems, which form the aggregation boundary.
* **“export-comps:”** – This attribute defines the set's policy filter, a logical expression which when applied to a set of routes returns a subset of these routes.
* **“components:”** – This attribute defines the component routes used to form the aggregate.
* **“mnt-lower:”** - Provides a set of authorisation tokens used for hierarchical object creation. These tokens are used to authorise the creation of the one level more specific (child) objects to the **route6** with the “mnt-lower:” attribute. This is only used if the parent **route6** object does not contain an “mnt-routes:” attribute. If there is no “mnt-routes:” or “mnt-lower:” attribute, the “mnt-by:” authorises the creation of the child objects. For more details see the section ['Authorisation'](../Authorisation/#authorisation).
* **“mnt-routes:”** - Provides a set of authorisation tokens that may be used for exact match or more specific **route6** object creation. For an exact match **route6** object- if there is no “mnt-routes:” attribute, the “mnt-by:” is used. For a more specific **route6** object- the “mnt-lower may also be used, if present. 
The "mnt-routes:" attribute can include an optional list of prefix ranges inside curly brackets ("{}") or the keyword "ANY". This should follow the reference to the maintainer. The default, when no additional set items are specified, is "ANY" or all more specifics.






## Description of the AS-SET Object

Below is the object template for the **as-set** object. It lists all possible attributes that are allowed in this object type.

    Attribute Name  Presence   Repeat     Indexed
    as-set:         mandatory  single     primary/lookup key
    descr:          optional   multiple
    members:        optional   multiple  
    mbrs-by-ref:    optional   multiple   inverse key
    remarks:        optional   multiple  
    org:            optional   multiple   inverse key
    tech-c:         mandatory  multiple   inverse key
    admin-c:        mandatory  multiple   inverse key
    notify:         optional   multiple   inverse key
    mnt-by:         mandatory  multiple   inverse key
    mnt-lower:      optional   multiple   inverse key
    created:        generated  single
    last-modified:  generated  single
    source:         mandatory  single 

To specify policies, it is often useful to define sets of objects. An **as-set** object forms a set of AS Numbers that can be referenced in many of the places where an AS Number reference can be used. Sets can be built with hierarchical names and can also include direct references to other sets. References can also be made indirectly by using the “mbrs-by-ref:” attribute. For more details see the section about [sets](../Set-Objects/#set-objects).

**Description of Attributes Specific to the AS-SET Object**

* **“as-set:”** – This attribute defines the name of the set which must start with ‘as-‘. It can be a hierarchical name with components separated by a colon (`:`). At least one component must be an **as-set** name. The others can be more set names or AS Numbers. All the set name components of a hierarchical name have to be as-set names. For more details see the section on sets.
* **“descr:”** – A short description related to the object.
* **“members:”** – These attributes list the direct members of the set. They can be either lists of AS Numbers, or other **as-set** names.
* **“mbrs-by-ref:”** – These attributes can be used in all set objects. They allow indirect population of a set. If this attribute is used, the set also includes objects of the corresponding type (**aut-num** objects for as-set, for example) that are protected by one of these maintainers and whose "member-of:" attributes refer to the name of the set. If the value of a "mbrs-by-ref:" attribute is ANY, any object of the corresponding type referring to the set is a member of the set. If there are no "mbrs-by-ref:" attributes, the set is defined explicitly by the "members:" attributes. For more details see the section about sets.
* **“mnt-lower:”** – When creating hierarchical sets, more specific object creations can be authorised using the “mnt-lower:”, if present. Otherwise the “mnt-by:” **mntner** objects can be used for authorisation. For more details see the section about sets.





## Description of the FILTER-SET Object

Below is the object template for the **filter-set** object. It lists all possible attributes that are allowed in this object type. Required attributes are shown as ‘mandatory'.

    Attribute Name  Presence   Repeat     Indexed
    filter-set:     mandatory  single     primary/lookup key
    descr:          optional   multiple
    filter:         optional   single  
    mp-filter:      optional   single     
    remarks:        optional   multiple  
    org:            optional   multiple   inverse key
    tech-c:         mandatory  multiple   inverse key
    admin-c:        mandatory  multiple   inverse key
    notify:         optional   multiple   inverse key
    mnt-by:         mandatory  multiple   inverse key
    mnt-lower:      optional   multiple   inverse key
    created:        generated  single
    last-modified:  generated  single
    source:         mandatory  single 

To specify routing policies, it is often useful to define sets of objects. A **filter-set** object defines a set of routes that match the criteria that you specify in your 'filter' – in other words, it filters out the routes that you do not want to see. The policy filter can match routes using any BGP path attribute, such as the destination address prefix, AS-path, or community attributes. Although the “filter:” and “mp-filter:” attributes are ‘single', they can be composite by using the operators AND, OR, and NOT.

Sets can be built with hierarchical names. Unlike other set objects **the filter-set** object does not include the “members:” or "mbrs-by-ref:" attributes.

**Description of Attributes Specific to the FILTER-SET Object**


* **“filter-set:”** – This attribute defines the name of the set which must start with ‘fltr-‘. It can be a hierarchical name with components separated by a colon (`:`). At least one component must be a **filter-set** name. The others can be more set names or AS Numbers. All the set name components of a hierarchical name must be **filter-set** names. For more details, see the section about sets.
* **“descr:”** – A short description related to the object.
* **“filter:”** – This attribute defines the policy filter of the set. This is a logical expression which, when applied to a set of routes, returns a subset of these routes. These are the ones that you want to filter in or filter out. A **filter-set** object is required by business rules to include either a “filter:” or an “mp-filter:” attribute. One of these must exist, but you cannot include both attributes.
* **“mp-filter:”** – This attribute extends the "filter:" attribute to allow you to specify IPv4 or IPv6 prefixes and prefix ranges. A **filter-set** object is required by business rules to include either a “filter:” or an “mp-filter:” attribute. One of these must exist, but you cannot include both attributes.
* **“mnt-lower:”** – When creating hierarchical sets, more specific object creations can be authorised using the “mnt-lower:”, if present, otherwise they can be authorised by “mnt-by:” **mntner** objects. For more details see the section about sets.








## Description of the INET-RTR Object

Below is the object template for the **inet-rtr** object. It lists all possible attributes that are allowed in this object type.

    Attribute Name  Presence     Repeat       Indexed
    inet-rtr:       mandatory    single       primary/lookup key
    descr:          optional     multiple  
    alias:          optional     multiple   
    local-as:       mandatory    single       inverse key
    ifaddr:         mandatory    multiple     inverse key
    interface:      optional     multiple   
    peer:           optional     multiple   
    mp-peer:        optional     multiple   
    member-of:      optional     multiple     inverse key
    remarks:        optional     multiple   
    org:            optional     multiple     inverse key
    admin-c:        mandatory    multiple     inverse key
    tech-c:         mandatory    multiple     inverse key
    notify:         optional     multiple     inverse key
    mnt-by:         mandatory    multiple     inverse key
    created:        generated    single     
    last-modified:  generated    single     
    source:         mandatory    single     

An **inet-rtr** object specifies a router and its peering protocols with other routers. Canonical DNS name aliases can be set up as well as specifying which AS Number owns/operates the router.

**Description of Attributes Specific to the INET-RTR Object**


* **“inet-rtr:”** – This attribute is a valid DNS name of the router described by this object. It cannot end with a dot.
* **“descr:”** – A short description related to the object.
* **“alias:”** – Each optional “alias:” attribute is a canonical DNS name for the router.
* **“local-as:”** – This attribute specifies the AS Number of the AS which owns/operates this router.
* **“ifaddr:”** - This attribute specifies the interface address and mask length within an Internet router, as well as an optional action to set other parameters on this interface.
* **“interface:”** – This attribute specifies an interface address, This can be multi-protocol. It can have an optional action, examples being RPSL preferences, prepending and MED. Also an optional tunnel definition can be included.
* **“peer:”** – This attribute specifies the details of any interior or exterior router peering. This can be specified using either an IP address of the peer router or its **inet-rtr** name. A group of peers can be specified using an **rtr-set** name or a peering-set name. If **peering-set** name form is used, only the peerings in the corresponding **peering set** that are with this router are included.
* **“mp-peer:”** – This attribute extends the "peer:" attribute to support both IPv4 and IPv6 addresses.
* **“member-of:”** - references a set object that this router wants to be a member of. This membership claim must be acknowledged by a respective "mbrs-by-ref:" attribute in the referenced set object.






## Description of the PEERING-SET Object

Below is the object template for the **peering-set** object. It lists all possible attributes that are allowed in this object type. Required attributes are shown as ‘mandatory'.

    Attribute  Name  Presence   Repeat     Indexed 
    peering-set:     mandatory  single     primary/lookup key
    descr:           optional   multiple
    peering:         optional   multiple  
    mp-peering:      optional   multiple
    remarks:         optional   multiple  
    org:             optional   multiple   inverse key
    tech-c:          mandatory  multiple   inverse key
    admin-c:         mandatory  multiple   inverse key
    notify:          optional   multiple   inverse key
    mnt-by:          mandatory  multiple   inverse key
    mnt-lower:       optional   multiple   inverse key
    created:         generated  single
    last-modified:   generated  single
    source:          mandatory  single   

To specify routing policies, it is often useful to define sets of objects. A **peering-set** object defines a set of peerings that you specify in the “peering:” or “mp-peering:” attribute. It identifies all the peerings between a (set of) local routers and a (set of) peer routers. Although the “peering:” and “mp-peering:” attributes are ‘single', they can be composite by using the operators AND, OR, and EXCEPT. EXCEPT is equivalent to ‘AND NOT'.

Sets can be built with hierarchical names. Unlike other set objects the **peering-set** object does not include the “members:” or "mbrs-by-ref:" attributes.

**Description of Attributes Specific to the PEERING-SET Object**


* **“peering-set:”** – This attribute defines the name of the set which must start with ‘prng-‘. It can be a hierarchical name with components separated by a colon (`:`). At least one component must be a **peering-set** name. The others can be more set names or AS Numbers. All the set name components of a hierarchical name have to be **peering-set** names. For more details see the section ['Set Objects'](../Set-Objects/#set-objects).

* **“descr:”** – A short description related to the object.
* **“peering:”** – This attribute defines a peering that you can use to import or export routes. A **peering-set** object is required by business rules to include either a “peering:” or an “mp-peering:” attribute. One of these must exist, but you cannot include both attributes.
* **“mp-peering:”** – This attribute extends the "peering:" attribute to allow you to specify IPv4 or IPv6 prefixes and prefix ranges. A **peering-set** object is required by business rules to include either a “peering:” or an “mp-peering:” attribute. One of these must exist, but you cannot include both attributes.
* **“mnt-lower:”** – When creating hierarchical sets, more specific object creations can be authorised using the “mnt-lower:”, if present, otherwise the “mnt-by:” **mntner** objects. For more details see the section ['Set Objects'](../Set-Objects/#set-objects).




## Description of the ROUTE-SET Object

Below is the object template for the **route-set** object. It lists all possible attributes that are allowed in this object type.

    Attribute Name  Presence   Repeat     Indexed
    route-set:      mandatory  single     primary/lookup key
    descr:          optional   multiple
    members:        optional   multiple  
    mp-members:     optional   multiple  
    mbrs-by-ref:    optional   multiple   inverse key
    remarks:        optional   multiple  
    org:            optional   multiple   inverse key
    tech-c:         mandatory  multiple   inverse key
    admin-c:        mandatory  multiple   inverse key
    notify:         optional   multiple   inverse key
    mnt-by:         mandatory  multiple   inverse key
    mnt-lower:      optional   multiple   inverse key
    created:        generated  single
    last-modified:  generated  single
    source:         mandatory  single   

A **route-set** object is a set of route prefixes and not a set of database **route** objects. Sets can be built with hierarchical names and can also include direct references to other sets. References can also be made indirectly by using the “mbrs-by-ref:” attribute. For more details see the section on Sets.

Where a **route-set** is expected (e.g. “members:” attribute of the **route-set** object), an AS number ASx defines the set of routes that are originated by ASx; and an **as-set** AS-X defines the set of routes that are originated by the ASes in AS-X. A route p is said to be originated by ASx if there is a **route** object for p, with ASx as the value of the “origin:” attribute.

**Description of Attributes Specific to the ROUTE-SET Object**

* **“route-set:”** – This attribute defines the name of the set which must start with ‘rs-‘. It can be a hierarchical name with components separated by a colon (`:`). At least one component must be a **route-set** name. The others can be more set names or AS Numbers. All the set name components of a hierarchical name have to be **route-set** names. For more details see the section on Sets.
* **“descr:”** – A short description related to the object.
* **“members:”** – These attributes list the direct members of the set. They can be either address prefixes or ranges, other **route-set** names, lists of AS Numbers, or as-set names. An address prefix or a **route-set** name in a members attribute can be optionally followed by a range operator.
* **“mp-members:”** – Extends the “members:” attribute to include IPv6 address prefixes.
* **“mbrs-by-ref:”** – These attributes can be used in all set objects. They allow indirect population of a set. If this attribute is used, the set also includes objects of the corresponding type (**aut-num**, **route-set** or **as-set** objects for **route-set**, for example) that are protected by one of these maintainers and whose "member-of:" attributes refer to the name of the set. If the value of a "mbrs-by-ref:" attribute is ‘ANY', any object of the corresponding type referring to the set is a member of the set. If there are no "mbrs-by-ref:" attributes, the set is defined explicitly by the "members:" attributes. For more details see the section ['Set Objects'](../Set-Objects/#set-objects).
* **“mnt-lower:”** – When creating hierarchical sets, more specific object creations can be authorised using the “mnt-lower:”, if present, otherwise the “mnt-by:” **mntner** objects. For more details see the section ['Set Objects'](../Set-Objects/#set-objects).




## Description of the RTR-SET Object

Below is the object template for the **rtr-set** object. It lists all possible attributes that are allowed in this object type.

    Attribute Name  Presence   Repeat     Indexed
    rtr-set:        mandatory  single     primary/lookup key
    descr:          optional   multiple
    members:        optional   multiple  
    mp-members:     optional   multiple  
    mbrs-by-ref:    optional   multiple   inverse key
    remarks:        optional   multiple  
    org:            optional   multiple   inverse key
    tech-c:         mandatory  multiple   inverse key
    admin-c:        mandatory  multiple   inverse key
    notify:         optional   multiple   inverse key
    mnt-by:         mandatory  multiple   inverse key
    mnt-lower:      optional   multiple   inverse key
    created:        generated  single
    last-modified:  generated  single
    source:         mandatory  single   

A **rtr-set** object defines a set of routers. Sets can be built with hierarchical names and can also include direct references to other sets. References can also be made indirectly by using the “mbrs-by-ref:” attribute. For more details, see the section ['Set Objects'](../Set-Objects/#set-objects).

**Description of Attributes Specific to the RTR-SET Object**


* **“rtr-set:”** – This attribute defines the name of the set which must start with ‘rtrs-‘. It can be a hierarchical name with components separated by a colon (`:`). At least one component must be an **rtr-set** name. The others can be more set names or AS Numbers. All the set name components of a hierarchical name have to be rtr-set names. For more details, see the section ['Set Objects'](../Set-Objects/#set-objects).
* **“descr:”** – A short description related to the object.
* **“members:”** – These attributes list the direct members of the set. They can be **inet-rtr** names, or IPv4 addresses, or other **rtr-set** names.
* **“mp-members:”** – This attribute extends the “members:” attribute to include IPv6 addresses.
* **“mbrs-by-ref:”** – These attributes can be used in all set objects. They allow indirect population of a set. If this attribute is used, the set also includes objects of the corresponding type (**inet-rtr** or other **rtr-set** objects for **rtr-set**, for example) that are protected by one of these maintainers and whose "member-of:" attributes refer to the name of the set. If the value of a "mbrs-by-ref:" attribute is ‘ANY', any object of the corresponding type referring to the set is a member of the set. If there are no "mbrs-by-ref:" attributes, the set is defined explicitly by the "members:" attributes. For more details, see the section ['Set Objects'](../Set-Objects/#set-objects).
* **“mnt-lower:”** – When creating hierarchical sets, more specific object creations can be authorised using the “mnt-lower:”, if present. Otherwise, it can be authorised using the “mnt-by:” **mntner** objects. For more details, see the section ['Set Objects'](../Set-Objects/#set-objects).
