# ChatApp

This repo contains mixture of Angular Code, NodeJS APIs, DB scripts and Postman collection of NodeJS APIs.

  - DB Scripts (**pgsql**) - To create schema for friendship model
  - Angular Code - To show users and frinds
  - NodeJS APIs (**typescript**) - To get users and friends

# Setup

By using folowing steps, you will be able to configure this project

### DB Scripts
Under **DB** folder, you will find .sql file, you can import in pgsql.

### Angular App
For angular code, you can check the folder **angular** and run 
```
yarn install
```
and to run

```
yarn start
```

### NodeJS
For nodejs code, you can check the folder **nodejs** and run 
```
yarn install
```
and to run in dev

```
yarn start-dev
```

and to run in production
```
yarn start
```

# Documentation


### NodeJS APIs Testing

Postman collection is provided to check nodejs apis.
You can check the folder **postman-collection** and then can import the json file in your postman tool.

It will show you the apis for 
 - User
 - Friends

# Testing
To test your code you can use different testing frameworks.
| Project | Frameworks |
| ------ | ------ |
| Angular | Karma with Jasmine |
| NodeJS | JEST |

# License
MIT
