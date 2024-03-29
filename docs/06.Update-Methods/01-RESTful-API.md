# RIPE Database RESTful API

For more information about the REST paradigm, see https://en.wikipedia.org/wiki/Representational_state_transfer.
If you used the old (beta) API, consider reading [migration guide for old API users](../19.Database-Support/07-Migration-guide.md#whois-rest-api-migration-guide)
All the services are accessible via HTTPS.
Use of the Whois REST API is governed by the RIPE Database [terms and conditions](../24.Legal-Information.md#)

## RESTful URI format

Each object in the RIPE Database has a unique locator URI, in the following format:

https://rest.db.ripe.net/{source}/{objecttype}/{key}

Where:

* `Source` is the database source (e.g. RIPE).
* `Objecttype` is the object type (e.g. inetnum)
* `key` is the primary key(s)
    * Normally key is a single attribute value.
    * Use the `nic-hdl` attribute value for person or role object types.
    * Combine the `route(6)` attribute value and `origin` attribute value for route or route6 object types (e.g. route 193.0.22.0/23AS3333).


### POST

Create an object in the RIPE database.

#### Locations
* `https://rest.db.ripe.net`
* `https://rest-test.db.ripe.net`


HTTPS is mandatory.

#### METHOD: POST
#### URI Format: /{source}/{objectType}?password={password}...
#### Path Parameters
|name|description|
|----|-----------|
|source|RIPE or TEST (depending on location)|
|objectType|object type.|


#### Query Parameters
|name|description|
|----|-----------|
|password|Password for maintainer authentication (one or more values).|
|unformatted|Keep the formatting of the resource as provided in the request (spaces, end-of-lines) .|
|dry-run|Optional. Perform validation but don't perform the update. |


#### HTTP Request Body

A [WhoisResource](../03.RIPE-Database-Structure/11-REST-API-Data-model.md#rest-api-data-model) containing the object to be created.

The client should specify the desired reponse format using the `Accept:` header in the HTTP request. If unspecified, the reponse defaults to XML.

The HTTP request must include a `Content-Type:` header for POST, PUT and DELETE. The HTTP response will include a `Content-Type:` header, and the response body will be encoded in the requested format.

The possible values that you can specify for the Accept/Content-Type header are:

* `application/xml` for XML
* `application/json` for JSON

Clients can also append an extension of `.xml` or `.json` to the request URL instead of setting an `Accept:` header. The server will return a response in the appropriate format for that given extension.

#### HTTP Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-REST-API-Data-model.md#rest-api-data-model) containing the newly created, unfiltered object.


#### HTTP Status Codes
Client applications should use the HTTP status code to detect the result of an operation. Any error messages will be included in the response body (see below).

Possible reasons for varios HTTP status codes are as follows:

|code|description|
|----|-----------|
|OK (200)|Successful update|
|Bad request (400)| Incorrect value for object type or key. The server is unable to understand and process the request.|
|Authentication failure (401)| Incorrect password|
|Forbidden (403)| Query limit exceeded.|
|Too Many Request (429)| Query limit exceeded.|
|Not Found (404)|No results were found (on a search request), or object specified in URI does not exist.|
|Method not Allowed (405)| No results were found (on a search request), or object specified in URI does not exist.|
|Conflict (409)|Integrity constraint was violated (e.g. when creating, object already exists).|
|Unsupported Media Type (415)|Unsupported/missing value for Accept/Content-Type header.|
|Internal Server Error (500)|The server encountered an unexpected condition which precented it from fulfilling the request.|



#### Examples

* Example XML Request:

    curl -X POST -H 'Content-Type: application/xml' --data @form.txt 'https://rest.db.ripe.net/ripe/person?password=...'

* Example JSON Request:

    curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --data @form.txt 'https://rest.db.ripe.net/ripe/person?password=...'


* Example dry-run requests:

    curl -X POST --data @form.txt 'https://rest.db.ripe.net/ripe/person?dry-run&password=...'

    curl -X POST --data @form.txt 'https://rest.db.ripe.net/ripe/person?dry-run=true&password=...'




### PUT

Updates an existing object in the RIPE Database.

#### Locations

* `https://rest.db.ripe.net`
* `https://rest-test.db.ripe.net`

HTTPS is mandatory.

#### Method: PUT

#### URI Format: /{source}/{objectType}/{key}

#### Path Parameters
|name|description|
|----|-----------|
|source|RIPE or TEST (depending on location)|
|objectType|The object type|
|key|Requested object key|

#### Query Parameters
|name|description|
|----|-----------|
|password|Password for maintainer authentication (one or more values).|
|unformatted|Keep the formatting of the resource as provided in the request (spaces, end-of-lines).|
|dry-run|Optional. Perform validation but don't perform the update. |

#### HTTP Request Body
A [WhoisResource](../03.RIPE-Database-Structure/11-REST-API-Data-model.md#rest-api-data-model) containing the new version of the specified objects.

The client should specify the desired reponse format using the `Accept:` header in the HTTP request. If unspecified, the reponse defaults to XML.

The HTTP request must include a `Content-Type:` header for POST, PUT and DELETE. The HTTP response will include a `Content-Type:` header, and the response body will be encoded in the requested format.

The possible values that you can specify for the Accept/Content-Type header are:

* `application/xml` for XML
* `application/json` for JSON

Clients can also append an extension of `.xml` or `.json` to the request URL instead of setting an `Accept:` header. The server will return a response in the appropriate format for that given extension.

#### HTTP Response Body
A [WhoisResource](../03.RIPE-Database-Structure/11-REST-API-Data-model.md#rest-api-data-model) containing either the newly created, unfiltered object or the error message in case of a bad/unauthorized request.


#### HTTP Status Codes
Client applications should use the HTTP status code to detect the result of an operation. Any error messages will be included in the response body (see below).

Possible reasons for varios HTTP status codes are as follows:

|code|description|
|----|-----------|
|OK (200)|Successful update|
|Bad request (400)| Incorrect value for object type or key. The server is unable to understand and process the request.|
|Authentication failure (401)| Incorrect password|
|Forbidden (403)| Query limit exceeded.|
|Too Many Request (429)| Query limit exceeded.|
|Not Found (404)|No results were found (on a search request), or object specified in URI does not exist.|
|Method not Allowed (405)| No results were found (on a search request), or object specified in URI does not exist.|
|Conflict (409)|Integrity constraint was violated (e.g. when creating, object already exists).|
|Unsupported Media Type (415)|Unsupported/missing value for Accept/Content-Type header.|
|Internal Server Error (500)|The server encountered an unexpected condition which precented it from fulfilling the request.|



#### Error Response

If the request fails, any error messages will be returned in the response body, using the request Accept format (XML or JSON). This element will not be included on a successful response. Examples in [WhoisResource](../03.RIPE-Database-Structure/11-REST-API-Data-model.md#rest-api-data-model).



#### Examples

* Example XML Request:

    curl -X PUT -H 'Content-Type: application/xml' --data @form.txt 'https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...'

  
* Example JSON Request:

    curl -X PUT -H 'Content-Type: application/json' -H 'Accept:application/json' --data @form.txt 'https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...'


* Example of a bad XML request when updating a mntner object using as request the person object from the first example:

    curl -X PUT -H 'Content-Type: application/xml' --data @form.txt 'https://rest.db.ripe.net/ripe/mntner/PP1-RIPE?password=...'



* Example of a bad JSON request when updating a mntner object using as request the person object from the first example:

    curl -X PUT -H 'Content-Type: application/json'  -H 'Accept:application/json' --data @form.txt 'https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...'


* Example dry-run requests:

    curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run&password=...'

    curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run=true&password=...'





### DELETE

Deletes an object from the Database.

#### Locations

* `https://rest.db.ripe.net`
* `https://rest-test.db.ripe.net`

HTTPS is mandatory.

#### Method: DELETE

#### URI Format: /{source}/{objectType}/{key}?password={password}...&reason={reason}

#### Path Parameters

|name|description|
|----|-----------|
|source|RIPE or TEST (depending on location)|
|objectType|object type.|
|key|Requested RPSL Object primary key.|

### Query Parameters

|name|description|
|----|-----------|
|password|Password for maintainer authentication (one or more values). Mandatory.|
|reason|Reason for deleting given object. Optional.|
|dry-run|Optional. Perform validation but don't delete the object. |

#### HTTP Request Body

The client should specify the desired reponse format using the `Accept:` header in the HTTP request. If unspecified, the reponse defaults to XML.

The HTTP request must include a `Content-Type:` header for POST, PUT and DELETE. The HTTP response will include a `Content-Type:` header, and the response body will be encoded in the requested format.

The possible values that you can specify for the Accept/Content-Type header are:

* `application/xml` for XML
* `application/json` for JSON

Clients can also append an extension of `.xml` or `.json` to the request URL instead of setting an `Accept:` header. The server will return a response in the appropriate format for that given extension.

#### HTTP Response Body
A [WhoisResource](../03.RIPE-Database-Structure/11-REST-API-Data-model.md#rest-api-data-model) containing the (filtered) deleted object.


#### HTTP Status Codes
Client applications should use the HTTP status code to detect the result of an operation. Any error messages will be included in the response body (see below).

Possible reasons for varios HTTP status codes are as follows:

|code|description|
|----|-----------|
|OK (200)|Successful update|
|Bad request (400)| Incorrect value for object type or key. The server is unable to understand and process the request.|
|Authentication failure (401)| Incorrect password|
|Forbidden (403)| Query limit exceeded.|
|Too Many Request (429)| Query limit exceeded.|
|Not Found (404)|No results were found (on a search request), or object specified in URI does not exist.|
|Method not Allowed (405)| No results were found (on a search request), or object specified in URI does not exist.|
|Conflict (409)|Integrity constraint was violated (e.g. when creating, object already exists).|
|Unsupported Media Type (415)|Unsupported/missing value for Accept/Content-Type header.|
|Internal Server Error (500)|The server encountered an unexpected condition which precented it from fulfilling the request.|


### Examples

* Example Request:

    curl -X DELETE 'https://rest.db.ripe.net/ripe/person/pp1-ripe?password=123'

* Example dry-run requests:

    curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run&password=...'

    curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run=true&password=...'



## Request / Response Encoding

Please take into account the following points to avoid unexpected encoding behaviour:

* Objects are stored using the latin-1 (ISO-8859-1) character set.
* If the request character set is not latin-1, then the request body is converted to latin-1. A question mark character ('?' or 0x3F) is used as a substitution character, if the character is outside the latin-1 character set.
* The response should contain a warning, if conversion was necessary. [known issue #291](https://github.com/RIPE-NCC/whois/issues/291)
* Unrecognised encodings that cannot be converted to latin-1 will result in an unsuccessful operation.
* To be absolutely certain of what was stored in the database, do a follow-up query.
* The REST API response will be in UTF-8.
* We recommend to use UTF-8 character encoding in all REST API requests, but restrict the content to valid latin-1 characters.



 ## Update latency

It could take up to 10 seconds before an update becomes visible for lookup or search operations. For non-hierarchical object types (person, role, organisation,...), the typical latency is less than 1 second. For hierarchical objects types (inet(6)num, route(6), domain), it is about 3-5 seconds on average, up to 10 seconds maximum.

A way to work around this limitation is to rely on the response of the muting operation in REST API (PUT, POST, DELETE). These all return the object as it appears in the database in their response body after the successful update. This object is never filtered or altered in any way.

Any required passwords must also be supplied as part of the Uniform Resource identifier (URI) using the URI query parameter “password=”. One parameter should be used for each password supplied. The pseudo attribute “password:” cannot be used in the HTTP request body. See ["Email Updates"](04-Email-Updates.md#email-updates) for more information.


