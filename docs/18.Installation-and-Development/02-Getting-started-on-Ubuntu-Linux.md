---
permalink: /Installation-and-Development/Getting-started-on-Ubuntu-Linux
lastUpdated: 1688729039000
prev:
  text: 01 Getting started on macOS
  link: /Installation-and-Development/01-Getting-started-on-macOS/
next:
  text: 03 Building whois
  link: /Installation-and-Development/03-Building-whois/
---

# Getting started on Ubuntu Linux

## Install packages

As root, install a set of packages already available in the Ubuntu Linux repositories:

`sudo apt-get install git maven oracle-java8-jdk mariadb-client-5.5 mariadb-server-5.5`

## Configure MariaDB

[Configure MariaDB](../Installation-and-Development/Configure-MariaDB/#configure-mariadb)

## System

If at one point you see an error from MariaDB like 'too many open files' then update /etc/sysctl.conf

    sysctl -w kern.maxfiles=1048600
    sysctl -w kern.maxfilesperproc=1048576
