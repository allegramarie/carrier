# Carrier

> An email newsletter client for customizable email templates.

## Team

  - __Product Owner__: [Allegra](https://github.com/allegramarie)
  - __Scrum Master__: [Alex](https://github.com/the-alex)
  - __Development Team Members__: [Eric](https://github.com/Defection), [Eugene](https://github.com/yuqing630)

## Table of Contents

1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Local Development](#local-development)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Style Guide](#style-guide)

## Requirements

- Node 9.4.x
- Postgresql 10.1.x
- Redis 4.0.x

## Getting Started

Go ahead and use your favorite package manager to install dependencies. This project uses `yarn` by default, but `npm` will work just as well. IF you have no preference, just run `yarn install` in project root.

### Local Development

1.  Use `config.js` to set `prod` to `false`.
1.  Configure your local version of postgres to run on the default port (`5432`).
1.  Run `yarn run dev:database` to start the database server and recreate the database.
1.  Run `yarn run dev` to start development mode. This starts the server and the frontend webpack server.

### Production

1.  Use `config.js` to set `prod` to `false`.
1.  Set up a postgres database and add the configuration settings to `config.js`.
1.  Run `yarn run start` will run the server in production mode, serving static files from `client/build`.
