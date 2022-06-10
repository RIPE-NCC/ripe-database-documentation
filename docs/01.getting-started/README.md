# What is RIPEstat

RIPEstat is a large-scale information service and the RIPE NCC’s open data platform. You can get essential information on IP address space and Autonomous System Numbers (ASNs) along with related statistics on specific hostnames and countries.

Our goal is to provide useful data to our members and the Internet community at large, with a focus on data related to routing and the RIPE Database. We are currently in the process of consolidating all of the RIPE NCC's public data sets into RIPEstat, so that RIPEstat will eventually become the sole interface for users accessing any of the RIPE NCC's publicly available data, making it easier for our users to retrieve this data using one consolidated, consistent and well-organised interface. 

It presents registration and routing data, DNS data, geographical information, abuse contacts and more from the RIPE NCC's internal data sets as well as from external sources, such as other Regional Internet Registries and IANA. 

## Getting started with RIPEstat

RIPEstat consists of two parts: the Data API that supplies the data and responds to queries, and a user interface (UI) which shows how the data can be visualised.

## Data API
Are you a developer or a network operator working on network automation? You can use the Data API to consume data directly and create customised alerts, configurations, visualisations or entire applications. You can use it both for commercial and non-commercial purposes.

The Data API is also the public data interface for RIPEstat and the data source for the RIPEstat UI.

[Take a look at the documentation for the Data API here.](../02.data-api)

## RIPEstat UI
This is your mobile-friendly, easy-to-use solution to quickly get to RIPEstat data. Query the Data API and generate collections of infocards that can be saved, shared and organised for your needs.

[Take a look at the documentation for the RIPEstat UI](../03.RIPEstat-UI)

## Query Formats 

We currently support the following query types:

* ASN (Autonomous System Number)
    * Ex: AS123, AS123.456, AS12345678 or just 123
* IP address
    * Ex: 1.2.3.4, 2001::1
* IP prefix
    * Ex: 1.2.3/24, 2001::/48
* IPv4 range
    * Ex: 1.2.3.4 - 5.6.7.8
* hostname
    * Ex: www.ripe.net, www.google.com
* country code (ISO)
    * Ex: NL, US

## What is the timeliness of the data?

The timeliness of the data depends on a number of factors: 

-	The frequency of when the data is collected (every minute, or every hour)
-	When the data store is normally updated (is data added to the database once an hour, or once a day)
-	The normal delay between when data is collected and when it becomes part of an update (if the update takes 10 minutes to run, does it also update with data which was collected during those 10 minutes)
-	Whether the entire process functioned normally (was there a failure during data collection or data processing)
-	Caching can also affect the results
