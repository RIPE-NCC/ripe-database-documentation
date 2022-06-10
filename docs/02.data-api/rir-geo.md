# RIR Geo
-------

This data call returns geographical information for Internet resources based on RIR Statistics data.

<RestRepl baseUrl="https://stat.ripe.net/data/rir-geo/data.json" method="GET" :searchParams="{ resource: '2001:67c:2e8::/48'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IP resource / ASN | Defines the resource to be queried. For IP resource the result might be less or more specific to the given resource. | YES |
| query_time | ISO8601 or Unix timestamp | Defines the times for the query; must be within the range of "earliest\_time" and "latest\_time" | NO - default is time for which the lastest data is available |

### Output

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rir-geo/data.json?resource=2001:67c:2e8::/48"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rir-geo/data.json?resource=2001:67c:2e8::/48", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated

This call has been deprecated in favor of [RIR Stats Country](rir-stats-country.md)

:::
