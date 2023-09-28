---
permalink: /Authorisation/Protection-of-PERSON-and-ROLE-Objects
---

# Protection of PERSON and ROLE Objects

When "mnt-by:" was made mandatory on these objects a circular dependency was created. A **person** object must be maintained and a **mntner** must reference an existing **person**. Therefore, a new user who has no data in the RIPE Database must follow the procedure in the section, ['New Organisation Startup'](../Updating-Objects-in-the-RIPE-Database/Special-Considerations-for-Object-Creation/#special-considerations-for-object-creation) to get started.

