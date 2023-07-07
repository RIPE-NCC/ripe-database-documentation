---
permalink: /Database-Support/Migration-guide
---

# WHOIS REST API Migration Guide

## Introduction

This guide is intended to assist Application Developers to migrate from the old beta REST API.

Generally, it is not good to change an API once it is fully in production. But the API was released as a beta service and this is the first full review since the original development. The new version will be a stable, full production service, based on experience from the beta service and feedback from users.

As there are some changes, the new implementation will be deployed and running in parallel to the old one, to allow time to verify your software against the new release. **The old service is now deprecated and will be dropped in a future release.** 

The old (beta) REST API service remains available at: `http://apps.db.ripe.net/whois/`

The new service is accessible at:

* `http(s)://rest.db.ripe.net/` is the base URL for the live database for both queries and updates
* `http(s)://rest-test.db.ripe.net/` is the base URL for TEST DB for both queries and updates

## Changes

* The CRUD commands `create`, `lookup`, `update`, and `delete` always operate on the `RIPE` or `TEST` source, so they require a source parameter on the URI. For example:

| Operation | HTTP Method | Example URL                                                    |
|-----------|-------------|:---------------------------------------------------------------|
| Create    | POST        | https://rest.db.ripe.net/ripe?password=...                     |
| Lookup    | GET         | http://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT               |
| Update    | PUT         | https://rest.db.ripe.net/ripe/mntner/RIPE-DBM-MNT?password=... |  
| Delete    | DELETE      | https://rest.db.ripe.net/ripe/person/PP1-RIPE?password=...     |

* CRUD services (create, update, delete) are only available with https:// - using http:// will result in a 404 error code


    https://rest.db.ripe.net/
    https://rest-test.db.ripe.net/


* `/modify` has been dropped, use `update` only

* The search service `/search` defaults to `RIPE` or `TEST` source. For example:


    http://rest.db.ripe.net/search?query-string=aardvark-mnt


* `/grs-search` and `/grs-lookup` have been dropped; use `/search` and GET `/` instead, for example:


    http://rest.db.ripe.net/arin-grs/aardvark-mnt
    http://rest.db.ripe.net/search?source=APNIC-GRS&query-string=aardvark-mnt


* `/search` supports filtering by tags, for example


    http://rest.db.ripe.net/search?source=ripe&query-string=193.0.0.0/21&include-tag=RIPE-USER-RESOURCE
    http://rest.db.ripe.net/search?source=ripe&query-string=193.0.0.0/21&exclude-tag=RIPE-TEST


* long query option flags are supported in `/search`, for example:


    http://rest.db.ripe.net/search?source=ripe&query-string=aardvark-mnt&flags=no-filtering


* any unknown URL will return a `404` error code (previously, the response was a `301` redirect to `www.ripe.net`), for example:


    http://rest.db.ripe.net/unknown


* JSON is handled in both response and request
    * A JSON response from a lookup can then be modified and used in an update or modify operation.

* The `whois-resources` root element is no longer included in the JSON response. The new format is:


        {
        "objects": {
            "object": [
            { ...
            } ]
        }
        }


* The non-standard MIME types `text/xml` and `text/json` are no longer supported. Use `application/xml` or `application/json`.

* The xlink element `<whois-resources .../><link xlink:type="locator" xlink:href=... />` has been dropped in lookup response. 

* The abuse-finder service has been replaced by abuse-contact (which implements policy RIPE-563). Refer to the new documentation [here.](../How-to-Query-the-RIPE-Database/RESTful-API-Queries/#rest-api-abuse-contact)

## Testing

Please use `http://rest-test.db.ripe.net/` for testing. This server uses the TEST database, and is functionally identical to production. The TEST database is reset nightly.

## Client Implementation Tests

Use the following examples for testing your client implementation. (These tests are intended to be run sequentially.)

### Create

* Create a new object  
    * Use the an example request on [WHOIS-REST-API-create](../Update-Methods/RESTful-API/#post) 
    * Change the _source_ attribute to TEST
    * Change the _mntner_ attribute to TEST-DBM-MNT
    * POST HTTP method
    * Request URL: https://rest-test.db.ripe.net/test?password=emptypassword
    * Request header: "Content-Type: application/xml" for an XML response
    * Request header: "Content-Type: application/json" for a JSON response
    * Expect a 200 response status code and the full object as payload.

### Update

* Update an existing object
    * Remove the _remarks_ attributes from your object, or add some if there aren't any
    * PUT HTTP method
    * Request URL: https://rest-test.db.ripe.net/TEST/person/NIC-HDL?password=emptypassword
    * Request header: "Content-Type: application/xml" for an XML response
    * Request header: "Content-Type: application/json" for a JSON response
    * Expect a 200 response status code.
    * More information [here](../Update-Methods/RESTful-API/#put)

### Read

* View an existing object
    * Request URL https://rest-test.db.ripe.net/TEST/person/NIC-HDL. See [documentation](../How-to-Query-the-RIPE-Database/RESTful-API-Queries/#rest-api-lookup) for more information.
    * GET HTTP method
    * Request header: "Content-Type: application/xml" for an XML response
    * Request header: "Content-Type: application/json" for a JSON response
    * Expect a 200 response status code and the full object as payload.

### Search

* Search for an object
    * Request URL https://rest-test.db.ripe.net/search?query-string=NIC-HDL&source=test
    * GET HTTP method
    * Request header: "Content-Type: application/xml" for an XML response
    * Request header: "Content-Type: application/json" for a JSON response
    * Expect a 200 response status code and the full object as payload
    * More example searches [here](../How-to-Query-the-RIPE-Database/RESTful-API-Queries/#rest-api-search)

### Versions
* See when an object was created/updated
    * Use URL https://rest-test.db.ripe.net/TEST/person/NIC-HDL/versions
    * GET HTTP method
    * Request header: "Content-Type: application/xml" for an XML response
    * Request header: "Content-Type: application/json" for a JSON response
    * Expect a 200 response status code and the payload as described [here](../How-to-Query-the-RIPE-Database/RESTful-API-Queries/#rest-api-versions).

### Version 
* View a particular version of an object
    * Request URL https://rest-test.db.ripe.net/TEST/person/NIC-HDL/versions/1
    * GET HTTP method
    * Request header: "Content-Type: application/xml" for an XML response
    * Request header: "Content-Type: application/json" for a JSON response
    * Expect a 200 response status code and the full object as payload.
    * More information [here](../How-to-Query-the-RIPE-Database/RESTful-API-Queries/#rest-api-version)  

### Delete

* Delete an object
    * Request URL https://rest-test.db.ripe.net/TEST/person/NIC-HDL?password=emptypassword
    * DELETE HTTP method
    * Expect a 204 response status code
    * More information [here](../Update-Methods/RESTful-API/#delete)

