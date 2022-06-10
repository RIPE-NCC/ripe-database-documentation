# Country Resource Stats
----------------------

This data call returns statistics on Internet resources for a country - this includes:

* number of ASNs seen in routing data and registration data
* number of prefixes in routing data and registration data (split into IPv4 and IPv6)
* amount of IPv4 space seen in routing data as well as registration data

The results can be restricted to a specific time period as well the granularity is variable but can be set explicitly.  

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'at', starttime: '2020-12-01T12:00', resolution: '5m'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | 2-digit ISO-3166 country code (e.g. "at","de"...) | Defines the country that the stats are returned for | YES |
| starttime | ISO8601 or Unix timestamp | The start time for the query. See "Default Values for Time Parameters" for details. | NO  |
| endtime | ISO8601 or Unix timestamp | The end time for the query. See "Default Values for Time Parameters" for details. | NO  |
| resolution | string representation for the resolution | Possible values:<br><br>* "5m" - 5 minutes<br>* "1h" - 1 hour<br>* "1d" - 1 day<br>* "1w" - 1 week | NO  |

#### Default Values for Time Parameters

| Starttime | Endtime | Defaults |
| --- | --- | --- |
| set | not set | Endtime falls back to the lastest time data is available for |
| not set | not set | Endtime falls back to "now", starttime defaults to beginning of 2004 |

### Data Output

| Key    | Info    |
| --- | --- |
| stats | Encaplulates the statistics valid for the times seen in the "timeline" field. <table><tbody><tr><td>asns_ris </td><td>Number of ASNs seen in routing data .</td></tr><tr><td>asns_stats </td><td>Number of ASNs seen in registration data. </td></tr><tr><td>v4\_prefixes\_ris </td><td>Number of v4 prefixes seen in routing data. </td></tr><tr><td>v4\_prefixes\_stats </td><td>Number of v4 prefixes seen in registration data </td></tr><tr><td>v6\_prefixes\_ris </td><td>Number of v6 prefixes seen in routing data. </td></tr><tr><td>v6\_prefixes\_stats </td><td>Number of v6 prefixes seen in registration data. </td></tr><tr><td>stats_data </td><td>Timestamp of the RIR stat file that is used for the registration data. </td></tr><tr><td>timeline </td><td> <table><tbody><tr><td>starttime</td><td>Start time of this validity period.</td></tr><tr><td>endtime</td><td>End time of this validity period.</td></tr></tbody></table> </td></tr></tbody></table> |
| query_starttime |The start of the time the query covers. | 
| query_endtime | The end of the time the query covers. | 
| latest\_time & earliest\_time | Holds the latest and the earliest time data is available for. | 
| hd\_latest\_time | Holds the latest (most recent) time data is available for at the highest resolution (high definition) | 
| resource | The resource used for the query. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/country-resource-stats/data.json?resource=at&starttime=2020-12-01T12:00&resolution=5m"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/country-resource-stats/data.json?resource=at&starttime=2020-12-01T12:00&resolution=5m", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
