# Command Line Queries

Queries can be run from almost any computer (connected to the Internet) using standard features built into most operating systems. Some common methods include Netcat, Telnet and a Whois Client.

## Netcat

Netcat is a computer networking service for reading from and writing to network connections, using TCP or UDP. Netcat can be used directly or easily driven by other programs and scripts. Netcat can often be abbreviated to the command ‘nc'. This is an example query using netcat.

    $ nc whois.ripe.net 43
    % This is the RIPE Database query service.
    % The objects are in RPSL format.
    %
    % The RIPE Database is subject to Terms and Conditions.
    % See http://www.ripe.net/db/support/db-terms-conditions.pdf

    -rBGTroute 193.0.7.35
    route:          193.0.0.0/21
    descr:          RIPE-NCC
    origin:         AS3333
    mnt-by:         RIPE-NCC-MNT
    created:        1970-01-01T00:00:00Z
    last-modified:  2008-09-10T14:27:53Z
    source:         RIPE
    
    % This query was served by the RIPE Database Query Service version 1.75 (DB-3)

## Telnet

Telnet is a network protocol used on the Internet to provide a bidirectional, interactive, text-oriented, communication facility using a virtual, terminal connection. This is an example query using telnet.

    $ telnet whois.ripe.net 43
    Trying 2001:67c:2e8:22::c100:687...
    Connected to whois.ripe.net.
    Escape character is '^]'.
    % This is the RIPE Database query service.
    % The objects are in RPSL format.
    %
    % The RIPE Database is subject to Terms and Conditions.
    % See http://www.ripe.net/db/support/db-terms-conditions.pdf

    -rBGTroute 193.0.7.35
    route:         193.0.0.0/21
    descr:         RIPE-NCC
    origin:        AS3333
    mnt-by:        RIPE-NCC-MNT
    created:       1970-01-01T00:00:00Z
    last-modified: 2008-09-10T14:27:53Z
    source:        RIPE
    
    % This query was served by the RIPE Database Query Service version 1.75 (DB-3)

## Whois Client

This is a small program that connects to the RIPE Whois Database, passes the search request to the database and prints out the response. Most computer operating systems include a default, basic whois client. However, these default clients often do not recognise all the added query options that the RIPE Database allows.

### Windows

