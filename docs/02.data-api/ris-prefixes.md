# RIS Prefixes
------------

This data call provides information on prefixes related to an ASN. The data call distinguishes prefixes in the originated and transited ASN.  
**Note that this distinction is purely based on the perspective of the RIPE NCC's RIS system and does NOT imply the underlying (business) relationships between networks!**  
  
The data call supports history, with each data point being aligned to times a dump is created in RIS (00:00, 08:00 and 16:00 UTC).  
By default, the data call returns just the count of prefixes related to the looked up ASN. This is mainly to prevent returning thousands of prefixes. See parameter settings below to further tailor the output to your needs.  
  
<RestRepl baseUrl="https://stat.ripe.net/data/ris-prefixes/data.json" method="GET" :searchParams="{ resource: '3333'}"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN | The ASN to be looked up. | Yes |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value needs to be aligned to the RIS dump times! | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| list_prefixes | boolean ("true"/"false") | If true, the data call will return all prefixes and not only the total counts. This might be further separated into "originating" and "transiting". | No - default is "false" |
| types | "o","t" or "o,t" | "o" will show originating prefixes and "t" transiting. The combination shows both, which is the default. | No - by default originating and transiting are included. |
| af  | "v4","v6" or "v4,v6" | This parameter lets you filter the address family: "v4" shows only IPv4 and "v6" only IPv6. | No - by default, IP version 4 and 6 are included. |
| noise | "keep" or "filter" | Noise refers to routed prefixes that are either coming from private IP space, single IP addresses or the entire IP space (/0). "filter" will remove these prefixes from the output, "keep" will not remove any prefixes. | No - by default "keep" is enabled. |

### Output


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-prefixes/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-prefixes/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a.

:::

::: details upcoming - n.a.

:::