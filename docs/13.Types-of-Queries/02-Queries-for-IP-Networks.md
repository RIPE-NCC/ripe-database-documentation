# Queries for IP Networks

The RIPE Database provides information about IP networks allocated or assigned within the RIPE NCC service region. This information is mainly stored as **inetnum**, **inet6num**, **route** and **route6** objects. These objects store information about a single IP address or ranges of addresses.

The **route** and **route6** objects use prefix notation to specify the single address or range of addresses about which they contain information.

The **inetnum** objects represent an IPv4 address space in range notation. The **inet6num** objects represent IPv6 address space in standard prefix notation.

When you query the RIPE Database for information about IP addresses, you can specify query arguments with the following notations:

* A prefix (IPv4 or IPv6).
* An explicit range (IPv4 only).
* A single IP address. This is interpreted as a range of just one address. For IPv4, this can be written in range notation using the same start and end address. It could also be written as a single address. For IPv6, this has a prefix length of 128 or again it could also be written as a single address.

For IPv4 address space, the query argument can be specified with either prefix or range notation. When prefix notation is used, the database software converts this into range notation before it executes the query. An information message is included in the query response showing the conversions performed. For IPv6 address space, the query argument can only be specified in prefix notation. The single IP address is accepted as a short hand notation for a prefix.

There is a list of queries for IP networks in the "Tables of Query Types Supported by the RIPE Database" in the [RIPE Database Query Reference Manual](https://www.ripe.net/manage-ips-and-asns/db/support/documentation/query-ref-manual).

There are a number of options that describe how you can retrieve different types of information relative to a particular range of IP addresses (IPv4 or IPv6) including more and less specific queries.


## Default Queries for IP Network

If you do not specify one of the following IP related query flags, and your query argument is a range of IP addresses in any one notation, a RIPE Database server will try to find an object with an exact match range for the specified range. If found, the exact match range is returned. If an exact match range cannot be found, the server looks for the object with the smallest less specific range. This will be the smallest, existing, encompassing range.


## Exact Match Queries

If you want to change the default behaviour so that the server returns only an object with an exact match range, you need to use the “–x” (or --exact) query flag. This flag stops the server from looking for any less specific ranges if no exact match range exists. Not even the smallest encompassing range will be returned. If no exact match range is found, no object will be returned in the query response.

## More Specific Range Queries

These refer to queries qualified by the use of the “-M” and “-m” query flags.

These queries will return information about objects with ranges of IP addresses that are fully contained within the reference range specified in the query argument. The returned objects contain fewer addresses than the specified range. More specific range queries do not return the exact match range if it exists.

* “-M” (or --all-more) - requests that the server should return all the sub-ranges that are completely contained within the reference range. When there are hierarchies of sub-ranges, all levels of the hierarchies will be returned down to the smallest sub-range in each hierarchy. Many objects can be returned. **All smaller** IP ranges in the IP range.
* “-m” (or --one-more) - requests that the server should return all the sub-ranges that are completely contained within the reference range. When there are hierarchies of sub-ranges, only the top level of the hierarchies will be returned. These are usually called one level more specific ranges. Many objects can be returned. The **Immediately smaller** IP range in the IP range.

## Less Specific Range Queries

These refer to queries qualified by the use of the “-L” and “-l” query flags.

These queries will return information about objects with ranges of IP addresses that fully contain the reference range specified in the query argument. The returned objects contain a greater number of addresses than the specified range.

* “-L” (or --all-less) - requests that the server returns the object with an exact match range, if it exists, and all objects with ranges that are bigger than the reference range and that fully contain, or encompass, it. Many objects can be returned. **All larger** IP range in the IP range.

* “-l” (or --one-less) - requests that the server does not return the object with an exact match range, if it exists. It returns only the object with the smallest range that is bigger than the reference range and that fully contains, or encompasses, it. This is usually referred to as the one level less specific range. Only one object can be returned. The **closest larger** IP range containing the IP range.


## Less Specific Range Queries For Referenced IRT Objects

An **irt** object represents a Computer Security Incident Response Team (CSIRT). It includes contact and security information. It is optionally referenced from **inet(6)num** objects using the “mnt-irt:” attribute (even though the **irt** object is not a **mntner** object). This shows which CSIRT is responsible for handling computer and network incidents for that address range.

A reference to an **irt** object does not only apply to the **inet(6)num** object that contains the reference. It also applies to all **inet(6)num** objects that are more specific to the one containing the reference. Not every **inet(6)num** object needs to contain a reference to the **irt** object. The **irt** reference only needs to be placed in the least specific encompassing object to apply to a whole hierarchy of objects. This makes it easier to apply and maintain.

There may be more than one **inet(6)num** object in a hierarchy referencing an **irt** object. In this case, the one referenced from the smallest encompassing object is the one that applies to the range in question.

There is a “-c” (or --irt) query flag to make it easy to find the **inet(6)num** object containing the reference to an **irt** object for any specific range.

This flag makes the server search up the hierarchy of less specific range objects from the range specified as the query argument. The search will stop when the first object is found containing a reference to an **irt** object. This can be either the specified range or an encompassing **inet(6)num** object at any level in a hierarchy. The query will return the **inet(6)num** object found for the range specified in the query argument. The referenced **irt** object found in the hierarchy will also be returned.

Sometimes, no **inet(6)num** object is found in the hierarchy that contains a reference to an **irt** object. In this case, the query response will only contain the **inet(6)num** object found for the range specified in the query argument.

