---
permalink: /Database-Support/Configuring-Reverse-DNS
---

# Configuring Reverse DNS

**Computer networks use the Domain Name System (DNS) to determine the IP address associated with a domain name. This process is also known as forward DNS resolution. Reverse DNS (rDNS) is the inverse process of this: the resolution of an IP address to its designated domain name. This document explains how reverse DNS works and how to configure it for your zone**

## Reverse DNS Overview

The reverse DNS database of the Internet works with a hierarchical tree of servers, just like forward DNS. It is rooted in the Address and Routing Parameter Area (arpa) top-level domain of the Internet. One level below the arpa root are the delegated servers in-addr.arpa for IPv4 and ip6.arpa for IPv6.

Further down the tree, there are delegations for the /8 blocks that IANA allocated to the RIRs, the allocations that the RIRs gave to the address holders, all the way down to the individual IP addresses and names that you have configured for your Internet-enabled hosts. The process of reverse resolving an IP address uses the pointer DNS record type (PTR record).

![](~@imgs/forwardreversedns.png)

In order to do a DNS lookup for data that is associated with a certain IP address, you should map the IP addresses into the DNS name hierarchy. This means that, as an address holder, you will have to configure two things. Forst, you have to configure your zone for reverse DNS. Second, you have to request reverse delegation of your zone. The second part is one by creating a **domain** bject in the RIPE Database.

Before you can submit the **domain** object to the RIPE Database, you will first have to configure reverse DNS for your zone on at least two name servers. Upon submission, the RIPE Database will perform checks to see if your name servers are configured properly. If so, delegation will be propagated to the DNS by the RIPE NCC's name servers.


### Mapping IP addresses into the DNS name hierarchy

For IPv4, the mapping of the reverse address space can only happen on "byte" boundaries, i.e. multiples of 8 bits. This means that you should take the four octets - the decimal numbers between the dots - of an IP address range, put them in reverse order and then map them into the in-addr.arpa domain.

For example, an address (A) record for mail.example.com points to the IP address 192.0.2.5. In pointer record of the reverse database, this IP address is stored as the domain name 5.2.0.192.in-addr.arpa. pointing back to its designated host name mail.example.com. The resulting PTR record would look like this:

    5.2.0.192.in-addr.arpa. 3600 IN PTR mail.example.com

Reverse DNS for IPv6 uses the hexadecimal notation on "nibble" boundaries, i.e. multiples of 4 bits. This means you should take the IPv6 address, expand all the zerps, put each hexadecimal number in reverse order and map them into the ip6.arpa domain.

For example, the pointer domain name corresponding to the IPv6 address 2001:db8::567:89ab is b.a.9.8.7.6.5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa., which would result in this PTR record:

    b.a.9.8.7.6.5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa. 3600 IN PTR mail.example.com.


### Dealing with multiple zones for one address block

Because the particular mapping delegation of reverse address space can only happen on byte boundaries for IPv4 and nibble boundaries for IPv6, you could be dealing with multiple zones for one address block.

**IPv4**
One or more /24 type zones need to be created if your address space has a prefix length between /17 and /24. If your prefix length is between /16 and /9 you will have to request one or more delegations for /16 type zones.

For example, if you have been allocated 10.155.16.0/22, you need to create four reverse zones:

    16.155.10.in-addr.arpa.
    17.155.10.in-addr.arpa.
    18.155.10.in-addr.arpa.
    19.155.10.in-addr.arpa.


**IPv6**
If you have been allocated an IPv6 block that is not on a nibble boundary, you will need to go down to the next nibble and create multiple zones to cover the entire block.

For example, an allocation such as 2001:db8::/29 will result in eight reverse zones of /32 each:

    8.b.d.0.1.0.0.2.ip6.arpa.
    9.b.d.0.1.0.0.2.ip6.arpa.
    a.b.d.0.1.0.0.2.ip6.arpa.
    b.b.d.0.1.0.0.2.ip6.arpa.
    c.b.d.0.1.0.0.2.ip6.arpa.
    d.b.d.0.1.0.0.2.ip6.arpa.
    e.b.d.0.1.0.0.2.ip6.arpa.
    f.b.d.0.1.0.0.2.ip6.arpa.



## Creating DOMAIN Objects for Reverse DNS


