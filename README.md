<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Movie-buster

This API is built in NestJS framework with Typescript. It allows to handle a movie store. You can handle users, movies with functions such as like, rent, return and buy. You can also handle two type of users, client and admin.

## First steps

1. run `npm install`
2. generate database with dump.sql
3. watch .envexample for get a guide of how provide your DB credentials and also provide a secret pass for JsonWebToken.
4. run `npm run up`

## Usage

- endpoint for login is authentication/login
- payload for login is {email:string,password:string}
- it is setted a default admin, its credentials {email:'admin@admin.com', password: 'admin@buster'}

## Environment variables required

|   Variable | Description                             |
| ---------: | :-------------------------------------- |
| JWT_SECRET | Secret pass used to sign and verify JWT |
|    DB_PORT | Port of the PostegreSql database        |
|    DB_HOST | Host of the database                    |
|    DB_USER | User for access database                |
|    DB_PASS | Password for user access                |
|    DB_NAME | Name of the database                    |

## Documentation

More examples of use cases of this API can be found
<a href="https://documenter.getpostman.com/view/9673662/SWLh77wL?version=latest" target="_blank">here</a>
