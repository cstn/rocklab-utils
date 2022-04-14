# Rocklab utils

> Utilities for Javascript front-end projects with React and Redux

## Requirements

- node version 16
- npm version 8

# Packages

- [Common utilities](./packages/common-utils/README.md)
- [React utilities](./packages/react-utils/README.md)
- [Redux utilities](./packages/redux-utils/README.md)

## Development

### Setup

```shell script
git clone https://github.com/cstn/rocklab-utils.git
npm install
npm run lerna:bootstrap
```

### Commands

Install all dependencies

```shell script
npm install
npm run lerna:bootstrap
```

Check own code conventions

```shell script
npm run lint
```

Autoformat code

```shell script
npm run prettier
```

Publish a new version

```shell script
npm run publish
```

Publish a new version manually

```shell script
npm run version
npm run publish -- from-package
```

Create a release

```shell script
npm run
