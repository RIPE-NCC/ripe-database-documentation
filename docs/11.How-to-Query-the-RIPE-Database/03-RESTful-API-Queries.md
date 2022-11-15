# RESTful API Queries

Queries are supported by the RESTful API using the GET method. There are two ways of using the API. One way looks up a specific object and only returns a single object. The other searches for objects matching specified criteria. The search may return large numbers of objects.


## API Lookup

This can be done from the command line using a third party software package, from a script or in a browser. It will only return the one specific object requested. For lookups on address space, it will not return the encompassing object if the specified object does not exist.

Returns an object from the RIPE Database.


  curl 'https://rest.db.ripe.net/ripe/inetnum/193.0.0.0%20-%20193.0.7.255?unfiltered'


Any spaces in the command must be encoded. The response will be returned by default in XML format. Alternatively JSON can be returned:


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

A [WhoisResource](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources) containing the object, which is filtered by default.

### HTTP status Codes

Client applications should use the HTTP status code to detect the result of an operation. Any error messages will be included in the response body (see below).

Possible reasons for varios HTTP status codes are as follows:

|code|description|
|----|-----------|
|OK (200)|Successful update|
|Bad request (400)| Incorrect value for object type or key. The server is unable to understand and process the request.|
|Authentication failure (401)| Incorrect password|
|Forbidden (403)| <font color="red">Miguel notes: This error is due to not necessary permissions, why is "Query limit exceeded".</font> Query limit exceeded.|
|Not Found (404)|No results were found (on a seach request), or object specified in URI does not exist.|
|Method not Allowed (405)|<font color="red">Miguel notes: must be method not allowed, when you use a POST and that endpoint just accept GET for example.</font>No results were found (on a seach request), or object specified in URI does not exist.|
|Conflict (409)|Integrity constraint was violated (e.g. when creating, object already exists).|
|Unsupported Media Type (415)|Unsupported/missing value for Accept/Content-Type header.|
|Internal Server Error (500)|The server encountered an unexpected condition which precented it from fulfilling the request.|

### Examples

Example request:

  curl 'http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT'


Example XML response:

  <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <whois-resources service="lookup" xmlns:xlink="http://www.w3.org/1999/xlink">
      <objects>
          <object type="mntner">
              <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT"/>
              <source id="ripe"/>
              <primary-key>
                  <attribute name="mntner" value="RIPE-DBM-MNT"/>
              </primary-key>
              <attributes>
                  <attribute name="mntner" value="RIPE-DBM-MNT"/>
                  <attribute name="descr" value="Mntner for RIPE DBM objects."/>
                  <attribute name="admin-c" value="RD132-RIPE" referenced-type="role">
                      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/role/RD132-RIPE"/>
                  </attribute>
                  <attribute name="tech-c" value="RD132-RIPE" referenced-type="role">
                      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/role/RD132-RIPE"/>
                  </attribute>
                  <attribute name="org" value="ORG-NCC1-RIPE" referenced-type="organisation">
                      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/lookup/ripe/organisation/ORG-NCC1-RIPE"/>
                  </attribute>
                  <attribute name="auth" value="PGPKEY-1290F9D2" referenced-type="key-cert">
                      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/key-cert/PGPKEY-1290F9D2"/>
                  </attribute>
                  <attribute name="auth" value="MD5-PW" comment="Filtered"/>
                  <attribute name="mnt-by" value="RIPE-DBM-MNT" referenced-type="mntner">
                      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT"/>
                  </attribute>
                  <attribute name="source" value="RIPE" comment="Filtered"/>
              </attributes>
          </object>
      </objects>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example JSON request:

  curl -H 'Accept: application/json' 'http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT'


