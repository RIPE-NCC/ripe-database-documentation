# Prefix Size Distribution
------------------------

This data call returns the total amount of prefixes announced by a given ASN per subnet size and IP version.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'AS3333', time: '2020-12-05T12:00:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | AS for the query | -   | YES |
| timestamp | ISO8601 or Unix timestamp | default: now - 2 days | NO  |
| min\_peers\_seeing | integer | Minimum number of RIS peers seeing the prefix for it to be included in the results. Excludes low-visibility/localized announcements. | NO (default: 10) |

### Data Output

| Key | Info |
| --- | --- |
| ipv4 | contains prefix sizes of all IPv4 prefixes of the queried ASN |
| ipv6 | contains prefix sizes of all IPv6 prefixes of the queried ASN |
| count | total number of prefixes with the prefix size denoted by size |
| size | Prefix size |
| resource | holds the AS number the result is based on |
| query_time | holds the time of the snapshot the result is based on |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/prefix-size-distribution/data.json?resource=3333&time=2020-12-05T12:00:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/prefix-size-distribution/data.json?resource=3333&time=2020-12-05T12:00:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 2.2

This is the current and only version of this API call.

:::