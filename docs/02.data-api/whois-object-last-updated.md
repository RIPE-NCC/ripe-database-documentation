# Whois Object Last Updated
-------------------------

This data call returns information of when a certain object was last updated in the whois database.

<RestRepl baseUrl="https://stat.ripe.net/data/whois-object-last-updated/data.json?object='AS3333', type: 'aut-num', source: 'RIPE'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| object | Object name | The exact object to query for | YES |
| type | Object type | Examples: aut-num, inetnum, person, etc | YES |
| source | Database source | RIPE or APNIC | YES |
| timestamp | ISO8601 or Unix timestamp | Defines the time for which to perform the query | NO  |
| compare\_with\_live | true or false | When True (default), the version at the last changed time will be compared with the current live object and indicate if it's different. This will indicate whether there has been at least one modification between "query_time" and "now". | NO  |

### Data Output

| Key | Info |
| --- | --- |
| last_updated | holds the time the object was last updated (before the query_time) in the specified Whois database |
| object | holds the object name the query was based on |
| query_time | holds the time the query was based on |
| same\_as\_live | indicates whether the object at "query\_time" is identical to the current live object. Only applicable for RIPE DB objects. Possible values: "yes", "no" or null. null indicates there has been no comparison with the live object and it is therefore unknown. This can be because the mechanism is switched off ("compare\_with_live" query option), or it's an object outside the RIPE database. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/whois-object-last-updated/data.json?object=AS3333&type=aut-num&source=RIPE"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/whois-object-last-updated/data.json?object=AS3333&type=aut-num&source=RIPE", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>