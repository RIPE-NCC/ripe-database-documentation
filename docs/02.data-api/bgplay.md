# BGPlay
------

This data call represents the scenario of what occurred to the BGP routes of a resource over a period of time.  
It includes data that defines the initial BGP state at the start time of the query, and all the BGP updates observed from then until the end time, as well as a description of all the AS nodes, and RIS BGP peers involved in the result.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '140.78/16', starttime: '2020-12-21T07:00', endtime: '2020-12-21T12:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix, IP address, AS or a list of valid comma-separated resources | Defines the resource that the query is performed for. If a list of resources is supplied, the results will be combined for all of them. | YES |
| starttime | ISO8601 or Unix timestamp | Defines the starttime for the query | NO - default: (endtime - 8h) |
| endtime | ISO8601 or Unix timestamp | Defines the endtime for the query | NO - default: latest time there is BGP data available |
| rrcs | Single-value or comma-separated values of RRC numbers (4 or 0,4,12,15) | The list of Route Collectors (RRCs) to get the results from. | NO - default behaviour: all RRCs |
| unix_timestamps | TRUE or FALSE | If TRUE, will format the timestamps in the result as Unix timestamp. | NO - default: FALSE |

### Data Output
  
| Key    | Info    |
| --- | --- |
| initial_state | The state of the BGP routes for this resource at the starttime. Formatted as defined in the "bgp_state" section of [bgp-state](/docs/data_api#BGPState). |
| events | The BGP updates observed for this resource during the query time interval. Formatted as defined in the "updates" section of [bgp-updates](/docs/data_api#BGPUpdates). |
| nodes | Descriptive information of all the ASes present in the AS paths of the BGP routes/updates. <table><tbody><tr><td> as-number </td><td>The AS number.</td></tr><tr><td> owner </td><td>The name of the organisation estimated to hold this AS number.</td></tr></tbody></table> |
| targets | List of all the unique target prefixes present in the results. |
| sources | Descriptive information of all the RIS collectors neighbouring peers through which the BGP routes/updates were observed. <table><tbody><tr><td> id  </td><td>Id of the source peer, as referred to in the BGP entries found in the "initial_state" and "events" sections.</td></tr><tr><td> rrc  </td><td>The number of the RIS route collector with which this source is peering.</td></tr><tr><td> ip  </td><td>Peering IP address of this RIS neighbour.</td></tr><tr><td> as_number  </td><td>AS number of this RIS neighbour.</td></tr></tbody></table> |
| query_starttime | Defines the start of the time interval covered in the query. |
| query_endtime | Defines the end of the time interval covered in the query. |
| resource | Defines the resource used in the query. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/bgplay/data.json?resource=140.78/16&starttime=2020-12-21T07:00&endtime=2020-12-21T12:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/bgplay/data.json?resource=140.78/16&starttime=2020-12-21T07:00&endtime=2020-12-21T12:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
