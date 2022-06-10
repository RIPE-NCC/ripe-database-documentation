# BGP State
---------

This data call returns the state of BGP routes for a resource at a certain point in time, as observed by all the RIS collectors.  
This is derived by applying a computation of state to the RIB dump (granularity=8h) that occurred exactly before that time, using the BGP updates observed between the RIB time and the query time.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'140.78/16', timestamp: '2020-12-21T12:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix, IP address, AS or a list of valid comma-separated resources | Defines the resource that the query is performed for. If a list of resources is supplied, the results will be combined for all of them. | YES |
| timestamp | ISO8601 or Unix timestamp | Defines the time for when to perform the query. | NO - default: latest time there is BGP data available |
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

<td>bgp_state</td>

<td>List of BGP routes.  

<table>

<tbody>

<tr>

<td>target_prefix</td>

<td>Prefix to which this BGP route refers to.</td>

</tr>

<tr>

<td>path</td>

<td>The AS path in this BGP route, formatted as a list of ASes (first element is the direct BGP neighbour, last element is the origin AS).</td>

</tr>

<tr>

<td>community</td>

<td>The list of communities in this BGP route.</td>

</tr>

<tr>

<td>source_id</td>

<td>The id of the route collector (rrc) neighbouring peer through which this BGP route was observed. The format is "[rrc number]-[peer IP address]".</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td>nr_routes</td>

<td>The number of BGP routes observed at that time.</td>

</tr>

<tr>

<td>query_time</td>

<td>Defines the time of the query.</td>

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

curl --location --request GET "https://stat.ripe.net/data/bgp-state/data.json?resource=140.78/16&timestamp=2020-12-21T12:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/bgp-state/data.json?resource=140.78/16&timestamp=2020-12-21T12:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
