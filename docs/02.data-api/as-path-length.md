# AS Path Length

This data call returns AS-path metrics (e.g. shortest or longest AS-path to other ASNs we are peering with) for the queried ASN.



<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | AS  | AS number to query | YES |
| sort_by | "number" (default), "count", "location", "geo" | Sort by the given field. In the case of "geo", sort by approximating a world map on to a circle. | NO  |

### Data Output

| Key | Info |
| --- | --- |
| stats | List with path length statistics per RIS route collector. Each record has the following format:<table><tr><td>number</td><td>id of the route collector</td></tr><tr><td>count:</td><td>number of routes to the queried AS on this route collector</td></tr><tr><td>location</td><td>location of the route collector</td></tr><tr><td>stripped</td> <td>statistics that exclude AS path prepending<table><tr><td>avg</td><td>average path length of all routes, excluding the RIS peers</td></tr><tr><td>max</td><td>maximum path length observed, excluding the peer AS</td></tr><tr><td>min</td><td>minimum number of path entries, excluding the peer AS</td></tr><tr><td>sum</td><td>total number of path elements, excluding peer AS, seen in all routes</td></tr></table></td></tr><tr><td>unstripped</td><td> statistics including AS path prepending<table><tr><td>avg</td><td>average path length of all routes, excluding the RIS peers</td></tr><tr><td>max</td><td>maximum path length observed, excluding the peer AS</td></tr><tr><td>min</td><td>minimum number of path entries, excluding the peer AS</td></tr><tr><td>sum</td><td>total number of path elements, excluding peer AS, seen in all routes</td></tr></table></td></tr></table> |
| query\_starttime/query\_endtime | Holds the time period the query covers.  |
| resource | Defines the resource used for the query |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/as-path-length/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/as-path-length/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:


::: details 2.1

This is the current and only version of this API call.

:::
