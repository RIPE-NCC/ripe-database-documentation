---
permalink: /RIPE-Database-Structure/Attribute-Names
---

# Attribute Names

Attribute names have a precisely defined syntax and only use alphanumeric and characters and hyphens (-). They are not case-sensitive, but the software converts them all to lower case. The attribute name must start at column 0 and must immediately be followed by a colon (`:`). No spaces or tabs are allowed anywhere within the name, before the name, or in-between the attribute name and the colon. For example, the below notation is correct:
    mntner: TEST-DBM-MNT
This is correct because there is no space between the colon (`:`) and the attribute name (mntner).

The software is very strict on these points, but they are common user mistakes. There are many aspects to the formatting of attributes and values and the relationship between them. It is not easy to change just one element of this formatting.