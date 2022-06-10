# Zonemaster
----------

The main purpose for this data call is to power the [DNS Check widget](https://stat.ripe.net/widget/dns-check) but it can also be used to programmatically retrieve the test results of DNS checks run by Zonemaster. The data call has two modes, one to get an overview of available tests ("resource" parameter is hostname) and one to get the test details ("resource" parameter is test ID and "method" parameter is "details").
  
**Please note that this data call is in development and features/availability can change.**  
  
<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '8b9b9a1ab9200ed9', method: 'details'}" />

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/zonemaster/data.json?resource=8b9b9a1ab9200ed9&method=details"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/zonemaster/data.json?resource=8b9b9a1ab9200ed9&method=details", requestOptions)
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