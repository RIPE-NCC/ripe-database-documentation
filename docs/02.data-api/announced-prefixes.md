# Announced Prefixes

This data call returns all announced prefixes for a given ASN. The results can be restricted to a specific time period.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333', starttime: '2020-12-12T12:00' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN | The Autonomous System Number for which to return prefixes. | YES |
| starttime | ISO8601 or Unix timestamp | The start time for the query. | NO - defaults to two weeks before current date and time |
| endtime | ISO8601 or Unix timestamp | The end time for the query. | NO - if not set it falls back to current date and time |
| min\_peers\_seeing | integer | Minimum number of RIS peers seeing the prefix for it to be included in the results. Excludes low-visibility/localized announcements. | NO (default: 10) |

### Data Output

| Key | Info |
| --- | --- |
| prefixes | A list of all announced prefixes + the timelines when they were visible. |
| prefix | The announced prefix. |
| timelines | All the timelines when the prefix was announced. |
| starttime | Start time of this period. |
| endtime | End time of this period. |
| query_starttime | The start of the time the query covers. |
| query_endtime | The end of the time the query covers. |
| latest\_time & earliest\_time | Holds the latest and the earliest time data is available for. |
| resource | The resource used for the query. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/announced-prefixes/data.json?resource=3333&starttime=2020-12-12T12:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/announced-prefixes/data.json?resource=3333&starttime=2020-12-12T12:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 1.2

This is the current and only version of this API call.

:::
