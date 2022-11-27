"# express-rest-api-template" 
A Boilerplate/Generator/Starter template for building RESTful APIs and microservices using modern Javascript, Node.js, Express and MongoDB.

This is a highly opinionated and fully featured starter template, if you don't need some feature or dependency, just delete it.

## Requirements

- [Node 18+](https://nodejs.org/en/download/)

## Features

- No transpilers, just vanilla javascript
- CORS configuration
- Structured logs with [morgan](https://github.com/expressjs/morgan)
- API documentation with [OpenAPI v3](https://swagger.io/specification/) and [Swagger UI](https://swagger.io/tools/swagger-ui/) yet to be done fully 
- MongoDB ORM with [Mongoose](https://mongoosejs.com/)
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
- Automatic error handling for express asynchronous routes with [express-async-errors](https://github.com/davidbanham/express-async-errors)
- Auto reload with nodemon

## Getting Started


1. Download  or clone template and install the dependencies.
2. Change .env database credentials

## Scripts
```bash
npm run start      # starts server
npm run dev        # starts server in watch mode, waiting for file changes
```

## Environment Variables

Use the .en.example file provided 
