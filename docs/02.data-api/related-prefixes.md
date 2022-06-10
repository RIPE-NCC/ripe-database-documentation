# Related Prefixes
----------------

This data call returns prefixes that overlap or are adjacent to the specified IP resource.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'140.78.0.0/16'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix or IP range to query for | -   | YES |

### Data Output

| Key | Info |
| --- | --- |
| prefixes | contains the related prefixes in a list |
| prefix | contains a single related prefix |
| origin_asn | contains the origin ASN of this related prefix |
| asn_origin | contains the name of the originating ASN |
| relationship | contains the type of relationship (e.g. More Specific, Adjacency - Left) |
| query_time | holds the time when the query was carried out |
| resource | holds the resource the data is based on |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/XXXX/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/XXXX/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 0.2

This is the current and only version of this API call.

:::