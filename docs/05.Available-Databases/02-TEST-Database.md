---
permalink: /Available-Databases/TEST-Database
---

# TEST Database

This database is provided as an operational service to all users. It allows anyone to try out updates or changes to their data. New users can set up any data they like and practise making updates and doing queries.

The TEST Database works in exactly the same way as the production service, for most of its operations. Some rules are relaxed and some **mntner** objects have the password included in a “remarks:” attribute. This allows users to create objects in this TEST Database that only the RIPE NCC can create in the production database. If you want to copy your allocation and build a copy of your network you can do this in the TEST Database.

Each evening, at midnight (Amsterdam time) the whole contents of this database are deleted. It is then reset with a standard, basic set of objects. This prevents anyone from creating large objects and blocking off huge pieces of the address space. So if you are testing anything that will take you more than a day to complete, you need to build your objects in a text file that you can either paste into a syncupdates web page or submit as an email update. Make sure you order them in the text file to match how you actually created them. If you get the order wrong, some may fail when you re-submit them. You can add to the text file as you create or change data in the database. Then the next day, you can recreate the whole set of objects to the point you reached previously and continue with your tests.