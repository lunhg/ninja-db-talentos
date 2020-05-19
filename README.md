# ninja-bd-talentos

> API de habilidades de membros do midia ninja

## Getting Started

Getting up and running is as easy as 1, 2, 3.

### Make sure 

Make sure you have:

    - [NodeJS](https://nodejs.org/) installed
    - [npm](https://www.npmjs.com/) installed
    - [yarn](https://www.yarnpkg.com) installed
    - a running mysql server. You could run one under docker [here](https://www.github.com/lunhg/alpine-mariadb)
    
### Install your dependencies

    ```
    cd path/to/ninja-bd-talentos
    npm install
    ```

### Configure database:

Go to `config/default.json` and search for `mysql` field; change it according your credentials.

Ex.:

    "mysql": "mysql://<user>:<pwd>@<ip>:3306/<db>"

### Configure a special folder for tests

    mkdir test/tmp
    
### Start your app

    ```
    npm start
    ```

or 

    ```
    yarn start
    ```


## Testing

Simply run:

  ```
  npm test
  ``` 
  
or 

  ```
  yarn test
  ``` 
  
and all your tests in the `test/` directory will be run.

#### Observations

    - When you run a test you create fake users in your database;
    - When you run a test you create credentials under `test/tmp`

#### Test libraries

Testing are made with `mocha`, `chai` and `it-each` packages under `test/all.js`. Please see specific documentation.

## Models and service

Exists some models:

    - users under `/users` path and requires authentication (email and password). Has many `areas`;
    - areas under `/areas` path. Belongs to `users` and has many `habilidades`;
    - habilidades under `/habilidades` path. Belongs to `areas` and has many `linguagens`
    - linguagens under `/linguages` path and belongs to `habilidades`;
    
A special path exists under `/authentication` and requires only POST methods. This is used to be the `login`. When `POST /authentication` runs with success, it returns a jwt token.


## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

  - 0.0.1: created the project with users test
  
## TODO

  - tests for areas model
  - tests for habilidades model
  - tests for linguagens model
  - add docker
  - change `mysql` field to be filled by environment variables
