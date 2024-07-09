## 👋 Introduction

This [Nest](https://github.com/nestjs/nest) application, built with TypeScript, provides a RESTful API for managing contacts. It offers CRUD operations for creating, reading, updating, and deleting contacts, along with their associated addresses and phones.

Technologies:

- Node Js
- TypeScript
- (for further dependencies check package.json)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e

# e2e tests coverage
$ npm run test:e2e:cov

# unit test
$ npm run test
```

## Open API (Swagger)
For access API specifications, it's hosted in `/api`.

```bash
# local swagger UI
$ curl --location http://localhost:3000/api
```

## License

Nest is [MIT licensed](LICENSE).
