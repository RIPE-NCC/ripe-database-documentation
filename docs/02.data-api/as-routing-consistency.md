# AS Routing Consistency

This data call look at the consistency of what is registered for an ASN in the internet routing registry (IRR) and and what is observed in RIS' BGP tables. A filter for BGP routes is applied removing non-globally visible prefixes that are not seen by at least 10 RIS full-table peers.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | asn | The ASN to query | yes |

### Data Output

| Key | Info |
| --- | --- |
| prefixes | list of prefixes which are announced by the ASN in BGP (and seen by at least 10 RIS fpeers) or which have the ASN listed as origin in IRR route objects<table><tr><td>prefix</td><td>prefix found in BGP or IRR</td></tr><tr><td>in_bgp</td><td>"True" if the route has been seen by RIS, "False" otherwise</td></tr><tr><td>in_whois</td><td>"True" if the route exists in the IRR, "False" otherwise</td></tr></table> |
| imports / exports | list of peers of the ASN found in either in BGP or in import/export, mp-import/mp-export attributes of the ASN's aut-num object in the IRR<table><tr><td>peer</td><td>The AS number of the peer</td></tr><tr><td>in_bgp</td><td>"True" if the peer found observed to be a peer of the ASN in BGP routes. "False" otherwise</td></tr><tr><td>in_whois</td><td>"True" if the peering relation is also listed in the peer ASN's aut-num object. That is, if ASN2 is seen as peer in the import/export attributes of ASN1, does ASN1 also appear in export/import attributes of ASN2?</td></tr></table> |
| authority | Holds the authoritative RIR for the input resource (e.g. RIPE, APNIC, ARIN...) |
| query\_starttime/query\_endtime | timestamp the query results apply to. |
| resource | Defines the resource used for the query |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/as-routing-consistency/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/as-routing-consistency/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 1.0

This version has been superceded by version 1.1 which is using a more reliable backend.

:::

::: details upcoming - 2.0

Difference to version 1.1: "query\_endtime" & "query\_starttime" have been replaced by "query_time"

:::
