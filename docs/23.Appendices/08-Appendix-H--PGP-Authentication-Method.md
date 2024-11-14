---
permalink: /Appendices/Appendix-H--PGP-Authentication-Method
---

# Appendix H- PGP Authentication Method

In this section, we provide an example of the PGP authentication method. For this example we will start from the 
beginning, supposing that there is no a previous [mntner object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-mntner-object)
created.
* [Create the first mntner and role object](../Database-Support/Create-First-Role-Mntner/#what-is-a-role-object).
* Install gpg or a similar tool. In this example, gpg will be used. `brew install gpg`
* Run the next command to create public and private key `gpg --gen-key`. The output of this command should contain the next 
  piece of text:
  ```
  pub   ed25519 2024-05-03 [SC] [expires: 2027-05-03]
  6A9DFE0F2C9239EF07CADA4A4BD32D1CF9C96367
  ```
* Before creating the key-cert object `gpg --export --armor 6A9DFE0F2C9239EF07CADA4A4BD32D1CF9C96367` need to be executed. This command will 
  export the public key in plain text.
``` 
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: GPGTools - http://gpgtools.org

mDMEZjSZDRYJKwYBBAHaRw8BAQdABOx/dcn6Ask5cni3zdKtiYgOG1VN3QQLHQ1c
iz16UQO0HFRlc3QgVXNlciA8bm9yZXBseUByaXBlLm5ldD6ImQQTFgoAQRYhBGqd
/g8skjnvB8raSkvTLRz5yWNnBQJmNJkNAhsDBQkFo5qABQsJCAcCAiICBhUKCQgL
AgQWAgMBAh4HAheAAAoJEEvTLRz5yWNn1YgA/3NEr9/vNPVeCr0NVh9I0DVucTbk
qNwzDy/6Fs81GxvNAP4vJq3n5S9hTFY0aQCZ4mjYXzrDHcJaY+ZKKJcIilesALg4
BGY0mQ0SCisGAQQBl1UBBQEBB0DwPQN5sgVdMCVtCYtQ1UBSq35V1VbiN5MKRT3T
P3hCAAMBCAeIfgQYFgoAJhYhBGqd/g8skjnvB8raSkvTLRz5yWNnBQJmNJkNAhsM
BQkFo5qAAAoJEEvTLRz5yWNnUfMBALG5vIKAJ2msltAPoECQuFmjB6HxFh2HX6vE
os2DfBlmAP9VdqYSQAdqzoQcUWS8j+AIkmmGe/wzKRg3lVEjX6CMBg==
=XknZ
-----END PGP PUBLIC KEY BLOCK----- 
```
* Now is time to create the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object). 
For that you can use one of the [update methods](../Update-Methods/#update-methods). It is recommended to use the 
  last 8 digits from the `6A9DFE0F2C9239EF07CADA4A4BD32D1CF9C96367` for  "key-cert:" attribute. For example:

``` 
key-cert:        PGPKEY-F9C96367
certif:          -----BEGIN PGP PUBLIC KEY BLOCK-----
certif:          Comment: GPGTools - http://gpgtools.org
certif:
certif:          mDMEZjSZDRYJKwYBBAHaRw8BAQdABOx/dcn6Ask5cni3zdKtiYgOG1VN3QQLHQ1c
certif:          iz16UQO0HFRlc3QgVXNlciA8bm9yZXBseUByaXBlLm5ldD6ImQQTFgoAQRYhBGqd
certif:          /g8skjnvB8raSkvTLRz5yWNnBQJmNJkNAhsDBQkFo5qABQsJCAcCAiICBhUKCQgL
certif:          AgQWAgMBAh4HAheAAAoJEEvTLRz5yWNn1YgA/3NEr9/vNPVeCr0NVh9I0DVucTbk
certif:          qNwzDy/6Fs81GxvNAP4vJq3n5S9hTFY0aQCZ4mjYXzrDHcJaY+ZKKJcIilesALg4
certif:          BGY0mQ0SCisGAQQBl1UBBQEBB0DwPQN5sgVdMCVtCYtQ1UBSq35V1VbiN5MKRT3T
certif:          P3hCAAMBCAeIfgQYFgoAJhYhBGqd/g8skjnvB8raSkvTLRz5yWNnBQJmNJkNAhsM
certif:          BQkFo5qAAAoJEEvTLRz5yWNnUfMBALG5vIKAJ2msltAPoECQuFmjB6HxFh2HX6vE
certif:          os2DfBlmAP9VdqYSQAdqzoQcUWS8j+AIkmmGe/wzKRg3lVEjX6CMBg==
certif:          =XknZ
certif:          -----END PGP PUBLIC KEY BLOCK-----
mnt-by:          ***-MNT
notify:          ***@ripe.net
created:         2013-12-10T17:02:02Z
last-modified:   2019-09-09T15:24:06Z
source:          RIPE
password: *****-MNT
```

* Once the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object) 
is created you need to update your previous [mntner object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-mntner-object) 
adding a new "auth:" attribute pointing to the created key-cert.
* Finally, now that the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object) 
is created and associated with the mntner. The last step is to perform an update authenticated with the key-cert 
  object. In this example [syncupdates](../Update-Methods/Syncupdates/#syncupdates) is 
  used for it.
  * You need to create a file with the updated object.
  * This file must be signed by your private key running the next command: `gpg --clearsign --armor --default-key F9C96367 file `. This command will generate an .asc.
  ```
  gpg: using "F9C96367" as default secret key for signing
  edtop:~ $
  edtop:~ $ cat file.asc
  -----BEGIN PGP SIGNED MESSAGE-----
  Hash: SHA512
  
  person:          Name Removed
  address:         ***UPDATED***
  address:         ***
  address:         The Netherlands
  e-mail:          ***@nonexistant.org
  phone:           +31 20 ... ....
  remarks:         ***
  remarks:         ***
  remarks:         ***
  remarks:         ***
  remarks:         ***
  nic-hdl:         ****-RIPE
  mnt-by:          ****-MNT
  created:         2013-12-10T16:54:20Z
  last-modified:   2023-09-06T14:47:15Z
  source:          RIPE
  -----BEGIN PGP SIGNATURE-----
  Comment: GPGTools - http://gpgtools.org
  
  iHUEARYKAB0WIQRqnf4PLJI57wfK2kpL0y0c+cljZwUCZjSZ8QAKCRBL0y0c+clj
  Z93+AQCrvZZzcRHh8m8vj9a0Byea41xcthfKP11CQt5tmBR1ggEA4mSgCaMpClSu
  Wbpg95npLZo+LQB7PdK4Fb+ydsewGA0=
  =Hc7R
  -----END PGP SIGNATURE-----
  ```
  * The last step is to perform the update, in this example `curl` is used: `curl -v --data-urlencode DATA@file.asc 
    https://syncupdates.db.ripe.net`. Whois will authenticate this signature using the public key in the 
[key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object).