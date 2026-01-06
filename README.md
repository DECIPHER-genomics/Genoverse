# Fork

This repository is a fork that has diverged significantly from the upstream project. Treat the instructions here as the source of truth for this codebase.

## Local setup

Prerequisites:

- Node.js 14.18.2 (see `.nvmrc`)
- npm (bundled with Node.js)

> Note that on ARM mac we need to install v14 node with Rosetta here.

Install dependencies:

```bash
npm ci
```

Common commands:

```bash
npm run build
npm test
npm run dev
```

# Upstream Genoverse [![Build Status](https://travis-ci.org/wtsi-web/Genoverse.svg?branch=gh-pages)](https://travis-ci.org/wtsi-web/Genoverse)

Genoverse is a portable, customizable, back-end independent JavaScript and HTML5 based genome browser which allows the user to explore data in a dynamic and interactive manner.

Data is visualized in the browser, meaning Genoverse can be installed on any website and show data from a wide range of online or local sources.

Genoverse works with a variety of formats, such as XML, JSON, BED, VCF, GFF, GFF3 or delimited text files, and can be customized to parse and display any data source as required.

If you have any questions, please contact info@genoverse.org

Example: https://genoverse.org
