# DNS Chain
---------

This data call returns the recursive chain of DNS forward (A/AAAA/CNAME) and reverse (PTR) records starting form either a hostname or an IP address.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'www.ripe.net'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Hostname or IP address (Ipv4 or IPv6) | Defines the resource that the query is performed for. | YES |

### Data Output

| Key | Info |
| --- | --- |
| forward_nodes | A key-value list in which the key is a hostname and the value is the list of IP addresses/hostnames to which it has A/AAAA/CNAME records pointing to. |
| reverse_nodes | A key-value list in which the key is an IP address and the value is the list of hostnames to which it has PTR records pointing to. |
| nameservers | The list of IP addresses of the DNS resolvers used to do perform the DNS queries. |
| authoritative_nameservers | The list of the authoritative nameservers for the returned DNS records. |
| query_time | Defines the time of the query. |
| resource | Defines the resource used in the query. |

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
