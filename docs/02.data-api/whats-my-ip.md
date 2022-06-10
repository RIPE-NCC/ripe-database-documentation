# Whats My Ip
-----------

This data call returns the IP address of the requester.

<RestRepl :baseUrl="`/data/`+$page.relativePath.split('/')[1].split('.md')[0]+`/data.json`"/>

### Parameters

| Key | Value | Info | Required |
| --- | --- | --- | --- |
| -   | -   | -   |

### Data Output

| Key | Info |
| --- | --- |
| ip  | contains the requester's IP address |

### Code Examples
<CodeGroup>
<CodeGroupItem title="cURL">

```bash

curl --location --request GET "https://stat.ripe.net/data/whats-my-ip/data.json"


```

</CodeGroupItem>

<CodeGroupItem title="JS">

```js

var requestOptions = {
	method: 'GET',
};

fetch("https://stat.ripe.net/data/whats-my-ip/data.json", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));


```

</CodeGroupItem>
</CodeGroup>
