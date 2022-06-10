# RIS Peerings
------------

This data call returns routes for advertisements of a given IP resource, or that are originated from a given ASN, as seen by the RIPE NCC route collectors.

Historical lookups are supported - a query has to be aligned to the times (00:00, 08:00 and 16:00 UTC) when RIS data has been collected. By default, the data call returns the latest data.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'140.78.0.0/16'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix | -   | YES |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value will be automatically aligned to a RIS collection time. | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |

### Data Output

<table>
<tbody>
<tr>
	<th>
		Key
	</th>
	<th>
		Info
	</th>
</tr>

<tr>
	<td>
		peerings
	</td>
	<td>
            A list of ASNs grouped by the RIPE NCC Routing Information Service probe they were seen by. Each group item has the following structure:
            <br><br>
            <table>
                <tr>
                    <td>probe</td>
                    <td>A RIPE NCC Routing Information Service probe. For each probe the following details are provided:
                    <br><br>
                        <table>
                            <tbody>
                                <tr>
                                    <td>city / country</td>
                                    <td>The probe's human readable location.</td>
                                </tr>
                                <tr>
                                    <td>longitude / latitude</td>
                                    <td>Coordinates of the probe's location.</td>
                                </tr>
                                <tr>
                                    <td>name</td>
                                    <td>ID of the probe.</td>
                                </tr>
                                <tr>
                                    <td>ixp</td>
                                    <td>Name of the internet exchange hosting the probe.</td>
                                </tr>
                                <tr>
                                    <td>ipv4_peer_count / ipv6_peer_count</td>
                                    <td>Number of IPv4 or IPv6 peers with this probe.</td>
                                </tr>
                            </tbody>
                        </table>    
                    </td>
                </tr>
                <tr>
                    <td>peers</td>
                    <td>A list of peers of the route collector probe. For each peer the following details are provided:
                    <br><br>
                        <table>
                            <tbody>
                                <tr>
                                    <td>asn</td>
                                    <td>Autonomous System Number of the peer.</td>
                                </tr>
                                <tr>
                                    <td>ip</td>
                                    <td>IP address of the peer.</td>
                                </tr>
                                <tr>
                                    <td>ip_version</td>
                                    <td>IP version (4 or 6) of the peering IP.</td>
                                </tr>
                                 <tr>
                                    <td>table_version</td>
                                    <td>IP family (4 or 6) of the prefix table being passed by the peer. For ASn queries, if the peer announces both IPv4 and IPv6 tables, two separate entries will be present in this peer list.</td>
                                </tr>
                                <tr>
                                    <td>prefix_count</td>
                                    <td>Number of prefixes of the family specified in table_version, announced in this peering session.</td>
                                </tr>
                                <tr>
                                    <td>routes</td>
                                    <td>List of AS-paths (of the table_version family) routes related to the queried prefix/ASn, as passed by the peer.</td>
                                </tr>
                            </tbody>
                        </table>    
                    </td>
                </tr>
                </table>
	</td>
</tr>

<tr>
    <td>
        resource
    </td>
    <td>
        The resource this query based on.
    </td>
</tr>
<tr>
    <td>
        query_starttime/query_endtime
    </td>
    <td>
        The time period the query covers. In the upcoming version 2 this will change to just "query_time".
    </td>
</tr>
</tbody>
</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-peerings/data.json?resource=140.78.0.0/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-peerings/data.json?resource=140.78.0.0/16", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 0.4

Difference to 1.*: "resource" field for AS queries is with the "AS" prefix

:::

::: details upcoming - 2.0

Difference to 1.*: query\_starttime and query\_endtime will be replace by just query_time in the output

:::