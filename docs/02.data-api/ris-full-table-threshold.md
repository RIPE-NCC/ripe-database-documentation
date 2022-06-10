# RIS Full-Table Threshold
------------------------

This data call provides the cut-off threshold for the number of prefixes that a BGP full-table peer requires to have. Peers to RIS (http://ris.ripe.net) that share less than this amount of prefixes are not considered full-table peers and hence are not considered in calculations like routing visibility. The threshold is obviously different between address families (IPv4 and IPv6) and time. For this reason the data call also supports historical lookups.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value needs to be aligned to the RIS dump times (00:00, 08:00, 16:00) and will automatically be adjusted. | No - by default, it will return the latest available data point |

### Output

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-full-table-threshold/data.json"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-full-table-threshold/data.json", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 1.0

This is the current and only version of this API call.

:::