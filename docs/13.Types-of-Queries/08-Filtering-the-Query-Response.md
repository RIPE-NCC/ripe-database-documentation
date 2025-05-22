---
permalink: /Types-of-Queries/Filtering-the-Query-Response
---

# Filtering the Query Response

A filtering process restricts some data from the default query response. This applies to email contact data. When a user is searching for abuse contact data, they sometimes take all email addresses found in all objects in the query response. This may include the correct address. However, it often also includes many other addresses for people who are not responsible for handling such complaints.

To help overcome this issue, some attributes containing email addresses are filtered out of the default response. One exception to this is where a **role** object includes an "abuse-mailbox:" attribute. The abuse email address is never filtered. If you include the `-B` or `--no-filtering` query flag then the response will not be filtered

When any attribute has been filtered out of an object in the query response, a "Note:" is added to the response 
header to warn the user. In addition, the "source:" attribute of each filtered object in the response will have a 
comment added to the end of the line saying "# Filtered". If this filtered output is cut and pasted into an update 
message, including this end of line comment on the "source:" attribute, the update will be rejected for any filtered object. This is because some mandatory attributes may be missing and the "source:" will not be recognised. Filtered output can therefore not be accidentally used for updates.

Any "auth:" attribute of **mntner** objects apart from those which reference to **key-cert** objects are always filtered when these objects are queried. This filtering cannot be turned off with any query flags. The only way to see an unfiltered **mntner** object is to authenticate using a password or SSO credential that matches an auth: attribute on the mntner.

