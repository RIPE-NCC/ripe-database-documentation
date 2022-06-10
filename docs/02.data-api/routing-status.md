# Routing Status
--------------

This data call returns a summary of the current BGP routing state of a given IP prefix or ASN, as observed by the RIS route collectors. Historical lookups are supported - a query has to be aligned to the times (00:00, 08:00 and 16:00 UTC) when RIS data has been collected.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: 'AS3333' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | resource | The resource to query. This is a prefix (v4/v6), IP address or AS number | yes |
| timestamp | ISO8601 or Unix timestamp | Defines the time of the lookup. This value will be automatically aligned to a RIS colletion time. | No - by default it will return the latest available data point (either 00:00, 08:00 or 16:00 UTC) |
| min\_peers\_seeing | boolean | Minimum number of peers seeing the route for it to be included in the results. Excludes low-visibility/localized announcements. | no (default: 10) |

### Data Output

<table>
<tbody>
	<tr>
		<th>
			Key
		</th>
		<th>
			Info
		</th>
	</tr>
	<tr>
		<td>
			first_seen/last_seen
		</td>
		<td>
			Information on when and how the resource was first and last seen in BGP. The following structure is present <b>only</b> if the resource was ever seen in BGP.
	        <br><br>
	        <table>
	            <tr>
	                <td>time</td>
	                <td>The time when the resource was first/last seen.</td>     
	            </tr>
	            <tr>
	                <td>origin</td>
	                <td>The origin AS in the route when the resource was first/last seen.</td>     
	            </tr>
	            <tr>
	                <td>prefix</td>
	                <td>The prefix in the route when the resource was first/last seen.</td>     
	            </tr>
	        </table>
		</td>
	</tr>
	<tr>
		<td>
			visibility
		</td>
		<td>
			 The BGP visibility of the resource, in terms of RIS peers seeing the resource versus total peers, separated over IPv4 and IPv6.
	         <br><br>
	         <table>
	              <tr>
	                  <td>
	                  	v4/v6
	                  </td>
	                  <td>
	                  	The IP family of table announced by the peers.
	                  	<br><br>
	                  	<table>
			                <tr>
			                    <td>ris_peers_seeing</td>
			                    <td>The number of full-table (of that IP family) RIS peers currently seeing the resource.</td>     
			                </tr>
			                <tr>
			                    <td>total_ris_peers</td>
			                    <td>The total number of full-table (of that IP family) RIS peers, at that point in time.</td>     
			                </tr>
			            </table>
	                  </td>
	              </tr>
	         </table>
		</td>
	</tr>
	<tr>
		<td>
			announced space
			<br>(only for resources of type: <b>AS</b>)	
		</td>
		<td>
			Indicates the amount of address space currently announced by that AS number.
	        <br><br>
	        <table>
	            <tr>
	                <td>v4</td>
	                <td>
	                  	<table>
			                <tr>
			                    <td>prefixes</td>
			                    <td>The number of IPv4 prefixes announced by the ASn.</td>     
			                </tr>
			                <tr>
			                    <td>ips</td>
			                    <td>The total amount of IPv4 address space announced by the ASn by combining all the prefixes in terms of unique IP addresses.</td>     
			                </tr>
			            </table>
	                </td>
	            </tr>
	            <tr>
	           		<td>v6</td>
	                <td>
	                  	<table>
			                <tr>
			                    <td>prefixes</td>
			                    <td>The number of IPv6 prefixes announced by the ASn.</td>     
			                </tr>
			                <tr>
			                    <td>/48s</td>
			                    <td>The total amount of IPv6 address space announced by the ASn by combining all the prefixes in terms of unique /48 subnets.</td>     
			                </tr>
			            </table>
	                </td>
	            </tr>
	        </table>
		</td>
	</tr>
	<tr>
	    <td>
	        observed_neighbours
	        <br>(only for resources of type: <b>AS</b>)
	    </td>
	    <td>
	        The amount of unique ASes which are observed to be BGP neighbours of the queried AS at this point in time. Note that the AS might have more neighbours than is specified here, but they are not observed by the RIS collectors. 
	    </td>
	</tr>
	<tr>
		<td>
			origins
			<br>(only for resources of type: <b>prefix</b>)
		</td>
		<td>
			 The list of origin ASes which currently announce this exact match prefix. Each item has the following structure:
	         <br><br>
	         <table>
	              <tr>
	                  <td>
	                  	origin
	                  </td>
	                  <td>
	                  	The origin AS.
	                  </td>
	              </tr>
	              <tr>
	                  <td>
	                  	route_objects
	                  </td>
	                  <td>
	                  	A list of routing registry sources where there is a route object exactly matching this prefix and origin AS.
	                  </td>
	              </tr>
	         </table>
		</td>
	</tr>
		<tr>
		<td>
			less_specifics/more_specifics
			<br>(only for resources of type: <b>prefix</b>)
		</td>
		<td>
			 The list of less specific and more specific prefixes related to the queries prefix currently announced in BGP. Each list is limited to a maximum of 50 items. Each item has the following structure:
	         <br><br>
	         <table>
	              <tr>
	                  <td>
	                  	prefix
	                  </td>
	                  <td>
	                  	The less/more specific prefix.
	                  </td>
	              </tr>
	              <tr>
	                  <td>
	                  	origin
	                  </td>
	                  <td>
	                  	The origin AS which announces the prefix.
	                  </td>
	              </tr>
	         </table>
		</td>
	</tr>
	<tr>
	    <td>
	        resource
	    </td>
	    <td>
	        The resource this query is based on.
	    </td>
	</tr>
	<tr>
	    <td>
	        query_time
	    </td>
	    <td>
	        The time for which the data is valid.
	    </td>
	</tr>
</tbody>
</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/routing-status/data.json?resource=3333"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/routing-status/data.json?resource=3333", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - 2.2

Difference to 3.0: "resource" field for AS queries is with the "AS" prefix

:::

::: details upcoming - n.a.

-

:::