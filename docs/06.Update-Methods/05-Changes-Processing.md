---
permalink: /Update-Methods/Changes-Processing
---

# Changes Processing Updates

The RIPE NCC has now deployed utterly new software for the processing of RIPE Database updates. This was done in a stepped approach. Each object type was taken one at a time and all the handling needed for that type was re-developed and deployed. Obviously, the first one required much of the infrastructure to be re-developed. This included the backend SQL interface, authentication checks, acknowledgment, and notification processing. Other parts of the infrastructure were developed at a later stage, like handling multiple objects and multipart signed messages.

During the whole process one of the fundamental goals was to keep the interface to users and most of the functionality backward compatible. But during the re-development, some 'issues' and long-standing bugs in the legacy software that needed fixing have been discovered. Most of these fixed issues and bugs are listed below. These have resulted in changes that may affect some users.

Please also see an announcement recently sent to the [RIPE Database Working Group mailing list](http://www.ripe.net/ripe/mail/archives/db-wg/2013-February/004011.html)



## General Items

* When deleting an object, we do a more intelligent comparison of values at the attribute level rather than a simple text comparison of the whole object.
* References to RIPE NCC maintainer objects are protected.
* Users cannot add or remove these references.
* Objects maintained by a RIPE NCC maintainer cannot be deleted by users.
* Where "mnt-routes:" has additional qualifiers in curly braces {}, if the 'ANY' qualifier is used, no addresses can be used. So it is either a list of addresses OR it is the qualifier 'ANY' but not both.
* The "delete:" pseudo attribute can be anywhere 'in' the object, including the first line of an object.
* The "password:" value has white spaces removed from start and end.
* The "changed:" dates can be in any order.
* The "changed:" dates can be one day in the future (to allow for time variations across the region).
* No notification is sent to "irt-nfy:" or "mnt-ref:" when an object is deleted referencing a corresponding IRT or ORGANISATION object.
* We no longer support the keywords 'DIFF' and 'KEYWORD' on email subject lines.
* Where multiple types of notifications are required to be sent to the same email address resulting from a single update message, these will all be combined into a single email message. Previously if an update had, for example, an object failing on authentication and another successful object change to add an organisation reference, this would have generated two email messages to the same address.
* When an object is deleted and a 'reason' is specified in the "delete:" attribute, this reason is included in both the acknowledgement message and all notification messages.
* We no longer support updates to multiple sources. This was a feature built into the legacy software but was never used as we only ever had the single source 'RIPE'.



## Changes related to INETNUM Objects

* If an IP address prefix is specified, it will be converted to a IP address range.
* An Info message "address prefix converted to range notation" is added to the acknowledgement.
* This applies to create, modify and delete.
* If the prefix cannot be converted into a single range, an error is displayed.
* We check for multiple spaces in INETNUM ranges and fix if necessary.
* Status values cannot be changed once the object has been created. To change status, the object must be deleted and re-created with proper parent authentication.
* New business rule logic can determine if an address has been allocated/assigned by the RIPE NCC or if is legacy space. For address space allocated or assigned by the RIPE NCC the policy rules on status are strictly enforced. The main difference is that hierarchies of assignments are no longer allowed.
* For legacy space the status rules are relaxed so that hierarchies at any status level can be created.
* When creating an INETNUM object, the business rule logic checks the status values of the new object against what will be the parent of the new object. It then checks what will be the child objects to the new object against the new object as their new parent. If any status hierarchy is found to be invalid, the object creation will fail.
* Business rules more strictly relate ORGANISATION type with the status value.



## Changes related to INET6NUM objects

* The IPv6 address is normalised into a standard format. For example the value 2001:600:1:1:1:1:1:1/64 is converted to 2001:600:1:1::/64. This conversion is done for create, modify and delete. So if you create an object specifying the address as 2001:600:1:1:1:1:1:1/64, the object actually created in the database will have the primary key value 2001:600:1:1::/64. If you then delete the object, again specifying the address as 2001:600:1:1:1:1:1:1/64, this is converted to 2001:600:1:1::/64 and the correct object is found to delete.
* Status values cannot be changed once the object has been created. To change status, the object must be deleted and re-created with proper parent authentication.
* When creating an INET6NUM object, the business rule logic checks the status values of the new object against what will be the parent of the new object, then checks what will be the child objects to the new object against the new object as their new parent. If any status hierarchy is found to be invalid, the object creation will fail. For status 'AGGREGATED-BY-LIR' grand parent/child are also checked.
* Business rules more strictly relate ORGANISATION type with the status value.



## Changes related to DOMAIN objects

* The "nserver:" attribute is a mandatory attribute and does not allow lists of values.
* The "nserver:" value can only contain a glue record (optional IP address following the hostname) if the hostname ends with the DOMAIN name.
* The following glue records are valid:
    domain:     144.102.10.in-addr.arpa 
    nserver:    144.102.10.in-addr.arpa 10.20.133.177
    domain:     64.67.10.in-addr.arpa 
    nserver:    a.ns.64.67.10.in-addr.arpa 10.46.210.1 
    nserver:    ns1.64.67.10.in-addr.arpa 2001:db8::1
* The following glue records are invalid:
    domain:     144.102.10.in-addr.arpa 
    nserver:    ns1.host.com 10.20.133.177
    domain:     64.67.10.in-addr.arpa 
    nserver:    a.ns.64.67.10.in-addr.arpa 10.46.210.1.in-addr.arpa 
    nserver:    ns1.64.67.10.in-addr.arpa 2001:db8::1.ip6.arpa
* IPv6 glue values are canonical.
* The glue IP address always represents a single IP address.
* So no ranges or prefixes are allowed.
* Any trailing dots are removed from nserver: host names.



## Changes related to ROUTE objects

* When multiple exact matching ROUTE objects exist, all are checked for authorisation. Any one of the existing ROUTE objects can authorise creation of a new ROUTE object with the same prefix.
* Community values can only be 16 bit numbers, e.g.: community.contains(65535:65535) (ED: I think 32-bits are now supported, check).



## Changes related to ROUTE6 objects

* The IPv6 address is normalised into a standard format. See details in INET6NUM object above.
* When multiple exact matching ROUTE6 objects exist, all are checked for authorisation. Any one of the existing ROUTE6 objects can authorise creation of a new ROUTE6 object with the same prefix.
* Community values can only be 16 bit numbers, e.g.  community.contains(65535:65535) (ED: I think 32-bits are now supported, check).



## Changes related to AUT-NUM objects

* Community values can only be 16 bit numbers, e.g.  community.contains(65535:65535) (ED: I think 32-bits are now supported, check).



## Changes related to KEY-CERT objects

* Expired certificates generate warnings, but are still accepted.
* Values for "method:", "owner:" and "fingerpr:" are all generated from the key data. Any values supplied by the user are ignored. These attributes can be omitted on create and modify and will be generated. If you include the attributes they cannot be blank. They must contain a syntactically correct value.
* Sub keys are allowed in a key. So the key data can contain a master key and multiple sub keys.
* The primary key value for a PGP KEY-CERT object (the "key-cert:" attribute value) does NOT have to be the key id matching the key data. It must match the syntax rules, PGPKEY-&lt;number&gt;, where number is any 8 digit hex value. This allows you to change the key data so the same object can represent a different public key without having to create a new object and change all the references.
* We preserved the 2 spaces in the middle of the "fingerpr:" value, even though it seems to be an oddity of GPG.



## Changes related to MNTNER objects

* Creating a MNTNER object now authenticates against itself so it is no longer possible to mistype the password hash on creation.



## Changes related to ORGANISATION objects

* The "organisation:" value on create is composed from the names in "org-name:" and is now converted to all upper case characters.
* If the characters are supplied, as in 'auto-1AbC', these are converted to upper case to create 'ORG-ABC1-RIPE'.
* An ORGANISATION object can reference itself in it's "org:" attribute on creation of the object.

