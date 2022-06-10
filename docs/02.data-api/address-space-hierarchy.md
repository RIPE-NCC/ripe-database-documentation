# Address Space Hierarchy

This data call returns address space objects (inetnum or inet6num) from the RIPE Database related to the queried resource. Less- and more-specific results are first-level only, further levels would have to be retrieved iteratively.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '193/21'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix or IP range | The prefix or IP range the address space hierarchy should be returned for. | YES |

### Data Output

| Key | Info |
| --- | --- |
| exact | A list containing exact matches for the queried resource. |
| more_specific | A list containing first level more specific blocks underneath the queried resource. Some of these may be aggregated according to the 'aggr\_levels\_below' query parameter. |
| less_specific | A list containing first level less specific (parent) blocks above the queried resource. |
| rir | Name of the RIR where the results are from. Currently this datacall will only respond for resources under RIPE NCC IP space, so this field value will be "ripe". |
| resource | Holds the resource the query was based on |
| query_time | Holds the time the query was based on |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/address-space-hierarchy/data.json?resource=193/21"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/address-space-hierarchy/data.json?resource=193/21", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - 1.2

:::

::: details current - 1.3

:::
