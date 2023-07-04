
# RIPE Database Documentation

VuePress documentation for RIPE Database Documentation.

This documentation is built automatically from nothing more than markdown files in the tree.

# Editing the docs

The docs can be edited directly within Gitlab or by cloning the repository, changing the files locally and checking them back in.

# Editing in Gitlab

GitLab has handy built in editor that undestands most of the markdown that is in the markdown files. There are a few excetions that are particular to VuePress:

| **Gitlab markdown** | **Vuepress markdown** |
| --- | --- |
| collapsible sections are rendered with &lt;details&gt;&lt;summary&gt;&lt;/summary&gt;&lt;content&gt;&lt;/content&gt;&lt;/details&gt; | collapsible sections rendered same as gitlab OR by ::: details summaryText contentText ::: |
Embedded vue components are ignored | Embedded vue components (like &lt;RestRepl /&gt;) are recognized and rendered |

# Running commands

**Do not use yarn command, it has problems with some dependency**

Once you download the repository in your local machine you have to run the next commands.

    npm install

This command is going to install the required dependencies for vuepress and those dependencies specified in package-lock.json file. The output of this command is a new folder called node_modules that contains all the installed dependencies.

    npm run docs:dev

This command is going to launch a local server in http://localhost:8080/docs/

# Legal

**IMPORTANT!** Any change done to [legal](./docs/Legal-Information.md), [T&C](./docs/25.HTML-Terms-And-Conditions.md) or [AUP](./docs/RIPE-Database-Acceptable-Use-Policy.md) require approval from Legal. So please don't edit those files unless you have the permission from Legal.
