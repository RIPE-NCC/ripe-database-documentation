# Reverse DNS
-----------

This data call returns details of reverse DNS delegations for IP prefixes in the RIPE region.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'193.0.0.0/21'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix for the query | -   | YES |

### Data Output

| Key | Info |
| --- | --- |
| delegations | contains domain objects found in the RIPE Whois database related to this prefix (either exact match, more or less-specific) representing reverse delegated zones. Each line is described as "key" and "value" pair. |
| query_time | Holds the time the query was carried out |
| resource | Defines the resource used for the query |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/reverse-dns/data.json?resource=193.0.0.0/21"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/reverse-dns/data.json?resource=193.0.0.0/21", requestOptions)
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