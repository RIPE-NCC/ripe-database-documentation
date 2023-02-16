# Requesting Secure Delegation


## ENUM-Domain
### ENUM

ENUM is a protocol that is the result of work of the Internet Engineering Task Force's (IETF's) Telephone Number Mapping Working Group. The charter of this working group was to define a Domain Name System (DNS)-based architecture and protocols for mapping a telephone number to a Unirform Resource Identifier (URI) which can be used to contact a resource associated with that number.

The RIPE NCC provides DNS operations for [e164.arpa](https://www.rfc-editor.org/rfc/rfc3761.html) zone(ENUM) is accordance with the Instructions from the [Internet Architecture Board](https://www.ripe.net/manage-ips-and-asns/dns/enum/iab-instructions).

### Requesting Secure Delegation in the ENUM Domain

**Example of an ENUM domain object, including a "ds-rdata:" attribute**

    domain:     1.3.e164.arpa
    descr:      Stichting ENUM Nederland
    org:        ORG-SEN3-RIPE
    admin-c:    MD6066-RIPE
    tech-c:     ENT6-RIPE
    zone-c:     ENT6-RIPE
    nserver:    ns1.enum.nl
    nserver:    ns7.domain-registry.nl
    ds-rdata:   10567    5   1   8f138cd3e55db6590f51fe47e390a2d1743b5bd4
    mnt-by:     ENUM-NL-MNT
    source:     RIPE # Filtered

#### The four steps to updating an ENUM delegation to have a secure DS record in e164.arpa

1. Setup you server to serve a secure zone

    Ensure that the zone you are serving is signed and it contains a Key Signing Key (KSK) marked with the SEP flag.

1. Create your **domain** object

    The "ds-rdata:" attribute of your domain object should be created by performing a hash over the SEP KSK key. An easy way to create a domain object which includes the ds-rdata: hash is to visit the [RIPE NCC Delegation Checker](http://dnscheck.ripe.net/), input your zone name and follow the instructions provided. The end result will be a **domain** object you can use in the next step.

1. Submitting the **domain** object
    Once you have set up your sever(s) to serve the ENUM zones you are ready to request delegation by submitting a **domain** object:
    1. By using [webupdates](https://apps.db.ripe.net/db-web-ui/query)
        * First authorise yourself in the authorisation section. Then go to the add section
        * Select **domain**, by clicking on 'Create a New Object' and then click on 'Add Object'
        * Fill in all the available fields
        * Use the 'Add New Field' feature to add at least two "nserver:" attributes. Here, you supply the names of the name servers that are serving the zones as set up in Step 3 and that you have specified in the NS resource records of those zones
        * For the "mnt-by:" attribute use the **mntner** you prepared in Step 1
    1. By email
        You need to create a **domain** object containing information about the zone you need reverse delegation for. For further information go [here](../06.Update-Methods/04-Email-Updates.md#email-updates)

    1. Verifying the setup
        Once you have submitted the **domain** object you will receive a notification.

        You should then be able to query for your object in the RIPE Database:
            whois -h whois.ripe.net 1.3.e164.arpa
        After the object appears in the RIPE Database it may take between 15 and 60 minutes before the delegation information is available in the DNS.

        The ultimate test is to query a recursive name server that is not authoritative for your zone for a record from your zone.

        Please [contact us](https://www.ripe.net/contact-form?topic=ripe_dbm) if, six hours after the appearance of your **domain** object in the database, your delegation does not appear. Include the details such as name server addresses and the **domain** object in your request. Also include the full response, including headers, as received from the database.

        Any resolver which has the [DNSSEC](#dnssec-delegations) public key for e164.arpa configured should now return DNS answers which have the authenticated data bit set.

#### Additional Notes

From time to time, you may have to roll the keys in your zone. When you do this, make sure that you also update the ds-rdata information. This places a new DS record in the parent zone.

For further details on rolling keys and other important information on [DNSSEC](#dnssec-delegations) operational practices we recommend reading [RFC 4641](https://www.ietf.org/rfc/rfc4641.txt).



## DNSSEC Delegations
This procedure is in addition to the normal procedure for requesting reverse delegations.


### The DOMAIN Object
You can request reverse delegation by submitting **domain** objects. DNSSEC will not mean any change the existing authorisation mechanisms. The [delegation checker](http://dnscheck.ripe.net/) will only carry out DNSSEC specific tests if DNSSEC related information is being exchanged.

To allow for the exchange of DNSSEC related information, the **domain** object now includes a ["ds-rdata:" attribute](../04.RPSL-Object-Types/02-Descriptions-of-Primary-Objects.md#description-of-the-domain-object). 


### Delegation Checks
When it receives an update, the update engine will perform a number of checks. These are the most important:

* Is there a matching DNSKEY available in the DNS for each "ds-rdata:" attribute that is submitted in the **domain** object?
* Is there a valid RRSIG made with the DNSKEY matching the "ds-rdata:"? - [The resolution protocol](http://www.ietf.org/rfc/rfc4035.txt) needs this, without it the update will fail.
* Does the DNSKEY has its "SEP" flag set? Setting the SEP flag is not mandatory. If it is not set, a warning will be produced, however the "ds-rdata:" content will still be copied to the zone.
* Is the signature validity period close to expiring and are the Times To Live (TTLs) a reasonable fraction of the signature validity period? We suggest the Maximum Zone TTL of your zone data to be a fraction of your signature validity period. If the TTL would be of similar order as the signature validity period, then all RRsets fetched during the validity period would be cached until the signature expiration time. Section 7.1 of [Resource Records for the DNS Security Extension](http://www.ietf.org/rfc/rfc4034.txt) suggests that "the resolver may use the time remaining before expiration of the signature validity period of a signed RRset as an upper bound for the TTL". As a result query load on authoritative servers would peak at signature expiration time, as this is also the time at which records simultaneously expire from caches. To avoid query load peaks we suggest the TTL on all the RRs in your zone to be at least a few times smaller than your signature validity period. We currently test on the TTL being at least two times smaller than the signature validity period.

These tests will only be done for "ds-rdata:" attributes using supported digest types, [section 5.1.3 from RFC4033](https://www.ietf.org/rfc/rfc4033.txt). Currently we support digest type 1(SHA1).

If the "ds-rdata:" attribute uses an unsupported digest type, you will see a warning message, however the "ds-rdata:" content will still be copied into the parent zone.

