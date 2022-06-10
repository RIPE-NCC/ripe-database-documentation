# BGP Update Activity
-------------------

This data call returns the number of BGP updates seen over time. Results are aggregated in time intervals, the lenght of which is determined by the input parameters.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '140.78/16', starttime: '2020-12-12T12:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix, IP range or AS | defines the resource the query is carried out on | YES |
| starttime | ISO8601 or Unix timestamp | Defines the starttime for the query | Only when specific endtime is set  |
| endtime | ISO8601 or Unix timestamp | Defines the endtime for the query | NO - if not set it falls back to "now" |
| max_samples | Positive integer, or 0 to disable | BGP events are aggregated in to at most this number of sampling periods | NO - defaults to 50 |
| min\_sampling\_period | Positive number of seconds | The smallest possible time period for each interval. It will be automatically increased to satisfy 'max_samples' | NO - defaults to 1 minute |
| num_hours | number | Number of hours to look back. If no 'starttime' and 'endtime' are provided this parameter will be used to calculate 'starttime' from the deafult 'endtime' (which is 'now'). | NO - defaults to 14 * 24 hours |
| hide\_empty\_samples | boolean | If true (default) then samples with 0 updates will not be returned - they are simply implied by the returned query\_startendtime/query\_endtime. | NO - defaults to true (may be changed in a later release) |

### Data Output

| Key | Info |
| --- | --- |
| updates | List with BGP update activity samples: <table><tr><td>starttime</td><td>The beginning of each sample</td></tr><tr><td>announcements</td><td>The number of announcements in this sample</td></tr><tr><td>withdrawals</td><td>The number of withdrawals in this sample  <br>Note: this is currently always 'null' when querying an ASN</td></tr></table> |
| sampling_period | The duration in seconds of each sample interval |
| sampling\_period\_human | A human-readable version of the sampling period. |
| query_starttime | The starttime the query covers |
| query_endtime | The endtime the query covers |
| resource | Defines the resource used for the query |
| resource_type | The detected type of the queried resource ("asn", 4 or 6) |
| max_samples | The maximum number of samples returned |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/bgp-update-activity/data.json?resource=140.78/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/bgp-update-activity/data.json?resource=140.78/16", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
