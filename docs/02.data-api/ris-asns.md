# RIS Asns
--------

## Version 1.0 (supported)

This data call provides high-level information on ASNs in RIS, including:

* total number of ASNs
* listing of all ASNs

The data call supports history, with each data point being aligned to times a dump is created in RIS (00:00, 08:00 and 16:00 UTC).  
By default, the data call returns the total number of ASNs; more details can be obtained using parameters.  
  
**Note** the term "transit" related to this data call means any ASN that is seen in the AS paths, collected by RIS, that is not the origin of a route.  
  
<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value needs to be aligned to the RIS dump times! | No - by default, it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| list_asns | boolean ("true"/"false") | If true, the data call will return a list of all ASNs. This might be further separated into "originating" and "transiting". | No - default is "false" |
| asn_types | "o","t" or "o,t" | "o" stands for originating and will show originating ASNs separately. "t" does the same for transiting ASNs (keep in mind the definition of a transit in this case). | No - by default, if ASNs are listed, they are shown indiscriminately, with no separation between originating or transiting. |


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-asns/data.json?list_asns=true"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-asns/data.json?list_asns=true", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>


## Version 0.1 (deprecated)

This data call provides high-level information on ASNs in RIS, including:

* total number of ASNs
* listing of all ASNs

The data call supports history, with each data point being aligned to times a dump is created in RIS (00:00, 08:00 and 16:00 UTC).  
By default, the data call returns the total number of ASNs; more details can be obtained using parameters.  
  
**Note** the term "transit" related to this data call means any ASN that is seen in the AS paths, collected by RIS, that is not the origin of a route.  
  
<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| query_time | ISO8601 or Unix timestamp | Defines the time of the lookup. This value needs to be aligned to the RIS dump times! | No - by default, it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| list_asns | boolean ("true"/"false") | If true, the data call will return a list of all ASNs. This might be further separated into "originating" and "transiting". | No - default is "false" |
| asn_types | "o","t" or "o,t" | "o" stands for originating and will show originating ASNs separately. "t" does the same for transiting ASNs (keep in mind the definition of a transit in this case). | No - by default, if ASNs are listed, they are shown indiscriminately, with no separation between originating or transiting. |


### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/ris-asns/data.json?list_asns=true"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/ris-asns/data.json?list_asns=true", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated 0.1

:::

::: details current 1.0

This is the current version of this API call.

:::