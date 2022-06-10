# Atlas Probes

This data call provides information on the RIPE Atlas probes in an network (ASN), a prefix or a country.  
The information is based on data coming from the RIPE Atlas REST API, https://atlas.ripe.net/docs/api/v2/manual/.  

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'at'}" />
  
### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix, network (ASN) or country |     | Yes |

### Data Output

| Key  | Info |
| ---  | --- | 
| probes | list of records for each probe found. For details see https://beta-docs.atlas.ripe.net/apis/metadata-reference/#probes |    
| stats | <table><tr><td>total</td><td>Total number of probes found</td></tr></table>|
| resource | the resource the query is based on |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/atlas-probes/data.json?resource=at"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/atlas-probes/data.json?resource=at", requestOptions)
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
