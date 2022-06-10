# Routing History
---------------

This data call shows the history of announcements for prefixes, including the origin ASN and the first hop.

The data comes from the RIS route collectors.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix or ASN | The resource to query. This is a prefix (v4/v6), IP address or AS number. | yes |
| max_rows | integer | The maximum number of routes to return. This is a soft limit: all recorded routes for each origin ASN are returned, but when the row limit is reached no more origins will be returned. | no (default: 3000) |
| include\_first\_hop | boolean | Include the first hop ASN in the route, instead of just the origin ASN. | no (default: false) |
| normalise_visibility | boolean | Add a visibility field to each timeline indicating the visibility of the route (according to RIS) at that point in time. The visibility is computed as the peers_seeing divided by the number of RIS full table peers at the time. | no (default: false) |
| min_peers | integer | Minimum number of full-feed RIS peers seeing the route for the segment to be included in the results. Excludes low-visibility/localized announcements. | no (default: 10) |
| starttime | ISO8601 or Unix timestamp | Defines the starttime for the query | no  |
| endtime | ISO8601 or Unix timestamp | Defines the endtime for the query | no (default: latest time there is BGP data available) |

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
                <td>by_origin</td>
                <td>
                    A list containing routes grouped by origin.
                    <table>
                        <tr>
                            <td>origin</td>
                            <td>The ASN (or AS pair including first hop) of the announcing prefix.</td>
                        </tr>
                        <tr>
                            <td>prefixes</td>
                            <td>A list of prefixes and timelines.
                                <table>
                                    <tr>
                                        <td>prefix</td>
                                        <td>The IPv4 or IPv6 prefix in standard notation.</td>
                                    </tr>
                                    <tr>
                                        <td>timelines</td>
                                        <td>Time periods during which this origin announced this prefix.
                                            <table>
                                                <tr>
                                                    <td>starttime</td>
                                                    <td>The start time of the period.</td>
                                                </tr>
                                                <tr>
                                                    <td>endtime</td>
                                                    <td>The end time of the period.</td>
                                                </tr>
                                                <tr>
                                                    <td>full_peers_seeing</td>
                                                    <td>The number of RIS full-feed peers that saw this route.</td>
                                                </tr>
                                                <tr>
                                                    <td>visibility (if normalise_visibility=true)</td>
                                                    <td>Visibility of the route according to RIS. In case of unreliable or missing peer information, this value will be "-1".</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        <tr>
            <td>
                query_starttime, query_endtime
            </td>
            <td>
                The start and end time for which the data is valid.
            </td>
        </tr>
        <tr>
            <td>
                latest_max_ff_peers
            </td>
            <td>
                This gives the number of maximum full-table peers seen as per IP version in RIS.
            </td>
        </tr>
    </tbody>
</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/routing-history/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/routing-history/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 1.3

Difference to 2.*: "resource" field for AS queries is with the "AS" prefix

:::

::: details upcoming - n.a.

-

:::