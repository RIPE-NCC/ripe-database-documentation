---
permalink: /Installation-and-Development/Getting-started-on-Ubuntu-Linux
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
