---
permalink: /Installation-and-Development/Ideas-from-dev
---

# Ideas from dev

## REST API

### Make it actually REST

Have an unique URL associated with each object, call that resourceUrl, e.g. `http://rest.db.ripe.net/ripe/mntner/ninja-mnt`. Support REST operations on this URL (GET, PUT, DELETE, ...).

Other features, like versions, can be included too, e.g.:

    GET http://rest.db.ripe.net/ripe/mntner/ninja-mnt?version=65
    GET http://rest.db.ripe.net/ripe/mntner/ninja-mnt?versions

### Versioning

Even better, we could have built-in versions to avoid accidental PUTs, like this:

    PUT http://rest.db.ripe.net/ripe/mntner/ninja-mnt?version=21


We could also include current version into all returned objects.

### Authentication

We could totally authenticate all REST API calls, so as to avoid bans for a user excessively querying their own data.

E.g.:

    GET http://rest.db.ripe.net/ripe/mntner/ninja-mnt?password=hajime
    DELETE http://rest.db.ripe.net/ripe/mntner/ninja-mnt?password=hajime


We could even support PGP auth in the REST API by adding an optional `signature` queryparam to all operations, e.g.

    PUT http://rest.db.ripe.net/ripe/mntner/ninja-mnt?signature=h76G6...