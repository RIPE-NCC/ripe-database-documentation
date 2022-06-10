# AS Overview


This data call shows general informations about an ASN like its
announcement status and the name of its holder according to the WHOIS
service.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | as  | states the as you want to get the resource info for | yes |

### Data Output

| Key | Info |
| --- | --- |
| announced | "true" if the ASN is originating any prefixes which are visible by at least 10 RIS full-feed peers (see http://ris.ripe.net).  <br>**Note that a transit-only ASN would be reported with "false".**  <br>We will revise this in a future version and change the field name. |
| holder | Descriptive name of the ASN holder, when the ASN has been registered by an RIR. "null" otherwise |
| resource | Outputs the AS that query is based on |
| type | For this data call always "as" |
| block | information about this ASN as found in the IANA registries. Keys: <table><tr><td>resource</td><td>The matching ASN or ASN block in IANA's records</td></tr><tr><td>desc</td><td>The description of the resources as found in the IANA registry</td></tr><tr><td>name</td><td>the name of the relevant IANA registry</td></tr></table> |
| resource | holds the resource this query based on |
| query\_starttime/query\_endtime | The time period the query covers |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/as-overview/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/as-overview/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 1.3

This is the current and only version of this API call.

:::

