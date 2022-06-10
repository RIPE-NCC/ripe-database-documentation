# Atlas Targets
-------------

This data call provides information on the RIPE Atlas measurements that target an network (ASN), a prefix or a hostname.  
The information is based on data coming from the RIPE Atlas REST API, https://atlas.ripe.net/docs/api/v2/manual/.  
  
<RestRepl baseUrl="https://stat.ripe.net/data/atlas-targets/data.json" method="GET" :searchParams="{ resource: '140.78/16'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix, network (ASN) or hostname |     | Yes |

### Data Output

| Key  | Info |
| ---  | --- | 
| measurements | list with meta data for each measurement. For details see https://beta-docs.atlas.ripe.net/apis/metadata-reference/#measurements |    
| stats | <table><tr><td>total</td><td>Total number of measurements found</td></tr></table>|
| resource | the resource the query is based on |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/atlas-targets/data.json?resource=140.78/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```javascript

var requestOptions = {
	method: "GET",
};

fetch("https://stat.ripe.net/data/atlas-targets/data.json?resource=140.78/16", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

<details><summary>deprecated - n.a.</summary>
<content>deprected details</content>
</details>
<details><summary>upcoming - n.a.</summary>
<content>upcoming details</content>
</details>
