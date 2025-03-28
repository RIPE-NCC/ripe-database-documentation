---
permalink: /Appendices/Appendix-C--RIPE-Database-Query-Server-Response-Codes-and-Messages
lastUpdated: 1702898267000
prev:
  text: 02 Appendix B  Copyright Statement
  link: /Appendices/02-Appendix-B--Copyright-Statement/
next:
  text: 04 Appendix D  Route Object Creation Flowchart
  link: /Appendices/04-Appendix-D--Route-Object-Creation-Flowchart/
---

# Appendix C- RIPE Database Query Server Response Codes and Messages

If the server encounters a problem, an error message is returned as a query result. The format of an error message is as follows:

    %ERROR:#:<message>,

where # is the error or response code and &lt;message&gt; is a short description of the problem. There are no white spaces in this line, except in the &lt;message&gt; string. This maybe followed by a more descriptive message, each line of which starts with % followed by a white space and some text.

Example:

    % This is the RIPE Database query server. 
    % The objects are in RPSL format. 
    %
    % The RIPE Database is subject to Terms and Conditions.  
    % See http://www.ripe.net/db/support/db-terms-conditions.pdf 

    %ERROR:101: no entries found  
    %  
    % No entries found in the selected source(s).

## Query Errors

**%ERROR:101: no entries found**
No entries were found in the selected source(s).

**%ERROR:102: unknown source**
Unknown source was supplied as argument to the `-s` query ag. Use `-q sources` for a list of available sources.

**%ERROR:103: unknown object type** 
Unknown object type is specified as an argument to the `-T` query flag.

**%ERROR:104: unknown attribute**
Unknown argument is specified to the inverse query flag (`-I`). See [Queryingthe RIPE Database](../How-to-Query-the-RIPE-Database/#how-to-query-the-ripe-database) for more information.

**%ERROR:105: attribute is not searchable**
The argument specified for the inverse query flag is not a searchable attribute. See [Queryingthe RIPE Database](../How-to-Query-the-RIPE-Database/#how-to-query-the-ripe-database) for more information.

**%ERROR:106: no query argument specified**
No query argument has been specified in the query.

**%ERROR:107: input line too long**
Input exceeds the maximum line length.

**%ERROR:108: bad character in input** 
An invalid character was passed in the query. The only allowed characters are letters,numbers and -_:+=.,@/?'

**%ERROR:109: invalid combination of flags passed**
The specified query flags cannot be included in the same query.

**%ERROR:110: multiple use of flag**
The same flag cannot be used multiple times.

**%ERROR:111: invalid option supplied**
Query flag that does not exist was given. Use the help query to see the valid options.

**%ERROR:112: unsupported query**
`-mM` query options are not allowed on very large ranges/prefixes.

**%ERROR:114: unsupported query**
Search key doesn't match any known query types.

**%ERROR:115: invalid search key**
Search key entered is not valid for the specified object type(s).

**%ERROR:116: unsupported query**
Versions are not supported for PERSON/ROLE objects.

**%ERROR:117: version cannot exceed X for this object**
Versions are numbers greater or equal to 1 but cannot exceed the object's current version number.


## Access Errors

**%ERROR:201: access denied** 
Access from the host has been temporarily or permanently denied because of excessive querying. You should [contact a customer service representative](https://www.ripe.net/contact-form?topic=ripe_dbm) to discuss this problem.

**%ERROR:202: access control limit reached**
Limit of returned objects has been reached. The connection is terminated. Continued attempts to excessively query the database will result in permanent denial of service. See section [Access Control for Queries](../Types-of-Queries/Access-Control-for-Queries/#access-control-for-queries) for more information.

**%ERROR:203: address passing not allowed** 
The host is not registered as a proxy and is not allowed to pass addresses on the query line (`-V` ag). See section [Access Control for Queries](../Types-of-Queries/Access-Control-for-Queries/#access-control-for-queries) for more information.


## Connection Errors

**%ERROR:301: connection has been closed**
The connection is administratively or abnormally closed.

**%ERROR:302: referral timeout**
The connection was closed due to referral timeout.

**%ERROR:303: no referral host**
Referral host cannot be found.

**%ERROR:304: referral host not responding** 
The connection to the referral host cannot be established.

**%ERROR:305: connection has been closed** 
The connection to the server has been closed after a period of inactivity.

**%ERROR:306: connections exceeded**
Number of connections from a single IP address has exceeded the maximum number allowed.


## NRTM Errors

**%ERROR:401: invalid range: Not within &lt;rst&gt;-&lt;last&gt;**
This happens when the requested range or part of it is outside the serial numbers available at the server. &lt;rst&gt; is the lowest serial number available. &lt;Last&gt; is the most recent serial number available.


## Warnings

**%WARNING:901: duplicate IP ags passed** 
More than one IP flag (-x, -M, -m, -L, -l, -c, or -b) was passed to the server. Only the last one in the list of query flags will be used for this query.

**%WARNING:902: useless IP flag passed**
An IP flag (-x, -M, -m, -L, -l, -c, or -b) was passed to the server when query did not include an IP key as the argument.
