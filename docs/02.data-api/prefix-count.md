# Prefix Count
------------

This data call shows the number of prefixes announced by a given ASN over time.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333', starttime: '2008-01-01T00:00:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | AS for the query | -   | YES |
| starttime | ISO8601 or Unix timestamp | default: Jan 1st 2000 | NO  |
| endtime | ISO8601 or Unix timestamp | default: now | NO  |
| min\_peers\_seeing | integer | Minimum number of RIS peers seeing the prefix for it to be included in the results. Excludes low-visibility/localized announcements. | NO (default: 10) |
| resolution | "8h" (8 hours),"2d" (2 days) or "12d" (12 days) | Defines the resolution/aggregation for the returned data, e.g. "2d" means that changes in the data must persist for longer than 2 days to be visible at this resolution. | NO (default: "12d") |

### Data Output

| Key | Info |
| --- | --- |
| ipv4 | Contains a series of incremental changes per timestamp on the IPv4 prefixes announced by the AS |
| ipv6 | Contains a series of incremental changes per timestamp on the IPv6 prefixes announced by the AS |
| timestamp | Time of the data point |
| prefixes | Number of prefixes announced by the AS at that point in time |
| address-space | Amount of address space, in terms of /24 (for IPv4) or /48 (for IPv6) subnets, anounced by the AS at that point in time |
| resource | holds the resource this query based on |
| query_starttime | the beginning of the time period the query covers |
| query_endtime | the end of the time period the query covers |
| resolution | states the resolution of the returned data |


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/prefix-count/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/prefix-count/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:


::: details 1.2

This is the current and only version of this API call.

:::