# RESTful API Queries

Queries are supported by the RESTful API using the GET method. There are two ways of using the API. One way looks up a specific object and only returns a single object. The other searches for objects matching specified criteria. The search may return large numbers of objects.

Full documentation on the RESTful API is available on [GitHub](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API).


## API Lookup

This can be done from the command line using a third party software package, from a script or in a browser. It will only return the one specific object requested. For lookups on address space, it will not return the encompassing object if the specified object does not exist. Only two parameters are allowed with a lookup, ‘unfiltered' and ‘unformatted'. (For a description, see the documentation on [GitHub](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API)) No other query flag is allowed. As an example from the command line:

    curl 'https://rest.db.ripe.net/ripe/inetnum/193.0.0.0%20-%20193.0.7.255?unfiltered'
Any spaces in the command must be encoded. The response will be returned by default in XML format. Alternatively JSON can be returned:

    curl -H 'Accept: application/json'

    'https://rest.db.ripe.net/ripe/inetnum/193.0.0.0%20-%20193.0.7.255?unfiltered'


## API Search

This can be run in the same ways as the API Lookup. This search provides the same set of results as a web or command line query will provide. All the query flags can be used in the search. An example, from the command line:

    curl ‘https://rest.db.ripe.net/search?source=ripe&query-string=dw-ripe&flags=no-filtering&flags=no-referenced'
As with the lookup, any spaces in the command must be encoded. The response will be returned in XML format by default. Alternatively, JSON can be returned (see the [GitHub documentation](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API) for more information).