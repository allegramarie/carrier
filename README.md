# Thesis Project

This is, indeed, the thesis project for _"House Targaryen"_.

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
