# Blocklist
---------

This data call returns blocklist related data for a queried resource.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '193/23'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | prefix or IP range | States the prefix or IP range you want to get blocklist information for | YES |
| starttime | ISO8601 or Unix timestamp | Defines the starttime for the query | YES |
| endtime | ISO8601 or Unix timestamp | Defines the endtime for the query | NO - if not set it falls back to now |

### Data Output

| Key | Info |
| --- | --- |
| source | Each different data source gets one entry, containing blocklist information for this source. |
| prefix | Holds the prefix of the entry in the blocklist data source. |
| details | If available this holds additional informations about the entry. |
| timelines | Holds time information for the periods the entry appeared in the blocklist data source. |
| query_starttime | Defines the starttime the query covers. |
| query_endtime | Defines the endtime the query covers. |
| resource | Defines the resource used for the query. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/blocklist/data.json?resource=193/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/blocklist/data.json?resource=193/23", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
