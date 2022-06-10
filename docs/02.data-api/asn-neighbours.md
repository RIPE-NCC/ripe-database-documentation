# ASN Neighbours

This data call shows information on the network neighbours for a given ASN as observerd in RIS. This includes statistical information as well as the list of observed ASN neighbours.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS1205', query_time:'2020-12-01T12:00:00' }" />

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN for this query | The data call will return all neighbours found for this ASN. | YES |
| query_time | ISO8601 or Unix timestamp | Defines the query time for the query.  <br>If not set, the start time will be set to the latest available data point. | NO  |

### Data Output

| Key | Info |
| --- | --- |
| neighbour_counts | Shows total counts for the neighbours, including the total number of "left", "right" and "unique" neighbours found, where "left" and "right" refer to the position in the AS path with respect to the queried ASN. Neighbours that have been seen as left neighbours, but only as direct peers of one of our route collectors (RIS collectors), are flagged "uncertain" because our own peering with this ASN could artifically include it as neigbour. ASNs that have been seen as a left neighbour and not as a direct peer with RIS are not flagged as "uncertain". |
| neighbours | List of neighbours that were seen at the defined timestamp: <table><tr><td>asn</td><td>the AS number of the neighbour</td></tr><tr><td>type</td><<td>the neighbour's position with respect to the queried ASN ("left" or "right"). The type "uncertain" is explained in the "neighbour_counts" section above.</td></tr><tr><td>power</td><td>The number of AS paths ("path count") containing this combination of ASN neighbours with the stated type ("left"/"right"). For compatibility reasons, this attribute has kept its name but will change with the next major release.</td></tr><tr><td>v4\_peers<br>v6\_peers</td><td>Total number of IPv4/IPv6 routes with this AS neighour relationship seen by RIS peers. If all peers see the same route (prefix + AS path) then this number is equal to peers * routes. It is an indicator of how widely used this AS path combination is.</td></tr></table>|
| query\_startime/query\_endtime | Time that the result is valid for. |
| resource | Defines the resource used for the query. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/asn-neighbours/data.json?resource=AS12386&query_time=2020-12-01T12:00:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/asn-neighbours/data.json?resource=AS12386&query_time=2020-12-01T12:00:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details current - 3.2

This data call returns information about the ASNs that neigbour the queried ASN.

    


e.g. [https://stat.ripe.net/data/asn-neighbours/data.json" method="GET" :searchParams="{ resource:AS1205', starttime: '2020-12-01T12:00:00', endtime: '2020-12-06T12:00:00}"/>
asn-neighbours/data.json" method="GET" :searchParams="{ resource:AS1205', starttime: '2020-12-01T12:00:00)

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN for this query | The data call will return all neighbours found for this ASN. | YES |
| start-/endtime | ISO8601 or Unix timestamp | Defines the start and end time for the query. | NO  |

### Data Output

| Key | Info |
| --- | --- |
| neighbour_counts | Shows total counts for the neighbours, including the total number of left, right and unique neighbours found. |
| neighbours | Contains all neighbours that were seen at the defined timestamp. |
| asn | Defines the neighbouring ASN. |
| type | Shows information about the neighbour's position ("left" or "right"). |
| power | Shows how many times this neighbour with this type ("left"/"right") was seen in the routing data. |
| query\_startime/query\_endtime | The start and end time the query results are valid for. |
| resource | Defines the resource used for the query. |
                    

:::

::: details upcoming - 4.1

This data call shows information on the network neighbours for a given ASN. This includes statistical information, the list of observed ASN neighbours and, depending on the level of detail, the ASN paths that this data is based on.

        
            

e.g. [https://stat.ripe.net/data/asn-neighbours/data.json" method="GET" :searchParams="{ resource:AS1205&query_time=2020-12-01T12:00:00}"/>
asn-neighbours/data.json" method="GET" :searchParams="{ resource:AS1205&query_time=2020-12-01T12:00:00)

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN for this query | The data call will return all neighbours found for this ASN. | YES |
| lod | 0 or 1 | Defines how many details are returned in the result. See the output section for further explanation. | NO  |
| query_time | ISO8601 or Unix timestamp | Defines the query time for the query.  <br>If not set, the start time will be set to the latest available data point. | NO  |

### Data Output

KeyInfoneighbour_countsShows total counts for the neighbours, including the total number of "left", "right" and "unique" neighbours found. Neighbours that have been seen as left neighbours, but only as direct peers of one of our route collectors (RIS collectors), are flagged "uncertain" because our own peering with this ASN could artifically include it as neigbour. ASNs that have been seen as a left neighbour and not as a direct peer with RIS are not flagged as "uncertain".neighboursContains all neighbours that were seen at the defined point in time.  
  
Details are only returned if the level of detail ("lod") is 1:

|     |     |
| --- | --- |
| path_count | States in how many paths this neighbour/position combination has been seen. |
| paths | Contains details about the paths, including the RRC location where it has been seen and by how many (full-table) peers. |
| peeer_count | Summarizes the number of peers seeing this neighbour/position combination. |

asnDefines the neighbour ASN.positionShows information about the neighbour's position ("left" or "right"). The type "uncertain" is explained in the "neighbour_counts" section.path_countShows how many times this neighbour with this position ("left"/"right" or "uncertain") was seen in an ASN path.peer_countShows the total number of (full-table) peers, grouped by IP version, seeing this neighbour/position combination.query_timeReflects the time the data is valid for.resourceDefines the resource used for the query.

:::
