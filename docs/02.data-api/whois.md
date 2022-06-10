# Whois
-----

This data call returns whois information from the relevant Regional Internet Registry and Routing Registry.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`" method="GET" :searchParams="{ resource: '192.0.20/23' }"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| resource | ASN/IPv4/IPv6 | -   | YES |

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
        authorities
    </td>
    <td>
        holds the authorities that were involved in the query (e.g. "ripe", "afrinic", "apnic", "lacnic", "arin", "iana")    
    </td>
</tr>
<tr>
    <td>
        records
    </td>
    <td>
        A list of whois records returned for this resource (authorities are combined); each record is an array of entries with the following structure: 
        <br><br>
        <table>
            <tbody>
                <tr>
                    <td>key</td>
                    <td>type of the entry (e.g. "aut-num", "as-name"...)</td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>the value of that entry</td>
                </tr>
                <tr>
                    <td>details_link</td>
                    <td>in case it's available it provides a link with further informations (either on RIPEstat or the responsible whois database)</td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>

<tr>
    <td>
        irr_records
    </td>
    <td>
        A list of records returned for Routing Registries (RIPE, RADB...); each record is an array of entries with the following structure: 
        <br><br>
        <table>
            <tbody>
                <tr>
                    <td>key</td>
                    <td>type of the entry (e.g. "route", "descr", "origin", "source"...)</td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>the value of that entry</td>
                </tr>
                <tr>
                    <td>details_link</td>
                    <td>in case it's available it provides a link with further informations (either on RIPEstat or the responsible IRR database)</td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>

<tr>
    <td>
        resource
    </td>
    <td>
        holds the resource the query was based on
    </td>
</tr>
<tr>
    <td>
        query_time
    </td>
    <td>
        holds the time the query was based on
    </td>
</tr>
</tbody>
</table>

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/whois/data.json?resource=192.0.20/23"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/whois/data.json?resource=192.0.20/23", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>

### Available versions for this data call:

::: details deprecated - n.a. - not available

-

:::

::: details upcoming - not available

-
:::