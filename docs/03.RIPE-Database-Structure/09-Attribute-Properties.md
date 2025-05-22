---
permalink: /RIPE-Database-Structure/Attribute-Properties
---

# Attribute Properties

Attributes can be used in different ways in different objects. Currently, there are three properties that apply to all attributes:

* Presence
* Repeat
* Indexed

The allowed attributes for any object type are shown in the object templates (see the section ['RPSL Object Types'](../RPSL-Object-Types/#rpsl-object-types)).


## Presence

Not all allowed attributes need to be present in every instance of the object type. The table below shows how presence is defined for an attribute. The same attribute name may have a different presence defined in different object types. For example "status:" is mandatory in an **inetnum** object, but generated in an **aut-num** object.

**Types of 'presence' of an Attribute**

| Type | Description |
| --- | --- |
| [mandatory] | You must include at least one instance of this attribute in all objects of this type. |
| [optional] | This attribute is optional in the objects of this type and you can leave it out. If you choose to include this attribute then the value must also be included. |
| [required] | The syntax rules define this attribute as optional. However, additional business rules require this attribute under some circumstances. |
| [generated] | These attributes are generated if you leave them out. If you include the attribute and provide the value, it may be replaced by a value determined by the software. |


## Repeat

Attributes can have single or multiple values. Note that it is the value that matters more than the attribute here. An attribute can only take a comma-separated list of values if it is defined as multiple.

For an attribute defined as single in an object template, there can only be one instance of this attribute in an object of that type and it can only have a single value (even if this attribute is defined as being able to have a list of values).

For an attribute defined as multiple in an object template, there can be many instances of this attribute in an object of that type. If any of these attributes can have a list of values then it is allowed for multiple attributes.

There is no limit on the number of times a multiple attribute can be added to an object. But there is an overall limit on the size of an object.


| Type | Description |
| --- | --- |
| [single] | Objects can only contain one instance of this 'attribute-value' pair. |
| [multiple] | Objects may contain more than one instance of this attribute. For some attributes, an instance may contain a list of values, separated by commas. |


## Indexed

Many attribute values are indexed within the database. This is necessary to provide fast, efficient lookups of data. All objects' primary keys are indexed. These and any other indexed value may be used to do standard lookups or reverse lookups.

A standard lookup is where you look for an object that contains the specified value. Where this value can be found in an object depends on the index tables built with that attribute value.

An inverse lookup is where you look for objects that contain the specified value in the list of specified attribute types. (See more about indexed searches in the section on Querying the RIPE Database.)

    whois -i mnt-by,mnt-lower,mnt-routes: AARDVARK-MNT

Indexes are built internally within the database. This property does not affect nor put any restrictions on the data entered by a user.

**Table 3.5 Types of 'indexes' of an Attribute**

| Type | Description |
| --- | --- |
| [lookup key] | This attribute is indexed. |
| [inverse key] | This attribute is in the "reverse" index. |
| [primary key] | This attribute is (part of) the primary key for this object type. |
