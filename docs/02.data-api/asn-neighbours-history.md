# ASN Neighbours History

This data call returns information about neigbouring ASNs of a queried ASN extended with history.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS1205'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN for this query | This is the ASN the neighbours are shown for. | YES |
| starttime | ISO8601 or Unix timestamp | Defines the query starttime for the query | NO - if not set it falls back to "endtime - 90 days" |
| endtime | ISO8601 or Unix timestamp | Defines the query endtime for the query | NO - if not set it falls back to the latest available data point |
| max_rows | integer | Defines the limit of neighbours to be included in the result, e.g. max_rows=50 means the result will be truncated to 50 neighbours. Has not effect if there are less neighbours anyway. | NO - default: 1800 |

### Data Output

<table>

<tbody>

<tr>

<th>Key</th>

<th>Info</th>

</tr>

<tr>

<td>neighbours</td>

<td>List of neighbours included in the result. Each with the following content:

<table>

<tbody>

<tr>

<td>neighbour</td>

<td>the AS number of the neighbour</td>

</tr>

<tr>

<td>timelines</td>

<td>a list of timeintervals (starttime/endtime) when this AS was seen as a neighbour</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td>query_starttime/query_endtime</td>

<td>Holds the start and endtime for this query</td>

</tr>

<tr>

<td>earliest_time/latest_time</td>

<td>Holds the time interval for which data is available</td>

</tr>

<tr>

<td>resource</td>

<td>Defines the resource used for the query</td>

</tr>

</tbody>

</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/asn-neighbours-history/data.json?resource=1205"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/asn-neighbours-history/data.json?resource=1205", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 0.4

Difference to 1.*: "resource" field is with the "AS" prefix

:::

::: details upcoming - n.a.

-
:::
