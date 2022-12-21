---
permalink: /Types-of-Queries/Access-Control-for-Queries
---

# Access Control for Queries

The control mechanism is based on the amount of contact information (contained in **person** and **role** objects) that is returned because of any queries made. Limits are based on the IP address of a whois client sending queries to the database server. Sometimes an IP address may be acting as a proxy and submitting queries on behalf of other IP addresses (for example, a webserver providing an interface to the RIPE Database). The database server provides a facility for such proxy clients that allows accounting to be based on the IP address of the clients using the proxy to query the RIPE Database and not on the IP address of the proxy server. This is done using the `-V` flag as follows:

    -V <version>,<ipv4-address>

where
* &lt;version&gt; is a client tag that usually represent the software version that the proxy uses
* &lt;ipv4-address&gt; is the IPv4 address of the client that queries the database using the proxy

Not all users can use this `-V` flag. You must contact RIPE Database Administration and tell us why you need this facility. If we approve your request, we will add the IP address of the proxy server to an access control list. You can then use the `-V` flag, but only from your stated IP address.

Attempting to use the `-V` flag without approval may result in permanent denial of access to the RIPE Database. This denial of access will apply to the IP address that submits the query.

We restrict access to stop people using the RIPE Database to collect excessive amounts of contact data. If the 
amount of contact data returned by all your queries in a day (defined by UTC) exceeds defined limits, a temporary 
block on access is applied to that IP address. This block will be automatically released at midnight (UTC) to allow querying to continue. There is also a limit on the number of times an IP address can be blocked and recover. When this limit is reached, that IP address is permanently blocked from accessing the RIPE Database. This permanent block will not be automatically removed. The limits are defined in the [RIPE Database Acceptable Use Policy](../RIPE-Database-Acceptable-Use-Policy/#ripe-database-acceptable-use-policy)
Each time a **person** or **role** object is retrieved, a counter increases. When it reaches the limit defined in the [AUP](../22.RIPE-Database-Acceptable-Use-Policy.md#ripe-database-acceptable-use-policy), the query execution is aborted and the connection is terminated, displaying an error message to the client (see “Access errors” in [Appendix C,RIPE Database Query Server Response Codes and Messages](../19.Appendices/03-Appendix-C--RIPE-Database-Query-Server-Response-Codes-and-Messages.md#appendix-c--ripe-database-query-server-response-codes-and-messages)). Also a count of denials increases. Retrieving any other object type does not affect these counters.

Any role object used for abuse contacts with an "abuse-mailbox:" attribute is exception to this rule. No accounting is done on these objects.

There is also a limit on the number of simultaneous connections from a host. When this limit is reached, further connections from the same host are refused.

If we block your access, you will not be able to query for any object types. We will not just block your access to contact date alone.
