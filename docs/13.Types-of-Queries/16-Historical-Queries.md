---
permalink: /Types-of-Queries/Historical-Queries
---

# Historical Queries

The RIPE Database holds a lot of historical data going back over ten years. This can be of use operationally and statistically. It is possible to query the history of operational data objects that still exist. The available historical data stretches back to the most recent time that the object was (re-)created. If an object is created, modified several times, deleted, recreated and modified again, the available data for this object will cover the most recent creation and modification, as well as the date that it was deleted. This policy of not showing historical data for deleted objects is subject to change.

For the available historical data, a list can be requested showing the versions with a timestamp. Each of these versions of the object can then be queried. Also, a diff is available between versions. These historical query flags do not have a short format and can only be used from the command line. These query flags are not available through either the web query form or the RESTful API.

All timestamps use the UTC timezone.

Any attribute containing email addresses is filtered out from the query response. These may no longer be related to the object and, also, the owner of the email address may not want to receive any further communications concerning this data. It is also not possible to query for historical personal data objects i.e. **person** and **role**.

**“—list-versions”**

The response to this is a list of available object versions with a timestamp. This timestamp is the date that an update was processed by the database server to create this version of the object. It is a system-generated timestamp; it is not information supplied by the user. The format looks like this:

    $ whois --list-versions 193.0.0.0 - 193.0.7.255

    % Version history for INETNUM object "193.0.0.0 - 193.0.7.255"
    % You can use "--show-version rev#" to get an exact version of the object.

    % This object was deleted on 2003-03-17 13:03

    rev#  Date              Op.

    1     2003-03-17 13:15  ADD/UPD
    2     2003-04-12 08:32  ADD/UPD
    3     2003-05-22 13:20  ADD/UPD
    4     2004-10-22 14:43  ADD/UPD
    5     2004-10-31 03:08  ADD/UPD
    6     2006-02-21 16:46  ADD/UPD
    7     2009-12-02 13:27  ADD/UPD
    8     2009-12-02 13:49  ADD/UPD
    9     2010-03-17 15:00  ADD/UPD
    10    2011-02-17 12:11  ADD/UPD
    11    2013-03-19 16:24  ADD/UPD

The specified primary key must be an exact match for an object. In the above example, you cannot request the history for 193.0.7.35. Even though this is part of the above range, these queries work on objects not hierarchies. Although this object existed prior to 2003-03-17, that part of the history is not available as it was deleted on this date.

**“—show-version #n”**

This query will return one version of an object from the history list. Taking version #10 from the above example, the query response will look like this:

    $ whois --show-version 10 193.0.0.0 - 193.0.7.255

    % Version 10 of object "193.0.0.0 - 193.0.7.255"
    % This version was a UPDATE operation on 2011-02-17 12:11
    % You can use "--list-versions" to get a list of versions for an object.

    inetnum:        193.0.0.0 - 193.0.7.255
    netname:        RIPE-NCC
    descr:          RIPE Network Coordination Centre
    descr:          Amsterdam, Netherlands
    remarks:        Used for RIPE NCC infrastructure.
    country:        NL
    admin-c:        JDR-RIPE
    admin-c:        BRD-RIPE
    tech-c:         OPS4-RIPE
    status:         ASSIGNED PI
    source:         RIPE # Filtered
    mnt-by:         RIPE-NCC-MNT
    mnt-lower:      RIPE-NCC-MNT

**“--diff-versions <version-number:version-number>”**

This query will return the textual difference between two versions from the history list. Checking the difference between versions 10 and 11 in the example above will look like this:

    $ whois --diff-versions 10:11 193.0.0.0 - 193.0.7.255

    % Difference between version 10 and 11 of object "193.0.0.0 - 193.0.7.255"

    @@ -3,2 +3,3 @@
    descr:          RIPE Network Coordination Centre
    +org:            ORG-RIEN1-RIPE
    descr:          Amsterdam, Netherlands

We can see that a reference to an **organisation** object was added. If you reverse the version numbers, then the logical diff will show that the reference to an organisation object was removed when looking back over the timeline of changes, from more recent to older changes:

    $ whois --diff-versions 11:10 193.0.0.0 - 193.0.7.255

    % Difference between version 11 and 10 of object "193.0.0.0 - 193.0.7.255

    @@ -3,3 +3,2 @@
    descr:          RIPE Network Coordination Centre
    -org:           ORG-RIEN1-RIPE
    descr:          Amsterdam, Netherlands