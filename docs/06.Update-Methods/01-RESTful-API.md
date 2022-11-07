# RIPE Database RESTful API

For mre information about the REST paradigm, see https://en.wikipedia.org/wiki/Representational_state_transfer.
If you used the old (beta) API, consider reading [migration guide for old API users](../17.Database-Support/07-Migration-guide.md#whois-rest-api-migration-guide)
All the services are accessible via HTTPS.
Use of the Whois REST API is governed by the RIPE Database [terms and conditions](../17.Terms-And-Conditions.md#ripe-database-terms-and-conditions)

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

A [WhoisResource](#whois-rest-api-whoisresources) containing the object to be created.


#### HTTP Response Body

A [WhoisResource](#whois-rest-api-whoisresources) containing the newly created, unfiltered object.


#### HTTP Status Codes
|code|description|
|----|-----------|
|200|Success (object created).|
|400|Bad request.|
|401|Incorrect password.|
|409|Object already exists in the database.|


#### Examples

* Example XML Request:

```
curl -X POST -H 'Content-Type: application/xml' --data @form.txt 'https://rest.db.ripe.net/ripe/person?password=...'
```

* Example XML request body (the content of the local file form.txt):

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<whois-resources>
    <objects>
        <object type="person">
            <source id="RIPE"/>
            <attributes>
                <attribute name="person" value="Pauleth Palthen"/>
                <attribute name="address" value="Singel 258"/>
                <attribute name="phone" value="+31-1234567890"/>
                <attribute name="e-mail" value="noreply@ripe.net"/>
                <attribute name="mnt-by" value="OWNER-MNT"/>
                <attribute name="nic-hdl" value="AUTO-1"/>
                <attribute name="source" value="RIPE"/>
            </attributes>
        </object>
    </objects>
</whois-resources>
```

* XML response body:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe"/>
    <objects>
        <object type="person">
            <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
            <source id="ripe"/>
            <primary-key>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
            </primary-key>
            <attributes>
                <attribute name="person" value="Pauleth Palthen"/>
                <attribute name="address" value="Singel 258"/>
                <attribute name="phone" value="+31-1234567890"/>
                <attribute name="e-mail" value="noreply@ripe.net"/>
                <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"/>
                </attribute>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
                <attribute name="remarks" value="remark"/>
                <attribute name="source" value="RIPE"/>
            </attributes>
        </object>
    </objects>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

* Example JSON Request:

```
curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' --data @form.txt 'https://rest.db.ripe.net/ripe/person?password=...'
```

* JSON request body:

```json
{
  "objects": {
    "object": [
      {
        "source": {
          "id": "RIPE"
        },
        "attributes": {
          "attribute": [
            {
              "name": "person",
              "value": "Pauleth Palthen"
            },
            {
              "name": "address",
              "value": "Singel 258"
            },
            {
              "name": "phone",
              "value": "+31-1234567890"
            },
            {
              "name": "mnt-by",
              "value": "OWNER-MNT"
            },
            {
              "name": "nic-hdl",
              "value": "AUTO-1"
            },
            {
              "name": "remarks",
              "value": "remark"
            },
            {
              "name": "source",
              "value": "RIPE"
            }
          ]
        }
      }
    ]
  }
}
```

* JSON Response Body:

```json
{
    "link": {
        "xlink:type": "locator",
        "xlink:href": "http://rest.db.ripe.net/ripe"
    },
    "objects": {
        "object": [
            {
                "type": "person",
                "link": {
                    "xlink:type": "locator",
                    "xlink:href": "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
                },
                "source": {
                    "id": "ripe"
                },
                "primary-key": {
                    "attribute": [
                        {
                            "name": "nic-hdl",
                            "value": "PP1-RIPE"
                        }
                    ]
                },
                "attributes": {
                    "attribute": [
                        {
                            "name": "person",
                            "value": "Pauleth Palthen"
                        },
                        {
                            "name": "address",
                            "value": "Singel 258"
                        },
                        {
                            "name": "phone",
                            "value": "+31-1234567890"
                        },
                        {
                            "name": "e-mail",
                            "value": "noreply@ripe.net"
                        },
                        {
                            "link": {
                                "xlink:type": "locator",
                                "xlink:href": "http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"
                            },
                            "name": "mnt-by",
                            "value": "OWNER-MNT",
                            "referenced-type": "mntner"
                        },
                        {
                            "name": "nic-hdl",
                            "value": "PP1-RIPE"
                        },
                        {
                            "name": "remarks",
                            "value": "remark"
                        },
                        {
                            "name": "source",
                            "value": "RIPE"
                        }
                    ]
                }
            }
        ]
    }, 
    "terms-and-conditions": {
         "xlink:type": "locator",
         "xlink:href": "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }  
}
```

* Example request body with error in source and in admin-c attribute:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources>
<objects>
    <object type="person">
        <source id="INVALID_SOURCE"/>
        <attributes>
            <attribute name="person" value="Pauleth Palthen"/>
            <attribute name="address" value="Singel 258"/>
            <attribute name="phone" value="+31-1234567890"/>
            <attribute name="e-mail" value="noreply@ripe.net"/>
            <attribute name="admin-c" value="INVALID"/>
            <attribute name="mnt-by" value="OWNER-MNT"/>
            <attribute name="nic-hdl" value="PP1-RIPE"/>
            <attribute name="source" value="INVALID_SOURCE"/>
        </attributes>
    </object>
</objects>
</whois-resources>
```

* Example XML response with error in source and in admin-c attribute:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
<link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person"/>
<objects>
    <object type="person">
        <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/invalid_source/person/PP1-RIPE"/>
        <source id="invalid_source"/>
        <primary-key>
            <attribute name="nic-hdl" value="PP1-RIPE"/>
        </primary-key>
        <attributes>
            <attribute name="person" value="Pauleth Palthen"/>
            <attribute name="address" value="Singel 258"/>
            <attribute name="phone" value="+31-1234567890"/>
            <attribute name="e-mail" value="noreply@ripe.net"/>
            <attribute name="admin-c" value="INVALID"/>
            <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/invalid_source/mntner/OWNER-MNT"/>
            </attribute>
            <attribute name="nic-hdl" value="PP1-RIPE"/>
            <attribute name="source" value="INVALID_SOURCE"/>
        </attributes>
    </object>
</objects>
<errormessages>
    <errormessage severity="Error" text="Unrecognized source: %s">
        <args value="INVALID_SOURCE"/>
    </errormessage>
    <errormessage severity="Error" text="&quot;%s&quot; is not valid for this object type">
        <attribute name="admin-c" value="INVALID"/>
        <args value="admin-c"/>
    </errormessage>
</errormessages>
<terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

* Example JSON response with error in source and in admin-c attribute:

```json
{
  "link" : {
    "type" : "locator",
    "href" : "http://rest.db.ripe.net/ripe/person"
  },
  "objects" : {
    "object" : [ {
      "type" : "person",
      "link" : {
        "type" : "locator",
        "href" : "http://rest.db.ripe.net/invalid_source/person/PP1-RIPE"
      },
      "source" : {
        "id" : "invalid_source"
      },
      "primary-key" : {
        "attribute" : [ {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        } ]
      },
      "attributes" : {
        "attribute" : [ {
          "name" : "person",
          "value" : "Pauleth Palthen"
        }, {
          "name" : "address",
          "value" : "Singel 258"
        }, {
          "name" : "phone",
          "value" : "+31-1234567890"
        }, {
          "name" : "e-mail",
          "value" : "noreply@ripe.net"
        }, {
          "name" : "admin-c",
          "value" : "INVALID"
        }, {
          "link" : {
            "type" : "locator",
            "href" : "http://rest.db.ripe.net/invalid_source/mntner/OWNER-MNT"
          },
          "name" : "mnt-by",
          "value" : "OWNER-MNT",
          "referenced-type" : "mntner"
        }, {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        }, {
          "name" : "source",
          "value" : "INVALID_SOURCE"
        } ]
      }
    } ]
  },
  "errormessages" : {
    "errormessage" : [ {
      "severity" : "Error",
      "text" : "Unrecognized source: %s",
      "args" : [ {
        "value" : "INVALID_SOURCE"
      } ]
    }, {
      "severity" : "Error",
      "attribute" : {
        "name" : "admin-c",
        "value" : "INVALID"
      },
      "text" : "\"%s\" is not valid for this object type",
      "args" : [ {
        "value" : "admin-c"
      } ]
    } ]
  },
  "terms-and-conditions" : {
    "type" : "locator",
    "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
}
```
* Example dry-run requests:

```
curl -X POST --data @form.txt 'https://rest.db.ripe.net/ripe/person?dry-run&password=...'

curl -X POST --data @form.txt 'https://rest.db.ripe.net/ripe/person?dry-run=true&password=...'
```



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
A [WhoisResource](#whois-rest-api-whoisresources) containing the new version of the specified objects.

The client should specify the desired reponse format using the `Accept:` header in the HTTP request. If unspecified, the reponse defaults to XML.

The HTTP request must include a `Content-Type:` header for POST, PUT and DELETE. The HTTP response will include a `Content-Type:` header, and the response body will be encoded in the requested format.

The possible values that you can specify for the Accept/Content-Type header are:

* `application/xml` for XML
* `application/json` for JSON

Clients can also append an extension of `.xml` or `.json` to the request URL instead of setting an `Accept:` header. The server will return a response in the appropriate format for that given extension.

#### HTTP Response Body
A [WhoisResource](#whois-rest-api-whoisresources) containing either the newly created, unfiltered object or the error message in case of a bad/unauthorized request.


#### Request / Response Encoding

Please take into account the following points to avoid unexpected encoding behaviour:

* Objects are stored using the latin-1 (ISO-8859-1) character set.
* If the request character set is not latin-1, then the request body is converted to latin-1. A question mark character ('?' or 0x3F) is used as a substitution character, if the character is outside the latin-1 character set.
* The response should contain a warning, if conversion was necessary. [known issue #291](https://github.com/RIPE-NCC/whois/issues/291)
* Unrecognised encodings that cannot be converted to latin-1 will result in an unsuccessful operation.
* To be absolutely certain of what was stored in the database, do a follow-up query.
* The REST API response will be in UTF-8.
* We recommend to use UTF-8 character encoding in all REST API requests, but restrict the content to valid latin-1 characters.

#### HTTP Status Codes
Client applications should use the HTTP status code to detect the result of an operation. Any error messages will be included in the response body (see below).

Possible reasons for varios HTTP status codes are as follows:

|code|description|
|----|-----------|
|OK (200)|Successful update|
|Bad request (400)| Incorrect value for object type or key. The server is unable to undestand and process the request.|
|Authentication failure (401)| Incorrect password|
|Forbidden (403)| <font color="red">Miguel notes: This error is due to not necessary permissions, why is "Query limit exceeded".</font> Query limit exceeded.|
|Not Found (404)|No results were found (on a seach request), or object specified in URI does not exist.|
|Method not Allowed (405)|<font color="red">Miguel notes: must be method not allowed, when you use a POST and that endpoint just accept GET for example.</font>No results were found (on a seach request), or object specified in URI does not exist.|
|Conflict (409)|Integrity constraint was violated (e.g. when creating, object already exists).|
|Unsupported Media Type (415)|Unsupported/missing value for Accept/Content-Type header.|
|Internal Server Error (500)|The server encountered an unexpected condition which precented it from fulfilling the request.|


#### Error Response

If the request fails, any error messages will be returned in the response body, using the request Accept format (XML or JSON). This element will not be included on a successful response.



#### Examples

Example XML Request:
```
curl -X PUT -H 'Content-Type: application/xml' --data @form.txt 'https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...'
```

Example XML request:
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<whois-resources>
    <objects>
        <object type="person">
            <source id="ripe"/>
            <attributes>
                <attribute name="person" value="Pauleth Palthen"/>
                <attribute name="address" value="Singel 123"/>
                <attribute name="phone" value="+31-0987654321"/>
                <attribute name="e-mail" value="ppalse@ripe.net"/>
                <attribute name="mnt-by" value="OWNER-MNT" />
                <attribute name="nic-hdl" value="PP1-RIPE" />
                <attribute name="source" value="RIPE"/>
            </attributes>
        </object>
    </objects>
</whois-resources>
```

Example XML response:
```xml
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
    <objects>
        <object type="person">
            <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
            <source id="ripe"/>
            <primary-key>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
            </primary-key>
            <attributes>
                <attribute name="person" value="Pauleth Palthen"/>
                <attribute name="address" value="Singel 123"/>
                <attribute name="phone" value="+31-0987654321"/>
                <attribute name="e-mail" value="ppalse@ripe.net"/>
                <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"/>
                </attribute>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
                <attribute name="source" value="RIPE"/>
            </attributes>
        </object>
    </objects>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>    
```

Example JSON Request:
```
curl -X PUT -H 'Content-Type: application/json' -H 'Accept:application/json' --data @form.txt 'https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...'
```

Example of a JSON request body:

```json
{
  "objects": {
    "object": [
      {
        "source": {
          "id": "ripe"
        },
        "attributes": {
          "attribute": [
            {
              "name": "person",
              "value": "Pauleth Palthen"
            },
            {
              "name": "address",
              "value": "Singel 258"
            },
            {
              "name": "phone",
              "value": "+31-0987654321"
            },
            {
              "name": "e-mail",
              "value": "ppalse@ripe.net"
            },
            {
              "name": "nic-hdl",
              "value": "PP1-RIPE"
            },
            {
              "name": "mnt-by",
              "value": "OWNER-MNT"
            },
            {
              "name": "source",
              "value": "RIPE"
            }
          ]
        }
      }
    ]
  }
}
```

Example of a JSON success response:

```json
{
  "objects": {
    "object": [
      {
        "type": "person",
        "link": {
          "xlink:type": "locator",
          "xlink:href": "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
        },
        "source": {
          "id": "ripe"
        },
        "primary-key": {
          "attribute": [
            {
              "name": "nic-hdl",
              "value": "PP1-RIPE"
            }
          ]
        },
        "attributes": {
          "attribute": [
            {
              "name": "person",
              "value": "Pauleth Palthen"
            },
            {
              "name": "address",
              "value": "Singel 258"
            },
            {
              "name": "phone",
              "value": "+31-0987654321"
            },
            {
              "name": "e-mail",
              "value": "ppalse@ripe.net"
            },
            {
              "name": "nic-hdl",
              "value": "PP1-RIPE"
            },
            {
              "link": {
                "xlink:type": "locator",
                "xlink:href": "http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"
              },
              "name": "mnt-by",
              "value": "OWNER-MNT",
              "referenced-type": "mntner"
            },
            {
              "name": "source",
              "value": "RIPE",
              "comment": "Filtered"
            }
          ]
        }
      }
    ]
  },
    "terms-and-conditions" : {
        "xlink:type" : "locator",
        "xlink:href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }
}
```

Example of a bad XML request when updating a mntner object using as request the person object from the first example:

```
curl -X PUT -H 'Content-Type: application/xml' --data @form.txt 'https://rest.db.ripe.net/ripe/mntner/PP1-RIPE?password=...'
```

Example XML error response:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/PP1-RIPE"/>
    <errormessages>
        <errormessage severity="Error"
                      text="Object type and key specified in URI (%s: %s) do not match the WhoisResources contents">
            <args value="mntner"/>
            <args value="PP1-RIPE"/>
        </errormessage>
    </errormessages>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

Example of a bad JSON request when updating a mntner object using as request the person object from the first example:

```
curl -X PUT -H 'Content-Type: application/json'  -H 'Accept:application/json' --data @form.txt 'https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...'
```

Example JSON error response:

```json
{
  "link" : {
    "type" : "locator",
    "href" : "http://rest.db.ripe.net/ripe/mntner/PP1-RIPE"
  },
  "errormessages" : {
    "errormessage" : [ {
      "severity" : "Error",
      "text" : "Object type and key specified in URI (%s: %s) do not match the WhoisResources contents",
      "args" : [ {
        "value" : "mntner"
      }, {
        "value" : "PP1-RIPE"
      } ]
    } ]
  },
  "terms-and-conditions" : {
    "type" : "locator",
    "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
}
```
* Example dry-run requests:

```
curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run&password=...'

curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run=true&password=...'
```






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

Must be empty.

#### HTTP Response Body
A [WhoisResource](#whois-rest-api-whoisresources) containing the (filtered) deleted object.


#### HTTP Status Codes
|code|description|
|----|-----------|
|200|Successful delete.|
|400|Bad request - invalid syntax for object type or key.|
|401|Incorrect password.|
|404|Object not found.|

### Examples

* Example Request:
```
curl -X DELETE 'https://rest.db.ripe.net/ripe/person/pp1-ripe?password=123'
```

* Example XML Response for successful delete:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
    <objects>
        <object type="person">
            <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
            <source id="test"/>
            <primary-key>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
            </primary-key>
            <attributes>
                <attribute name="person" value="Pauleth Palthen"/>
                <attribute name="address" value="Singel 258"/>
                <attribute name="phone" value="+31-1234567890"/>
                <attribute name="e-mail" value="noreply@ripe.net"/>
                <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"/>
                </attribute>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
                <attribute name="remarks" value="remark"/>
                <attribute name="source" value="TEST"/>
            </attributes>
        </object>
    </objects>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

* Example JSON Response for successful delete:

```json
{
  "link" : {
    "type" : "locator",
    "href" : "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
  },
  "objects" : {
    "object" : [ {
      "type" : "person",
      "link" : {
        "type" : "locator",
        "href" : "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
      },
      "source" : {
        "id" : "test"
      },
      "primary-key" : {
        "attribute" : [ {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        } ]
      },
      "attributes" : {
        "attribute" : [ {
          "name" : "person",
          "value" : "Pauleth Palthen"
        }, {
          "name" : "address",
          "value" : "Singel 258"
        }, {
          "name" : "phone",
          "value" : "+31-1234567890"
        }, {
          "name" : "e-mail",
          "value" : "noreply@ripe.net"
        }, {
          "link" : {
            "type" : "locator",
            "href" : "http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"
          },
          "name" : "mnt-by",
          "value" : "OWNER-MNT",
          "referenced-type" : "mntner"
        }, {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        }, {
          "name" : "remarks",
          "value" : "remark"
        }, {
          "name" : "source",
          "value" : "TEST"
        } ]
      }
    } ]
  },
  "terms-and-conditions" : {
    "type" : "locator",
    "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
}
```

* Example XML Response for bad request when trying to delete an object that is referenced by other objects:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
    <objects>
        <object type="person">
            <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
            <source id="ripe"/>
            <primary-key>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
            </primary-key>
            <attributes>
                <attribute name="person" value="Test Person"/>
                <attribute name="address" value="Singel 258"/>
                <attribute name="phone" value="+31 6 12345678"/>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
                <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"/>
                </attribute>
                <attribute name="source" value="RIPE"/>
            </attributes>
        </object>
    </objects>
    <errormessages>
        <errormessage severity="Error" text="Object [%s] %s is referenced from other objects">
            <args value="person"/>
            <args value="PP1-RIPE"/>
        </errormessage>
    </errormessages>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

* Example JSON Response for bad request when trying to delete an object that is referenced by other objects:

```json
{
  "link" : {
    "type" : "locator",
    "href" : "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
  },
  "objects" : {
    "object" : [ {
      "type" : "person",
      "link" : {
        "type" : "locator",
        "href" : "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
      },
      "source" : {
        "id" : "ripe"
      },
      "primary-key" : {
        "attribute" : [ {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        } ]
      },
      "attributes" : {
        "attribute" : [ {
          "name" : "person",
          "value" : "Test Person"
        }, {
          "name" : "address",
          "value" : "Singel 258"
        }, {
          "name" : "phone",
          "value" : "+31 6 12345678"
        }, {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        }, {
          "link" : {
            "type" : "locator",
            "href" : "http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"
          },
          "name" : "mnt-by",
          "value" : "OWNER-MNT",
          "referenced-type" : "mntner"
        }, {
          "name" : "source",
          "value" : "RIPE"
        } ]
      }
    } ]
  },
  "errormessages" : {
    "errormessage" : [ {
      "severity" : "Error",
      "text" : "Object [%s] %s is referenced from other objects",
      "args" : [ {
        "value" : "person"
      }, {
        "value" : "PP1-RIPE"
      } ]
    } ]
  },
  "terms-and-conditions" : {
    "type" : "locator",
    "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
}
```

* Example XML Response for incorrect password

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/person/PP1-RIPE"/>
    <objects>
        <object type="person">
            <link xlink:type="locator" xlink:href="rest.db.ripe.net/ripe/person/PP1-RIPE"/>
            <source id="ripe"/>
            <primary-key>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
            </primary-key>
            <attributes>
                <attribute name="person" value="Pauleth Palthen"/>
                <attribute name="address" value="Singel 258"/>
                <attribute name="phone" value="+31-1234567890"/>
                <attribute name="e-mail" value="noreply@ripe.net"/>
                <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                    <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"/>
                </attribute>
                <attribute name="nic-hdl" value="PP1-RIPE"/>
                <attribute name="remarks" value="remark"/>
                <attribute name="source" value="RIPE"/>
            </attributes>
        </object>
    </objects>
    <errormessages>
        <errormessage severity="Error"
                      text="Authorisation for [%s] %s failed&#xA;using &quot;%s:&quot;&#xA;not authenticated by: %s">
            <args value="person"/>
            <args value="PP1-RIPE"/>
            <args value="mnt-by"/>
            <args value="OWNER-MNT"/>
        </errormessage>
    </errormessages>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

* Example JSON Response for incorrect password

```json
{
  "link" : {
    "type" : "locator",
    "href" : "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
  },
  "objects" : {
    "object" : [ {
      "type" : "person",
      "link" : {
        "type" : "locator",
        "href" : "http://rest.db.ripe.net/ripe/person/PP1-RIPE"
      },
      "source" : {
        "id" : "ripe"
      },
      "primary-key" : {
        "attribute" : [ {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        } ]
      },
      "attributes" : {
        "attribute" : [ {
          "name" : "person",
          "value" : "Pauleth Palthen"
        }, {
          "name" : "address",
          "value" : "Singel 258"
        }, {
          "name" : "phone",
          "value" : "+31-1234567890"
        }, {
          "name" : "e-mail",
          "value" : "noreply@ripe.net"
        }, {
          "link" : {
            "type" : "locator",
            "href" : "http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"
          },
          "name" : "mnt-by",
          "value" : "OWNER-MNT",
          "referenced-type" : "mntner"
        }, {
          "name" : "nic-hdl",
          "value" : "PP1-RIPE"
        }, {
          "name" : "remarks",
          "value" : "remark"
        }, {
          "name" : "source",
          "value" : "RIPE"
        } ]
      }
    } ]
  },
  "errormessages" : {
    "errormessage" : [ {
      "severity" : "Error",
      "text" : "Authorisation for [%s] %s failed\nusing \"%s:\"\nnot authenticated by: %s",
      "args" : [ {
        "value" : "person"
      }, {
        "value" : "PP1-RIPE"
      }, {
        "value" : "mnt-by"
      }, {
        "value" : "OWNER-MNT"
      } ]
    } ]
  },
  "terms-and-conditions" : {
    "type" : "locator",
    "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
}
```
* Example dry-run requests:

```
curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run&password=...'

curl -X PUT --data @form.txt 'https://rest.db.ripe.net/ripe/person/TP1-RIPE?dry-run=true&password=...'
```



## WHOIS REST API WhoisResources

### Description

The RIPE Database REST API uses a uniform format for transferring structured data.

#### XML structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<whois-resources>
    <link xlink:type="..." xlink:href="..."/>
    <parameters>...</parameters>
    <objects>
        <object>...</object>
        <object>...</object>
        <!--...more "object" elements...-->
    </objects>
    <sources>
        <source name="..." id="...">...</source>
        <source name="..." id="...">...</source>
        <!--...more "source" elements...-->
    </sources>
    <errormessages>
        <errormessage severity="..." text="…">...</errormessage>
        <!--...more "errormessage" elements...-->
    </errormessages>
    <grs-sources>
        <source name="..." id="..." grs-id="..."/>
        <source name="..." id="..." grs-id="..."> <!--...--> </source>
        <!--...more "source" elements...-->
    </grs-sources>
    <geolocation-attributes>...</geolocation-attributes>
    <versions>...</versions>
    <errormessages>...</errormessages>
    <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

#### JSON structure
```json
{
    "link": {
        "type": "...",
        "href": "..."
    },
    "parameters": { },
    "objects": {
        "object": [
            { },
            { }
        ]
    },
    "sources": {
        "source": [
            { },
            { }
        ]
    },
    "errormessages" : {
        "errormessage" : [ 
            { },
            { } 
        ]
    },
    "grs-sources": {
        "source": [
            { },
            { }
        ]
    },
    "geolocation-attributes": { },
    "versions": { },
    "errormessages": {},
    "terms-and-conditions": {
         "xlink:type": "locator",
         "xlink:href": "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    },
}
```

### Elements

* [link](#link)
* [parameters](#parameters)
* [objects](#objects) 
* [object](#object) 
* [tags](#tags)
* [geolocation-attributes](#geolocation)
* [sources](#sources) 
* [errorMessages](#errorMessages) 
* [versions](#versions) 
* [errormessages](#errormessages)

***



* <a id="link">**Link**</a>: pointer to the resource. 
 * The XLink format is used for the links (ref: http://en.wikipedia.org/wiki/XLink).
```xml
<link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/person/TP1-TEST"/>
```
```json
"link": {
    "xlink:type": "locator",
    "xlink:href": "http://rest-test.db.ripe.net/test/person/TP1-TEST"
}
```

***

* <a id="parameters">**Parameters**</a>: part of a search response, indicating which query flags were used.
 * Inverse-lookup: wraps a set of _inverse-attribute_
 * Inverse-attribute: _value_ of an inverse query flag
 * Type-filters: wraps a set of _type-filter_
 * Type-filter: _id_ = the RPSL object type to limit the search to
 * Flags: wraps a set of _flag_
 * Flag: the _value_ of a query flag
 * Query-strings: wraps a set of _query-string_
 * Query-string: the _value_ of the query string
 * Sources: wraps a set of _source_
 * Source: _id_ of RIPE database source
```xml
<parameters>
    <inverse-lookup/>
    <type-filters/>
    <flags>
        <flag value="r"/>
        ...
    </flags>
    <query-strings>
        <query-string value="LP1-TEST"/>
    </query-strings>
    <sources>
        <source id="TEST"/>
    </sources>
</parameters>
```
```json
"parameters": {
    "inverse-lookup": {"inverse-attribute": []},
    "type-filters": {"type-filter": []},
    "flags": {
        "flag": [{"value": "r"}, ...]
    },
    "query-strings": {
        "query-string": [{"value": "LP1-TEST"}]
    },
    "sources": {
        "source": [{"id": "TEST"}]
    }
}
```

***

* <a id="objects">**Objects**</a>: a set of (RPSL-) _object_ representations.
 * Type: the RPSL object type
 * Link: see above
 * Source: indication of which RIPE source object is registered in
 * Primary-key: searchable key in the RIPE database
 * Attributes: set of _attribute_ describing the RPSL object
 * Attribute: 
      * can be divided by mandatory:
          * name, value
      * and non-mandatory:
          * link (see Link), referenced-type: used to describe pointer to resource where _referenced-type_ is the RIPE object type.
  * comment
```xml
<objects>
    <object>...</object>
    ...
</objects>
```
```json
"objects": {
    "object": [ ... ]
}
```

***

* <a id="object">**Object**</a>: representation of a RPSL object. Contained within [Objects](#objects).
```xml
<object type="person">
    <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/person/LP1-TEST"/>
    <source id="test"/>
    <primary-key>
        <attribute name="nic-hdl" value="LP1-TEST"/>
    </primary-key>
    <attributes>
        <attribute .../>
        ...
    </attributes>
    <tags/>
</object>
```
```json
"object": [
    {"type": "person",
     "link": {
                "xlink:type": "locator",
                "xlink:href": "http://rest-test.db.ripe.net/test/person/LP1-TEST"
            },
     "source": {"id": "test"},
     "primary-key": { "attribute": [{ "name": "nic-hdl", "value": "LP1-TEST" }] },
     "attributes": { "attribute": [ ... ] },
     "tags": { "tag": [] }
   }
]
```

***

* <a id="tags">**Tags**</a>: set of _tag_
 * Tag: extra data about a particular object in the RIPE database. Consists of _id_ - the name of the tag, and _data_

```xml
<tags>
    <tag id="..." data="..."/>
    ...
</tags>
```
```json
"tags": {
    "tag": [ {"id": "...", "data": "..."}, ...]
}
```

***

* <a id="geolocation">**Geolocation-attributes**</a>: extra information for inetnum / inet6num RPSL objects.
 * Location: a link (see Link) to the inet(6)num and a longitude latitude value
 * Language: a link (see Link) to the inet(6)num and an ISO 639-1 language code

```xml
<geolocation-attributes>
    <location value="52.375599 4.899902">
        <link xlink:type="locator" xlink:href="..."/>
    </location>
</geolocation-attributes>
```
```json
"geolocation-attributes": {
    "location": [{"value": "52.375599 4.899902", "link": {"xlink:type": "locator", "xlink:href": "..."}}]
}
```

***

* <a id="sources">**Sources**</a>: a set of available _source_ for the RIPE database
 * Source: _name_, _id_
 * Valid values: RIPE, TEST

```xml
<sources>
    <source name="RIPE" id="ripe"/>
    <source name="TEST" id="test"/>
</sources>
```
```json
"sources" : {
    "source" : [ {"name" : "RIPE", "id" : "ripe"}, {"name" : "TEST","id" : "test"} ]
}
```

***

* <a id="grs-sources">**Grs-sources**</a>: a set of available _grs-source_ for the RIPE database
 * Source: _name_, _id_ and _grs-id_
 * Valid Values: AFRINIC-GRS, APNIC-GRS, ARIN-GRS, JPIRR-GRS, LACNIC-GRS, RADB-GRS
```xml
<grs-sources>
    <source name="APNIC-GRS" id="apnic-grs" grs-id="apnic-grs"/>
</grs-sources>
```
```json
"grs-sources" : {
    "source" : [ {"name" : "APNIC-GRS", "id" : "apnic-grs", "grs-id" : "apnic-grs"} ]
}
```

***

* <a id="versions">**Versions**</a>: enumeration of the changes of a particular object. Will only be in the [versions](Whois-Rest-api-versions) response payload. Consists of _type_ (see Type), _key_ (see Primary key) and _version_.
 * Version: information about a particular version of the object. It can either be _deleted_, in which case there's only a date, or show information about the revision.

```xml
<versions type="aut-num" key="...">
    <version>
        <revision>1</revision>
        <date>2013-08-27 11:23</date>
        <operation>ADD/UPD</operation>
    </version>
</versions>
```

```json
"versions" : {
    "type" : "aut-num",
    "key" : "...",
    "version" : [ {
        "deleted" : null,
        "revision" : 1,
        "date" : "2013-08-27 11:26",
        "operation" : "ADD/UPD"
    } ]
}
```

***

* <a id="errormessages">Error messages</a>: A set of _errormessage_ containing information about the performed operation. A message concerns the operation, an object of the operation, or an attribute of an object. It has a severity (Error, Warning, Info), a text description and a set of arguments supplied to the operation.

```xml
<errormessages>
    <errormessage severity="..." text="...">
       <args value="..."/>
       <!--...more "args" elements...-->
    </errormessage>
    <!--...more "errormessage" elements...-->
</errormessages>
```

```json
 "errormessages" : {
     "errormessage" : [ {
         "severity" : "...",
         "text" : "...",
         "args" : [ ]
        } ]
  }
```

Example XML error response:
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
<link xlink:type="locator" xlink:href="http://rest.db.ripe.net/invalid/person/TP1-RIPE"/>
<errormessages>
    <errormessage severity="Error" text="Invalid source '%s'">
        <args value="invalid"/>
    </errormessage>
</errormessages>
<terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
</whois-resources>
```

Example JSON error response:
```json
{
  "link" : {
    "type" : "locator",
    "href" : "http://rest.db.ripe.net/invalid/person/TP1-RIPE"
  },
  "errormessages" : {
    "errormessage" : [ {
      "severity" : "Error",
      "text" : "Invalid source '%s'",
      "args" : [ {
        "value" : "invalid"
      } ]
    } ]
  },
  "terms-and-conditions" : {
    "type" : "locator",
    "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
}
```

### Data Types

* Inverse Attribute
 * One of: abuse-c, abuse-mailbox, admin-c, auth, author, ds-rdata, fingerprint, form, ifaddr, irt-nfy, local-as, mbrs-by-ref, member-of, mnt-by, mnt-domains, mnt-irt, mnt-lower, mnt-nfy, mnt-ref, mnt-routes, notify, nserver, org, origin, person, ping-hdl, ref-nfy, tech-c, upd-to, zone-c.
* Object Type
 * One of: as-block, as-set, aut-num, domain, filter-set, inet6num, inetnum, inet-rtr, irt, key-cert, mntner, organisation, peering-set, person, poem, poetic-form, role, route, route6, route-set, rtr-set.
* Severity
 * One of: Error, Warning, Info.
* Source
 * One of: RIPE, TEST, or a GRS source (AFRINIC-GRS, APNIC-GRS, ARIN-GRS, JPIRR-GRS, LACNIC-GRS, RADB-GRS, RIPE-GRS).



 ## Update latency

It could take up to 10 seconds before an update becomes visible for lookup or search operations. For non-hierarchical object types (person, role, organisation,...), the typical latency is less than 1 second. For hierarchical objects types (inet(6)num, route(6), domain), it is about 3-5 seconds on average, up to 10 seconds maximum.

A way to work around this limitation is to rely on the response of the muting operation in REST API (PUT, POST, DELETE). These all return the object as it appears in the database in their response body after the successful update. This object is never filtered or altered in any way.


