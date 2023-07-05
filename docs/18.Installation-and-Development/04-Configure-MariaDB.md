---
permalink: /Installation-and-Development/Configure-MariaDB
---

# Configure MariaDB

Installing a MariaDB server is useful for development, or for running your own Whois server.

## Configuration

Set the following variables in the MariaDB configuration (location varies depending on installation, the configuration file is normally called my.cnf).

* max_allowed_packet = 20M
  * We need big packet sizes as some objects are very big
  * Default is 1M 
  * Ref. https://mariadb.com/kb/en/mariadb/server-system-variables/#max_allowed_packet

* wait_timeout = 31536000
  * Time in seconds that the server waits for a connection to become active before closing it.
  * Default is 28800 (8 hours) 
  * Ref. https://mariadb.com/kb/en/mariadb/server-system-variables/#wait_timeout

* innodb_buffer_pool_size = 2356M
  * as we only have innodb databases, this should be set to use all the remaining memory available
  * leave some memory for the OS, and the Whois Java process, and check for swap activity
  * default is 128MB
  * Ref. https://mariadb.com/kb/en/mariadb/xtradbinnodb-server-system-variables/#innodb_buffer_pool_size

Restart MariaDB once all configuration changes have been made.

## Configure access to the database

* Check if MariaDB is running `mysqladmin -u root -p ping`
* Login to mysql using `mysql -u root -p`
* Create user dbint with no (empty) password


  CREATE USER 'dbint'@'localhost' IDENTIFIED BY '';
  GRANT ALL PRIVILEGES ON \*.\* TO 'dbint'@'localhost';
  CREATE USER 'rdonly'@'localhost' IDENTIFIED BY '';
  GRANT SELECT PRIVILEGES ON \*.\* TO 'rdonly'@'localhost';
  FLUSH PRIVILEGES;
  
Logout with `CTRL+D`
