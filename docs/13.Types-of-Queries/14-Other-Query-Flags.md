# Other Query Flags

* [The “-T” (“--select-types”) Query Flag](#the--t---select-types-query-flag)
* [The “-K” (“--primary-keys”) Query Flag](#the--k---primary-keys-query-flag)
* [The “-t” (“--template”) Query Flag](#the--t---template-query-flag)
* [The “-v” (“--verbose”) Query Flag](#the--v---verbose-query-flag)
* [The “-q” Query Flag](#the--q-query-flag)
* [The “-a” (“--all-sources”) Query Flag](#the--a---all-sources-query-flag)
* [The “-s” (“--sources”) Query Flag](#the--s---sources-query-flag)
* [The “-S“ (“--resources" Query Flag)](#the--s---resources-query-flag)
* [The “-F” (“--brief”) Query Flag](#the--f---brief-query-flag)
* [The “--valid-syntax” and “--no-valid-syntax” Query Flags](#the---valid-syntax-and---no-valid-syntax-query-flags)
* [The “-c” (“--irt”) Query Flag](#the--c---irt-query-flag)
* [The “-C” (“--no-irt”) Query Flag](#the--c---no-irt-query-flag)


## The “-T” (“--select-types”) Query Flag

This query flag restricts the type of the objects returned to those specified. The query flag argument is a comma-separated list of object types. A space after “T” is optional but the list cannot contain any spaces.

## The “-K” (“--primary-keys”) Query Flag

The “-K” (“--primary-keys”) query flag returns only the primary keys of each object in the query response.

There are some exceptions to this:

* With **set** objects, the "members:" attributes will also be returned.
* With **route** and **route6** objects both the prefix and the “origin:” attribute are returned as these jointly provide the primary key.
* No information is returned for **person**, **role** or **organisation** objects.

## The “-t” (“--template”) Query Flag

The “-t” (“--template”) query flag returns a template of the specified object type as shown for each object in the section [RPSL Object Types](../04.RPSL-Object-Types/README.md#rpsl-object-types).

## The “-v” (“--verbose”) Query Flag

The “-v” (“--verbose”) query flag returns a verbose description of the specified object type as shown for each object in the section [RPSL Object Types](../04.RPSL-Object-Types/README.md#rpsl-object-types).

## The “-q” Query Flag

The RIPE Database server supports the retrieval of certain information about itself and the data sets served, using a “-q” query flag.

The “-q” query flag requests the server to reply with information about the system setup. It does not return any information extracted from any of the databases that it serves. This query flag takes a single argument, which has three possible values:

* **Version** (usage: -q version). This will display version information for the server software
* **Types** (usage: -q types). This will list all the object types recognised by the RIPE Database
* **Sources** (usage: -q sources). This will list all available sources. That is, the local RIPE Database and all the mirrored databases

## The “-a” (“--all-sources”) Query Flag

The “-a” (“--all-sources”) query flag requests that the server searches all the sources available to it and the response will include any output found from any of the available sources. These are the sources listed by using the “–q sources” query.

## The “-s” (“--sources”) Query Flag

The “-s” (“--sources”) query flag requests that the server searches all the sources specified and the response will include any output found from any of these sources. The available sources are the sources listed by using the “–q sources” query. The argument to this flag can be a comma-separated list of sources. They will be queried in the order specified by the user. Search other **mirrored** databases, not only the RIPE Database.


## The “-S” (“--resources) Query Flag

The “-S” (“--resources”) query flag search in other **mirrored** databases, such as: RIPE-GRS or ARIN-GRS, not only the RIPE Database.
    For example:
        whois -S ARIN-GRS 193.201.1.1


## The “-F” (“--brief”) Query Flag

The “-F” (“--brief”) query flag changes the format of the returned objects. The attribute names are represented in a short hand notation. For example, "person:" becomes "*pn:". Using the –F query flag includes the non-recursive action of the –r query flag

##  The “--valid-syntax” and “--no-valid-syntax” Query Flags

Over time, the syntax of database objects changes. The existing data is not always updated when these changes occur. Therefore, there are many objects in the RIPE Database with invalid syntax according to current rules. These query flags filter the objects in the query response. Either those objects with valid syntax, or those without valid syntax, will be returned in the response depending on the choice of flag.


## The “-c” (“--irt”) Query Flag

The “-c” (“--irt”) query flag can only be used with queries for address space objects. The appropriate address space object for this query is returned in the query response. The query software then searches up the address space hierarchy (moving through the less specific objects) until an address space object is found that references an **irt** object, and then the referenced **irt** object is included in the query response. The default behaviour is **not** to return any referenced irt object.

## The “-C” (“--no-irt”) Query Flag

The “-C” (“--no-irt”) query flag turns off the behaviour given with the “-c” query flag. Related irt objects are **not** returned by default.