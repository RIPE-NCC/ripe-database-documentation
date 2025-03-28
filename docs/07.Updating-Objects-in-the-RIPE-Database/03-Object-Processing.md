---
permalink: /Updating-Objects-in-the-RIPE-Database/Object-Processing
lastUpdated: 1702898267000
prev:
  text: 02 Accessing the Object Templates
  link: /Updating-Objects-in-the-RIPE-Database/02-Accessing-the-Object-Templates/
next:
  text: 04 Update Operations
  link: /Updating-Objects-in-the-RIPE-Database/04-Update-Operations/
---

# Object Processing

When an update message contains multiple objects, the order of processing the objects in the message only changes in specific situations. The database software tries to process the objects one by one, starting with the first recognised object in the message. The order can matter, however, the database software has limited options for changing the order. The only condition the software can recognise is when an auto-generation process is used for certain object primary keys. "AUTO-n" primary key values can be included for generation and can also be referenced by other objects in the same update message. These will be resolved, as long as the number "n" is consistent and there are no circular references. If an object that references a value ‘AUTO-1' is listed in the update message before the object where the value ‘AUTO-1' is generated, the ordering will be changed. The referencing object will be pushed to the end of the list, by which time the object crating the ‘AUTO-1' value will have been processed.

The below figure shows an example of two objects that will be created but in a different order. The second figure shows an example of two objects that will not be created as there is a circular reference between the ‘AUTO-n' attributes that can never be resolved. (Only the relevant parts of the objects are shown in the figures.)

    inetnum:     193.0.7.35
    admin-c:     auto-1


    person:      admin guy
    nic-hdl:     auto-1

In the example of the figure above. the second, **person** object must be created first. This gives a real value to ‘auto-1'. Then the first, **inetnum** object can be created referencing that real value for ‘auto-1'.

    organisation:    auto-1
    admin-c:         auto-2


    person:          admin guy
    nic-hdl:         auto-2
    org:             auto-1

In this figure, the object can be created because of the circular reference to ‘auto-n' values. They both need to create a real value for an ‘auto-n' tag. But they both reference the ‘auto-n' tag of the other object, which does not yet exist.

You can avoid these complex arrangements of, and circular references to, auto-generated values in a single update message by sending multiple, consecutive updates instead.

When processing each individual object, the software makes many checks including that:

* The syntax of the object is correct.
* The object passes all required authorisation checks.
* All references to other objects can be resolved without conflicts.
* The operation does not compromise referential integrity. For example, when an object is to be deleted, the server checks that it is not referenced from any other object in the RIPE Database.
* The object complies with all software business rules, for example, not creating an allocation resource object without including the optional "org:" attribute. This is required in an allocation object.
* The object complies with relevant policies, such as having the correct "status:" value in **inetnum** objects.

If all checks are passed, the update will be successful for this object. If one of these checks fails, the operation fails for this object. This is shown in the acknowledgement message and sometimes in notification messages. See the section on Notifications for more details.

Each object in the update message is processed independently of others (except for the ‘AUTO-n' references). If the operation fails on one object, the following objects will still be processed. There may, however, be consequences of a previous failed operation. For example if a **person** object creation fails, a later object creation which references this **person** object will fail the referential integrity checks because the **person** object does not exist in the database.

After the software finishes processing all the objects in the update message, an acknowledgement message is returned to the sender of the original update. For email update messages, the acknowledgement will be another email sent to the address as specified in the "Reply-to:" field or "From:" field. For synchronous update messages it will be returned via the open HTTP connection. If the connection has timed out or been closed, no acknowledgement is sent. In all cases, the update will still be completed by the database software regardless of the status of HTTP sessions of validity of email addresses. Notification messages may also be sent. See the section on Notifications for more information about this.
