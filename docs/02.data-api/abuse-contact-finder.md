# Abuse Contact Finder


The main purpose of this data call is to return abuse contact
informations for a Internet number resource. Note that this information
is in many cases incorrect or not available.


<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '3333'}"/>

### Parameters

|Key|Value|Info|Required|
|--- |--- |--- |--- |
|resource|prefix, single IP address or ASN|This is the resource the query is based on.|YES|

### Data Output

| Key                           | Info                                                                                                                                                        |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| abuse_contacts           | List of dedicated abuse contacts (email addresses)                                 |
|   authoritative_rir                 | Regional Internet Registry authoritative for the queried resource.  |
|earliest_time / lastest_time | Holds the time the query was based on |
| parameters  <table><tbody><tr><td>resource</td></tr></tbody></table>                   | Lists the resource the query was based on                 |


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/abuse-contact-finder/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/abuse-contact-finder/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details  2.0

This is the current and only version of this API call.

:::
