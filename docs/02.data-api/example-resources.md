# Example Resources
-----------------

This data call returns sample resources for ASN, IPv4 and IPv6 resources. All are taken from routing data.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| -   | -   | -   | -   |

### Data Output

| Key | Info |
| --- | --- |
| "asn" | Example AS number. |
| "ipv4" | Example IPv4 address. |
| "ipv6" | Example IPv6 address. |
| "range4" | Example IPv4 address range. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/example-resources/data.json"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/example-resources/data.json", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
