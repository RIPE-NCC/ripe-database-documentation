# RIS Peer Count
--------------

This data call provides information on the number of peers as seen by [RIS](https://ris.ripe.net), the RIPE NCC's Routing Information Service. The data call supports history and each data point is aligned to the RIS RIB dump times (every 8 hours starting from midnight each day). Additionally the data shows the number of full-table peers with paramters to change the threshold (per address family).

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| starttime/endtime | ISO8601 or Unix timestamp | Defines the start and end time for the query window | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| v4\_full\_prefix\_threshold/ v6\_full\_prefix\_threshold | digit | Defines the thresholds (IPv4 and IPv6) used to calculate the number of full-table peers. | NO - default are returned in the output. |

### Data Output

<table>

<tbody>

<tr>

<th>Key</th>

<th>Info</th>

</tr>

<tr>

<td>peer_count</td>

<td>Groups the address families. Each group item ("v4" or "v6") has the following structure:  

<table>

<tbody>

<tr>

<td>total or full_feed</td>

<td>"total" shows the total number of peers and "full_feed" shows the number of peers that are considered full-table peers. Each group has further:  

<table>

<tbody>

<tr>

<td>count</td>

<td>The number of peers</td>

</tr>

<tr>

<td>timestamp</td>

<td>Date and time (UTC) when this data point is valid, in ISO8601 format</td>

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

<td>v4_full_prefix_threshold/ v6_full_prefix_threshold</td>

<td>Reflects the thresholds that are used for the calculations of the full-table peers. Both (IPv4 and IPv6) are the number of prefixes a peer needs to send before it is considered a full-table peer.</td>

</tr>

<tr>

<td>starttime / endtime</td>

<td>Reflects the start and end time for the query window of the result.</td>

</tr>

</tbody>

</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-peer-count/data.json"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-peer-count/data.json", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 1.0

Difference to 1.1: threshold parameters for full-table peer calculation is supported

:::

::: details upcoming - n.a.
-
:::