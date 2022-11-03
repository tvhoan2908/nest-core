## Description
- Nest core project.
## System Requirement
- NodeJS 14 or higher.
- Mysql 8.
- MongoDB

## Installation
```bash
$ npm install
$ Copy file .env.example to .env and update value.
$ Run docker compose up
```

## Running app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# make migration
$ npm run make:migration specific path
$ eg npm run make:migration databases/migrations/users/create-users-table

# run migrate
$ npm run migrate:up
```

## Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# run test specific file 
$ eg: npm test user.service.spec.ts
```