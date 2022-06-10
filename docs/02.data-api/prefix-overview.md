# Prefix Overview

This data call gives a summary of the given prefix, including whether and by whom it is announced.

<RestRepl baseUrl="https://stat.ripe.net/data/prefix-overview/data.json" method="GET" :searchParams="{ resource:'193/23'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix | States the prefix you want to get the resource info for | YES |
| min\_peers\_seeing | integer | Minimum number of (RIS) peers necessary to see a resource to be included in the result | NO - if not provided a default is choosen by the server. An info message is added if any resource got filtered. |
| max_related | integer | Limits the number of related prefixes - if there are any - included in the result | NO - if not provided a default is choosen by the server. An info message is added if truncation happens. |
| query_time | ISO8601 or Unix timestamp | Defines the query time for the lookup | NO - default: latest time data available is available for |

### Data Output

| Key | Info |
| --- | --- |
| block | This contains information about this ASN or the ASN block it belongs to. Keys: desc (a human readable description), name (a human readable name) and the referencing resource/resources |
| announced | "True" if the prefix is announced, "False" otherwise |
| asns | A list of ("asn"/"holder") objects representing the originating ASNs. For multi-origin prefixes it's more than one ASN. |
| holder | Descriptive name for the AS if AS is given, "null" otherwise |
| resource | Outputs the prefix that the query is based on |
| type | For this data call always "prefix" |
| related_prefixes | List of related prefixes |
| actual\_num\_related | Total number of (returned and truncated) related prefixes. |
| num\_filtered\_out | Number of prefixes (exact or related) filtered by low-visibility filter. This can be controlled by the parameter "min\_peers\_seeing". |
| is\_less\_specific | True if the information in the response is for a larger block than the one requested. |
| resource | holds the resource this query based on |
| query_time | defines the query time the result is based on |


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/prefix-overview/data.json?resource=193/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/prefix-overview/data.json?resource=193/23", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:
::: details 1.3

This is the current and only version of this API call.

:::
  