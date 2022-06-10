# RRC Info
--------

This data call provides (meta) information on collector nodes (RRCs) of the RIS network (http://ris.ripe.net). This includes geographical and topological location and information on collectors' peers.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| -   | -   | -   | -   |

### Output

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rrc-info/data.json"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rrc-info/data.json", requestOptions)
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