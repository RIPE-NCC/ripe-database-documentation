---
permalink: /Appendices/Appendix-G--Object-Types-with-Personal-Data
---

# Appendix G- Object Types with Personal Data

Personal Contact Details are only held in these object types:
* **person**
* **role**
* **organisation**
* **irt**

**Role** object references can be replaced by one or more of the **person** objects it references.

**Organisation** object references are optional everywhere except in **inetnum** objects with a status of
ALLOCATED. References to **organisation** objects can simply be removed from anywhere else.

**Irt** object references are all optional. These references can also simply be removed.

In all cases, the **role**, **organisation** and **irt** object can then be deleted when there are no references to it.

**Person** objects are discussed in detail in this procedure.