# Referenced Objects in Query Response

A standard query will return a set of secondary objects that are directly referenced from the objects in the query response. For example, if the query response returns an **inetnum** object then, by default, the response will also include any directly referenced **organisation**, **person** and **role** objects. The **person** and **role** objects are subject to daily limits. A user can find themselves blocked for excessive querying of personal data objects even if they did not want that information.

This default behaviour can be turned off so that these secondary objects are not returned. There are two options for doing this:

**“-r” or “--no-referenced”**
With this query flag, none of the referenced secondary objects will be returned in the response. If an **inetnum** object references a **role** object as “admin-c:”, a **person** object as “tech-c:”, and an **organisation** object, none of these objects will be returned with the **inetnum** object.

**“--no-personal”** 
This query flag only removes the personal objects, **person** and **role**. So, in the example above, the **organisation** object is still returned.

**“--show-personal”**
This is the opposite of the “--no-personal” flag. Currently, it does not do anything but may be changed in the future.