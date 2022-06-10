# RPKI History

This data call returns a timeseries with the count of VRPs (Validated ROA Payload) for the requested resource. The data source of this endpoint are the files hosted in [ftp.ripe.net/rpki](https://ftp.ripe.net/rpki/).

<RestRepl baseUrl="https://stat.ripe.net/data/rpki-history/data.json" method="GET" :searchParams="{ resource:'193.0.22.0/23'}"/>

### Parameters

<table>
        <tbody>
        <tr>
            <th>
                Key
            </th>
            <th>
                Value
            </th>
            <th colspan="1">
                Info
            </th>
            <th colspan="1">
                Required
            </th>
        </tr>
        <tr>
            <td>
                resource
            </td>
            <td>
                <ul>
                    <li>Prefix</li>
                    <li>ASN</li>
                    <li>2-digit ISO-3166 country code</li>
                    <li>Trust anchor</li>
                </ul>
            </td>
            <td>
                The resource to query for. The query returns only matches, for each case:
                <ul>
                    <li>Prefix: those VRPs which have an <i>exact</i> matching prefix</li>
                    <li>ASN: those VRPs which have a matching origin.</li>
                    <li>Country code: those VRPs which are registered under a certain country (according to delegated files).</li>
                    <li>Trust anchor: those VRPs which have ROAs under a certain trust anchor.</li>
                </ul>
            </td>
            <td>
                YES
            </td>
        </tr>
        <tr>
            <td>
                family
            </td>
            <td>
                Integer (4 or 6, default=4)
            </td>
            <td>
                IP address family to filter for
            </td>
            <td>
                NO
            </td>
        </tr>
        <tr>
            <td>
                resolution
            </td>
            <td>
                Char, one of:
                <ul>
                    <li>d day (default)</li>
                    <li>w week</li>
                    <li>m month</li>
                    <li>y year</li>
                </ul>
            </td>
            <td>
                Time bin to group the result by. All values except <code>d</code> will return a response with
                <code>min</code>,
                <code>avg</code>, <code>max</code>, <code>first</code>, <code>last</code>, and <code>samples</code>.
            </td>
            <td>
                NO
            </td>
        </tr>
        <tr>
            <td>
                delegated
            </td>
            <td>
                true/false
            </td>
            <td>
                If present, the response will include registration information for that resource.
            </td>
            <td>
                NO
            </td>
        </tr>
        <!--<tr>
            <td>
                ris
            </td>
            <td>
                any
            </td>
            <td>
                If present, the response will include routing information for that resource, as seen by <a href="https://ris.ripe.net">RIS</a>.
            </td>
            <td>
                NO
            </td>
        </tr>-->
        </tbody>
    </table>

### Output

For each element in the `timeseries` array:

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
                One of:
                <ul>
                    <li>cc</li>
                    <li>prefix</li>
                    <li>asn</li>
                    <li>trust_anchor</li>
                </ul>
            </td>
            <td>
                The resource queried for.
            </td>
        </tr>
        <tr>
            <td>
                family
            </td>
            <td>
                The address family queried for.
            </td>
        </tr>
        <tr>
            <td>rpki</td>
            <td>
                <table>
                    <tr>
                        <td>
                            vrp_count
                        </td>
                        <td>
                            The total count of VRPs matching the queried resource.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        </tbody>
    </table>

  
If querying for delegated information (`delegated=true`) the response will contain:

<table>
        <tbody>
        <tr>
            <td>delegated</td>
            <td>
                <table>
                    <tr>
                        <td>prefixes</td>
                        <td>
                            <table>
                                <tr>
                                    <td>count</td>
                                    <td>Amount of delegated prefixes covered by this resource.</td>
                                </tr>
                                <tr>
                                    <td>covered_by_rpki</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>count</td>
                                                <td>Amount of delegated prefixes which are
                                                    covered by a VRP.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>space</td>
                        <td>
                            <table>
                                <tr>
                                    <td>count</td>
                                    <td>Amount of address space covered by this resource.</td>
                                </tr>
                                <tr>
                                    <td>covered_by_rpki</td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>count</td>
                                                <td>Amount of address space which is covered by
                                                    a VRP.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>rpki</td>
            <td>
                <table>
                    <tr>
                        <td>vrp_count</td>
                        <td>Amount of VRPs being covered by this resource.</td>
                    </tr>
                </table>
            </td>
        </tr>
        </tbody>
    </table>

If querying for resolutions other than day (`resolution={w,m,y}`) the response will get aggregated into weekly (`w`), monthly (`m`), or yearly (`y`) bins according to the option selected by the user, and will contain:

<table>
        <tbody>
        <tr>
            <td>
                <ul>
                    <li>min</li>
                    <li>max</li>
                    <li>avg</li>
                </ul>
            </td>
            <td>
                The min., max., and avg. VRP count in this time bin.
            </td>
        </tr>
        <tr>
            <td>
                <ul>
                    <li>first</li>
                    <li>last</li>
                </ul>
            </td>
            <td>
                The first and last VRP count for this time bin. A time bin with <code>resolution=m</code>
                will report <code>first</code> for the VRP count on 2019-02-01 and <code>last</code> for the one
                on 2019-02-29.
            </td>
        </tr>
        <tr>
            <td>
                samples
            </td>
            <td>
                The amount of samples we have taken under this time bin. If the count happens daily
                and we query with <code>resolution=m</code>, then months holding 30 days should have 30 samples, those
                holding 31 days should have 31, and so on.
            </td>
        </tr>
        <tr>
            <td>
                time
            </td>
            <td>
                A timestamp in the format "YYYY-mm-ddTHH:MM:SS" aligned with the start of the time bin.
            </td>
        </tr>
        </tbody>
    </table>

#### Example 1: querying for a country's VRP count
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rpki-history/data.json?resource=AT"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rpki-history/data.json?resource=AT", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

#### Example 2: querying for a country's VRP count and its information on delegated files

<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rpki-history/data.json?resource=AT&delegated=true"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rpki-history/data.json?resource=AT&delegated=true", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

#### Example 3: querying for a country's VRP count , its information on delegated files, and binning the data points by year.

<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/rpki-history/data.json?resource=AT&delegated=true"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/rpki-history/data.json?resource=AT&delegated=true", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
        

  

::: details current - 0.1
:::
