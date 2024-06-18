---
permalink: /RIPE-Database-Mirror/Near-Real-Time-Mirroring-v4
---

# Near Real Time Mirroring v4

**The RIPE NCC NRTM** is a publicly available service that allows authorised users to receive a stream of available data 
from the RIPE Database on a server. The user will receive a stream of data from the server with near real time updates. 
This service does not include any personal data.

NRTMv4 is a protocol for IRR mirroring that imrpoves upon existing protocols by publishing records via an HTTPS 
endpoint, using periodic [Snapshots Files]() and regular [Delta Files](). It includes integrity checks through 
signing and enhances scalability by generating files once and distributing them over HTTPS. For more information, 
refer to 
[draft-ietf-grow-nrtm-v4.html](https://htmlpreview.github.io/?https://github.com/mxsasha/nrtmv4/blob/main/draft-ietf-grow-nrtm-v4.html)


## Key Configuration

To enable NRTMv4 we generate and configure a private Ed25519 key and provide the corresponding public 
key, the IRR Database name, and the publication URL of the [Update Notification File](). The
public key must be base64 encoded. 

* URL:

| Environment | Public key URL                                                              |
|-------------|-----------------------------------------------------------------------------|
| PROD        | https://nrtm.db.ripe.net/nrtmv4/RIPE/update-notification-file.json.sig      |
| RC          | https://nrtm-rc.db.ripe.net/nrtmv4/RIPE/update-notification-file.json.sig   |
| TEST        | https://nrtm-test.db.ripe.net/nrtmv4/RIPE/update-notification-file.json.sig |


### Key Rotation

**This is still in progress**. The public key will approximately once a year for security reasons. The process for 
in-band key rotation involves:
1. Generating and configuring a new key as the upcoming signing key.
2. Including this key in the `next_signing_key` field of the Update Notification File, which propagates to mirror clients within 24 hours.
3. Optionally refreshing the Notification Update File earlier to start propagation sooner.
4. Mirror clients store the new key from the `next_signing_key` field upon retrieving the Update Notification File.
5. After a week, the server operator makes the new key active and removes the old key. Future Notification Files will be signed with the new key and will not include a `next_signing_key` field.
6. If a client's signature validation fails, it must attempt to verify using the previously encountered `next_signing_key` and update its configuration if successful.

## Snapshot Initialization

We initialise the [Snapshot]() during the first export for the Database or if there is a history lost and cannot 
produce continuous [deltas](). The server notifies to the user when this happens, to ensure that the client 
have a complete view or need to reinitialise.
1. A session ID (random v4 UUID) is generated. This token is unique for RIPE Database.
2. A new [Snapshot]() is generated for version one, this [Snapshot]() may be empty if the database is empty.
3. A new [Update Notification File]() is generated with the same session ID created in the first step. The session 
   ID is referencing the [Update Notification File]() with the [Snapshot](). This first snapshot doesn't have any 
   [Delta]().
4. We update the [Update Notification File]() with the new contents.

Each Database (i.e: RIPE and RIPE-NONAUTH) has separate session IDs, snapshots, deltas and Update Notification Files, 
even if published by the same server instance.

## Publishing updates

### Update Notification File

The Update Notification File is essential for mirror clients to determine changes between their local Database state 
and the RIPE Database. It provides:

- Information on the [Snapshot File]() and [Delta Files]().
- Timestamp for freshness checking.

The Update Notification File ensure efficient and accurate synchronisation between the RIPE database and the client's 
database by providing clear metadata, previse change details, and robust validation mechanisms. Clients must rely on 
this file to maintain up-tp-date copies of the RIPE Database.

1. `nrtm_version`: must be 4
2. `timestamp`: should adhere to [RFC3339](https://www.rfc-editor.org/rfc/rfc3339) format, providing an accurate 
   timestamp of when the Update Notification File was generated.
3. `type`: must be "notification".
4. `next_signing_key`: (optional) if present, denotes that public key for future key rotation.
5. `source`: identifies the source (i.e: RIPE, RIPE-NONAUTH), ensuring consistency with the RIPE Database data.
6. `session_id`: It is a unique v4 UUID assigned to this session and source, crucial for synchronisation and tracking.
7. `version`: represents the latest version number, aligning with the highest version of the included snapshot and 
   deltas.
8. `snapshot`: contains the details of the [Snapshot File](), including the version, URL foe retrieval, and SHA-256 
   hash for integrity verification.
9. `deltas`: List all [Delta Files]() with their respective version numbers, URLs, and hashes ensuring sequential 
   continuity and data integrity checks.

More information [here](https://htmlpreview.github.io/?https://github.com/mxsasha/nrtmv4/blob/main/draft-ietf-grow-nrtm-v4.html#name-update-notification-file-2).

* Example:

``` 
{
  "nrtm_version": 4,
  "timestamp": "2022-01-01T15:00:00Z",
  "type": "notification",
  "next_signing_key": "bnJ0..bXY0",
  "source": "RIPE",
  "session_id": "ca128382-78d9-41d1-8927-1ecef15275be",
  "version": 4,
  "snapshot": {
    "version": 3,
    "url": "https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-snapshot.2.047595d0fae972fbed0c51b4a41c7a349e0c47bb.json.gz",
    "hash": "9a..86"
  },
  "deltas": [
    {
      "version": 2,
      "url": "https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-delta.1.784a2a65aba22e001fd25a1b9e8544e058fbc703.json",
      "hash": "62..a2"
    },
    {
      "version": 3,
      "url": "https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-delta.2.0f681f07cfab5611f3681bf030ec9f6fa3442fb0.json",
      "hash": "25..9a"
    },
    {
      "version": 4,
      "url": "https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-delta.3.d9c194acbb2cb0d4088c9d8a25d5871cdd802c79.json",
      "hash": "b4..13"
    }
  ]
}
```

* URL:

| Environment | Public key URL                                                          |
|-------------|-------------------------------------------------------------------------|
| PROD        | https://nrtm.db.ripe.net/nrtmv4/RIPE/update-notification-file.json      |
| RC          | https://nrtm-rc.db.ripe.net/nrtmv4/RIPE/update-notification-file.json   |
| TEST        | https://nrtm-test.db.ripe.net/nrtmv4/RIPE/update-notification-file.json |


### Snapshot File

The Snapshot File contains the complete and current contents of the RIPE Database, and clients should use it to
initialise or reinitialise their local Database copies.

To avoid issues where a client retrieves an [Update Notification File]() just before it is updates, servers should
retain old Snapshot Files for at least 5 minutes after a new [Update Notification File]() is published. This allows
clients to complete the retrieval of the snapshot without encountering inconsistencies.

The Snapshot File is formatted as [JSON Text Sequences](https://www.rfc-editor.org/rfc/rfc7464). It contains one or
more records. THe first record is the header, followed by the RPSL records.

1.  A new Snapshot File will be generated every day between 1 am and 2 am.
2. `nrtm_version`: must be set to 4.
3. `version`: must be an unsigned positive integer and match the `version` field in the [Update Notification File]().
4. `type`: must be "snapshot".
5. `source`: must match the `source` field in the [Update Notification File]().
6. `session_id`: must match the `session_id` in the [Update Notification File]().
7. It is cached for 1 week. It is an immutable file.

More information [here](https://htmlpreview.github.io/?https://github.com/mxsasha/nrtmv4/blob/main/draft-ietf-grow-nrtm-v4.html#name-snapshot-file).

* Example:

```
{
  "nrtm_version": 4,
  "type": "snapshot",
  "source": "EXAMPLE",
  "session_id": "ca128382-78d9-41d1-8927-1ecef15275be",
  "version": 3
}
{"object": "route: 192.0.2.0/24\norigin: AS65530\nsource: EXAMPLE"}
{"object": "route: 2001:db8::/32\norigin: AS65530\nsource: EXAMPLE"}
```

* URL:

| Environment | Public key URL                                            |
|-------------|-----------------------------------------------------------|
| PROD        | https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-snapshot.x      |
| RC          | https://nrtm-rc.db.ripe.net/nrtmv4/RIPE/nrtm-snapshot.x   |
| TEST        | https://nrtm-test.db.ripe.net/nrtmv4/RIPE/nrtm-snapshot.x |


### Delta File

Delta files are used for keeping track of the changes done to the Database. The delta file is always compared with the 
previous delta file, so there will never be a version 1. The first delta will be compared with the [initialized 
snapshot]() and will have the version number 2.

Delta Files are used to record changes to RPSL objects between snapshots. They ensure that clients can keep their
databases synchronized with the source by applying only the changes that occurred since the last synchronization.

1. If there have been changes, a Delta File is published each minute.
2. All the changes are included, even if some cancel each other out, like an addition and deletion of the same object.
3. Each Delta File have a `version` number one greater than the last Delta File or Snapshot File Version.
4. All the changes are in order they occurred during the time frame.
5. Deltas older than 24 hours will be removed, after generating a new one.
6. [Update Notification File]() will include the new Delta File and the updated database version.
7. Must match the `session_id` of the [Update Notification File]().
8. Must match the `source` of the [Update Notification File]().
9. `nrtm_version`: must be set to 4.
10. `type`: must be delta.
11. It is cached for one week. It is an immutable file.

More information [here](https://htmlpreview.github.io/?https://github.com/mxsasha/nrtmv4/blob/main/draft-ietf-grow-nrtm-v4.html#name-delta-file)

* Example:
```
{
  "nrtm_version": 4,
  "type": "delta",
  "source": "EXAMPLE",
  "session_id": "ca128382-78d9-41d1-8927-1ecef15275be",
  "version": 3
}
{
  "action": "delete",
  "object_class": "person",
  "primary_key": "PRSN1-EXAMPLE"
}
{
  "action": "delete",
  "object_class": "route",
  "primary_key": "192.0.2.0/24AS65530"
}
{
  "action": "add_modify",
  "object": "route: 2001:db8::/32\norigin: AS65530\nsource: EXAMPLE"
}
```
* URL:

| Environment | Public key URL                                         |
|-------------|--------------------------------------------------------|
| PROD        | https://nrtm.db.ripe.net/nrtmv4/RIPE/nrtm-delta.x      |
| RC          | https://nrtm-rc.db.ripe.net/nrtmv4/RIPE/nrtm-delta.x   |
| TEST        | https://nrtm-test.db.ripe.net/nrtmv4/RIPE/nrtm-delta.x |