Example JSON response:

  {
    "objects": {
      "object": [
        {
          "type": "mntner",
          "link": {
            "xlink:type": "locator",
            "xlink:href": "http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT"
          },
          "source": {
            "id": "ripe"
          },
          "primary-key": {
            "attribute": [
              {
                "name": "mntner",
                "value": "RIPE-DBM-MNT"
              }
            ]
          },
          "attributes": {
            "attribute": [
              {
                "name": "mntner",
                "value": "RIPE-DBM-MNT"
              },
              {
                "name": "descr",
                "value": "Mntner for RIPE DBM objects."
              },
              {
                "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest.db.ripe.net/ripe/role/RD132-RIPE"
                },
                "name": "admin-c",
                "value": "RD132-RIPE",
                "referenced-type": "role"
              },
              {
                "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest.db.ripe.net/ripe/role/RD132-RIPE"
                },
                "name": "tech-c",
                "value": "RD132-RIPE",
                "referenced-type": "role"
              },
              {
                "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest.db.ripe.net/ripe/organisation/ORG-NCC1-RIPE"
                },
                "name": "organisation",
                "value": "ORG-NCC1-RIPE",
                "referenced-type": "organisation"
              },
              {
                "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest.db.ripe.net/ripe/key-cert/PGPKEY-1290F9D2"
                },
                "name": "auth",
                "value": "PGPKEY-1290F9D2",
                "referenced-type": "key-cert"
              },
              {
                "name": "auth",
                "value": "MD5-PW",
                "comment": "Filtered"
              },
              {
                "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest.db.ripe.net/ripe/mntner/OWNER-MNT"
                },
                "name": "mnt-by",
                "value": "RIPE-DBM-MNT",
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
    "terms-and-conditions": {
      "xlink:type": "locator",
      "xlink:href": "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }
  }


Example unfiltered request:


  curl 'http://rest-test.db.ripe.net/test/person/AA1-TEST?unfiltered'


Example unfiltered response:


  <?xml version="1.0" ?>
  <whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
      <objects>
          <object xmlns="" type="person">
              <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/person/AA1-TEST"></link>
              <source id="test"/>
              <primary-key>
                  <attribute name="nic-hdl" value="AA1-TEST"></attribute>
              </primary-key>
              <attributes>
                  <attribute name="person" value="Test Person"></attribute>
                  <attribute name="mnt-by" value="TEST-ROOT-MNT" referenced-type="mntner">
                      <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/mntner/TEST-ROOT-MNT"></link>
                  </attribute>
                  <attribute name="address" value="Somewhere in nowhere"></attribute>
                  <attribute name="phone" value="+12 34 5678900"></attribute>
                  <attribute name="fax-no" value="+12 34 5678900"></attribute>
                  <attribute name="e-mail" value="bitbucket@ripe.net"></attribute>
                  <attribute name="nic-hdl" value="AA1-TEST"></attribute>
                  <attribute name="remarks" value="This is an automatically created object."></attribute>
                  <attribute name="source" value="TEST"></attribute>
              </attributes>
              <tags></tags>
          </object>
      </objects>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example bad request when source is incorrect:


  curl 'http://rest.db.ripe.net/pez/person/PP1-RIPE'


Example response for bad request:


  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/pez/person/PP1-RIPE"/>
      <errormessages>
          <errormessage severity="Error" text="Invalid source '%s'">
              <args value="pez"/>
          </errormessage>
      </errormessages>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example request with encoded query parameter:


  curl 'http://rest.db.ripe.net/ripe/inetnum/193.0.0.0%20-%20193.0.7.255.json'



## API Search

This can be run in the same ways as the API Lookup. This search provides the same set of results as a web or command line query will provide.

Offers the well-known whois search via a rest-like interface.

[Documentation on the standard RIPE Database query flags](../13.Types-of-Queries/README.md#types-of-queries).

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

A [WhoisResource](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources) containing the query result.

### HTTP Status Codes
|code|description|
|----|-----------|
|200|Search successful|
|400|Illegal input - incorrect value in one or more of the parameters|
|404|No object(s) found|

Note that search response can be enormous. Hence, it is streamed on the server side, which means that if there is any error during processing your search, the HTTP response will still be 200. In this case, there will be the corresponding error messages inside the errormessages element in the response body (see [Whois Resources](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources)).


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


Example XML response:

  <?xml version='1.0' encoding='UTF-8'?>
  <whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
      <service name="search"/>
      <parameters>
          <inverse-lookup/>
          <type-filters/>
          <flags/>
          <query-strings>
              <query-string value="AS102"/>
          </query-strings>
          <sources>
              <source id="TEST"/>
          </sources>
      </parameters>
      <objects>
          <object type="aut-num">
              <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/aut-num/AS102"/>
              <source id="test"/>
              <primary-key>
                  <attribute name="aut-num" value="AS102"/>
              </primary-key>
              <attributes>
                  <attribute name="aut-num" value="AS102"/>
                  <attribute name="as-name" value="End-User-2"/>
                  <attribute name="descr" value="description"/>
                  <attribute name="admin-c" value="TP1-TEST" referenced-type="person">
                      <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/person/TP1-TEST"/>
                  </attribute>
                  <attribute name="tech-c" value="TP1-TEST" referenced-type="person">
                      <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/person/TP1-TEST"/>
                  </attribute>
                  <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                      <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/mntner/OWNER-MNT"/>
                  </attribute>
                  <attribute name="source" value="TEST"/>
              </attributes>
              <tags/>
          </object>
          <object type="person">
              <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/person/TP1-TEST"/>
              <source id="test"/>
              <primary-key>
                  <attribute name="nic-hdl" value="TP1-TEST"/>
              </primary-key>
              <attributes>
                  <attribute name="person" value="Test Person"/>
                  <attribute name="address" value="Singel 258"/>
                  <attribute name="phone" value="+31 6 12345678"/>
                  <attribute name="nic-hdl" value="TP1-TEST"/>
                  <attribute name="mnt-by" value="OWNER-MNT" referenced-type="mntner">
                      <link xlink:type="locator" xlink:href="http://rest-test.db.ripe.net/test/mntner/OWNER-MNT"/>
                  </attribute>
                  <attribute name="source" value="TEST" comment="Filtered"/>
              </attributes>
              <tags/>
          </object>
      </objects>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example JSON response:

  {"service": {
      "name": "search"
  },
  "parameters": {
      "inverse-lookup": {
          "inverse-attribute": []
      },
      "type-filters": {
          "type-filter": []
      },
      "flags": {
          "flag": []
      },
      "query-strings": {
          "query-string": [
              {
                  "value": "AS102"
              }
          ]
      },
      "sources": {
          "source": [
              {
                  "id": "TEST"
              }
          ]
      }
  }, "objects": {
      "object": [
          {
              "type": "aut-num",
              "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest-test.db.ripe.net/test/aut-num/AS102"
              },
              "source": {
                  "id": "test"
              },
              "primary-key": {
                  "attribute": [
                      {
                          "name": "aut-num",
                          "value": "AS102"
                      }
                  ]
              },
              "attributes": {
                  "attribute": [
                      {
                          "name": "aut-num",
                          "value": "AS102"
                      },
                      {
                          "name": "as-name",
                          "value": "End-User-2"
                      },
                      {
                          "name": "descr",
                          "value": "description"
                      },
                      {
                          "link": {
                              "xlink:type": "locator",
                              "xlink:href": "http://rest-test.db.ripe.net/test/person/TP1-TEST"
                          },
                          "name": "admin-c",
                          "value": "TP1-TEST",
                          "referenced-type": "person"
                      },
                      {
                          "link": {
                              "xlink:type": "locator",
                              "xlink:href": "http://rest-test.db.ripe.net/test/person/TP1-TEST"
                          },
                          "name": "tech-c",
                          "value": "TP1-TEST",
                          "referenced-type": "person"
                      },
                      {
                          "link": {
                              "xlink:type": "locator",
                              "xlink:href": "http://rest-test.db.ripe.net/test/mntner/OWNER-MNT"
                          },
                          "name": "mnt-by",
                          "value": "OWNER-MNT",
                          "referenced-type": "mntner"
                      },
                      {
                          "name": "source",
                          "value": "TEST"
                      }
                  ]
              },
              "tags": {
                  "tag": []
              }
          },
          {
              "type": "person",
              "link": {
                  "xlink:type": "locator",
                  "xlink:href": "http://rest-test.db.ripe.net/test/person/TP1-TEST"
              },
              "source": {
                  "id": "test"
              },
              "primary-key": {
                  "attribute": [
                      {
                          "name": "nic-hdl",
                          "value": "TP1-TEST"
                      }
                  ]
              },
              "attributes": {
                  "attribute": [
                      {
                          "name": "person",
                          "value": "Test Person"
                      },
                      {
                          "name": "address",
                          "value": "Singel 258"
                      },
                      {
                          "name": "phone",
                          "value": "+31 6 12345678"
                      },
                      {
                          "name": "nic-hdl",
                          "value": "TP1-TEST"
                      },
                      {
                          "link": {
                              "xlink:type": "locator",
                              "xlink:href": "http://rest-test.db.ripe.net/test/mntner/OWNER-MNT"
                          },
                          "name": "mnt-by",
                          "value": "OWNER-MNT",
                          "referenced-type": "mntner"
                      },
                      {
                          "name": "source",
                          "value": "TEST",
                          "comment": "Filtered"
                      }
                  ]
              },
              "tags": {
                  "tag": []
              }
          }
      ]
  }, 
  "terms-and-conditions": {
      "xlink:type": "locator",
      "xlink:href": "http://www.ripe.net/db/support/db-terms-conditions.pdf"
  }
  }


* A search request with invalid flag


  http://rest.db.ripe.net/search?source=ripe&query-string=PP1-RIPE&flags=k


Example XML response:


  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
      <link xlink:type="locator"
            xlink:href="http://rest.db.ripe.net/search?query-string=PP1-RIPE&amp;source=RIPE&amp;flags=k"/>
      <errormessages>
          <errormessage severity="Error" text="Invalid source '%s'">
              <args value="RIPE"/>
          </errormessage>
      </errormessages>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example JSON response:


  {
    "link" : {
      "type" : "locator",
      "href" : "http://rest.db.ripe.net/search?query-string=PP1-RIPE&source=RIPE&flags=k"
    },
    "errormessages" : {
      "errormessage" : [ {
        "severity" : "Error",
        "text" : "Invalid source '%s'",
        "args" : [ {
          "value" : "RIPE"
        } ]
      } ]
    },
    "terms-and-conditions" : {
      "type" : "locator",
      "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }
  }





## API Metadata


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

A [WhoisResource](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources) containing all available sources.

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

A [WhoisResource](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources) containing the template of the specified type.

#### HTTP Status Codes
|code |description                             |
|-----|----------------------------------------|
| 200 | Request successful|
| 400 | Illegal input - incorrect objectType|

#### Examples

Example querying for the template of PERSON:

  curl http://rest.db.ripe.net/metadata/templates/person.xml


Example XML response:

  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <template-resources xmlns:xlink="http://www.w3.org/1999/xlink">
  <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/metadata/templates/person"/>
  <service name="getObjectTemplate"/>
  <templates>
      <template type="person">
          <source id="ripe"/>
          <attributes>
              <attribute name="person" requirement="MANDATORY" cardinality="SINGLE" keys="LOOKUP_KEY"/>
              <attribute name="address" requirement="MANDATORY" cardinality="MULTIPLE" keys=""/>
              <attribute name="phone" requirement="MANDATORY" cardinality="MULTIPLE" keys=""/>
              <attribute name="fax-no" requirement="OPTIONAL" cardinality="MULTIPLE" keys=""/>
              <attribute name="e-mail" requirement="OPTIONAL" cardinality="MULTIPLE" keys="LOOKUP_KEY"/>
              <attribute name="org" requirement="OPTIONAL" cardinality="MULTIPLE" keys="INVERSE_KEY"/>
              <attribute name="nic-hdl" requirement="MANDATORY" cardinality="SINGLE" keys="PRIMARY_KEY LOOKUP_KEY"/>
              <attribute name="remarks" requirement="OPTIONAL" cardinality="MULTIPLE" keys=""/>
              <attribute name="notify" requirement="OPTIONAL" cardinality="MULTIPLE" keys="INVERSE_KEY"/>
              <attribute name="abuse-mailbox" requirement="OPTIONAL" cardinality="MULTIPLE" keys="INVERSE_KEY"/>
              <attribute name="mnt-by" requirement="MANDATORY" cardinality="MULTIPLE" keys="INVERSE_KEY"/>
              <attribute name="source" requirement="MANDATORY" cardinality="SINGLE" keys=""/>
          </attributes>
      </template>
  </templates>
  </template-resources>


Example JSON response:

  {
    "service": "getObjectTemplate",
    "link": {
      "xlink:type": "locator",
      "xlink:href": "http://rest.db.ripe.net/metadata/templates/peering-set"
    },
    "service" : {
      "name" : "getObjectTemplate"
    },
    "templates": {
      "template": [
        {
          "type": "peering-set",
          "source": {
            "id": "ripe"
          },
          "attributes": {
            "attribute": [
              {
                "name": "peering-set",
                "requirement": "MANDATORY",
                "cardinality": "SINGLE",
                "keys": ["PRIMARY_KEY","LOOKUP_KEY"]
              },
              {
                "name": "descr",
                "requirement": "MANDATORY",
                "cardinality": "MULTIPLE",
                "keys": []
              },
              {
                "name": "peering",
                "requirement": "OPTIONAL",
                "cardinality": "MULTIPLE",
                "keys": []
              },
              {
                "name": "mp-peering",
                "requirement": "OPTIONAL",
                "cardinality": "MULTIPLE",
                "keys": []
              },
              {
                "name": "remarks",
                "requirement": "OPTIONAL",
                "cardinality": "MULTIPLE",
                "keys": []
              },
              {
                "name": "org",
                "requirement": "OPTIONAL",
                "cardinality": "MULTIPLE",
                "keys": ["INVERSE_KEY"]
              },
              {
                "name": "tech-c",
                "requirement": "MANDATORY",
                "cardinality": "MULTIPLE",
                "keys": ["INVERSE_KEY"]
              },
              {
                "name": "admin-c",
                "requirement": "MANDATORY",
                "cardinality": "MULTIPLE",
                "keys": ["INVERSE_KEY"]
              },
              {
                "name": "notify",
                "requirement": "OPTIONAL",
                "cardinality": "MULTIPLE",
                "keys": ["INVERSE_KEY"]
              },
              {
                "name": "mnt-by",
                "requirement": "MANDATORY",
                "cardinality": "MULTIPLE",
                "keys": ["INVERSE_KEY"]
              },
              {
                "name": "mnt-lower",
                "requirement": "OPTIONAL",
                "cardinality": "MULTIPLE",
                "keys": ["INVERSE_KEY"]
              },
              {
                "name": "source",
                "requirement": "MANDATORY",
                "cardinality": "SINGLE",
                "keys": []
              }
            ]
          }
        }
      ]
    }
  }



## API Geolocation

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

A [WhoisResource](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources) containing locator URIs to matching objects.

For non-200 OK responses, the response body will be in plaintext.

### HTTP Status Codes
|code|description|
|----|-----------|
|200|Geolocation and/or language data was found for the specified address|
|404|No geolocation data found, or the address does not exist|


### Examples


  curl https://rest.db.ripe.net/geolocation?ipkey=10.0.0.0


Example XML response:

  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <whois-resources xmlns:xlink="http://www.w3.org/1999/xlink">
      <link xlink:type="locator" xlink:href="https://rest.db.ripe.net/geolocation?source=test&ipkey=10.0.0.0"/>
      <service name="geolocation-finder"/>
      <geolocation-attributes>
          <location value="52.375599 4.899902">
              <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/lookup/test/inetnum/10.0.0.0 - 10.255.255.255"/>
          </location>
          <language value="EN">
              <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/lookup/test/inetnum/10.0.0.0 - 10.255.255.255"/>
          </language>
      </geolocation-attributes>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example JSON response:

  {
    "link": {
      "xlink:type": "locator",
      "xlink:href": "https://rest.db.ripe.net/geolocation?source=test&ipkey=10.0.0.0"
    },
    "service" : {
      "name" : "geolocation-finder"
    },
    "geolocation-attributes": {
      "location": [
        {
          "value": "52.375599 4.899902",
          "link": {
            "xlink:type": "locator",
            "xlink:href": "https://rest.db.ripe.net/lookup/test/inetnum/10.0.0.0 - 10.255.255.255"
          }
        }
      ],
      "language": [
        {
          "value": "EN",
          "link": {
            "xlink:type": "locator",
            "xlink:href": "https://rest.db.ripe.net/lookup/test/inetnum/10.0.0.0 - 10.255.255.255"
          }
        }
      ]
    },
    "terms-and-conditions" : {
        "xlink:type" : "locator",
        "xlink:href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }
  }





## API Abuse Contact

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


Example XML response:

  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <abuse-resources xmlns:xlink="http://www.w3.org/1999/xlink" service="abuse-contact">
      <link xlink:type="locator" xlink:href="http://rest.db.ripe.net/abuse-contact/AS3333"/>
      <parameters>
          <primary-key value="AS3333"/>
      </parameters>
      <abuse-contacts key="AA1-RIPE" email="abuse@ripe.net"/>
      <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </abuse-resources>


Example JSON response:

  {
    "service" : "abuse-contact",
    "link" : {
      "type" : "locator",
      "href" : "http://rest.db.ripe.net/abuse-contact/AS3333"
    },
    "parameters" : {
      "primary-key" : {
        "value" : "AS3333"
      }
    },
    "abuse-contacts" : {
      "key": "AS1-RIPE",
      "email" : "abuse@ripe.net"
    },
    "terms-and-conditions" : {
      "type" : "locator",
      "href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }
  }




## API Versions

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

A [WhoisResource](../06.Update-Methods/01-RESTful-API.md#whois-rest-api-whoisresources) containing information about updates for the requested object or the error message in case of Bad request (see [GET](#api-lookup)).

#### Status Codes
|code|description|
|----|-----------|
|200|Success (object found)|
|400|Illegal input - incorrect key syntax|
|404|Object not found|

### Examples

Example Request:

  curl 'http://rest-test.db.ripe.net/TEST/aut-num/AS102/versions'


Example XML response:

  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <whois-resources>
  <versions type="aut-num" key="AS102">
      <source id="TEST"/>
      <version deleted="2013-06-27 13:22"/>
      <version>
          <revision>1</revision>
          <date>2013-06-27 13:22</date>
          <operation>ADD/UPD</operation>
      </version>
      <version>
          <revision>2</revision>
          <date>2013-06-27 13:22</date>
          <operation>ADD/UPD</operation>
      </version>
  </versions>
  <terms-and-conditions xlink:type="locator" xlink:href="http://www.ripe.net/db/support/db-terms-conditions.pdf"/>
  </whois-resources>


Example JSON response:

  {
    "versions": {
      "source": {
        "id": "TEST"
      },
      "type": "aut-num",
      "key": "AS102",
      "version": [
        {
          "deleted": null,
          "revision": 1,
          "date": "2013-06-27 13:22",
          "operation": "ADD/UPD"
        },
        {
          "deleted": null,
          "revision": 2,
          "date": "2013-06-27 13:22",
          "operation": "ADD/UPD"
        }
      ]
    },
    "terms-and-conditions" : {
      "xlink:type" : "locator",
      "xlink:href" : "http://www.ripe.net/db/support/db-terms-conditions.pdf"
    }
  }












