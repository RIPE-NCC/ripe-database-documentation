---
permalink: /Authorisation
prev:
  text: Notification Messages
  link: /Notifications/Notification-Messages/
next:
  text: Authorisation Model
  link: /Authorisation/Authorisation-Model/
lastUpdated: 1743685701000
---

# Authorisation

Authorisation in the RIPE Database is based on the Routing Policy System Security (RPSS) that is explained in more detail in [RFC 2725](https://tools.ietf.org/html/rfc2725).

* Authorisation - The power or right to make decisions and have access. This can be delegated.
* Authentication - To ensure that the entity making use of the authorisation is what or who it claims to be.
* Credential - Something that shows an entity has a right to exercise authorisation, providing the basis for confidence.

These three words are often confused. When talking about the RIPE Database, an authenticated person may be granted or given a credential by a system administrator or official contact, authorising this person to access and manage objects in the database.

Different types of objects in the database require different levels of protection. The server supports multiple authorisation methods. Because of the data model used by the RIPE Database, it is not always possible to identify who is making an update. The **mntner** objects only hold credentials - for example, encrypted password hashes or references to cryptographic keys. There is no connection between many of these credentials and any identifiable person.

In order to make the password tokens a more secure form of protection, the encrypted hashes are hidden from public view. A query on a **mntner** object will have any password hashes removed in the query result. These hashes can only be seen if you can supply the clear text password as part of the query. The only way to do this via the Webupdates form.
