# Address Space Usage


This data call shows the usage of a prefix or IP range
according to the objects currently present in the RIPE database.
The data returned lists the assignments and allocations covered by the queried resource as well statistics on the
total numbers of IPs in the different categories.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '193/23'}"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix or IP range | States the prefix or IP range the address space usage should be returned for | YES |
| all\_level\_more_specifics | boolean | This parameter allows to control that all levels (True) or only the first level (False) of more-specific resources are returned. This can be helpful if large blocks of IP space are looked up and the number of returned resources is too big. | NO - default is True, which returns all levels of more specific resources below a given resources |

### Data Output

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
<td>assignments</td>
<td>A list of assignments from the allocations related to the queried resource. Each assignment item has the following structure:<br />
<br />

<table>
<tbody>
<tr class="odd">
<td>address_range</td>
<td>the address space this entry is referring to</td>
</tr>
<tr class="even">
<td>asn_name</td>
<td>the network name</td>
</tr>
<tr class="odd">
<td>status</td>
<td>the status of the entry (for details see the <a  <a href="https://www.ripe.net/manage-ips-and-asns/db/support/documentation/ripe-database-documentation/">RIPE Database documentation</a> sections 4.2.3.2 and 4.2.4.2)</td>
</tr>
<tr class="even">
<td>parent_allocation</td>
<td>the IP range of the allocation that covers this assignment</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td>allocations</td>
<td>A list of allocations related to the queried resource. Each allocation item has the following structure:<br />
<br />

<table>
<tbody>
<tr class="odd">
<td>allocation</td>
<td>the address_range this allocation is referring to</td>
</tr>
<tr class="even">
<td>asn_name</td>
<td>the network name</td>
</tr>
<tr class="odd">
<td>status</td>
<td>the status of the entry (for details see the <a href="https://www.ripe.net/manage-ips-and-asns/db/support/documentation/ripe-database-documentation/">RIPE Database documentation</a> sections 4.2.3.2 and 4.2.4.2)</td>
</tr>
<tr class="even">
<td>assignments</td>
<td>the number of assignments within this allocation</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td>ip_stats</td>
<td>An overview of the distribution of statuses of the covered address space. Each status item has the following structure:<br />
<br />

<table>
<tbody>
<tr class="odd">
<td>status</td>
<td>the name of the status</td>
</tr>
<tr class="even">
<td>ips</td>
<td>number of IP addresses with this status</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td>resource</td>
<td>holds the resource the query was based on</td>
</tr>
<tr class="odd">
<td>query_time</td>
<td>holds the time the query was based on</td>
</tr>
</tbody>
</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/address-space-usage/data.json?resource=193/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/address-space-usage/data.json?resource=193/23", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 0.4


:::

