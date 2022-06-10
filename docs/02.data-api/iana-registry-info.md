# IANA Registry Info
------------------

This data call gives access to various data sources maintained by IANA. These include:

* IANA 16-bit Autonomous System (AS) Numbers Registry (http://www.iana.org/assignments/as-numbers/as-numbers-1.csv)
* IANA 32-bit Autonomous System (AS) Numbers Registry (http://www.iana.org/assignments/as-numbers/as-numbers-2.csv)
* Etc. - the detailed list of data sources included can be seen in the [methodology information](iana-registry-info/meta/methodology) of the data call. Note: Output format for the methodology information is JSON!

The data call supports a "resource" parameter which filters all results down to entries that are topologically related to the given resource.  
The data is refreshed once a day to guarantee up-to-date information.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'193/23'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IP address, prefix or ASN | States the resource the data is being filtered on. | NO - if this parameter is not given the entire information is returned. |
| best\_match\_only | true/false | If a resource is given and this parameter is set, only the best match (which is the closest topologically) is returned. | NO - by default it is set to false. |

### Data Output

| Key | Info |
| --- | --- |
| load_time | Shows when the data was loaded from IANA. |
| resource | Mirrors the resource (if given) for this lookup. |
| returned | Number of entries in the result. |
| resources | Holds all the results that the lookup matches - if not filtered it will return all results from IANA. The details vary between data sources but all have in common the "description", "source" and "source_url" fields. "Description" is an added field, which tries to create a more human readable summary of the parsed data. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/iana-registry/data.json?resource=193/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/iana-registry/data.json?resource=193/23", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
