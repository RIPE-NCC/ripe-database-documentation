# RIPE Database RESTful API

The RESTful API can be used for both queries and updates. The update methods supported are:

* [POST](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API-Create): create
* [PUT](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API-Update): update
* [DELETE](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API-Delete): delete

The client should specify the desired response format using the Accept: header in the HTTP request. If unspecified, the response defaults to XML. The only other option at the moment is JSON. Clients can also append an extension of .xml or .json to the request URL instead of setting an Accept: header. The server will return a response in the appropriate format for that given extension.

If the request fails, any error messages will be returned in the response body, using the requested Accept format (XML or JSON). This error message element will not be included on a successful response.

The RESTful API only processes one object at a time. This is fundamental to the REST paradigm. If you want to process many objects using this API, you need to write a script on the client side to handle the list of objects and feed them, one at a time, to the REST API and handle the responses. The API will easily handle the largest objects in the database.

Any required passwords must also be supplied as part of the Uniform Resource identifier (URI) using the URI query parameter “password=”. One parameter should be used for each password supplied. The pseudo attribute “password:” cannot be used in the HTTP request body. See ["Email Updates"](./04-Email-Updates.md#email-updates) for more information.

Full documentation on the RESTful API is available on [GitHub](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API).