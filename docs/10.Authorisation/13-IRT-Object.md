---
permalink: /Authorisation/IRT-Object
lastUpdated: 1688637236000
prev:
  text: 12 Referencing an IRT Object
  link: /Authorisation/12-Referencing-an-IRT-Object/
next:
  text: 14 Force Delete Functionality
  link: /Authorisation/14-Force-Delete-Functionality/
---

# IRT Object

**IRT**: **I**ncident **R**esponse **T**eam - handles security incidents and/or cases of abuse of omputer networks or its components.

**TI**: **T**rusted **I**ntroducer - this service is a trustbroker for IRTs. [More information](http://www.trusted-introducer.org/)


## How to Create an IRT Object
### Manual creation
#### Requirements
If you are an IRT and want to create an **irt** object in the RIPE Database, you need to following:

* A maintainer for that object. This should be a **mntner** object in the RIPE Database
* A **key-cert** object in the RIPE Database containing a public PGP key
* An IP address (range) for which you are responsible as an IRT. This should be in the form of an **inet(6)num** object in the RIPE Database.
* Any other information that is mandatory for an **irt** object

#### The Maintainer (MNTNER object)
A maintainer of an object in the RIPE Database is an entity, which can alone make changes to that object. A **mntner** object represents the maintainer. The maintainer authenticates change request either by using a PGP-Key, password or SSO account as specified in "auth:" attribute.

If you as a team are responsible for a range of IP addresses, there almost certainly will be an **inet(6)num** object in the database. The maintainer of this object can also maintain your **irt** object.

The RIPE NCC will not create a **mntner** object just for maintenance of an **irt** object.


#### The PGP Key and the KEY-CERT Object
A PGP key for secure email communication is mandatory for an IRT to create an **irt** object. Before creating one, you will have to create a **key-cert** object matching your PGP key in the RIPE Database.

You can create one by sending a completed template by email to [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net)

**Here is an example:**

    key-cert:     PGPKEY-6DFC4771
    method:       PGP
    owner:        DFN-CERT (2003), ENCRYPTION Key 
    fingerpr:     E8 A7 18 F7 DF 3D 19 64  8D 26 C4 CC BF 2F 0C C4
    certif:       -----BEGIN PGP PUBLIC KEY BLOCK-----
    certif:       Version: PGP Key Server 0.9.5
    certif:
    certif:       mQENAz3SIaUAAAEIAKze7wWJ9BDa3iDcQpxZ9+YSVxq+j1prWPsnINMm8GyTMU2H

    [...]

    certif:       epPs4s0AnjV6ncb6BrbHiU+zeVY8tcW1bopeAJ0VuW0D/+3joueFiL7fDGSV6KPu
    certif:       Uw==
    certif:       =DKvl
    certif:       -----END PGP PUBLIC KEY BLOCK-----
    mnt-by:       TRUSTED-INTRODUCER-MNT
    notify:       tiirt@stelvio.nl
    notify:       dfncert@cert.dfn.de
    source:       RIPE

As you can see, you also need a **mntner** for the **key-cert** object.

These are the fields of a **key-cert** object:

    key-cert:       [mandatory]   [single]     [primary/lookup key]
    method:         [generated]   [single]     [ ]
    owner:          [generated]   [multiple]   [ ]
    fingerpr:       [generated]   [single]     [inverse key]
    certif:         [mandatory]   [multiple]   [ ]
    org:            [optional]    [multiple]   [inverse key]
    remarks:        [optional]    [multiple]   [ ]
    notify:         [optional]    [multiple]   [inverse key]
    admin-c:        [optional]    [multiple]   [inverse key]
    tech-c:         [optional]    [multiple]   [inverse key]
    mnt-by:         [mandatory]   [multiple]   [inverse key]
    created:        [generated]   [single]     [ ]
    last-modified:  [generated]   [single]     [ ]
    source:         [mandatory]   [single]     [ ]

You can use the text above as a template.


#### The Creation Process

You start the process of creating an **irt** object by sending a completed template by e-mail to the RIPE NCC. As creation of an **irt** object is a manual process, you should address your email to [ripe-dbm@ripe.net](mailto:ripe-dbm@ripe.net)

In your mail, you need to explain why you want to create a new **irt** object. To prevent misuse of the object, the RIPE NCC will need to check your request, so include a full explanation. A good idea is the listing of the **inet(6)num** objects you, as an IRT, are responsible for and from which you want to link to from your new **irt** object.

You will get a reply from the RIPE NCC asking you to acknowledge your request.


### Creation Through the Trusted Introducer (TI) Service
You need to become a TI accredited team. The TI will register and maintain your **IRT** object.

**Here is an example:**

This is the body of an example e-mail with which the TI creates object for a newly accredited team:

    -----BEGIN PGP SIGNED MESSAGE-----
    Hash: SHA1
    
    irt:        IRT-TCERT
    address:    Telia AB, HQ
    address:    TeliaCERT
    address:    SE-123 86 Farsta
    address:    Sweden
    phone:      +46 8 713 1872
    fax-no:     +46 706 175 101
    e-mail:     tcert@telia.se
    signature:  PGPKEY-D47485CF
    encryption: PGPKEY-D47485CF
    admin-c:    TI123-RIPE
    tech-c:     TI123-RIPE
    auth:       PGPKEY-D47485CF
    remarks:    Emergency telephone number +46 8 713 1872 (GMT+1/GMT+2 with DST)
    remarks:    http://www.trusted-introducer.org/teams/tcert.html
    remarks:    This is an accredited IRT (level 2)
    irt-nfy:    tcert@telia.se
    notify:     tiirt@s-cure.nl
    notify:     tcert@telia.se
    mnt-by:     TRUSTED-INTRODUCER-MNT
    source:     RIPE
    
    -----BEGIN PGP SIGNATURE-----
    Version: GnuPG v1.2.1 (MingW32) - WinPT 0.5.13
    
    iD8DBQE/O1yZHxjOrs1gxBcRAn5TAJ9lBL4op6txrM17m1SF1pIIjptTTgCcCt4n
    P0fRecfQHzFxhvASPKfTt1Q=
    =Q9fl
    -----END PGP SIGNATURE-----


## How to Link INET(6)NUM Objects to an IRT Object
### Requirements

To link an **inet(6)num** object to an **irt** object you need:

* The authorisation of the team the **irt** object belongs to
* The authorisation of the maintainer of the **inet(6)num** object

Authorisation can be provided by a PGP signature, password or SSO account. All possibilities are represented by the "auth:" field in the **irt** object.


### Link a Single INET(6)NUM Object to an IRT Object

This is done by sending an email to [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net). You provide the **inet(6)num** object with the necessary changes. In most cases you just need to add a "mnt-irt:" attribute.

**Here is an example:**

An inet(6)num object as you find it in the RIPE Database before the change:

    inetnum:        193.174.13.0 - 193.174.13.255
    netname:        DFNCERT-NET
    descr:          DFN-CERT  Zentrum fuer sichere Netzdienste GmbH
    country:        DE
    admin-c:        KM4692-RIPE
    tech-c:         KM4692-RIPE
    status:         ASSIGNED PA
    mnt-by:         DFN-LIR-MNT
    created:        2022-08-14T11:48:28Z
    last-modified:  2022-10-25T12:22:39Z 
    source:         RIPE

And this is the same object linked to an irt object:

    inetnum:        193.174.13.0 - 193.174.13.255
    netname:        DFNCERT-NET
    descr:          DFN-CERT  Zentrum fuer sichere Netzdienste GmbH
    country:        DE
    admin-c:        KM4692-RIPE
    tech-c:         KM4692-RIPE
    status:         ASSIGNED PA
    mnt-by:         DFN-LIR-MNT
    mnt-irt:        IRT-DFN-CERT
    created:        2022-08-14T11:48:28Z
    last-modified:  2022-10-25T12:22:39Z 
    source:         RIPE


Now both the team and the maintainer of the **inet(6)num** object have to authorise the link request.


#### If Both Parties Use (different) PGP Keys for Authorisation

Both need to sign the request -mail. It does not matter in which order this signing occurs as long as both parties sign the request.


#### If Only One Party Uses a password or SSO for Authorisation

In this case, whoever is using PGP should initially sign the request and send it to the other. They forward it to the RIPE NCC, together with their password. This maintains password confidentiality. It is strongly recommended that anyone using passwords, switch to PGP authentication. It is a more secure way to handle requests made to the RIPE NCC.

If using SSO for authentication, then login to RIPE NCC access and send the request using Syncupdate.


#### If Both Parties Use Password or SSO Authorisation
In this case, at least one, if not both parties should consider switching to PGP authentication.


#### If the IRT Object and INET(6)NUM Object are Maintained by the Same Maintainer
In this case, the process is straightforward.


### Step-by-Step Guide
How to link a single **inet(6)num** object to a single **irt** object.

Exact the **inet(6)num** object from the RIPE Database:

    whois -h whois.ripe.net -r <ipadress> > inetnum.txt

Alternatively you can search for any other entry in that object with -i, for example for the "mntner:" attribute.

    whois -h whois.ripe.net -i mnt-by <mntner-name> > inetnum.txt


**Here is an example:**

    $ whois -h whois.ripe.net -r 193.174.13.99 > inetnum.txt
    
    $ cat inetnum.txt
    
    inetnum:        193.174.13.0 - 193.174.13.255
    netname:        DFNCERT-NET
    descr:          DFN-CERT  Zentrum fuer sichere Netzdienste GmbH
    country:        DE
    admin-c:        KM4692-RIPE
    tech-c:         KM4692-RIPE
    status:         ASSIGNED PA
    mnt-by:         DFN-LIR-MNT
    created:        2022-08-14T11:48:28Z
    last-modified:  2022-10-25T12:22:39Z 
    source:         RIPE
    

Add an **mnt-irt:** attribute. If you have only **inet(6)num** to change, you can do this by hand using a standard text editor.

**Here is an example:**


    $ cat inetnum-irt.txt
    
    inetnum:        193.174.13.0 - 193.174.13.255
    netname:        DFNCERT-NET
    descr:          DFN-CERT  Zentrum fuer sichere Netzdienste GmbH
    country:        DE
    admin-c:        KM4692-RIPE
    tech-c:         KM4692-RIPE
    status:         ASSIGNED PA
    mnt-by:         DFN-LIR-MNT
    mnt-irt:        IRT-DFN-CERT
    created:        2022-08-14T11:48:28Z
    last-modified:  2022-10-25T12:22:39Z 
    source:         RIPE


Sign the new text file, making sure that the "auth:" section of your **irt** object contains your PGP key. You can find out the correct key by using:

    whois -h whois.ripe.net <irt-object name> | grep auth


**Here is an example:**


    $ whois -h whois.ripe.net irt-dfn-cert | grep auth
    
    auth: PGPKEY-6DFC4771
    
    $ gpg --clearsign -a -u 0x*234567 inetnum.txt
    
    $ cat inetnum.txt.asc
    
    
    -----BEGIN PGP SIGNED MESSAGE-----
    
    inetnum:        193.174.13.0 - 193.174.13.255
    netname:        DFNCERT-NET
    descr:          DFN-CERT  Zentrum fuer sichere Netzdienste GmbH
    country:        DE
    admin-c:        KM4692-RIPE
    tech-c:         KM4692-RIPE
    status:         ASSIGNED PA
    mnt-by:         DFN-LIR-MNT
    mnt-irt:        IRT-DFN-CERT
    created:        2022-08-14T11:48:28Z
    last-modified:  2022-10-25T12:22:39Z 
    source:         RIPE
    -----BEGIN PGP SIGNATURE-----
    Version: GnuPG v1.2.2 (SunOS)
    
    iQEVAwUBP4VPg1FwV5Zt/EdxAQFk+Af/dUMEyjeQATGZ+8LVerSIyWHFmntjxh6Z
    hQE3jP5dbtklCaRiCpdgRKw0sBiNG6fPyhmno4kcFYInKYxukhkLH+5HRXzQxk5R
    Ay/oW4fn7K8hl1SgZn5cbN61UcMRDgDV88SeWOnCtc/CQ3bqv6N+l9TbTbzFS6kF
    3e4a9G3G8tEKjilCWvDYgEhnYAlEPZr0+jvxFaEEN/4UuX2q0npE0269x2sybQlD
    hfPQ++RtQ5vstablHW9/6m4r+bqlgfcAirVucmHaw/mgd4yK6CLrQEh9MRXcVest
    0LVwuHI/HQGZ4bwbwUB+pnlMvU/W+wiD7ct3rwoqP2xKI8BUzPkjDg==
    =7JK5
    -----END PGP SIGNATURE-----


Send the new file to the maintainer of the **inet(6)num** object. If you do not know the maintainer, you can find out the person behind the **mntner** object by using the RIPE Database:

    whois -h whois.ripe.net -r <ipadress> | grep mnt-by

    whois -h whois.ripe.net <mntner name> | grep e-mail

    
**Here is an example:**

    $ whois -h whois.ripe.net -r 193.174.13.99 | grep mnt-by

    mnt-by: DFN-LIR-MNT

    $ whois -h whois.ripe.net DFN-LIR-MNT | grep e-mail

    e-mail:       hostmaster@dfn.de

Let the other maintainer also authenticate the request by either signing the file (inetnum.txt.asc) with the PGP key referenced in his **mntner** object. An alternative would be to send the file, along with this maintainer password to the RIPE NCC.

Send this authenticated request to [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net)

Both the maintainer of the **inet(6)num** object and the team who owns the **irt** object will receive a change notifications by e-mail, when the request has been completed. If there is an error, both will receive a notification.


## Link More Than One INET(6)NUM object to an IRT Object
### All INET(6)NUM Object Have the Same Maintainer Object

You should collect all the **inet(6)num** objects into one list. Make the appropriate changes and send the change request in one email to [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net).


### Some INET(6)NUM Objects Have Different Maintainer Objects

You need authorisation from each party involved. You should collect the **inet(6)num** objects maintained by different maintainers into separate lists. Authorise these separately and then send each in a separate email to [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net).


## Step-by-Step Guide

How to link multiple **inet(6)num** objects with the same maintainer to one single **irt** object.

Extract all the **inet(6)num** objects belonging to the **mntner** object from the RIPE Database:

    whois -h whois.ripe.net -r -i mnt-by <maintainer name> > inetnums.txt

You will see a list of objects, separated by an empty line.

* **Here is an example:**

    $ whois -h whois.ripe.net -r -i mnt-by DFN-LIR-MNT > inetnums.txt

Add an "mnt-irt:" attribute to every object in the list.

Sign the new textfile with the PGP key from the "auth:" section of your **irt** object. You can find the correct key by issuing the following command:

    whois -h whois.ripe.net <irt-object name> | grep auth

* **Here is an example:**

    $ whois -h whois.ripe.net irt-dfn-cert | grep auth
    auth: PGPKEY-6DFC4771
    $ gpg --clearsign -a -u 0x6DFC4771 inetnums.txt

Send that file to the other maintainer. He should authenticate the request by either signing the file (inetnum.txt.asc) with the PGP key referenced in his **mntner** object or send the file, along with his RIPE maintainer password to the RIPE NCC. The address to use is [auto-dbm@ripe.net](mailto:auto-dbm@ripe.net)

Both the maintainer of the **inet(6)num** object and the team who owns the **irt** object will receive a change notification by email, when the request has been completed. If there is an error, both will receive a notification.

This document was first published on the TERENA website.
The author of the original document was: Marco Thorbrügge, DFN-CERT / thorbruegge@cert.dfn.de
Subsequently updated by the RIPE NCC.
