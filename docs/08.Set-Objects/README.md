# Set Objects

Throughout this section we have used the **as-set** object as an example. The same rules apply to all the different set object types.

## Creating Set Objects

The set name can be hierarchical. The hierarchy consists of a series of other as-set names separated by colons (`:`). Anything to the left of a colon is considered a parent, anything to the right is considered a child. At each stage, the whole of the hierarchy, including the colons, is considered as a single string that forms an object name. The set hierarchy can optionally start with an AS number reference as the top-level parent.

Existing as-set names can be short (i.e. with a name only, e.g. AS-TEST) or hierarchical (i.e. with a name and AS number reference(s), e.g. AS3333:AS-TEST). It is now mandatory to use hierarchical names to create an **as-set** object, so that the creation is authenticated by the AS number holder. This restriction does not apply to the other set types.

AS-LIST1:AS-CUST

AS3333:AS-RIPE:AS-APNIC

are both valid AS-SET names

In each case, the whole string is the name of the as-set. So "AS-LIST1:AS-CUST" is a set name, including the colon `:`. But also "AS-LIST1" is a set name and this set is the parent of the set "AS-LIST1:AS-CUST".

In the second case, "AS3333:AS-RIPE:AS-APNIC" is a set and it is the child of the set "AS3333:AS-RIPE". The 'parent' of this set is AS3333, which is an **aut-num** object and not a set.

For each new (child) set object in a hierarchy, the immediate parent object must exist at the time of creating the new child set object. This is everything to the left of the last colon in the new child set object name, taken as a single (hierarchical) object name. Only one level of parent is checked. If any of the higher levels of parent objects have been deleted, it will not affect the creation of the new child object. The parent is only needed for authorisation.

Therefore, if we were to create a new set "AS3333:AS-RIPE:AS-APNIC:AS-CUSTOMERS" then the immediate parent object, "AS3333:AS-RIPE:AS-APNIC" must exist to authorise the new set creation. However, it does not matter if higher parent objects still exist, like "AS3333:AS-RIPE".

If an AS number is the first element in the hierarchical set name (the top-level parent) then the corresponding **aut-num** object must exist in order to create the next level in the hierarchy as this is the parent object. However, it is only needed for authorisation.

Therefore, to create the set "AS3333:AS-RIPE", the **aut-num** object “AS3333” must exist to provide authorisation.

If an AS number appears anywhere else in the set name hierarchy it is treated as part of a set name and the **aut-num** object does not need to exist. You cannot have AS numbers as the first two levels in the name hierarchy. The second level could not be created, as there must be at least one element starting with "AS-" in the set name.

So "AS3333:AS-RipeOriginAS1" is a valid set name but AS1 is not an **aut-num** object, it is simply part of this set name.

"AS3333:AS1" is not valid as it does not contain an "AS-" string defining an as-set name.

"AS3333:AS1:AS-CUSTOMERS" is also not valid as it would require "AS3333:AS1" to exist as the parent to authorise the creation of this set.

Only hierarchical AS-SET objects can be created.
If the set name is a single as-set (starting with AS- and with no colons) then it is considered to be non-hierarchical,

The **as-set** object can also list members of the set with a "members:" attribute. The **as-set** and **aut-num** objects referenced in a "members:" attribute do not need to exist.




## Modifying and Deleting Set Objects

Any intermediate set can be deleted from the hierarchy. This includes everything from the highest-level parent (which is a non-hierarchical **as-set** or **aut-num** object) to the lowest-level parent (which is everything to the left of the last colon in the name of the lowest level child object).

In the case of "AS3333:AS-RIPE:AS-APNIC:AS-CUSTOMERS", it is possible to delete any of these individual objects:

"AS3333"

"AS3333:AS-RIPE"

"AS3333:AS-RIPE:AS-APNIC"

They can also be recreated, as the check is only that the immediate parent object (to the left hand side of the last colon of the object name being created) exists. It does not check any higher-level parents or any existing child objects (right hand side of the colon). If several intermediate parents have been deleted, they can only be recreated in the correct sequence, starting with the highest level.

In the case of "AS3333:AS-RIPE:AS-APNIC:AS-CUSTOMERS", suppose we delete: "AS3333" and "AS3333:AS-RIPE:AS-APNIC" but not "AS3333:AS-RIPE". We can recreate "AS3333:AS-RIPE:AS-APNIC" as its parent object is "AS3333:AS-RIPE" and this object still exists. Authorisation is required from the existing parent object to recreate the child object.

There is an issue if the top-level parent is an **as-set** object and it is deleted. Suppose we have the set "AS-RIPE:AS3333:AS-RIPE:AS-CUSTOMERS" and all the parents exist. (Note that this is subtly different to the set object above, as the top-level parent of this set is a set object, not an **aut-num** object.) We can delete the top-level parent set "AS-RIPE". The remaining sets "AS-RIPE:AS3333" to "AS-RIPE:AS3333:AS-APNIC:AS-CUSTOMERS" are still valid. However, anyone can now recreate the deleted top-level parent set "AS-IX". This has no parent and therefore requires no hierarchical authorisation. This only becomes a problem if the next-level child set is deleted and the user tries to recreate it. Authorisation is now required from the new parent set that is owned by someone else.

If there are any **aut-num** objects with "member-of:" attributes referencing an **as-set** object then this **as-set** object cannot be deleted. If the "mbrs-by-ref:" attributes are removed from the **as-set** object, it still cannot be deleted if there are any existing "member-of:" references to it.

A "mbrs-by-ref:" attribute can be removed from an **as-set** object even if there are "member-of:" references to this **as-set** object. The "mbrs-by-ref:" attribute is only needed for validation of an object's claim to membership of the set. A modification to an **aut-num** object with a "member-of:" reference to this **as-set** object will fail unless the "member-of:" reference is removed from the **aut-num** object.

The **as-set** object can be deleted if it has "members:" listed in the object that do exist. However, if there are "member-of:" references to the set in other objects, this set object cannot be deleted, even if you first remove the “mbrs-by-ref:” attributes.


## The ROUTE-SET Object

* The same rules apply to the **route-set** object as to the **as-set** object but the "member:" attributes include **route** and **route6** objects instead of **aut-num** object.
* "member:" attributes include other **route-set** objects
* The set name must have an element starting with 'RS-'
* The set name can also include AS numbers


## The RTR-SET Object

* The same rules apply to the **rtr-set** object as to the **as-set** object but the "member:" attributes include **inet-rtr** objects instead of **aut-num** objects.
* "member:" attributes also include other **rtr-set** objects
* The set name must have an element starting with 'RTRS-'
* The set name can also include AS numbers 


## The PEERING-SET Object

* The same rules apply to the **peering-set** object as to the **as-set** object
* There are no "member:" attributes
* "peering:" and "mp-peering:" attributes also include other **peering-set** objects
* There are no referential integrity checks on the values of the "peering:" and "mp-peering:" attributes. Objects referenced in these attributes do not need to exist on creation and can be deleted later
* The set name must have an element starting with 'PRNG-'
* The set name can also include AS numbers


## The FILTER-SET Object

* The same rules apply to the **filter-set** object as to the **as-set** object
* There are no "member:" attributes
* "filter:" and "mp-filter:" attributes also include other **filter-set** objects
* There are no referential integrity checks on the values of the "filter:" and "mp-filter:" attributes. Objects referenced in these attributes do not need to exist on creation and can be deleted later
* The set name must have an element starting with 'FLTR-'
* The set name can also include AS numbers
