# Reverse DNS Consistency
-----------------------

This data call returns details on the reverse DNS delegations and its consistency with routed and registered IP space. The input can be a single prefix or an ASN, in which case all routed and registered prefixes for this ASN are used as an input.  

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'193.0.0.0/21'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | Prefix or ASN for the query | -   | YES |
| ipv4/ipv6 | Filter option on IP version | e.g. &ipv4=false or &ipv4=0 | NO - by default both versions are displayed |

### Data Output

KeyInfoprefixesHolds the results separated in "v4" and "v6" results. Results per IP version are grouped by prefixes.domainsReturns all reverse DNS delegations within the prefix given in this key.

|     |     |
| --- | --- |
| domain | The end time of the period. |
| found | True if the prefix is found in the RIPE Registry. |
| prefix | The prefix this domain result is based on. |

completeTrue if all the returned delegations cover the entire IP space for this prefix.query_timeHolds the time the query was carried outresourceDefines the resource used for the queryipv4/ipv6Reflects the filter options on IP versions.

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/reverse-dns-consistency/data.json?resource=193.0.0.0/21"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/reverse-dns-consistency/data.json?resource=193.0.0.0/21", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details 0.3

This is the current and only version of this API call.

:::