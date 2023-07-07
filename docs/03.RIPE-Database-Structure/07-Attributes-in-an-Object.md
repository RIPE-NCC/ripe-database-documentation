---
permalink: /RIPE-Database-Structure/Attributes-in-an-Object
---

# Attributes in an Object

The first attribute must have the same name as the object type. This identifies the object type. The currently available object types are shown in the sub-sections, ['List of Primary Objects'](../RIPE-Database-Structure/List-of-Primary-Objects/#list-of-primary-objects) and ['List of Secondary Objects'](../RIPE-Database-Structure/List-of-Secondary-Objects/#list-of-secondary-objects). If the type is not recognised, that part of an update message will be seen as a paragraph of text and will be disregarded with an appropriate error message. If the unrecognised type is in a query, it will be rejected with an error.

Other attributes can appear in any order, but most people stick to the order as shown in the object templates (see the section ['RPSL Object Types'](../RPSL-Object-Types/#rpsl-object-types)). Each object type is defined to have a set of possible attributes. The set for each object type is defined within the software and shown in the template.


Each instance of an object type is uniquely defined by a primary key. For most object types, the primary key is normally the value of the first attribute. In some cases, it is a different attribute value or a composite of more than one attribute value. The primary key only has to be unique within an object type. Objects of different types can sometimes have the same primary key, as long as the key fits the syntax for both object types. For example ‘FRED' is a valid name for a **mntner** object. ‘FRED' is also a valid “nic-hdl:” value, which is the primary key for a **person** or **role** object.

Each attribute name must start on a separate line. However, not every line needs an attribute as values can continue over several lines. A blank line marks the end of an object . Technically this is two consecutive newline characters, \n\n. For this reason, you cannot include a completely blank line in the middle of an object.