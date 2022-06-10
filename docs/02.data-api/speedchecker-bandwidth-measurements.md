# Speedchecker Bandwidth Measurements
-----------------------------------

This data call provides bandwidth measurement results collected on the Speedchecker platform. The bandwith is measured with HTML5 clients (e.g. [https://www.broadbandspeedchecker.co.uk](https://www.broadbandspeedchecker.co.uk)) as well as with Speedchecker's mobile applications. The unit of measurement is kilobits per second (Kbps).  
Since 2018-05-28 data is synchronized live between Speedchecker and RIPEstat, which means that every measurement done on the Speedchecker platform will show up in this data call after a few seconds.  
  
<RestRepl baseUrl="https://stat.ripe.net/data/speedchecker-bandwidth-measurements/data.json" method="GET" :searchParams="{ resource: '140.78/16' }"/>

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

curl --location --request GET "https://stat.ripe.net/data/speedchecker-bandwidth-measurements/data.json?resource=140.78/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/speedchecker-bandwidth-measurements/data.json?resource=140.78/16", requestOptions)
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