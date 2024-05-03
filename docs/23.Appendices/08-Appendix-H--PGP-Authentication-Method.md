---
permalink: /Appendices/Appendix-H--PGP-Authentication-Method
---

# Appendix H- PGP Authentication Method

In this section, we provide an example of the PGP authentication method. For this example we will start from the 
beginning, supposing that there is no a previous [mntner object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-mntner-object)
created.
* [Create the first mntner and role object](./Database-Support/Create-First-Role-Mntner/#what-is-a-role-object).
* Install gpg or a similar tool. In this example, gpg will be used. `brew install gpg`
* Run the next command to create public and private key `gpg --gen-key`. The output of this command should contain the next 
  piece of text:
  ```
  pub   ed25519 2024-05-03 [SC] [expires: 2027-05-03]
  <public_key>
  ```
* Before creating the key-cert object `gpg --export --armor <public-key>` need to be executed. This command will 
  export the public key in plain text.
* Now is time to create the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object). 
For that you can use one of the [update methods](../Update-Methods/#update-methods). It is recommended to use the 
  last 8 digits from the `<public-key>` for  "key-cert:" attribute.
* Once the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object) 
is created you need to update your previous [mntner object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-mntner-object) 
adding a new "auth:" attribute pointing to the created key-cert.
* Finally, now that the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object) 
is created and associated with the mntner. The last step is to perform an update authenticated with the key-cert 
  object. In this example [syncupdates](../Update-Methods/Syncupdates/#syncupdates) is 
  used for it.
  * You need to create a file with the updated object.
  * This file must be signed by your private key running the next command: `gpg --clearsign --armor --default-key 
    <last 8 hexadecimal values> file `. This command will generate an .asc.
  * The last step is to perform the update, in this example `curl` is used: `curl -v --data-urlencode DATA@file.asc 
    https://syncupdates.db.ripe.net`. Whois will authenticate this signature using the public key in the 
[key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object).