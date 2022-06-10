# Reverse DNS IP
--------------

This is just a simple lookup for the reverse DNS info against a single IP address.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'193.0.6.139'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IP address for the query | -   | YES |

### Data Output

| Key | Info |
| --- | --- |
| result | A single domain name. |
| error | If not empty explains an error that occurred (e.g. "Domain does not exists (NXDOMAIN)", "Timeout"...) |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/reverse-dns-ip/data.json?resource=193.0.6.139"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/reverse-dns-ip/data.json?resource=193.0.6.139", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 0.1

This is the current and only version of this API call.

:::