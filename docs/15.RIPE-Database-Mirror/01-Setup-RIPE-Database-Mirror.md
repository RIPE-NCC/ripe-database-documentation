---
permalink: /RIPE-Database-Mirror/Setup-RIPE-Database-Mirror
---

# Setup RIPE Database Mirror

There are two ways to set up a mirror of the RIPE database.

1. Using GRS import. 

    The GRS Import method is updated once per day.

    - First follow the whois [installation instructions](../Installation-and-Development/Installation-instructions/#installation-instructions), to have a working whois installation. 

    - Create a LOCAL database, and a WHOIS_MIRROR_RIPE_GRS database, and create tables in both using the whois_schema.sql script.

    - The LOCAL database will be used for any local changes.
    - The WHOIS_MIRROR_RIPE_GRS database will be used for the mirror data.

    - Configure the properties file as follows (you will need to customise the example whois.properties):


            whois.source=LOCAL
            ...
            grs.sources=RIPE-GRS
            grs.sources.dummify=
            ...
            grs.import.sources=RIPE-GRS
            grs.import.enabled=true
            ...
            grs.import.ripe.resourceDataUrl=ftp://ftp.ripe.net/ripe/stats/delegated-ripencc-extended-latest
            grs.import.ripe.download=ftp://ftp.ripe.net/ripe/dbase/ripe.db.gz
            grs.import.ripe.source=RIPE-GRS
            ...
            whois.db.master.url=jdbc:mariadb://localhost/LOCAL;driver=org.mariadb.jdbc.Driver
            ...
            whois.db.slave.url=jdbc:mariadb://localhost/LOCAL
            ...
            whois.db.grs.master.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
            whois.db.grs.slave.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
            ...


    Start whois, using either the `./whois.init start` command or something like the following command:


        java -Dwhois -Xms1024m -Xmx8g -XX:PermSize=256m -XX:MaxPermSize=256m -XX:+UseG1GC -Dwhois.config=properties -Dlog4j.configuration=file:log4j.xml -jar whois.jar


    - The GRS import will run automatically every midnight. Or, connect to the process using JMX, and start the GRS import.

            $ java -jar jmxterm-<version>-uber.jar
            > open <pid>
            > bean net.ripe.db.whois:name=GrsImport
            > run grsImport "RIPE-GRS" "test"
            #calling operation grsImport of mbean net.ripe.db.whois:name=GrsImport
            #operation returns:
            GRS import started


    - Monitor progress by checking the log4j console output, the import will take around 2 hours to complete.

    - You can query for objects in the mirror using for example:

            -s RIPE-GRS 82.185.158.240 - 82.185.158.247
            --resource 82.185.158.240 - 82.185.158.247



2. Using Bootstrap and NRTM. 
  
    With this method the mirror database gets updated in near real time.

    This page describes the process of loading the empty mirror database with a nightly export of the RIPE database.

    - First follow the whois [installation instructions](../Installation-and-Development/Installation-instructions/#installation-instructions) here, to have a working whois installation. 
    - Create a LOCAL database, and a WHOIS_MIRROR_RIPE_GRS database, and create tables in both using the whois_schema.sql script.
    - Download a snapshot of the RIPE DB here: ftp://ftp.ripe.net/ripe/dbase/ripe.db.gz
    - Save the serial number that corresponds to the above snapshot from here: ftp://ftp.ripe.net/ripe/dbase/RIPE.CURRENTSERIAL
    -  Both snapshot and RIPE.CURRENTSERIAL are updated every night. 
    -  If you want to use automatic updates using NRTM, the dump should be at most 2 weeks old.
    - Configure the properties file as follows (you will need to customise the example whois.properties):
    
            whois.source=LOCAL
            …
            grs.sources=RIPE-GRS
            grs.sources.dummify=
            …
            # GRS source-specific properties to acquire dumps
            grs.import.enabled=false
            grs.import.sources=

            # NRTM client
            nrtm.import.enabled=false
            nrtm.import.sources=
            ...
            whois.db.master.url=jdbc:log:mariadb://localhost/LOCAL;driver=org.mariadb.jdbc.Driver
            ...
            whois.db.slave.url=jdbc:mariadb://localhost/LOCAL
            …
            whois.db.grs.master.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
            whois.db.grs.slave.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
    
    - Start the whois server using `./whois.init start`
    - Initiate the loading of the dump file using the Bootstrap command from JMX. The import could take several hours.
    - if jmxterm complains about JDK version or similar, check the [Installation-instructions](../Installation-and-Development/Installation-instructions/#installation-instructions) because it could be a bug in jmxterm.
    
            ./whois.init jmx
            bean net.ripe.db.whois:name=Bootstrap
            run loadDump initialimport <path to ripe.db.gz>
    
    - When the import is finished exit the jmx console, and test that it worked by executing a query using telnet:
    
            telnet localhost 1043
            193.0.0.1 - 193.0.7.255
    
    The above jmx call will load the LOCAL database with the snapshot of the objects from the FTP dump.

    - Now you need to stop the server and copy the LOCAL database to WHOIS_MIRROR_RIPE_GRS. 
    
            ./whois.init stop
            mysqldump -udbint -p  LOCAL > LOCAL.sql
            mysql -udbint -p WHOIS_MIRROR_RIPE_GRS < LOCAL.sql
    
    - The above steps are important because you cannot mirror a remote database directly to the main source (LOCAL), and also you cannot load directly with the JMX call an FTP dump to the mirrored database. 
    - The mirrored content has to be persisted to WHOIS_MIRROR_grs.source, in our case WHOIS_MIRROR_RIPE_GRS. 
    - Note that the properties:
    
            whois.db.grs.master.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
            whois.db.grs.slave.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
    
    have to be like that, because they are dynamically suffixed by the grs.sources (RIPE-GRS)


    - Start the server and check that the mirrored source is working:

    
            ./whois.init start
            <wait>
            telnet localhost 1043
            -s RIPE-GRS 193.0.0.1 - 193.0.7.255
    

    - If the query is successful, we can proceed with [Setup automatic updating with NRTM](../15.RIPE-Database-Mirror/Near-Real-Time-Mirroring/#near-real-time-Mirroring). 



A server with 16GB RAM, 8 GB swap, and 160GB disk space is recommended for mirroring.
*Please note that running your own mirror is not supported!*