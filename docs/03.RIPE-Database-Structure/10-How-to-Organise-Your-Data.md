---
permalink: /RIPE-Database-Structure/How-to-Organise-Your-Data
---


# How to Organize Your Data

There are many different types of objects in the RIPE Database. Some of them can be used in different ways. How you use them makes a big difference to the workload needed to maintain the data.

The RIPE Database is intended for those who have, or will soon have Internet resources. This database is a public registry with a well-defined purpose. See ['Purpose of the RIPE Database'](../What-is-the-RIPE-Database/Purpose-and-Content-of-the-RIPE-Database/#purpose-of-the-ripe-database) for more details. You can create many objects in the RIPE Database without any resources. But if these objects are not referenced by any resource object within a specified time period they will all be deleted. See the section on [Garbage Collection](../Updating-Objects-in-the-RIPE-Database/Garbage-Collection/#garbage-collection) for more details.

Resource holders using the RIPE Database need a basic set of objects:

* organisation
* role
* person
* mntner

For new members, this set of objects will be set up by the RIPE NCC as part of the [new LIR process](https://www.ripe.net/participate/member-support/become-a-member). How you use these objects will affect how much maintenance you need to perform later.



## Using the Organisation Object

The **organisation** object was introduced in 2004, long after the RIPE Database data model was designed. The **organisation** object can make life easier in some situations.

Consider all users as organisations, whether they are multinational companies, universities or individuals. To use the RIPE Database, each of these organisations needs a set of data objects that represent their business model. The organisation must have:

1. People who can be contacted
1. These people have defined roles in the business
1. These roles include responsibility for Internet resources
1. These resources need authorisation tokens to protect them
1. These tokens may need public keys.

This set of objects represents your organisation. When the organisation is an individual who has been assigned some PI space, they may need several objects in the database. Multinational companies may have many hundreds of thousands of objects.

The **organisation** object was introduced as a way of keeping track of these sets of objects. The idea is to put the organisational identity of the entity at the centre by defining its **organisation** object. The organisation's business model can then be mapped out by creating the objects from the list above as appropriate. Each of these objects can be directly linked to the **organisation** object using the "org:" attribute. Or for a simplified model, link the **mntner** objects using the "org:" attribute in each **mntner** object. All objects must be maintained, so there is an indirect reference back to the **organisation** object through the **mntner** objects.

Some multinational companies may have a distributed business model with different parts of the organisation responsible for different parts of their network. In this situation additional **organisation** objects can be created. These objects can reference the main **organisation** object through their own "org:" attribute. This allows users to keep track of the entire company's data or the parts delegated to different sections of the company.

By using these "org:" references, bulk changes to data are very much simplified. Tools can be written and deployed more easily. New ideas can be rolled out quickly across an entire data set. The more structured you make your data, the more easily it is to automate processes.

When the **organisation** object was first introduced there was some resistance to make references to it for fear of the public or competitors being able to map out their business. But now that there are so many ways to (inverse) query the data, it is not difficult to find all resources or customers of any organisation. If you don't set up your data in a structured way, the management of the data becomes more complicated.

Basically the **organisation** object should be the centre of your presence in the RIPE Database. All your human resources and Internet resources and authentication tokens should hang off this central point.



## Using the Role Object

The **person** and **role** objects are often said to be interchangeable:

* They share the same name space in the RIPE Database, but names can be duplicated.
* The NIC Handles are only unique across the two object types combined, so both object types can't exist with the same NIC Handle.
* Either a **role** or **person** object can be used everywhere that requires a reference to a contact, with only a couple of exceptions where it must be one type or the other.

However, these two objects have very different functions. A **person** object holds personal details about an individual. A **role** object should describe a business function or operational unit and may reference the individual people responsible for this activity. References to **person** objects are optional in the **role** object.

Using **role** objects makes large-scale changes easier. The principle is the same if you have ten objects or 10,000 objects in the database. However, problems most commonly occur when dealing with a very large number of objects.

Many organisations create a large number of objects that directly reference a **person** object, and experience difficulties if this person leaves the company. The organisation may be responsible for many objects of different types, possibly with several different mntner objects protecting them, and finding them and getting all the authorisations right to change the references can easily become a problem.

Working within certain guidelines can help avoid this situation:

Only use a person object as a holder of personal information
Only reference a person object in role objects
Reference the role objects in all the other places where contact data is required
If the person responsible for a business role or function changes, then it is only necessary to modify a few role objects to reference a different person object. All references to the role objects remain valid. The scale of the changes you need to make is very much reduced.

Even if you have only a handful of objects in the database, it is good practice to do this. Your business may grow, and time restraints mean that you may not go back and change things until you absolutely have to do so. This is how these objects were designed for use, but as this practice was never enforced by software business rules, much of the database still makes direct references to person objects.



## Abuse Details

The **irt** object (Internet Response Team) was introduced to identify a Computer Security Incident Response Team (CSIRT) for handling serious network problems like DOS attacks. It was later modified to make it usable for more general abuse. But all the old ways of documenting abuse were also still available. Now with the introduction of "abuse-c:" this general abuse is moving away from the **irt** object again. After a data cleanup, the **irt** object will only be used for CSIRT teams again and should not be used to handle general abuse complaints.

General abuse is now handled by the **organisation** object. This should reference an abuse handling **role** object with an "abuse-c:" attribute. This **role** object must include an "abuse-mailbox:" attribute. All RIPE NCC allocated address space and direct end user assignments, represented by **inet(6)num** and **aut-num** objects, should reference an **organisation** object directly. All more specific address space objects inherit this reference. The abuse handler for this address space and all the more specific address space to that specified by the **inet(6)num** object is determined by the referenced **organisation** object.

There is a query flag (`-c`) which will return the **irt** object, if one exists, for any specified **inet(6)num** object. There is also another query flag (`-b`) that will find the indirectly referenced **role** object, extract the "abuse-mailbox:" attribute and return brief details including the email address from the **role** object.


## Who Maintains the Data?

This is one of those areas that some users don't pay much attention to, but it is one of the most important questions regarding the use of the RIPE Database. Anyone authorised to maintain your data can cause serious damage to your network, your business and the business of your customers if they make a mistake. Authorisation is an all or nothing concept. You cannot authorise someone to create and modify customer's details but not delete it, for example.

For details of the technical workings of authorisation see the section, ['Authorisation'](../Authorisation/#authorisation). This section is about how to set up who can authorise what.

The authorisation model is based on the **mntner** object. This is a box that holds credentials. There are different types of credentials with passwords, PGP certificates and single sign-on (SSO) usernames being the main ones. At the time of writing, these credentials don't need to match anyone who is registered in the RIPE Database with a **person** object. They are simply lists of credentials that can belong to anyone. It is therefore not possible for the database software to identify 'who' authorised an update. The introduction of SSO as a credential is a step in this direction.

Every object in the RIPE Database must now be protected by a **mntner** object referenced by a "mnt-by:" attribute. The **mntner** object is also protected by a "mnt-by:" attribute. Normally, this references itself.

For a small organisation with only a few objects in the database you may decide that you only need one **mntner** object. This is created with one or more credentials and maintains itself. Every object you create in the RIPE Database is maintained by this **mntner** object. The people whose credentials are in the **mntner** object all have equal and full control over all of your database objects. They can create, modify and delete anything. Because of the anonymous way credentials are used in the **mntner** object, the software cannot identify which credential made the update, only that a specific **mntner** object was used.

For larger organisations with potentially hundreds of thousands of objects in the database you may want to distribute authority to maintain data. How you distribute it depends on your business model. One example could be for a multi-national organisation with customers in different countries to partition your address space allocations by country. You could have a separate team managing the network in each country, each with their own **mntner** object. The "mnt-lower:" attribute on the partitioned allocations restricts control to those teams.

Another possibility is to have separate teams handling address space, reverse delegations and routing. This can be set up using the appropriate "mnt-xxx:" attributes. For example "mnt-routes:".

You may also want to control who can grant authority to manage your data. Normally a **mntner** object maintains itself. This means anyone who has a credential in that **mntner** object can also change the **mntner** object. So they can add another password so that another person can make changes. In a large organisation, you may want a security team to control the **mntner** objects. In this case you can create a **mntner** object for the security team. All other **mntner** objects are maintained by this security team **mntner**. Only the security team can then allow someone else authority to maintain some data by adding their credential to the appropriate **mntner** object.




## How do I keep an audit trail of changes to my data?

You can use notifications to keep track of changes to your data. This section details how to set up who gets notified of what.

The ['Notifications'](../Notifications/#notifications) section details the technical workings of notifications and how to set up who gets notified of what.

There are many ways to set up notifications. If you want to know everything, you should use the **mntner** objects. All of your data is maintained by one or more **mntner** objects. These objects have a mandatory attribute "upd-to:". This lets you know if someone is trying to hack into your data. Any update to objects maintained by this **mntner** object that fails on authorisation gets notified to this email address. There is also an optional attribute "mnt-nfy" in the **mntner** object. This notifies you of every successful update to any object maintained by this **mntner** object.

Most people direct notifications to individuals in the organisation, which is adequate if those individuals want to know about changes to objects they have some responsibility for, or interest in. However, these emails are often missed, ignored or simply deleted. If there is an issue that results from a change made some time ago, the information you received about the change may have been lost.

One way to keep an audit trail of changes is to set up a specific email address that you can reference in all of your **mntner** objects, in both email attribute types. You can set up a script that monitors that email address and archives all emails to a log file or database. You then have an audit trail of changes made to your objects. One thing that is missing is the acknowledgement message. For email updates, this is only returned to the address that submits the update. For web form updates or RESTful API updates, there is no acknowledgement message sent anywhere. The response is returned to the web session. However, for all updates, the software still generates the human-readable acknowledgement message that is returned in response to an email update. This is logged internally in the RIPE NCC's update logs, but only sent to the user if the update was submitted by email. Without a copy of this acknowledgement message, it is not possible to have a complete audit trail of who did what and when they did it.