### Step 1: Set up authorisation
The creation and maintenance of **domain** objects must be handled by a designated maintainer. You can use an existing maintainer or create a specific one for the people who will be creating and managing **domain** objects. You should refer to this maintainer using the "mnt-domains:" attribute in **inetnum** object for the address block that you hold. You will be able to add the "mnt-domains:" attribute in the RIPE Database, for example using [webupdates](https://apps.db.ripe.net/db-web-ui/query). If you are an LIR, you may need to select your [default maintainer](../Database-Support/Database-Security/#the-default-maintainer) first, before you can add this attribute.

### Step 2: Configure your DNS server
Configure your DNS servers in such a way that you will pass all the tests that we will perform. Here are some recommendations to help you:

* Make sure you set up at least two name servers that are authoritative for the zone
* Ensure that the servers are at least in different subnets, but preferably in different networks that are geographically distributed.
* The resolvable names of these name servers should be in the NS resource records of the zone.
* The SOA resource record (RR) should have the same content, both serial number and other data, on all the name servers.
* The SOA should contain a valid "RNAME" (the contact address)
* The timing parameters should be reasonable

When you are satisfied with your configuration, we recommend that you perform a test fo your setup using the [DNSCheck](https://dnscheck.ripe.net/domain_check) tool so you can find and resolve any problems.


### Step 3a: Create your domain objects using webupdates
When you submit a **domain** object you are requesting reverse delegation, asking the RIPE NCC to enter NS records pointing to your name servers in RIPE NCC's parent zone. The **domain** object has the following mandatory attributes:

    domain:   <zone name>
    admin-c:  <nic-handle for administrative contact>
    tech-c:   <nic-handle for technical contact>
    zone-c:   <nic-handle for zone contact>
    nserver:  <primary name server>
    nserver:  <secondary name server>
    mnt-by:   <your maintainer>
    source:   RIPE

In the [web interface](https://apps.db.ripe.net/db-web-ui/webupdates/select) for the RIPE Database, there is a wizard that will automatically create one or more **domain** objects for you. It allows you to fill in an IPv4 or IPv6 prefix and the wizard will take care of creating one or multiple reverse zones out of it. After filling in your name servers, the wizard will also perform a basic check to see if the name servers are online. The full set of tests will happen after you submit the form. A [one-minute video](https://www.youtube.com/watch?v=7JzapYkca-Y&ab_channel=RIPENCC) with a demonstration is available online.


![](~@imgs/create_domain_object.png)

After you have entered all of the required fields you can submit the form. Depending on the amount of **domain** objects that are going to be created, it can take up to several minutes for the process to complete. The tests return log level information, categorised as INFO, NOTICE, WARNING, ERROR and CRITICAL. We reject any update that has ERROR or CRITICAL for any test. If this happens to you, resolve the problem and try completing the wizard again.

If the update was successful, the success page will show you the first couple of **domain** objects that were created, along with a link to the full list. Still, it may take up to 24 hours before the delegation information is available in the DNS. The ultimate test is to query a recursive name server that is not authoritative for your zone for a record from your zone.


### Step 3b: Create your domain objects using syncupdates, email or the API
If you choose to create **domain** objects using syncupdates, email or the API, you will first need to chop your address block into "chunks" that can be delegated. For example, if you have been allocated 10.155.16/22, you need to create four reverse zones:

    16.155.10.in-addr.arpa.
    17.155.10.in-addr.arpa.
    18.155.10.in-addr.arpa.
    19.155.10.in-addr.arpa.

In the "domain:" attribute, you specify the name of the reverse zone, e.g. "16.155.10.in-addr.arpa". As discussed, you will have to do this for each "chunk" you have created. If you need reverse delegation for a /22 block, you will need to create four **domain** objects, one for each /24.

Enter all other attributes and submit your **domain** object to the RIPE Database. After verifying syntax and authorisation, we will perform a number of tests to see if you configured reverse DNS correctly. The tests return log level information, categorised as INFO, NOTICE, WARNING, ERROR and CRITICAL. We reject any update that has ERROR or CRITICAL for any test. If this happens to you, resolve the problem and try submitting the **domain** object again.

If the update was successful, you should then be able to query for your object in the RIPE Database. Still, it may take up to 24 hours before the delegation information is available in the DNS. The ultimate test is to query a recursive name server that is not authoritative for your zone for a record from your zone.


## Requesting DNSSEC Delegations

To allow for the exchange of DNSSEC-related information, the **domain** object includes a "ds-rdata:" attribute.

In DNSSEC, the Delegation Signer (DS) resource record is created from a DNSkey resource record by comparing it with the public key. The parent publishes the DS resource record. The "ds-rdata:" attribute contains the RDATA of the DS resource records related to the domain, as shown in the "domain:" attribute.

    ds-rdata: 64431 5 1 278BF194C29A812B33935BB2517E17D1486210FA

The tools provided with BIND (version 9.3.0 and later) will generate a "ds set" during signing. You should copy the DS RDATA into the "ds-data:" attributes.

When we receive a **domain** object with DNSSEC-related information, we will carry out [additional tests](../Authorisation/Request-DNSSEC-delegation/#delegation-checks).


## Automated update of DNSSEC Delegations

Whenever you want to change the DNSSEC key whose digest is in the "ds-rdata:" attribute, it is necessary to update the attribute. This can be done manually using any means of RIPE Database update methods or automatically using a special Child Delegation Signed (CDS) DNS record. This procedure works as follows:

* The reverse domain has to be already DNSSEC-secured.
* Whenever a change in "ds-rdata:" attribute is required, you should publish a CDS record at the apex (root) of your reverse zone.
* RIPE NCC regularly scans all DNSSEC-secured reverse domains for CDS records.
* If a CDS record is found whose contents differ from the current "ds-rdata:" attribute and all safety measures (see below) are fulfilled, RIPE NCC will update the **domain** object on your behalf.

There are some additional requirements mandated by RFC 7344 in order to ensure the process is hardened against accidents and abuse:

* The CDS record set is properly signed by a key represented in the DS record of the parent zone. This usually means that the CDS record set has to be signed by Key-Signing Key (KSK) instead of Zone-Signing Key (ZSK).
* Applying the CDS record must not break the DNSSEC delegation. Therefore for each DNSSEC algorithm present in the CDS record set, there has to be at least one matching key in the DNSKEY record set with a proper signature.
* The inception date of the DNSSEC signature of the CDS record set must not be older than the date stored in the "last- modified:" attribute of the **domain** object.

It is also possible to switch to insecure delegation by publishing a special CDS record containing "0 0 0 00". Please note that this is a one way process. Once the reverse domain is switched to insecure, you have to add the "ds-rdata:" attribute manually to activate DNSSEC again.


## Reverse DNS Troubleshooting

Here is an overview of the most common warnings and errors that the reverse delegation checker reports, along with the likely causes and suggested solutions.

| **Error**                                                                                                                                                                                  | **Likely cause and suggested solution**                                                                                                                                                                                                                                                                                                                                                                                                                   |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **ERROR**: No SOA RR were found.                                                                                                                                                           | No Start of Authority records were found. This tends to indicate that the nominated name servers are not replying correctly for the zone in question. Usually, the fix for this involves reloading all of the name servers.                                                                                                                                                                                                                               |
| **WARNING**: some of the specified name servers appear to be in the same subnet. According to [RFC 2182](https://www.rfc-editor.org/rfc/rfc2182), they should be geographically separated. | If you supply two or more name servers that appear to be in the same physical location, this warning is a reminder that the zone may not be visible if your connection to the Internet fails. We highly recommend that you have multiple geographically distributed secondary name servers.                                                                                                                                                               |
| **ERROR**: NS RR for abc.b.c.d found on xyz.b.c.d but not in template.                                                                                                                     | The machine abc.b.c.d is reported to be a name server for this domain by the machine xyz.b.c.d, but you did not list abc.b.c.d when submitting the **domain** object.                                                                                                                                                                                                                                                                                     |
| **ERROR**: nserver: a.b.c.d **ERROR**: The specified name server is not responding                                                                                                         | The name server a.b.c.d has failed to respond because: * a name server process is not running on port 53; or * the name server does not accept both UDP and TCP port 53 queries; or * the name server process is running on the given host but has not been loaded with information about itself  Correct your name server or firewall/router configuration and resubmit the **domain** object.                                                           |
| **ERROR**: cross-check of listed NS RR failed.                                                                                                                                             | The name servers on both zones should be the same.                                                                                                                                                                                                                                                                                                                                                                                                        |
| **ERROR**: SOA on "machine1.b.c.d" does not match SOA on "machine2.b.c.d".                                                                                                                 | Some of the name servers supplied could not be contacted, or some of them failed to respond appropriately, i.e. there may not be a name server running on the hosts, or they may not know about the zone in question. This message is also generated when the list of name servers that you supply does not match the list of name servers that you set up. The comparison is done on a textual basis, meaning that supplying IP addresses will not work. |
| I'm sure my zone is set up correctly, but the RIPE Database just won't accept my **domain** object!                                                                                        | You can always [contact us](https://www.ripe.net/support/contact) for help, but we suggest that you first read [RFC 1912 - Common DNS Operational and Configuration Errors](https://www.ietf.org/rfc/rfc1912.txt)                                                                                                                                                                                                                                         |


