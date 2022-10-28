# Authorisation Model

The **mntner** objects serve as anonymous containers that hold authorisation credentials. A reference to a **mntner** object within any object defines authorisation necessary to perform operations on that object or on a set of related objects. Such reference is provided by means of several attributes including "mnt-by:", "mnt-lower:", "mnt-routes:", "mnt-domains:", "mnt-ref:" and "mbrs-by-ref:" attributes.

The **mntner** object contains one or more mandatory "auth:" attributes. Each attribute begins with a keyword identifying the authorisation method followed by the authorisation information or token needed to enforce that method. The irt object also has mandatory “auth:” attributes used for authorisation.

All updates require authorisation. A credential that is valid for one of the authorisation tokens of one of the relevant **mntner** objects, must be supplied. Different methods of authorisation require different authorisation tokens, as shown in the table below of authorisation methods that are currently supported.

Visit [this section](../17.Database-Support/03.Database-Security.md#maintainers) to know more about **mntner** object.

| **Authorisation Method** | **Description** |
| --- | --- |
| MD5-PW | This scheme is based on the MD5 hash algorithm. The authorisation information stored in the database is a passphrase, encrypted using md5-crypt algorithm, which is a concatenation of the "$1$" string, the salt, and the 128-bit hash output. Because it uses an eight-character salt, a passphrase of almost unlimited length and the encrypted hash is hidden from public view, this scheme is quite stable against dictionary attacks.<br><br>Example:<br><br>auth: MD5-PW $1$abcd4321$HyM/GVhPqXkkIMVerxxQ3z |
| PGPKEY | This is a strong form of authorisation. The authorisation information is a signature identity pointing to a public key certificate, which is stored in a separate **key-cert** object. The update is authorised if the transaction is signed by the corresponding private key. The RIPE NCC does not guarantee that a key belongs to any specific entity. Anyone can supply any public keys, with any ownership information, to the RIPE Database. These keys can be used to protect other objects by checking that the update comes from a user who knows the corresponding secret key. The database software only allows current keys (that have not expired) to sign an update message, and signed messages are only valid for one hour.<br><br>Example:<br><br>auth: PGPKEY-1380K9U1 |
| SSO | This scheme is based on the RIPE NCC Access single sign-on (SSO) system. It takes the management of these authorisation tokens outside of the RIPE Database. The authorisation tokens are managed by the RIPE NCC Access software. To use this, you must first create an account with [RIPE NCC Access](https://access.ripe.net/).<br><br>The SSO system was introduced so that when somebody signs in once with RIPE NCC Access, that account authorises them to use certain services that support it, such as Webupdates or the Syncupdates web form.<br><br>The credential in the **mntner** object uses the keyword SSO followed by the email address used to sign in to your SSO account. You can add many different SSO credentials to a **mntner** object and add your SSO credential to as many **mntner** objects as you wish (provided you have authority to update each **mntner** object using existing authorisation). If you change your email address in your RIPE NCC Access preferences, this will immediately be reflected in any **mntner** objects where this access account is referenced.<br><br>authorisation using SSO can be done from Webupdates and the Syncupdates web form. You can sign into your RIPE NCC Access account directly from Webupdates and Syncupdates. Using any of the update features from Webupdates/Syncupdates you can create, modify and delete objects. No password is needed - you are already authenticated and authorised to make these updates, assuming the object(s) are maintained by one of your SSO **mntner** objects.<br><br>Example:<br><br>auth: SSO dbtest \_at\_ ripe \_dot\_ net |


## Solving Authentication Problems

Given the flexibility of the RIPE Database and the maintainer system, there can be cases where you find yourself unable to authenticate. Currently, only certain combinations of authentication and update methods are compatible, as shown in this table:

||**SSO**|**PGP**|**MD5**|
| --- | --- | --- | --- |
| Webupdates (Web interface) | Yes | No | Yes* |
| Email | No | Yes | Yes* |
| API | No | No | Yes |
| Syncupdates | No | Yes | Yes*

\*It works, but is not recommended

We recommend that if you predominantly use the web interface, you only use the SSO, and if you mainly use syncupdates or email updates, you use PGP.

Depending on your use case, it is important to carefully consider which authentication method you put on each maintainer you manage. For example, there are three basic situations where authentication might fail when trying to use the web interface:

* The object you are trying to modify is protected by a maintainer that is not yours. You therefore rightfully do not have access.
* The object you are trying to modify is protected by a maintainer with several SSO account, none of which are yours. The maintainer also doesn't have a shared MD5 password that would allow you to authenticate.
* The object you are trying to modify is protected by a maintainer that only has a PGP key as the authorisation.

For cases 1 and 2, you need to ask the administrative or technical contact of the maintainer to give you the appropriate access. For case 2, you can use another update method that does support your authentication, such as email.

Lastly, in case your maintainer is protected with a MD5 password that you forgot, you can [reset it here](../16.How-to-Recover-Access-to-a-Maintainer-Object.md#how-to-recover-access-to-a-maintainer-mntner-object).
