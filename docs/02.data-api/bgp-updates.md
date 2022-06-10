# BGP Updates
-----------

This data call returns the BGP updates observed for a resource over a certain period of time.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '140.78/16', endtime: '2020-12-21T12:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix, IP address, AS or a list of valid comma-separated resources | Defines the resource that the query is performed for. If a list of resources is supplied, the results will be combined for all of them. | YES |
| starttime | ISO8601 or Unix timestamp | Defines the starttime for the query | NO - default: (endtime - 48h) |
| endtime | ISO8601 or Unix timestamp | Defines the endtime for the query | NO - default: latest time there is BGP data available |
| rrcs | Single-value or comma-separated values of RRC numbers (4 or 0,4,12,15) | The list of Route Collectors (RRCs) to get the results from. | NO - default behaviour: all RRCs |
| unix_timestamps | TRUE or FALSE | If TRUE, will format the timestamps in the result as Unix timestamp. | NO - default: FALSE |

### Data Output

<table>

<tbody>

<tr>

<th>Key</th>

<th>Info</th>

</tr>

<tr>

<td>updates</td>

<td>List of observed BGP updates, in chronological order of occurrence.  

<table>

<tbody>

<tr>

<td>type</td>

<td>Type of BGP update: "A"=Announcement, "W"=Withdrawal.</td>

</tr>

<tr>

<td>timestamp</td>

<td>Time (UTC) of the BGP update.</td>

</tr>

<tr>

<td>attrs</td>

<td>Attributes of the BGP update (some fields depend on the update type).  

<table>

<tbody>

<tr>

<td>target_prefix</td>

<td>Prefix to which this BGP update refers to.</td>

</tr>

<tr>

<td>path (only on A update types)</td>

<td>The AS path in this BGP announcement, formatted as a list of ASes (first element is the direct BGP neighbour, last element is the origin AS).</td>

</tr>

<tr>

<td>community (only on A update types)</td>

<td>The list of communities in this BGP announcement.</td>

</tr>

<tr>

<td>source_id</td>

<td>The id of the route collector (rrc) peer through which this BGP update was observed. The format is "[rrc number]-[peer IP address]".</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td>seq</td>

<td>Sequential integer ordering the received BGP events</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td>nr_updates</td>

<td>The number of BGP updates observed in this time period.</td>

</tr>

<tr>

<td>query_starttime</td>

<td>Defines the start of the time interval covered in the query.</td>

</tr>

<tr>

<td>query_endtime</td>

<td>Defines the end of the time interval covered in the query.</td>

</tr>

<tr>

<td>resource</td>

<td>Defines the resource used in the query.</td>

</tr>

</tbody>

</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/bgp-updates/data.json?resource=140.78/16&timestamp=2020-12-21T12:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/bgp-updates/data.json?resource=140.78/16&timestamp=2020-12-21T12:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
