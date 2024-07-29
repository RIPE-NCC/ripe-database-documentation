---
permalink: /How-to-Query-the-RIPE-Database
---

# How to Query the RIPE Database

Querying the RIPE Database is the process of reading information from the database. Historically, this was done from the command line using a whois client. Now, there are a number of ways to query the RIPE Database.

We describe the general format of a query and the query flags that you can use to change the default behaviour of a query.

We also describe how the database server automatically tracks query responses and limits how much contact information you can take from the RIPE Database. We do this to 
reduce the chance that someone will use the database to send spam e-mails to addresses that they find.

Following [Acceptable use policy](https://www.ripe.net/manage-ips-and-asns/db/support/documentation/ripe-database-acceptable-use-policy/), we strive to detect
potential attacks. If a DoS attack is detected, we temporarily block the user's IP address. 

Additionally, a user exhibiting malicious behavior may be permanently blocked from the system. In such cases, the user will receive a 
notification indicating that they are permanently blocked whenever they attempt to make a query.
