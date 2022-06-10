# Network Info
------------

This data call returns the containing prefix and announcing ASN of a given IP address.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'140.78.90.50'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IP address | Any IP address one wants to get network info for | YES |

### Data Output

| Key | Info |
| --- | --- |
| asns | ASNs the prefix is announced from |
| prefix | Prefix that the given query resource is matching if routed |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/network-info/data.json?resource=140.78.90.50"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/network-info/data.json?resource=140.78.90.50", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