To install whois in Windows you can click [here]{https://docs.microsoft.com/en-us/sysinternals/downloads/whois}. Example to query using whois from Windows.

    $ whois /?


    Whois v1.121    -   Domain information lookup
    Copyright (C) 2005-2019 Mark Russinovich
    sysinternals    -   www.sysinternals.com

    Usage: whois [-v] domainname [whois.server]
        -v Print whois information for referrals
        -nobanner
            Do not display the startup banner and copyright message

    $ whois -v google.com
    Connecting to COM.whois-servers.net...
    Server COM.whois-servers.net returned the following for GOOGLE.COM


    Domain Name: GOOGLE.COM

    Registry Domain ID: 2138514_DOMAIN_COM-VRSN

    Registrar WHOIS Server: whois.markmonitor.com

    Registrar URL: http://www.markmonitor.com

    Updated Date: 2019-09-09T15:39:04Z

    Creation Date: 1997-09-15T04:00:00Z

    Registry Expiry Date: 2028-09-14T04:00:00Z

    Registrar: MarkMonitor Inc.

    Registrar IANA ID: 292

    Registrar Abuse Contact Email: abusecomplaints@markmonitor.com

    Registrar Abuse Contact Phone: +1.2086851750

    Domain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited

    Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited

    Domain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited

    Domain Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited

    Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited

    Domain Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited

    Name Server: NS1.GOOGLE.COM

    Name Server: NS2.GOOGLE.COM

    Name Server: NS3.GOOGLE.COM

    Name Server: NS4.GOOGLE.COM

    DNSSEC: unsigned

    URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/

    >>> Last update of whois database: 2022-08-01T12:50:22Z <<<



    For more information on Whois status codes, please visit https://icann.org/epp



    NOTICE: The expiration date displayed in this record is the date the

    registrar's sponsorship of the domain name registration in the registry is

    currently set to expire. This date does not necessarily reflect the expiration

    date of the domain name registrant's agreement with the sponsoring

    registrar.  Users may consult the sponsoring registrar's Whois database to

    view the registrar's reported date of expiration for this registration.



    TERMS OF USE: You are not authorized to access or query our Whois

    database through the use of electronic processes that are high-volume and

    automated except as reasonably necessary to register domain names or

    modify existing registrations; the Data in VeriSign Global Registry

    Services' ("VeriSign") Whois database is provided by VeriSign for

    information purposes only, and to assist persons in obtaining information

    about or related to a domain name registration record. VeriSign does not

    guarantee its accuracy. By submitting a Whois query, you agree to abide

    by the following terms of use: You agree that you may use this Data only

    for lawful purposes and that under no circumstances will you use this Data

    to: (1) allow, enable, or otherwise support the transmission of mass

    unsolicited, commercial advertising or solicitations via e-mail, telephone,

    or facsimile; or (2) enable high volume, automated, electronic processes

    that apply to VeriSign (or its computer systems). The compilation,

    repackaging, dissemination or other use of this Data is expressly

    prohibited without the prior written consent of VeriSign. You agree not to

    use electronic processes that are automated and high-volume to access or

    query the Whois database except as reasonably necessary to register

    domain names or modify existing registrations. VeriSign reserves the right

    to restrict your access to the Whois database in its sole discretion to ensure

    operational stability.  VeriSign may restrict or terminate your access to the

    Whois database for failure to abide by these terms of use. VeriSign

    reserves the right to modify these terms at any time.



    The Registry database contains ONLY .COM, .NET, .EDU domains and

    Registrars.



    Connecting to whois.markmonitor.com...
    Server whois.markmonitor.com returned the following for GOOGLE.COM


    Domain Name: google.com
    Registry Domain ID: 2138514_DOMAIN_COM-VRSN
    Registrar WHOIS Server: whois.markmonitor.com
    Registrar URL: http://www.markmonitor.com
    Updated Date: 2019-09-09T15:39:04+0000
    Creation Date: 1997-09-15T07:00:00+0000
    Registrar Registration Expiration Date: 2028-09-13T07:00:00+0000
    Registrar: MarkMonitor, Inc.
    Registrar IANA ID: 292
    Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
    Registrar Abuse Contact Phone: +1.2083895770
    Domain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)
    Domain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)
    Domain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)
    Domain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)
    Domain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)
    Domain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)
    Registrant Organization: Google LLC
    Registrant State/Province: CA
    Registrant Country: US
    Registrant Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Admin Organization: Google LLC
    Admin State/Province: CA
    Admin Country: US
    Admin Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Tech Organization: Google LLC
    Tech State/Province: CA
    Tech Country: US
    Tech Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Name Server: ns2.google.com
    Name Server: ns4.google.com
    Name Server: ns3.google.com
    Name Server: ns1.google.com
    DNSSEC: unsigned
    URL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/
    >>> Last update of WHOIS database: 2022-08-01T12:41:57+0000 <<<

    For more information on WHOIS status codes, please visit:
    https://www.icann.org/resources/pages/epp-status-codes

    If you wish to contact this domain’s Registrant, Administrative, or Technical
    contact, and such email address is not visible above, you may do so via our web
    form, pursuant to ICANN’s Temporary Specification. To verify that you are not a
    robot, please enter your email address to receive a link to a page that
    facilitates email communication with the relevant contact(s).

    Web-based WHOIS:
    https://domains.markmonitor.com/whois

    If you have a legitimate interest in viewing the non-public WHOIS details, send
    your request and the reasons for your request to whoisrequest@markmonitor.com
    and specify the domain name in the subject line. We will review that request and
    may ask for supporting documentation and explanation.

    The data in MarkMonitor’s WHOIS database is provided for information purposes,
    and to assist persons in obtaining information about or related to a domain
    name’s registration record. While MarkMonitor believes the data to be accurate,
    the data is provided "as is" with no guarantee or warranties regarding its
    accuracy.

    By submitting a WHOIS query, you agree that you will use this data only for
    lawful purposes and that, under no circumstances will you use this data to:
    (1) allow, enable, or otherwise support the transmission by email, telephone,
    or facsimile of mass, unsolicited, commercial advertising, or spam; or
    (2) enable high volume, automated, or electronic processes that send queries,
    data, or email to MarkMonitor (or its systems) or the domain name contacts (or
    its systems).

    MarkMonitor reserves the right to modify these terms at any time.

    By submitting this query, you agree to abide by this policy.

    MarkMonitor Domain Management(TM)
    Protecting companies and consumers in a digital world.

    Visit MarkMonitor at https://www.markmonitor.com
    Contact us at +1.8007459229
    In Europe, at +44.02032062220
    --


### Linux

