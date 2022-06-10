# Historical Whois

This data call provides information on objects that are stored in the RIPE DB. The result is aligned to a specific object, which is identified by an object type and an object key, which is similar to the Whois data call. In contrast to the Whois data call, this data call puts a focus on historical changes of an object and its related objects.  
Historical changes are given in the form of versions, one version - by default the latest version - is presented with details.  
Related objects are separated into **referencing** and **referenced** objects. Referencing objects are objects that have a reference to the object in focus and referenced objects are referenced from the object in focus.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '193.0.20.0/24'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | The resource to query. | This is a prefix (v4/v6), an AS number, or a string of the format "object-type:object-key" for looking up generic database objects. | yes |
| version | Defines the version to load details for. Can be provided as numerical value (e.g. version=4) or as time-based value (ISO8601 or Unix timestamp). | Given as a numerical value, the value must match exactly the historical version number.  <br>Given as a time-based value, the version that was valid at the given time will be returned. | no  |

### Data Output

| Key | Info |
| --- | --- |
| num_versions | Number of total version for the selected object. |
| resource, type and version | Shows which resource, object type and version is returned. |
| database | Defines from which RIR database the data is fetched. Currently only the RIPE DB is supported. |
| suggestions | In cases the lookup does not match exactly, suggestions are provided. |
| versions | Contains a list of historical changes represented as version. |
| terms\_and\_conditions | Terms and conditions of the RIPE DB and for using this data. |
| objects | Details for the object in the selected version. |
| referencing | All objects that contains references to the object in focus. |
| referenced_by | All objects that are referenced by the object in focus. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/historical-whois/data.json?resource=193.0.20.0/24"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/historical-whois/data.json?resource=193.0.20.0/24", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
