# Country ASNs
------------

This data call provides information on a country's registered and routed ASNs. Registered ASNs are based on registration information made public by the Regional Internet Registries. The routing information is based on the data collected with the RIPE NCC's RIS system, https://ris.ripe.net.  
The data call supports history, with data points being aligned to times dumps are created in RIS (00:00, 08:00 and 16:00 UTC).  
By default, the data call returns just the number of registered and routed ASNs. This is mainly to prevent returning thousands of ASNs. See parameter settings below to further tailor the output to your needs.  
  
<RestRepl baseUrl="https://stat.ripe.net/data/country-asns/data.json" method="GET" :searchParams="{ resource:'nl'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | country | The country has to be provided as an ISO-3166-1 alpha-2 country code. See https://en.wikipedia.org/wiki/ISO\_3166-1\_alpha-2 for details. | Yes |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value needs to be or will be aligned to the RIS dump times! | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| "lod" | integer | Defines the level of detail in which the data is being returned.  <br>Levels are:<br><br>* 0 - Least detailed output<br>* 1 - Most detailed output | NO - default: 0 |

### Output
### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/country-asns/data.json?resource=nl"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/country-asns/data.json?resource=3333", requestOptions)
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