You can install whois in this platform running apt-get install whois, however this is a common tool that should be intalled.

    $ whois --version

    Version 5.5.13.

    Report bugs to <md+whois@linux.it>.


    $ whois google.com

        Domain Name: GOOGLE.COM
        Registry Domain ID: 2138514_DOMAIN_COM-VRSN
        Registrar WHOIS Server: whois.markmonitor.com
        Registrar URL: http://www.markmonitor.com
        Updated Date: 2019-09-09T15:39:04Z
        Creation Date: 1997-09-15T04:00:00Z
        Registry Expiry Date: 2028-09-14T04:00:00Z
        Registrar: MarkMonitor Inc.
        Registrar IANA ID: 292
        Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
        Registrar Abuse Contact Phone: +1.2086851750
        Domain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited
        Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
        Domain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited
        Domain Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited
        Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited
        Domain Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited
        Name Server: NS1.GOOGLE.COM
        Name Server: NS2.GOOGLE.COM
        Name Server: NS3.GOOGLE.COM
        Name Server: NS4.GOOGLE.COM
        DNSSEC: unsigned
    URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
    >>> Last update of whois database: 2022-08-02T08:21:16Z <<<

    For more information on Whois status codes, please visit https://icann.org/epp

    NOTICE: The expiration date displayed in this record is the date the
    registrar's sponsorship of the domain name registration in the registry is
    currently set to expire. This date does not necessarily reflect the expiration
    date of the domain name registrant's agreement with the sponsoring
    registrar.  Users may consult the sponsoring registrar's Whois database to
    view the registrar's reported date of expiration for this registration.

    TERMS OF USE: You are not authorized to access or query our Whois
    database through the use of electronic processes that are high-volume and
    automated except as reasonably necessary to register domain names or
    modify existing registrations; the Data in VeriSign Global Registry
    Services' ("VeriSign") Whois database is provided by VeriSign for
    information purposes only, and to assist persons in obtaining information
    about or related to a domain name registration record. VeriSign does not
    guarantee its accuracy. By submitting a Whois query, you agree to abide
    by the following terms of use: You agree that you may use this Data only
    for lawful purposes and that under no circumstances will you use this Data
    to: (1) allow, enable, or otherwise support the transmission of mass
    unsolicited, commercial advertising or solicitations via e-mail, telephone,
    or facsimile; or (2) enable high volume, automated, electronic processes
    that apply to VeriSign (or its computer systems). The compilation,
    repackaging, dissemination or other use of this Data is expressly
    prohibited without the prior written consent of VeriSign. You agree not to
    use electronic processes that are automated and high-volume to access or
    query the Whois database except as reasonably necessary to register
    domain names or modify existing registrations. VeriSign reserves the right
    to restrict your access to the Whois database in its sole discretion to ensure
    operational stability.  VeriSign may restrict or terminate your access to the
    Whois database for failure to abide by these terms of use. VeriSign
    reserves the right to modify these terms at any time.

    The Registry database contains ONLY .COM, .NET, .EDU domains and
    Registrars.
    Domain Name: google.com
    Registry Domain ID: 2138514_DOMAIN_COM-VRSN
    Registrar WHOIS Server: whois.markmonitor.com
    Registrar URL: http://www.markmonitor.com
    Updated Date: 2019-09-09T15:39:04+0000
    Creation Date: 1997-09-15T07:00:00+0000
    Registrar Registration Expiration Date: 2028-09-13T07:00:00+0000
    Registrar: MarkMonitor, Inc.
    Registrar IANA ID: 292
    Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
    Registrar Abuse Contact Phone: +1.2086851750
    Domain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)
    Domain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)
    Domain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)
    Domain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)
    Domain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)
    Domain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)
    Registrant Organization: Google LLC
    Registrant State/Province: CA
    Registrant Country: US
    Registrant Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Admin Organization: Google LLC
    Admin State/Province: CA
    Admin Country: US
    Admin Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Tech Organization: Google LLC
    Tech State/Province: CA
    Tech Country: US
    Tech Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Name Server: ns3.google.com
    Name Server: ns4.google.com
    Name Server: ns1.google.com
    Name Server: ns2.google.com
    DNSSEC: unsigned
    URL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/
    >>> Last update of WHOIS database: 2022-08-02T08:16:06+0000 <<<

    For more information on WHOIS status codes, please visit:
    https://www.icann.org/resources/pages/epp-status-codes

    If you wish to contact this domain’s Registrant, Administrative, or Technical
    contact, and such email address is not visible above, you may do so via our web
    form, pursuant to ICANN’s Temporary Specification. To verify that you are not a
    robot, please enter your email address to receive a link to a page that
    facilitates email communication with the relevant contact(s).

    Web-based WHOIS:
    https://domains.markmonitor.com/whois

    If you have a legitimate interest in viewing the non-public WHOIS details, send
    your request and the reasons for your request to whoisrequest@markmonitor.com
    and specify the domain name in the subject line. We will review that request and
    may ask for supporting documentation and explanation.

    The data in MarkMonitor’s WHOIS database is provided for information purposes,
    and to assist persons in obtaining information about or related to a domain
    name’s registration record. While MarkMonitor believes the data to be accurate,
    the data is provided "as is" with no guarantee or warranties regarding its
    accuracy.

    By submitting a WHOIS query, you agree that you will use this data only for
    lawful purposes and that, under no circumstances will you use this data to:
    (1) allow, enable, or otherwise support the transmission by email, telephone,
    or facsimile of mass, unsolicited, commercial advertising, or spam; or
    (2) enable high volume, automated, or electronic processes that send queries,
    data, or email to MarkMonitor (or its systems) or the domain name contacts (or
    its systems).

    MarkMonitor reserves the right to modify these terms at any time.

    By submitting this query, you agree to abide by this policy.

    MarkMonitor Domain Management(TM)
    Protecting companies and consumers in a digital world.

    Visit MarkMonitor at https://www.markmonitor.com
    Contact us at +1.8007459229
    In Europe, at +44.02032062220
    --


