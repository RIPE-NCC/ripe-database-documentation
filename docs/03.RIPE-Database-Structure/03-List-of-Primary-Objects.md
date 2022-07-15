# List of Primary Objects

These are the currently supported objects in the RIPE Database that are considered to be primary data.

| Object Type | Description |
| --- | --- |
| **aut-num** | Holds information about an Automonous System (AS) Number. If it has “status: ASSIGNED” it is an authoritative resource assigned by the RIPE NCC and is part of the number registry (INR). It can also describe the external routing policy of the AS and is then part of the routing registry (IRR). |
| **domain** | Reverse domain registrations. Any changes made to **domain** objects in the RIPE Database are reflected in the DNS zone files. |
| **inet6num** | Allocations and assignments of IPv6 address space. |
| **inetnum** | Allocations and assignments of IPv4 address space. |
| **route** | IPv4 route advertised on the Internet. |
| **route6** | IPv6 route advertised on the Internet. |
| **as-set** | Set of **aut-num** objects. |
| **filter-set** | Set of routes matched by its filter. |
| **inet-rtr** | Internet router. |
| **peering-set** | Set of peerings. |
| **route-set** | Set of routes. |
| **rtr-set** | Set of routers. |