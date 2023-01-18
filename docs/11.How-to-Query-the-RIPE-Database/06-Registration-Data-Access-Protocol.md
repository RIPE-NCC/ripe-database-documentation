# Registration Data Access Protocol (RDAP)

The **Registration Data Access Protocol** (RDAP) is an alternative protocol to WHOIS that specifies how to access internet resource registration data. It is specifically designed to address various shortcomings in WHOIS. It makes use of HTTPS and follows a RESTful (representational state transfer) web services model.

## Using RDAP to query RIPE Database

The contents of RIPE database can be accessed using RDAP via `https://rdap.db.ripe.net/{objectType}/{key}` where `{objectType}` must be one of the Object Types listed below.

List of supported object types

| Object Type | Description                    |
|-------------|---------------------------------|
| autnum      | AUT-NUM objects                 |
| domain      | DOMAIN objects                  |
| ip          | INETNUM and INET6NUM objects    |
| entity      | PERSON, ROLE and MNTNER objects |


The value of `{key}` depends on the object type.

For example:

    curl -v https://rdap.db.ripe.net/ip/2001:67c:2e8:9::c100:14e6

queries IP information, while

    curl -v https://rdap.db.ripe.net/domain/193.0.6.139.in-addr.arpa
queries domain information.

If the RIPE Database is not authoritative for the requested resource, the response will redirect to the authoritative RIR.

## RDAP Specification

The RDAP protocol is specified in the RFCs:

 * [RFC 7480](https://www.rfc-editor.org/rfc/rfc7480) – HTTP Usage in the Registration Data Access Protocol (RDAP)
 * [RFC 7481](https://www.rfc-editor.org/rfc/rfc7481) – Security Services for the Registration Data Access Protocol (RDAP)
 * [RFC 9082](https://datatracker.ietf.org/doc/rfc9082/) – Registration Data Access Protocol (RDAP) Query Format
 * [RFC 9083](https://datatracker.ietf.org/doc/rfc9083/) – JSON Responses for the Registration Data Access Protocol (RDAP)
 * [RFC 7484](https://www.rfc-editor.org/rfc/rfc7484) – Finding the Authoritative Registration Data (RDAP) Service
 * [RFC 7485](https://www.rfc-editor.org/rfc/rfc7485) – Inventory and Analysis of WHOIS Registration Objects

## Known Issues

Known issues with the RDAP implementation for RIPE Database can be found on [GitHub](https://github.com/RIPE-NCC/whois/blob/master/README.RDAP.md).