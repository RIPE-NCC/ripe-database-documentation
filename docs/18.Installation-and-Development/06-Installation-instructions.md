---
permalink: /Installation-and-Development/Installation-instructions
---

# Installation instructions

In this section we show how to make a standard setup of whois.

## Prerequisite 

Ensure MariaDB and the needed databases are created and populated
  - See [Getting Started on macOS](../Installation-and-Development/Getting-started-on-macOS/#getting-started-on-macos) for installation information.
  - See [Configure MariaDB](../Installation-and-Development/Configure-MariaDB/#configure-mariadb) for instructions how to create and grant user permission.

## Requirements

* A server with 8GB RAM, 8GB swap, and 120GB disk space is recommended to run Whois.
* Create a role user to run whois server (by default, `dbase`)
* Whois root directory, owned by role user
* MariaDB configured
* [`jmxterm-1.0.4-uber.jar`](https://github.com/jiaqi/jmxterm/releases/download/v1.0.4/jmxterm-1.0.4-uber.jar), downloadable from the GitHub project linked on http://wiki.cyclopsgroup.org/jmxterm.
   * For JDK 17, jmxterm has a problem. As a workaround you can add `--add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED` to Java for jmxterm to make use of the jconsole module.
* `pgrep`
* `/usr/lib/sendmail`-compatible mailer, like exim

## Setup
* Create a "fat"/shaded jar using `mvn clean install -Prelease`. If you have issues, check the [build page](../Installation-and-Development/Building-whois/#building-whois).
* Copy `whois-db/target/whois-db-<version>.jar` to whois root directory and rename to `whois.jar`
* Copy the files `tools/hazelcast.xml`, `whois-commons/src/test/resources/log4j2.xml` from the repo to the whois root directory
* Copy `whois-commons/src/test/resources/whois.properties` from the repo to whois root directory and rename to `properties`
* Copy downloaded `jmxterm` jar to the Whois root directory.
* Adjust `properties` to match your setup (e.g. JDBC URLs, port numbers, etc...)
   * for the example below we use `port.query=1043` and `port.api=1080` and `port.nrtm=1081`
* Create the databases `WHOIS_LOCAL`, `MAILUPDATES_LOCAL`, `ACL_LOCAL`, `INTERNALS_LOCAL`.

```sql
CREATE DATABASE WHOIS_LOCAL;
CREATE DATABASE MAILUPDATES_LOCAL;
CREATE DATABASE ACL_LOCAL;
CREATE DATABASE INTERNALS_LOCAL;
CREATE DATABASE NRTM_LOCAL;
```

   <i>Explanation: Firstly connect to mysql server with `mysql` command and then create database one by one with `create database DATABASE_NAME` command</i>
* For each of the above databases, run the `*_schema.sql` scripts found in `./whois/whois-commons/src/main/resources/`.

```sql
use WHOIS_LOCAL;
source ./whois-commons/src/main/resources/whois_schema.sql
use MAILUPDATES_LOCAL;
source ./whois-commons/src/main/resources/mailupdates_schema.sql
use ACL_LOCAL;
source ./whois-commons/src/main/resources/acl_schema.sql
use INTERNALS_LOCAL;
source ./whois-commons/src/main/resources/internals_schema.sql
use NRTM_LOCAL;
source ./whois-commons/src/main/resources/nrtm_schema.sql
```

   <i>Explanation: Select database with command `use DATABASE_NAME` to be able to run schema on it with command `source PATH_TO_SCHEMA`</i>
* For the ones that match, run their `*_data.sql` script equivalents found in `./whois/whois-commons/src/main/resources/`.

```sql
use WHOIS_LOCAL;
source ./whois-commons/src/main/resources/whois_data.sql
use INTERNALS_LOCAL;
source ./whois-commons/src/main/resources/internals_data.sql
use NRTM_LOCAL;
source ./whois-commons/src/main/resources/nrtm_data.sql
```

* Start whois by executing the following command. Use `-Ddump.total.size.limit` to specify the dump size:

      /usr/bin/java -Dwhois -Djsse.enableSNIExtension=false -Dcom.sun.management.jmxremote -Dhazelcast.jmx=true -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.port=1099 -Xms1024m -Xmx8g -Dwhois.config=properties -Duser.timezone=UTC -Dhazelcast.config=hazelcast.xml -Dlog4j.configurationFile=file:log4j2.xml -jar whois.jar

   * If the test query for `193.0.0.1` does not result in an inetnum returned, the init script will return a failure. If your database is empty for example, this is normal. You might want to adjust the test whois query to match your needs.

         telnet localhost 1043
         193.0.0.1

   * Ignore exceptions in the log starting with [DatabaseVersionCheck] Error checking datasource...  
* The logs will be printed in the console, notifying about the progress
* Kill the process to stop the server
* Use `java --add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED -jar jmxterm-1.0.4-uber.jar -v verbose` to access the administrative interface exported via JMX

## Load local whois with initial test content
* For testing purposes, use `source=TEST` in the `properties` file
* Make sure that in `properties` the `port.query` and `port.api` are not zero (e.g. 1043, 1080 respectively).
* Copy the file `whois-scheduler/src/test/resources/TEST.db` to the whois root directory
  * The file TEST.db contains an initial set of RPSL objects used for testing purposes.
* While the server is running, use `pgrep` to find the server's PID (`pgrep java`)
* Now knowing the PID, while the server is still running, use JMX to load the database with the content of TEST.db:

      java --add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED -jar jmxterm-1.0.4-uber.jar -v verbose
      open (PID HERE)
      bean net.ripe.db.whois:name=Bootstrap
      run loadDump comment TEST.db

* When the import is finished you should see a message in output like `220 succeeded` (objects).
* Exit the JMX console
* Test that it worked by executing a query using telnet:

      telnet localhost 1043
      10.11.11.0

* Test the REST API with curl:

      curl http://localhost:1080/whois/test/inetnum/10.11.11.0/24


If you want to add content, you can use the `TEST-DBM-MNT` mntner whose password (emptypassword) is the `remarks` line.


      curl http://localhost:1080/whois/test/mntner/TEST-DBM-MNT?password=emptypassword


You can check the instructions in [WHOIS-REST-API](../Update-Methods/RESTful-API/#ripe-database-restful-api) for more info about the REST API


## How to allow unlimited queries

The Whois server can block a client's IP as explained [here](../Types-of-Queries/Access-Control-for-Queries/#access-control-for-queries).

You can allow unlimited queries from a certain IP by running a few queries as follows.

The database ACL_LOCAL contains tables related to access control logic in whois. Let's say that the blocked IP is 192.168.0.1.


      INSERT INTO ACL_LOCAL.acl_limit (prefix, daily_limit, comment, unlimited_connections)
      VALUES
      ('192.168.0.1/32', -1, 'a comment', 10000000);

Also make sure there is no other line with the same prefix (`192.168.0.1/32`) in this table.

Also run the following, just in case this IP is permanently denied:

      DELETE FROM ACL_LOCAL.acl_denied WHERE prefix = '192.168.0.1/32'
      DELETE FROM ACL_LOCAL.acl_event WHERE prefix = '192.168.0.1/32';

If MariaDB says that no row was affected, it is fine.

If your client has IPv6, use the IPv6/64 prefix.

Commit the changes and in a couple of minutes the Whois server will pick it up and will not block that IP again.


## How to enable Full-Text Search queries

The Whois server supports text searches [full text search](../How-to-Query-the-RIPE-Database/Web-Query-Form/#using-full-text-search).
To enable this feature, you need to have a running instance of Elasticsearch either locally or on a server 
accessible from your machine. For more details on setup Elasticsearch visit: 
[Elasticsearch setup](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html).
Ensure that the Elasticsearch version is compatible with the `elasticsearch.version` property 
specified in `pom.xml`.

* Configuring Whois to Use Elasticsearch: If your Elasticsearch instance **only supports HTTP** (not HTTPS), you need 
  to modify `ElasticSearchInstance.getEsClient`. You need to update `https` to `http` in the method and rebuild the 
  Whois JAR with the updated configuration.

  You need to modify the properties field to include:

      whois.source=<source>
      whois.db.slave.url=jdbc:mariadb://localhost/<Schema where required sources are>
      elastic.host=<Host:port where you are running Elasticsearch. i.e.: localhost:9200 if you are running it locally>
      elastic.user=<Set the elasticsearch user if needed>
      elastic.password=<Set the elasticsearch password if needed> 

  Ensure the database **schema** contains the necessary source for full-text search.
* Creating an Elasticsearch Index: After starting the Whois server, run the following `JMX command` to initialize whois indexes. 
  This will create a necessary index with the format `whois-yyyyMMdd-HHmmss`.
  
      java --add-exports jdk.jconsole/sun.tools.jconsole=ALL-UNNAMED -jar jmxterm-1.0.4-uber.jar -v verbose

  Then, inside JMX:
  
      $> open (PID)
      $> bean net.ripe.db.whois:name=ElasticSearchRebuildIndex
      $> run runRebuildIndexes <comment>
      Successfully rebuilt indexes

  This will populate the Elasticsearch index with Whois data.
  ElasticFullTextIndex job will run each minute to keep the index updated.
* Testing the Full-Text Search: 
  
  To confirm that Elasticsearch is properly indexing data, run:

      curl http://<host>:<port>/whois/_count
  ✔ Expected output: Number of indexed documents
  Perform a Full-Text Search Query

      curl "http://localhost:1080/whois/fulltextsearch/select.json?q=Example&wt=json"
  ✔ Expected output: JSON results containing Whois records matching "Example"
