# Visibility
----------

This data call provides information on the visibility of a resource as observed from RIS (http://ris.ripe.net).

Historical lookups are supported - a query has to be aligned to the times (00:00, 08:00 and 16:00 UTC) when RIS data has been collected. By default, the data call returns the latest data.

<RestRepl baseUrl="https://stat.ripe.net/data/visibility/data.json" method="GET" :searchParams="{ resource: '2001:67c:2e8::/48' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IP resource or an ASN; IP addresses are converted to the closest encompassing routed prefix | -   | YES |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value will be automatically aligned to a RIS colletion time. | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| include | peers_seeing | This parameter defines additional data to be included.  <br>  <br>**"peers_seeing"** includes details on peers that are seeing a resource as only the peers that are not seeing a resource. By default it is not set because the output become significantly bigger. | No  |

### Output
  

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/visibility/data.json?resource=2001:67c:2e8::/48"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/visibility/data.json?resource=2001:67c:2e8::/48", requestOptions)
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

:::

-