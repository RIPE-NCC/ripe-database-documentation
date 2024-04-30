---
permalink: /RPSL-Object-Types/Description-of-Attributes-Common-to-all-Objects
---

# Description of Attributes Common to all Objects

* **"org:" –** this optional attribute references the primary key, or id, of an **organisation** object that currently exists in the database.
The referenced object contains details of the organisation that holds Internet resources or secondary objects to help manage resources in the RIPE Database or specifies business relations. This attribute is required on the **inet(6)num** objects with the following status values:
  * ALLOCATED-BY-RIR
  * ALLOCATED PA
  * ALLOCATED-ASSIGNED PA
  * ALOCATED PI
  * ALLOCATED UNESPECIFIED

* **"admin-c:" –** this attribute is optional in some objects and mandatory in others. It references the primary key, or NIC Handle, of either a **role** or **person** object. It should always reference a **role** object, except in the **role** object where it optionally references nested **role** objects or a **person** object.
The reference must be the contact details of an on-site administrative contact. This contact may be a single person, or it may be a role within the organisation that more than one person takes on. These people may or may not be listed in the role object.

* **"tech-c:" –** this attribute is optional in some objects and mandatory in others. It references the primary key, or Nic Handle, of either a **role** or **person** object. It should always reference a **role** object, except in the **role** object where it optionally references nested **role** objects or a **person** object.
The reference must be the contact details of a technical contact. This contact may be a single person, or it may be a role within the organisation that more than one person takes on. These people may or may not be listed in the **role** object.

* **"remarks:" –** this optional attribute can be any free format text, within the allowable encoding. This attribute can even have a blank value and be used as a spacer to separate different parts of the information in an object.
Some objects have very complex arrangements in their remarks with lots of formatting and style to create a layout that almost personalises their data. Keep in mind that it is data and the RIPE Database is not the best place to display ASCII art. The best advice on using remarks is to ‘keep it simple'.

* **"notify:" –** this optional attribute specifies an email address to which notifications of changes to an object will be sent. Only the email addresses from the "notify:" attribute values contained in ‘this' object will be notified of changes to ‘this' object. Only successful changes will be notified.
Within the RIPE NCC, we can override this notification mechanism. For example, if the community agrees on a syntax change that affects many objects in the database, this change may be done as a bulk update by the RIPE NCC. In some cases, the RIPE NCC does not want to trigger hundreds of thousands or even millions of emails to be sent as part of the implementation of an agreed change.

* **"mnt-by:" –** this mandatory attribute references the primary key, or name, of a **mntner** object that currently exists in the database. This **mntner** object's credentials must authorise any operations performed on the object that contains this attribute. The **mntner** object must exist in the database before it can be referenced in other objects.
In some objects, the **mntner** object referenced in a "mnt-by:" attribute can have a range of additional powers. This is explained in more detail in the section ['Authorisation'](../Authorisation/#authorisation). When this applies, it will be stated in the object template descriptions.

* **"created:" –** This attribute reflects when the object was created in the RIPE Database. Because a large number of objects were imported in bulk from a previous incarnation of the RIPE Database on 21 September 2001, the actual "created" time for these objects can be very difficult or impossible to find. Because ISO 8601 does not support an "undefined" notation, the following date and time is used: 1970-01-01T00:00:00Z

* **"last-modified:" –** This attribute reflects when it was last changed. If an object has never been changed, the value of this attribute will be the same as the "created:" attribute. If an object was part of the bulk import on 21 September 2001 and has never been modified, the original import date and time was used for this attribute. This attribute will not be modified as a result of bulk changes, applied to the database by the RIPE NCC, that have no semantic meaning. An example of this is when an attribute is deprecated and removed from all objects containing it.

* **"source:" –** The "source:" attribute should specify the authoritative registry where the object is registered. In the RIPE Database, all source values are set to ‘RIPE'. The same value is used even when the object is a copy of a resource from another registry.
The source may be appended with a software-generated end-of-line comment ‘# Filtered'. This is not part of the stored data. It may be generated when the object is displayed, depending on the query flags used. (Note that users cannot add end-of-line comments to a source attribute. Please see ['End of Line Comments'](../RIPE-Database-Structure/Attribute-Values/#end-of-line-comments) for more information.)
For the RIPE TEST Database the source value is ‘TEST' for all objects. This may also be appended with ‘# Filtered'.
For the Global Resource Service (GRS), the RIPE NCC mirrors several other resource databases. The source value reflects which of the mirrored databases returned the query result. For example ‘APNIC-GRS' if the queried resource was found in the mirror of the APNIC Database.
