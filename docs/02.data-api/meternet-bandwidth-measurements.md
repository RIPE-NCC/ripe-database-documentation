# Meter.net Bandwidth Measurements
-----------------------------------

This data call returns bandwidth measurement results based on open data provided by meter.net. The data is synchronized live with every bandwidth test done on https://www.meter.net/ being available on the RIPEstat Data API within few seconds. (Be aware of caching after the first received request for a resource.)

The unit of measurement is kilobits per second (Kbps). 
  
<RestRepl baseUrl="https://stat.ripe.net/data/meternet-bandwidth-measurements/data.json" method="GET" :searchParams="{ resource: '140.78/16' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix | At this moment the data call only supports prefixes but aggregations for ASNs and countries is planned. | Yes |
| starttime/endtime | ISO8601 or Unix timestamp | The start/end time defining the upper and lower boundry of the lookup. | No - by default the data call returns the last month starting from the most recent data. The query window is limited to 180 days! |

### Output

  

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/meternet-bandwidth-measurements/data.json?resource=140.78/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/meternet-bandwidth-measurements/data.json?resource=140.78/16", requestOptions)
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
