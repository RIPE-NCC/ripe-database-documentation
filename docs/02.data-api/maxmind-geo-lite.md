# Maxmind Geo Lite
----------------

This data call returns geolocation information for the given IP space based on MaxMind's GeoLite2 data source.

Prefix information (IPv4/IPv6) is based on GeoLite2 data created by [MaxMind](http://maxmind.com), which is Copyright 2021 MaxMind, Inc. All Rights Reserved. Please consult [MaxMind's license](http://geolite.maxmind.com/download/geoip/database/LICENSE.txt) before using this data for non-internal projects. For details on the accuracy of this data, please visit MaxMind's product website. According to information given on Maxmind's webpage (November 2019), the data is being updated once a week on Tuesday.

<RestRepl baseUrl="https://stat.ripe.net/data/maxmind-geo-lite/data.json" method="GET" :searchParams="{ resource:'193/23'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix, IP address | States the prefix or IP address you want to get the geographic information for | YES |

### Output
### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/maxmind-geo-lite/data.json?resource=193/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/maxmind-geo-lite/data.json?resource=193/23", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 1.1

Difference to 2.*: "resource" field for AS queries is with the "AS" prefix

:::

::: details upcoming - n.a.

-
:::
