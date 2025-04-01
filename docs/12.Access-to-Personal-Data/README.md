---
permalink: /Access-to-Personal-Data
lastUpdated: 1743494265000
prev:
  text: README
  link: /How-to-Query-the-RIPE-Database/README/
next:
  text: Queries Using Primary and Lookup Keys
  link: /Types-of-Queries/Queries-Using-Primary-and-Lookup-Keys/
---

# Access to Personal Data

For privacy and data protection reasons, there is a limit to how much personal data a user can query from the RIPE Database over a period of time. For more details of the legal background, see the [RIPE NCC Data Protection Report](https://www.ripe.net/about-us/legal/ripe-ncc-data-protection-report).

Personal information is contained in the person object. There may also be some personal information in some role objects. The access control mechanism built into the database software therefore applies to both person and role objects.

The access control mechanism used is based on the number of these objects that are returned in the results of any queries made. Limits are applied to the IP address of a user sending queries to the database server by any of the query methods. (See ['How to Query the RIPE Database'](../How-to-Query-the-RIPE-Database/#how-to-query-the-ripe-database) for more details of the methods.)

Sometimes an IP address may be acting as a proxy and submitting queries on behalf of other IP addresses (for example, a webserver providing an interface to the RIPE Database). The database software provides a facility for proxy operators, which allows accounting to be based on the IP address of the End Users using the proxy to query the RIPE Database, and not on the IP address of the proxy operator. This is done using the `-V` flag as follows:

    -V &lt;version&gt;,&lt;ip-address&gt;

* &lt;version&gt; is a client tag that can be any text string chosen by the proxy operator. Operators often use a string, showing the version of the software that the proxy operator uses, or, sometimes, they use an identifying string for the proxy operator.
* &lt;ip-address&gt; is the IPv4 or IPv6 address of the End User that queries the database using the proxy service

 
Not all users can operate a proxy service and use this `-V` flag. You must contact RIPE Database Administration \
[ripe-dbm \_at\_ ripe \_dot\_ net\] and explain why you need this facility. If your request is approved, the IP address of the proxy server will be added to an access control list. The proxy operator can then use the `-V` flag, but only from the IP address stated in the request.  
Attempting to use the `-V` flag without approval, or from any IP address not on the access control list, may result in permanent denial of access to the RIPE Database. This denial of access will apply to the IP address that submits the query using the `-V` flag.

## Blocking Access to the RIPE Database

Each time a person or role object is returned as part of a query result, a counter increases. When it reaches the limit defined in the AUP, the query execution is aborted and the connection is terminated, displaying an error message to the client (see the section on [Access errors in the RIPE Database Query Server Response Codes and Messages](../Appendices/Appendix-C--RIPE-Database-Query-Server-Response-Codes-and-Messages/#appendix-c--ripe-database-query-server-response-codes-and-messages)). There is also a separate counter, tracking the number of times your request is denied. Retrieving any other object type does not affect these counters.

Any role object used for abuse contacts with an "abuse-mailbox:" attribute is an exception to this rule. No accounting is done on these objects.

We restrict access to the RIPE Database to stop people from using it to collect excessive amounts of contact data. 
If the number of personal contact objects returned by all your queries in a day (defined by UTC) from one IP address 
exceeds the limits defined in the [Acceptable Use Policy (AUP)](../RIPE-Database-Acceptable-Use-Policy/#ripe-database-acceptable-use-policy), that IP address's access will be blocked.
If your access is blocked, you will unable to query the RIPE Database for any object types - you are not just 
blocked from accessing contact data objects. This temporary block will be automatically released at midnight (UTC) to allow querying to continue. There is also a limit on the number of times an IP address can be blocked and recover. When this limit is reached, that IP address is permanently blocked from accessing the RIPE Database. This permanent block will not be removed automatically.

There are many reasons why you could find yourself blocked from querying the RIPE Database. One is that you are mining the RIPE Database for contact data to use for non-agreed purposes. In this case, the denial of access is justified and your IP address will remain on the blocked list. However, there may be other reasons why your IP address has been blocked. Queries for object types other than person and role objects return contact information by default. Using the `-r` or `--no-referenced` query flag to prevent contact data being included in your query results turns off this default. Alternatively, you may have an error in a script that runs automatically, retrieving contact data that you did not know about.

If you believe there was a genuine error or mistake that led to a permanent block, you should contact the [RIPE Database administrators](https://www.ripe.net/../../../contact-form?topic=ripe_dbm), explaining the error and what steps you have taken to stop it happening again. The RIPE Database administrators will decide if the block will be removed. It will remain on record that this IP address has been permanently blocked and then unblocked. If another permanent block occurs, it is less likely to be removed again.  
