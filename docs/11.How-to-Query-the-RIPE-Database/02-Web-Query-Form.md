# Web Query Form

The web query form is available at:
https://apps.db.ripe.net/

This is part of the RIPE Database web interface that also includes Webupdates.

The query argument is entered into the form. Many of the query flags can be selected with check boxes. The database source can also be selected this way. If you know the query flags you want, you can also type them into the form with the query argument. If you type some flags and check some others on the form, they will be merged into one set of query flags.

The results are limited to 250 objects. If your query exceeds this, the output is cut short. In this case, either change your query to return fewer results or use another query method.


## Using Full Text Search

If you are looking for a specific piece of information and you don't know one of the values required to find what you are looking for, you may consider using the [Full Text Search](https://apps.db.ripe.net/search/full-text.html) instead of doing a standard query. [Full Text Search](https://apps.db.ripe.net/search/full-text.html) treats the entire database as a flat text file and allows you to search for anything. The search is done on object text without regard for any relationships. As such, results may be very unstructed, but it can provide a good starting point for more specific standard queries later on. Keep in mind that [Full Text Search](https://apps.db.ripe.net/search/full-text.html) is only available on the RIPE NCC website and not in other methods to query the RIPE Database.

Personal data may be returned by the Full Text search API. You may be blocked if excessive amounts of personal data is returned. For more information refer to [blocking access section](../12.Access-to-Personal-Data/README.md#blocking-access-to-the-ripe-database)

### URI Format: /fulltextsearch/select?...

### Query Parameters
|name|required|Default|description|
|----|----|----|-----------|
|q|Yes||This parameter is used to specify the query for requesting documents. This query allows to filter by the attribute type and/or the object type. This is the only required attribute <ul><li>Query by "RIPE": q=(RIPE)</li><li>Query by "RIPE", filtering by attribute type: q=(org:(RIPE))</li><li>Query by "RIPE", filtering by object type: q=(RIPE)%20AND%20(object-type:mntner)</li><li>Query by "RIPE", filtering by attribute and object type: q=(org:(RIPE))%20AND%20(object-type:mntner)</li><li>Logic expressions are allowed to concatenate more than one term:<ul><li>Querying by "RIPE" and "NCC": q=(RIPE%20AND%20NCC)</li><li>Querying by "RIPE" or "NCC": q=(RIPE%20OR%20NCC)</li><li>Querying by "RIPE NCC": q=(%22RIPE%20NCC%22)</li><li>Querying by "RIPE", filtering by multiple attributes and object types: q=(e-mail:(RIPE)%20OR%20org:(RIPE))%20AND%20(object-type:organisation%20OR%20object-type:person)</li></ul></li></ul>|
|rows|No|10|The amount of documents to return.|
|start|No|0|The starting row. |
|hl|No|false|Highlight the matching values from the fetching documents. |
|hl.simple.pre|No|&lt;b&gt;|The highlight PRE value. |
|ht.simple.post|No|&lt;/b&gt;|The highlight POST value. |
|wt|No|xml|The format of the highlights. If the format is not xml "hl.simple.pre" and "hl.simple.post" will be discarded. |
|facet|No|true|Count the object types.|


There a some limitations to take care on:

* Not allowed to fetch more than 10,000 documents per request.
* There is a maximum of 100,000 results per query (with paging).
* The maximum highlight characters is trim to 100,000 characters.
* If more than 5,000 person object or role object with abuse-mailbox information is requested, the user's IP will be temporarily blocked.

The possible values that you can specify for the Accept/Content-Type header are:

* `application/xml` for XML
* `application/json` for JSON

Clients can also append an extension of `.xml` or `.json` to the request URL instead of setting an `Accept:` header. The server will return a response in the appropriate format for that given extension. XML format is the default one.