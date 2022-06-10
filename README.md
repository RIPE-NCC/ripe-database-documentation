# ripestat-docs

VuePress documentation for RIPEstat.

This repo contains all the documentation for RIPEstat, and is built automatically from nothing more than markdown files in the tree.

## Editing the docs

The docs can be edited directly within Gitlab or by cloning the repo, changing the files locally and checking them back in.

### Editing in Gitlab

Gitlab has a handy built in editor that understands most of the markdown that is in the markdown files. There are a few exceptions that are particular to VuePress (which this docs system is based on):


| Gitlab markdown | Vuepress markdown |
| ------ | ------ |
| collapsible sections are rendered with `<details><summary></summary><content></content></details>` | collapsible sections rendered same as gitlab OR by `::: details summaryText contentText :::` |
| Embedded vue components are ignored | Embedded vue components (like `<RestRepl />`) are recognized and rendered |
| cell | cell |
| cell | cell |
| cell | cell |
| cell | cell |

## Cloning/Development

To use this with a different set of docs:

1. Clone the repo
2. Replace all subfolders of `/docs` (EXCEPT `/docs/.vuepress`) with your own docs
3. run `npm docs:dev` to test your docs
4. run `npm docs:build` to build your (static) site
5. upload your build to any web server

### Development notes

For the most part, this should all just work out of the box, but there may be a few settings you will want to tweak in the `/docs/.vuepress/config.js` file. You will probably also want to replace references to RIPEstat in a few places with your own.
