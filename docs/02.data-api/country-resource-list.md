# Country Resource List

This data call lists the Internet resources associated with a country, including ASNs, IPv4 ranges and IPv4/6 CIDR prefixes.

This data is derived from the [RIR Statistics files](ftp://ftp.ripe.net/ripe/stats/RIR-Statistics-Exchange-Format.txt) maintained by the various RIRs.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'at', time: '2020-12-01'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | 2-digit ISO-3166 country code (e.g. "at","de"...) | The country to find IP prefixes and AS numbers for. | YES |
| time | ISO8601 or Unix timestamp | The time to query. By default, returns the latest available data. This value is truncated to midnight. | NO  |
| v4_format | format parameter; possible values: "" or "prefix".  <br>"prefix" will return each entry in prefix notation, meaning that ranges are converted to CIDR prefixes. | Describes the formatting for the output of IPv4 space. | NO. Defaults to "" |

### Data Output

| Key | Info |
| --- | --- |
| resources | Lists of resources that are associated with the queried country according to the RIR stats files. <table><tbody><tr><td> asn </td><td>A sorted list of ASN numbers associated with the queried country.</td></tr><tr><td> ipv4 </td><td>A sorted list of IPv4 prefixes and/or ranges associated with the queried country.</td></tr><tr><td> ipv6 </td><td>A sorted list of IPv6 prefixes associated with the queried country.</td></tr></tbody></table> |
| query_time | The time covered by the query.resourceThe resource used for the query. |
| resource | The resource used for the query. | 

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/country-resource-list/data.json?resource=at&time=2020-12-01"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/country-resource-list/data.json?resource=at&time=2020-12-01", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
