---
permalink: /Installation-and-Development/Getting-started-on-OSX
---

# Getting Started on OSX

* For Mac OS X create or update the file `~/.bash_profile`.
* Some paths may need to be modified based on your local configuration.
* Source init script after making changes: `. ~/.bash_profile`.

<i>It is recommended that for quick installation of necessary following binaries use one of package managers:
  * Brew(http://brew.sh)
  * MacPorts(https://www.macports.org/)</i>

## Java

Java can be installed on OS X on one of the 3 offered ways

#### Using [Brew](http://brew.sh)
* Run `brew install java`

#### Using [MacPorts](https://www.macports.org/)
* Run `port install java`

#### Manually
* Download and manually install OpenJDK 8 from https://adoptopenjdk.net

Make sure after installation that running 'java -version' reports Java 1.8.

## Maven

Maven can be installed on OS X on one of the 3 offered ways

#### Using [Brew](http://brew.sh)
* Run `brew install maven`

#### Using [MacPorts](https://www.macports.org/)
* Run `port install maven`

#### Manually
* Download and install manually Maven 3 (http://maven.apache.org)

Maven needs more memory by default to complete the build.
 * Update ~/.bash_profile and add: export MAVEN_OPTS=-Xmx1024m

## Git
* Download and install Git (http://git-scm.com)

### Bash extension (optional)
* Download Git completion (https://github.com/git/git/blob/master/contrib/completion/git-completion.bash)
* Follow instructions in `git-completion.bash` for installation
* Download and install Git bash (https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh)
* Update `~/.bash_profile`

        # Git
        . /usr/local/git/contrib/completion/git-completion.bash
        . /usr/local/git/contrib/completion/git-prompt.sh
        PS1='\u@local:\w$(__git_ps1 " (%s)")\$ '


## MariaDB 10.2

### Installation

There are multiple ways to install MariaDB on OS X.

#### Using [Brew](http://brew.sh)
 * `brew install mariadb`

#### Using [MacPorts](https://www.macports.org/)
 * `port install mariadb; port install mariadb-server`
 * Optionally, you can load mariadb to start it and also with every boot of the system
  * `sudo port load mariadb-server`
 * Start MariaDB manually
  * `cd /opt/local; sudo /opt/local/lib/mariadb/bin/mysqld_safe --datadir='/opt/local/var/db/mariadb' &`

### Configuration

[Configure MariaDB](Configure-MariaDB.md#configure-mariadb)

## Prepare /export directory

Some tests need /export directory to be readable/writable by your user:

    sudo mkdir /export
    sudo chown YOUR_USERNAME /export


> Note that since Catalina, it is not possible to directly create directories under `/` as it is now read only. See this [guide](https://derflounder.wordpress.com/2020/01/18/creating-root-level-directories-and-symbolic-links-on-macos-catalina/) on how to create `/export`

[Continue to Development](Building-whois.md#building-whois)
