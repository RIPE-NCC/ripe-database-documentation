# RIPE Database RESTful API

For mre information about the REST paradigm, see https://en.wikipedia.org/wiki/Representational_state_transfer.
If you used the old (beta) API, consider reading [migration guide for old API users]()
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

A [WhoisResource]() containing the object to be created.


#### HTTP Response Body

A [WhoisResource]() containing the newly created, unfiltered object.


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
A [WhoisResource](WHOIS-REST-API-WhoisResources) containing the new version of the specified objects.

For more details on how an object is composed, please refer to the RIPE Database Update Reference Manual in the Database document library: http://www.ripe.net/data-tools/support/documentation

#### HTTP Response Body
A [WhoisResource](WHOIS-REST-API-WhoisResources) containing either the newly created, unfiltered object or the error message in case of a bad/unauthorized request.


#### HTTP Status Codes
|code|description|
|----|-----------|
|200|Successful update|
|400|Bad request - incorrect value for object type or key|
|401|Incorrect password|
|404|Object not found|

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
A [WhoisResource](WHOIS-REST-API-WhoisResources) containing the (filtered) deleted object.


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
