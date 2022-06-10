# Allocation History


This data call returns information supplied by IANA and RIRs for allocations and direct assignments of prefixes and AS numbers of time.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '140.78/16', starttime: '2020-12-12T12:00'}"/>

### Parameters

|Key|Value|Info|Required|
|--- |--- |--- |--- |
|resource|prefix, IP range or ASN||YES|
|starttime|ISO8601 or Unix timestamp|Defines the starttime for the query|YES|
|endtime|ISO8601 or Unix timestamp|Defines the endtime for the query|NO - if not set it falls back to "now"|

### Output
#### Data

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="header">
<th>Key</th>
<th>Info</th>
</tr>

<tr class="odd">
<td>results</td>
<td>Contains information on allocations and direct assignments by IANA and the RIR(s) authoritative for the resource. Each block has the following structure:<br />
<br />

<table>
<tbody>
<tr class="odd">
<td>resource</td>
<td>the exact resource this entry is about</td>
</tr>
<tr class="even">
<td>status</td>
<td>the status according to the RIR or IANA delegation statistics</td>
</tr>
<tr class="odd">
<td>timelines</td>
<td>list of time intervals (starttime and endtime) this entry was valid for</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td>query_starttime</td>
<td>Defines the starttime the query covers</td>
</tr>
<tr class="odd">
<td>query_endtime</td>
<td>Defines the endtime the query covers</td>
</tr>
<tr class="even">
<td>resource</td>
<td>Defines the resource used for the query</td>
</tr>
</tbody>
</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/allocation-history/data.json?resource=140.78/16&starttime=2020-12-12T12:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/allocation-history/data.json?resource=140.78/16&starttime=2020-12-12T12:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details  1.0

Difference to 1.\*: "resource" field for AS queries is with the "AS" prefix

:::

::: details 1.1

-
:::
