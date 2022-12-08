# RESTful API Queries

Queries are supported by the RESTful API using the GET method. There are two ways of using the API. One way looks up a specific object and only returns a single object. The other searches for objects matching specified criteria. The search may return large numbers of objects.


## REST API Lookup

This can be done from the command line using a third party software package, from a script or in a browser. It will only return the one specific object requested. For lookups on address space, it will not return the encompassing object if the specified object does not exist.

Returns an object from the RIPE Database.


  curl 'https://rest.db.ripe.net/ripe/inetnum/193.0.0.0%20-%20193.0.7.255?unfiltered'


Any spaces in the command must be encoded. The response will be returned by default in XML format. Alternatively JSON or text/plain can be returned:


  curl -H 'Accept: application/json'


Additional resources:

* [Version list](#api-versions)
* [Version lookup](#api-versions)

***

### Environments
* `http://rest.db.ripe.net`
* `https://rest.db.ripe.net`
* `http://rest-test.db.ripe.net`
* `https://rest-test.db.ripe.net`

### Method: GET

### URI Format: /{source}/{objectType}/{key}

### Path Parameters
|name|description|
|----|-----------|
|source|Source name (RIPE, TEST or a GRS source name).|
|objectType|Type of given object.|
|key|Primary key of the given object.|

### Query Parameters**
|name|description|
|----|-----------|
|unfiltered|The returned object should not be filtered ("notify" and "e-mail" attributes will not be removed).|
|unformatted|Return the resource in its original formatting (including spaces, end-of-lines).|

### HTTP Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-Data-Model.md#whoisresources) containing the object, which is filtered by default.

### HTTP status Codes

Client applications should use the HTTP status code to detect the result of an operation. Any error messages will be included in the response body (see below).

Possible reasons for varios HTTP status codes are as follows:

|code|description|
|----|-----------|
|OK (200)|Successful update|
|Bad request (400)| Incorrect value for object type or key. The server is unable to understand and process the request.|
|Authentication failure (401)| Incorrect password|
|Forbidden (403)| <font color="red">Miguel notes: This error is due to not necessary permissions, why is "Query limit exceeded".</font> Query limit exceeded.|
|Not Found (404)|No results were found (on a search request), or object specified in URI does not exist.|
|Method not Allowed (405)|<font color="red">Miguel notes: must be method not allowed, when you use a POST and that endpoint just accept GET for example.</font>No results were found (on a search request), or object specified in URI does not exist.|
|Conflict (409)|Integrity constraint was violated (e.g. when creating, object already exists).|
|Unsupported Media Type (415)|Unsupported/missing value for Accept/Content-Type header.|
|Internal Server Error (500)|The server encountered an unexpected condition which precented it from fulfilling the request.|

### Examples

Example request:

  curl 'http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT'


Example JSON request:

  curl -H 'Accept: application/json' 'http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT'

Example text/plain request:

  curl -H 'Accept: text/plain' 'http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT'

Example 

Example unfiltered request:


  curl 'http://rest-test.db.ripe.net/test/person/AA1-TEST?unfiltered'


Example bad request when source is incorrect:


  curl 'http://rest.db.ripe.net/pez/person/PP1-RIPE'


Example request with encoded query parameter:


  curl 'http://rest.db.ripe.net/ripe/inetnum/193.0.0.0%20-%20193.0.7.255.json'



## REST API Search

This can be run in the same ways as the REST API Lookup. This search provides the same set of results as a web or command line query will provide.

Offers the well-known whois search via a rest-like interface.

[Documentation on the standard RIPE Database query flags](../13.Types-of-Queries/README.md#types-of-queries).

As with the lookup, any spaces in the command must be encoded. The response will be returned in XML format by default. Alternatively, JSON or text/plain can be returned.

### Locations

* `http://rest.db.ripe.net/search`
* `https://rest.db.ripe.net/search`
* `http://rest-test.db.ripe.net/search`
* `https://rest-test.db.ripe.net/search`

### HTTP Method: GET

### URI Format: /search?source={source}&query-string={query-string}...

### URI Path Parameters

None.

### URI Query Parameters
|name|description            |
|:---------------------|:-----------------------|
| `source`               | Optional, default is RIPE for `http://rest.db.ripe.net`. Can specify RIPE or GRS source names. It's possible to specify multiple sources (one source per parameter). Use `http://rest-test.db.ripe.net` to search the TEST datasource.|
| `query-string`         | The search term. Mandatory.|
| `inverse-attribute`    | Optional. If specified the query is an inverse lookup on the given attribute, if not specified the query is a direct lookup search.|
| `include-tag`          | Optional. Only show RPSL objects with given tags. Can be multiple.|
| `exclude-tag`          | Optional. Only show RPSL objects that do not have given tags. Can be multiple.|
| `type-filter`          | Optional. If specified the results will be filtered by object-type, multiple type-filters can be specified.|
| `flags`                | Optional query-flags. Use separate flags parameters for each option (see examples)|
|`unformatted`           | Don't reformat RPSL objects, preserve all spaces, tabs and newlines in attribute values. |
|`managed-attributes`    | Flag which RPSL attributes are managed by the RIPE NCC. |
|`resource-holder`       | Include the resource holder Organisation (id and name). |
|`abuse-contact`         | Include the Abuse contact email address of the resource, if applicable. |
|`limit`                 | Maximum number of RPSL objects to return in the response. |
|`offset`                | Return RPSL objects from a specified offset. This allows for paging. |

### HTTP Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-Data-Model.md#whoisresources) containing the query result.

### HTTP Status Codes
|code|description|
|----|-----------|
|200|Search successful|
|400|Illegal input - incorrect value in one or more of the parameters|
|404|No object(s) found|

Note that search response can be enormous. Hence, it is streamed on the server side, which means that if there is any error during processing your search, the HTTP response will still be 200. In this case, there will be the corresponding error messages inside the errormessages element in the response body (see [Whois Resources](../03.RIPE-Database-Structure/11-Data-Model.md#whoisresources)).


### Examples

* Valid inverse lookup query on an org value, filtering by inetnum:

  http://rest.db.ripe.net/search?inverse-attribute=org&type-filter=inetnum&source=ripe&query-string=ORG-RIEN1-RIPE

* Search for objects of type organisation on the same query-string and specifying a preference for non recursion:

  http://rest.db.ripe.net/search?inverse-attribute=org&flags=no-referenced&type-filter=inetnum&source=ripe&query-string=ORG-RIEN1-RIPE

* A search on multiple sources:

  http://rest.db.ripe.net/search?source=ripe&source=apnic-grs&flags=no-referenced&flags=no-irt&query-string=MAINT-APNIC-AP

* A search on multiple sources and multiple type-filters:

  http://rest.db.ripe.net/search?source=ripe&source=apnic-grs&query-string=google&type-filter=person&type-filter=organisation

* A search using multiple flags:

  http://rest.db.ripe.net/search?source=ripe&query-string=aardvark-mnt&flags=no-filtering&flags=no-referenced


* A search request with invalid flag


  http://rest.db.ripe.net/search?source=ripe&query-string=PP1-RIPE&flags=k



## REST API Metadata


### Metadata (list sources)

List available sources.

#### Locations

* `http://rest.db.ripe.net/metadata/sources`
* `https://rest.db.ripe.net/metadata/sources`
* `http://rest-test.db.ripe.net/metadata/sources`
* `https://rest-test.db.ripe.net/metadata/sources`

#### HTTP Method: GET

#### URI Format: /metadata/sources

#### URI Path Parameters

None.

#### HTTP Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-Data-Model.md#whoisresources) containing all available sources.

#### HTTP Status Codes

|code|description|
|----|-----------|
|200|Request successful|

#### Examples


  http://rest.db.ripe.net/metadata/sources.json


Example XML response:

  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
  <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/metadata/sources"/>
  <service name="getSupportedDataSources"/>
  <sources>
      <source name="RIPE" id="ripe"/>
      <source name="TEST" id="test"/>
  </sources>
  <grs-sources>
      <source name="TEST-GRS" id="test-grs" grs-id="test-grs"/>
  </grs-sources>
  </whois-resources>


Example JSON response:

  {
    "link": {
      "xlink:type": "locator",
      "xlink:href": "http://rest.db.ripe.net/metadata/sources"
    }, 
    "service" : {
      "name" : "getSupportedDataSources"
    },
    "sources": {
      "source": [
        {
          "name": "RIPE",
          "id": "ripe"
        },
        {
          "name": "TEST",
          "id": "test"
        }
      ]
    },
    "grs-sources": {
      "source": [
        {
          "name": "TEST-GRS",
          "id": "test-grs",
          "grs-id": "test-grs"
        }
      ]
    }
  }


***


### Metadata (Object Template)

Returns the RPSL template for given object type.

#### Resources

* `http://rest.db.ripe.net/metadata/templates`
* `https://rest.db.ripe.net/metadata/templates`
* `http://rest-test.db.ripe.net/metadata/templates`
* `https://rest-test.db.ripe.net/metadata/templates`

#### HTTP Method: GET

#### URI Format: /metadata/templates/{objectType}

#### URI Path Parameters

|name       |description                                         |type|default|
|-----------|----------------------------------------------------|----|-------|
|objectType |The object type for which the template is requested |

#### HTTP Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-Data-Model.md#whoisresources) containing the template of the specified type.

#### HTTP Status Codes
|code |description                             |
|-----|----------------------------------------|
| 200 | Request successful|
| 400 | Illegal input - incorrect objectType|

#### Examples

Example querying for the template of PERSON:

  curl http://rest.db.ripe.net/metadata/templates/person.xml




## REST API Geolocation

Lookup geolocation and language attributes for a particular IPv4 or IPv6 address.

Returns geolocation information for the specified address.

For further background information on the Geolocation feature, refer to the RIPE Labs article here: https://labs.ripe.net/Members/denis/geolocation-prototype-for-ripe-database

### Locations

* `http://rest.db.ripe.net/geolocation`
* `https://rest.db.ripe.net/geolocation`
* `http://rest-test.db.ripe.net/geolocation`
* `https://rest-test.db.ripe.net/geolocation`

### HTTP Method: GET

### URI Format: /geolocation?ipkey={key}

### URI Path Parameters

None.

### URI Query Parameters
|name|description|
|----|-----------|
|key|IPv4 or IPv6 address|
	
### HTTP Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-Data-Model.md#whoisresources) containing locator URIs to matching objects.

For non-200 OK responses, the response body will be in plaintext.

### HTTP Status Codes
|code|description|
|----|-----------|
|200|Geolocation and/or language data was found for the specified address|
|404|No geolocation data found, or the address does not exist|


### Examples


  curl https://rest.db.ripe.net/geolocation?ipkey=10.0.0.0






## REST API Abuse Contact

Lookup abuse contact email for an internet resource (IPv4 address, range or prefix, IPv6 address or prefix, AS number).

### Locations

* `http://rest.db.ripe.net/abuse-contact`
* `https://rest.db.ripe.net/abuse-contact`
* `http://rest-test.db.ripe.net/abuse-contact`
* `https://rest-test.db.ripe.net/abuse-contact`

### HTTP Method: GET

### URI Format: /abuse-contact/{resource}

### URI Path Parameters

|name|description|
|----|-----------|
|resource|IPv4 address, range or prefix, IPv6 address or prefix, AS number|

### URI Query Parameters

None.
	
### HTTP Response Body

An [AbuseResources](#api-abuse-contact) containing locator URIs to matching objects.

### HTTP Status Codes
|code|description|
|----|-----------|
|200|Matching resource found and abuse contact returned correctly|
|404|Resource specified was not found|


### Examples


  curl http://rest-test.db.ripe.net/abuse-contact/AS3333




## REST API Versions

Lists all versions of RIPE Database object, including the date and operation for each version.

### Resources

* `http://rest.db.ripe.net`
* `https://rest.db.ripe.net`
* `http://rest-test.db.ripe.net`
* `https://rest-test.db.ripe.net`

### Method: GET

### URI Format: /{source}/{objecttype}/{key}/versions

### URI Parameters
|name|description|
|----|-----------|
|key|Requested RPSL Object primary key|
	
### Response Body

A [WhoisResource](../03.RIPE-Database-Structure/11-Data-Model.md#template-resources) containing information about updates for the requested object or the error message in case of Bad request (see [GET](#api-lookup)).

#### Status Codes
|code|description|
|----|-----------|
|200|Success (object found)|
|400|Illegal input - incorrect key syntax|
|404|Object not found|

### Examples

Example Request:

  curl 'http://rest-test.db.ripe.net/TEST/aut-num/AS102/versions'













