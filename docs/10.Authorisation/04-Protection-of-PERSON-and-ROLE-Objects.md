---
permalink: /Authorisation/Protection-of-PERSON-and-ROLE-Objects
---

# Protection of PERSON and ROLE Objects

When "mnt-by:" was made mandatory on these objects a circular dependency was created. A **person** object must be maintained and a **mntner** must reference an existing **person**. Therefore, a new user who has no data in the RIPE Database must follow the procedure in the section, ['New Organisation Startup'](../Updating-Objects-in-the-RIPE-Database/Special-Considerations-for-Object-Creation.md#special-considerations-for-object-creation) to get started.

There is a legacy of **person** and **role** objects that still do not have a "mnt-by:" attribute. This must be added when the object is next modified.

In order to remind users to maintain this legacy personal data, warning messages are generated in the acknowledgement message. Every time a **person** or **role** object is referenced that is not maintained, a warning will remind the user to protect their personal object. Every time a **mntner** object is referenced where the **mntner** has a reference to a **person** or **role** object that is not maintained, another warning message is generated.