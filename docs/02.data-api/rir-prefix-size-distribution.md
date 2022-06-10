# RIR Prefix Size Distribution
----------------------------

This data call returns the number of allocations and assignments (below the queried resource) according to registration data provided by Regional Internet Registries.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'140.0.0.0/8'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix to query for | -   | YES |
| query_time | ISO8601 or Unix timestamp; note that every query_time passed will be normalized to midnight | Defines the query time | NO  |

### Data Output

<table>

<tbody>

<tr>

<th>Key</th>

<th>Info</th>

</tr>

<tr>

<td>rirs</td>

<td>A list of prefix size distributions grouped by RIR. Each item has the following structure:  

<table>

<tbody>

<tr>

<td>rir</td>

<td>AFRINIC, APNIC, ARIN, LACNIC or RIPE NCC</td>

</tr>

<tr>

<td>distribution</td>

<td>A list of distributions grouped by prefix size. Each distribution has the following strucutre:  

<table>

<tbody>

<tr>

<td>prefix_size</td>

<td>The prefix size in bits</td>

</tr>

<tr>

<td>count</td>

<td>The number of prefixes of this size</td>

</tr>

</tbody>

</table>

</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td>resource</td>

<td>holds the resource this query based on</td>

</tr>

<tr>

<td>query_starttime/query_endtime</td>

<td>defines the time period the query covers</td>

</tr>

</tbody>

</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rir-prefix-size-distribution/data.json?resource=140.0.0.0/8"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rir-prefix-size-distribution/data.json?resource=140.0.0.0/8", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 0.6

This is the current and only version of this API call.

:::