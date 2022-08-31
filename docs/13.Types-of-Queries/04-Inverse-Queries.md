# Inverse Queries

Inverse queries search for object's inverse keys that are supplied as an argument to a query. The query flag “-i” (or --inverse) must also be specified with appropriate query flag arguments. Inverse keys are defined in the templates of the RIPE Database objects. (See section ['RPSL Object Types'](../04.RPSL-Object-Types/README.md#rpsl-object-types) for more details.) These templates can be listed by querying the RIPE Database. See section ['Accessing the Object Templates'](../07.Updating-Objects-in-the-RIPE-Database/02-Accessing-the-Object-Templates.md#accessing-the-object-templates) for more details.

A complete listing of the inverse query flag arguments is available in the "Tables of Query Types Supported by the RIPE Database" in the [RIPE Database Query Reference Manual](https://www.ripe.net/manage-ips-and-asns/db/support/documentation/query-ref-manual).

By performing an inverse query, the user requests all objects to be returned from the database that contain the specified query argument in the attribute(s) specified in the query flag arguments.

**Example:**

whois -i admin-c &lt;nic-handle&gt;

will return all objects where the “admin-c:” attribute contains the &lt;nic-handle&gt; specified as the query argument.

You can specify several query flag arguments to request searches against several attributes in objects. If you want to do this, the query flag arguments should be entered as a comma-separated list with no white spaces. All the attributes searched must contain the same type of value. In other words, all the values must be maintainers or nic-handles or one of the other values listed in the appendix section on Supported Queries.

**Example:**

whois --inverse mb,mnt-lower &lt;**mntner** name&gt;

will return all objects where the “mnt-by:” or the “mnt-lower:” attributes contain the &lt;**mntner** name&gt; specified as the query argument.

**Example:**

An inverse query can be used to search for references to a person or role in objects. To find a person or role you could search for matching "admin-c", "tech-c", "abuse-c", "zone-c" attributes, however you need to specify all attributes separately. Instead you can specify "person" or "pn" to search all such attributes.

whois -i admin-c,tech-c,abuse-c,zone-c  &lt;**person** value&gt; 

will return the same results as 

whois -i pn &lt;**person** value&gt; or whois -i person &lt;**person** value&gt;

Finding the references for a person is very useful when someone leaves the company and you want to delete all the registers from this person. Note that you can also specify a role instead of a person:

whois -i pn &lt;**role** value&gt;