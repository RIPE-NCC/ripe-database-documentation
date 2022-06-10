# RIR
---

This data call shows which RIR(s) allocated/assigned a resource. Depending on the level of detail ("lod" parameter) this can include additional information like registration status or country of registration. The data is based on RIR stats files, see ftp://ftp.ripe.net/pub/stats/.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'193.0.0.0/16'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IP resource / ASN | Defines the resource to be queried. The result contains resources that are more or less specific to the queried resource. | YES |
| "starttime"/"endtime" | ISO8601 or Unix timestamp | Defines the time start and end time for the query. | NO - default: latest time data is available for. The RIRs are not synchronised on the release of the RIR stats, so the latest time can vary between RIRs. |
| "lod" | integer | Defines the level of detail in which the data is being returned.  <br>Levels are:<br><br>* 0 - Least detailed output<br>* 1 - Default output<br>* 2 - Most detailed output | NO - default: 1 |

### Output

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rir/data.json?resource=193.0.0.0/16"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rir/data.json?resource=193.0.0.0/16", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 0.1

This is the current and only version of this API call.

:::