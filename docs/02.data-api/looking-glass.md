# Looking Glass
-------------

This data call returns information coming from a Looking Glass. The data is based on a data feed from the RIPE NCC's network of BGP route collectors (RIS, see [https://www.ripe.net/data-tools/stats/ris](https://www.ripe.net/data-tools/stats/ris) for more information).  
The data processing usually happens with a small delay and can be considered near real-time.  
The output is structured by collector node (RRC) accompanied by the location and the BGP peers which provide the routing information.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '140.78.0.0/16'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | A prefix or an IP address. | Prefixes need to match exactly a prefix found in the routing data. If given as IP address, the data call will try to find the encompassing prefix for the IP address. | YES |
| look\_back\_limit | Defines the cut-off threshold in seconds for the recency of the entries. | Any results older than the cut-off threshold are not returned. This is useful when data is delayed and should not show up. | NO - default is 86400 (= 24 hours) |

### Data Output

| Key | Info |
| --- | --- |
| rrcs | There is one entry for each collector node (RRC) that provides data for the given input resource. Each RRC entry holds the location and the ID of the RRC together with the list of BGP peer information.  <br>The BGP peer information contains:<br><br>* origin: type of BGP origin<br>* last_updated: the timestamp when this route was last changed<br>* lastest_time: the timestamp when this route was last confirmed<br>* as_path: the path of ASNs seen for this route<br>* community: BGP community information for this route<br>* asn_orgin: the originating ASN for the matched prefix<br>* prefix: the matched prefix based on the query input resource<br>* next_hop: the next hop from the perspective of this peer<br>* peer: IP address of the peer interface |
| latest_time | Provides info on how recent the data is. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/looking-glass/data.json?resource=140.78.0.0/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/looking-glass/data.json?resource=140.78.0.0/16", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a.

-

:::

::: details upcoming - n.a.

:::
