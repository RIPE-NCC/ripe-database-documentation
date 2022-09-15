# Abstract

This document describes how to update series 3.x of the RIPE Database. This series uses the [Routing Policy Specification Language (RPSL)](ftp://ftp.ripe.net/rfc/rfc2622.txt) to represent all database objects. It uses the [Routing Policy System Security (RPSS)](ftp://ftp.ripe.net/rfc/rfc2725.txt) for authorisation. This provides better security for Internet Routing Registries (IRRs). It makes use of [RPSL next generation specifications] [https://datatracker.ietf.org/doc/html/draft-blunk-rpslng-08]. This allows for registering of multicast and IPv6 routing policies. Though this document is self-contained, you may also read the [RPSL](ftp://ftp.ripe.net/rfc/rfc2622.txt) and [RPSS](ftp://ftp.ripe.net/rfc/rfc2725.txt) specifications. For a tutorial on RPSL, you can read the [RPSL applications document](ftp://ftp.ripe.net/rfc/rfc2650.txt).

# Intended Audience

This reference manual is for intermediate and advanced users who update the RIPE Database. If you are new to the database, you might find the [RIPE Database User Manual: Getting Started](../01.introduction-to-the-RIPE-Database/01-RIPE-Database-Documentation-Overview.md) to be a more helpful place to start.

# Conventions Used in This Document

We use &lt;label&gt; for a placeholder or to indicate syntax.
We use [option] to indicate an optional text or command argument. 
In object templates, we use square brackets "[ ]" to indicate an attribute type.

"RIPE Database" is used with different meanings depending on the context. It may mean the interface software, the logical database or the information in the database. Where there may be doubt, this manual will make clear what is being discussed.

# Introduction

The RIPE Network Management Database (often called the "RIPE Database") contains information about IP address space allocations and assignments, routing policies and reverse delegations in the [RIPE NCC service region](DIFF)
<font color="orange">DIFF http://www.ripe.net/membership/maps/index.html or http://www.ripe.net/lir-services/member-support/info/list-of-members</font>

<font color="green">
It also contains some information about forward domain names. However, this information about domain names is for reference only and will be removed soon. The RIPE Database is not the same as the domain name registries, which are run by the country code Top-Level Domain (ccTLD) administrators of Europe and surrounding areas. If this is what you need, you should use the IANA ccTLD Database for a full list of the [ccTLD administrators](http://www.iana.org/cctld/cctld-whois.htm).
</font>

While the information in the RIPE Database is made freely available to the public, it is subject to [Terms and Conditions](DIFF).
<font color="orange">DIFF http://www.iana.org/cctld/cctld-whois.htm or http://www.ripe.net/db/support/db-terms-conditions.pdf</font>

<font color="green">
This document describes how to update series 3.x of the RIPE Database. This series uses the [Routing Policy Specification Language (RPSL)](ftp://ftp.ripe.net/rfc/rfc2622.txt) to represent all RIPE Database data objects. It uses the [Routing Policy System Security (RPSS)](ftp://ftp.ripe.net/rfc/rfc2725.txt) for authorisation. This provides better security for Internet Routing Registries (IRR). The RIPE Database includes data for an IRR as well as for an Internet Number Registry (INR). It makes use of RPSL next generation specifications. This allows for registering of multicast and IPv6 routing policies.
</font>

This document focuses on how to update the database. It does not explain in any detail how the database software works. It does not always make clear why updates work this way. For that you may need to refer to [RIPE Policy documents](../01.introduction-to-the-RIPE-Database/01-RIPE-Database-Documentation-Overview.md). This document is not a statement of any RIPE Policy.

This document is self-contained, but does not provide many examples of usage or illustrations of how the RIPE Database works. The [RIPE Database User Manual: Getting Started](../01.introduction-to-the-RIPE-Database/01-RIPE-Database-Documentation-Overview.md) contains some examples. You may also need to read the [RIPE Database Query Reference Manual](CHANGE), 

<font color="blue">
CHANGE instead of https://www.ripe.net/manage-ips-and-asns/db/support/documentation/ripe-database-query-reference-manual reference
we could use ../06.Update-Methods/README.md
</font>

which explains how to query the RIPE Database. The query and update manuals form a complimentary set.

# 1.Database Objects and Attributes

The RIPE Database contains records of:

    * Allocations and assignments of IP address space (the IP address registry or INR)
    * Domain names (mainly for recerse domains)
    * Routing policy information (the routing registry or IRR)
    * Contact information (details of people who are registered as the contacts for the Internet resources used in the operation of networks or routers, and their organisations).


<font color="orange">
The RIPE NCC does not maintain the contents of the RIPE Database. The registered contacts (Registrants) and the Maintainers are the people who do this).

The information on domain names (except for in-addr.arpa reverse domains) has no effect on operations. Forward domain information was included in the RIPE Database for reference only and is not complete or authoritative. It will be removed in the future. If you want authoritative information on forward domains, you need to contact [ccTLD administrators](http://www.iana.org/cctld/cctld-whois.htm).

or (DIFF)

The RIPE NCC maintains the Internet resources in the database that are allocated or assigned by the RIPE NCC. These resource objects are tagged as ‘RIPE-REGISTRY- RESOURCE’. For other resource objects tagged as ‘RIPE-USER-RESOURCE’, the registered contacts (Registrants) and the holders of the referenced mntner objects maintain this data.
</font>

## 1.1 Object Representation

The records in the RIPE Database are known as **"objects"**. [RPSL](ftp://ftp.ripe.net/rfc/rfc2622.txt) defines the syntax of database objects (how they are written). An object belongs to one of the object types or classes. We use the two terms - 'type' and 'class' - interchangeably throughout this document.

**Table 1.1 Object Types Supported by the RIPE Database**

| **Object type (Class name)** | **Short name** | **Description**                                                                                                                          |
|------------------------------|----------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **as-block**                 | ak             | Represents delegation of a range of Autonomous System (AS) Numbers to a given repository.                                                |
| **as-set**                   | as             | Set of **aut-num** objects.                                                                                                              |
| **aut-num**                  | an             | AS Number in the database. It describes the external routing policy of the AS.                                                           |
| **domain**                   | dn             | Reverse domain registrations.                                                                                                            |
| **filter-set**               | fs             | Set of routes matched by its filter.                                                                                                     |
| **inet6num**                 | i6             | Allocations and assignments of IPv6 address space.                                                                                       |
| **inetnum**                  | in             | Allocations and assignments of IPv4 address space.                                                                                       |
| **inet-rtr**                 | ir             | Router in the database.                                                                                                                  |
| **irt**                      | it             | Contact and authentication information about a Computer Security Incidence Response Team (CSIRT).                                        |
| **key-cert**                 | kc             | Public key certificate that is stored on the server and may be used with a **mntner** object for authentication when performing updates. |
| **mntner**                   | mt             | Authentication information needed to authorise creation, deletion or modification of the objects protected by the **mntner**.            |
| **organisation**             | oa             | Organisation that holds the resources.                                                                                                   |
| **peering-set**              | ps             | Set of peerings.                                                                                                                         |
| **person**                   | pn             | Technical, administrative or DNS zone contacts.                                                                                          |
| **poem**                     | po             | Humorous poem.                                                                                                                           |
| **poetic-form**              | pf             | Type of humour for a **poem** object.                                                                                                    |
| **role**                     | ro             | List of person objects for a set of people who perform a role.                                                                           |
| **route**                    | rt             | IPv4 route advertised on the Internet.                                                                                                   |
| **route6**                   | r6             | IPv6 route advertised on the Internet.                                                                                                   |
| **route-set**                | rs             | Set of routes.                                                                                                                           |
| **rtr-set**                  | is             | Set of routers.   



The RIPE NCC defines a database object as a list of attribute-value pairs in plain text form. DIFF. If you use any other character sets, or non-printable characters, it may cause problems and your updates could fail.

<font color="orange">DIFF The database software only recognises the printable ASCII character set or The database software uses characters with Latin1 encoding</font>

When an object is stored in the database, the attributes and values are unchanged and the order is maintained. The software might adjust spacing between them to align the values and make them easier to read.

Each attribute-value pair must start on a separate line. The software is set up to treat a blank line as the end of an object. This is why you cannot include a completely blank line in the middle of an object.

Attribute names have a precisely defined syntax and only use alpha numeric and the hyphen (-) characters. They are not case sensitive, but most people use lower case. The attribute name must start at column 0 and must immediately be followed by a colon (:). No spaces or tabs are allowed in between the attribute name and the colon. If you enter anything different, you will see an error message and your update will fail.
<font color="green">
    For example:
        mntner: TEST-DBM-MNT
</font>

The first attribute that you need to specify is the one that has the same name as the object type. The database software uses this to identify the object type. If the object type is not recognised, that part of the message will be treated as 'other' text. Any 'other' text will be disregarded by the software. Other attributes can appear in any order, but most people stick to the order as shown in the object templates. Each object is uniquely identified by a set of attribute values. We call this set of attributes the 'class primary key'. For most object types this is the value of the first attribute. In some cases it is a different attribute value or a composite of more than one attribute value. The attributes which make up the 'class primary key' are shown in the object templates.

The value part of the attribute-value pair starts after the colon (`:`). It can contain some pre-defined keywords, references to other objects and free text. You can refer to other objects by using their 'class primary key' values. These references and the keywords have a precisely defined syntax. If you enter anything different, or if the objects you refer to do not already exist in the database, you will see error messages and your update will fail. The free text has no syntax, but may only contain recognisable characters.

Attribute values may contain spaces and tab characters to help make the information easier to read. Note that spaces work better than tabs, as tabs can display differently on different machines.

You can also split a value over several lines by placing a space, a tab or a plus (+) sign in column 0 of each of the continuation lines. If you wish, you can use more spaces after the continuation character to make it easier to read. The plus (+) sign for line continuation allows attribute values to contain an almost blank line. The software is set up to treat a blank line as the end of an object. This is why you cannot include a completely blank line in the middle of an object.

<font color="green">
    address: Street 5
    + City
</font>

An attribute value may also contain 'end of line' comments. These start with a hash (#) and continue until the end of the physical line. If a value is split over several lines, any of the lines may include an 'end of line' comment. You cannot continue the comment on another line. These comments always stop at the end of the line in which they start. An end of line comment cannot start at column 0. It is possible to add end of line comments on several consecutive lines which together form a block of text. However, for long comments, it is better to use the "remarks:" attribute.

Any free form value cannot contain a hash (#) as this would be treated this as a comment. Although the software does not process comments, in some situations it does strip off the comments before using the values.

Long end of line comments or long free form attribute values can cause problems. Some mail clients automatically break lines at a certain point. If your mail client does this on an update message then your update will fail. It may not be obvious at first sight that this has happened.

**Attributes can be mandatory, optional or generated.**

<font color="green">
Attributes can be mandatory, optional or generated. The object template shows the type of each attribute per object. They can be listed using the query:
    whois –t <object-type>
There is also a more verbose description available by querying: 
    whois –v <object-type>
</font>

You MUST define 'mandatory attributes' in all instances of an object type. If you do not, then the update will fail.

<font color="orange">
You can skip 'optional attributes'. However, if you do decide to define them, then both the attribute and its value must be syntactically correct. If they are not, then your update will fail. When you skip an optional attribute, remove it completely from the object. You cannot include the attribute name and leave the value blank (unless it is free text).

or 

You can leave out 'optional’ attributes. However, if you choose to include them, then both the attribute and its value must be syntactically correct. Optional attributes are sometimes ‘required’ by the business rules enforced by the software.</font>

The database software creates any 'generated attributes'. You can skip generated attributes. Where a user-supplied value is not correct, the software will replace it with a generated value. If the software changes a user-supplied value, it will explain the change in a warning message returned to the user. When you skip a generated attribute, remove it completely from the object. You cannot include the attribute name and leave the value blank (unless it is free text).

**Attributes can have single or multiple values.**

You can only include a 'single valued attribute' once in an object. That one instance can only have a single value.

You can include a 'multiple valued attribute' many times within an object. Each of these attribute instances may also have multiple values separated by commas. However, if the value is free text, the attribute may only have a single value - as a comma may be a part of the free text. But it can still have multiple instances.

Only attributes with free text values (no keywords or references to other objects) can have a blank value. The software will treat any other attribute, including optional and generated attributes, with a blank value as a syntax error and the update will fail.

The value for each type of attribute has a format that defines its syntax. For a detailed description of the attributes supported in the RIPE Database, you should refer to [RPSL Object Types section](../04.RPSL-Object-Types/README.md).



## 1.2 Object Types

This section describes the object types (classes) that the RIPE Database supports. Some description is included about the definition and use of the attributes of each object type. For a strict definition of the syntax of each attribute see [RPSL Object Types section](../04.RPSL-Object-Types/README.md).

A set of object templates show which attributes are allowed in each object type. We use the following definitions in the templates:

| [mandatory]                | You must include at least one instance of this attribute in an object of the class.             | 
| [optional]                 | This attribute is optional in the objects of the class and you can miss it out completely.<font color="green">unless it is ‘required’ by the software business rules. </font>         | 
| [generated]                | The server automatically generates this attribute and you can miss it out completely. If you provide the value it may be replaced.             | 
| [single]                   | Objects must not contain more than one instance of this attribute - value pair.             | 
| [multiple]                 | Objects may contain more than one instance of this attribute. An instance may contain more than one value, separated by commas.             | 
| [look-up key]              | This attribute is indexed.             | 
| [inverse key]              | This attribute is in the "reverse" index.             | 
| [primary key]              | This attribute is (part of) the class primary key.             | 
| [primary/lookup key]       | This attribute is indexed and is also (part of) the class primary key.

In an object template the first column represents an attribute, the second and third columns specify the type of the attribute and the fourth column tells whether the attribute is (part of) a database key for the object.

The "changed:" and "source:" attributes are mandatory in all objects. <font color="green">The information in this attribute may show who created or modified the object and when. It is not reliable as a full audit trail. It is used as a reference for the benefit of the maintainer of the object. It is not intended to give any reliable information to a user who queries for an object.</font> 

* The "changed:" attribute is for the user's own reference. It must contain an email address and a timestamp. If the timestamp is not included the database software will add the current timestamp at the time of the update.<font color="green">Nothing can be reliably determined by anyone other than the user about the object or its change history by looking at the "changed:" attributes. There are a set of rules applicable to this attribute, but they are loose enough to allow the user to do almost anything with it.</font> 

* There must be at least one “changed:” attribute. <font color="green">If there are more they must be in ascending date order.</font>

* <font color="orange">The dates can be set to any date after April 2001 (when Version 3 of the RIPE Database was launched). or The dates can be set to any date after April 1984.</font>

* Any changed "attribute:" can be modified or deleted by the user as long as at least one remains.

* The "source:" attribute specifies the registry where the object is registered. This should be "RIPE" for the RIPE Database. <font color="green">“TEST” is also a valid “source:” attribute, it indicates that the object belongs to the RIPE TEST database.</font>

* The RIPE Database is not configured to allow updates to any other source.

All objects must be maintained. Therefore the "mnt-by:" attribute is mandatory in all objects.

### 1.2.1 as-block

The RIPE Database Administrators create as-block objects manually; it is not an automatic process. If a user attempts to create one, the request is forwarded to the RIPE Database Administrator.

An as-block object delegates a range of AS Numbers to a given repository.

This object sets the authorisation required for the creation of aut-num objects within the range specified by the "as-block:" attribute. This is set by the "mnt-lower:" and "mnt-by:" attributes.

<font color="green">

as-block:       [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]

</font>


### 1.2.2 as-set

An **as-set** object defines a set of **aut-num** objects.

* The "as-set:" attribute defines the name of the set. It is an RPSL name that starts with "as-".
* The name of an **as-set** object can be hierarchical. A hierarchical **as-set** name is a sequence of **as-set** names and AS Numbers separated by colons. At least one component must be an actual as-set name (i.e. start with "as-"). All the set name components of a hierarchical as-name have to be as-set names.
* The "members:" attribute lists the members of the set. It can be either a list of AS Numbers, or other as-set names.
* The "mbrs-by-ref:" attribute can be used in all "set" objects; it allows indirect population of a set. If this attribute is used, the set also includes objects of the corresponding type (**aut-num** objects for as-set, for example) that are protected by one of these maintainers and whose "member-of:" attributes refer to the name of the set. If the value of a "mbrs-by-ref:" attribute is ANY, any object of the corresponding type referring to the set is a member of the set. If the "mbrs-by-ref:" attribute is missing, the set is defined explicitly by the "members:" attribute.
* This object sets the authorisation required for the creation of other **as-set** objects one level down in a hierarchy. This is set by the "mnt-lower:" and "mnt-by:" attributes.

Here is an as-set object template:

as-set:         [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
members:        [optional]   [multiple]   [ ]
mbrs-by-ref:    [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.3 aut-num

<font color="orange">
The **aut-num** object specifies routing policies. It refers to a group of IP networks that have a single and clearly defined external routing policy, operated by one or more network operators – an Autonomous System (AS).

or 

The **aut-num** object contains registration details of an AS Number and allows routing policies to be published. It refers to a group of IP networks that have a single and clearly- defined external routing policy, operated by one or more network operators – an Autonomous System (AS).</font>

These are 32 bit numbers. <font color="green">Historically, these were 16-bit numbers. But now those are now just a subset of the larger 32-bit set of numbers.</font>The class primary key values will be in this format:

    ASn where n is a 32-bit number

Leading zeroes (AS0352) are not allowed and will be removed (AS352) by the database software.

* The value of the "aut-num:" attribute is the AS Number of the Autonomous System that this object describes and starts with AS.
* The "as-name:" attribute is a symbolic name of the AS.
* The "member-of:" attribute value identifies a set object that this object wants to be a member of. This claim, however, should be acknowledged by a respective "mbrs-by-ref:" attribute in the referenced object.
* The import, export and default routing policies of the AS are specified using the "import:", "export:" and "default:" attributes respectively.
* <font color="green">"import-via:" and "export-via:" - specify routing policies regarding non-adjacent networks. These attributes help participants of Multi-Lateral Peering services to inform the intermediate autonomous system what routing policy should be applied towards other participants. Please refer to [33](https://datatracker.ietf.org/doc/html/draft-snijders-rpsl-via-02) for more information.</font>
* Corresponding attributes with "mp-" prefix, "mp-import:", "mp-export:" and "mp-default:" are used to specify <font color="green">IPv4, </font>IPv6 and multicast routing policies.
* Only a single value for the "org:" attribute is allowed in the **aut-num** object. This is to ensure only one organisation is responsible for this resource.
* This object sets part of the authorisation required for the creation of **route** and **route6** objects. This is set by the "mnt-routes:", "mnt-lower:" and "mnt-by:" attributes.

Here is an aut-num object template:

aut-num:        [mandatory]  [single]     [primary/lookup key]
as-name:        [mandatory]  [single]     [ ]
descr:          [optional]   [multiple]   [ ]
member-of:      [optional]   [multiple]   [inverse key]
import-via:     [optional]   [multiple]   [ ]
import:         [optional]   [multiple]   [ ]
mp-import:      [optional]   [multiple]   [ ]
export-via:     [optional]   [multiple]   [ ]
export:         [optional]   [multiple]   [ ]
mp-export:      [optional]   [multiple]   [ ]
default:        [optional]   [multiple]   [ ]
mp-default:     [optional]   [multiple]   [ ]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [single]     [inverse key]
sponsoring-org: [optional]   [single]     [ ]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
abuse-c:        [optional]   [single]     [inverse key]
status:         [generated]  [single]     [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.4 domain

The domain object represents reverse delegations. <font color="green">There are still some forward domain registrations in the RIPE Database, but these will be removed.</font>

* You should write the domain name in fully qualified format, without a trailing dot. If a trailing dot is included it will be removed by the software and a warning message returned to the user.
* If the nameserver name in the "nserver:" attribute is inside the domain being delegated it may be optionally followed by an IP address (IPv4 or IPv6).
* The "ds-rdata:" attribute holds information about a signed delegation record for DNSSEC (short for DNS Security Extensions)
* <font color="red">(Miguel notes: Not in the template) The "sub-dom:" attribute specifies a list of sub-domains of a domain. Domain names are relative to the domain represented by the **domain** object that contains this attribute.</font>
* <font color="red">(Miguel notes: Not in the template) The "dom-net:" attribute contains a list of IP networks in a domain.</font>
* <font color="red">(Miguel notes: Template does not have "mnt-lower") The domain object sets the authorisation required for the creation of other **domain** objects one level down in a hierarchy. This is set by the "mnt-lower:" and "mnt-by:" attributes.</font>
* <font color="red">(Miguel notes: Template does not have "refer" aatribute)The "refer:" attribute is used to refer a query to another authorative database. See the [RIPE Database Query Reference Manual](../01.introduction-to-the-RIPE-Database/01-RIPE-Database-Documentation-Overview.md) for an explanation of its use. This will be redundant when forward domains are removed and may be deprecated.</font>

Here is a **domain** object template:

domain:         [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
zone-c:         [mandatory]  [multiple]   [inverse key]
nserver:        [mandatory]  [multiple]   [inverse key]
ds-rdata:       [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.5 filter-set

A **filter-set** object defines a set of routes that match the criteria that you specify in your 'filter' – in other words it filters out routes that you do not want to see.

* The "filter-set:" attribute defines the name of your filter. It is an RPSL name that starts with "fltr-".
* The "filter:" attribute defines the policy filter of the set.
    * A policy filter is a logical expression which, when applied to a set of routes, returns a subset of these routes – the ones that you have said you want to see.
* The "mp-filter:" attribute extends the "filter:" attribute to allow you to specify <font color="green">IPv4, </font>IPv6 prefixes and prefix ranges.
* The "filter:" and "mp-filter:" attributes are optional. However, if you plan to use a filter-set object, it must contain at least one of these two attributes.
* The name of a **filter-set** object can be hierarchical.
    * A hierarchical filter-set name is a sequence of filter-set names and AS Numbers separated by colons. At least one component of the name must be an actual filter-set name (i.e. start with "fltr-"). All the set name components of a hierarchical filter-name have to be filter-set names.
* This object sets the authorisation required for the creation of other filter-set objects one level down in a hierarchy. This is set by the "mnt-lower:" and "mnt-by:" attributes.
* Unlike other set objects this one does not include the "mbrs-by-ref:" attribute.

Here is a **filter-set** object template:

filter-set:     [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
filter:         [optional]   [single]     [ ]
mp-filter:      [optional]   [single]     [ ]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.6 inet6num

An **inet6num** object contains information on allocations and assignments of IPv6 address space.

* The "inet6num:" attribute specifies a range of IPv6 addresses that the **inet6num** object presents. <font color="green">The range may be a single address.</font>
* <font color="green">Addresses can only be expressed in prefix notation.</font>
* The prefix notation expresses addresses in hexadecimal groups of two bytes separated by colons and with the possible use of shorthand notation for strings of consecutive zeros. Leading zeros from any two-byte group will be removed by the software. In this case a warning message will be returned to the user.
* The "netname:" attribute is the name of a range of IP address space. It is recommended that the same netname is used for any set of assignment ranges used for a common purpose.
* The "country:" attribute identifies the country. It has never been specified if this is the country where the addresses are used, where the issuing organisation is based or some transit country in between. There are no rules defined for this attribute. It cannot therefore be used in any reliable way to map IP addresses to countries.
* Only a single value for the "org:" attribute is allowed in the inet6num object. This is to ensure only one organisation is responsible for this resource.
* <font color="orange">The "status:" attribute indicates where the address range represented by an inet6num object sits in a hierarchy and how it is used.
or
"status: an administrative tag to register the type of address space."</font>
* Status can have one of these values:
    * ALLOCATED-BY-RIR
    * ALLOCATED-BY-LIR
    * <font color="green"> AGGREGATED-BY-LIR</font>
    * ASSIGNED
    * ASSIGNED ANYCAST
    * ASSIGNED PI
* The **inet6num** object sets the authorisation required for the creation of more specific **inet6num** objects within the range specified by this **inet6num**. This is set by the "mnt-lower:" and "mnt-by:" attributes.
* This object sets the authorisation required for the creation of a **domain** object for reverse delegation. This is set by the "mnt-domains:", "mnt-lower:" and "mnt-by:" attributes.
* This object sets part of the authorisation required for the creation of a **route6** object. This is set by the "mnt-routes:", "mnt-lower:" and "mnt-by:" attributes.
* The "mnt-irt:" attribute references an **irt** object. Authorisation is required from the **irt** object to be able to add this reference.

inet6num:       [mandatory]  [single]     [primary/lookup key]
netname:        [mandatory]  [single]     [lookup key]
descr:          [optional]   [multiple]   [ ]
country:        [mandatory]  [multiple]   [ ]
geofeed:        [optional]   [single]     [ ]
geoloc:         [optional]   [single]     [ ]
language:       [optional]   [multiple]   [ ]
org:            [optional]   [single]     [inverse key]
sponsoring-org: [optional]   [single]     [ ]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
abuse-c:        [optional]   [single]     [inverse key]
status:         [mandatory]  [single]     [ ]
assignment-size:[optional]   [single]     [ ]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
mnt-routes:     [optional]   [multiple]   [inverse key]
mnt-domains:    [optional]   [multiple]   [inverse key]
mnt-irt:        [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.7 inetnum

An **inetnum** object contains information on allocations and assignments of IPv4 address space.

* The "inetnum:" attribute specifies a range of IPv4 addresses that the **inetnum** object presents. The range may be a single address. If the range represents multiple addresses, the ending address should be greater than the starting one.
* Addresses can be expressed in either range or prefix notation. If prefix notation is used, the software will convert this to range notation and a warning message will be returned to the user.
* The range notation expresses addresses as 32 bit whole numbers in dotted quad notation. Leading zeros from any quad will be removed by the software and a warning message will be returned to the user.
* The "netname:" attribute is the name of a range of IP address space. It is recommended that the same netname be used for any set of assignment ranges used for a common purpose, such as a customer or service.
* The "country:" attribute identifies the country. It has not been specified if this is the country where the addresses are used, where the issuing organisation is based or some transit country in between. There are no rules defined for this attribute. It cannot therefore be used in any reliable way to map IP addresses to countries.
* Only a single value for the "org:" attribute is allowed in the **inetnum** object. This is to ensure only one organisation is responsible for this resource.
* <font color="orange">The "status:" attribute indicates where the address range represented by an inet6num object sits in a hierarchy and how it is used.
or
"status: an administrative tag to register the type of address space."</font>
* Status can have one of these values:
    * ALLOCATED UNSPECIFIED
    * ALLOCATED PA
    * ALLOCATED PI 
    * LIR-PARTITIONED PA
    * LIR-PARTITIONED PI
    * SUB-ALLOCATED PA
    * ASSIGNED PA
    * ASSIGNED PI
    * ASSIGNED ANYCAST
    * EARLY-REGISTRATION
    * NOT-SET
* The **inetnum** object sets the authorisation required for the creation of more specific **inetnum** objects within the range specified by this **inetnum**. This is set by the "mnt-lower:" and "mnt-by:" attributes.
* This object sets the authorisation required for the creation of a **domain** object for reverse delegation. This is set by the "mnt-domains:", "mnt-lower:" and "mnt-by:" attributes.
* This object sets part of the authorisation required for the creation of a **route** object. This is set by the "mnt-routes:", "mnt-lower:" and "mnt-by:" attributes.
* The "mnt-irt:" attribute references an **irt** object. Authorisation is required from the **irt** object to be able to add this reference.

Here is an **inetnum** object template:

inetnum:        [mandatory]  [single]     [primary/lookup key]
netname:        [mandatory]  [single]     [lookup key]
descr:          [optional]   [multiple]   [ ]
country:        [mandatory]  [multiple]   [ ]
geofeed:        [optional]   [single]     [ ]
geoloc:         [optional]   [single]     [ ]
language:       [optional]   [multiple]   [ ]
org:            [optional]   [single]     [inverse key]
sponsoring-org: [optional]   [single]     [ ]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
abuse-c:        [optional]   [single]     [inverse key]
status:         [mandatory]  [single]     [ ]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
mnt-domains:    [optional]   [multiple]   [inverse key]
mnt-routes:     [optional]   [multiple]   [inverse key]
mnt-irt:        [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.8 inet-rtr

The **inet-rtr** object specifies routers.

* The "inet-rtr:" attribute is a valid DNS name for a router without a trailing dot.
* Each "alias:" attribute, if present, is also standard DNS name for the specified router.
* The "local-as:" attribute specifies the AS Number of the AS that owns or operates this router.
* The "ifaddr:" attribute specifies the interface address within an Internet router, as well as an optional action to set other parameters on this interface.
* The "interface:" attribute specifies a multi-protocol interface address within an Internet router, optional action and tunnel definition.
* The "peer:" attribute specifies the details of any interior or exterior router peering.
* The "mp-peer:" attribute extends the "peer:" attribute for <font color="green">IPv4, </font>IPv6 addresses.
* The "member-of:" attribute value identifies a set object that this object wants to be a member of. This claim, however, should be acknowledged by a respective "mbrs-by-ref:" attribute in the referenced object.

Here are the attributes of the **inet-rtr** object:

inet-rtr:       [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
alias:          [optional]   [multiple]   [ ]
local-as:       [mandatory]  [single]     [inverse key]
ifaddr:         [mandatory]  [multiple]   [inverse key]
interface:      [optional]   [multiple]   [ ]
peer:           [optional]   [multiple]   [ ]
mp-peer:        [optional]   [multiple]   [ ]
member-of:      [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.9 irt

An irt object represents a Computer Security Incident Response Team (CSIRT). It includes contact information and <font color="green">may</font> include security information. It may be referenced from **inetnum** or **inet6num** objects to show which CSIRT is responsible for handling computer and network incidents for that address range.

<font color="green">It is also used more generally to link "abuse-mailbox:" attributes to **inetnum** and **inet6num** objects.</font>

* The irt object name starts with "IRT-".
* <font color="green">The "abuse-mailbox:" attribute specifies the email address to which abuse complaints should be sent. When this attribute is specified no other email address should be used for abuse complaints.</font>
* The "signature:" attribute references a **key-cert** object representing a CSIRT public key used by the team to sign their correspondence.
* The "encryption:" attribute references a **key-cert** object representing a CSIRT public key used to encrypt correspondence sent to the CSIRT.
* The "auth:" defines an authentication scheme to be used. Any of the current authentication schemes used by the RIPE Database are allowed.
* To add a reference to an **irt** in an **inetnum** or **inet6num** object the authorisation must be passed from one of the "auth:" values in the referenced **irt** object.
* The "irt-nfy:" attribute specifies the email address to be notified when a reference to the **irt** object is added or removed.

Here is a template of an **irt** object:

irt:            [mandatory]  [single]     [primary/lookup key]
address:        [mandatory]  [multiple]   [ ]
phone:          [optional]   [multiple]   [ ]
fax-no:         [optional]   [multiple]   [ ]
e-mail:         [mandatory]  [multiple]   [lookup key]
signature:      [optional]   [multiple]   [ ]
encryption:     [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
auth:           [mandatory]  [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
irt-nfy:        [optional]   [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.10 key-cert

A **key-cert** object is a database public key certificate that is stored on the <font color="orange"> RIPE Database or server</font>. It is used with a **mntner** object for authentication when performing updates. Currently the RIPE Database supports two types of keys.

* For PGP **key-cert** objects, the value of the "key-cert:" attribute must be PGP-"key-id". These keys are compliant with the [Open PGP Internet Standard](https://www.ietf.org/rfc/rfc2440.txt).
* For X.509 **key-cert** objects, the database software assigns this value as X.509-n. Here, 'n' is the next available number assigned by the software. If you want to create an X.509 **key-cert** object, you should specify the value as AUTO-xx. If you delete an X.509 **key-cert** object, it is not possible to recreate it with the same name.
* The "method:", "owner:" and "fingerpr:" attributes are all generated by the software. It is not necessary to include these attributes when you create or modify this object. If they are supplied, the software will check the values. If necessary the software will replace the supplied values with generated values. In this case a warning is returned to the user.
* The "certif:" attribute contains the public key. <font color="orange">The value of the public key should be supplied either using multiple "certif:" attributes, or in one "certif:" attribute split over several lines. In the first case, this is easily done by exporting the key from your local key ring in ASCII armored format and adding the string "certif:" to the start of each line of the key. In the second case, line continuation should be used to represent an ASCII armored format of the key. All the lines of the exported key must be included, as well as the start/end markers and the empty line which separates the header from the key body.
or
All the lines of an exported key in ASCII armoured format must be included, as well as the start/end markers and the empty line which separates the header from the key body.</font>

Here is a **key-cert** object template:

key-cert:       [mandatory]  [single]     [primary/lookup key]
method:         [generated]  [single]     [ ]
owner:          [generated]  [multiple]   [ ]
fingerpr:       [generated]  [single]     [inverse key]
certif:         [mandatory]  [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
admin-c:        [optional]   [multiple]   [inverse key]
tech-c:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.11 mntner

Objects in the RIPE Database are protected by using **mntner** objects. A **mntner** object contains the information needed to authorise creation, deletion or modification of any objects that it protects.

* Objects are protected by a **mntner**, if they contain a reference to the **mntner** in the object. This is done by including a "mnt-by:" attribute. Other attributes offer hierarchical protection. The "mnt-by:" attribute is mandatory in all object types. Most users set the "mnt-by:" value in a **mntner** to reference itself.
* The "referral-by:" attribute can refer to the **mntner** object itself. The database software does not currently use this attribute, even though it is mandatory to include it.
* <font color="green">[Routing Policy System Security](ftp://ftp.ripe.net/rfc/rfc2725.txt) specification also defines an "auth-override:" attribute in the mntner object template. Together with "referral-by:" attribute, they allow for a mntner to be modified if it becomes unresponsive. As this is not part of the core functionality of the RIPE Database, it has not been implemented in the current version of the database. </font>
* The "upd-to:" attribute specifies the email address to be notified when an attempt to update an object protected by this mntner is unsuccessful.
* The "mnt-nfy:" attribute specifies the email address to be notified when an object protected by this mntner is successfully updated.
* The "auth:" attribute defines an authentication scheme to be used. Any of the current authentication schemes used by the RIPE Database are allowed.
* To update an object protected by a **mntner** the authorisation must be passed from one of the "auth:" values in the **mntner** object referenced in one of the "mnt-by:" attributes of the updated object. This means the correct credential for one of the "auth:" values must be supplied as part of the update.
* If an object references more than one **mntner** in the "mnt-by:" attributes they act as a logical 'OR'. If the authorisation is passed by any "auth:" value from any of the referenced **mntner** objects then the update will be authorised.
* The "mnt-lower:", "mnt-routes:" and "mnt-domains:" attributes all provide for hierarchical authorisation. These also work in a logical 'OR' when multiple values are included in an object. How they are used is described in the object descriptions where these attributes are valid.

mntner:         [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
tech-c:         [optional]   [multiple]   [inverse key]
upd-to:         [mandatory]  [multiple]   [inverse key]
mnt-nfy:        [optional]   [multiple]   [inverse key]
auth:           [mandatory]  [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.12 organisation

The **organisation** object provides information about an organisation entity that has registered a network resource in the RIPE Database. This entity may be a company, non profit group or individual. <font color="green">It was introduced as a means to link together all the human and Internet resources related to one organisation.</font>

* "organisation:" specifies the ID of the **organisation** object. This is set by the database software. It is only used as a reference label. When creating an organisation this should be set to "AUTO-n &lt;optional letter Combination&gt;", where n is any number.
* "org-name:" attribute defines the name of the organisation.
* "org-type:" specifies the type of an organisation and can be one of these:
    * IANA
    * RIR
    * NIR (Note - there are no NIRs in the RIPE NCC service region.)
    * LIR
    * <font color="green">WHITEPAGES</font>
    * DIRECT_ASSIGNMENT
    * OTHER
* Users can only set the "org-type:" to OTHER. All other types are only for use by the Database Administrators.
* The "org:" attribute is used to reference an **organisation** object for an entity that has registered the resource or other data in which this reference is made.
* The "ref-nfy:" attribute specifies the email address to be notified when a reference to the **organisation** object is added or removed.
* The "mnt-ref:" attribute specifies the maintainer objects that are <font color="orange">allowed or entitled</font> to authorise the addition of references to the **organisation** object in other objects.
* If the **organisation** object includes more than one "mnt-ref:" attribute they act as a logical 'OR'. If the authorisation is passed by any **mntner** object referenced in any "mnt-ref:" attribute then the update will be authorised.
* <font color="red">(This is wrong, shoud be corrected with the next phrase)The "abuse-mailbox:" attribute specifies the email address to which abuse complaints should be sent. </font>The "abuse-c:" attribute specifies the id (nic-hdl) of a **role** object holding contact information for abuse complaints. When this attribute is specified no other email address should be used for abuse complaints.

Here is an **organisation** object template:

organisation:   [mandatory]  [single]     [primary/lookup key]
org-name:       [mandatory]  [single]     [lookup key]
org-type:       [mandatory]  [single]     [ ]
descr:          [optional]   [multiple]   [ ]
remarks:        [optional]   [multiple]   [ ]
address:        [mandatory]  [multiple]   [ ]
country:        [optional]   [single]     [ ]
phone:          [optional]   [multiple]   [ ]
fax-no:         [optional]   [multiple]   [ ]
e-mail:         [mandatory]  [multiple]   [lookup key]
geoloc:         [optional]   [single]     [ ]
language:       [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
admin-c:        [optional]   [multiple]   [inverse key]
tech-c:         [optional]   [multiple]   [inverse key]
abuse-c:        [optional]   [single]     [inverse key]
ref-nfy:        [optional]   [multiple]   [inverse key]
mnt-ref:        [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.13 peering-set

A **peering-set** object defines the set of peerings that appear in the "peering:" or "mp-peering:" attribute.

* The "peering-set:" attribute defines the name of the set. It is an RPSL name that starts with 'prng-'.
* The "peering:" attribute defines a peering that you can use to import or export routes.
* The "mp-peering:" attribute extends the "peering:" attribute and defines a multiprotocol peering that can be used to import or export <font color="green">IPv4, </font>IPv6 routes.
* The "peering:" and "mp-peering:" attributes are optional. However, a peering-set must contain at least one of these two attributes. It cannot contain both in the same object.
* The name of a peering-set object can be hierarchical. A hierarchical peering-set name is a sequence of peering-set names and AS Numbers separated by colons. At least one part of the name must be an actual **peering-set** name (i.e. start with "prng-"). All the set name components of a hierarchical **peering-set** have to be **peering-set** names.
* This object sets the authorisation required for the creation of other **peering-set** objects one level down in a hierarchy. This is set by the "mnt-lower:" and "mnt-by:" attributes.

Here is a **peering-set** object template:

peering-set:    [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
peering:        [optional]   [multiple]   [ ]
mp-peering:     [optional]   [multiple]   [ ]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.14 person

A **person** object contains information about <font color="orange">contact(s) or the technical, administrative<font color="red">,(Miguel notes: abuse-C remaining) abuse-c</font> or DNS zone contact(s) </font>responsible for an object. After it has been created, the "person:" attribute cannot be changed by users. <font color="green">Under some circumstances it can be changed by the Database Administrator.</font>

* The person object is identified by the "nic-hdl:" attribute. This is a label, usually made up from the initials of the person's name and the database "source:" (for example, DW-RIPE).
* The "nic-hdl:" can use an international country code instead of the database source as the suffix or omit the suffix ( for example DW-NL or just DW). <font color="green"> It is used by other objects to reference the person</font>
* The user can specify the "nic-hdl:" when the object is created or can use the "AUTO-n&lt;optional letter Combination&gt;" construction, where n is any number. <font color="green"> greater than 0.table 1.1, 'Object Types Supported by the RIPE Database'Table 1.1, 'Object Types Supported by the RIPE Database'</font>
* The "nic-hdl:" attributes of the **person** and **role** objects share the same name space in the database. So you cannot create a **person** and **role** using the same "nic-hdl:". The "nic-hdl:" must be unique across both object types.
* The "address:" attribute is the full postal address of the contact in free format text.
* The "phone:" attribute specifies a telephone number of the contact in international shorthand. It must start with a '+' followed by the international country code, area code and number.
* The "fax-no:" attribute has the same format as the "phone:" attribute.
* The "e-mail:" attribute represents the contact's email address as defined by [RFC 2822](ftp://ftp.ripe.net/rfc/rfc2822.txt).
* The "remarks:" attribute can be any free format text.
* The "notify:" attribute specifies the email address to which notifications of changes to an object should be sent.
* <font color="red">(Miguel NOTES: this template does not have this attribute)The "abuse-mailbox:" attribute specifies the email address to which abuse complaints should be sent. When this attribute is specified no other email address should be used for abuse complaints.</font>
* The "mnt-by:" attribute specifies the identifier of a registered **mntner** object used for authorisation of operations performed on the object that contains this attribute. The **mntner** object must exist in the database before it can be referenced in other objects.

Here is a **person** object template:

person:         [mandatory]  [single]     [lookup key]
address:        [mandatory]  [multiple]   [ ]
phone:          [mandatory]  [multiple]   [ ]
fax-no:         [optional]   [multiple]   [ ]
e-mail:         [optional]   [multiple]   [lookup key]
org:            [optional]   [multiple]   [inverse key]
nic-hdl:        [mandatory]  [single]     [primary/lookup key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.15 poem

A poem object contains a poem that is submitted by a user. <font color="orange">This object is included in the database to show that engineers do have a sense of humour. or It has no operational use and reflects the humorous side of the industry representatives. </font>

* The "poem:" attribute specifies the title of the poem.
* The "form:" attribute specifies the identifier of a registered poem type.
* The "text:" attribute specifies the body of the poem. It must be humorous, but not malicious or insulting. It should be written in the style of the "form:".
* The "author:" attribute is the "nic-hdl:" of the person who entered the poem.

Here is a **poem** object template:

poem:           [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
form:           [mandatory]  [single]     [inverse key]
text:           [mandatory]  [multiple]   [ ]
author:         [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [single]     [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.16 poetic-form

A **poetic-form** object defines the supported poem types.

* The "poetic-form:" attribute starts with "FORM-". It is followed by the name of an internationally recognised poetic format of humorous writing. For example, limerick or English-sonnet.
* The "descr:" attribute describes the style of the poetic form, written in the form style. For example, if it is a FORM-LIMERICK, the description will be written as a limerick.
* <font color="green"> This object cannot be created automatically. It will be forwarded to the Database Administrators for approval of the content.</font>

Here is a **poetic-form** object template:

poetic-form:    [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
admin-c:        [mandatory]  [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.17 role

A **role** object is similar to a **person** object. However, instead of describing a single person, it describes a role performed by one or more people. This might be a help desk, network monitoring centre, system administrator etc. A **role** object is useful since often a person performing a specific function may change while the role itself remains.

* If one person needs to be referenced in a large number of objects, it is better to use a **role** object and then place that person in the **role** object. If that person leaves your company, it is simple to modify the **role** object.
* The **role** object is identified by the "nic-hdl:" attribute. This is a label, usually made up from the initials of the function and the database "source:" (for example, CREW-RIPE).
* The "nic-hdl:" can use an international country code instead of the database source as the suffix or omit the suffix (for example CREW-NL or just CREW).
* The user can specify the "nic-hdl:" when the object is created or can use the "AUTO-n&lt;optional letter Combination&gt;" construction, where n is any number <font color="green"> greater than 0</font>. 
* The "nic-hdl:" attributes of the **person** and **role** objects share the same name space in the database. You cannot create a **person** and **role** using the same "nic-hdl:". The "nic-hdl:" must be unique across both object types.
* <font color="green">After you have created a **role** object, the "role:" attribute cannot be changed by users. Under some circumstances it can be changed by the Database Administrator.</font>
* <font color="green">Under exceptional circumstances the Database Administrator can convert a **person** object into a **role** object.</font>
* <font color="green">The "abuse-mailbox:" attribute specifies the email address to which abuse complaints should be sent. When this attribute is specified no other email address should be used for abuse complaints.</font>

Here is a **role** object template:

role:           [mandatory]  [single]     [lookup key]
address:        [mandatory]  [multiple]   [ ]
phone:          [optional]   [multiple]   [ ]
fax-no:         [optional]   [multiple]   [ ]
e-mail:         [mandatory]  [multiple]   [lookup key]
org:            [optional]   [multiple]   [inverse key]
admin-c:        [optional]   [multiple]   [inverse key]
tech-c:         [optional]   [multiple]   [inverse key]
nic-hdl:        [mandatory]  [single]     [primary/lookup key]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
abuse-mailbox:  [optional]   [single]     [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.18 route6

Each interAS route (also known as an interdomain route) originated by an Autonomous System can be specified by using a **route6** object for IPv6 addresses.

It is possible to create **route6** objects in the RIPE Database for address space <font color="green">or AS Numbers </font>registered in other RIR regions. <font color="green">You will first need to create an **aut-num** object to represent the Autonomous System in the RIPE Database.</font>

* The "route6:" attribute is the IPv6 address prefix of the route.
* The "origin:" attribute is the AS Number of the Autonomous System that originates the route into the interAS routing system. The corresponding **aut-num** object for this Autonomous System must already be registered in the RIPE Database.
* The "route6:" and "origin:" attribute pair make up the class primary key.
* <font color="green">The following attributes have the same meaning as described for the route object in [Section 1.2.19.](#1219-route)</font>

Here is a **route6** object template:

route6:         [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
origin:         [mandatory]  [single]     [primary/inverse key]
pingable:       [optional]   [multiple]   [ ]
ping-hdl:       [optional]   [multiple]   [inverse key]
holes:          [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
member-of:      [optional]   [multiple]   [inverse key]
inject:         [optional]   [multiple]   [ ]
aggr-mtd:       [optional]   [single]     [ ]
aggr-bndry:     [optional]   [single]     [ ]
export-comps:   [optional]   [single]     [ ]
components:     [optional]   [single]     [ ]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
mnt-routes:     [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.19 route

Each interAS route (also known as an interdomain route) originated by an Autonomous System can be specified by using a **route** object for IPv4 addresses.

It is possible to create **route** objects in the RIPE Database for address space <font color="green">or AS Numbers </font>registered in other RIR regions. <font color="green">You will first need to create an **aut-num** object to represent the Autonomous System in the RIPE Database.</font>

* The "route:" attribute is the address prefix of the route.
* The "origin:" attribute is the AS Number of the Autonomous System that originates the route into the interAS routing system. The corresponding **aut-num** object for this Autonomous System must already be registered in the RIPE Database.
* The "route:" and "origin:" attribute pair make up the class primary key.
* The "holes:" attributes list the component address prefixes that are not reachable through the aggregate route (perhaps that part of the address space is unallocated).
* The "member-of:" attribute can be used in the **route**, **route6**, **aut-num** and **inet-rtr** classes. The value of the "member-of:" attribute identifies a set object that this object wants to be a member of. This claim, however, should be acknowledged by a respective "mbrs-by-ref:" attribute in the referenced object.
* The "inject:" attribute specifies which routers perform the aggregation and when they perform it.
* The "aggr-mtd:" attribute specifies how the aggregate is generated.
* The "aggr-bndry:" attribute defines a set of Autonomous Systems, which form the aggregation boundary.
* The "export-comps:" attribute defines the set's policy filter, a logical expression which when applied to a set of routes returns a subset of these routes.
* The "components:" attribute defines what component routes are used to form the aggregate.
* This object sets the authorisation required for the creation of more specific **route** objects within the range specified by this **route**. This is set by the "mnt-lower:" and "mnt-by:" attributes.
* This object sets part of the authorisation required for the creation of a more specific **route** object. This is set by the "mnt-routes:", "mnt-lower:" and "mnt-by:" attributes.
* The "mnt-routes:" attribute can include an optional list of prefix ranges inside of curly braces ("{}") or the keyword "ANY". This should follow after the reference to the maintainer. The default, when no additional set items are specified, is "ANY" or all more specifics. Please refer to [RFC-2622](ftp://ftp.ripe.net/rfc/rfc2622.txt) for more information.

Here is a **route** object template:

route:          [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
origin:         [mandatory]  [single]     [primary/inverse key]
pingable:       [optional]   [multiple]   [ ]
ping-hdl:       [optional]   [multiple]   [inverse key]
holes:          [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
member-of:      [optional]   [multiple]   [inverse key]
inject:         [optional]   [multiple]   [ ]
aggr-mtd:       [optional]   [single]     [ ]
aggr-bndry:     [optional]   [single]     [ ]
export-comps:   [optional]   [single]     [ ]
components:     [optional]   [single]     [ ]
remarks:        [optional]   [multiple]   [ ]
notify:         [optional]   [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
mnt-routes:     [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]



### 1.2.20 route-set

A **route-set** object is a set of route prefixes and not a set of database **route** objects. 

* The "route-set:" attribute defines the name of the set. It is an RPSL name that starts with "rs-".
    * It defines a set of routes that can be represented by route objects or by <font color="green">route</font> address prefixes.
    * It can be hierarchical. A hierarchical route-set name is a sequence of route-set names and AS numbers separated by colons. At least one component of such a name must be an actual route-set name (i.e. start with "rs-").
* In the case of **route** objects, the set is populated by means of the "mbrs-by-ref:" attribute. In the case of address prefixes, the members of the set are explicitly listed in the "members:" attribute.
    * The "members:" attribute is a list of address prefixes or other route-set names.
    * The "mp-members:" attribute is a list of <font color="green">IPv4 or</font> IPv6 address prefixes or other route-set names.
* The "mbrs-by-ref:" attribute can be used in all "set" objects. It allows indirect population of a set. If this attribute is used, the set also includes objects of the corresponding type (**aut-num** objects for as-set, for example) that are protected by one of these maintainers and whose "member-of:" attributes refer to the name of the set. If the value of a "mbrs-by-ref:" attribute is ANY, any object of the corresponding type referring to the set is a member of the set. If the "mbrs-by-ref:" attribute is missing, the set is defined explicitly by the "members:" attribute.
* This object sets the authorisation required for the creation of other **route-set** objects one level down in a hierarchy. This is set by the "mnt-lower:" and "mnt-by:" attributes.

Here is a **route-set** object template:

route-set:      [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
members:        [optional]   [multiple]   [ ]
mp-members:     [optional]   [multiple]   [ ]
mbrs-by-ref:    [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]


### 1.2.21 rtr-set

A **rtr-set** object defines a set of routers.

* A set may be described by the "members:" attribute that is a list of inet-rtr names, IPv4 addresses or other rtr-set names. The "mp-members:" attribute extends the "members:" attribute to use IPv6 addresses.
* A set may also be populated by means of the "mbrs-by-ref:" attribute, in which case it is represented by inet-rtr objects.
* The "rtr-set:" attribute defines the name of the set. It is an RPSL name that starts with "rtrs-".
    * It can be hierarchical. A hierarchical rtr-set name is a sequence of rtr-set names and AS Numbers separated by colons. At least one component of such a name must be an actual rtr-set name (i.e. start with "rtrs-").
* This object sets the authorisation required for the creation of other rtr-set objects one level down in a hierarchy. This is set by the "mnt-lower:" and "mnt-by:" attributes.

Here is a **rtr-set** object template:

rtr-set:        [mandatory]  [single]     [primary/lookup key]
descr:          [optional]   [multiple]   [ ]
members:        [optional]   [multiple]   [ ]
mp-members:     [optional]   [multiple]   [ ]
mbrs-by-ref:    [optional]   [multiple]   [inverse key]
remarks:        [optional]   [multiple]   [ ]
org:            [optional]   [multiple]   [inverse key]
tech-c:         [mandatory]  [multiple]   [inverse key]
admin-c:        [mandatory]  [multiple]   [inverse key]
notify:         [optional]   [multiple]   [inverse key]
mnt-by:         [mandatory]  [multiple]   [inverse key]
mnt-lower:      [optional]   [multiple]   [inverse key]
created:        [generated]  [single]     [ ]
last-modified:  [generated]  [single]     [ ]
source:         [mandatory]  [single]     [ ]

# 2.Updates in the RIPE Database

To create, modify or delete an object you need to send an update message to the database.

There are two databases that you can update. The RIPE Database is the authoritative database <font color="green">and is sometimes referred to as the live or production database</font>. There is also a RIPE TEST Database. This operates in the same way but contains only test data. The test data is cleaned out <font color="orange">every night or at the start of each month</font> and a pre-determined set of basic objects is re-inserted. The TEST Database can be used to learn how to update the database and try out 'what if' scenarios. There are fewer restrictions allowing you to
create encompassing or parent objects that you may need for your tests. <font color="green">It is good practise to delete any objects you created after your tests. This avoids blocking access for other users.</font>

You can submit most updates to either database using two access methods <font color="green">(there is an additional method described later for a new starter).</font>

* By sending an email.
* By using the synchronous update service (often referred to as syncupdates). There are two ways to do this:
    * By using a client to access the "syncupdates" service
    * By using the "webupdates" form from the [www.ripe.net website](https://www.ripe.net/cgi-bin/webupdates.pl). This is a CGI interface to the syncupdates service
    <font color="orange">By using the REST APi. 
    or
Although the Application Programming Interface (API) is different, the main content of the update message and the structure of the objects to be updated is the same with all access methods. The pre-processing done by dbupdate (the update part of the database software) differs for the two access methods.

The original method of access was by email. When the synchronous method was introduced, the interface was made to be as compatible as possible with the email interface. This meant simulating the email subject line keywords with special flags in the synchronous interface. But keywords added later are only available using the email update method.

Currently slightly more updates are submitted by the synchronous update method than by email. </font>


## 2.1 Email update method

Email update messages must be in plain text and can be MIME encoded. If encoded, the database will treat each valid MIME part as a separate message. But where messages are multipart/signed the signature part will be associated with the corresponding MIME text part. Please see Section <font color="orange">2.3.1</font>, 'MIME Support' for more information. An update message, or MIME part, may contain more than one object.

To submit an email update to the RIPE Database send an email to [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net). To submit an email update to the TEST Database send an email to [test-dbm@ripe.net](mailto:test-dbm@ripe.net).

<font color="green">Email update messages are placed into a series of queues depending on the size and content of the message by the database software. Each queue is handled sequentially on a "first in, first out" basis.</font>

Acknowledgements from the database are returned to the sender of the email based on the "Reply-to:" and "From:" fields in the email header. Notifications may also be sent based on email addresses found in the attributes within each object in the update message and the related **mntner** objects.

There are no restrictions on the number of objects in any one email message. But there is a limit on the total size of an update message. It is up to the user to determine how many objects to include in an update message. There are some points to consider.

* Every email update message will result in one acknowledgement email message returned.
* Each object in an update message may generate several notification email messages.
* If you update 1000 objects by sending 1000 emails, each containing one object, this will cause a large number of emails to be returned. Your mail system needs to be able to handle the volume of emails generated in this way. Because of the volume of emails from one source it may also be seen as spam by some mail agents.
* The acknowledgement and notifications are not sent until all the objects in an update message have been processed.
* If you submit one update message containing 1000 objects, no response will be received until all the objects have been processed.
* You need to optimise the number of update messages and number of objects per update to suit your business practises.
* Occasionally an update message causes system problems. The Database Administrator will monitor the progress of such an update. <font color="green">In rare occasions it is necessary for the Database Administrator to intervene in the process.</font>


## 2.2 Synchronous Update Method

The synchronous update method allows near instant updating of the RIPE Database. It is designed for applications that need to update the RIPE Database and see an immediate change. <font color="green">The syncupdates front end is a CGI script that accepts input from either a POST or a GET request.</font> It returns the response header and an acknowledgement (if any) in text/plain format. <font color="green">The protocol is http1.1, specified in [RFC 2068](https://www.ietf.org/rfc/rfc2068.txt)</font>. See the separate document for details of the protocol for communicating with [syncupdates](https://www.ripe.net/manage-ips-and-asns/db/support/documentation/resolveuid/e881feafc6635745af1e4cb8faa447e6).

There is no maximum amount of time for an update operation to be completed. You should set your timeout to the highest possible value. Problems sometimes occur with reverse **domain** objects. Because of all the DNS checks made, reverse **domain** objects sometimes take longer to process, and your connection may occasionally timeout. The update will still be completed by the database server, but no acknowledgement will be returned if the connection has timed out. Notification messages are always sent by email, and will be sent regardless of your connection status.

<font color="green">Synchronous update messages are placed into a series of queues depending on the size and content of the message by the database software. Each queue is handled sequentially on a "first in, first out" basis.</font>

There are sample clients to use with syncupdates which access either the RIPE Database or the TEST Database. Although they are sample clients they can be used 'as is' from our [web site](http://www.ripe.net/data-tools/db/syncupdates/). There is also a short perl script which you can use as a client to access syncupdates [here](http://www.ripe.net/data-tools/db/syncupdates/).

You can type the objects directly into the text area of this web form. <font color="green">Or you can have them prepared in another file and cut and paste them into this web form.</font> There is no limit to the number of objects you can enter in one submission. But the same principles apply as described in Section [2.1](#21-email-update-method), 'EMail Update Method'. The main processing of an update message is the same for any method of submission. So the rules about responses and notification emails are the same. With syncupdates, if you enter many objects your client connection may time out waiting for the final response after processing all the objects.

<font color="orange">Webupdates is run as a CGI script on the 
or 
Webupdates can be accessed from the links at</font> [www.ripe.net website](https://www.ripe.net/cgi-bin/webupdates.pl). You can select either the RIPE Database or TEST Database by setting the source. Details of how to use webupdates can be found in the [RIPE Database User Manual-Getting Started](../01.introduction-to-the-RIPE-Database/01-RIPE-Database-Documentation-Overview.md).

Webupdates is normally used for individual object updates. Multiple objects can be submitted by switching the view to use the text input area similar to syncupdates. If more than one object is entered into the text area it is then not possible to switch view back to the attribute working mode.


## 2.3 New Starter Update Method

This update method allows a new starter, who has no objects in the RIPE Database, to get started. The first step is to create a **person** and **mntner** objects. But the **person** object must be maintained and the **mntner** object needs to reference personal contacts. So these first two objects reference each other.

This situation cannot be processed directly by the other two standard update methods described above. <font color="orange">There is a web form OR There is a CGI on the www.ripe.net website </font>to create these first two objects for a new user [here](https://www.db.ripe.net/cgi-bin/new-user-startup.pl). <font color="green">The details are entered that are needed to create the two objects. In the background, the CGI uses intermediate object references to bypass the circular dependency. The end result is the creation of the two requested objects.</font> If errors occur during the creation process, these are reported back to the user. If successful, the object identifiers are returned to the user. There is no partial success allowed. If one object is successfully created during the intermediate stage, but the second object has errors, the CGI will delete the first object.

If you have nothing in the RIPE Database, <font color=orange>this startup script OR this CGI</font> is the only way to get started. Once you have the first pair of objects you can use the normal update methods for all other objects. More details in [RIPE Database User Manual-Getting Started](../01.introduction-to-the-RIPE-Database/01-RIPE-Database-Documentation-Overview.md).


## 2.4 Format of an Update Message 

The format of the body of an update message is the same regardless of the access method. It contains one or more objects. The structure of the objects is described in Section 1.1, [Object Representation](#11-object-representation).

Object definition starts with the class attribute and ends with the first blank line ("\n\n"). You cannot use a blank line in the object, as the software will read this as being the end of the object.

We apply a heuristic method to each paragraph of text in the input to determine if it is an object. Any part of the message that is not recognised as a database object is ignored. These parts are grouped together at the end of the acknowledgement message.



## 2.5 Creating, Modifying and Deleting an Object

To create, modify or delete objects, you need to send a message to the database by one of the access methods. This message must contain one or more database objects. Table 1.1, [Object Types Supported by the RIPE Database](#11-object-representation) lists all the object types that are recognised by the database. No other object types can be created. <font color="orange">You must use the object templates described in Section 1.2, [Object Types](#12-object-types) to specify the objects. OR 
Each object type is described by templates. They can be listed using the query:
whois –t &lt;object-type&gt;
There is also a detailed description available by querying:
whois –v &lt;object-type&gt;</font> 

Each instance of an object must contain at least one of each of the mandatory attributes for that object type. <font color="orange">An object can contain zero or more instances of each available optional attribute for that object type. OR  The optional attributes can be left out unless the
software business rules require them.</font> One message may contain several objects, <font color="orange">even if they each require different operations, for example, OR with a mixture of</font> creation, modification or deletion.


### 2.5.1 Object Processing

As a rule, the order of objects in the message is not changed. The database software processes objects one by one, starting with the first recognised object in the message. <font color="orange">It is the user's responsibility to order the objects in the message to make sure that all references can be resolved. The only exception to this is when "AUTO NIC handles" are used. These generate an automatically assigned value for the "nic-hdl:" attribute in the **person** or **role** objects. When the database software finds an object that references an "AUTO NIC handle", this object is placed on an internal queue for later processing. This is to ensure that all objects containing "AUTO NIC handle" are processed before any other object that can reference them. This internal queue is processed after the first pass through all objects in the update message.

The same process applies to organisation object names. These are specified with an "AUTO name". References can also be made from other objects in the update message to this "AUTO name".

It is recommended that you avoid complex arrangements of auto generated values in a single update message. An example of a complex arrangement might be an update containing a **person** object with a "nic-hdl:" value of &lt;auto-1&gt;, a **role** object with a "nic-hdl:" value of &lt;auto-2&gt; and referencing the **person** &lt;auto-1&gt; and a **mntner** referencing the **role** object &lt;auto-2&gt;. This can be made to work with careful ordering of the objects in the update message, but the wrong ordering will cause part of this update to fail. Such an update is better done with multiple update messages. "Keep it simple" and you will avoid many potential problems.

OR

Since the order can matter, the database software tries to figure out the best order of execution. “AUTO-n” attributes to be referenced by other objects in the same update will be resolved, as long as the “n” number is consistent.

You can avoid complex arrangements of auto generated values in a single update message by sending consecutive updates instead. An example of a complex
arrangement might be an update containing a **person** object with "nic-hdl: auto-1”, a **role** object with "nic-hdl: auto-2” and referencing the **person** auto-1 and a **mntner** referencing the **role** object auto-2. </font>

When processing each individual object, the software makes many checks including that:

* The syntax of the object is correct.
* The object passes all required authorisation checks.
* All references to other objects can be resolved without conflicts.
* The operation does not compromise referential integrity. For example, when an object is to be deleted, the server checks that it is not referenced from any other object in the RIPE Database.
* <font color="orange">The object complies with all software business rules, for example not creating a
**person** object with a nic-hdl already in use by a **role** object. OR The requested NIC handle has not been used and can be allocated. This is done only for the creation of **person** or **role** objects that request a particular NIC handle. Note that you cannot create a **person** object with a "nic-hdl:" that has already been used by a **role** object, and vice versa.</font>
* The object complies with relevant policies. <font color="orange">For example the "status:" value in **inetnum** objects. OR s, such as having the correct "status:" value in inetnum objects</font>

If all checks are successful, <font color="orange">the server processes the operation on the object in the RIPE Database. OR the update will proceed for this object.</font>If one of these steps fails, the operation fails for the object as a whole. This is shown in the acknowledgement message and sometimes in notification messages.

Each object in the update message is processed independently of others, so even if one operation fails, the following objects will still be processed. There may, however, be consequences of a previous failed operation. For example if a **person** object creation fails, a later object creation which references this **person** object will fail the referential integrity checks because the **person** object does not exist in the database.

After the software finishes processing all the objects in the update message, an acknowledgement message is returned to the sender of the original update. For email update messages, this will be as specified in the "Reply-to:" field or "From:" field. For synchronous update messages it will be returned via the open connection. If the connection has timed out or been closed, no acknowledgement is sent.

The database server may also send notification messages. See Section 2.7.2, [Notifications](#272-notifications) for more information about this.


### 2.5.2 Creating a New Object

If the database does not contain an object <font color="green">of the same type and</font> with the same class primary key as the object in the update message, the server will assume that you want to create it (remembering that a **person** and **role** object cannot use the same NIC handle).


#### 2.5.2.1 Creating person and role objects

To create person and role objects, you can use "AUTO NIC handles". If you do this, then the server will automatically assign a NIC handle.

To do this, the value of the "nic-hdl:" attribute should be:

    nic-hdl: AUTO-&lt;digit&gt;[<initials>]

If you specify the &lt;initials&gt; (between two and four characters), then the server will try to use them to make the NIC handle. <font color="orange">If you forget to include &lt;initials&gt;, the server will take the initials from the name in the "person:" or "role:" attribute. By specifying them yourself you can choose any initials. OR Otherwise the initials will be taken from the name in the "person:" or "role:" attribute.</font>

The default suffix is "-RIPE" when an "AUTO NIC handle" is used. If you want to use another suffix or have no suffix, or you want to also select the number part as well, then you must specify the full <font color="orange">NIC handle OR  nic-hdl </font> you want. Note that if you specify a <font color="orange">NIC handle OR  nic-hdl </font>  that is currently in use it will be considered as a modification operation. This will usually result in an authentication error. If you select a <font color="orange">NIC handle OR  nic-hdl </font> that has been used and deleted an error will be returned.

If you are creating your first **person** object you must follow the procedure described in 2.3, [New starter update method](#23-new-starter-update-method).


#### 2.5.2.2 Creating organisation Objects

If you want to create an **organisation** object, you must specify the ID of the object as AUTO-&lt;digit&gt;[<initials>]. The database software will then assign an appropriate ID by using the initials of the "org-name:" attribute of the object. If you prefer, you can
specify the letter combination you would like to use.

For example, if you want TTR as the letter combination in the organisation ID, you should put “AUTO-1TTR” into the "organisation:" attribute, when you create the object. If you delete an **organisation** object you cannot re-create one with the same ID as the one you deleted.


### 2.5.3 Modifying an Existing Object

If an object type with the same class primary keys as the object in the update message already exists in the database, the assumed operation is object modification. The server compares the old and new versions of the object and reports a no-operation error if they are identical. When comparing the two versions, white space characters are not considered.


### 2.5.4 Deleting an Object

You can delete an object by adding a "delete:" pseudo attribute to the object.

delete: <comment>

The software will only accept this request if the object in the message is exactly the same as the one in the database which is to be deleted. When comparing the versions, white space characters are not considered. If you query the database for an object to delete so that you get the exact copy of the object, you should make sure to use the "-B" query flag. Otherwise you will get a filtered object that will not pass the identical check. The delete operation will fail if the object to be deleted is referenced from any other object in the database.

This pseudo attribute applies to one object only in an update message. It must be a part of the object in the update message that is to be deleted. It can be added at any point within the object or immediately <font color="green"> before or </font>after the object. <font color="green">It cannot be placed before the object (this would result in the object not being recognised by the database software as a valid type).</font>

Objects can still be deleted from the database even if they are not syntactically correct. This allows for old objects to be deleted long after the syntax has been changed.



### 2.5.5 Garbage Collection