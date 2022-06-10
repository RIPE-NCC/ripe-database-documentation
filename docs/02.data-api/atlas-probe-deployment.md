# Atlas Probe Deployment

This data call provides information on the number of RIPE Atlas probes in a region, a country or network (ASN). It supports history, with a general start in 2014.  
The information is based on data from the RIPE Atlas probe archive, ftp://ftp.ripe.net/ripe/atlas/probes/archive/, which is processed once a day.  
  
<RestRepl baseUrl="https://stat.ripe.net/data/atlas-probe-deployment/data.json" method="GET" :searchParams="{ resource: 'cc_nl'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | region, country, network (ASN) or mixed | Due to the ambigious nature of abbreviated identifiers for regions and countries (e.g. me for Middle East and Montenegro) region and country resources should be prefixes with "region_" or "cc_".  <br>Looking up a network can be specified on the IP version by using the prefix "asn4_" for IP v4 networks and "asn6_" for IP v6 networks.  <br>For mixed results the resources just need to be comma separated. | Yes |
| starttime/endtime | ISO8601 or Unix timestamp | Can be used to set the time range of the lookup and the output. | No - by default starttime is beginning of 2014. |

### Data Output

| Key | Info |
| --- | --- | 
| deployment | List of records with deployment statistics. Each has following content <table><tr><td>date</td><td>date for this record</td></tr><tr><td>statuses</td><td>Number of probes seen with, respectively, status "neverseen", "connected", "disconnected" and "abandoned" </td></tr></table>|
| resource | the resource used for the query |
| starttime/endtime | time interval for which deployment statistic are returned |
| query_date | the date the query was executed |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/atlas-probe-deployment/data.json?resource=cc_nl"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/atlas-probe-deployment/data.json?resource=cc_nl", requestOptions)
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