To obtain contact information about an administrator located in Europe, use the -c option as shown in the following example, where CONTACT-ID is substituted with the actual contact identifier.

    whois -c EU CONTACT-ID

To write a complex query you can use the next syntax. You can use -- option to separate whois command options from whois server query options. A query containing spaces must be quoted as one argument to the whois command.

    whois -r -- '-t domain'


    $ whois -r -- '-rBGTroute 193.0.7.35'

    % This is the RIPE Database query service.
    % The objects are in RPSL format.
    %
    % The RIPE Database is subject to Terms and Conditions.
    % See http://www.ripe.net/db/support/db-terms-conditions.pdf

    route:          193.0.0.0/21
    descr:          RIPE-NCC
    origin:         AS3333
    mnt-by:         RIPE-NCC-MNT
    created:        1970-01-01T00:00:00Z
    last-modified:  2008-09-10T14:27:53Z
    source:         RIPE

    % This query was served by the RIPE Database Query Service version 1.103 (WAGYU)


Whois has more options in this platform than Windows, if you want to know all the options just run 

    $ man whois




### OSX

Whois is a common tool that is currently installed in this platform, however if you don't have whois installed follow this [steps](https://formulae.brew.sh/formula/whois). 

    $ whois google.com

    % IANA WHOIS server
    % for more information on IANA, visit http://www.iana.org
    % This query returned 1 object

    refer:        whois.verisign-grs.com

    domain:       COM

    organisation: VeriSign Global Registry Services
    address:      12061 Bluemont Way
    address:      Reston Virginia 20190
    address:      United States

    contact:      administrative
    name:         Registry Customer Service
    organisation: VeriSign Global Registry Services
    address:      12061 Bluemont Way
    address:      Reston Virginia 20190
    address:      United States
    phone:        +1 703 925-6999
    fax-no:       +1 703 948 3978
    e-mail:       info@verisign-grs.com

    contact:      technical
    name:         Registry Customer Service
    organisation: VeriSign Global Registry Services
    address:      12061 Bluemont Way
    address:      Reston Virginia 20190
    address:      United States
    phone:        +1 703 925-6999
    fax-no:       +1 703 948 3978
    e-mail:       info@verisign-grs.com

    nserver:      A.GTLD-SERVERS.NET 192.5.6.30 2001:503:a83e:0:0:0:2:30
    nserver:      B.GTLD-SERVERS.NET 192.33.14.30 2001:503:231d:0:0:0:2:30
    nserver:      C.GTLD-SERVERS.NET 192.26.92.30 2001:503:83eb:0:0:0:0:30
    nserver:      D.GTLD-SERVERS.NET 192.31.80.30 2001:500:856e:0:0:0:0:30
    nserver:      E.GTLD-SERVERS.NET 192.12.94.30 2001:502:1ca1:0:0:0:0:30
    nserver:      F.GTLD-SERVERS.NET 192.35.51.30 2001:503:d414:0:0:0:0:30
    nserver:      G.GTLD-SERVERS.NET 192.42.93.30 2001:503:eea3:0:0:0:0:30
    nserver:      H.GTLD-SERVERS.NET 192.54.112.30 2001:502:8cc:0:0:0:0:30
    nserver:      I.GTLD-SERVERS.NET 192.43.172.30 2001:503:39c1:0:0:0:0:30
    nserver:      J.GTLD-SERVERS.NET 192.48.79.30 2001:502:7094:0:0:0:0:30
    nserver:      K.GTLD-SERVERS.NET 192.52.178.30 2001:503:d2d:0:0:0:0:30
    nserver:      L.GTLD-SERVERS.NET 192.41.162.30 2001:500:d937:0:0:0:0:30
    nserver:      M.GTLD-SERVERS.NET 192.55.83.30 2001:501:b1f9:0:0:0:0:30
    ds-rdata:     30909 8 2 E2D3C916F6DEEAC73294E8268FB5885044A833FC5459588F4A9184CFC41A5766

    whois:        whois.verisign-grs.com

    status:       ACTIVE
    remarks:      Registration information: http://www.verisigninc.com

    created:      1985-01-01
    changed:      2017-10-05
    source:       IANA

    # whois.verisign-grs.com

    Domain Name: GOOGLE.COM
    Registry Domain ID: 2138514_DOMAIN_COM-VRSN
    Registrar WHOIS Server: whois.markmonitor.com
    Registrar URL: http://www.markmonitor.com
    Updated Date: 2019-09-09T15:39:04Z
    Creation Date: 1997-09-15T04:00:00Z
    Registry Expiry Date: 2028-09-14T04:00:00Z
    Registrar: MarkMonitor Inc.
    Registrar IANA ID: 292
    Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
    Registrar Abuse Contact Phone: +1.2086851750
    Domain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited
    Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
    Domain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited
    Domain Status: serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited
    Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited
    Domain Status: serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited
    Name Server: NS1.GOOGLE.COM
    Name Server: NS2.GOOGLE.COM
    Name Server: NS3.GOOGLE.COM
    Name Server: NS4.GOOGLE.COM
    DNSSEC: unsigned
    URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
    >>> Last update of whois database: 2022-08-02T07:06:40Z <<<

    # whois.markmonitor.com

    Domain Name: google.com
    Registry Domain ID: 2138514_DOMAIN_COM-VRSN
    Registrar WHOIS Server: whois.markmonitor.com
    Registrar URL: http://www.markmonitor.com
    Updated Date: 2019-09-09T15:39:04+0000
    Creation Date: 1997-09-15T07:00:00+0000
    Registrar Registration Expiration Date: 2028-09-13T07:00:00+0000
    Registrar: MarkMonitor, Inc.
    Registrar IANA ID: 292
    Registrar Abuse Contact Email: abusecomplaints@markmonitor.com
    Registrar Abuse Contact Phone: +1.2086851750
    Domain Status: clientUpdateProhibited (https://www.icann.org/epp#clientUpdateProhibited)
    Domain Status: clientTransferProhibited (https://www.icann.org/epp#clientTransferProhibited)
    Domain Status: clientDeleteProhibited (https://www.icann.org/epp#clientDeleteProhibited)
    Domain Status: serverUpdateProhibited (https://www.icann.org/epp#serverUpdateProhibited)
    Domain Status: serverTransferProhibited (https://www.icann.org/epp#serverTransferProhibited)
    Domain Status: serverDeleteProhibited (https://www.icann.org/epp#serverDeleteProhibited)
    Registrant Organization: Google LLC
    Registrant State/Province: CA
    Registrant Country: US
    Registrant Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Admin Organization: Google LLC
    Admin State/Province: CA
    Admin Country: US
    Admin Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Tech Organization: Google LLC
    Tech State/Province: CA
    Tech Country: US
    Tech Email: Select Request Email Form at https://domains.markmonitor.com/whois/google.com
    Name Server: ns1.google.com
    Name Server: ns4.google.com
    Name Server: ns3.google.com
    Name Server: ns2.google.com
    DNSSEC: unsigned
    URL of the ICANN WHOIS Data Problem Reporting System: http://wdprs.internic.net/
    >>> Last update of WHOIS database: 2022-08-02T07:05:44+0000 <<<


To obtain contact information about an administrator located in Europe, use the -c option as shown in the following example, where CONTACT-ID is substituted with the actual contact identifier.

    whois -c EU CONTACT-ID


To write a complex query you can use the next syntax. You can use -- option to separate whois command options from whois server query options. A query containing spaces must be quoted as one argument to the whois command.

    whois -r -- '-t domain'


    $ whois -r -- '-rBGTroute 193.0.7.35'
    route:          193.0.0.0/21
    descr:          RIPE-NCC
    origin:         AS3333
    mnt-by:         RIPE-NCC-MNT
    created:        1970-01-01T00:00:00Z
    last-modified:  2008-09-10T14:27:53Z
    source:         RIPE

    % This query was served by the RIPE Database Query Service version 1.103 (BLAARKOP)


Whois has more options in this platform than Windows, if you want to know all the options just run 

    $ man whois






