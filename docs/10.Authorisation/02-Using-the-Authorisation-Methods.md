# Using the Authorisation Methods

* [MD5 Password](#md5-password)
* [PGP Key](#pgp-key)
* [X.509 Certificate](#x509-certificate)
* [Single Sign-On](#single-sign-on)


## MD5 Password

An MD5 password can be used by any of the update methods currently in use. See section 5.2 Update Methods for more details of these methods.

For email updates, password authorisation information is supplied using a "password:" pseudo-attribute. The value of this attribute is a clear-text passphrase, corresponding to the encrypted hash. It can appear anywhere in the body of the message, but not within mail headers. Line continuation is not allowed for this attribute. The attribute and the passphrase should fit on one line. If you split the passphrase across multiple lines, this will be treated as a syntax error. If you have a very long passphrase, please note that some email clients split lines at a pre-defined character position. If multiple passwords are required, a "password:" pseudo-attribute must be included in the update for each password. 
The Webupdates web form includes a ‘Session Passwords' field. Many passwords can be added, one at a time, using this field, up to a pre-defined limit. For any update in this session, all session passwords will be added to the update that is performed via the web form.

In the single text area form of Webupdates, the “password:” pseudo-attribute can be added as part of the update body, in the text area, in the same way as with an email update. The session passwords also apply in this case.

Using the Syncupdates web form there is no ‘Session Passwords' field but again the “password:” pseudo-attribute can be added. When using the HTTP POST and GET requests for Syncupdates, the “password:” pseudo-attribute must be supplied as part of the message body.

With the RESTful API, any required passwords must be included in the URI query parameters. For more details see the [API documentation](../06.Update-Methods/01-RESTful-API.md#ripe-database-restful-api).


## PGP Key

To use PGP authorisation you must first create a private/public key pair. There are many third-party applications that will allow you to do this. You must keep the private key secure. The public key is entered into the RIPE Database in a **key-cert** object. (See ['Description of the key-cert Object'](../04.RPSL-Object-Types/03-Descriptions-of-Secondary-Objects.md#description-of-the-key-cert-object) for details.)

Some email clients allow you to import your private key into the client. This can then be used to sign any email update you submit. Alternatively, you can use third-party software to sign an update with your private key and paste the signed update into the body of an email.

A signed update message can also be pasted into the Syncupdates web form. When using the HTTP POST and GET requests for Syncupdates, the signed update must be supplied in the message body.

PGP-signed updates cannot be submitted using the RESTful API. As Webupdates uses the API in the background, you cannot paste a signed update into a Webupdates text area either.

For your PGP-signed update to pass authorisation checks, you must have your public key in the database in a **key-cert** object.


### Use in the MAINTAINER object

PGP authentication can be activated by setting the value of an "auth:" attribute to PGPKEY-&lt;id&gt; where &lt;id&gt; is the PGP key ID to be used for authentication. This string is the same one which is used in the corresponding **key-cert** object's "key-cert:" attribute.

Remember that if you have multiple "auth:" attributes in a **maintainer** or if you have multiple "mnt-by:" attributes in an object, all possible authentication methods are combined by a logical OR which means that any single one of the specified authentication methods can be used. There is not security advantage in using PGP authentication with an object which can also be updated with a crypted password authentication.

There are currently no referential integrity checks carried out on the "auth:" attribute values. If you change your "auth:" to refer to a non existent **key-cert** object, or someone else's **key-cert** object you have locked your **mntner**. You will then have to [contact us](../17.How-to-Recover-Access-to-a-Maintainer-Object.md#how-to-recover-access-to-a-maintainer-mntner-object) for assistance to un-lock it. Also, if you delete your **key-cert** object you will again lock your **mntner** until you re-create the **key-cert** object.

This is an example of a valid **mntner** object which uses PGP authentication:

    mntner:         EXAMPLE-MNT
    descr:          Example maintainer
    admin-c:        JOE1-RIPE
    upd-to:         joe@example.net
    auth:           PGPKEY-4B8AE00D
    mnt-by:         EXAMPLE-MNT
    created:        2022-10-26T11:38:51Z
    last-modified:  2022-10-26T11:38:51Z
    source:         RIPE


### Using authentication when sending updates

PGP signed updates can be sent to the database simply by signing the body of the message containing the updates and sending it to the server. Remember to use ASCII armoring. 

Multiple GP-signed and non-signed parts can be supplied in a single update message, each part is processed separately. You can supply several objects which are protected by different PGP keys in a single update message, providing all required signatures are present.

PGP parts with invalid signatures are handled as plain text. If the object is protected by an authentication method other than PGP, or has multiple authentication schemes in use and the required authentication is present, it will still be authorised. If PGP is the only form of authentication present the authentication will fail. 

PGP authentication can be mixed with any of the other forms of authentication in the same **mntner** object. Each authentication method used can have multiple instances present. All the authentications present in a **mntner** object are processed with a logical 'OR' to determine if the authentication is passed.

PGP can be used with updates submitted by e-mail or using the syncupdates facility. It cannot be used with the webupdates interface.


## X.509 Certificate

This is handled in a similar way to PGP. You need a certificate and private key. There is third-party software available to generate these as well as command-line tools, for example OpenSSL. The certificate must be included in a **key-cert** object in the database. The generated certificate and private key are in binary files. The OpenSSL tool will convert the certificate into plain text to be included in the **key-cert** object. For X.509 **key-cert** objects, you must specify the “key-cert:” value as ‘AUTO-1'. The database software will then set this value. These values cannot be reused. Once deleted, an X.509 **key-cert** object cannot be recreated.

If your email client supports S/MIME you can import the certificate and private key into the client. Email updates can now be signed with your X.509 private key. Alternatively, you can sign your update using your private key with OpenSSL and paste it into the email message body.

A signed update message can also be pasted into the Syncupdates web form. When using the HTTP POST and GET requests for Syncupdates, the signed update must be supplied in the message body.

X.509 signed updates cannot be submitted using the RESTful API. As Webupdates uses the API in the background, you cannot paste a signed update into a Webupdates text area either.

For your X.509 signed update to pass authorisation checks, you must have your certificate in the database in a **key-cert** object.



## Single Sign-On

The SSO (single sign-on) authorisation is different to all the other methods. This one provides some authentication as well. SSO is based on RIPE NCC Access. To use SSO as an authorisation method in the RIPE Database, you must first create a RIPE NCC Access account. This provides some details about who you are. It is no longer a totally anonymous password in a box (where the box is the **mntner** object).

The RIPE NCC Access account username, which is your email address, becomes the authorisation credential used by the database software. If you change your RIPE NCC Access username to a different email address, this is immediately reflected in the **mntner** object.

Currently SSO authorisation only works with web-based update methods. This includes Webupdates and the Syncupdates web form. You need to sign in to your RIPE NCC Access account in order to authorise an update.