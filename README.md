<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Movie-buster

This API is built in NestJS framework with Typescript. It allows to handle a movie store. You can handle users, movies with functions such as like, rent, return and buy. It can send billing emails as well. You can also handle two type of users, client and admin. The API documentation is provided through Postmand docs and OpenAPI standard with Swagger as well. The project is built with docker and docker-compose.

## Pre-requisites

1. Docker and docker-compose must be installed on your machine
2. This API uses Sendgrid API v3 for sending email, so you must provide your Sendgrid API key
3. This API send emails when a user makes a rent or an order of movies, it takes advantage of Sendgrid dynamic templates so you must provide two template ids, one for orders and one for rents respectively
4. Check docker-compose.yml for get an example of the env vars of postgres image, so your .env must fullfil the same values

## First steps

1. watch .envexample for get a guide of how provide your DB credentials, a secret pass for JsonWebToken and others env variables
2. run `docker-compose up`

## Usage

- endpoint for login is authentication/login
- payload for login is {email:string,password:string}
- it is setted a default admin, its credentials {email:'admin@admin.com', password: 'admin@buster'}
- it is setted a default client, its credentials {email:'client@client.com', password: 'client@buster'}
- go to localhost:3000/api to see API documentation with swagger

## Environment variables required

| Variable                  | Description                                                |
| :------------------------ | :--------------------------------------------------------- |
| JWT_SECRET                | Secret pass used to sign and verify JWT                    |
| JWT_SECRET_RESET_PASSWORD | Secret pass used to sign and verify JWT for reset password |
| DB_PORT                   | Port of the dockerized PostegreSql database                |
| DB_HOST                   | Host of the database                                       |
| DB_USER                   | User for access database                                   |
| DB_PASS                   | Password for user access                                   |
| DB_NAME                   | Name of the database                                       |
| SENDGRID_API_KEY          | Key for the Sendgrid email API                             |
| ORDER_TEMPLATE_ID         | Template id of order billing email                         |
| RENT_TEMPLATE_ID          | Template id of rent billing email                          |

## Testing

The project includes Jest as testing library. So you can run commands as the following:

- npm run test
- npm run test:cov for check test coverage
- npm run test:watch for run jest in watch mode

## Documentation

More examples of use cases of this API can be found
<a href="https://documenter.getpostman.com/view/9673662/SWLh77wL?version=latest" target="_blank">here</a>
