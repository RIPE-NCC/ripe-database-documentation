
# RIPE Database Documentation

VuePress documentation for RIPE Database Documentation.

This documentation is built automatically from nothing more than markdown files in the tree.

# Editing the docs

The docs can be edited directly within Gitlab or by cloning the repository, changing the files locally and checking them back in.

To avoid variation numbers from the link, it is advised to utilise permalinks.

## Links

Since the order of documents can change, we cannot rely on the order number within links referencing them. 
To ensure stability, we use a permalink in the document headers, providing a static link that remains unchanged. 
This approach prevents breaking changes.

It is important to take this into account when creating references between pages. The reference must be the same as
the permalink. Additionally, `#` symbol can be used to reference a section within the link.

# Editing in Gitlab

GitLab has a handy built-in editor that understands most of the markdown that is in the markdown files. There are a few exceptions that are particular to VuePress:

| **Gitlab markdown**                                                                                                                  | **Vitepress markdown**                                                                     |
|--------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| collapsible sections are rendered with &lt;details&gt;&lt;summary&gt;&lt;/summary&gt;&lt;content&gt;&lt;/content&gt;&lt;/details&gt; | collapsible sections rendered same as gitlab OR by ::: details summaryText contentText ::: |
| Embedded vite components are ignored                                                                                                 | Embedded vue components (like &lt;RestRepl /&gt;) are recognized and rendered              |

# Running locally

Once you download the repository in your local machine you can run service using NPM or Docker

## NPM

**Do not use yarn command, it has problems with some dependency**

```shell
npm install
```

**IMPORTANT** for npm version 8.x.x it is necessary to add "--legacy-peer-deps" parameter, or to upgrade npm to version 9.x.x

This command is going to install the required dependencies for vuepress and those dependencies specified in package.json file. The output of this command is a new folder called node_modules that contains all the installed dependencies.

```shell
npm run docs:dev
```

This command is going to launch a local server, you should be able to see the port in the console.
If you have a problem running this command, you should run

```shell
export NODE_OPTIONS=--openssl-legacy-provider
```

## Docker

Use docker build and run

```shell
docker build -t ripe-docs . && docker run --rm  -p 8080:80 ripe-docs
```

or use docker compose

```shell
docker-compose up --build
```

# Legal

**IMPORTANT!** Any change done to [legal](./docs/26.Legal-Information.md), [T&C](./docs/26.HTML-Terms-And-Conditions.md) or [AUP](./docs/25.RIPE-Database-Acceptable-Use-Policy.md) require approval from Legal. So please don't edit those files unless you have the permission from Legal.
