# Using the Authorization Methods

* [MD5 Password](#md5-password)
* [PGP Key](#pgp-key)
* [X.509 Certificate](#x509-certificate)
* [Single Sign-On](#single-sign-on)


## MD5 Password

An MD5 password can be used by any of the update methods currently in use. See section 5.2 Update Methods for more details of these methods.

For email updates, password authorization information is supplied using a "password:" pseudo-attribute. The value of this attribute is a clear-text passphrase, corresponding to the encrypted hash. It can appear anywhere in the body of the message, but not within mail headers. Line continuation is not allowed for this attribute. The attribute and the passphrase should fit on one line. If you split the passphrase across multiple lines, this will be treated as a syntax error. If you have a very long passphrase, please note that some email clients split lines at a pre-defined character position. If multiple passwords are required, a "password:" pseudo-attribute must be included in the update for each password. 
The Webupdates web form includes a ‘Session Passwords' field. Many passwords can be added, one at a time, using this field, up to a pre-defined limit. For any update in this session, all session passwords will be added to the update that is performed via the web form.

In the single text area form of Webupdates, the “password:” pseudo-attribute can be added as part of the update body, in the text area, in the same way as with an email update. The session passwords also apply in this case.

Using the Syncupdates web form there is no ‘Session Passwords' field but again the “password:” pseudo-attribute can be added. When using the HTTP POST and GET requests for Syncupdates, the “password:” pseudo-attribute must be supplied as part of the message body.

With the RESTful API, any required passwords must be included in the URI query parameters. For more details see the [API documentation on GitHub](https://github.com/RIPE-NCC/whois/wiki/WHOIS-REST-API).


## PGP Key

To use PGP authorization you must first create a private/public key pair. There are many third-party applications that will allow you to do this. You must keep the private key secure. The public key is entered into the RIPE Database in a **key-cert** object. (See ['Description of the key-cert Object'](../04.RPSL-Object-Types/03-Descriptions-of-Secondary-Objects.md#description-of-the-key-cert-object) for details.)

Some email clients allow you to import your private key into the client. This can then be used to sign any email update you submit. Alternatively, you can use third-party software to sign an update with your private key and paste the signed update into the body of an email.

A signed update message can also be pasted into the Syncupdates web form. When using the HTTP POST and GET requests for Syncupdates, the signed update must be supplied in the message body.

PGP-signed updates cannot be submitted using the RESTful API. As Webupdates uses the API in the background, you cannot paste a signed update into a Webupdates text area either.

For your PGP-signed update to pass authorization checks, you must have your public key in the database in a **key-cert** object.


## X.509 Certificate

This is handled in a similar way to PGP. You need a certificate and private key. There is third-party software available to generate these as well as command-line tools, for example OpenSSL. The certificate must be included in a **key-cert** object in the database. The generated certificate and private key are in binary files. The OpenSSL tool will convert the certificate into plain text to be included in the **key-cert** object. For X.509 **key-cert** objects, you must specify the “key-cert:” value as ‘AUTO-1'. The database software will then set this value. These values cannot be reused. Once deleted, an X.509 **key-cert** object cannot be recreated.

If your email client supports S/MIME you can import the certificate and private key into the client. Email updates can now be signed with your X.509 private key. Alternatively, you can sign your update using your private key with OpenSSL and paste it into the email message body.

A signed update message can also be pasted into the Syncupdates web form. When using the HTTP POST and GET requests for Syncupdates, the signed update must be supplied in the message body.

X.509 signed updates cannot be submitted using the RESTful API. As Webupdates uses the API in the background, you cannot paste a signed update into a Webupdates text area either.

For your X.509 signed update to pass authorization checks, you must have your certificate in the database in a **key-cert** object.



## Single Sign-On

The SSO (single sign-on) authorization is different to all the other methods. This one provides some authentication as well. SSO is based on RIPE NCC Access. To use SSO as an authorization method in the RIPE Database, you must first create a RIPE NCC Access account. This provides some details about who you are. It is no longer a totally anonymous password in a box (where the box is the **mntner** object).

The RIPE NCC Access account username, which is your email address, becomes the authorization credential used by the database software. If you change your RIPE NCC Access username to a different email address, this is immediately reflected in the **mntner** object.

Currently SSO authorization only works with web-based update methods. This includes Webupdates and the Syncupdates web form. You need to sign in to your RIPE NCC Access account in order to authorize an update.