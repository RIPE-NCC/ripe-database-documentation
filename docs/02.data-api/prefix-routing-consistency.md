# Prefix Routing Consistency
--------------------------

This data call compares the given routes (prefix originating from an ASN) between Routing Registries and actual routing behaviour as seen by the RIPE NCC route collectors ([RIS](http://ris.ripe.net)).

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'193.0.20.0/24'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix | The prefix to query | yes |

### Data Output

| Key | Info |
| --- | --- |
| in_bgp | "True" if the route has been seen by RIS, "False" otherwise |
| in_whois | "True" if the route exists in whois, "False" otherwise |
| origin | AS number (integer) of the route |
| asn_name | The name of this AS's holder |
| prefix | Prefix (CIDR string) of the route (more or less specific to the input resource) |
| irr_sources | IRR source this route was found in e.g. "RADB", "RIPE", "LEVEL3"... |
| query\_starttime/query\_endtime | For registration data: query_starttime defines the query time  <br>  <br>For routing data: holds the start and end time the query covers  <br>**From version 0.6 on the result is based on a snapshot instead of a time period. For compatibility reasons "query\_starttime" and "query\_endtime" will be kept in version 0.x but will hold the same value.** |
| resource | Defines the resource used for the query |


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/prefix-routing-consistency/data.json?resource=193.0.20.0/24"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/prefix-routing-consistency/data.json?resource=193.0.20.0/24", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - 0.7

Difference to 1.0 and up: the result is based on a time period, which is stated in "query\_starttime" and "query\_endtime". However, these fields hold exactly the same value.

:::

::: details current - 1.1

Difference to 0.x: "query\_starttime" and "query\_endtime" is replaced by "query_time"

:::