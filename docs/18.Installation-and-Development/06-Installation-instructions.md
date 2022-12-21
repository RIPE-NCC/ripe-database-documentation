# Installation instructions

In this section we show how to make a standard setup of whois once you compiled the shaded `whois.jar`.

## Prerequisite 

Ensure `/export` directory has been created. 
  - Note on MacOS, Catalina introduced read-only root. Hence creating `export` is not straightforward. See this [post](https://derflounder.wordpress.com/2020/01/18/creating-root-level-directories-and-symbolic-links-on-macos-catalina/), on how to go about doing this. 

Ensure MariaDB and the needed databases are created and populated
  - See [Getting Started on OSX](01-Getting-started-on-OSX.md#getting-started-on-osx) for installation information.
  - See [Configure MariaDB](04-Configure-MariaDB.md#configure-mariadb) for instructions how to create and grant user permission.

## Requirements

* A server with 8GB RAM, 8GB swap, and 120GB disk space is recommended to run Whois.
* the shaded jar produced by release build, located at `whois-db/target/`
* create a role user to run whois server (by default, `dbase`)
* whois root directory, owned by role user
* MariaDB set up (for more instructions, see [Getting Started with development manuals](01-Getting-started-on-OSX.md#getting-started-on-osx))
* `jmxterm-1.0-alpha-4-uber.jar`, downloadable from http://wiki.cyclopsgroup.org/jmxterm.
   * For MAC OSX the 1.0-alpha-4 version of jmxterm has a problem but there is a fix here: https://github.com/jiaqi/jmxterm. You can checkout the latest version and build the jar using mvn clean package.
* `logrotate`
* `pgrep`
* `/usr/lib/sendmail`-compatible mailer, like exim

## Setup
* create a "fat"/shaded  jar using:
`mvn clean install -Prelease`
* Copy `whois-db/target/whois-db-<version>.jar` to whois root directory and rename to `whois.jar`
* Copy the files `tools/hazelcast.xml`, `tools/log4j2.xml`, `tools/logrotate.conf`, `tools/whois.init` from the repo to the whois root directory
* Copy `whois-commons/src/main/resources/whois.properties` from the repo to whois root directory and rename to `properties`
* Copy downloaded `jmxterm` jar to the Whois root directory.
* Adjust the configuration variables at the beginning of `whois.init` script as necessary (e.g. user, jmx port, memory usage, JVM path, etc...)
* Adjust `properties` to match your setup (e.g. JDBC URLs, port numbers, etc...)
   * for the example below we use port.query=1043 and port.api=1080
* Create the databases WHOIS_LOCAL, MAILUPDATES_LOCAL, dnscheck_local, ACL_LOCAL, INTERNALS_LOCAL.

   For example:

      mysql
      create database WHOIS_LOCAL;

   <i>Explanation: Firstly connect to mysql server with `mysql` command and then create database one by one with `create database DATABASE_NAME` command</i>
* For each of the above databases, run the _schema.sql scripts found in ./whois/whois-commons/src/main/resources/.

   For example:

      use WHOIS_LOCAL;
      source ./whois-commons/src/main/resources/whois_schema.sql

   <i>Explanation: Select database with command `use DATABASE_NAME` to be able to run schema on it with command `source PATH_TO_SCHEMA`</i>
* Also run the matching _data.sql scripts found in ./whois/whois-commons/src/main/resources/.
   For example: 

      use WHOIS_LOCAL;
      source ./whois-commons/src/main/resources/whois_data.sql
      use INTERNALS_LOCAL;
      source ./whois-commons/src/main/resources/internals_data.sql

* Start whois by executing `./whois.init start`
   * If the test query for `193.0.0.1` does not result in an inetnum returned, the init script will return a failure. If your database is empty for example, this is normal. You might want to adjust the test whois query to match your needs.
   * Ignore exceptions in the log starting with [DatabaseVersionCheck] Error checking datasource...  
* Check `var/console.log` for errors or warnings
* Every 4 hours you'll get the latest lines in `var/console.log` sent to the `OPEREMAIL` defined in the init script
* Use `./whois.init stop` to stop the server
* Use `./whois.init jmx` to access the administrative interface exported via JMX

## Load local whois with initial test content
* for testing purposes, use `source=TEST` in the `properties` file
* make sure that in `properties` the `port.query` and `port.api` are not zero (e.g. 1043, 1080 respectively).
* copy the file `whois-scheduler/src/test/resources/TEST.db` to the whois root directory
  * The file TEST.db contains an initial set of RPSL objects used for testing purposes.
* while the server is running, use JMX to load the database with the content of TEST.db:

      ./whois.init jmx
      bean net.ripe.db.whois:name=Bootstrap
      run loadDump comment TEST.db

* When the import is finished you should see a message in output like `220 succeeded` (objects)
* exit the jmx console, and test that it worked by executing a query using telnet:

      telnet localhost 1043
      10.11.11.0

      test the REST API with curl:

      curl http://localhost:1080/whois/test/inetnum/10.11.11.0/24


if you want to add content, you can use the `TEST-DBM-MNT` mntner whose password (emptypassword) is the `remarks` line.


      curl http://localhost:1080/whois/test/mntner/TEST-DBM-MNT?password=emptypassword


you can check the instructions in [WHOIS-REST-API](../06.Update-Methods/01-RESTful-API.md#ripe-database-restful-api) for more info about the REST API


## How to allow unlimited queries

The Whois server can block a client's IP as explained [here](../13.Types-of-Queries/12-Access-Control-for-Queries.md#access-control-for-queries).

You can allow unlimited queries from a certain IP by running a few queries as follows.

The database ACL_LOCAL contains tables related to access control logic in whois. Let's say that the blocked IP is 192.168.0.1.


      INSERT INTO ACL_LOCAL.acl_limit (prefix, daily_limit, comment, unlimited_connections)
      VALUES
      ('192.168.0.1/32', -1, 'a comment', 10000000);

also make sure there is no other line with the same prefix ('192.168.0.1/32') in this table.

Also run the following, just in case this IP is permanently denied:

      DELETE FROM ACL_LOCAL.acl_denied WHERE prefix = '192.168.0.1/32'
      DELETE FROM ACL_LOCAL.acl_event WHERE prefix = '192.168.0.1/32';

If MariaDB says that no row was affected, it is fine.

if your client has IPv6, use the IPv6/64 prefix.

Commit the changes and in a couple of minutes the Whois server will pick it up and will not block that IP again.