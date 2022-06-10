# RIS Peers
---------

This data call provides information on the peers of RIS - ASN, IP address and number of shared routes. The data is grouped by RIS collectors.

Historical lookups are supported - a query has to be aligned to the times (00:00, 08:00 and 16:00 UTC) when RIS data has been collected. By default, the data call returns the latest data.  
  
<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value will be automatically aligned to a RIS collection time. | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |

### Output


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-peers/data.json"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-peers/data.json", requestOptions)
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