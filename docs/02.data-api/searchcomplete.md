# Searchcomplete
--------------

This data call returns example resource that are directly or indirectly related to the given input.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'RIPE'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | term that should tried to be matched against resources | -   | YES |
| limit | number | Defines how many suggestions are returned per category | NO - default: 6 |

### Data Output

| Key | Info |
| --- | --- |
| categories | This contains a list of objects each with a "category" and a "suggestions" property, which contains the suggestions and defines the category they are belonging to. |
| resource | Reflects the query term that the suggestions are based on. |
| limit | The maximum number of suggestions per category. |
  

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/searchcomplete/data.json?resource=RIPE"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/searchcomplete/data.json?resource=RIPE", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a.

-

:::

::: details upcoming - n.a.

-
:::