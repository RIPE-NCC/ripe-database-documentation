# RIPE Database Documentation

This project builds the [RIPE Database documentation](https://docs.db.ripe.net) site from markdown files using internal components.


## Updating Documentation

We welcome updates to the documentation. This project is developed internally via GitLab, but is mirrored to GitHub. Contributions are welcome via GitLab merge requests or GitHub pull requests, or by creating an issue.

It is recommended to follow the current structure.

### Links

For consistency we recommend using `#` symbol to reference a section within the link.

### Diagrams

This project uses [Mermaid](https://mermaid.js.org/) for diagrams. To add a diagram, place your `.mmd` file in `docs/public/imgs/diagrams/`. The diagrams are rendered automatically at build time.

## Editing in GitLab

GitLab has a handy built-in editor that understands most of the markdown that is in the markdown files. There are a few exceptions that are particular to VitePress:

| **Gitlab markdown**                                                                                                                  | **Vitepress markdown**                                                                     |
|--------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| collapsible sections are rendered with &lt;details&gt;&lt;summary&gt;&lt;/summary&gt;&lt;content&gt;&lt;/content&gt;&lt;/details&gt; | collapsible sections rendered same as gitlab OR by ::: details summaryText contentText ::: |
| Embedded vite components are ignored                                                                                                 | Embedded vue components (like &lt;RestRepl /&gt;) are recognized and rendered              |

## Running locally

Once you download the repository in your local machine you can run the service using NPM or Docker.

### NPM

**Do not use yarn, it has problems with some dependencies.**
**We recommend the Docker approach for testing. Running `npm run docs:build` modifies the docs by updating the last-updated header.**

The VitePress configuration and build scripts are maintained in a separate internal repository. Before running locally with NPM, you need to clone them:

```shell
git clone --depth 1 https://gitlab.ripe.net/swe-database-team/ripe-database-documentation-components.git docs-components
mv docs-components/.vitepress .
mv docs-components/vpscripts .
rm -rf docs-components
```

Then install dependencies and start the dev server:

```shell
npm install
npm run docs:dev
```

This will launch a local server; the port will be shown in the console.

### Docker

Use docker build and run

```shell
docker build --no-cache -f docker/Dockerfile -t ripe-database-documentation . && docker run --rm -p 8080:8080 ripe-database-documentation
```

or use docker compose (preferred option)

```shell
docker compose -f docker/compose.yml up --build
```

## VitePress

This project depends on [VitePress](https://vitepress.dev) to build the static site from Markdown.

The VitePress configuration and components are kept in a separate internal repository ([ripe-database-documentation-components](https://gitlab.ripe.net/swe-database-team/ripe-database-documentation-components)) and are fetched during the build process. See the [NPM](#npm) section for how to set them up locally.

## Legal

**IMPORTANT!** Any change done to [legal](./docs/25.Legal-Information.md), [T&C](./docs/98.HTML-Terms-And-Conditions.md) or [AUP](./docs/97.RIPE-Database-Acceptable-Use-Policy.md) require approval from Legal. So please don't edit those files unless you have the permission from Legal.

## License

The documentation is covered by the terms of the [license](LICENSE).
