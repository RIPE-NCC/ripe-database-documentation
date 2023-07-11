---
permalink: /How-to-Query-the-RIPE-Database/Registration-Data-Access-Protocol
---

# Registration Data Access Protocol (RDAP)

The **Registration Data Access Protocol** (RDAP) is an alternative protocol to WHOIS that specifies how to access internet resource registration data. It is specifically designed to address various shortcomings in WHOIS. It makes use of HTTPS and follows a RESTful (representational state transfer) web services model.

## Using RDAP to query RIPE Database

* The contents of RIPE database can be accessed using RDAP via `https://rdap.db.ripe.net/{objectType}/{key}` where `
{objectType}` must be one of the Object Types listed below.

    List of supported object types

    The value of `{key}` depends on the object type.

    If the RIPE Database is not authoritative for the requested resource, the response will redirect to the 
  authoritative RIR.

| Object Type | Description                                                                                                                      |
|-------------|----------------------------------------------------------------------------------------------------------------------------------|
| autnum      | AUT-NUM and AS-BLOCK objects. Example: https://rdap.db.ripe.net/autnum/3333                                                      |
| domain      | DOMAIN objects. Example: https://rdap.db.ripe.net/domain/193.0.6.139.in-addr.arpa                                                |
| ip          | INETNUM and INET6NUM objects. Example: https://rdap.db.ripe.net/ip/193.0.0.0/21 or https://rdap.db.ripe.net/ip/2001:67c:2e8::/48 |
| entity      | PERSON, ROLE and MNTNER objects. Example: https://rdap.db.ripe.net/entity/RIPE-NCC-MNT                                           |


* The Entities service enables searching for matches based on a term. The output is a List with objects in RDAP format.
    ```
    https://rdap.db.ripe.net/entities?fn={fn}&handle={handle}
    ```
    * fn: Returns all the matches for **person:**, **role:**, and **org-name:** attributes. Example: https://rdap.db.ripe.net/entities?fn=RIPE-RIPE
    * handle: Returns all the matches for **organisation:**, **nic-hdl:** attributes. Example: https://rdap.db.ripe.net/entities?handle=RIPE-RIPE
* The Domains service enables searching for matches based on a term. The output is a List with objects in RDAP format.
    ```
    https://rdap.db.ripe.net/domains?name={name}
    ```
    * name: Returns all the matches for **domain:** attribute. Example: https://rdap.db.ripe.net/domains?name=196.46.95.in-addr.arpa
* The Help service return a valid RDAP object containing the default set of notices for the service. The
  rdapConformance element in the response include the extension identifiers for all the extension implemented.
    ```
    https://rdap.db.ripe.net/help
    ```
## RDAP Specification

The RDAP protocol is specified in the RFCs:

 * [RFC 7480](https://www.rfc-editor.org/rfc/rfc7480) – HTTP Usage in the Registration Data Access Protocol (RDAP)
 * [RFC 7481](https://www.rfc-editor.org/rfc/rfc7481) – Security Services for the Registration Data Access Protocol (RDAP)
 * [RFC 9082](https://datatracker.ietf.org/doc/rfc9082/) – Registration Data Access Protocol (RDAP) Query Format
 * [RFC 9083](https://datatracker.ietf.org/doc/rfc9083/) – JSON Responses for the Registration Data Access Protocol (RDAP)
 * [RFC 7484](https://www.rfc-editor.org/rfc/rfc7484) – Finding the Authoritative Registration Data (RDAP) Service
 * [RFC 7485](https://www.rfc-editor.org/rfc/rfc7485) – Inventory and Analysis of WHOIS Registration Objects

 ## RDAP profiles

In addition to the base RDAP specification, we also implement the following profiles
 
 * [NRO RDAP Profile](https://bitbucket.org/nroecg/nro-rdap-profile/raw/v1/nro-rdap-profile.txt).

## Known Issues

Known issues with the RDAP implementation for RIPE Database can be found on [GitHub](https://github.com/RIPE-NCC/whois/blob/master/README.RDAP.md).