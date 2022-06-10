# RIPEstat Data API

### Overview

The RIPEstat Data API is the public data interface for RIPEstat. It is
the only data source for the [RIPEstat
widgets.](https://stat.ripe.net/docs/widget_api "RIPEstat Widget API Docs") and the newer [RIPEstat UI](https://stat.ripe.net/app/launchpad)

### URL

The basic URL for requesting data is:

    https://stat.ripe.net/data/<name>/data.json?param1=value1&param2=value2&...

and to get metadata for a data call, including its methodology:

    https://stat.ripe.net/data/<name>/meta

Where:

-   "**name**" is one of the data calls listed below.

**Note:** Data call URLs previously began with */plugin/*. This will
keep working for the forseable future, but */data/* should now be
preferred.

### Using data calls

#### Common Request Parameters

To support JSON-P all RIPEstat Data API calls support a "callback" parameter. This parameter can be set to the name of the Javascript function that will be called, with the output data as its argument.

| name | part of cache key? | acceptable values | default value? | description |
| --- | --- | --- | --- | --- |
| callback | no  | -   | -   | JSON-P callback |
| preferred_version | yes | version of the data call e.g. 0.1 | current stable version | If the desired version is not available we try to return a version that is matching the major version (e.g. "0" for "0.3"). Use the meta information of a data call to retrieve all available versions, see "[Getting metadata for a data call](#MetaRequest)".  <br>  <br>Magic version tags supported:<br><br>* "**supported**" \- returns the currently supported version<br>* "**upcoming**" \- returns the version that is either a development version and/or a candidate for the next supported version<br>* "**deprecated**" \- this will explicitly return a deprecated version |
| ~cache~ | -   | ~"ignore"~ | -   | ~Bypasses and refreshes the cache when set to "ignore". Note that this should only be used when the results of a data call are stale.~  <br>**Temporarily disabled!** |

#### Rules of Usage

These are the rules for the usage of the data API:

* **No limit on the amount of requests** but please register if you plan to regularly do more than 1000 requests/day, see "Regular Usage" for details.
* The system limits the usage to 8 concurrent (at the same time) requests coming from one IP address.
* RIPEstat Service Terms and Conditions apply, [https://www.ripe.net/about-us/legal/ripestat-service-terms-and-conditions](https://www.ripe.net/about-us/legal/ripestat-service-terms-and-conditions)

#### Regular Usage

If you are using the API on a regular basis you can use the "**sourceapp**" parameter to provide a unique identifier to every data call. This identifier helps us to assist you when you encounter any problems with the system. The identifier can be your project name or your company's.  
  
**Please drop us a short mail** to stat@ripe.net with the identifier and an email address on which we can reach you. (If you include the purpose of the lookups, gold membership support is awaiting you :-)

https://stat.ripe.net/data/&lt;datacallname&gt;/data.json?resource=AS3333&sourceapp=&lt;YourId&gt;

For the format please just use alphanumeric values with no whitespace and no special characters expect for hyphens and underscores.

E.g. **sourceapp=ripestat-cybersecurity-research, sourceapp=my\_ripestat\_id, sourceapp=as3333RIPEstat, etc.**

#### Output Data Structure

The resulting data has a key=>value structure. Each data call has its own output fields, which are detailed in the individual sections. The common fields that are provided by every call are:

| key | type | value |
| --- | --- | --- |
| status | _string_ | Indicates the status of the result of the data call. Possible values are "ok" for a successful query, "error" for unsuccessful query and "maintenance" in case the data call is undergoing maintenance. In case of an error see the messages field for details. |
| status_code | _integer_ | Same as the HTTP status code. In case of server errors the HTTP status code will be set appropriately. |
| data\_call\_status | _string_ | Indicates the status of the data call.  <br>Possible values:<br><br>* **supported**  <br>    This data call is meant to be stable and without bugs. Any bugs reported will be fixed asap.<br>* **deprecated**(usually provided with an expiration date)  <br>    This data call is meant to be deprecated and is about to be removed either by the expiration date or soon.  <br>    **PLEASE CHECK ON THIS FLAG REGULARLY IF YOU WANT TO HAVE A RELIABLE SOURCE OF DATA!**<br>* **development**  <br>    This data call is currently work in progress and to be considered to change or discontinued without notice. This guarantees that we can incorporate user feedback in the most efficient way - so bug reports are highly welcome! |
| data\_call\_name | _string_ | Holds the name of the data call; this is useful for our team and when only the API output is available in a support request. |
| version | _string_ | _major_._minor_ version of the response layout for this particular data call. New minor versions are backwards compatible, new major versions are not. |
| cached | _boolean_ | True/False |
| message | _string_ | human readable message if there was an error during processing. |
| process_time | _string_ | Time it took to process the request, in millisecons. If for some reason the time could not be determined then its value is "not available". |
| data |     | The data itself. |

#### Data Overload Prevention

The data overload prevention is to protect users, especially widgets, from getting more data than they can handle. For this reason some data calls already support a soft-limit check which returns a warning if the output looks to be more than usual.  
  
This prevention mechanism should only kick in if the request stems from a browser (the referrer header set), but in case it happens for a non-browser request, it can easily suppressed by the "data\_overload\_limit" parameter set to "ignore".

https://stat.ripe.net/data/&lt;datacallname&gt;/data.json?resource=AS3333&data\_overload\_limit=ignore

#### Getting metadata for a data call

A meta request returns additional information about a data call. A simple request to

https://stat.ripe.net/data/&lt;name&gt;/meta

will return the list of currently supported meta calls, like:

* **methodology**  
    returns the methodology
* **versions**  
    returns all available versions
* **availability**  
    returns information on the availability of data. We provide this information to help you to identify which historical queries are possible. Hence this data is only available for data calls supporting time selection parameters.  
      
    The output structure is a list of timelines defined by "starttime" and "endtime" properties.  
    If the data call supports different resource types the output structure will change to a list of "available_timeslines" with an "id" property describing the related resource type.  
      
```    
{
	"availability": [
		{
			"available_timelines": [
				{
					"endtime": "2020-12-01T00:00:00",
					"starttime": "2008-11-01T00:00:00"
				}
			],
			"id": "v4"
		},
		{
			"available_timelines": [
				{
					"endtime": "2020-01-07T00:00:00",
					"starttime": "2003-10-09T00:00:00"
				}
			],
			"id": "v6"
		}
	]
}
 ```               
    
The "description" property is optional and provides information if this timeline describes a data island.  
      
```   
{
	"availability": {
		"available_timelines": [
			{
				"endtime": "2020-01-08T09:30:00",
				"starttime": "2020-01-01T00:00:00"
			},
			...
			{
				"description": "Mediterranean Cable Cut",
				"endtime": "2008-02-10T23:59:59",
				"starttime": "2008-01-23T00:00:00"
			}
		]
	}
}
                
 ```   
      
The availability information can also be retrieved as part of a data call - filtered by the given resource type - by providing the parameter "meta=availability":  
      
```
https://stat.ripe.net/data/geoloc/data.json?resource=140.78/16&meta=availability
```              

As with a Data API call it's possible to wrap the result into an JSON-P request by appending the "callback" URL parameter, e.g. for methodology

```
https://stat.ripe.net/data/&lt;name&gt;/meta/methodology?callback=callOnSuccess
```

### Note on SSL

Although it's still possible to use the RIPEstat Data API on a non-secure connection (ordinary HTTP) we strongly encourage using https. If there's a reason for you why you can't use HTTPS at all, please inform us since we will disable HTTP in the near future.