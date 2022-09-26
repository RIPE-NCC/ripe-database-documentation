# How to Query the RIPE Database

Querying the RIPE Database is the process of reading information from the database. Historically, this was done from the command line using a whois client. Now, there are a number of ways to query the RIPE Database.

<font color="green"> 
We describe the general format of a query and the query flags that you can use to change the default behaviour of a query.

We also describe how the database server automatically tracks query responses and limits how much contact information you can take from the RIPE Database. We do this to 
reduce the chance that someone will use the database to send spam e-mails to addresses that they find.
</font>

<font color="red">
Miguel comments: It is not necessary to add a menu when we already have the left hand menu

* Using a whois client running the whois protocol
* Using the web interface from the RIPE NCC website
* Using telnet to port 43 of the whois.ripe.net host
* Using the REST API running at rest.db.ripe.net
</font>