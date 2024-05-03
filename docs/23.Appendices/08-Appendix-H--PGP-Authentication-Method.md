---
permalink: /Appendices/Appendix-H--PGP-Authentication-Method
---

# Appendix H- PGP Authentication Method

Before using this authentication method, it is necessary to [create the first mntner and role object](./Database-Support/Create-First-Role-Mntner/#what-is-a-role-object).
Once this step is completed you can process with the authentication method:
* Install gpg or a similar tool. In this example, gpg will be used. `brew install gpg`
* Run the next command to create public and private key `gpg --gen-key` . This command will generate two different 
  files. One for the private key and another for the public key. The output of this command should contain the next 
  piece of text:
  ```
  pub   ed25519 2024-05-03 [SC] [expires: 2027-05-03]
  <public_key>
  ```
* Before creating the key-cert object `gpg --export --armor <public-key>` need to be executed. This command will 
  give you the certificate that you need to fill "certif:" attribute.
* Now is time to create the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object). 
For that you can use one of the [update methods](../Update-Methods/#update-methods). It is recommended to use the 
  last 8 digits from the `<public-key>` for  "key-cert:" attribute.
* Once the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object) 
is created you need to update your previous [mntner object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-mntner-object) 
adding a new "auth:" attribute pointing to the created key-cert.
* Finally, now that the [key-cert object](../RPSL-Object-Types/Descriptions-of-Secondary-Objects/#description-of-the-key-cert-object) 
is created and associated with the mntner. The last step is to perform the update. In this example [syncupdates](../Update-Methods/Syncupdates/#syncupdates) is 
  used for it.
  * You need to create a file with the updated object.
  * This file must be signed running the next command: `gpg --clearsign --armor --default-key <last 8 hexadecimal 
    values> file `. This command will generate an .asc.
  * The last step is to perform the update, in this example `curl` is used: `curl -v --data-urlencode DATA@file.asc 
    https://syncupdates.db.ripe.net`