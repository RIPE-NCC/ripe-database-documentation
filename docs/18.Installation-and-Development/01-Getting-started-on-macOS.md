---
permalink: /Installation-and-Development/Getting-started-on-macOS
---

# Getting Started on macOS

It is recommended to use [Brew](http://brew.sh) for quick installation of required binaries.

## Java

Install OpenJDK 17 or higher.

### Using [Brew](http://brew.sh)
* Run `brew install openjdk`

### Manually
* Download and manually install OpenJDK from https://adoptium.net/

Make sure after installation that running 'java -version' reports the correct Java version.

## Maven

Maven can be installed on macOS in one of the 3 offered ways

### Using [Brew](http://brew.sh)
* Run `brew install maven`

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

### Configuration

[Configure MariaDB](../Installation-and-Development/Configure-MariaDB/#configure-mariadb)
