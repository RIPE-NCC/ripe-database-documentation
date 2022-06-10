# RPKI Validation Status

This data call returns the RPKI validity state for a combination of prefix and Autonomous System. This combination will be used to perform the lookup against the RPKI validator [Routinator](https://nlnetlabs.nl/projects/rpki/routinator/), and then return its RPKI validity state.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'3333',prefix:'193.0.0.0/21'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN | The ASN used to perform the RPKI validity state lookup. | YES |
| prefix | prefix | The prefix to perform the RPKI validity state lookup. Note the prefix's length is also taken from this field. | YES |

### Data Output

| Key | Info |
| --- | --- |
| status | The RPKI validity state, according to [RIPE NCC's RPKI validator](https://rpki-validator.ripe.net/). Possible states are:<br><br>* **valid** \- the announcement matches a roa and is valid<br>* **invalid_asn** \- there is a roa with the same (or covering) prefix, but a different ASN<br>* **invalid_length** \- the announcement's prefix length is greater than the ROA's maximum length<br>* **unknown** \- no ROA found for the announcement |
| description | The description that ended in the returned status. |
| prefix | The prefix this query is based on. |
| resource | The resource (ASN) this query is based on. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rpki-validation/data.json?resource=3333&prefix=193.0.0.0/21"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rpki-validation/data.json?resource=3333&prefix=193.0.0.0/21", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - 0.1
Uses RIPE NCC RPKI Validator version 2.26 as a backend
:::

::: details deprecated - 0.2
Uses RIPE NCC RPKI Validator version 3 as a backend
:::

::: details current - 0.3
Uses Routinator as a backend
:::