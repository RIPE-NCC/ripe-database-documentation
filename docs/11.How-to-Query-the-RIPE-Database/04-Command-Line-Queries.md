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

