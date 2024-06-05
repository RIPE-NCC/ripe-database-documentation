---
permalink: /Installation-and-Development/Getting-started-on-macOS
---

# Getting Started on macOS

<i>It is recommended that for quick installation of necessary following binaries use one of package managers:
  * Brew(http://brew.sh)
  * MacPorts(https://www.macports.org/)</i>

## Java

Java can be installed on macOS in one of the 3 offered ways

### Using [Brew](http://brew.sh)
* Run `brew install java`

### Using [MacPorts](https://www.macports.org/)
* Run `port install java`

### Manually
* Download and manually install OpenJDK from https://adoptium.net/

Make sure after installation that running 'java -version' reports the correct Java version.

## Maven

Maven can be installed on macOS in one of the 3 offered ways

### Using [Brew](http://brew.sh)
* Run `brew install maven`

### Using [MacPorts](https://www.macports.org/)
* Run `port install maven`

### Manually
* Download and install manually Maven 3 (http://maven.apache.org)

Maven needs more memory by default to complete the build.
 * Update ~/.bash_profile and add: export MAVEN_OPTS=-Xmx1024m

## Git
[Git](https://git-scm.com/) can be installed via Apple's Xcode Command Line Tools, Brew or MacPorts.

If Brew or MacPorts is installed, Git should already be installed, as they both require Apple's Xcode Command Line Tools.

### Git Bash completion (optional)
Bash can complete Git commands, but it needs additional setup.

#### Using [Brew](http://brew.sh)
The Git formulae ships Git's bash completion:
* Run `brew install git`

bash-completion is required for bash completion to work. Depending on which bash is used, a different formulae must be installed:
* for Homebrew's `bash` (>= v4): Run `brew install bash-completion@2`
* for macOS's `bash` (v3.2.57): Run `brew install bash-completion`

Read the formulae's caveats for instructions on how to activate bash-completion by adding a line in your `.bash_profile`.

## MariaDB

### Installation

There are multiple ways to install MariaDB on macOS.

#### Using [Brew](http://brew.sh)
 * `brew install mariadb`

#### Using [MacPorts](https://www.macports.org/)
 * `port install mariadb; port install mariadb-server`
 * Optionally, you can load mariadb to start it and also with every boot of the system
  * `sudo port load mariadb-server`
 * Start MariaDB manually
  * `cd /opt/local; sudo /opt/local/lib/mariadb/bin/mysqld_safe --datadir='/opt/local/var/db/mariadb' &`

### Configuration

[Configure MariaDB](../Installation-and-Development/Configure-MariaDB/#configure-mariadb)
