# Maxmind Geo Lite Announced By AS

This data call returns geolocation information for prefixes that are announced by an autonomous system. Annoucement information is based on RIS (http://ris.ripe.net), geolocation information is based on MaxMind's GeoLite2 data.

Prefix information (IPv4/IPv6) is based on GeoLite2 data created by [MaxMind](http://maxmind.com), which is Copyright 2021 MaxMind, Inc. All Rights Reserved. Please consult [MaxMind's license](http://geolite.maxmind.com/download/geoip/database/LICENSE.txt) before using this data for non-internal projects. For details on the accuracy of this data, please visit MaxMind's product website.

<RestRepl baseUrl="https://stat.ripe.net/data/maxmind-geo-lite-announced-by-as/data.json" method="GET" :searchParams="{ resource: 'AS3333' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | AS number | Number of the autonomous system | YES |

### Output### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/maxmind-geo-lite-announced-by-as/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/maxmind-geo-lite-announced-by-as/data.json?resource=3333", requestOptions)
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
