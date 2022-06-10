# RIS First-Last-Seen
-------------------

This data call provides information on when a prefix or ASN was first and last seen in RIS data.  
The data generally goes back to 2000. For the recency of the data you can check the parameter "latest_time", which usually is not more than 8 hours behind real-time.  
The "low_visibility" flag, which can be optionally included, shows if the data point was seen by a low or high number of peers.  
  
<RestRepl baseUrl="https://stat.ripe.net/data/ris-first-last-seen/data.json" method="GET" :searchParams="{ resource:'193.0.20.0/23'}"/>


### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix, ASN | A prefix or ASN to be looked up.  <br>The output for ASNs distinguishes between how an ASN has been seen in RIS. This can be as either originating or not. Originating has the type set to "o". | Yes |
| include | more\_specific, low\_visibility_flag | This parameter defines additional data to be included.  <br>  <br>**"more_specific"** includes more specific IP ranges, which only works for prefix lookups. By default "more_specific" is not set as it makes the lookup slower.  <br>  <br>**"low\_visibility\_flag"** includes the flag to indicate low visibility. By default it is not included. | No  |

### Output

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-first-last-seen/data.json?resource=193.0.20.0/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-first-last-seen/data.json?resource=193.0.20.0/23", requestOptions)
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