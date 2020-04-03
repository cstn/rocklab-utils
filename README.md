# Rocklab utils

> Utilities for Javascript projects

## Setup

```shell script
git clone https://github.com/cstn/rocklab-utils.git
npm install
````

## Commands

Install all dependencies

```shell script
npm run lerna:bootstrap
```

Check own code conventions

```shell script
npm run lint
````

Autoformat code

```shell script
npm run prettier
```

Publish a new version

```shell script
npm run lerna:publish
```

Publish a new version manually

```shell script
npm run lerna:version
npm run lerna:publish -- from-package
```

