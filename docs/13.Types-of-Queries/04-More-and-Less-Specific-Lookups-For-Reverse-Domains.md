---
permalink: /Types-of-Queries/More-and-Less-Specific-Lookups-For-Reverse-Domains
lastUpdated: 1702898267000
prev:
  text: 03 Queries for Autonomous Systems
  link: /Types-of-Queries/03-Queries-for-Autonomous-Systems/
next:
  text: 05 Inverse Queries
  link: /Types-of-Queries/05-Inverse-Queries/
---

# More and Less Specific Lookups For Reverse Domains

The RIPE Database supports IP network queries including the `-x`, `-M`, `-m`, `-L` and `-l` functionality for reverse delegation domains. If you want to include reverse delegation domains in the query response when using the more or less specific or exact match query flags. You must also include the `-d` query flag, this will return all **domain** objects for the address range.

Please note that there is no hierarchy allowed with reverse **domain** objects. These queries work on the address space hierarchies and return the corresponding **domain** object, if found, for any address space objects in the query response.
