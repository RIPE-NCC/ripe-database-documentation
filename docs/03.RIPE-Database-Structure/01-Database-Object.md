# Database Objects

The RIPE Database contains records of:

* Allocations and assignments of IP address space (the IP address registry or INR);
* Reverse domain registrations;
* Routing policy information (the Internet Routing Registry or IRR);
* Contact information (details of people who are registered as contacts for the Internet resources used in the operation of networks or routers, and their organisations).

<font color="green">
The RIPE NCC maintains the Internet number resources in the database that are allocated or assigned by the RIPE NCC. These resource objects are tagged as “RIPE-REGISTRY-RESOURCE”. For other resource objects tagged as “RIPE-USER-RESOURCE”, the registered contacts (Registrants) and the holders of the referenced **mntner** objects maintain this data.
</font>

<font color="red">
Miguel Notes:= Here the text explain what a RPSL object is, I think that this must be instroduced in the rpsl space and not here. Therefore, I suggest not to include this

A database object is dened in RPSL as a list of attribute-value pairs in plain text form.Attributes can be mandatory, optional or generated. Mandatory attributes will always bepresent in an instance of an object. Optional attributes may be present if considerednecessary or useful by the creator of the object or if required by the business rules in thesoftware. Generated attributes can be included by the creator of the object, but theirvalues will always be checked and included, when necessary, by the database software.

The attributes are indexed in a number of ways to allow the queries to search thedatabase. An attribute can be a primary key, lookup key, inverse key, or a combination ofthese, or a part of one of these.

The characteristics of an attribute are determined by the type of object the attributeappears in. These are shown for each object in the object templates. They can be listedusing the query:

    whois –t <object-type>

There is also a detailed description available by querying:

    whois –v <object-type>
</font>


The records in the RIPE Database are known as ‘objects'. Routing Policy Specification Language (RPSL) defines the basic syntax of database objects. For further information see [RFC 2622](https://tools.ietf.org/html/rfc2622). But, over the years, practical operations have resulted in a number of deviations from the basic RPSL definition. Many extensions have also been made to the RIPE implementation of RPSL for the RIPE Database. Some features of RPSL were never implemented and others have been removed as requirements changed. For engineering-minded people, these database objects (records) should not be confused with the objects used in object-orientated programming languages that are used to write the software.

There are many types of objects in the database. These are described in the section: ['RPSL Object Types'](../04.RPSL-Object-Types/README.md#rpsl-object-types). Objects contain a piece of information relating to an Internet resource or a supporting or administrative function. Objects can reference other objects and these references must be followed to obtain the full description of an Internet resource. Inheritance is not used, which means that some references must be duplicated across large numbers of objects.