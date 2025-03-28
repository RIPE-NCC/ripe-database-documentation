---
permalink: /RIPE-Database-Mirror/Setup-RIPE-Database-Mirror
lastUpdated: 1721302189000
prev:
  text: Geolocation in the RIPE Database
  link: /Related-Software-and-Tools/Geolocation-in-the-RIPE-Database/
next:
  text: 02 Near Real Time Mirroring v3
  link: /RIPE-Database-Mirror/02-Near-Real-Time-Mirroring-v3/
---

# Setup RIPE Database Mirror

There are three ways to set up a mirror of the RIPE database.

1. Using GRS import. 

    The GRS Import method is updated once per day.

    - First follow the whois [installation instructions](../Installation-and-Development/Installation-instructions/#installation-instructions), to have a working whois installation. 

    - Create a LOCAL database, and a WHOIS_MIRROR_RIPE_GRS database, and create tables in both using the whois_schema.sql script.

    - The LOCAL database will be used for any local changes.
    - The WHOIS_MIRROR_RIPE_GRS database will be used for the mirror data.

    - Configure the properties file as follows (you will need to customise the example whois.properties):

    ```
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
   ```

    Start whois, using the next command. Use -Ddump.total.size.limit to specify the dump size:

   ```
   /usr/bin/java -Dwhois -Djsse.enableSNIExtension=false -Dcom.sun.management.jmxremote -Dhazelcast.jmx=true -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=1099 -Xms1024m -Xmx8g -Dwhois.config=properties -Duser.timezone=UTC -Dhazelcast.config=hazelcast.xml -Dlog4j.configurationFile=file:log4j2.xml -jar whois.jar
   ```

   - The GRS import will run automatically every midnight. Or, connect to the process using JMX, and start the GRS import.
   ```
     $ java --add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED -jar jmxterm-<version>-uber.jar -v verbose
     >    open <pid>
     >    bean net.ripe.db.whois:name=GrsImport
     >    run grsImport "RIPE-GRS" "test"
     #calling operation grsImport of mbean net.ripe.db.whois:name=GrsImport
     #operation returns:
     GRS import started
   ```

    - Monitor progress by checking the log4j console output, the import will take around 2 hours to complete.

    - You can query for objects in the mirror using for example:

            -s RIPE-GRS 82.185.158.240 - 82.185.158.247
            --resource 82.185.158.240 - 82.185.158.247



2. Using Bootstrap and NRTMv3. 
  
    With this method the mirror database gets updated in near real time.

    This page describes the process of loading the empty mirror database with a nightly export of the RIPE database.

    - First follow the whois [installation instructions](../Installation-and-Development/Installation-instructions/#installation-instructions) here, to have a working whois installation. 
    - Create a LOCAL database, and a WHOIS_MIRROR_RIPE_GRS database, and create tables in both using the whois_schema.sql script.
    - Download a snapshot of the RIPE DB here: ftp://ftp.ripe.net/ripe/dbase/ripe.db.gz
    - Save the serial number that corresponds to the above snapshot from here: ftp://ftp.ripe.net/ripe/dbase/RIPE.CURRENTSERIAL
    - Both snapshot and RIPE.CURRENTSERIAL are updated every night. 
    - If you want to use automatic updates using NRTM, the dump should be at most 2 weeks old.
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
    
    - Start the whois server using the following command. Use -Ddump.total.size.limit to specify the dump size:

            /usr/bin/java -Dwhois -Djsse.enableSNIExtension=false -Dcom.sun.management.jmxremote -Dhazelcast.jmx=true -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=1099 -Xms1024m -Xmx8g -Dwhois.config=properties -Duser.timezone=UTC -Dhazelcast.config=hazelcast.xml -Dlog4j.configurationFile=file:log4j2.xml -jar whois.jar

    - Initiate the loading of the dump file using the Bootstrap command from JMX. The import could take several hours.
    
            % java --add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED -jar jmxterm-<version>-uber.jar -v verbose
            > bean net.ripe.db.whois:name=Bootstrap
            > run loadDump initialimport <path to ripe.db.gz>
    
    - When the import is finished exit the jmx console, and test that it worked by executing a query using telnet:
    
            % telnet localhost 1043
            > 193.0.0.1 - 193.0.7.255
    
    The above jmx call will load the LOCAL database with the snapshot of the objects from the FTP dump.

    - Now you need to stop the server and copy the LOCAL database to WHOIS_MIRROR_RIPE_GRS. 
    
            % kill <PID>
            % mysqldump -udbint -p  LOCAL > LOCAL.sql
            % mysql -udbint -p WHOIS_MIRROR_RIPE_GRS < LOCAL.sql
    
    - The above steps are important because you cannot mirror a remote database directly to the main source (LOCAL), and also you cannot load directly with the JMX call an FTP dump to the mirrored database. 
    - The mirrored content has to be persisted to WHOIS_MIRROR_grs.source, in our case WHOIS_MIRROR_RIPE_GRS. 
    - Note that the properties:
    
            whois.db.grs.master.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
            whois.db.grs.slave.baseurl=jdbc:mariadb://localhost/WHOIS_MIRROR
    
    have to be like that, because they are dynamically suffixed by the grs.sources (RIPE-GRS)

    - Start the server and check that the mirrored source is working:
   ```
      % /usr/bin/java -Dwhois -Djsse.enableSNIExtension=false -Dcom.sun.management.jmxremote -Dhazelcast.jmx=true -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=1099 -Xms1024m -Xmx8g -Dwhois.config=properties -Duser.timezone=UTC -Dhazelcast.config=hazelcast.xml -Dlog4j.configurationFile=file:log4j2.xml -jar whois.jar
      <wait>
      % telnet localhost 1043
      > -s RIPE-GRS 193.0.0.1 - 193.0.7.255
   ``` 

    - If the query is successful, we can proceed with [Setup automatic updating with NRTMv3](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v3/#near-real-time-Mirroring-v3).



A server with 16GB RAM, 8 GB swap, and 160GB disk space is recommended for mirroring.
*Please note that running your own mirror is not supported!*



3. Using [IRRd](https://github.com/irrdnet/irrd) with [NRTMv4](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#near-real-time-Mirroring-v4). 

   *This feature is in development and is subject to change.*

   With this method the mirror database gets updated in near real time.

   This section outline the essential steps for configuring, initializing, and maintaining synchronisation 
   using [Snapshot Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#snapshot-file) and [Delta Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#delta-file). By following these protocols, mirror clients ensure accurate and 
   timely updates of RIPE Database information, while maintaining security and integrity through cryptographic 
   verification processes.

   - Install [IRRd](https://github.com/irrdnet/irrd).
   - **Configure IRRd for NRTMv4**: Modify your IRRd configuration to enable support for NRTMv4. This typically 
     involves configuring the URLs for [Snapshot Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#snapshot-file), [Delta Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#delta-file), and the [Update Notification File](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#update-notification-file). 
     Ensure that IRRd is set up to server these files over HTTPS.
   ```
   # NRTMv4 specific settings for the RIPE database
   nrtm:
      version: 4  # NRTMv4 version
      url:
         snapshot: https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-snapshot  # URL for Snapshot Files
         deltas: https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-deltas      # URL for Delta Files
         update_notification: https://nrtm.db.ripe.net/nrtmv4/RIPE/update-notification-file.json  # URL for Update Notification File
      keys:
         public: https://nrtm.db.ripe.net/nrtmv4/RIPE/update-notification-file.json.sig  # Path to the public key for signature verification
   ```
   - **Initialise IRRd**: Initialise IRRd with the necessary IRR database that supports NRTMv4. This involves 
     loading the initial dataset and setting up the necessary configurations.
   ```
   # IRR database configuration
   databases:
      - name: RIPE # RIPE database settings
   import_sources:
      - https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-snapshot.1.RIPE.x.y.json.gz  #Import initial data from an HTTPS source
   ```
   - **Querying Data**: Use the IRRd command-line tools or APIs to query data from the NRTMv4 database. For example:
     - Use `irrd-client`and `irrd-shell` to query objects and updates.
     - Fetch and view the [Snapshot Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#snapshot-file) and [Delta Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#delta-file) to understand the current state and changes in the 
       database.
   - **Update Notifications**: Monitor the [Update Notification File](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#update-notification-file) and [Delta Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#delta-file) to stay updated with 
     changes in the database. Configure IRRd to regularly publish these files according to the [NRTMv4 specifications](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#near-real-time-mirroring-v4).
   - **Handling Updates**: Process [Delta Files](../RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4/#delta-file) to apply incremental updates to your local instance of IRRd, 
     ensuring synchronisation with the latest changes in the database.

   For more detailed explanations about how to use IRRd client please refer to their [documentation](https://github.com/irrdnet/irrd)
