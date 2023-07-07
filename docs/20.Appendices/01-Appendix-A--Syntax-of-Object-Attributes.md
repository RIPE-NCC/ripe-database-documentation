---
permalink: /Appendices/Appendix-A--Syntax-of-Object-Attributes
---

# Appendix A- Syntax of Object Attributes

The syntax definitions of the object attributes that the RIPE Database supports are shown below.

The value of an attribute has a type. Some of the most commonly used and complex types are shown in the table below. Others are explained in the descriptions of the attributes.

**Commonly Used Attribute Types**

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;quad&gt; | &lt;xdigit&gt;.){1,4}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &lt;dlabel&gt; | Domain name label as specified in [RFC 1034](https://www.ietf.org/rfc/rfc1034.txt). The total length should not exceed 63 characters (octets)<br><br>&lt;alnum&gt;((-\|&lt;alnum&gt;)*&lt;alnum&gt;)?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &lt;action&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;address-prefix&gt; | An address prefix is represented as an IPv4 address followed by the character slash "/" followed by an integer in the range from 0 to 32. The following are valid address prefixes: 192.0.2.5/32, 192.0.2.0/24, 0.0.0.0/0. The following address prefixes are invalid: 0/0, 192.0.2/24 since 0 or 192.0.2 are not strings containing four integers.<br><br>&lt;ipv4-address&gt;/&lt;integer&gt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;address-prefix-range&gt; | An address prefix range is an address prefix followed by an optional range operator. Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| &lt;as-expression&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;as-number&gt; | An "AS" string followed by a 32-bit integer<br><br>AS&lt;integer&gt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &lt;condition&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;domain-name&gt; | Domain name as specified in [RFC 1034](https://www.ietf.org/rfc/rfc1034.txt) without a trailing dot ("."). The total length should not exceed 255 characters (octets)<br><br>&lt;dlabel&gt;(\\.&lt;dlabel&gt;)*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;e-mail&gt; | Email address specification as defined in [RPSL RFC 2822](https://www.ietf.org/rfc/rfc2822.txt).  <br>IDN domains will be encoded as Punycode as defined in [RFC 3492](https://tools.ietf.org/html/rfc3492)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| &lt;filter&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;freeform&gt; | A sequence of Latin 1 characters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &lt;inet-rtr-name&gt; | Specifies the name of an **inet-rtr** object.  <br>It is a &lt;domain-name&gt;.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;ipv4-address&gt; | An IPv4 address is represented as a sequence of four integers in the range from 0 to 255, separated by the character dot ("."). For example, 192.0.2.5 represents a valid IPv4 address.<br><br>\[0-9\]+(\\.\[0-9\]+){3,3}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| &lt;ipv6-address&gt; | &lt;quad&gt;(:&lt;quad&gt;){7,7}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &lt;ipv6-address-prefix&gt; | An IPv6 address prefix is represented as an IPv6 address followed by the character slash "/" followed by an integer in the range from 0 to 128.<br><br>&lt;ipv6-address&gt;/integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &lt;ipv6-filter&gt; | Please see [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| &lt;irt-name&gt; | Specifies the name of an **irt** object. It is an &lt;object-name&gt; starting with the prefix "IRT-" that is reserved for this object type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| &lt;mntner-name&gt; | &lt;object-name&gt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| &lt;nic-handle&gt; | From two to four characters, optionally followed by up to five digits, optionally followed by either a source specification of up to nine characters or two-letter country code. Source specification and country codes start with "-".<br><br>(&lt;alpha&gt;{2,4}(\[1-9\]&lt;digit&gt;{0,5})?(-&lt;alpha&gt;<br><br>(\[a-zA-Z0-9_-\]{0,7}&lt;alnum&gt;))?)\|<br><br>(AUTO-&lt;digit&gt;+(&lt;alpha&gt;{2,4})?)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;object-name&gt; | Many objects in RPSL have a name. An &lt;object-name&gt; is made up of letters, digits, the character underscore "_", and the character hyphen "-". The first character of a name must be a letter and the last character of a name must be a letter or a digit. The following words are reserved by RPSL, and they can not be used as names:  <br>any, as-any, RS-any, peeras, and, or, not, atomic, from, to, at, action, accept, announce, except, refine, networks, into, inbound, outbound.<br><br>Names starting with certain prefixes are reserved for certain object types.  <br>Names starting with "as-" are reserved for **as-set** names.  <br>Names starting with "rs" are reserved for **route-set** names.  <br>Names starting with "rtrs-" are reserved for **rtr-set** names.  <br>Names starting with "fltr-" are reserved for **filter-set** names.  <br>Names starting with "prng-" are reserved for **peering-set** names.  <br>Names starting with "irt-" are reserved for **irt** object names. |
| &lt;org-id&gt; | The 'org-' string followed by two to four characters, followed by up to five digits, followed by a source specification. The first digit must not be "0". Source specification starts with "-" followed by a source name up to nine-characters in length.<br><br>org-&lt;alpha&gt;{2,4}(\[1-9\]&lt;digit&gt;{0,4})-&lt;registry-name&gt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &lt;organisation-name&gt; | A list of 1 to 30 words separated by white space. A word can contain alphanumeric characters in addition to any of the following: asterisk, plus and minus signs, forward slash and backslash, dash, quotes, at sign, comma, dot, underscore, ampersand, exclamation mark, colon, semicolon, brackets and square brackets. A word may have up to 64 characters and is not case sensitive. Each word can have any combination of the above characters with no restrictions on the start or end of a word.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| &lt;peering&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;person-name&gt; | It should contain 2 to 10 words separated by white space. The first and the last word cannot end with dot ("."). A word is made up of ASCII alphanumeric characters and additionally: digits, the character underscore "_", and the character hyphen "-". The first character of a name must be a letter and the last character of a name must be a letter or digit. Max 64 characters can be used in each word.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &lt;protocol&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| &lt;registry-name&gt; | RIPE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| &lt;role-name&gt; | It should contain 2 to 10 words separated by white space. The first and the last word cannot end with dot ("."). A word is made up of ASCII alphanumeric characters and additionally: digits, the character underscore "_", and the character hyphen "-". The first character of a name must be a letter and the last character of a name must be a letter or digit. Max 64 characters can be used in each word.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| &lt;router-expression&gt; | Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) and [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &lt;telephone-number&gt; | Contact telephone number. Can take one of these forms:<br><br>+&lt;integer-list&gt;<br><br>+&lt;integer-list&gt; \\(&lt;integer-list&gt; \\)&lt;integer-list&gt;<br><br>+&lt;integer-list&gt; ext.&lt;integer-list&gt;<br><br>+&lt;integer-list&gt; \\( integer-list \\) &lt;integer-list&gt; ext. &lt;integer-list&gt;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| &lt;integer&gt; | An integer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &lt;alpha&gt; | Any alphabetical character.<br><br>\[A-Za-z\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| &lt;alnum&gt; | Any alphabetical or numerical character.<br><br>\[A-Za-z0-9\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| list<br><br>of | A list of words separated by a comma (","). Cannot be empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ripe-list<br><br>of | A list of words separated by white space. Cannot be empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| &lt;integer-list&gt; | A list of integers separated by white space or a dash ("-").                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Descriptions of the attributes are listed below in the following format:

&lt;attribute\_name&gt; &lt;attribute\_value(type)&gt;  
&lt;description&gt;

**abuse-c:** &lt;nic-handle&gt;  
References a **role** object holding contact details of an abuse role.

**abuse-mailbox:** &lt;e-mail&gt;  
Specifies the e-mail address to which abuse complaints should be sent.

**address:** &lt;freeform&gt;  
Full postal address of a contact.

**admin-c:** &lt;nic-handle&gt;  
References an on-site administrative contact.

**aggr-bndry:** &lt;as-expression&gt;  
Defines a set of ASNs which forms the aggregation boundary.

**aggr-mtd:** inbound | outbound \[&lt;as-expression&gt;\]  
Specifies how the aggregate is generated. Please see [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**alias:** &lt;domain-name&gt;  
Specifies a canonical DNS name for the router.

**as-block:** &lt;as-number&gt; - &lt;as-number&gt;  
Specifies the range of ASNs that the **as-block** object represents. Please see [RPSS RFC 2725](https://tools.ietf.org/html/rfc2725) for more information.

**as-name:** &lt;object-name&gt;  
A descriptive name associated with an AS Number.

**as-set:** &lt;object-name&gt;  
Defines the name of the set.

**auth:** &lt;auth-scheme&gt; &lt;scheme-info&gt;  
Defines an authorisation scheme to be used. For a description, see the section, ['Authorisation Model'](../Authorisation/Authorisation-Model/#authorisation-model)  
&lt;auth-scheme&gt; and &lt;scheme-info&gt; can take the values listed below:

**Authorisation Schemes**

|     |     |
| --- | --- |
| **&lt;auth-scheme&gt;** | **&lt;scheme-info&gt;** |
| MD5-PW | $1$abcd4321$HyM/GVhPqXkkIMVerxxQ3z |
| PGPKEY-&lt;id&gt; | 1380K9U1 |
| SSO | dbtest \_at\_ example \_dot\_ net |

**author:** &lt;nic-handle&gt;  
References a poem author.

**aut-num:** &lt;as-number&gt;  
The autonomous system number.

**certif:** &lt;public-key&gt;  
Contains the public key for a PGP key or an X509 certificate. The value of the public key is exported from your local key ring in ASCII-armored format or the certificate from your browser. All the lines of the exported key must be included. For PGP, this includes the begin and end markers and the empty line that separates the header from the key body. For X509 certificates, this includes the BEGIN CERTIFICATE and END CERTIFICATE lines.

**components:** \[ATOMIC\] \[\[&lt;filter&gt;\] \[protocol &lt;protocol&gt; &lt;filter&gt; ...\]\]

**or:** \[ATOMIC\] \[\[&lt;ipv6-filter&gt;\] \[protocol &lt;protocol&gt; <ipv6-

filter> ...\]\]  
The "components:" attribute defines what component routes are used to form the aggregate.  
&lt;protocol&gt; is a routing protocol name such as BGP4, OSPF or RIP, and &lt;filter&gt; or &lt;ipv6-filter&gt; is a policy expression.  
Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) and [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**country:** &lt;country-code&gt;  
Identifies a country. &lt;country-code&gt; must be a valid two-letter ISO 3166 country code.

**default:** to &lt;peering&gt; \[action &lt;action&gt;\] \[networks &lt;filter&gt;\]  
Specifies default routing policies. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**descr:** &lt;freeform&gt;  
A short description that is related to the object.

**domain:** &lt;reverse-domain-name&gt;  
Reverse delegation for IPv4 or IPv6 address space.

**e-mail:** &lt;e-mail&gt;  
Specifies an email address of a person, role, organisation or IRT team.

**encryption**: PGPKEY-&lt;id&gt;  
References a **key-cert** object representing a Computer Security Incident Report Team (CSIRT) public key used to encrypt correspondence sent to the CSIRT. &lt;id&gt; is the key-id of the PGP public key in eight-digit hexadecimal format without "0x" prefix.

**export:** to &lt;peering-1&gt; \[action &lt;action-1&gt;\]  
. . .  
to &lt;peering-N&gt; \[action &lt;action-N&gt;\]  
announce &lt;filter&gt;  
Specifies an export policy expression. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**export-comps:** &lt;filter&gt; or &lt;ipv6-filter&gt;  
Specifies an RPSL filter that matches the more specifics that need to be exported outside the aggregation boundary. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) and [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**export-via:** \[protocol &lt;protocol-1&gt;\] \[into &lt;protocol-2&gt;\]

afi &lt;afi-list&gt;

&lt;peering-1&gt;

to &lt;peering-2&gt; \[action &lt;action-1&gt;; &lt;action-2&gt;; ... &lt;action-N&gt;;\]

…

&lt;peering-3&gt;

to &lt;peering-M&gt; \[action &lt;action-1&gt;; &lt;action-2&gt;; ... &lt;action-N&gt;;\]

announce &lt;filter&gt;

Specifies export policy expression for non-adjacent networks. Please refer to the [RFC on export-via](https://tools.ietf.org/html/draft-snijders-rpsl-via-03) for more information.

**fax-no:** &lt;telephone-number&gt;  
The fax number of a contact.

**filter:** &lt;filter&gt;  
Defines the set's policy filter, a logical expression which, when applied to a set of routes, returns a subset of these routes. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**filter-set:** &lt;object-name&gt;  
Defines the name of the filter. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**fingerpr:** &lt;generated&gt;  
A fingerprint of a key certificate generated by the database. Please refer to [RFC 2726](https://tools.ietf.org/html/rfc2726) for a detailed description of this attribute.

**form: FORM** &lt;string&gt;  
Specifies the identifier of a registered **poem** object.

**holes:** list of &lt;address-prefix&gt; or &lt;ipv6-address-prefix&gt;  
Lists the component address prefixes that are not reachable through the aggregate route (possibly because that part of the address space is unallocated). Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) and [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**ifaddr:** &lt;ipv4-address&gt; masklen &lt;integer&gt; \[action &lt;action&gt;\]  
Specifies an interface address within an Internet router. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**import:** \[protocol &lt;protocol-1&gt;\] \[into &lt;protocol-2&gt;\]  
from &lt;peering-1&gt; \[action &lt;action-1&gt;\]  
. . .  
from &lt;peering-N&gt; \[action &lt;action-N&gt;\]  
accept &lt;filter&gt;  
Specifies import policy expression. Please refer to RPSL RFC 2622 for more information.

**import-via:** \[protocol &lt;protocol-1&gt;\] \[into &lt;protocol-2&gt;\]

afi &lt;afi-list&gt;

&lt;peering-1&gt;

from &lt;peering-2&gt; \[action &lt;action-1&gt;; &lt;action-2&gt;; ... &lt;action-N&gt;;\]

…

&lt;peering-3&gt;

from &lt;peering-M&gt; \[action &lt;action-1&gt;; &lt;action-2&gt;; ... &lt;action-N&gt;;\]

accept (&lt;filter&gt;|&lt;filter&gt; except &lt;importexpression&gt;|

&lt;filter&gt; refine &lt;importexpression&gt;)

Specifies import policy expression for non-adjacent networks. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for import-via for more information.

**inetnum:** &lt;ipv4-address&gt; - &lt;ipv4-address&gt;  
Specifies a range of IPv4 addresses. The end address should be greater than or equal to the start address..

**inet6num:** &lt;ipv6-address&gt;/&lt;prefix-length&gt;  
Specifies a range of IPv6 addresses in prefix notation. The &lt;prefix length&gt; is an integer in the range from 0 to 128.

**inet-rtr:** &lt;domain-name&gt;  
Fully qualified DNS name of the **inet-rtr,** written without a trailing dot ".". Please refer to RPSL RFC 2622 for more information.

**inject:** \[at &lt;router-expression&gt;\]  
\[action &lt;action&gt;\]  
\[upon &lt;condition&gt;\]  
Specifies which routers perform the aggregation and when they perform it. In **route** objects, the router expression can contain only IPv4 expressions. In **route6** objects, it can only contain IPv6 expressions. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) and [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**interface:** &lt;ipv4-address&gt; or &lt;ipv6-address&gt; masklen &lt;masklen&gt; &lt;integer&gt; \[action &lt;action&gt;\]

\[tunnel &lt;remote-endpoint-address&gt;,&lt;encapsulation&gt;\]

Specifies a multiprotocol interface address within an Internet router. Please refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**irt:** &lt;irt-name&gt;  
A unique identifier of an **irt** object. The name should start with the prefix "irt-", reserved for this type of object.

**irt-nfy:** &lt;e-mail&gt;  
Specifies the email address to be notified when a reference to the **irt** object is added or removed.

**key-cert:** PGPKEY-&lt;id&gt;  
Defines the public key stored in the database. &lt;id&gt; is the ID of the PGP public key in eight-digit hexadecimal format without "0x" prefix.

**local-as:** &lt;as-number&gt;  
Specifies the autonomous system that operates the router. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**method:** &lt;generated&gt;  
Defines the type of the public key. Currently, the only methods supported are "PGP" and "X509". Please refer to [RFC 2726](https://tools.ietf.org/html/rfc2726) for detailed description of this attribute.

**member-of:** list of &lt;set-name&gt;  
This attribute can be used in the **route**, **route6, aut-num** and **inet-rtr** objects. The value of the "member-of:" attribute identifies a set object that this object wants to be a member of. This claim to membership, however, should be acknowledged by a respective "mbrs-by-ref:" attribute in the referenced object. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**members:** list of &lt;as-number&gt; _or_ &lt;as-set-name&gt;  
**or**  
**members:** list of &lt;address-prefix-range&gt;_or_  
&lt;route-set-name&gt;&lt;range-operator&gt;  
**or**  
**members:** list of &lt;inet-rtr-name&gt; _or_ &lt;rtr-set-name&gt; _or_  
&lt;ipv4 address&gt;  
 
Lists the members of the set. The first form appears in the **as-set** object. The syntax of &lt;as-set-name&gt; is the same as the syntax of &lt;object-name&gt;. The second form appears in the **route-set** object. The syntax of &lt;route-set-name&gt; is the same as the syntax of &lt;object-name&gt;. The third form appears in the **rtr-set** object. The syntax of &lt;inet-rtr-name&gt; is the same as the syntax of &lt;object-name&gt;. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**mbrs-by-ref:** list of &lt;mntner-name&gt; | ANY  
This attribute can be used in all the set objects. It allows indirect population of a set. If this attribute is used, the set also includes objects of the corresponding type (**aut-num** objects for **as-set**, for example) that are protected by one of these maintainers and whose "member-of:" attributes refer to the name of the set. If the value of a "mbrs-by-ref:" attribute is ‘ANY', any object of the corresponding type that refers to the set is a member of the set. If the "mbrs-by-ref:" attribute is missing, the set is defined explicitly by the "members:" attribute.

**mntner:** &lt;object-name&gt;  
A unique identifier of the **mntner** object.

**mnt-by:** list of &lt;mntner-name&gt;  
Specifies the identifier of a registered **mntner** object used for the authorisation of operations performed on the object containing this attribute.

**mnt-domains:** list of &lt;mntner-name&gt;

Specifies the identifier of a registered **mntner** object used for reverse domain authorisation. Controls creation of **domain** objects. The authorisation method of this **mntner** object will be used to authorise the creation of an exact match or more specific reverse **domain** object.

**mnt-irt:** list of &lt;irt-name&gt;  
May appear in an **inetnum** or **inet6num** object. It references an existing **irt** object representing a CSIRT that handles security incidents for the address space specified by the **inetnum** or **inet6num** object.

**mnt-lower:** list of &lt;mntner-name&gt;  
Specifies the identifier of a registered **mntner** object used for hierarchical authorisation. Controls creation of objects that are one level more specific in the hierarchy of an object type (i.e. **inetnum**, **inet6num**, **as-block**, **aut-num**, **route, route6** objects). The authorisation method of this **mntner** object will then be used to authorise the creation of any object one level more specific to the object that contains the "mnt-lower:" attribute.

**mnt-nfy:** &lt;e-mail&gt;  
Specifies the email address to be notified when an object protected by a **mntner** is successfully updated.

**mnt-ref:** list of &lt;mntner-name&gt;

This attribute is only in an organisation object. It specifies the **mntner** objects that can authorise the addition of references to the **organisation** object from other objects.

**mnt-routes:** &lt;mnt-name&gt; \[ { list of &lt;address-prefix-range&gt; } | ANY \]  
May be used in an **aut-num**, **inetnum**, **inet6num**, **route** or **route6** object. Specifies the identifier of a registered **mntner** object that controls the authorisation of the creation of **route** and **route6** objects. After the reference to the maintainer, an optional list of prefix ranges inside of curly brackets ‘{}' or the keyword ‘ANY' may follow. The default, when no additional set items are specified, is ‘ANY' or all more specifics. The address prefix range can contain only IPv4 prefix ranges in **inetnum** and **route** objects, only IPv6 prefix ranges in **inet6num** and **route6** objects, and it can contain both IPv4 and IPv6 prefix ranges in **aut-num** objects. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) and [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-default**: to &lt;peering&gt; \[action &lt;action&gt;\] \[networks &lt;filter&gt;\]

Specifies default multiprotocol routing policies. Please refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-export:**

\[protocol &lt;protocol-1&gt;\] \[into &lt;protocol-1&gt;\]

afi &lt;afi-list&gt;

to &lt;peering-1&gt; \[action &lt;action-1&gt;\]

.

.

.

to &lt;peering-N&gt; \[action &lt;action-N&gt;\]

announce &lt;filter&gt;

Specifies a multiprotocol export policy expression. Please refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-filter:**

Defines the set's multiprotocol policy filter. Please refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-import:** \[protocol &lt;protocol-1&gt;\] \[into &lt;protocol-1&gt;\]

afi &lt;afi-list&gt;

from &lt;peering-1&gt; \[action &lt;action-1&gt;\]

.

.

.

from &lt;peering-N&gt; \[action &lt;action-N&gt;\]

accept (&lt;filter&gt;|&lt;filter&gt; except &lt;importexpression&gt;|

&lt;filter&gt; refine &lt;importexpression&gt;)

Specifies multiprotocol import policy expression. Please refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-members:** afi &lt;afi-list&gt; list of &lt;address-prefix-range&gt; or

&lt;route-set-name&gt; or

&lt;route-set-name&gt;&lt;range-operator&gt;

Lists the multiprotocol members of the set. Refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-peer:** &lt;protocol&gt; afi &lt;afi&gt; &lt;ipv4- or ipv6- address&gt; &lt;options&gt;

| &lt;protocol&gt; &lt;inet-rtr-name&gt; &lt;options&gt;

| &lt;protocol&gt; &lt;rtr-set-name&gt; &lt;options&gt;

| &lt;protocol&gt; &lt;peering-set-name&gt; &lt;options&gt;

Specifies the details of any (interior or exterior) multiprotocol router peerings. Please refer to [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**mp-peering:** &lt;as-expression&gt; \[&lt;mp-router-expression-1&gt;\] \[at &lt;mp-router-expression-2&gt;\] | &lt;peering-set-name&gt;

Defines a multiprotocol peering that can be used for importing or exporting routes. Please see [RPSLng RFC 4012](https://tools.ietf.org/html/rfc4012) for more information.

**netname:** &lt;netname&gt;  
Specifies the name of a range of IP address space. The syntax of the &lt;netname&gt; attribute is the same as the syntax of the &lt;object-name&gt; attribute, but it does not have a restriction on RPSL-reserved prefixes.

**nic-hdl:** &lt;nic-handle&gt;  
Specifies the NIC handle of a **role** or **person** object. When creating an object, one can also specify an "AUTO" NIC handle by setting the value of the attribute to "AUTO-1" or AUTO-1 &lt;initials&gt;. In these cases, the database software will assign the NIC handle automatically.

**notify:** &lt;e-mail&gt;  
Specifies the email address to which notifications of changes to this object should be sent.

**nserver:** &lt;domain-name&gt; \[ &lt;ipv4-address&gt; | &lt;ipv6-address&gt; \]  
Specifies the name servers of the domain, optionally followed by a glue record.

**org:** &lt;org-id&gt;

This optional attribute may be used in any object type. It references an existing **organisation** object. For some resource objects, it is a required attribute. In these cases, the referenced organisation object represents the entity that holds the resource. In other objects, it can be used to specify a business relationship. The value of this attribute is the ID of the **organisation** object. It is required in the **inetnum** and **inet6num** objects with ‘ALLOCATED-BY-RIR', ‘ALLOCATED PA', ‘ALLOCATED PI' and ‘ALLOCATED UNSPECIFIED' status values.

The "org:" attribute is single-valued in the **inetnum**, **inet6num** and **aut-num** objects, and it is multi-valued in all other objects.

**org-name:** &lt;organisation-name&gt;

Specifies the name of the organisation that this **organisation** object represents in the RIPE Database. This is an ASCII-only text attribute. This restriction is because the attribute is a look-up key and the RIPE Database protocol does not allow specifying character sets in queries. The user can put the name of the organisation using Latin 1 character set in the "descr:" attribute if required. But any use of non-ASCII characters in any object may cause problems during the update process.

**org-type:**

Specifies the type of the organisation. The possible values are shown in the section ['Description of the ORGANIZATION Object'](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-organisation-object)'.

**organisation**: &lt;org-id&gt;

Specifies the ID of an organisation object. When creating this object, the value of this attribute is automatically generated. The user has to specify an "AUTO" ID by setting the value to "AUTO-1" or "AUTO-1&lt;letterCombination&gt;, so that the database will assign the ID automatically.

**origin:** &lt;as-number&gt;  
Specifies the AS Number that originates the route. The corresponding **aut-num** object should exist in the database.

**owner:** &lt;generated&gt;  
Specifies the owner of the public key. Please refer to [RFC 2726](https://tools.ietf.org/html/rfc2726) for a detailed description of this attribute.

|     |     |     |
| --- | --- | --- |
| peer: |     | &lt;protocol&gt;&lt;ipv4-address&gt;&lt;options&gt; |
|     |     | &lt;protocol&gt;&lt;inet-rtr-name&gt;&lt;options&gt; |
|     |     | &lt;protocol&gt;&lt;rtr-set-name&gt;&lt;options&gt; |
|     |     | &lt;protocol&gt;&lt;peering-set-name&gt;&lt;options&gt; |

May appear in an **inet-rtr** object. Specifies a protocol peering with another router. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**peering:** &lt;peering&gt;  
Defines a peering that can be used for importing or exporting routes. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**peering-set:** &lt;object-name&gt;  
Specifies the name of the peering-set. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**person:** &lt;person-name&gt;  
Specifies the full name of an administrative, technical or zone contact person for other objects in the database.

**peering-set:** &lt;object-name&gt;  
Specifies the name of the peering-set. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**phone:** &lt;telephone-number&gt;  
Specifies a telephone number of the contact.

**poem:** POEM &lt;string&gt;  
Specifies the title of a poem.

**poetic-form:** FORM &lt;string&gt;  
Specifies the poem type.

**ref-nfy:** &lt;e-mail&gt;  
Specifies the email address, as defined in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt), to be notified when a reference to the **organisation** object is added or removed.

**remarks:** &lt;freeform&gt;  
Contains remarks.

**role:** &lt;role-name&gt;  
Specifies the full name of a role entity, e.g. RIPE DBM.

**role-name:** &lt;role-name&gt;

Specifies the name of the role in the RIPE Database. This is an ASCII-only text attribute. This restriction is because the attribute is a look-up key and the RIPE Database protocol does not allow specifying character sets in queries. Any use of non-ASCII characters in any object may cause problems during the update process.

**route:** &lt;address-prefix&gt;  
Specifies the prefix of the interAS route. Together with the "origin:" attribute, it constitutes a primary key of the **route** object.

**route6:** &lt;ipv6-address&gt;/&lt;prefix-length&gt;  
Specifies an IPv6 prefix. The &lt;prefix length&gt; is an integer in the range from 0 to 128. This is the prefix of the interAS route. Together with the "origin:" attribute, it constitutes a primary key of the **route6** object.

**route-set:** &lt;object-name&gt;  
Specifies the name of the route set. It is a primary key for the **route-set** object. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**rtr-set:** &lt;object-name&gt;  
Defines the name of the **rtr-set**. Please refer to [RPSL RFC 2622](https://tools.ietf.org/html/rfc2622) for more information.

**signature:** PGPKEY-&lt;id&gt;  
References a **key-cert** object representing a CSIRT public key used by the team to sign their correspondence. &lt;id&gt; is the key-id of the PGP public key in eight-digit hexadecimal format without "0x" prefix.

**source:** &lt;registry-name&gt;  
Specifies the registry where the object is registered. This should be "RIPE" for the RIPE Database.

**status:** &lt;status&gt;  
Specifies the status of the address range represented by an **inetnum** or **inet6num** object or the status of an AS Number represented by an **aut-num** object. For the possible values, see the sections ['Description of the INETNUM Object'](../RPSL-Object-Types/Descriptions-of-Primary-Objects/#description-of-the-inetnum-object), ['Description of the INET6NUM Object'](../RPSL-Object-Types/Descriptions-of-Primary-Objects/#description-of-the-inet6num-object) and ['Description of the AUT-NUM Object'](../RPSL-Object-Types/Descriptions-of-Primary-Objects/#description-of-the-aut-num-object).

Please refer to the RIPE Document ripe-622, ["IPv4 Address Allocation and Assignment Policies in the RIPE NCC Service Region"](https://www.ripe.net/ripe/docs/ipv4-policies), for further information.

**tech-c:** &lt;nic-handle&gt;  
References a technical contact.

**text:** &lt;freeform&gt;  
Contains text of the poem. Should be humorous, but must not be malicious or insulting.

**upd-to:** &lt;e-mail&gt;  
Specifies the email address to be notified when an object protected by a **mntner** is unsuccessfully updated. See also the section, ['Notifications'](../Notifications/#notifications)'.

**zone-c:** &lt;nic-handle&gt;  
References a zone contact.
