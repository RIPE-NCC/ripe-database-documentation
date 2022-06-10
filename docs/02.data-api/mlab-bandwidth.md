# M-lab Bandwidth
---------------

This data call returns a set of all the measured network bandwidths for a certain resource.  
  
The data is based on active host measurements collected by the Measurement Lab platform ([M-Lab](http://www.measurementlab.net)).  
  
The bandwidth of a host is determined as the maximum network throughput value for all the tests/measurements performed by that host during the specified time period.  
The value of the measurement throughput is computed as the number of octets transmitted between the host and the chosen M-Lab server, divided by their transfer time.  
  
The measurements are commonly ran using the M-Lab Network Detection Tool ([NDT](http://measurementlab.net/measurement-lab-tools#ndt)), available as a stand-alone network speed test application, and also included in a popular BitTorrent client.  
**Note that due to the nature the data is processed data can be delayed for around two days at the beginning of each month!**  
  
The results published, including host details are covered by the [M-Lab acceptable use policy](http://www.measurementlab.net/content/privacy-policy-aup).

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource:'cy', starttime: '2020-08-21T07:00', endtime: '2020-18-27T12:00'}"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | IPv4 Prefix, IPv4 address or 2-digit ISO-3166 country code (e.g. "at","de"...) | Defines the resource that the query is performed for. | YES |
| starttime | ISO8601 or Unix timestamp | Defines the starttime for the query | NO - default: (endtime - 7d) |
| endtime | ISO8601 or Unix timestamp | Defines the endtime for the query | NO - default: latest time there is M-Lab data available |

### Data Output

| Key | Info |
| --- | --- |
| bandwidths | List of observed bandwidths in Mbps units. One value per host. |
| query_starttime | Defines the start of the time interval covered in the query. |
| query_endtime | Defines the end of the time interval covered in the query. |
| resource | Defines the resource used in the query. |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/mlab-bandwidth/data.json?resource=cy&starttime=2020-08-21T07:00&endtime=2020-18-27T12:00"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/mlab-bandwidth/data.json?resource=cy&starttime=2020-08-21T07:00&endtime=2020-18-27T12:00", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>